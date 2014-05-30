describe("Module", function () {
    it("should be available as global varibale", function () {
        expect(cms).toBeDefined();
    });

    it("should do something", function () {
        var consoleSpy = spyOn(console, 'log');

        cms.doSomething();

        expect(consoleSpy).toHaveBeenCalledWith('doSomething()');
    });
});
