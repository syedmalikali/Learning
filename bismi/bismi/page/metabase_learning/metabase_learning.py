# -*- coding: utf-8 -*-

from __future__ import unicode_literals
import frappe
import jwt
import time


@frappe.whitelist()
def get_url():
	METABASE_SITE_URL = 'http://10.10.10.20:3000'
	METABASE_SECRET_KEY = 'bda0b9f552ddedd5c5cab3224b84c55863c5d9a5c0627217953fdf07f09ffccf'

	payload = {
		'resource': {'dashboard': 1},
		'params': {},
		'exp': round(time.time()) + (60 * 10)  # 10 minute expiration
	}
	token = jwt.encode(payload, METABASE_SECRET_KEY, algorithm='HS256')

	iframeUrl = METABASE_SITE_URL + '/embed/dashboard/' + token.encode().decode("utf-8") + '#bordered=true&titled=false'
	#token.encode().decode('utf8') + '#bordered=true&titled=false'
    
	return iframeUrl