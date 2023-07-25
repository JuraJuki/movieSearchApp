// used to create typed .env variables
interface ImportMetaEnv {
  VITE_MOVIES_API_KEY: string;
  VITE_MOVIES_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
