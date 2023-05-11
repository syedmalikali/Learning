frappe.pages['learning-chart-page'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Project Charts',
		single_column: true
	});


	wrapper = $(wrapper).find('.layout-main-section');
	wrapper.append(`
					<div id="my_chart"></div>
			`);
	frappe.call({
		method: "bismi.bismi.page.learning_page.learning_page.get_item_group_values",
		callback: function (r) {
			var item_group_values = r.message;
			var labels = [], values = [];
			
			$.each(item_group_values, function (i, item_group) {
				labels.push(item_group.item_group);
				values.push(item_group.value);
			});
			
			var chart_data = {
				labels: labels,
				datasets: [
					{
						name: __("Values"),
						values: values
					}
				]
			};

			let chart = new frappe.Chart("#my_chart", { // or DOM element
				data: chart_data,

				title: "My Awesome Chart",
				type: 'bar', //'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
				height: 300,
				colors: ['purple', '#ffa3ef', 'light-blue'],

				tooltipOptions: {
					formatTooltipX: d => (d + '').toUpperCase(),
					formatTooltipY: d => d + ' pts',
				}
			});

			// chart.export();

			//setTimeout(function () { my_chart.refresh()}, 1);
		}
	});
}
