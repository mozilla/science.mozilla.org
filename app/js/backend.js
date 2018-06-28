let scienceAPI = `/api`;

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

  blogPost: {
    get: function (id) {
      return doXHR(`${scienceAPI}/blog/posts/${id}/`);
    }
  },
  blogPosts: {
    get: function (page = 1, category=``, search=``) {

      let req = {
        page: page
      };

      if(category !== ``) {
        req.category = category;
      }

      if(search !== ``) {
        req.search = search;
      }

      return doXHR(`${scienceAPI}/blog/posts/`, req);
    }
  },
  blogCategories: {
    get: function () {
      return doXHR (`${scienceAPI}/blog/categories/`);
    }
  },
  initData: {
    get: function () {
      return doXHR (`${scienceAPI}/bootstrap/`);
    }
  }
};
