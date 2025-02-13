import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"], // Aplica apenas a arquivos TypeScript
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      prettier,
    },
    rules: {
      ...ts.configs["recommended"].rules,
      ...prettier.configs.recommended.rules,
      "prettier/prettier": [
        "error",
        {
          semi: false,
          singleQuote: true,
          arrowParens: "avoid",
          useTabs: true,
          trailingComma: "none",
          tabWidth: 4,
        },
      ],
    },
  },
  eslintConfigPrettier, // Desativa regras que conflitam com o Prettier
];
