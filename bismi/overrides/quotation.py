import frappe
from erpnext.selling.doctype.quotation.quotation import Quotation


class QuotationCustom(Quotation):
    """
        override
    """
    def test(self):
        frappe.msgprint("malik")

        return "Malik Testing"
