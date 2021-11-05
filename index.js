// index.js
const { fetchMyIP, fetchCoordsByIP } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});
/*
fetchCoordsByIP((err, data) => {
  if (err) {
    console.log("Error getting data" , err);
    return;
  }

  console.log('It worked! GEO returned:' , data);

});
*/