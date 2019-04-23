module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./data/lambda.db3" },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
      tableName: "dbmigrations"
    },
    seeds: { directory: "./data/seeds" }
  }
};
