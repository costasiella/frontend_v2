const fs = require('fs');
const chalk = require('chalk');

module.exports = {
    input: [
        './i18n_tmp/**/*.{js,jsx}',
        // Use ! to filter out files or directories
        '!i18n_tmp/**/*.spec.{js,jsx}',
        '!i18n_tmp/i18n/**',
        '!**/node_modules/**',
    ],
    output: './',
    options: {
        debug: true,
        removeUnusedKeys: true,
        sort: true,
        func: {
            list: ['i18next.t', 'i18n.t', 't'],
            extensions: ['.js', '.jsx']
        },
        trans: {
            component: 'Trans',
            i18nKey: 'i18nKey',
            defaultsKey: 'defaults',
            extensions: ['.js', '.jsx'],
            fallbackKey: function(ns, value) {
                return value;
            },

            // https://react.i18next.com/latest/trans-component#usage-with-simple-html-elements-like-less-than-br-greater-than-and-others-v10.4.0
            supportBasicHtmlNodes: true, // Enables keeping the name of simple nodes (e.g. <br/>) in translations instead of indexed keys.
            keepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'], // Which nodes are allowed to be kept in translations during defaultValue generation of <Trans>.

            // https://github.com/acornjs/acorn/tree/master/acorn#interface
            acorn: {
                ecmaVersion: 2020,
                sourceType: 'module', // defaults to 'module'
            }
        },
        lngs: ['en'], // Add more languages here when required
        ns: [
            'translation'
        ],
        defaultLng: 'en',
        defaultNs: 'translation',
        defaultValue: '__STRING_NOT_TRANSLATED__',
        resource: {
            // the loadPath is relative to the current working directory
            loadPath: './public/locales/{{lng}}/{{ns}}.json',
            // the savepath is relative to the output path
            savePath: './public/locales/{{lng}}/{{ns}}.json',
            jsonIndent: 2,
            lineEnding: '\n'
        },
        nsSeparator: false, // namespace separator
        keySeparator: false, // key separator
        interpolation: {
            prefix: '{{',
            suffix: '}}'
        },
        metadata: {},
        allowDynamicKeys: false,
    },
    transform: function customTransform(file, enc, done) {
        "use strict";
        const parser = this.parser;
        const content = fs.readFileSync(file.path, enc);
        let count = 0;

        parser.parseFuncFromString(content, { list: ['i18next._', 'i18next.__'] }, (key, options) => {
            parser.set(key, Object.assign({}, options, {
                nsSeparator: false,
                keySeparator: false
            }));
            ++count;
        });

        if (count > 0) {
            console.log(`i18next-scanner: count=${chalk.cyan(count)}, file=${chalk.yellow(JSON.stringify(file.relative))}`);
        }

        done();
    }
};