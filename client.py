import requests

url = 'http://localhost:3002/test'

a = requests.get(url, params = {"stuff": "yop", "otherStuff": "woo"})
