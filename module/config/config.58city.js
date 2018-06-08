/**
 * Created by Administrator on 2018/2/1 0001.
 */
module.exports = {
	header: {
		"Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
		"Accept-Encoding": "gzip, deflate",
		"Accept-Language": "zh-CN,zh;q=0.9",
		"Cache-Control": "no-cache",
		"Connection": "keep-alive",
		"Pragma": "no-cache",
		"Referer": "http://hz.58.com/",
// 		"Referer": "https://zhidao.baidu.com/question/107367570.html",
		"Upgrade-Insecure-Requests": "1",
		"Host": "hz.58.com",
// 		"Host": "www.ip138.com",
		"Proxy-Authorization": "Basic MTZaU0ZWRlU6NjQ4MDgw",
		"Proxy-Tunnel": Math.round(Math.random() * 100000),
		"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36"

	},
	proxyOptions: {
		host: "b5.t.16yun.cn",
		method: "GET",
		port: "6460",
		user: "16ZSFVFU",
		pass: "648080"
	},
	proxy: "http://b5.t.16yun.cn:6460",
	cookie: "",
	client: "http://hz.58.com/chuzu/",
	server: "http://hz.58.com/chuzu/",
	pagePrefix: "pn",
	timeDelay: Math.random() * (5000) + 15000
}


