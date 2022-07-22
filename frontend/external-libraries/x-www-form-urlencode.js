function encodexwww(s) {
	return encodeURIComponent(s)
		.replace(/\%0(?:D|d)(?=\%0(?:A|a))\%0(A|a)/g, '&')
		.replace(/\%0(?:D|d)/g, '&')
		.replace(/\%0(?:A|a)/g, '&')
		.replace(/\&/g, '%0D%0A')
		.replace(/\%20/g, '+')
}

function decodexwww(s) {
	return decodeURIComponent(s.replace(/\+/g, '%20'))
		.replace(/\r\n/g, '\n')

}
module.exports = {
	encodexwww, decodexwww
}
