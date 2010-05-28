module("Dependencies");

test("jQuery is present", function () {
  ok(typeof jQuery === "function", "jQuery is not defined");
});

test("jQuery.ogp plugin is present", function () {
  ok(typeof jQuery().ogp === "function", "jQuery.ogp is not defined");  
});

module("Parsing");

test("OGP data is found", function () {
  var data = $('head').ogp();
  ok(typeof data === "object", "ogp data not found");
});

test("OGP data fields", function () {
  var data = $('head').ogp();
  var expected = {
    title : ["The Rock"], 
    type : ["movie", "book"], 
    url : ["http://www.imdb.com/title/tt0117500/"], 
    image : ["http://ia.media-imdb.com/rock.jpg"]
  };
  if (QUnit.equiv(expected, data)) {
    ok(true, "All data is present as expected");
  } else {
    var field;
    for (field in expected) {
      ok(QUnit.equiv(expected[field], data[field]), "og:"+field);
    }
    for (field in data) {
      if (! expected[field]) {
        ok(false, "unexpected field 'og:" + field + "' found in data");
      }
    }
  }
})