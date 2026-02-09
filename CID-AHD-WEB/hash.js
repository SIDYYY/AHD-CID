import bcrypt from "bcryptjs";

const password = "anamarie"; // your admin password
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then(hash => {
  console.log(hash);
});
