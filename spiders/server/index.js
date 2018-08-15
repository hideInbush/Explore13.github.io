/* eslint-disable */
//http://www.alloyteam.com/alloyshare/admin/cgi-bin/get_weekly/?period=15
const http = require('http');
const url = require('url');
const util = require('util');
const fs = require('fs');

const resultList = [];

let period = 1;
const maxPeriod = 62;
doRequest(period);


function doRequest(period) {
  if (period > maxPeriod) {
    return;
  }
  const options = {
    hostname: 'www.alloyteam.com',
    port: 80,
    path: `/alloyshare/admin/cgi-bin/get_weekly/?period=${period}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };
  console.log(`当前请求地址：${options.path}`);
  
  const req = http.request(options, (res) => {
    let rawData = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      const result = JSON.parse(rawData.trim());
      if (result.msg === 'success' &&
          result.data &&
          result.data.weeklyList.length > 0
        ) {
        Object.values(result.data.weeklyList).map(weeklyList => {
          const list = weeklyList.list;
          resultList.push(...list.map(item => Object.assign({}, {title: item.title, url: item.url})));
        })
      }

      period ++;
      fs.writeFile('alloyWeekJson.md', resultList.map(item => `* [${item.title}](${item.url})`).join('\r\n'), function(){
        doRequest(period);
      });

    });
  });


  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });

  // 写入数据到请求主体
  req.write('');
  req.end();
}

