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

    describe("content", function () {
        describe("text", function () {
            it("should transform to an html div string", function () {
                var ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: 'text', content: 'The content.'});
                    return d.promise();
                });

                var textElement = cms.html.getTextElement();

                expect(ajaxSpy).toHaveBeenCalled();
                expect(textElement).toEqual('<div>The content.</div>');
            });
            it("should throw error when ajax fails", function () {
                var logSpy = spyOn(cms, 'log');
                var ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.reject({error: 'Some error message'});
                    return d.promise();
                });

                var textElement = cms.html.getTextElement();

                expect(ajaxSpy).toHaveBeenCalled();
                expect(logSpy).toHaveBeenCalled();
                expect(textElement).toBeNull();
            });
        });
    });
});
