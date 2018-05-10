module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/quantified_self_express',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection:'postgres://localhost/quantified_self_express_test',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/test'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: 'postgres://yrnzivdzapxvka:0339c9680f10fa7f5f0ce3223b0c80939fa48b0c7dac3e7221899ac22f7d5573@ec2-107-20-249-68.compute-1.amazonaws.com:5432/d30sp9nh0ea0qo',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/production'
    },
    useNullAsDefault: true
  }
}
