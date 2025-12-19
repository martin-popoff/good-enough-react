/** @type {import("prettier").Config} */
export default {
    plugins: ["prettier-plugin-tailwindcss"],
    printWidth: 120,
    tabWidth: 4,
    tailwindFunctions: ["cva"],
    tailwindStylesheet: "./src/styles/index.css",
};
