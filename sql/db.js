const spicedPg = require("spiced-pg");

// heroku //

let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
} else {
    const { dbUser, dbPass } = require("../secrets.json");
    db = spicedPg(`postgres:${dbUser}:${dbPass}@localhost:5432/socialnetwork`);
}

module.exports.insertNewUser = function (first, last, email, hashPass) {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4) RETURNING id`,
        [first, last, email, hashPass]
    );
};

module.exports.getHashedPassword = function (email) {
    return db.query(
        `
        SELECT * FROM users WHERE email = $1
        `, [email]
    );
};

module.exports.getUsersEmail = function(email) {
    return db.query(
        `
        SELECT * FROM users WHERE email=$1
        `, [email]
    );
};

module.exports.insertIntoPasswordResetCodes = function(email, code) {
    return db.query(
        `
        INSERT INTO password_reset_codes (email, code)
        VALUES ($1, $2) RETURNING id
        `, [email, code]
    );
};

module.exports.checkIfTheCodeIsValid = function (email, code) {
    return db.query(
        `
        SELECT * FROM password_reset_codes WHERE email=$1 AND code=$2 AND created_at > CURRENT_TIMESTAMP - INTERVAL '10 MINUTES'
        `, [email, code]
    );
};

module.exports.updateUsersPassword = function (email, password) {
    return db.query(
        `
        UPDATE users SET password=$2 WHERE email=$1 RETURNING *
        `, [email, password]
    );
};

module.exports.getUserInfo = function (id) {
    return db.query(
        `
        SELECT * FROM users WHERE id=$1
        `, [id]
    );
};

module.exports.storeProfilePicture = function (id, imageUrl) {
    return db.query(
        `
        UPDATE users SET imageUrl=$2 WHERE id=$1
        `, [id, imageUrl]
    );
};

module.exports.updateUsersBio = function(id, bio) {
    return db. query(
        `
        UPDATE users SET bio=$2 WHERE id=$1
        `, [id, bio]
    );
};

module.exports.getNewestUsers = function() {
    return db.query(
        `
        SELECT id, firstname, lastname, imageurl FROM users ORDER BY id DESC LIMIT 3
        `
    );
};

module.exports.getMatchingUsers = function(val) {
    return db.query(
        `SELECT id, firstname, lastname, imageurl FROM users WHERE firstname ILIKE $1 OR lastname ILIKE $1`
        , [val + '%']
    );
};

module.exports.getFriendshipStatus = function(loggedInUserId, otherUserId) {
    return db.query(
        `
        SELECT * FROM friendships WHERE (receiverid=$1 AND senderid=$2) OR (receiverid=$2 AND senderid=$1)
        `, [loggedInUserId, otherUserId]
    );
};

module.exports.insertFriendRequest = function(loggedInUserId, otherUserId) {
    return db.query(
        `
        INSERT INTO friendships (senderid, receiverid)
        VALUES ($1, $2) RETURNING id
        `, [loggedInUserId, otherUserId]
    );
};

module.exports.updateFriendshipToAccepted = function(loggedInUserId, otherUserId) {
    return db.query(
        `
        UPDATE friendships SET accepted=true WHERE senderid=$2 AND receiverid=$1
        `, [loggedInUserId, otherUserId]
    );
};

module.exports.deleteFriendship = function(loggedInUserId, otherUserId) {
    return db.query(
        `
        DELETE from friendships WHERE (senderid=$1 and receiverid=$2) OR (senderid=$2 and receiverid=$1) 
        `, [loggedInUserId, otherUserId]
    );
};

module.exports.getFriendships = function (loggedInUserId) {
    return db.query(
        `
        SELECT * from friendships WHERE ((senderid=$1 OR receiverid=$1) AND accepted = true) OR ((receiverid=$1) AND accepted = false)
        `, [loggedInUserId]
    );
};

module.exports.insertChatMessage = function (senderId, messageBody) {
    return db.query(
        `
        INSERT INTO chat (senderid,messagebody) VALUES ($1,$2) RETURNING id
        `, [senderId, messageBody]
    );
};

module.exports.getRecentChatMessages = function(maxCount) {
    return db.query(
        `
        SELECT * FROM chat ORDER BY id DESC LIMIT $1
        `, [ maxCount ]
    );
};
