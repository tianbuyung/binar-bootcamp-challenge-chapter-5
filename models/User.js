class User {
  constructor() {
    // Import database, path to read/write file, module fs
    this.users = require("../database/users.json");
    this.PATH_USERS = "./database/users.json";
    this.fs = require("fs");
  }
  // Encapsulation Database User
  #getDb() {
    return this.PATH_USERS;
  }
  // Encapsulation Read User
  #getUsers() {
    return this.users;
  }
  // Function to create new User
  createNewUser(payload) {
    const { email, password } = payload;
    const db = this.#getDb();
    this.fs.readFile(db, "utf-8", (err, data) => {
      if (err) return err;
      let users = JSON.parse(data);
      let userID;
      if (users.length === 0) {
        userID = 1;
      } else {
        userID = users[users.length - 1].id + 1;
      }
      const objToAdd = {
        id: userID,
        email: email,
        password: password,
        status: true,
      };
      users.push(objToAdd);
      this.fs.writeFile(db, JSON.stringify(users), (err) => {
        if (err) return err;
      });
    });
  }
  // Function to check data User
  checkDataUser(payload) {
    const { email, password } = payload;
    // console.log(payload);
    const users = this.#getUsers();
    let userFiltered = users.filter((user) => {
      return user.email === email && user.password === password;
    });
    return userFiltered;
  }
}
// Export User Model
module.exports = User;
