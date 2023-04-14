const db = require("../util/database");

/*

The users table stores information about each user, including their name, email, Twitter ID, and ADA balance.
*/
module.exports = class Users {
  constructor(user_id, name, ada_balance, isAdmin) {
    this.user_id = user_id;
    this.name = name;

    this.ada_balance = ada_balance;
    this.isAdmin = isAdmin;
  }

  save() {
    return db.execute("INSERT INTO users (user_id, name) VALUES (?, ?,  ?)");
  }

  async findOrCreate() {
    let [rows, fields] = await db.execute("SELECT * FROM users WHERE name = ?", [this.name]);

    if (rows.length > 0) {
      // User already exists, mark them as the currentUser
      return rows[0];
    } else {
      // User doesn't exist, create them in the SQL database
      [rows, fields] = await db.execute(
        //TODO: we need to define userid, it will be the first 8 digits of google id
        "INSERT INTO users ( user_id, name) VALUES (?, ?)",
        [this.user_id, this.name]
      );

      this.id = rows.insertId;
      return this;
    }
  }

  static async hasEnoughBalance(user_id, amount) {
    let [rows, fields] = await db.execute("SELECT * FROM users WHERE user_id = ?", [user_id]);
    if (rows.length > 0) {
      if (rows[0].ada_balance >= amount) {
        return true;
      }
    }
    return false;
  }

  static async setAdminPrivilege(user_id) {
    return db.execute("UPDATE users SET isAdmin = 1 WHERE user_id = ? ", [user_id]);
  }

  static async hasAdminPrivileges(user_id) {
    let [rows, fields] = await db.execute("SELECT * FROM users WHERE user_id = ?", [user_id]);
    if (rows.length > 0) {
      if (rows[0].isAdmin == 1) {
        return true;
      }
    }
    return false;
  }
};
