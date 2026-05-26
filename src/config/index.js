import 'dotenv/config';

const config = {
  app: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    isDebug: process.env.DEBUG == 'true',
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  }
};

export default config;
