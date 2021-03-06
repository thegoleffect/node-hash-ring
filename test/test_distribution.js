var sys = require("sys");

var HashRing = require("../lib/hash_ring");

var nodes = {
    "127.0.0.1:8080": 1,
    "127.0.0.2:8080": 1,
    "127.0.0.3:8080": 1
};

var ring = new HashRing(nodes);

var iterations = 100000;

var genCode = function (length) {
    length = length || 10;
    var chars = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890",
        numChars = chars.length;
    var ret = "";
    for (var i = 0; i < length; i++) {
        ret += chars[parseInt(Math.random() * numChars, 10)];
    }
    return ret;
};

var randomDistribution = function () {
    var counts = {},
        node, i, len, word;
    for (i = 0, len = nodes.length; i < len; i++) {
        node = nodes[i];
        counts[node] = 0;
    }
    for (i = 0, len = iterations; i < len; i++) {
      word = genCode(10);
      node = ring.getNode(word);
      counts[node] = counts[node] || 0;
      counts[node]++;
    }
    for (node in counts) {
        sys.log(node + ": " + counts[node]);
    }
};

randomDistribution();
