/**
 * Created by Administrator on 2018/2/24 0024.
 */
var _list = [];
var _hash = {};
class AnswerPool {
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
	d.originId = "";
	d.avatar = "";
	d.authorIntro = "";
	d.author = "";
	d.title = "";
	d.desc = "";
	d.votes = "";
	d.comment = "";
	d.createTime = "";

	d.update = updateData.bind(d);
	d.update($dObj)
	return d;
}

function updateData($dObj)
{

	$dObj.hasOwnProperty("originId") && (this.originId = $dObj.originId);
	$dObj.hasOwnProperty("avatar") && (this.avatar = $dObj.avatar);
	$dObj.hasOwnProperty("authorIntro") && (this.authorIntro = $dObj.authorIntro);
	$dObj.hasOwnProperty("author") && (this.author = $dObj.author);
	$dObj.hasOwnProperty("title") && (this.title = $dObj.title);
	$dObj.hasOwnProperty("desc") && (this.desc = $dObj.desc);
	$dObj.hasOwnProperty("votes") && (this.votes = $dObj.votes);
	$dObj.hasOwnProperty("comment") && (this.comment = $dObj.comment);
	$dObj.hasOwnProperty("createTime") && (this.createTime = $dObj.createTime);

}

module.exports = AnswerPool;