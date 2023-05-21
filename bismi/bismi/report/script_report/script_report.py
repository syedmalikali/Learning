# Copyright (c) 2023, Malik and contributors
# For license information, please see license.txt

# import frappe


def execute(filters=None):
    columns = [
	{'fieldname':'letter','label':'Letter','fieldtype':'Data','dropdown':False,'sortable':False},
	{'fieldname':'number','label':'Number','fieldtype':'Int','dropdown':False,'sortable':False}
]
    data = [
    {'letter':'c','number':2,'indent':0},
    {'letter':'a','number':2,'indent':1},
    {'letter':'t','number':8,'indent':2},
    {'letter':'s','number':7,'indent':0}
]
    data = [dic for dic in data if dic["number"] > int(filters.number_filter)]
    message = ["The letters '<b>cats</b>' in numbers is <span style='color:Red;'>2287</span>","<br>","The letters '<b>dogs</b>' in numbers is <span style='color:Blue;'>3647</span>"]
    message.append("<br>The value of the Number Filter is : " + filters.get("number_filter"))

    chart = {
    'data':{
        'labels':['d','o','g','s'],
        'datasets':[
            {'name':'Number','values':[3,6,4,7],'chartType':'bar'},
            {'name':'Vowel','values':[0,1,0,0],'chartType':'line'}
        ]
    },
    'type':'axis-mixed'
}
    # For single Value
    # chart = {
    #     'data':{'labels':['d','o','g','s'],
    #             'datasets':[{'values':[3,6,4,7]}]},
    #             'type':'bar'}
	#For two datasets
	
    report_summary = [
    {"label":"cats","value":2287,'indicator':'Red'},
    {"label":"dogs","value":3647,'indicator':'Blue'}
]
    return columns, data , message,chart,report_summary
