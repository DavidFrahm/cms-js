"use strict";

var cms = function () {

    var doSomething = function () {
        console.log('doSomething()');
    };

    var getHtmlTextElement = function () {
        var element = null;
        $.ajax({url: 'http://cms.pwbly.com/'})
            .then(function (data) {
                element = $('<div>' + data.content + '</div>');
            })
            .fail(function () {
                cms.log("API error on GET");
            });
        return element;
    };

    var log = function (message) {
        console.log(message);
    };

    return {
        doSomething: doSomething,
        html: {
            getTextElement: getHtmlTextElement
        },
        log: log
    }

}();
