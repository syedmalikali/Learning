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

		let item_count = function () {
			frappe.call({
				method: "bismi.bismi.page.learning_page.learning_page.get_item_count",
				callback: function (item_count) {
					console.log(item_count.message[0][0])
					$("#kbranch").text(item_count.message[0].branch)
					$("#knet-total").text(item_count.message[0].net_total)
					$("#rbranch").text(item_count.message[1].branch)
					$("#rnet-total").text(item_count.message[1].net_total)

					$("#grand-total").text(item_count.message[0].grand_total)
				}

			})
		}


		$(frappe.render_template("learning_page",{})).appendTo(this.page.main)
		item_count()
	}
});