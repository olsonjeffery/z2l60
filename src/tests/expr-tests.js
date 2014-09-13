define(['chai', 'src/expr', 'src/parse'], function(chai, expr, parse) {
    var should = chai.should();
    suite('expr:newAtom', function() {
	test('newAtom() takes "42" and decides that it is a Numeric atom', function() {
	    var result = expr.newAtom('42');
	    expr.isNumeric(result).should.equal(true);
	});
	test('newAtom() takes any string that isNaN and decides that it is a Symbol atom', function() {
	    var result = expr.newAtom('sdfs');
	    expr.isSymbol(result).should.equal(true);
	});
  	test('newAtom() throws on array input', function() {
	    should.Throw(function() { expr.newAtom([]); });
	});
	test('toString correctly serializes (foo 1 (3 4))', function() {
	    var expected = '(foo 1 (3 4))';
	    var inExpr = parse(expected);
	    var outStr = expr.print(inExpr);
	    outStr.should.equal(expected);
	});
    });
});
