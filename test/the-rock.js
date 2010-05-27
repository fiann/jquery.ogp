module("Dependencies");

test("jQuery is present", function () {
  ok(typeof jQuery === "function", "jQuery is not defined");
});

test("jQuery.ogp plugin is present", function () {
  ok(typeof jQuery().ogp === "function", "jQuery.ogp is not defined");  
})

module("Parsing");

test("OGP data is found", function () {
  data = $('head').ogp();
  ok(typeof data === "object", "ogp data not found");
})