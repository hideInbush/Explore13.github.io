//https://api.github.com/repos/taobaofed/blog/contents/page/2/index.html
//http://taobaofed.org/
const fs = require('fs');
const superagent = require('superagent');
const Base64 = require('js-base64').Base64;

const resultList = [];

let page = 1;
const maxPage = 16;
doRequest(page);


function doRequest(page) {
  if (page > maxPage) {
    return;
  }
  const options = {
    hostname: 'api.github.com',
    // hostname: 'taobaofed.org',
    port: 1086,
    path: page === 1 ? '/repos/taobaofed/blog/contents/index.html' : `/repos/taobaofed/blog/contents/page/${page}/index.html`,
    // path: page === 1 ? '' : `/page/${page}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    timeout: 15000,
  };

  const url = `https://${options.hostname}${options.path}`;

  console.log(`当前请求地址：${options.hostname}${options.path}`);

  superagent
    .get(url)
    .end((err, res) => {
      const rawData = Base64.decode(res.body.content).match(/<div class="archives">(.|\n)*<nav id="page-nav">/g)[0];
      rawData.match(/<a href.* class="title">.*\/a>/g).map(item => {
        const title = item.match(/>(.*)<\/a>/)[1];
        const url = `http://taobaofed.org${item.match(/href="([^"]*)"/)[1]}`;
        resultList.push({
          title,
          url,
        });
      });

      page++;
      writeInFile('taobaoFed.md', resultList, page);
    })
}

function writeInFile(filename, list, page) {
  fs.writeFile(filename, formatData(list), function(){
    doRequest(page);
  });
}

function formatData(list) {
  return list.map(item => `* [${item.title}](${item.url})`).join('\r\n')
}

