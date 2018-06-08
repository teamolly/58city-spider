/**
 * Created by billy on 2017/4/25.
 */
var g = require("nodeLib");
var config = require("./config/config.58city.js");
var superagent = require('./libs/superagent');
var cheerio = require('cheerio');
var _file = g.data.file.get("58city");
var dataPool = require("./data/DataPool");
var util = require("./util/index");
var event = require("./event/emit");
var _nextPage = 75;
var _sql;
var $;
var _cookie = "";
var _currLink = "";
var _timer = null;

module.exports = class {
	constructor()
	{
		_sql = g.data.manager.getManager('local-service');
		_file.add(__projpath("./module/sql/58city"))
		this.add('init', this.init);
		this.data = [];
	}

	init($data, $succcess, $error, $client)
	{
		this.toNextPage();
		process.on("exit", () =>
		{
			trace("爬取结束，即将退出程序==============");
		})
	}

	afterLogin($url, $callback)
	{
		trace("this.page", _nextPage);
		superagent.get($url, {
			cookie: _cookie
		}).then(($data) =>
		{
			_cookie = $data.header["set-cookie"];
			if ($data.text && $data.request.url.indexOf("404") < 0)
			{
				$ = cheerio.load($data.text);
				this.resolveData($, $callback);
			}
			else
			{
				g.log.out($data);
				process.exit();
			}
		}, (err) =>
		{
			g.log.out(err);
			process.exit();
		})
	}

	resolveData($, $callback)
	{
		var list = [];
		var nodes = $("div.listBox > ul.listUl > li");
		var nodeList = util.convertArray(nodes);
		var node;
		var self = this;
		crawlLink();

		function crawlLink()
		{
			if (nodeList.length <= 1)
			{
				clearTimeout(_timer);
				$callback && $callback();
				return;
			}
			node = nodeList.shift();
			var url = $(node).find("div.img_list > a").attr("href");
			trace("source=============$url", url)
			var index = url.indexOf(".shtml")
			if (index <= 0)
			{
				crawlLink();
				return;
			}
			var link = url.slice(0, index + 6);
			_currLink = link;
			superagent.get(link, {
				cookie: _cookie
			}).then(($data) =>
			{
				_cookie = $data.header["set-cookie"];
				if (!$data.text)
				{
					crawlLink();
					return;
				}
				var $$ = cheerio.load($data.text);
				self.saveData(self.parse($$)).then(() =>
				{
					clearTimeout(_timer);
					_timer = setTimeout(() =>
					{
						crawlLink();
					}, config.timeDelay)
				}, (err) =>
				{
					g.log.out(err)
					crawlLink();
				});
			}, (err) =>
			{
				g.log.out(err);
				crawlLink();
			})
		}
	}

	saveData($itemData)
	{
		var sqlStr = _file.get("insertData.sql", $itemData);
		var promise = new Promise((resolved, rejected) =>
		{
			_sql.query(sqlStr, function ($list)
			{
				trace("done");
				resolved();
			}, (err) =>
			{
				trace("数据存储失败===============", err);
				rejected();
			});
		})
		return promise;
	}

	parse($$)
	{
		var itemData = {};
		itemData.title = $$("div.house-title > h1").text();
		itemData.link = _currLink;
		itemData.type = util.excludeSpecicalChar($$("div.house-desc-item ul > li:nth-child(2) > span:nth-child(2)").text());
		itemData.square = $$("div.house-desc-item ul > li:nth-child(2) > span:nth-child(2)").text();
		itemData.direction = $$("div.house-desc-item ul > li:nth-child(3) > span:nth-child(2)").text();
		itemData.traffic = "";
		itemData.address = util.excludeSpecicalChar($$("div.house-desc-item > ul > li:nth-child(6) > span.dz").text());
		itemData.price = $$(" div.house-desc-item > div > span > b").text();
		var location;
		try
		{
			var hrefStr = $$("div.view-more-detailmap.view-more > a").attr("href");
			var strIndex = hrefStr.indexOf("?");
			var queryStr = hrefStr.slice(strIndex + 1, hrefStr.length);
			var queryList = queryStr.split("&");
			var queryObj = {};
			for (var queryItem of queryList)
			{
				var tmpArr = queryItem.split("=");
				queryObj[tmpArr[0]] = tmpArr[1];
			}
			location = queryObj["location"];
		}
		catch (e)
		{
			location = "0,0"
		}
		itemData.lng = location.split(",")[0];
		itemData.lat = location.split(",")[1];
		return itemData;
	}

	toNextPage()
	{
		_nextPage++;
		this.afterLogin(config.pagePrefix + _nextPage + "/", () =>
		{
			this.toNextPage();
		});
	}
}