"use strict";

var cmsApi = function () {

    var getText = function (objectName) {
        return $.ajax({url: 'http://cms.pwbly.com/object/' + objectName})
            .then(function (data) {
                return data.content;
            })
            .fail(function () {
                cms.log("API error on GET");
            });
    };

    var getImage = function () {
        return 'http://cms.pwbly.com/object/xxTestImage/file';
        // TODO: Should this return a promise like the others do/will?
//        var d = $.Deferred();
//        d.resolve('http://cms.pwbly.com/object/xxTestImage/file');
//        return d.promise();
    };

    return {
        getText: getText,
        getImage: getImage
    }
}();

var cms = function () {

    var doSomething = function () {
        console.log('doSomething()');
    };

    var getHtmlTextElement = function (objectName) {
        return cmsApi.getText(objectName)
            .then(function (text) {
                return $('<p>' + text + '</p>');
            })
            .fail(function () {
                cms.log("API error on GET");
            });
    };

    var getHtmlImageElement = function () {

    };

    var log = function (message) {
        console.log(message);
    };

    return {
        doSomething: doSomething,
        html: {
            getTextElement: getHtmlTextElement,
            getImageElement: getHtmlImageElement
        },
        log: log
    }

}();
