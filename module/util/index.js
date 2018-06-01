function convertArray($obj)
{
	return Array.prototype.slice.call($obj)
}

function excludeSpecicalChar($str)
{
	$str = $str.replace(/[\'\"\\\/\b\f\n\r\t]/g, '')
	$str = $str.replace(/[\@\#\$\%\^\&\*\(\)\{\}\:\<\>\?\[\]\ ]/g, '')
	return $str;
}

module.exports = {
	convertArray: convertArray,
	excludeSpecicalChar: excludeSpecicalChar
}