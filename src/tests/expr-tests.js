define(['chai', 'src/expr'], function(chai, expr) {
    var should = chai.should();
    suite('expr:Numeric', function() {
	test('Numeric constructor throws if provided a non-numeric input', function() {
	    should.Throw(function() { new expr.Numeric('foo') });
	});
	test('Numeric constructor throws if provided array input', function() {
	    should.Throw(function() { new expr.Numeric([]) });
	});
	test('Numeric constructor succeeds if provided a numeric-coercible input', function() {
	    should.not.Throw(function() { new expr.Numeric(42) });
	    // we don't even *have* strings!
	    should.not.Throw(function() { new expr.Numeric('42') });
	});
    });
    suite('expr:Symbol', function() {
	test('Symbol fails with non-string input', function() {
            should.Throw(function() { new expr.Symbol(42); });
	});
	test('Symbol succeeds with string input', function() {
            should.not.Throw(function() { new expr.Symbol('41'); });
	});
    });
    suite('expr:newAtom', function() {
	test('newAtom() takes "42" and decides that it is a Numeric atom', function() {
	    var result = expr.newAtom('42');
	    result.should.be.an.instanceOf(expr.Numeric);
	});
	test('newAtom() takes any string that isNaN and decides that it is a Symbol atom', function() {
	    var result = expr.newAtom('sdfs');
	    result.should.be.an.instanceOf(expr.Symbol);
	});
  	test('newAtom() throws on array input', function() {
	    should.Throw(function() { expr.newAtom([]); });
	});
    });
});
