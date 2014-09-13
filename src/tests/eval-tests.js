define(['chai', 'src/eval', 'src/expr', 'src/env', 'src/parse'], function(chai, eval, expr, env, parse) {
    var should = chai.should();
    suite('eval', function() {
	test('referencing a variable by name should return it', function() {
	    var outerEnv = new env.Env({foo: 42});
	    var outExpr = eval('foo', outerEnv);
	    outExpr.should.equal(42);
	});
	test('evaling numeric literal should return the literal', function() {
	    var outerEnv = new env.Env();
	    var outExpr = eval(42, outerEnv);
	    outExpr.should.equal(42);
	});
	test('the quote special form will return its argument as data', function() {
	    var outerEnv = new env.Env();
	    var inExpr = parse('(quote (0 1 2))');
	    var outExpr = eval(inExpr, outerEnv);

	    expr.isList(outExpr).should.be.true;
	    outExpr.length.should.equal(3);
	    outExpr[0].should.equal(0);
	    outExpr[1].should.equal(1);
	    outExpr[2].should.equal(2);
	});
	test('if should eval the conseq branch if the test is not false', function() {
	    var outerEnv = new env.Env();
	    var inExpr = parse('(if (quote foo) 42 187)');
	    var outExpr = eval(inExpr, outerEnv);

	    inExpr.length.should.equal(4);
	    outExpr.should.equal(42);
	});
	test('if should eval the alt branch if the test is false', function() {
	    var outerEnv = new env.Env({foo: false});
	    var inExpr = parse('(if foo 42 187)');
	    var outExpr = eval(inExpr, outerEnv);

	    outExpr.should.equal(187);
	});
	test('set! modifies the env where a matching var is set', function() {
	    var outerEnv = new env.Env({foo: 187});
	    var innerEnv = new env.Env({}, outerEnv);
	    var inExpr = parse('(set! foo 42)');
	    eval(inExpr, innerEnv);
	    outerEnv.params.foo.should.equal(42);
	});
	test('define modifies the inner-most Env where a var is set', function() {
	    var outerEnv = new env.Env({foo: 187});
	    var innerEnv = new env.Env({}, outerEnv);
	    var inExpr = parse('(define foo 42)');
	    eval(inExpr, innerEnv);
	    outerEnv.params.foo.should.equal(187);
	    innerEnv.params.foo.should.equal(42);
	});
	test('creating a lambda should return a function whose body is an eval call for your expr..', function() {
	    var innerEnv = new env.Env();
	    var inExpr = parse('(lambda (x) x)');
	    var outExpr = eval(inExpr, innerEnv);
	    (typeof outExpr).should.equal('function');
	    outExpr(42).should.equal(42);
	});
	test('begin should run each expr in sequence and return the result of the last expression', function() {
	    var innerEnv = new env.Env();
	    var inExpr = parse('(begin (define foo 42) foo)');
	    var outExpr = eval(inExpr, innerEnv);
	    outExpr.should.equal(42);
	});
	test('procedure invocation works', function() {
	    var innerEnv = new env.Env();
	    var inExpr = parse('(begin (define foo (lambda (x) x)) (foo 42))');
	    var outExpr = eval(inExpr, innerEnv);
	    outExpr.should.equal(42);
	});
    });
});
