/**
 * Created by Administrator on 2018/2/1 0001.
 */
var superagent = require('superagent');
require('superagent-proxy')(superagent);
// var config = require('./../config/config.douban');
// var config = require('./../config/config.zhihu');
var config = require('./../config/config.58city.js');
var _cookie = "";

function post($url, $params, $success, $error) {
	$params.cookie = $params.cookie || "";
	if ($params.cookie) {
		config.cookie = $params.cookie;
	}
	if ($url.indexOf("http") < 0) {
		$url = config.server + $url;
	}
	config.proxyOptions.headers = config.header
	config.proxyOptions.path = $url
	var promise = new Promise((resolved, rejected) => {
		superagent
			.post($url)
			.set("User-Agent",config.header["User-Agent"])
			.set("Accept",config.header["Accept"])
			.set("Accept-Encoding",config.header["Accept-Encoding"])
			.set("Accept-Language",config.header["Accept-Language"])
			.set("Referer",config.header["Referer"])
			.set("Host",config.header["Host"])
			.set("Upgrade-Insecure-Requests",config.header["Upgrade-Insecure-Requests"])
			.set("Proxy-Authorization",config.header["Proxy-Authorization"])
			.set("Proxy-Tunnel",config.header["Proxy-Tunnel"])
			.proxy(config.proxy)
			.set("Cookie", _cookie)
			.type("form")
			.send($params)
			.on('error', (err) => {
				if (err) {
					throw err;
					rejected(err);
					return;
				}
			})
			.end((err, res) => {
				if (err) {
					throw err;
					rejected(err);
					return;
				}
				if (res.headers["set-cookie"] && res.headers["set-cookie"][0]) {
					_cookie = res.headers["set-cookie"][0];
				}
				$success && $success();
				resolved(res);

			});
	});
	return promise;
}

function get($url, $params, $success, $error) {
	trace("before=========$url", $url);
	if ($url.indexOf("http") < 0) {
		$url = config.server + $url;
	}
	if ($params.cookie) {
		config.cookie = $params.cookie;
	}
	var promise = new Promise((resolved, rejected) => {
		trace("after========$url",$url);
		superagent
			.get($url)
			.set("User-Agent",config.header["User-Agent"])
			.set("Accept",config.header["Accept"])
			.set("Accept-Encoding",config.header["Accept-Encoding"])
			.set("Accept-Language",config.header["Accept-Language"])
			.set("Referer",config.header["Referer"])
			.set("Host",config.header["Host"])
			.set("Upgrade-Insecure-Requests",config.header["Upgrade-Insecure-Requests"])
			.set("Proxy-Authorization",config.header["Proxy-Authorization"])
			.set("Proxy-Tunnel",config.header["Proxy-Tunnel"])
			.proxy(config.proxy)
			.set("Cookie", config.cookie)
			.send($params)
			.on('error', (err) => {
				if (err) {
					rejected(err);
					return;
				}
			})
			.end((err, res) => {
				if (err) {
					rejected(err);
					return;
				}
				$success && $success();
				resolved(res);
			});
	});
	return promise;
}

module.exports = {
	get: get,
	post: post
}