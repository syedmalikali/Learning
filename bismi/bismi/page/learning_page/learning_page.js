frappe.pages['learning-page'].on_page_load = function (wrapper) {
	new PageContent(wrapper)
}
PageContent = Class.extend({
	init: function (wrapper) {
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Learning Page',
			single_column: true
		});
		this.make()
	},
	make: function () {
		//Current Month Sales Start
		let current_month_sales = function () {
			frappe.call({
				method: "bismi.bismi.page.learning_page.learning_page.get_current_month_sales",
				callback: function (current_month_sales) {
					console.log(current_month_sales.message[0][0])
					$("#kbranch").text(current_month_sales.message[0].branch)
					$("#knet-total").text(current_month_sales.message[0].net_total)
					$("#rbranch").text(current_month_sales.message[1].branch)
					$("#rnet-total").text(current_month_sales.message[1].net_total)
				}

			})
		}

		//Current Year Sales Start
		let current_year_sales = function () {
			frappe.call({
				method: "bismi.bismi.page.learning_page.learning_page.get_current_year_sales",
				callback: function (current_year_sales) {
					console.log(current_year_sales.message[0][0])
					$("#kybranch").text(current_year_sales.message[0].branch)
					$("#kynet-total").text(current_year_sales.message[0].net_total)
					$("#rybranch").text(current_year_sales.message[1].branch)
					$("#rynet-total").text(current_year_sales.message[1].net_total)
				}

			})
		}


		$(frappe.render_template("learning_page",{})).appendTo(this.page.main)
		current_month_sales()
		current_year_sales()
	}
});