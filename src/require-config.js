require.config({
    baseUrl: '/',
    paths: {
        'zepto'        : '/vendor/zepto',
        'underscore'    : '/vendor/underscore',
        'mocha'         : '/vendor/mocha',
        'chai'          : '/vendor/chai'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'zepto': {
            exports: '$'
        },
    }
});

require(['require', 'chai', 'mocha', 'zepto'], function(require, chai){
    /*globals mocha */
    mocha.setup('tdd');
    
    // test runner
    require([
        'src/tests/parse-tests',
        'src/tests/expr-tests',
        'src/tests/env-tests',
        'src/tests/eval-tests',
    ], function(require) {
        mocha.run();
    });
    
});
