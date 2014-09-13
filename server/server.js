//Setup HTTP password for dev.gooneapp.com
if(process.env.ROOT_URL == "http://goonedev-22403.onmodulus.net/"){
  var basicAuth = new HttpBasicAuth("one", "one");
  basicAuth.protect();
}
