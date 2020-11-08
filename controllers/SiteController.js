class SiteController {

	index(req, res) {
		res.render('index', {
			name: 'Khanh', 
			age: 20,
		});
	}

}

module.exports = new SiteController;