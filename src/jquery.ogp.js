/**
 * jQuery plugin to read Open Graph Protocol data from the page
 */
 
(function($) {
  
  var checkNamespacePresent = function (node) {
    console.log("Checking for namespace on node", node);
    var i, attr, attributes = node.attributes || {};
    // we're looking for xmlns:og="http://opengraphprotocol.org/schema/"
    for (i = 0; i < attributes.length; i++) {
      attr = attributes[i];
      if (attr.nodeName.substring(0,5) === "xmlns" && 
          attr.nodeValue === "http://opengraphprotocol.org/schema/") {
        return attr.nodeName.substring(6);
      }
    }
    return null;
  }
  
  $.fn.ogp = function() {
    var ns = null, data = {};
    $(this).each(function () {
      $(this).parents().andSelf().each(function () {
        ns = checkNamespacePresent(this);
        console.log("Found %s on", ns, this);
        if (ns !== null) {
          return false;
        } 
      });
      
      // give up if no namespace
      if (ns === null) {
        console.log("No namespace found");
        return null;
      }
      
      // look for OGP data
      ns = ns + ":";
      $('meta', this).each(function () {
        console.log("Looking for data in element", this);
        var prop = $(this).attr("property"), key, value;
        if (prop && prop.substring(0, ns.length) === ns) {
          key = prop.substring(ns.length);
          value = $(this).attr("content");
          console.log("Found OGP data %s=%s", key, value);
          data[key] = data[key] || [];
          data[key].push(value);
        }
      });
    });
    
    // this is the total of everything
    console.log("All the data is ", data);
    
    return data;
  }
})(jQuery);