frappe.pages['learning-chart-page'].on_page_load = function(wrapper) {




	var page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Project Charts',
			single_column: true
	});


	wrapper = $(wrapper).find('.layout-main-section');
	wrapper.append(`
					<div id="my_chart"></div>
			`);

let chart = new frappe.Chart( "#my_chart", { // or DOM element
	data: {
	labels: ["12am-3am", "3am-6am", "6am-9am", "9am-12pm",
			"12pm-3pm", "3pm-6pm", "6pm-9pm", "9pm-12am"],

	datasets: [
			{
					name: "Some Data", chartType: 'bar',
					values: [25, 40, 30, 35, 8, 52, 17, 4]
			},
			{
					name: "Another Set", chartType: 'bar',
					values: [25, 50, 10, 15, 18, 32, 27, 14]
			},
			{
					name: "Yet Another", chartType: 'line',
					values: [15, 20, 3, 15, 58, 12, 17, 37]
			}
	],

	yMarkers: [{ label: "Marker", value: 70,
			options: { labelPos: 'left' }}],
	yRegions: [{ label: "Region", start: -10, end: 50,
			options: { labelPos: 'right' }}]
	},

	title: "My Awesome Chart",
	type: 'axis-mixed', // or 'bar', 'line', 'pie', 'percentage'
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