/**
 * Created by Administrator on 2018/2/24 0024.
 */
var _list = [];
var _hash = {};
class ProxyPool {
	constructor() {

	}

	update($list) {
		for (var item of $list) {
			this.add(item);
		}
	}

	add($item) {
		var itemData = createData($item);
		if (!_hash[itemData.id] && itemData.validTime > 0) {
			_hash[itemData.id] = itemData;
			_list.push(itemData);
		}
	}

	remove($id) {
		var index = _list.indexOf(_hash[$id]);
		if (index >= 0) {
			_list.splice(index, 1)
		}
	}

	getDataById($id) {
		return _hash[$id]
	}

	get list() {
		return _list;
	}

	removeAll() {
		_list = [];
		_hash = {};
	}
}

function createData($dObj) {
	var d = {};
	d.id = Math.random();
	d.ip = "";
	d.port = "";
	d.address = "";
	d.protocol = "";
	d.validTime = 0;
	d.createTime = "";
	d.complete = "";
	d.update = updateData.bind(d);
	d.update($dObj)
	return d;
}

function updateData($dObj) {
	$dObj.hasOwnProperty("ip") && (this.ip = $dObj.ip);
	$dObj.hasOwnProperty("port") && (this.port = $dObj.port);
	$dObj.hasOwnProperty("address") && (this.address = $dObj.address);
	$dObj.hasOwnProperty("protocol") && (this.protocol = $dObj.protocol.toLowerCase());
	$dObj.hasOwnProperty("createTime") && (this.createTime = $dObj.createTime);

	if ($dObj.hasOwnProperty("validTime")) {
		if ($dObj.validTime.indexOf("天") >= 0) {
			var index = $dObj.validTime.indexOf("天");
			$dObj.validTime = $dObj.validTime.substr(0, index)
			$dObj.validTime = $dObj.validTime * 24;
		} else if ($dObj.validTime.indexOf("小时") >= 0) {
			var index = $dObj.validTime.indexOf("小时");
			$dObj.validTime = int($dObj.validTime.substr(0, index))
		} else {
			$dObj.validTime = 0;
		}
		this.validTime = $dObj.validTime
	};
	this.complete = this.protocol + "://" + this.ip + ":" + this.port;
}

module.exports = ProxyPool;