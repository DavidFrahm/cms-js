"use strict";

describe("Module", function () {

    describe("cmsApi", function () {
        it("should be available as global variable", function () {
            expect(cmsApi).toBeDefined();
        });

        describe("text", function () {
            it("should call api endpoint with object name", function () {
                var ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: "text", content: "The content."});
                    return d.promise();
                });

                cmsApi.getText('any-name');

                // TODO: Custom matcher(s), e.g., toHaveBeenCalledWithUrlEndingWith('any-name')
                expect(ajaxSpy).toHaveBeenCalledWith({url: 'http://cms.pwbly.com/object/any-name'});
            });
            it("should return promise", function () {
                var ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: "text", content: "The content."});
                    return d.promise();
                });

                var promise = cmsApi.getText();

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
                cmsApi.getText()
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

                cmsApi.getText();

                expect(ajaxSpy).toHaveBeenCalled();
                expect(logSpy).toHaveBeenCalled();
            });
        });
    });
});