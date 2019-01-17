let {PythonShell} = require('python-shell')

// PythonShell.run('1.py', null, function (err,data) {
//     if (err) throw err;
//     console.log(data);
//   });

//   let x  = "import re;import requests;import sys;from bs4 import BeautifulSoup;string = 'Lay nme down';url = 'https://www.youtube.com/results?search_query=' + string;res = requests.get(url);soup = BeautifulSoup(res.text,'html.parser');last = None;for entry in soup.select('a'):m = re.search('v=(.*)',entry['href']) if m:target = m.group(1) if target == last:continue \tif re.search('list',target): ;last = target;print (last);sys.stdout.flush();"

  
//   let y = "a = [1,2,3,4] for i in a: print(i);" 
 
//   PythonShell.runString(y, null, function (err,data) {
//     if (err) throw err;
//     console.log(data);
//   });

//   PythonShell.send()
let arr = ["妳還要我怎樣",'明明就']
let pyshell = new PythonShell('1.py',{args:arr });
 
// sends a message to the Python script via stdin
 
pyshell.on('message', function (message) {
  // received a message sent from the Python script (a simple "print" statement)
  console.log(message);
});

// pyshell.end(function (err,code,signal) {
//     if (err) throw err;
//     console.log('The exit code was: ' + code);
//     console.log('The exit signal was: ' + signal);
//     console.log('finished');
//     console.log('finished');
//   });