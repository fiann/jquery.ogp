/**
 * Capture results from QUnit tests in a JS object that can be read by env.js, as well
 * as just in the DOM
 */

QUnit.results = {
  passed : 0,
  failed : 0,
  total : 0
};

QUnit.done = function (failed, total) {
  console.log("QUnit finished");
  QUnit.results.failed = failed;
  QUnit.results.total = total;
  QUnit.results.passed = total - failed;
}
