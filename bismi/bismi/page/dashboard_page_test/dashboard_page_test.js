frappe.pages['dashboard-page-test'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: __('SM Dashboard'),
		single_column: true
	});
	// new erpnext.BOMComparisonTool(page);
	new erpnext.SMDashboard(page);
	
}
// erpnext.BOMComparisonTool = class BOMComparisonTool {
erpnext.SMDashboard = class SMDashboard {
	constructor(page) {
		this.page = page;
		this.make_form();
	}

	make_form() {
		
		
		this.form = new frappe.ui.FieldGroup({
			fields: [
				{
					label: __('BOM 1'),
					fieldname: 'name1',
					fieldtype: 'Link',
					options: 'BOM',
					change: () => this.fetch_and_render(),
					get_query: () => {
						return {
							filters: {
								"name": ["not in", [this.form.get_value("name2") || ""]]
							}
						}
					}
				},
				{
					fieldtype: 'Column Break'
				},
				{
					label: 'Attachment',
					fieldname: 'attachment',
					fieldtype: 'Attach'
				},
				{
					label: 'Select User',
					label: 'user',
					fieldtype: 'Autocomplete',
					options: [
						'faris@erpnext.com',
						'suraj@erpnext.com'
					]
				},
				{
					fieldtype: 'Section Break'
				},
				{
					label: 'Amount',
					fieldname: 'amount',
					fieldtype: 'Currency',
					options: 'INR' // or name of field which holds currency
				},
				{
					fieldtype: 'HTML',
					fieldname: 'preview'
				}
			],
			body: this.page.body
		});
		this.form.make();
	}
	}

