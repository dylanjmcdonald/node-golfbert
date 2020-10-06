const aws4 = require('aws4');
const fetch = require('isomorphic-unfetch');
const querystring = require('querystring');

class Golfbert {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.accessKey = config.accessKey;
    this.secretKey = config.secretKey;
    this.host = 'api.golfbert.com';
    this.region = config.region || 'us-east-1';
  }

  request(options) {
    const url = `https://${this.host}${options.path}`;
    const config = aws4.sign(
      {
        ...options,
        service: 'execute-api',
        region: this.region,
        host: this.host,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-api-key': this.apiKey
        }
      },
      {
        accessKeyId: this.accessKey,
        secretAccessKey: this.secretKey
      }
    );

    return fetch(url, config).then((res) => {
      if (res.ok) {
        return res.json();
      }

      const error = new Error(res.statusText);
      error.response = res;

      throw error;
    });
  }

  ping() {
    return this.request({
      method: 'GET',
      path: `/status`
    });
  }

  getCourses(options) {
    const qs = options ? '?' + querystring.stringify(options) : '';

    return this.request({
      method: 'GET',
      path: `/v1/courses${qs}`
    });
  }

  getCourseById(id) {
    return this.request({
      method: 'GET',
      path: `/v1/courses/${id}`
    });
  }

  getCourseHolesById(id) {
    return this.request({
      method: 'GET',
      path: `/v1/courses/${id}/holes`
    });
  }

  getCourseScorecardById(id) {
    return this.request({
      method: 'GET',
      path: `/v1/courses/${id}/scorecard`
    });
  }

  getCourseTeeboxesById(id) {
    return this.request({
      method: 'GET',
      path: `/v1/courses/${id}/teeboxes`
    });
  }

  getHoles(options) {
    const qs = options ? '?' + querystring.stringify(options) : '';

    return this.request({
      method: 'GET',
      path: `/v1/holes${qs}`
    });
  }

  getHoleById(id) {
    return this.request({
      method: 'GET',
      path: `/v1/holes/${id}`
    });
  }

  getHolePolygonsById(id) {
    return this.request({
      method: 'GET',
      path: `/v1/holes/${id}/polygons`
    });
  }

  getHoleTeeboxesById(id) {
    return this.request({
      method: 'GET',
      path: `/v1/holes/${id}/teeboxes`
    });
  }

  getTeeboxColors() {
    return this.request({
      method: 'GET',
      path: `/v1/teeboxcolors`
    });
  }

  getTeeboxTypes() {
    return this.request({
      method: 'GET',
      path: `/v1/teeboxtypes`
    });
  }
}

module.exports = Golfbert;
