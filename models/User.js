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
    let err = null;
    const { email, password, confirmPassword } = payload;
    if (password === confirmPassword) {
      const users = this.#getUsers();
      const db = this.#getDb();
      if (users.find((user) => user.email === email)) {
        err = "User already registered.";
        return err;
      } else {
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
      }
    } else {
      err = "Password does not match.";
      return err;
    }
  }
  // Function to check data User
  checkDataUser(payload) {
    const { email, password } = payload;
    const users = this.#getUsers();
    let userFiltered = users.filter((user) => {
      return user.email === email && user.password === password;
    });
    return userFiltered;
  }
  getAllUsers() {
    const datas = this.#getUsers();
    let dataFiltered = datas.filter((data) => data.status == true);
    return dataFiltered;
  }
  getUserById(id) {
    const datas = this.#getUsers();
    let dataFiltered = datas.filter(
      (data) => data.id == id && data.status == true
    );
    return dataFiltered;
  }
  editDataUserById(id, data) {
    let datas = this.#getUsers();
    const db = this.#getDb();
    let { email, password } = data;
    datas.filter((data) => {
      if (data.id == id) {
        data.email = email;
        data.password = password;
      }
    });
    this.fs.writeFile(db, JSON.stringify(datas), (err) => {
      if (err) return err;
    });
  }
  deleteDataUserById(id) {
    let datas = this.#getUsers();
    const db = this.#getDb();
    datas.filter((data) => {
      if (data.id == id) {
        data.status = false;
      }
    });
    this.fs.writeFile(db, JSON.stringify(datas), (err) => {
      if (err) return err;
    });
  }
}
// Export User Model
module.exports = User;
