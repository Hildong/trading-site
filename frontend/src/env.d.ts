declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_ENDPOINT: string;
    }
  }
}