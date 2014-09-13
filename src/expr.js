// This module contains the basic Atom types and a helper function to
// decide, based on the input, which type to use (we're only supporting
// Numeric and Symbol atoms for now). Lists, the other fundamental
// expression (let's not worry about things like pairs, for now), are
// built up in `parse.tokensToExpr()`.
define([], function() {
    // ### Numeric
    //
    // Represents an atom (scalar) value for a numeric value
    var Numeric = function(input) {
	// fail on anything that doesn't coerce to a number by JavaScript's tortured logic
	if (isNaN(input) || input instanceof Array) {
	    throw "Numeric() expects numeric input";
	}
	this.val = Number(input);
    }
    // ### Symbol
    //
    // Represents an atom (scalar) value for a symbol/identifier value
    var Symbol = function(input) {
	// any string's good enough for us!
	if (typeof input !== 'string') {
	    throw "Symbol() expects string input";
	}
	this.val = input;
    }
    // ### newAtom()
    //
    // The likely, actual, entry point for new atom values, contains the logic to take a given
    // input and decide whether its a Symbol or a Numeric.. Lists are constructed on the fly
    // in `parse.tokensToExpr()`
    var newAtom = function(input) {
	try {
	    return new Numeric(input);
	} catch (e) {
	    if (typeof input !== 'string') {
		throw "newAtom() expects a numeric value or a string";
	    }
	    return new Symbol(input);
	}
    };
    return {
        Numeric: Numeric,
	Symbol: Symbol,
	newAtom: newAtom
    };
});
