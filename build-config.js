var habitat = require(`habitat`);
var fs = require(`fs`);

// Local environment in .env overwrites everything else
habitat.load(`.env`);

var environment = habitat.get(`NODE_ENV`);

if (environment !== `PRODUCTION`) {
  habitat.load(`config/defaults.env`);
}

var config = {
  SCIENCE_API: habitat.get(`SCIENCE_API`),
  WP_API: habitat.get(`WP_API`)
};

// if(process.stdout.isTTY){
//   process.stdout.write(
//     `${JSON.stringify(config)}\n`
//   );
// } else {
fs.writeFile(`config/env.generated.json`, JSON.stringify(config), (err)=>{
  if(err){
    return console.log(err);
  }
});
// }
