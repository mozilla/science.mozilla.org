import env from "../../config/env.generated.json";
var request = require(`superagent`);

let scienceAPI = env.SCIENCE_API;
let wpAPI = env.WP_API;

let defaultParams = {
  format: `json`
};

/**
 * Make an XHR request and return a promise to resolve it.
 * @param  {String} route  route fragment
 * @param  {Object} params A POJO to be passed as query params to the request
 * @returns {Promise} A promise to resolve an XHR request
 */
function doXHR(route, params = defaultParams) {

  return new Promise((resolve, reject) => {
    request
      .get(route)
      .query(params)
      .end((err, response)=>{
        if(err){
          reject(err);
        } else {
          resolve(JSON.parse(response.text));
        }
      });
  });
}

export default {
  projects: {
    get: function (params) {
      return doXHR(`${scienceAPI}/projects/`, params);
    }
  },
  project: {
    get: function (id, params) {
      return doXHR(`${scienceAPI}/projects/${id}/`, params);
    }
  },
  categories: {
    get: function (params) {
      return doXHR(`${scienceAPI}/projects/categories/`, params);
    }
  },
  events: {
    get: function (params) {
      return doXHR(`${scienceAPI}/events/`, params);
    }
  },
  event: {
    get: function (id, params) {
      return doXHR(`${scienceAPI}/events/${id}/`, params);
    }
  },
  resources: {
    get: function (params) {
      return doXHR(`${scienceAPI}/resources/`, params);
    }
  },
  studyGroups: {
    get: function (params) {
      return doXHR(`${scienceAPI}/study-groups/`, params);
    }
  },

  // Using `cachebuster` because WP-API caches `Access-Control-Allow-Origin` per route.
  // This means without it you can't safely do local development.
  // Local requests without cachebuster can set access control to only the localhost, breaking staging & production.

  blogPost: {
    get: function (id) {
      return doXHR(`${wpAPI}/posts`, {
        "filter[name]": id,
        cachebuster: Date.now() * Math.random()
      });
    }
  },
  blogPosts: {
    get: function (page = 1) {
      return doXHR(`${wpAPI}/posts`, {
        cachebuster: Date.now() * Math.random(),
        page: page
      });
    }
  }
};
