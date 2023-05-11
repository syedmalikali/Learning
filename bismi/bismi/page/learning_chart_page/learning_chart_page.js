frappe.pages['learning-chart-page'].on_page_load = function (wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Project Charts',
		single_column: true
	});


	wrapper = $(wrapper).find('.layout-main-section');
	wrapper.append(`
	<div class="row">
  <div class="col-md-6">
  <div id="my_chart"></div>
  </div>
  <div class="col-md-6">
  <div id="my_schart"></div>
  </div>
</div>
					
					
					<div id="my_smanchart"></div>
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
	// Gross Profit Report By Branch
	frappe.call({
		method: "bismi.bismi.page.learning_page.learning_page.get_data",
		callback: function (r) {
			let chart = new frappe.Chart("#my_schart", { // or DOM element
				title: "Gross Profit Report By Branch",
                data: r.message.data,
                type: r.message.type,
                colors: r.message.colors,
                height: r.message.height,
                barOptions: {
                    stacked: true,
                    spaceRatio: 0.5
                },
                tooltipOptions: {
                    formatTooltipX: d => (d + '').toUpperCase(),
                    formatTooltipY: d => format_currency(d)
                },
                format_tooltip_x: d => (d + '').toUpperCase(),
                format_y: d => format_currency(d)
            });
			
		
		}
    });

	// Gross Profit Report By Salesman
	frappe.call({
		method: "bismi.bismi.page.learning_page.learning_page.get_data_salesman",
		callback: function (r) {
			let chart = new frappe.Chart("#my_smanchart", { // or DOM element
				title: "Gross Profit Report By  Salesman",
                data: r.message.data,
                type: r.message.type,
                colors: r.message.colors,
                height: r.message.height,
                barOptions: {
                    stacked: true,
                    spaceRatio: 0.5
                },
                tooltipOptions: {
                    formatTooltipX: d => (d + '').toUpperCase(),
                    formatTooltipY: d => format_currency(d)
                },
                format_tooltip_x: d => (d + '').toUpperCase(),
                format_y: d => format_currency(d)
            });
			
		
		}
    });

	

}
