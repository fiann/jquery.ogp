# Open Graph Protocol parser #

This is a simple parser for [Open Graph Protocol][ogp] data, implemented as a [jQuery][jq] plugin.

The parser converts OGP data into a JSON object, in the same format as the [server-side OGP to JSON parser][o2j]. You can then use the data from jQuery without redeclaring the content in your page.

# Usage #

First, create a page with some OGP `meta` elements. Here's the canonical example:

    <html xmlns:og="http://opengraphprotocol.org/schema/">
    <head>
    <title>The Rock (1996)</title>
    <meta property="og:title" content="The Rock" />
    <meta property="og:type" content="movie" />
    <meta property="og:url" content="http://www.imdb.com/title/tt0117500/" />
    <meta property="og:image" content="http://ia.media-imdb.com/images/rock.jpg" />
    ...
    </head>
    ...
    </html>
    
Then load the jQuery library (tested with jQuery 1.4.2) and the `jquery.ogp.js`.

    jsondata = jQuery('head').ogp();

# Testing #

There are some test pages in the `test` folder. You can fire up a simple webserver ([Sinatra][sn]) by typing

    rake server
    
and then open [http://localhost:4567/]().

There's also some basic test automation using the wonderful [Ruby wrapper for env.js][env]. Type

    rake test

to run all the tests in a simulated browser environment.

 [ogp]: http://opengraphprotocol.org/
 [jq]: http://jquery.com/
 [o2j]: http://srv.buzzword.org.uk/opengraph-to-json.html
 [sn]: http://www.sinatrarb.com/
 [env]: http://github.com/smparkes/env-js