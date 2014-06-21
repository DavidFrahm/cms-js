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
        return $.ajax({url: 'http://cms.pwbly.com/object/' + objectName})
            .then(function (data) {
                return 'http://cms.pwbly.com/object/' + objectName + '/file';
            })
            .fail(function () {
                cms.log("API error on GET");
            });
    };

    var getRichText = function (objectName) {
        return $.ajax({url: 'http://cms.pwbly.com/object/' + objectName})
            .then(function (data) {
                return data; // TODO: or data.content? Whichever we use, probably should be consistent with getText.
            })
            .fail(function () {
                cms.log("API error on GET");
            });
    };

    return {
        getText: getText,
        getImage: getImage,
        getRichText: getRichText
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

    var getHtmlRichTextElement = function (objectName) {
        return cmsApi.getRichText(objectName)
            .then(function (richtextObject) {
                var markup = '';
                richtextObject.content.forEach(function (contentItem) {
                    var style = '';
                    if (contentItem.style) {
                        Object.getOwnPropertyNames(contentItem.style).forEach(function (stylePropertyName) {
                            var stylePropertyValue = contentItem.style[stylePropertyName];
                            style += stylePropertyName + ': ' + stylePropertyValue + '; ';
                        });
                    }
                    markup += '<span style="' + style.trim() + '">' + contentItem.text + '</span>';
                });
                return $('<p>' + markup + '</p>');
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
            getImageElement: getHtmlImageElement,
            getRichTextElement: getHtmlRichTextElement
        },
        log: log
    }

}();
