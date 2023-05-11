frappe.pages['learning-chart-page'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Project Charts',
		single_column: true
	});


	wrapper = $(wrapper).find('.layout-main-section');
	wrapper.append(`
					<div id="my_chart"></div>
					<div id="my_schart"></div>
			`);
	frappe.call({
		method: "bismi.bismi.page.learning_page.learning_page.get_item_group_values",
		callback: function (r) {
			var item_group_values = r.message;
			var labels = [], values = [];
			
			$.each(item_group_values, function (i, item_group) {
				labels.push(item_group.item_group);
				values.push(item_group.value);
				values.push(item_group.qty);
			});
			console.log(values);
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
	frappe.call({
		method: "bismi.bismi.page.learning_page.learning_page.get_data",
		callback: function (r) {
			let chart = new frappe.Chart("#my_schart", { // or DOM element
				title: "Branch Sales",
                data: r.message.data,
                type: r.message.type,
                colors: r.message.colors,
                height: r.message.height,
                barOptions: {
                    stacked: true,
                    spaceRatio: 0.5
                },
                tooltipOptions: {
                    formatTooltipX: d => moment(d, "YYYY-MM").format("MMM YYYY"),
                    formatTooltipY: d => format_currency(d)
                },
                format_tooltip_x: d => moment(d, "YYYY-MM").format("MMM YYYY"),
                format_y: d => format_currency(d)
            });
			console.log(r.message.data)
		
		}
    });


	

}
