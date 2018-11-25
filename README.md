### iframe
iframe plugin for pure javascript and jquery

## Jquery Version

# How to use

Chain posibilities:

# Acces to iframe element
$("selector").iframe("iframeselector(s)");
or shorter
$.iframe("iframeselector(s)"); equals $(document).iframe("iframeselector(s)");
or all iframe selectors
$.iframes;

# Check load
$.iframe("iframeselector(s)").load(callback(function), repeat(boolean)); // repeat to all elements or call function once time

# Generate iframe
$.generateIframe( htmlcontent(string), selectortoappend(string), srcdoc|src|innerScript(string),  id|class(string));

# Access to pure JS Dom
$.iframe("iframeselector(s)").DOM();
You can now:
$.iframe("iframeselector(s)").DOM().document; - manipulate document in iframe

for example:
$.iframe("iframeselector(s)").DOM().document.querySelectorAll("selector(s)");
$.iframe("iframeselector(s)").DOM().document.body;

$.iframe("iframeselector(s)").DOM().window; - get window object in iframe

for example:
$.iframe("iframeselector(s)").DOM().window.location.href;

# Using jquery methods

$.iframe("iframeselector(s)").select("selector(s)"); - select some elements using jquery

for example:
$.iframe("iframeselector(s)").select("selector(s)").html(); - edit/read html value
$.iframe("iframeselector(s)").select("selector(s)").append(selector); - append some selectors

## Update Table

# Version 1.0

Method - load - Listening to completly load iframe element
