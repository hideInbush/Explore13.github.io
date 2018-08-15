//https://fed.renren.com/category/basic/page/1/
const https = require('https');
const url = require('url');
const util = require('util');
const fs = require('fs');

const resultList = [];

let page = 1;
const maxPage = 5;
doRequest(page);


function doRequest(page) {
  if (page > maxPage) {
    return;
  }
  const options = {
    hostname: 'fed.renren.com',
    port: 443,
    path: page === 1 ? '' : `/category/basic/page/${page}/`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  };
  console.log(`当前请求地址：${options.hostname}${options.path}`);
  
  const req = https.request(options, (res) => {
    let rawData = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    res.on('end', () => {
      rawData.match(/<a class="dark" href.*\/a>/g).map(item => {
        const title = item.match(/title="([^"]*)"/)[1];
        const url = item.match(/(https:\/\/[^"]*)/)[0];
        resultList.push({
          title,
          url,
        });
      });

      page ++;
      writeInFile('renrenFed.md', resultList, page);

    });
  });

  req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
  });

  req.write('');
  req.end();
}

function writeInFile(filename, list, page) {
  fs.writeFile(filename, formatData(list), function(){
    doRequest(page);
  });
}

function formatData(list) {
  return list.map(item => `* [${item.title}](${item.url})`).join('\r\n')
}

