"use strict";

beforeEach(function () {
    this.addMatchers({
        toBeSomethingBeforeEachGlobal: function (expected) {
            return this.actual.something === "something";
        }
    });
});
