export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'postgresql'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'pelican_db'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'admin'),
      schema: env('DATABASE_SCHEMA', 'public'), // Not required
    },
    debug: false,
  },
})