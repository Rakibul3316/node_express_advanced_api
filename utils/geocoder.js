const NodeGeocoder = require('node-geocoder');

const options = {
    provider: process.env.GEOCODER_PROVIDER,

    // Optional depending on the providers
    // fetch: function fetch(url, options) {
    //     return nodeFetch(url, {
    //         ...options,
    //         headers: {
    //             'user-agent': 'My application <email@domain.com>',
    //             'X-Specific-Header': 'Specific value'
    //         }
    //     });
    // },
    apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;