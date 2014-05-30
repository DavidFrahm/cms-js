"use strict";

console.log("Loading CMS...");

var cms = function () {

    var doSomething = function () {
        console.log('doSomething()');
    };

    return {
        doSomething: doSomething
    }

}();

console.log("CMS loaded.");
