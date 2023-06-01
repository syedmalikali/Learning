frappe.pages['metabase-learning'].on_page_load = function(wrapper) {
	const page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Page Title',
		single_column: true,
	});

	const createIframe = (page, iframeUrl) => {
		const iframe = `
		<iframe
			src="${iframeUrl}"
			frameborder="0"
			width="100%"
			height="600"
			allowtransparency
		></iframe>
		`;
		$(iframe).appendTo(page.body);
	};
	
	frappe.call({
		'method': 'bismi.bismi.page.metabase_learning.metabase_learning.get_url',
		'callback': function(r) {
			const url = r.message;
			// const url='http://10.10.10.20:3000/public/dashboard/9423d3ff-27a7-4344-b618-bba8b59ee5e3'
			console.log(url)
			if (url) {
				createIframe(page, url);
			}
		},
	});
};


