const Info = require('../models/info')

exports.getInfo = function(callback,limit) {
    Info.find(callback).limit(limit);
}