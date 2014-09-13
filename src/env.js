// This module contains the definition of the Environment, or Env.
// Its job is to contain the ongoing, global state of the program
// over its course, with values in the "innermost" part of the program
// taking precedence over values with the same identifier defined in
// an outer context
define(['underscore', 'src/expr'], function(_, expr) {
    // ### Env
    //
    // The actual constructor function encapsulating the Env, itself
    var Env = function(params, outer) {
	var self = this;
	self.params = {};
	// If a `params` object is provided, we'll run through it,
	// looking for non-default properties to add to this object's
	// `params` instance (_IMPL NOTE:_ We're taking the time to
	// clone the keys, at least, so as to not be so sloppy as
	// enter into any kind of reference madness we take a params
	// object in this context that was passed from somewhere else
	// and then mess it up...
	if (typeof params !== 'undefined') {
	    _.each(params, function(v, k) {
		self.params[k] = v;
	    });
	}

	// If an `outer` argument is provided, we'll set it on this
	// instance.
	self.outer = null;
	if (typeof outer !== 'undefined') {
	    self.outer = outer;	
	}

	// ### find
	//
	// Will return the `Env` instance that contains the provided `needle`,
	// which must be a Symbol
	self.find = function(needle) {
	    if(expr.isSymbol(needle) === false) {
		throw "Env.find() expects a Symbol argument";
	    }
	    if(typeof self.params[needle] !== 'undefined') {
	        // I'll take it!
		return self;
	    } else if (self.outer === null) {
		// If there's no outer, we should error out.
		throw "Can't find needle '"+needle+"' before hitting outer-most Env context";
	    } else {
		// Otherwise let's dive in.
		return outer.find(needle);
	    }
	};
    };

    // ### addGlobals
    //
    // This drops the basic suite of procedures into an `Env` in order
    // to make it meet the minimum standards of usefulness
    var addGlobals = function(targetEnv) {
	targetEnv.params['+'] = function() {
	    var result = 0;
	    return result;
	};
    };

    return {
	Env: Env,
	addGlobals: addGlobals
    };
});
