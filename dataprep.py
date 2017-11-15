import urllib2
import csv
from bs4 import BeautifulSoup
import requests
import pandas as pd

quote_page = "http://dme.ap.nic.in/ma/nims.html"
page = urllib2.urlopen(quote_page)
soup = BeautifulSoup(page, 'html.parser')

name = soup.findAll('p', attrs = {'align': 'center'})
dicti = {}
my_list = []
ul=[]
ul1=["CODE","DESCRIPTION","RATE","DEPARTMENT"]
ul.append(ul1);

# for u in name:
# 	try:
# 		a1 = u.text
# 		a1 = a1.replace('\r','').replace('\n','')
# 		a1 = ''.join([i if ord(i) < 128 else '  ' for i in a1])
# 		a1 = a1.split('=')
# 		a1 = filter(None, a1)
# 		p = []
# 		for t in a1:
# 			t=''.join(t)
# 			if t.split(' ')[0] == 'DEPARTMENT'and t.split(' ')[1] == 'OF':	
# 				t=''.join(t)
# 				dept = t		
# 	except:
# 		print "''"

name1 = soup.findAll('p')
for u in name1:
	try:
		a = u.text.split(' ')
		a1 = ''.join(a).replace('\r','').replace('\n','')
		a1 = ''.join([i if ord(i) < 128 else '  ' for i in a1])
		if len(a1.split(' ')) > 3:
			c = a1.split('  ')
			c = filter(None, c)
			if(len(c) == 3) and c[0] != "CODE":
				my_lis = []
				my_lis= [c[0],c[1],c[2],dept]
				ul.append(my_lis)
				# with open("datapre.csv",'w') as resultFile:
				#     wr = csv.writer(resultFile)
				#     wr.writerows(my_lis)


		else:
			try:
				a1 = u.text
				a1 = a1.replace('\r','').replace('\n','')
				a1 = ''.join([i if ord(i) < 128 else '  ' for i in a1])
				a1 = a1.split('=')
				a1 = filter(None, a1)
				p = []
				for t in a1:
					t=''.join(t)
					if t.split(' ')[0] == 'DEPARTMENT'and t.split(' ')[1] == 'OF':	
						t=''.join(t)
						my_list.append(t)
						dept = t
			except:
				print "''"
	except:
		print "--"
ul.pop()
ul.pop()
ul.pop()
ul.pop()
df = pd.DataFrame(ul)
df.to_csv('dataprep3.csv', index=True)
