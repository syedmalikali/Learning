// Copyright (c) 2023, Malik and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Script Report"] = {
	"filters": [{
		fieldname: "number_filter",
		label: "Number Filter",
		fieldtype: "Select",
		//You can supply the options as a string of new-line (\n) separated values,
		//    or as an array of strings such as options: ["1","2","3","4","5","6","7"],
		options: "1\n2\n3\n4\n5\n6\n7",
		default: 3
	}]
};
