define(['chai', 'src/parse'], function(chai, parse) {
    var should = chai.should();
    suite('parse', function() {
        test('parse() is a function', function() {
            (typeof parse).should.equal('function');
        });
    });
});
