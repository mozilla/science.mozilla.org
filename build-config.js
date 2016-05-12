var habitat = require(`habitat`);

// Local environment in .env overwrites everything else
habitat.load(`.env`);

var environment = habitat.get(`NODE_ENV`);

if (environment === `PRODUCTION`) {
  habitat.load(`config/production.env`);
}

habitat.load(`config/defaults.env`);

var config = {
  SCIENCE_API: habitat.get(`SCIENCE_API`),
  WP_API: habitat.get(`WP_API`)
};

process.stdout.write(
  `${JSON.stringify(config)}\n`
);
