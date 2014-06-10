"use strict";

var cms = function () {

    var doSomething = function () {
        console.log('doSomething()');
    };

    var getText = function () {
        return $.ajax({url: 'http://cms.pwbly.com/object/i_echo_stuff'})
            .then(function (data) {
                return data.content;
            })
            .fail(function () {
                cms.log("API error on GET");
            });
    };

    var getHtmlTextElement = function () {
        return getText()
            .then(function (text) {
                return $('<p>' + text + '</p>');
            })
            .fail(function () {
                cms.log("API error on GET");
            });
    };

    var log = function (message) {
        console.log(message);
    };

    return {
        doSomething: doSomething,
        html: {
            getText: getText,
            getTextElement: getHtmlTextElement
        },
        log: log
    }

}();
