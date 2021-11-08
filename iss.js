const request = require('request');
const {APIKEY} = require('./constants');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  //use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
  
    const data = JSON.parse(body);
    let ipAddress = null;

    if (error) {
      callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    //console.log('data:', data);
    //console.log('type of Data:', typeof(data));
    //console.log('length of data:', data.length);
    if (data !== null) {
      ipAddress = data.ip;
      //console.log('Datatype of ipaddress:', typeof(ipAddress));
    }
    //console.log(ipAddress);
    //console.log(ipErr);
    callback(null, ipAddress);

  });
};



const fetchCoordsByIP = function(ipAddress,callback) {
  //https://freegeoip.app/json/invalidIPHere
  //use request to fetch IP address from JSON API
  request(`https://api.freegeoip.app/json/?apikey=${APIKEY}`, (error, response, body) => {
    // console.log("errr:", error);
    console.log('Status Code', response.statusCode);
    // console.log(body);
    // console.log(typeof(body);)
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }


    //const long = JSON.parse(body).longitude;
    //console.log(long);
    //const lat = JSON.parse(body).latitude;
    const { latitude, longitude } = JSON.parse(body);
    //console.log(lat);
    
    //console.log(location);
    callback(null, {latitude, longitude});
  });

};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  console.log('Long is:', coords.longitude, 'Lat is:', coords.latitude);
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
    , (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const data = JSON.parse(body).response;
      console.log(data);
      callback(null, data);
    });
  // ...
};
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};
//fetchMyIP();
//fetchISSFlyOverTimes(  { longitude: -90.4617, latitude: 38.7048 } );
module.exports = { nextISSTimesForMyLocation };
