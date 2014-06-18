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

    var getImage = function (objectName) {
        var d = $.Deferred();
        d.resolve('http://cms.pwbly.com/object/' + objectName + '/file');
        return d.promise();
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

    var getHtmlImageElement = function (objectName) {
        return cmsApi.getImage(objectName)
            .then(function (fileUrl) {
                return $('<img src="' + fileUrl + '">');
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
            getTextElement: getHtmlTextElement,
            getImageElement: getHtmlImageElement
        },
        log: log
    }

}();
