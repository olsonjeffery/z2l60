define(['chai', 'src/env', 'src/expr'], function(chai, env, expr) {
    var should = chai.should();
    var expect = chai.expect;
    suite('Env', function() {
	test('creating an Env with no arguments should create a new, blank Env with no outer Env and no values', function() {
		var result = new env.Env();
		JSON.stringify(result.params).should.equal('{}');
		expect(result.outer).to.equal(null);
	});
	test('creating an Env with params but no outer should create a corresponding Env', function() {
		var result = new env.Env({foo: 42});
		result.params.foo.should.equal(42);
		expect(result.outer).to.equal(null);
	});
	test('creating an Env with params and outer should create a corresponding Env', function() {
		var outer = new env.Env();
		var inner = new env.Env({foo: 42}, outer);
		inner.params.foo.should.equal(42);
		inner.outer.should.be.an.instanceOf(env.Env);
	});
    });
    suite('Env.find()', function() {
	test('find() expects a Symbol as input', function() {
	    var result = new env.Env();
	    should.Throw(function() { result.find('bla blah');});
	});
	test('find() should return the current Env when it contains the needle', function() {
	    var inner = new env.Env({needle: 42});
	    var actual = inner.find('needle');
	    actual.should.equal(inner);
	});
	test('find() should return the outer Env when it is the one that contains the needle', function() {
	    var outer = new env.Env({needle: 42});
	    var inner = new env.Env({}, outer);
	    var actual = inner.find('needle');
	    actual.should.equal(outer);
	});
	test('find() should throw an error when it has no outer and does not contain the needle', function() {
	    var inner = new env.Env();
	    should.Throw(function() { inner.find(new expr.Symbol('needle')); });
	});
    });
});
