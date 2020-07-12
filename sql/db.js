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

module.exports.storeProfilePicture= function (id, imageUrl) {
    return db.query(
        `
        UPDATE users SET imageUrl=$2 WHERE id=$1
        `, [id, imageUrl]
    );
};



/*DATABASE QUERIES FOR PART 3
SELECT to find user by email (reuse query from Login)
INSERT into the new table for secret codes
SELECT that finds code in the new table that matches the email address AND is less than 10 minutes old
UPDATE password of user's table by email address*/