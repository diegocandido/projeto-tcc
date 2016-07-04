module.exports = function(app) {

	var DashboardController = {
		index: function(req, res) {
			res.render('dashboard/index');
		}
	}
	return DashboardController;
}
