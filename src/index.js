// @ts-check

import { Client, Provider, cacheExchange, fetchExchange } from 'urql';
import { authExchange } from '@urql/exchange-auth';

import { ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"
import Cookies from 'js-cookie';

import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


// import i18n (it needs to be bundled :))
import './i18n';

import CSAuth from './tools/authentication';
import CSLS from './constants/cs_local_storage';
import { TOKEN_REFRESH } from './components/user/queries';

// Layouts
import Shop from "./layouts/Shop"
import User from "./layouts/User"

// Components 
import ErrorPage from './components/error_pages/error';
// import ErrorPage from "./components/error_pages/error";
import Home from './components/home/Home';

import UserLogin from "./components/user/login/UserLogin";
import UserLogout from './components/user/logout/UserLogout';
import UserWelcome from './components/user/welcome/UserWelcome';

import ShopCheckoutComplete from './components/shop/checkout/complete/ShopCheckoutComplete';
import ShopCheckoutPayment from './components/shop/checkout/payment/ShopCheckoutPayment';
import ShopHome from './components/shop/home/ShopHome';
import ShopSubscription from './components/shop/subscription/ShopSubscription';
import ShopSubscriptions from './components/shop/subscriptions/ShopSubscriptions';

const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)
const router = createBrowserRouter([
  {
    path: "/",
    element: <Shop />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ShopHome />,
      }, 
      {
        path: "home",
        element: <ShopHome />,
      }, 
    ]
  },
  {
    path: "/shop",
    element: <Shop />,
    children: [
      {
        index: true,
        element: <ShopHome />,
      }, 
      {
        path: "checkout/complete/:id",
        element: <ShopCheckoutComplete />
      },
      {
        path: "checkout/payment/:id",
        element: <ShopCheckoutPayment />
      },
      {
        path: "subscriptions",
        element: <ShopSubscriptions />
      },
      {
        path: "subscriptions/:id",
        element: <ShopSubscription />
      }
    ]
  },
  {
    path: "/user",
    element: <User />,
    children: [
      {
        index: true,
        element: <UserLogin />
      },
      {
        path: "login",
        element: <UserLogin />
      },
      {
        path: "logout",
        element: <UserLogout />
      },
      {
        path: "welcome",
        element: <UserWelcome />
      }
    ]
  }
]);


async function getCSRF() {
  return await fetch('/d/csrf/')
  .then(response => response.json())
  // .then((data) => {
  //   console.log(data)
  // })
}

// Fetch CSRF Token from Cookie
function getCsrfToken() {
  getCSRF()
  let csrfToken = Cookies.get('csrftoken');
  
  return csrfToken
}

const client = new Client({
  url: '/d/graphql/',
  exchanges: [
    cacheExchange, 
    authExchange( async utils => {
      const csrfToken = getCsrfToken()

      return {
        addAuthToOperation(operation) {
          if (!csrfToken) return operation;
          return utils.appendHeaders(operation, {
            'X-CSRFToken': csrfToken
          })
        },
        didAuthError(error, _operation) {
          console.error(error)
          return error.graphQLErrors.some(e => e.extensions?.code === 'USER_NOT_LOGGED_IN');
        },
        async refreshAuth() {
          // Triggered after authError has occured
          console.log("Auth should be refreshed");

          const result = await utils.mutate(TOKEN_REFRESH, {});
          console.log(result)

          if (result.data?.refreshToken) {
            // Update our local variables and write to our storage
            CSAuth.updateTokenInfo(result.data.refreshToken)
          } else {
            // Auth has gone wrong 
            console.error("Error refreshing token, signing out user")
            //TODO Sign out user & redirect to login
            // Can we show a toast?
            CSAuth.logout()
            
            // Save current pathName to redirect the user back on login
            const pathName = window.location.pathname
            localStorage.setItem(CSLS.AUTH_LOGIN_NEXT, pathName)

            // Redirect to login
            console.log("Would redirect to login")
            window.location.href = "/user/login"
            // window.location.reload()

          }
        },
      }
    }

    ), 
    fetchExchange
  ],
  fetchOptions: {
    credentials: 'include'
  }
});



// TODO: use react Suspense? 
root.render(
  <React.StrictMode>
    <ColorModeScript />
    {/* Include Chakra Provider here, so it can also be used in router error components */}
    <Provider value={client}>
      <ChakraProvider 
        theme={theme}
        toastOptions={{
          defaultOptions: {
            duration: 5000,
            isClosable: true,
            variant: "subtle"
          }
        }}
      >
        <RouterProvider router={router} />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

