const crypto = require('crypto');
module.exports = function (text, salt) {
const decipher = crypto.createDecipher('aes192', salt);
let decrypted = decipher.update(text, 'hex', 'utf8');
decrypted += decipher.final('utf8');
return decrypted
}
