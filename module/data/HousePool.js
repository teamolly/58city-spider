/**
 * Created by Administrator on 2018/2/24 0024.
 */
var _list = [];
var _hash = {};
class HousePool {
	constructor()
	{

	}

	update($list)
	{
		for (var item of $list)
		{
			this.add(item);
		}
	}

	add($item)
	{
		var itemData = createData($item);
		if (!_hash[itemData.id])
		{
			_hash[itemData.id] = itemData;
			_list.push(itemData);
		}
	}

	remove($id)
	{
		var index = _list.indexOf(_hash[$id]);
		if (index >= 0)
		{
			_list.splice(index, 1)
		}
	}

	getDataById($id)
	{
		return _hash[$id]
	}

	get list()
	{
		return _list;
	}

	removeAll()
	{
		_list = [];
		_hash = {};
	}
}

function createData($dObj)
{
	var d = {};
	d.id = Math.random();
	d.title = "";
	d.link = "";
	d.type = "";
	d.square = "";
	d.direction = "";
	d.traffic = "";
	d.address = "";
	d.price = "";
	d.lng = "";
	d.lat = "";
	d.update = updateData.bind(d);
	d.update($dObj)
	return d;
}

function updateData($dObj)
{
	$dObj.hasOwnProperty("title") && (this.title = $dObj.title);
	$dObj.hasOwnProperty("link") && (this.link = $dObj.link);
	$dObj.hasOwnProperty("type") && (this.type = $dObj.type);
	$dObj.hasOwnProperty("square") && (this.square = $dObj.square);
	$dObj.hasOwnProperty("direction") && (this.direction = $dObj.direction);
	$dObj.hasOwnProperty("traffic") && (this.traffic = $dObj.traffic);
	$dObj.hasOwnProperty("address") && (this.address = $dObj.address);
	$dObj.hasOwnProperty("price") && (this.price = $dObj.price);
	$dObj.hasOwnProperty("lng") && (this.lng = $dObj.lng);
	$dObj.hasOwnProperty("lat") && (this.lat = $dObj.lat);
}

module.exports = HousePool;