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
    const users = userData.results.map((element) => {
      return {
        first_name: element.name.first,
        last_name: element.name.last,
        password: element.login.password,
        email: element.email
      };
    });

    users.push({
      first_name: "John",
      last_name: "Doe",
      password: "password",
      email: "john.doe@example.com"
    });

    users.push({
      first_name: "Jane",
      last_name: "Doe",
      password: "password",
      email: "jane.doe@example.com"
    });
    // console.log(typeof users);
    console.log(users);
    return users;
  } catch (err) {
    console.log(err);
  }
};

const seedUser = async () => {
    try{
        const userData = checkUserApi();
        await User.bulkCreate(userData, { individualHooks: true });
    }
    catch(err){
        console.log(err);
    }
  
};
checkUserApi();
module.exports = seedUser;
