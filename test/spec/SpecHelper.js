beforeEach(function () {
    this.addMatchers({
        toBeSomething: function () {
            return {
                compare: function (actual, expected) {
                    return {
                        pass: actual.something === "something"
                    }
                }
            };
        }
    });
});
