module.exports = function(req, res, next) {
	if (req.session.auth === true) {
		next()
	} else {
		redirect('/login')
	}
}