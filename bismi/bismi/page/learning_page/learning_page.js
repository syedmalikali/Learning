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
		let htmlcontent = `
	 		<div class="container">
			<div class="row">
			<div class="col-md-4">
			<div class="card" style="width: 18rem;">
			<div class="card-header">
			Total Sales(This Month)
		  </div>			
			<div class="card-body" style="padding:0.25rem">
			  <table class="table table-bordered border-primary" style="padding:0.25rem;margin:5px;">
			  <tr>
			  <th id="branch"></th>
			  <th style="text-align:right"><span id="net-total" > </span>
			  </tr>
			  <tr>
			  <th>Khobar</th>
			  <th><span id="grand-total"> </span>
			  </tr>
			  </table>
						  
			</div>
			
		  </div>
				</div>
				</div>
				</div>
		



		`;

		let item_count = function(){
			frappe.call({
				method:"bismi.bismi.page.learning_page.learning_page.get_item_count",
				callback:function(item_count){
					console.log(item_count.message[0][0])
					$("#branch").text(item_count.message[0].branch)
					$("#net-total").text(item_count.message[0].net_total)
					$("#grand-total").text(item_count.message[0].grand_total)
				}
				
			})
		}

		
		$(frappe.render_template(htmlcontent, this)).appendTo(this.page.main)
		item_count()
	}
});