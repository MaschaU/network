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

//module.exports.insertCode = function ()

/*DATABASE QUERIES FOR PART 3
SELECT to find user by email (reuse query from Login)
INSERT into the new table for secret codes
SELECT that finds code in the new table that matches the email address AND is less than 10 minutes old
UPDATE password of user's table by email address*/