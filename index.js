// index.js
const { nextISSTimesForMyLocation } = require('./iss');
/*
fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});


fetchCoordsByIP((err, data) => {
  if (err) {
    console.log("Error getting data" , err);
    return;
  }

  console.log('It worked! GEO returned:' , data);

});



const exampleCoords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned flyover times:' , passTimes);
  */

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
  
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});