
const bcrypt = require('bcryptjs'),
    db = require('../helpers/db'),
    User = db.User;

module.exports = {
    create,
    delete: _delete
};


async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}