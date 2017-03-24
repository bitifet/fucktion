#!/usr/bin/env node
"use strict";
var Promise = require("bluebird");
var Deasync = require("deasync");

// The ugly thing:
function fucktion_promise(fn){
    return function(){
        var that = this;
        return Promise.all(
            [].slice.call(arguments)
                //.map(x=>Promise.resolve(x))
                    // Works with native promises.
                .map(Promise.resolve)
                    // Throws "TypeError: function resolve() { [native code] } called on non-object"
                    // with native promises, but works perfectly with BlueBird.
        ).then(function(args){
            return fn.apply(that, args);
        });
        ;

    };
};

// The uglier thing:
function fucktion_cbk(fn){
    var pfn = fucktion_promise(fn);
    return function(){
        var args = [].slice.call(arguments);
        var cbk = args.pop();
        pfn.apply(this, args)
            .then(function(result){
                cbk(null, result);
            }).catch(function(err){
                cbk(err);
            })
        ;
    };
};

// The ugliest thing:
function fucktion_sync(fn){
    return Deasync(fucktion_cbk(fn));
};

module.exports = {
    promise: fucktion_promise,
    cbk: fucktion_cbk,
    sync: fucktion_sync,
};


