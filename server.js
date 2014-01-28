
/** 
 * Module dependencies
 */ 
var httpProxy = require('http-proxy')
  , config = require('nconfig')()
  , options = {router: "router/" + config.routerFile}

httpProxy.createServer(options, function(req, res, proxy) {
    if (req.url.match(/^\/(en|cs|de|ru|pl)\//)) {
	req.url = req.url.replace(/^(\/[^\/]+)(\/nc\/[^\/]+)(.*)/, "$2$1$3");	
    }
    proxy();
}).listen(config.router.port);
