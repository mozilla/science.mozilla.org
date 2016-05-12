import env from "../../config/env.generated.json";

let scienceAPI = env.SCIENCE_API;
let wpAPI = env.WP_API;

let defaultParams = {
  format: `json`
};

/**
 * Serialize a POJO as a URL query string fragment
 * @param  {Object} pojo A shallow object to serialize
 * @returns {String} Serialized string fragment (eg: ?foo=bar&cool=23
 */
function pojoToQuery(pojo) {
  return Object.keys(pojo).reduce((previousValue, currentValue, index) => {
    return `${previousValue}${index !== 0 ? `&` : ``}${currentValue}=${pojo[currentValue]}`;
  }, `?`);
}

/**
 * Make an XHR request and return a promise to resolve it.
 * @param  {String} route  route fragment
 * @param  {Object} params A POJO to be serialized as a query string
 * @returns {Promise} A promise to resolve an XHR request
 */
function doXHR(route, params = defaultParams) {
  let request = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    request.open(`GET`, `${route}${params ? pojoToQuery(params) : ``}`, true);

    request.onload = (event) => {
      let result = event.currentTarget;

      if (result.status >= 200 && result.status < 400) {
        resolve(JSON.parse(result.response));
      } else {
        reject(`XHR request failed.`);
      }
    };

    request.onerror = () => {
      reject(`XHR request failed`);
    };

    request.send();
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
