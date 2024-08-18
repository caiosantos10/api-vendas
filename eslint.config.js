/* eslint-disable no-undef */
// eslint.config.js

const typescriptParser = require("@typescript-eslint/parser");
const typescriptPlugin = require("@typescript-eslint/eslint-plugin");
const eslintRecommended = require("@eslint/js").configs.recommended;
const typescriptRecommended = typescriptPlugin.configs.recommended;

module.exports = [
  eslintRecommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": typescriptPlugin,
    },
    rules: {
      ...typescriptRecommended.rules,
      "no-console": "warn",
      "prettier/prettier": "error"
    },
    ignores: ["node_modules", "dist", "build", "/*.js"],
  },
];
