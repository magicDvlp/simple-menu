// import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
// import eslintConfigPrettier from "eslint-config-prettier";
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  // eslintConfigPrettier,
  {
    ignores: ["**/node_modules", "**/public", "**/webpack*"],
    // languageOptions: {
    //   globals: {
    //     ...globals.browser,
    //     ...globals.node,
    //     ...globals.amd,
    //     ...globals.jquery,
    //   },
    // },
  },
);
