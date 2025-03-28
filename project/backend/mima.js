const bcrypt = require('bcrypt');
const password = '123'; // 明文密码
const hashedPassword = bcrypt.hashSync(password, 10); // 加密密码
console.log(hashedPassword);
