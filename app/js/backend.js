import Moment from "moment-timezone";


let server = `https://api-mozillascience-staging.herokuapp.com`;
let request = new XMLHttpRequest();
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
  return new Promise((resolve, reject) => {
    request.open(`GET`, `${server}/${route}${params ? pojoToQuery(params) : ``}`, true);

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
      return doXHR(`projects/`, params);
    }
  },
  project: {
    get: function (id, params) {
      return doXHR(`projects/${id}/`, params);
    }
  },
  events: {
    get: function (params) {
      return doXHR(`events/`, params);
    }
  },
  event: {
    get: function (id, params) {
      return doXHR(`events/${id}/`, params);
    },
    calculateDate(timeStart, timeEnd) {
      let start = new Moment(timeStart);
      let end = new Moment(timeEnd);

      if (start.isSame(end, `day`)) {
        return start.format(`MMM DD, YYYY`);
      } else if( start.isSame(end, `month`)) {
        return `${start.format(`MMM D`)}-${end.format(`D, YYYY`)}`;
      } else if( start.isSame(end, `year`)) {
        return `${start.format(`MMM D`)}-${end.format(`MMM D, YYYY`)}`;
      } else {
        return `${start.format(`MMM D, YYYY`)}-${end.format(`MMM D, YYYY`)}`;
      }
    },
    calculateTime(timeStart, timeEnd, timeZone) {
      let start = new Moment(timeStart);
      let end = new Moment(timeEnd);

      if(!timeStart || !timeEnd) { return; }
      if(start.isSame(end, `day`)) {
        if(start.format(`a`) === end.format(`a`)) {
          return this.stripZeroMins(`${start.format(`MMM D, h:mm`)}-${end.tz(timeZone).format(`h:mma z`)}`);
        } else {
          return this.stripZeroMins(`${start.format(`MMM D, h:mma`)}-${end.tz(timeZone).format(`h:mma z`)}`);
        }
      } else {
        return this.calculateDate(timeStart, timeEnd);
      }
    },
    stripZeroMins(timeString) {
      return timeString.replace(/:00/g, ``);
    }
  }
};
