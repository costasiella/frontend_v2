// @ts-check

import CSLS from "../constants/cs_local_storage"


const CSAuth = {
    login(tokenData) {
        localStorage.setItem(CSLS.AUTH_TOKEN_EXP, tokenData.payload.exp)
        localStorage.setItem(CSLS.AUTH_TOKEN_ORIGIAT, tokenData.payload.origIat)
        localStorage.setItem(CSLS.AUTH_REFRESH_TOKEN_EXP, tokenData.refreshExpiresIn)
        localStorage.removeItem(CSLS.AUTH_LOGIN_NEXT)
    },
    updateTokenInfo(refreshTokenData) {
        console.log("Token payload:")
        console.log(refreshTokenData)
        localStorage.setItem(CSLS.AUTH_TOKEN_EXP, refreshTokenData.payload.exp)
        localStorage.setItem(CSLS.AUTH_TOKEN_ORIGIAT, refreshTokenData.payload.origIat)
        localStorage.setItem(CSLS.AUTH_REFRESH_TOKEN_EXP, refreshTokenData.refreshExpiresIn)
    },
    cleanup() {
        console.warn("CSauth cleanup called!")
        // Like logging out, but don't unset next url. 
        // This function is used when a refreshToken has expired
        // localStorage.removeItem(CSLS.AUTH_TOKEN)
        localStorage.removeItem(CSLS.AUTH_TOKEN_EXP)
        localStorage.removeItem(CSLS.AUTH_TOKEN_ORIGIAT)
        // localStorage.removeItem(CSLS.AUTH_REFRESH_TOKEN)
        localStorage.removeItem(CSLS.AUTH_REFRESH_TOKEN_EXP)
    },
    logout(expired=false) {
        if (!expired) {
            // Manual logout, remove everything
            this.cleanup()
            localStorage.removeItem(CSLS.AUTH_LOGIN_NEXT)
        }        
    },
    userIsSignedin() {
        const refreshTokenExp = localStorage.getItem(CSLS.AUTH_REFRESH_TOKEN_EXP)

        // No refresh token; user is not signed in
        if (refreshTokenExp == null) {
            return false
        }

        // Convert "now" to unix time and compare to refresh token expiration
        // Expired refresh token; user is not singed in
        if (Math.floor(new Date().getTime() / 1000) >= parseInt(refreshTokenExp)) {
            return false
        }

        return true
    }
}

export default CSAuth