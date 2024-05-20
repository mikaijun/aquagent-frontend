/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'next/core-web-vitals',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'import',
    '@typescript-eslint/eslint-plugin',
    'no-relative-import-paths',
  ],
  root: true,
  rules: {
    '@typescript-eslint/no-misused-promises': 'off',
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      {
        allowSameFolder: false,
        rootDir: './',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'object',
          'type',
          'index',
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        pathGroups: [
          {
            pattern: '@/utils/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/libs/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/hooks/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/components/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/const/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/types/**',
            group: 'internal',
            position: 'before',
          },
        ],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    // ReactのJSXのpropsを並び替える
    'react/jsx-sort-props': [
      'error',
      {
        // コールバック関数のプロパティを最後に配置する
        callbacksLast: true,
        // ショートハンド記法のプロパティを先に配置する
        shorthandFirst: true,
        // ショートハンド記法のプロパティを最後に配置しない
        shorthandLast: false,
        // 大文字小文字を区別しない
        ignoreCase: true,
        // アルファベット順にはソートしない
        noSortAlphabetically: false,
        // リザーブドワードを先頭に配置する
        reservedFirst: true,
      },
    ],
  },
}
