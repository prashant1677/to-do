var neo4j = require('neo4j-driver');


// const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))


const driver = neo4j.driver(
    'neo4j://localhost',
    neo4j.auth.basic('neo4j', '12345')
    )
    // .then(()=>{
    //     console.log("Connected to database");
    // })
    // .catch(()=>{
    //     console.log("Connection failed");
    // })

    // 2VHVbmb_o2giw3dEeYSaK5w9XFUGZFtvcSqrQIrGRQ8

// Close the driver when application exits.
// This closes all used network connections.
//   await driver.close()

// the Promise way, where the complete result is collected before we act on it:


var service = {};

service.getDriver = getDriver;
module.exports = service;

function getDriver() {
	return driver;
}


