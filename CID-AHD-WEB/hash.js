import bcrypt from "bcryptjs";

const password = "CIDAHD"; // your admin password
const saltRounds = 10;

bcrypt.hash(password, saltRounds).then(hash => {
  console.log(hash);
});

//anamarie - bamgeut
//