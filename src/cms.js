console.log("Loading CMS...");

cms = function () {

    doSomething = function () {
        console.log('doSomething()');
    };

    return {
        doSomething: doSomething
    }

}();

console.log("CMS loaded.");
