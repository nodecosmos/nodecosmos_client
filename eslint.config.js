// eslint.config.js
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.serviceworker,
                grecaptcha: 'readonly',
            },
        },
    },
    // Base rules
    js.configs.recommended,
    {
        plugins: {
            '@typescript-eslint': tsPlugin,
            import: importPlugin,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
        },
        settings: {
            'import/resolver': { node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] } },
            react: { version: 'detect' },
        },
        rules: {
            'no-trailing-spaces': 'error',
            'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
            // Disable base rule
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
            'array-callback-return': 'error',
            'comma-dangle': ['error', 'always-multiline'],
            'comma-spacing': ['error', {
                before: false,
                after: true,
            }],
            indent: ['error', 4],
            'import/newline-after-import': ['error', { count: 1 }],
            'import/no-anonymous-default-export': 'off',
            'import/no-unused-modules': ['off', {
                missingExports: true,
                unusedExports: true,
            }],
            'import/order': [
                'error',
                {
                    groups: [['builtin', 'external', 'internal', 'parent', 'sibling', 'index']],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'keyword-spacing': ['error', {
                before: true,
                after: true,
            }],
            'jsx-quotes': ['error', 'prefer-double'],
            'linebreak-style': ['error', 'unix'],
            'max-len': ['error', { code: 120 }],
            'no-console': 'off',
            'no-debugger': 'warn',
            'no-multiple-empty-lines': ['error', {
                max: 1,
                maxEOF: 0,
            }],
            'no-multi-spaces': 'error',
            'no-mixed-operators': [
                'error',
                {
                    groups: [
                        ['*', '/', '%', '**'],
                        ['&', '|', '^', '~', '<<', '>>', '>>>'],
                        ['==', '!=', '===', '!==', '>', '>=', '<', '<='],
                        ['&&', '||', '>', '>=', '<', '<='],
                        ['in', 'instanceof'],
                    ],
                    allowSamePrecedence: false,
                },
            ],
            'no-param-reassign': ['error', { props: false }],
            'no-plusplus': ['error', { allowForLoopAfterthoughts: false }],
            'no-redeclare': 'error',
            'object-curly-newline': [
                'error',
                {
                    ObjectExpression: {
                        multiline: true,
                        minProperties: 3,
                    },
                    ObjectPattern: {
                        multiline: true,
                        minProperties: 3,
                    },
                    ImportDeclaration: {
                        multiline: true,
                        minProperties: 3,
                    },
                    ExportDeclaration: {
                        multiline: true,
                        minProperties: 3,
                    },
                },
            ],
            'object-curly-spacing': ['error', 'always'],
            'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
            'object-shorthand': ['error', 'always'],
            'operator-linebreak': ['error', 'before'],
            quotes: ['error', 'single'],
            'react/no-unused-prop-types': 'error',
            'react/no-unused-state': 'off',
            'react/destructuring-assignment': ['error', 'always'],
            'react/forbid-prop-types': 'off',
            'react/jsx-closing-tag-location': 'error',
            'react/jsx-child-element-spacing': 'error',
            'react/jsx-curly-spacing': ['error', 'never'],
            'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
            'react/jsx-max-props-per-line': ['error', {
                maximum: 1,
                when: 'multiline',
            }],
            'react/jsx-tag-spacing': [
                'error',
                {
                    closingSlash: 'never',
                    beforeSelfClosing: 'always',
                    afterOpening: 'never',
                    beforeClosing: 'never',
                },
            ],
            'react/jsx-no-bind': 'error',
            'react/jsx-no-constructed-context-values': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'react-hooks/rules-of-hooks': 'error',
            'padded-blocks': ['error', 'never'],
            semi: ['error', 'always'],
            'semi-spacing': ['error', {
                before: false,
                after: true,
            }],
            'space-before-blocks': ['error', 'always'],
            'space-infix-ops': 'error',
            'space-in-parens': ['error', 'never'],
        },
    },
];
