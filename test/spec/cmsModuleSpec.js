describe("Module", function () {
    it("should be available as global variable", function () {
        expect(cms).toBeDefined();
    });

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
