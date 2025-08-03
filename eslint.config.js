module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["@bouzomgi/base/frontend"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [".eslintrc.js", "build", "coverage", "public", "*.html"],
};
