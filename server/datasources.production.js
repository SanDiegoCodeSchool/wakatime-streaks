console.log("using production settings");
module.exports = {
  "db": {
    "name": "db",
    "connector": "memory",
    "file": "data.json"
  },
  "mongo1": {
    "name": "mongo1",
    "url": process.env.MONGODB_URI, 
    "connector": "mongodb"
  }
}
