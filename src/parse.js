// This module concerns the takes of taking a string,
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
    return parse;
});
