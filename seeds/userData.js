const { User } = require("../models");
const fetch = require("node-fetch");

const checkUserApi = async () => {
  try {
    const response = await fetch(
      "https://randomuser.me/api/?inc=name,login,email&noinfo&password=upper,lower,number,8-16&results=20",
      {
        method: "GET",
      }
    );
    const userData = await response.json();
    console.log(typeof userData);
    const users = userData.results.map((element) => {
      return {
        first_name: element.name.first,
        last_name: element.name.last,
        password: element.login.password,
        email: element.email,
      };
    });

    users.push({
      first_name: "John",
      last_name: "Doe",
      password: "password",
      email: "john.doe@example.com",
    });

    users.push({
      first_name: "Jane",
      last_name: "Doe",
      password: "password",
      email: "jane.doe@example.com",
    });

    return users;
  } catch (err) {
    console.log(err);
  }
};

const seedUser = async () => {
  const userData = checkUserApi();
  User.bulkCreate(userData, { individualHooks: true });
};
// checkUserApi();
module.exports = seedUser;
