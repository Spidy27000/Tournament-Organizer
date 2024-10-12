import requests

# Making a GET request
response = requests.get('http://localhost/test.php')
if response.status_code == 200:
    print(response.json())
