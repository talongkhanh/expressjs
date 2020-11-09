module.exports.inputRequire = function(req, res, next) {
	let errors = [];

	if (!req.body.name) {
		errors.push('Name is requires.');
	}

	if (!req.body.phone) {
		errors.push('Phone is requires.');
	}

	if (errors.length) {
		res.render('users/create', {
			errors: errors,
			formData: req.body,
		});
		return;
	}
	next();
}