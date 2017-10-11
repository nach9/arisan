// require crypto
const crypto = require('crypto')

module.exports = function (text, salt) {
	const cipher = crypto.createCipher('aes192', salt)
	let encrypted = cipher.update(text, 'utf8', 'hex')
	encrypted += cipher.final('hex')
	return encrypted
}