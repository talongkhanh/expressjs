module.exports.inputRequire = function(req, res, next) {
	let errors = [];

	if (!req.body.name) {
		errors.push('Name is requires.');
	}

	if (!req.body.author) {
		errors.push('Author is requires.');
	}

	if (errors.length) {
		res.render('books/create', {
			errors: errors,
			formData: req.body,
		});
		return;
	}
	next();
}