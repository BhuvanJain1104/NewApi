const NodeCache = require("node-cache");

// Cache expires after 10 minutes
const cache = new NodeCache({
  stdTTL: 600,
});

module.exports = cache;