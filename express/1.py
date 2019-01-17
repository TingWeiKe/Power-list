import re
import requests
import sys
from bs4 import BeautifulSoup

# string = 'Lay nme down'
string = sys.argv[2]
url = "https://www.youtube.com/results?search_query=" + string
res = requests.get(url)
soup = BeautifulSoup(res.text,'html.parser')
last = None
for entry in soup.select('a'):
    m = re.search("v=(.*)",entry['href'])
    if m:
        target = m.group(1)
        if target == last:
            continue
        if re.search("list",target):
            continue
        last = target
        print (last)
        sys.stdout.flush()

import sys

massage = '123'
print(string +massage)