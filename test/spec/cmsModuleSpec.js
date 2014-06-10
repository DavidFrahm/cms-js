"use strict";

describe("Module", function () {
    it("should be available as global variable", function () {
        expect(cms).toBeDefined();
    });

    describe("boilerplate samples", function () {
        it("should do something", function () {
            var consoleSpy = spyOn(console, 'log');

            cms.doSomething();

            expect(consoleSpy).toHaveBeenCalledWith('doSomething()');
        });

        it("should work with custom matchers", function () {
            var myObject = {something: "something"};
            expect(myObject).toBeSomething();
        });
    });

    describe("HTML interface", function () {
        describe("text", function () {
            it("should return promise", function () {
                var ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: "text", content: "The content."});
                    return d.promise();
                });

                var promise = cms.html.getText();

                expect(ajaxSpy).toHaveBeenCalled();
                // TODO: Custom matcher(s), e.g., toBeJqueryPromise()
                expect(promise).toBeDefined();
                expect(promise.promise).toEqual(jasmine.any(Function));
            });
            it("should resolve to string", function () {
                var ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: "text", content: "The content."});
                    return d.promise();
                });

                var text;
                cms.html.getText()
                    .then(function (returnText) {
                        text = returnText;
                    });

                expect(ajaxSpy).toHaveBeenCalled();
                expect(text).toEqual("The content.");
            });
            it("should throw error when ajax fails", function () {
                var logSpy = spyOn(cms, 'log');
                var ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.reject({error: 'Some error message'});
                    return d.promise();
                });

                cms.html.getText();

                expect(ajaxSpy).toHaveBeenCalled();
                expect(logSpy).toHaveBeenCalled();
            });
        });

        describe("text node", function () {
            it("should return promise", function () {
                var ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: "text", content: "The content."});
                    return d.promise();
                });

                var promise = cms.html.getTextElement();

                expect(ajaxSpy).toHaveBeenCalled();
                // TODO: Custom matcher(s), e.g., toBeJqueryPromise()
                expect(promise).toBeDefined();
                expect(promise.promise).toEqual(jasmine.any(Function));
            });
            it("should transform to a jQuery p node", function () {
                var ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: 'text', content: 'The content.'});
                    return d.promise();
                });

                var textElement;
                cms.html.getTextElement()
                    .then(function (returnTextElement) {
                        textElement = returnTextElement;
                    });

                expect(ajaxSpy).toHaveBeenCalled();
                // TODO: Custom matcher(s), e.g., toBeJqueryElement() or toBeJqueryNode(), toHaveTagName('div')
                expect(textElement).toEqual(jasmine.any(Object));
                expect(textElement.size()).toEqual(1);
                expect(textElement.html()).toEqual('The content.');
                expect($("<div />").append(textElement.clone()).html()).toEqual('<p>The content.</p>');
                expect(textElement.prop('tagName').toLowerCase()).toEqual('p');
            });
            it("should throw error when ajax fails", function () {
                var logSpy = spyOn(cms, 'log');
                var ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.reject({error: 'Some error message'});
                    return d.promise();
                });

                cms.html.getTextElement();

                expect(ajaxSpy).toHaveBeenCalled();
                expect(logSpy).toHaveBeenCalled();
            });
        });
    });
});
