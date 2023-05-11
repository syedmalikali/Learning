import frappe

@frappe.whitelist()
def get_current_month_sales():
    # return 10;
#     result = frappe.db.sql(""" 
#     select sum(net_total) net_total,sum(grand_total) grand_total from `tabSales Invoice` where branch='KHO' AND MONTH(posting_date) = MONTH(CURRENT_DATE()) 
# AND YEAR(posting_date) = YEAR(CURRENT_DATE()) 
#     """)
    result = frappe.db.sql("""
    select branch,format(sum(net_total),2) net_total,format(sum(grand_total),2) grand_total 
    from `tabSales Invoice` 
    where MONTH(posting_date) = MONTH(CURRENT_DATE())  
      AND YEAR(posting_date) = YEAR(CURRENT_DATE()) 
    group by branch
    """, as_dict=True)
    return result

@frappe.whitelist()
def get_current_year_sales():
    # return 10;
#     result = frappe.db.sql(""" 
#     select sum(net_total) net_total,sum(grand_total) grand_total from `tabSales Invoice` where branch='KHO' AND MONTH(posting_date) = MONTH(CURRENT_DATE()) 
# AND YEAR(posting_date) = YEAR(CURRENT_DATE()) 
#     """)
    result = frappe.db.sql("""
    select branch,format(sum(net_total),2) net_total,format(sum(grand_total),2) grand_total 
    from `tabSales Invoice` 
    where YEAR(posting_date) = YEAR(CURRENT_DATE()) 
    group by branch
    """, as_dict=True)
    return result

@frappe.whitelist()
def get_branch():
    # return 10;
#     result = frappe.db.sql(""" 
#     select sum(net_total) net_total,sum(grand_total) grand_total from `tabSales Invoice` where branch='KHO' AND MONTH(posting_date) = MONTH(CURRENT_DATE()) 
# AND YEAR(posting_date) = YEAR(CURRENT_DATE()) 
#     """)
    result = frappe.db.sql("""
    select branch
    from `tabBranch` 
    order by branch
    """)
    return list(map(lambda x: x[0], result))

@frappe.whitelist()
def get_item_group_values():
    item_group_values = frappe.db.sql("""
        SELECT item_group, sum(net_amount) as value,sum(qty) as qty
        FROM `tabSales Invoice Item`
        WHERE docstatus = 1
        GROUP BY item_group
        ORDER BY value DESC
    """, as_dict=True)

    return item_group_values

@frappe.whitelist()
def get_data():
    data = {
        "labels": [],
        "datasets": [
            {
                "name": ("Total Sales"),
                "values": []
            },
            {
                "name": ("Total Cost"),
                "values": []
            },
            {
                "name": ("Total Profit"),
                "values": []
            }
        ]
    }
    # branches = frappe.get_all("Sales Invoice",  group_by="branch")
    branches = frappe.db.get_list("Sales Invoice", fields=["branch"], group_by="branch")

    for branch in branches:
        branch_name = branch.get("branch")
        sales_data = frappe.db.sql("""
        SELECT
                CONCAT(si.branch, '-', left(MONTHNAME(posting_date),3)) AS Branch_Year_Month,
                SUM(base_net_total) AS total_sales,
                sum(sii.qty*sii.incoming_rate) as total_cost,
                SUM(base_net_total)-sum(sii.qty*sii.incoming_rate) as total_profit
            FROM `tabSales Invoice` si   JOIN `tabSales Invoice Item` sii ON si.name = sii.parent 
            WHERE si.docstatus = 1 
            GROUP BY YEAR(posting_date), MONTH(posting_date),si.branch
        """,  as_dict=True)

        for row in sales_data:
            year_month = "{}".format(row.Branch_Year_Month)
            if year_month not in data["labels"]:
                data["labels"].append(year_month)

            for dataset in data["datasets"]:
                dataset["values"].append(row[dataset["name"].lower().replace(" ", "_")])

    return {
        "data": data,
        "type": "bar",
        "colors": ["#F683AE", "#2490ef", "#2F9D58"],
        "height": 300
    }


@frappe.whitelist()
def get_data_salesman():
    data = {
        "labels": [],
        "datasets": [
            {
                "name": ("Total Sales"),
                "values": []
            },
            {
                "name": ("Total Cost"),
                "values": []
            },
            {
                "name": ("Total Profit"),
                "values": []
            }
        ]
    }
    # branches = frappe.get_all("Sales Invoice",  group_by="branch")
    branches = frappe.db.get_list("Sales Invoice", fields=["branch"], group_by="branch")

    for branch in branches:
        branch_name = branch.get("branch")
        sales_data = frappe.db.sql("""
        SELECT
            CONCAT(sit.sales_person, '-', left(MONTHNAME(posting_date),3)) AS Branch_Year_Month,
            SUM(base_net_total) AS total_sales,
            sum(sii.qty*sii.incoming_rate) as total_cost,
            SUM(base_net_total)-sum(sii.qty*sii.incoming_rate) as total_profit
            FROM `tabSales Invoice` si   
            JOIN `tabSales Invoice Item` sii ON si.name = sii.parent 
            join `tabSales Team` sit on si.name = sit.parent
            WHERE si.docstatus = 1 
            GROUP BY YEAR(posting_date), MONTH(posting_date),sit.sales_person
        """,  as_dict=True)

        for row in sales_data:
            year_month = "{}".format(row.Branch_Year_Month)
            if year_month not in data["labels"]:
                data["labels"].append(year_month)

            for dataset in data["datasets"]:
                dataset["values"].append(row[dataset["name"].lower().replace(" ", "_")])

    return {
        "data": data,
        "type": "bar",
        "colors": ["#F683AE", "#2490ef", "#2F9D58"],
        "height": 300
    }