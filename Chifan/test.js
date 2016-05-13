var crypto = require('crypto');

var key = 'jjhhssdd';


var cipher = crypto.createCipher('aes192',key);
var encrypted = cipher.update('abccc', 'utf8', 'base64');
encrypted += cipher.final('base64');
console.log(encrypted);


var decipher = crypto.createDecipher('aes192',key);
var decrypted = decipher.update(encrypted, 'base64', 'utf8');
decrypted += decipher.final();
console.log(decrypted);
