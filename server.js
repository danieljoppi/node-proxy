var http = require('http'),
    https = require('https'),
    url = require('url');

http.createServer(onRequest).listen(8080);

console.log('Start node-proxy', 8080);

function onRequest(client_req, client_res) {
  console.log('serve: ' + client_req.url, client_req.headers);

  var o = url.parse(client_req.url);
//return client_res.status(204).end();
  var options = {
    hostname: o.hostname,
    port: o.port,
    path: o.path,
    protocol: o.protocol,
    method: 'GET',
    headers: {
       'Accept':'text/html',
        //'Accept-Encoding': 'gzip',
       'Accept-Language': 'en-US;q=0.6,en;q=0.4',
       'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.12$
    }
  };

  //console.log(options);
  var hreq = ~o.protocol.indexOf('https') ? https : http;
  var proxy = hreq.request(options, function (res) {
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
}
