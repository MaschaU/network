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