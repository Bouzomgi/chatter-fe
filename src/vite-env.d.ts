/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_IS_TEST_ENV?: boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
