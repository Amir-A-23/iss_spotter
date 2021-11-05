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
    let ipErr = null;

    if (error) {
      ipErr = error;
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
    callback(ipErr, ipAddress);

  });
};



const fetchCoordsByIP = function(callback) {
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


    const long = JSON.parse(body).longitude;
    //console.log(long);
    const lat = JSON.parse(body).latitude;
    //console.log(lat);
    const location = {
      longitude: long,
      latitude: lat
    };

    callback(error, location);
  });

};

//fetchCoordsByIP();
//fetchMyIP();
module.exports = { fetchMyIP, fetchCoordsByIP };
