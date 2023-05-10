import frappe

@frappe.whitelist()
def get_item_count():
    # return 10;
#     result = frappe.db.sql(""" 
#     select sum(net_total) net_total,sum(grand_total) grand_total from `tabSales Invoice` where branch='KHO' AND MONTH(posting_date) = MONTH(CURRENT_DATE()) 
# AND YEAR(posting_date) = YEAR(CURRENT_DATE()) 
#     """)
    result = frappe.db.sql("""
    select branch,format(sum(net_total),2) net_total,format(sum(grand_total),2) grand_total 
    from `tabSales Invoice` 
    where MONTH(posting_date) = MONTH(CURRENT_DATE())  AND YEAR(posting_date) = YEAR(CURRENT_DATE()) 
    group by branch
    """, as_dict=True)
    return result

