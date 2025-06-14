/** @type {import('prettier').Config} */
module.exports = {
    printWidth: 120,
    semi: true,
    singleQuote: false,
    tabWidth: 4,
    trailingComma: "es5",
    useTabs: false,

    plugins: [require.resolve("prettier-plugin-astro")],

    overrides: [{ files: "*.astro", options: { parser: "astro" } }],
};
