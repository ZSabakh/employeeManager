const sql = require("../utility/sql");

module.exports = class Employee {
  constructor(firstName, lastName, pid, image, gender, address, personStatus) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.pid = pid;
    this.image = image;
    this.gender = gender;
    this.personStatus = personStatus;
  }

  static findEmployee(fname, lname) {
    return sql.execute(
      "SELECT * FROM `citizens` WHERE first_name=? AND last_name=?",
      [fname, lname]
    );
  }

  static getEmployees() {
    return sql.execute("SELECT * FROM `citizens` LIMIT 10");
  }

  static getEmployeesPaged(page) {
    //First page going to show me 20 entries (Limit 0 20)
    //Second page going to show me 20 entries (Limit 20 40)

    let end = parseInt(page) * 20;
    let start = end - 20;
    return sql.execute("SELECT * FROM `citizens` LIMIT ?, ?", [start, end]);
  }

  static findEmployeeDetail(fname, lname, dob, gender, region) {
    dob = "%" + dob + "%";
    gender = "%" + gender + "%";
    region = "%" + region + "%";

    return sql.execute(
      "SELECT * FROM `citizens` WHERE first_name=? AND last_name=? AND dob LIKE ? AND gender LIKE ? AND region LIKE ?",
      [fname, lname, dob, gender, region]
    );

    // Everything below this is :( will fix later AUCILEBLAD FIX !!!!
    //Ackchuallly below code is faster in terms of querying database so I'll leave the code commented out.

    // if (dob.length == 0 && gender.length == 0 && region.length == 0) {
    //   return sql.execute(
    //     "SELECT * FROM `citizens` WHERE first_name=? AND last_name=?",
    //     [fname, lname]
    //   );
    // }
    // if (dob.length == 0 && gender.length == 0) {
    //   return sql.execute(
    //     "SELECT * FROM `citizens` WHERE first_name=? AND last_name=? AND region=?",
    //     [fname, lname, region]
    //   );
    // }
    // if (dob.length == 0 && region.length == 0) {
    //   return sql.execute(
    //     "SELECT * FROM `citizens` WHERE first_name=? AND last_name=? AND gender=?",
    //     [fname, lname, gender]
    //   );
    // }
    // if (gender.length == 0 && region.length == 0) {
    //   return sql.execute(
    //     "SELECT * FROM `citizens` WHERE first_name=? AND last_name=? AND dob=?",
    //     [fname, lname, dob]
    //   );
    // }
    // if (gender.length == 0) {
    //   return sql.execute(
    //     "SELECT * FROM `citizens` WHERE first_name=? AND last_name=? AND dob=? AND region=?",
    //     [fname, lname, dob, region]
    //   );
    // }
    // if (region.length == 0) {
    //   return sql.execute(
    //     "SELECT * FROM `citizens` WHERE first_name=? AND last_name=? AND dob=? AND gender=?",
    //     [fname, lname, dob, gender]
    //   );
    // }
    // if (dob.length == 0) {
    //   return sql.execute(
    //     "SELECT * FROM `citizens` WHERE first_name=? AND last_name=? AND gender=? AND region=?",
    //     [fname, lname, gender, region]
    //   );
    // }
    // if (gender.length == 0) {
    //   return sql.execute(
    //     "SELECT * FROM `citizens` WHERE first_name=? AND last_name=? AND dob=? AND region=?",
    //     [fname, lname, dob, region]
    //   );
    // }

    // return sql.execute(
    //   "SELECT * FROM `citizens` WHERE first_name=? AND last_name=? AND dob=? AND gender=? AND region=?",
    //   [fname, lname, dob, gender, region]
    // );
  }
};
