"use strict";

describe("Module", function () {

    describe("cms", function () {
        it("should be available as global variable", function () {
            expect(cms).toBeDefined();
        });

        describe("boilerplate samples", function () {

            beforeEach(function () {
                this.addMatchers({
                    toBeSomethingBeforeEachInSpec: function (expected) {
                        return this.actual.something === "something";
                    }
                });
            });

            it("should do something", function () {
                var consoleSpy = spyOn(console, 'log');

                cms.doSomething();

                expect(consoleSpy).toHaveBeenCalledWith('doSomething()');
            });

            it("should work with custom matchers", function () {
                var myObject = {something: "something"};
                expect(myObject).toBeSomethingBeforeEachInSpec('param, in spec');
                expect(myObject).toBeSomethingBeforeEachGlobal('param, in global');
            });
        });

        describe("text node", function () {
            it("should call getText with object name parameter", function () {
                var apiSpy = spyOn(cmsApi, 'getText').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: "text", content: "The content."});
                    return d.promise();
                });

                var promise = cms.html.getTextElement('any-name');

                expect(apiSpy).toHaveBeenCalledWith('any-name');
            });
            it("should return promise", function () {
                var apiSpy = spyOn(cmsApi, 'getText').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: "text", content: "The content."});
                    return d.promise();
                });

                var promise = cms.html.getTextElement();

                expect(apiSpy).toHaveBeenCalled();
                // TODO: Custom matcher(s), e.g., toBeJqueryPromise()
                expect(promise).toBeDefined();
                expect(promise.promise).toEqual(jasmine.any(Function));
            });
            it("should transform to a jQuery p node", function () {
                var apiSpy = spyOn(cmsApi, 'getText').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve("The content.");
                    return d.promise();
                });
                var actualElement;

                cms.html.getTextElement()
                    .then(function (returnElement) {
                        actualElement = returnElement;
                    });

                expect(apiSpy).toHaveBeenCalled();
                // TODO: Custom matcher(s), e.g., toBeJqueryElement() or toBeJqueryNode(), toHaveTagName('div')
                expect(actualElement).toEqual(jasmine.any(Object));
                expect(actualElement.length).toEqual(1);
                expect(actualElement.html()).toEqual('The content.');
                expect($("<div />").append(actualElement.clone()).html()).toEqual('<p>The content.</p>');
                expect(actualElement.prop('tagName').toLowerCase()).toEqual('p');
            });
            it("should throw error when ajax fails", function () {
                var logSpy = spyOn(cms, 'log');
                var apiSpy = spyOn(cmsApi, 'getText').andCallFake(function () {
                    var d = $.Deferred();
                    d.reject({error: 'Some error message'});
                    return d.promise();
                });

                cms.html.getTextElement();

                expect(apiSpy).toHaveBeenCalled();
                expect(logSpy).toHaveBeenCalled();
            });
        });

       describe("image node", function () {
            it("should call getImage with object name parameter", function () {
                var apiSpy = spyOn(cmsApi, 'getImage').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve('http://cms.pwbly.com/object/any-name/file');
                    return d.promise();
                });

                var promise = cms.html.getImageElement('any-name');

                expect(apiSpy).toHaveBeenCalledWith('any-name');
            });
            it("should return promise", function () {
                var apiSpy = spyOn(cmsApi, 'getImage').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve('http://cms.pwbly.com/object/any-name/file');
                    return d.promise();
                });

                var promise = cms.html.getImageElement('any-name');

                // TODO: Custom matcher(s), e.g., toBeJqueryPromise()
                expect(promise).toBeDefined();
                expect(promise.promise).toEqual(jasmine.any(Function));
            });
            it("should transform to a jQuery img node", function () {
                var apiSpy = spyOn(cmsApi, 'getImage').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve('http://cms.pwbly.com/object/any-name/file');
                    return d.promise();
                });
                var actualElement;

                cms.html.getImageElement()
                    .then(function (returnElement) {
                        actualElement = returnElement;
                    });

                expect(apiSpy).toHaveBeenCalled();
                // TODO: Custom matcher(s), e.g., toBeJqueryElement() or toBeJqueryNode(), toHaveTagName('div')
                expect(actualElement).toEqual(jasmine.any(Object));
                expect(actualElement.length).toEqual(1);
                // TODO Custom matcher toBeSelfClosingElement()
                expect(actualElement.html()).toEqual('');
                expect($("<div />").append(actualElement.clone()).html()).toEqual('<img src="http://cms.pwbly.com/object/any-name/file">');
                expect(actualElement.prop('tagName').toLowerCase()).toEqual('img');
            });
            it("should throw error when api fails", function () {
                var logSpy = spyOn(cms, 'log');
                var apiSpy = spyOn(cmsApi, 'getImage').andCallFake(function () {
                    var d = $.Deferred();
                    d.reject({error: 'Some error message'});
                    return d.promise();
                });

                cms.html.getImageElement();

                expect(apiSpy).toHaveBeenCalled();
                expect(logSpy).toHaveBeenCalled();
            });
        });

        describe("rich text node", function () {
            var apiSpy;
            beforeEach(function () {
                apiSpy = spyOn(cmsApi, 'getRichText').andCallFake(function () {
                    var d = $.Deferred();
                    d.resolve({type: "richtext", content: [
                            {text: "The ", style: null},
                            {text: "rich text", style: {"font-weight": "bold"}},
                            {text: " content", style: null}
                        ]});
                    return d.promise();
                });
            });
            it("should call getRichText with object name parameter", function () {
                var promise = cms.html.getRichTextElement('any-name');

                expect(apiSpy).toHaveBeenCalledWith('any-name');
            });
            it("should return promise", function () {
                var promise = cms.html.getRichTextElement();

                expect(apiSpy).toHaveBeenCalled();
                // TODO: Custom matcher(s), e.g., toBeJqueryPromise()
                expect(promise).toBeDefined();
                expect(promise.promise).toEqual(jasmine.any(Function));
            });
            it("should transform to a jQuery p node", function () {
                var actualElement;

                cms.html.getRichTextElement()
                    .then(function (returnElement) {
                        actualElement = returnElement;
                    });

                expect(apiSpy).toHaveBeenCalled();
                // TODO: Custom matcher(s), e.g., toBeJqueryElement() or toBeJqueryNode(), toHaveTagName('div')
                expect(actualElement).toEqual(jasmine.any(Object));
                expect(actualElement.length).toEqual(1);
                expect(actualElement.prop('tagName').toLowerCase()).toEqual('p');
            });
            it("should transform to a node containing 1 span for each content item", function () {
                var actualElement;

                cms.html.getRichTextElement()
                    .then(function (returnElement) {
                        actualElement = returnElement;
                    });

                expect(apiSpy).toHaveBeenCalled();
                // TODO: Custom matcher(s)
                expect(actualElement.children('span').length).toEqual(3);
            });
            it("should set styles on span for each content item", function () {
                var actualElement;

                cms.html.getRichTextElement()
                    .then(function (returnElement) {
                        actualElement = returnElement;
                    });

                expect(apiSpy).toHaveBeenCalled();
                // TODO: Custom matcher(s), toHaveInlineStyle()
                expect(actualElement.children().eq(1).prop('style').cssText).toContain('font-weight: bold;');
            });
            it("should throw error when ajax fails", function () {
                var logSpy = spyOn(cms, 'log');
                apiSpy.andCallFake(function () {
                    var d = $.Deferred();
                    d.reject({error: 'Some error message'});
                    return d.promise();
                });

                cms.html.getRichTextElement();

                expect(apiSpy).toHaveBeenCalled();
                expect(logSpy).toHaveBeenCalled();
            });
        });
    });
});
