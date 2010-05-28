# Creates a simple Sinatra website for the tests

require 'rubygems'
require 'sinatra'
require 'erb'
require 'logger'

ROOT = File.join(File.dirname(__FILE__), '..')
set :root, ROOT
set :public, Proc.new { File.join(root, 'site') }
set :lib, Proc.new { File.join(root, 'lib') }

configure do
  FileUtils.mkdir_p(ROOT + "/log")
  LOGGER = Logger.new(ROOT + "/log/sinatra.log") 
end
 
helpers do
  def logger
    LOGGER
  end
end


get '/' do
  send_file File.join(settings.public, 'index.html')
end

get '/README' do
  require 'maruku'
  Maruku.new(File.read("#{settings.root}/README.markdown")).to_html
end

# Unit tests for the plugin
get '/test' do
  redirect '/test/'
end
get '/test/*' do
  file = params[:splat].join '/'
  file = 'index.html' if file.empty?
  send_file File.join(settings.root, 'test', file)
end

# QUnit is used as the test runner
get '/qunit' do
  redirect '/qunit/test/index.html'
end
get '/qunit/*' do
  send_file File.join(settings.lib, 'qunit', params[:splat])
end

# jQuery is a dependency
get '/jquery/*' do
  send_file File.join(settings.lib, 'jquery', params[:splat])
end

# Access to the plugin code
get '/src/*' do
  send_file File.join(settings.root, 'src', params[:splat])
end