export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
      uri: process.env.DATABASE_URI || 'mongodb://localhost/nest',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'your_jwt_secret',
      expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
    },
    environment: process.env.NODE_ENV || 'development',
  });
  