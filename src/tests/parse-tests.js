define(['chai', 'src/parse', 'src/expr'], function(chai, parse, expr) {
    var should = chai.should();
    suite('parse', function() {
        test('parse() is a function', function() {
            (typeof parse).should.equal('function');
        });
    });
    suite('parse:stringToTokens', function() {
        test('stringToTokens() is a function', function() {
            (typeof parse.stringToTokens).should.equal('function');
        });
        test('stringToTokens() throws with non-string argument', function() {
            should.Throw(function() {
                parse.stringToTokens([]);
            });
        });
        test('stringToTokens() converts "42" to a single token result', function() {
            var result = parse.stringToTokens('42');
            result.length.should.equal(1);
            result[0].should.equal('42');
        });
        test('stringToTokens() converts "( list 1 2 )" to a 5 token result', function() {
            var result = parse.stringToTokens('( list 1 2 )');
            console.log(result);
            result.length.should.equal(5);
        });
        test('stringToTokens() converts "(foo (42))" to a 6 token result', function() {
            var result = parse.stringToTokens('(foo (42))');
            result.length.should.equal(6);
        });
    });
    suite('parse:tokensToExpr', function() {
	test('tokensToExpr() throws an error with no input', function() {
	    should.Throw(function() { parse.tokensToExpr(); });
	});
	test('tokensToExpr() throws an error with non-Array input', function() {
	    should.Throw(function() { parse.tokensToExpr(42); });
	});
	test('tokensToExpr() throws an error with an empty array input', function() {
	    should.Throw(function() { parse.tokensToExpr([]); });
	});
	test('tokensToExpr() converts a tokenized "42" to a Numeric atom expr', function() {
            var tokens = parse.stringToTokens('42');
	    var result = parse.tokensToExpr(tokens);
	    result.should.be.an.instanceOf(expr.Numeric);
	    result.should.not.be.an.instanceOf(Array);
	});
	test('tokensToExpr() converts a tokenized "foo" to a Symbol atom expr', function() {
            var tokens = parse.stringToTokens('foo');
	    var result = parse.tokensToExpr(tokens);
	    result.should.be.an.instanceOf(expr.Symbol);
	    result.should.not.be.an.instanceOf(Array);
	});
	test('tokensToExpr() converts a tokenized "(foo 1 2)" to a List expr', function() {
            var tokens = parse.stringToTokens('(foo 1 2)');
	    var result = parse.tokensToExpr(tokens);
	    result.should.be.an.instanceOf(Array);
	    result.length.should.equal(3)
	    result[0].should.be.an.instanceOf(expr.Symbol);
	    result[0].val.should.equal('foo');
	    result[1].should.be.an.instanceOf(expr.Numeric);
	    result[1].val.should.equal(1)
	    result[2].should.be.an.instanceOf(expr.Numeric);
	    result[2].val.should.equal(2)
	});
	test('tokensToExpr() converts a tokenized "(foo (42))" to a List expr', function() {
            var tokens = parse.stringToTokens('(foo (42))');
	    var result = parse.tokensToExpr(tokens);
	    result.should.be.an.instanceOf(Array);
	    result.length.should.equal(2)
	    result[0].should.be.an.instanceOf(expr.Symbol);
	    result[0].val.should.equal('foo');
	    result[1].should.be.an.instanceOf(Array);
	    result[1].length.should.equal(1)
	    result[1][0].should.be.an.instanceOf(expr.Numeric);
	    result[1][0].val.should.equal(42)
	});
    });
});
