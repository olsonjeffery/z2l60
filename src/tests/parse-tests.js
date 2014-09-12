define(['chai', 'src/parse'], function(chai, parse) {
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
    suite('parse:read', function() {
    });
});
