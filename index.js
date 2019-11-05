const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(apikey='d0da71cc328d49cfb36f68be1b27e174');
var http = require('http');

let data;
let title;
let author;
let content;
let image;

newsapi.v2.everything({
  q: 'technology',
  sources: 'bbc-news,the-verge',
  domains: 'bbc.co.uk, techcrunch.com',
  from: '2019-11-04',
  to: '2019-11-04',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
  console.log(response);
  data = response;
  title = JSON.stringify(data.articles[0].title);
  author = JSON.stringify(data.articles[0].author);
  content = JSON.stringify(data.articles[0].content);
  image = JSON.stringify(data.articles[0].urlToImage);
});

http.createServer(function (req, res){
  res.writeHead(200, {'Content-Type':'text/html'});
  res.write('<!DOCTYPE html><html>');
  res.write('<head>');
  res.write('<title>THE NEWS</title>');
  res.write('<meta charset="utf-8">')
  res.write('</head>');
  res.write('<body>');
  res.write('<h1>' + title + '</h1>');
  res.write('<h3>' + author + '</h3>');
  res.write('<p>' + content + '</p>');
  res.write('<img src=' + image + '>')
  res.write('</body>');
  res.write('</html>');
  res.end();
}).listen(3000);
