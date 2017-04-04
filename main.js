var http = require('http'),
    url = require('url');
http.createServer(function(cliReq, cliRes){
  var ip4 = cliReq.connection.remoteAddress;
  var x = url.parse(cliReq.url);
  var opt = {
      host: x.host, port: x.port || 80, path: x.path,
             method: cliReq.method, headers: cliReq.headers
  };
  var svrReq = http.request(opt, function(svrRes){
   cliRes.writeHead(svrRes.statusCode, svrRes.headers);
    svrRes.pipe(cliRes);
	svrReq.end();	
  });
  cliReq.pipe(svrReq);	
}).listen(8080); 