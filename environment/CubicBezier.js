var CubicBezier;

if (typeof window !== 'undefined') {
	CubicBezier = window.CubicBezier;
}
else {
	CubicBezier = function() {};
}

module.exports = CubicBezier;