  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      DB_TYPE: "mysql";
      DB_PORT: number | undefined;
    }
  }

