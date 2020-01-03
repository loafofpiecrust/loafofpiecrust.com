module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    // "prettier/@typescript-eslint",
    // "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  rules: {
    "graphql/template-strings": [
      "error",
      {
        env: "relay",
        schemaJsonFilepath: `${__dirname}/.cache/schema.json`,
        tagName: "graphql",
      },
    ],
    "semi": ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "react/prop-types": "off",
    "react/display-name": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/camelcase": "warn",
    "object-curly-spacing": ["warn", "never"],
  },
  plugins: [
    "graphql",
    "react",
    "@typescript-eslint"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
    extraFileExtensions: [".tsx"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  }
}
