import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:react/jsx-runtime'
  ),
  ...compat.plugins('prettier', 'react'),
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'off'
    }
  },
  {
    files: ['apps/server/**/*.js'],
    rules: {
      // 'import/no-commonjs': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-require-imports': 'off'
    }
  }
]

export default eslintConfig
