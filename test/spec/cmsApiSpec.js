"use strict";

describe("Module", function () {

    describe("cmsApi", function () {
        var logSpy;
        beforeEach(function () {
            logSpy = spyOn(cms, 'log');
        });

        it("should be available as global variable", function () {
            expect(cmsApi).toBeDefined();
        });

        describe("text", function () {
            var ajaxSpy;

            beforeEach(function () {
                ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: "text", content: "The content."});
                    return d.promise();
                });
            });

            it("should call api endpoint with object name", function () {
                cmsApi.getText('any-name');

                // TODO: Custom matcher(s), e.g., toHaveBeenCalledWithUrlEndingWith('any-name')
                expect(ajaxSpy).toHaveBeenCalledWith({url: 'http://cms.pwbly.com/object/any-name'});
            });
            it("should return promise", function () {
                var promise = cmsApi.getText();

                // TODO: Custom matcher(s), e.g., toBeJqueryPromise()
                expect(promise).toBeDefined();
                expect(promise.promise).toEqual(jasmine.any(Function));
            });
            it("should resolve to text content as string", function () {
                var text;

                cmsApi.getText()
                    .then(function (returnText) {
                        text = returnText;
                    });

                expect(ajaxSpy).toHaveBeenCalled();
                expect(text).toEqual("The content.");
            });
            it("should throw error when ajax fails", function () {
                ajaxSpy.andCallFake(function () {
                    var d = $.Deferred();
                    d.reject({error: 'Some error message'});
                    return d.promise();
                });

                cmsApi.getText();

                expect(ajaxSpy).toHaveBeenCalled();
                expect(logSpy).toHaveBeenCalled();
            });
        });
        describe("image", function () {
            var ajaxSpy;

            beforeEach(function () {
                ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: "image"});
                    return d.promise();
                });
            });

            it("should call api endpoint with object name to verify object exists", function () {
                cmsApi.getImage('any-name');

                expect(ajaxSpy).toHaveBeenCalledWith({url: 'http://cms.pwbly.com/object/any-name'});
            });
            it("should return promise", function () {
                var promise = cmsApi.getImage();

                // TODO: Custom matcher(s), e.g., toBeJqueryPromise()
                expect(promise).toBeDefined();
                expect(promise.promise).toEqual(jasmine.any(Function));
            });
            it("should resolve to string", function () {
                var srcUrl;

                cmsApi.getImage('any-name')
                    .then(function (returnSrcUrl) {
                        srcUrl = returnSrcUrl;
                    });

                expect(srcUrl).toEqual("http://cms.pwbly.com/object/any-name/file");
            });
            it("should throw error when ajax fails", function () {
                ajaxSpy.andCallFake(function () {
                    var d = $.Deferred();
                    d.reject({error: 'Some error message'});
                    return d.promise();
                });

                cmsApi.getImage();

                expect(ajaxSpy).toHaveBeenCalled();
                expect(logSpy).toHaveBeenCalled();
            });
        });
        describe("rich text", function () {
            var ajaxSpy;

            beforeEach(function () {
                ajaxSpy = spyOn($, 'ajax').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: "richtext", content: [
                        {text: "The ", style: null},
                        {text: "rich text", style: {"font-weight": "bold"}},
                        {text: " content", style: null}
                    ]});
                    return d.promise();
                });
            });

            it("should call api endpoint with object name", function () {
                cmsApi.getRichText('any-name');

                // TODO: Custom matcher(s), e.g., toHaveBeenCalledWithUrlEndingWith('any-name')
                expect(ajaxSpy).toHaveBeenCalledWith({url: 'http://cms.pwbly.com/object/any-name'});
            });
            it("should return promise", function () {
                var promise = cmsApi.getRichText();

                // TODO: Custom matcher(s), e.g., toBeJqueryPromise()
                expect(promise).toBeDefined();
                expect(promise.promise).toEqual(jasmine.any(Function));
            });
            it("should resolve to rich text content array", function () {
                var actual;

                cmsApi.getRichText()
                    .then(function (returnContent) {
                        actual = returnContent;
                    });

                expect(ajaxSpy).toHaveBeenCalled();
                expect(actual.content).toEqual(jasmine.any(Array))
            });
            it("should throw error when ajax fails", function () {
                ajaxSpy.andCallFake(function () {
                    var d = $.Deferred();
                    d.reject({error: 'Some error message'});
                    return d.promise();
                });

                cmsApi.getRichText();

                expect(ajaxSpy).toHaveBeenCalled();
                expect(logSpy).toHaveBeenCalled();
            });
        });
    });
});
