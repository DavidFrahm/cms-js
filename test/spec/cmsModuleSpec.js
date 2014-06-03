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
        describe("text object", function () {
            it("should transform to a jQuery div node", function () {
                var ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: 'text', content: 'The content.'});
                    return d.promise();
                });

                var textElement = cms.html.getTextElement();

                expect(ajaxSpy).toHaveBeenCalled();
                // TODO: Custom matcher(s), e.g., toBeJqueryElement() or toBeJqueryNode(), toHaveTagName('div')
                expect(textElement).toEqual(jasmine.any(Object));
                expect(textElement.size()).toEqual(1);
                expect(textElement.html()).toEqual('The content.');
                expect($("<div />").append(textElement.clone()).html()).toEqual('<div>The content.</div>');
                expect(textElement.prop('tagName').toLowerCase()).toEqual('div');
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
