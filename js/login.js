define(['jquery', 'yusys'],
	function ($, yusys) {
		return { 
			init: function (option) {
				console.log('login init')
				yusys.ajax({
					url: '/api.do',
					data: {
						name: 'uusama',
						desc: 'smart'
					},
					method: 'POST',
					success: function (res) {
						console.log (res);
					},
					error: function (res) {
						console.log (res);
					}
				});
			}
		}
});