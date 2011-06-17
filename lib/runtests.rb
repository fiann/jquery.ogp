require 'rake'
require 'pathname'
require 'net/http'
require 'test/unit'

require 'johnson'
require 'johnson/tracemonkey'
require 'johnson/cli'
require 'envjs/runtime'
require 'envjs/options'

require 'benchmark'


# Initialize tests on this class for each html unit test page in ./test
class TestRunner < Test::Unit::TestCase; end
base_url = "http://localhost:4567/test/"
test_folder = File.join(File.dirname(__FILE__), '..', 'test')
test_cases = Dir.glob("#{test_folder}/**/*.html")

test_cases.each do |filename| 
  filename = filename[test_folder.length+1 .. filename.length]
  next if filename == "index.html"
  puts "Defining #{filename}"
  url = base_url + filename
  TestRunner.class_eval {
    define_method :"test_#{filename}", Proc.new {
      puts("Running #{name}")
      puts url
      envjs = Johnson::Runtime.new
      envjs.extend Envjs::Runtime
      window = envjs.evaluate("window")
      window.location.href = url
      failures = envjs.evaluate("QUnit.results.failed")
      assert_equal(0, failures, "Some JS tests failed")
    }
  }
end
