import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import importPlugin from "eslint-plugin-import";

export default defineConfig([
    globalIgnores(["dist"]),
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,

            tseslint.configs.recommended,
            reactHooks.configs["recommended-latest"],
            reactRefresh.configs.vite,

            eslintConfigPrettier,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            prettier: eslintPluginPrettier,
            import: importPlugin,
        },
        rules: {
            // Prettier integration (Config is enough but this shows warnings in IDE)
            "prettier/prettier": "warn",

            // Allow unused variables starting with _
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],

            // Enforce import order
            "import/order": [
                "error",
                {
                    groups: ["builtin", ["external"], "internal", "parent", "sibling", "index", "object", "type"],
                    "newlines-between": "always",
                    alphabetize: { order: "asc", caseInsensitive: true },
                    pathGroups: [
                        {
                            group: "external",
                            pattern: "react",
                            position: "before",
                        },
                        {
                            group: "internal",
                            pattern: "src/**",
                            position: "after",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["react", "type"],
                },
            ],

            // Disallow relative imports going up the directory tree
            "no-restricted-imports": [
                "error",
                {
                    patterns: ["..*", ".*"],
                },
            ],
        },
    },
]);
