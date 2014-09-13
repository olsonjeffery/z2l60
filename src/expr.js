// This module contains the `newAtom()` helper function to take input
// atoms and convert them a corresponding representing. For now, we're
// cheating on internal representation and representing Symbols as
// `String`s and numberic values as `Number`s. Lists, the other fundamental
// expression (let's not worry about things like pairs, for now), are
// built up in `parse.tokensToExpr()`.
define([], function() {
    // ### newAtom()
    //
    // The likely, actual, entry point for new atom values, contains the logic to take a given
    // input and decide whether its a Symbol or a Numeric.. Lists are constructed on the fly
    // in `parse.tokensToExpr()`
    var newAtom = function(input) {
	if(isNaN(input) || input instanceof Array) {
	    if (typeof input !== 'string') {
		throw "newAtom() expects a numeric value or a string";
	    }
	    return String(input);
	} else {
	    return Number(input);
	}
    };
    var isSymbol = function(input) {
	return typeof input === 'string';
    };
    var isNumeric = function(input) {
	return typeof input === 'number';
    };
    var isList = function(input) {
	return input instanceof Array;
    };
    var print = function(inExpr) {
        if (isList(inExpr)) {
	    return '('+_.map(inExpr, print).join(' ')+')';
	} else {
	    return String(inExpr);
	}
    };
    return {
	newAtom: newAtom,
	isSymbol: isSymbol,
	isNumeric: isNumeric,
	isList: isList,
	print: print
    };
});
