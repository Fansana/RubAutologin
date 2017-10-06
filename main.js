/**
 * Created by Nexus on 05.10.2017.
 */
var request = require("request");
var cheerio = require("cheerio");

var name = "";
var password = "";

setInterval(function(){
    checkConnection(null, function(){
        login();
    })
},60*1000);

function login() {
    console.log("Loggin in")
    request("https://login.rz.ruhr-uni-bochum.de/cgi-bin/start", function (err, answer, body) {
        var $ = cheerio.load(body);
        var ip = $("input[name=\"ipaddr\"]")[0].attribs.value;
        var options = {
            url: "https://login.rz.ruhr-uni-bochum.de/cgi-bin/laklogin",
            method: 'POST',
            form: {
                code: 1,
                loginid: name,
                password: password,
                ipaddr: ip,
                action: "Login"
            }
        };
        request(options, function (err, answer, body) {
        })
    });
}
function checkConnection(success,failure){
    if(!failure)
        failure = function(){};
    if(!success)
        success = function(){};
    request({
        url:"http://nexusnull.com",
        timeout:1000,
    },function(err,re,body){
        if(err){
            console.log("No Connection")
            failure();
        } else {
            console.log("Got Connection");
            success();
        }
    });
}