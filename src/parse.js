// This module concerns the task of taking a string,
// representing the "human readable" (ie code)
// representing of an S-Expression and converting to a
// representation (ie data) that is usable by the dawdle
// interpreter  
define(['src/expr'], function(expr) {
    "use strict";
    // ### stringToTokens()
    // 
    // Takes in a string argument, `inputStr`, and parses
    // it into an array of individual "token" strings, which
    // of individual items that can be read and converted
    // into an S-Expression
    var stringToTokens = function(inputStr) {
        if (typeof inputStr !== 'string') {
            throw "stringToTokens() expects a string argument";
        }

        // Run through the provided string, building a new string with padding around brackets
        var tmpStr = ''
        var last = '';
        var curr = '';
        for(var ctr = 0; ctr < inputStr.length;ctr++) {
            var curr = inputStr[ctr];
            if (curr === '(' || curr === ')') {
                tmpStr += ' '+curr+' ';
            } else {
                tmpStr += curr;
            }
        }
        // trim whitepsace and return an array of the input, split on whitespace
        return tmpStr.trim().split(/\s+/)
    };
    
    // ### tokensToExpr()
    //
    // Takes in an array of `tokens` and moves through
    // them, recursively building up and returning a
    // single S-Expression
    var tokensToExpr = function(tokens) {
	// validate input; no shirt, no shoes, no service
	if (typeof tokens === 'undefined' ||
	    (tokens instanceof Array) === false ||
	    tokens.length === 0) {
	    throw "bad input to tokensToExpr";
	}

	// This `if/else if/else` structure is running through the
	// `curr` token and deciding how to handle consumering it
	// and then returning it
	var curr = tokens.shift();
	if (curr === '(') {
	    // In the case of an opening bracket, we know we're entering
	    // a list, so we begin to work through it until the front of the
	    // tokens array is the corresponding closing bracket
	    var list = [];
	    while (tokens[0] !== ')') {
		list.push(tokensToExpr(tokens));
	    }
	    return list;
	} else if (curr === ')') {
	    // This would be an error condition that would only arise if
	    // this function were handed an array of tokens with a `)` as
	    // the first argument
	    throw "whoops didn't expect this!";
	} else {
	    // everything else is an atom
	    return expr.newAtom(curr);
	}
    };

    // ### parse()
    //
    // The publically exported function that orchestrates
    // the previous steps.
    var parse = function(input) {
    };

    // _IMPL NOTE:_ All of the individual functions
    // that make up the orchestration are attached to it
    // for ease of testing (while still returning a single,
    // function from the module)
    parse.stringToTokens = stringToTokens;
    parse.tokensToExpr = tokensToExpr;
    return parse;
});
