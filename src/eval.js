// This module contains the main eval loop implementation. It
// takes an s-expression (atom or list), executing within the
// context of the current `Env`, and returns an s-expression
// of the result
define(['src/expr', 'src/env'], function(expr, env) {
    var eval = function(inExpr, inEnv) {
	if(expr.isSymbol(inExpr)) {
	    // If the input to `eval()` is a single Symbol, then
	    // it's treated as a variable looking in the provided
	    // `Env`.
	    return inEnv.find(inExpr).params[inExpr];
	} else if (!expr.isList(inExpr)) {
	    // If the provided input isn't a list, as per `expr.isList()`,
	    // then it's a [numeric only for now] literal
	    return inExpr;
	}
	// From this point onward, we assume that the input is a list
	else if (inExpr[0] === 'quote') {
	    // Implementation of the `quote` special form; allows declaring
	    // literal data structures within code (that is, none of the
	    // contents of the quoted data is evaluated.
	    return inExpr[1];
	}
	else if (inExpr[0] === 'if') {
	    // The `if` special form; This item takes a `test` expression
	    // that is evaluated. If it returns a "true" value (which we'll
	    // take to be triple-equal truth for now, despite no boolean
	    // value type..), then we eval the `conseq` branch, otherwise
	    // we eval the `alt` branch	
	    var test   = inExpr[1],
		conseq = inExpr[2],
		alt    = inExpr[3];
	    if(eval(test, inEnv) !== false) {
	    }
	    return eval(
		    eval(test, inEnv) !== false ?
		        conseq
		        : alt, inEnv);
	}
	else if (inExpr[0] === 'set!') {
            // The `set!` special form will use `find()` to go through the
	    // provided `Env`, looking for a variable matching the provided
	    // symbol.. if it finds it, then it overwrites it.. otherwise
	    // its similar to the failure cause for `Env.find()`.
	    inEnv.find(inExpr[1]).params[inExpr[1]] = eval(inExpr[2], inEnv);
	}
	else if (inExpr[0] === 'define') {
	    // The `define` special form will create a new entry, in the current
	    // inner-most Env for the provided symbol (shadowing what's in the
	    // outer Env(s), if anything, or overwriting what's in the current
	    // env if something's there
	    inEnv.params[inExpr[1]] = eval(inExpr[2], inEnv);
	}
	else if (inExpr[0] === 'lambda') {
	    // The 'lambda' special form is used to define new procedures in
	    // lisp code. Usually this is combined with a call to `define` to
	    // store a user-created procedure in the `Env`
	    return function() {
	        var vars = inExpr[1];
		var body = inExpr[2];
		var params = {};
		_.each(_.zip(vars, arguments), function(e) {
		    params[e[0]] = e[1];
		});
		return eval(body, new env.Env(params, inEnv));
	    };
	}
	else if (inExpr[0] === 'begin') {
	    // `begin` is a special form that is used to sequentially evaluate
	    // any number of expressions, return the result of the last one.
	    var outExpr = null;
	    _.each(_.rest(inExpr), function(currExpr) {
		outExpr = eval(currExpr, inEnv);
	    });
	    return outExpr;
	}
	else {
	    // Finally, if we reach this point and none of the other cases have
	    // matched, then that means we are invoking a procedure. Every entry in the
	    // input list (including the first) is evaluated, and then it is assumed that
	    // the first one will resolve to a function/lambda, which is then invoked
	    // with the remaining items.
	    var evaldArgs = _.map(inExpr, function(currExpr) {
		return eval(currExpr, inEnv);
	    });
	    return _.first(evaldArgs).apply({}, _.rest(evaldArgs));
	}	
    };

    return eval;
});
