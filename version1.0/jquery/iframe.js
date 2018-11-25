/* Object Declarate */
var iframe = {
	init: function(elem) {
		this.elem = elem;
		this.$elem = $(elem);
		//this.$iframeDoc = elem[0].contentWindow.document || elem[0].contentDocument;
		this.$iframeSelector = this.buildDOM(this.$elem[0]);
		this.$iframeContent = this.$elem.contents();
		//let selector = this.$iframeSelector.document.querySelectorAll(elem);
		//this.$iframeSelected = {0:selector, "length":selector.length};
		//console.log(this.$iframeSelected);
		return this;
	},
	html: function(content) {
		return this.$elem.html(content);
	},
	buildDOM: function(elem) {
		if(typeof(elem)!==null && typeof(elem)!=='' && elem) {
		return {"window":elem.contentWindow, "document":elem.contentDocument || elem.contentWindow.document, "node":elem};
		} else return null;
	}
}

if(typeof Object.create !== 'function') {
	Object.create = function (o) {
		function F() {}
		F.prototype = o;
		return new F();
	};
}

(function ( $ ) {

/* jQuery iframe Extension by Grano22 */
$.fn.iframe = function(selector="iframe") {
	
	
	if(this.length && (this[0].tagName!="iframe" || this[0].tagName!="IFRAME")) {
	   var currSelector = this.find($(selector));
			var selfel = currSelector.each(function(index) {
				 if(currSelector[index].tagName=="iframe" || currSelector[index].tagName=="IFRAME") {
			 var iframeObj = Object.create(iframe);
			 iframeObj.init(selector);

			//Save
			$.data(this, "iframe", iframeObj);
				 
	 } else {  console.log("That element is not iframe");  return false; }
       
	});		
	var self = this;
	this.load = function(cb, repeat=false) { $.fn.iframe.load(currSelector, cb,  repeat); }
	this.DOM = function() {return $.fn.iframe.DOM(currSelector, selector)};
	this.select = function(subselector="*") {
		
		var self = this;
		var iframeContents = {};
		 currSelector.each(function(index) {
			 var iframeObj = Object.create(iframe);
			 iframeObj.init(selector);
              //Submethods
          iframeContents = iframeObj.$iframeContent.find(subselector);
			  
			});		
	    iframeContents.__proto__ =  $.extend( {}, $.fn );
	      return iframeContents;
	}
	 return this;
			 
		/* } else {  console.log("That element is not iframe");  return false; }*/
   } else {  console.log("Parent element cannot be iframe, change parent selector");  return false; }
		
}

/* Get iframe DOM */
$.fn.iframe.DOM = function(currSelector, selector) {
	 if(currSelector.length == 1) {
		  var iframeObj = Object.create(iframe);
		  iframeObj.init(selector);
		 return iframeObj.$iframeSelector;
		 
	 } else {
	var DOMCollection = {};
		 
		 currSelector.each(function(index) {
			 var iframeObj = Object.create(iframe);
			 iframeObj.init(currSelector[index]);
             DOMCollection[index] = iframeObj.$iframeSelector;
			});		
	      return DOMCollection;
		}
}

/* Loader Iframe Selector */
$.fn.iframe.load = function(currSelector, cb, repeat) {
	var callout = false;
	currSelector.each(function(index) {
		
		var iframeHTML = currSelector[index].contentWindow.document || currSelector[index].contentDocument; //this.contents();
		var iframeEl = currSelector[index];
		
		
  function iframeReady() {
  console.log('iframe '+iframeEl.id+' is ready');
	iframeEl.contentDocument.removeEventListener('DOMContentLoaded', iframeReady);
   iframeEl.contentWindow.removeEventListener('load', iframeReady);
  iframeEl.removeEventListener('load', iframeReady);
	if(repeat) cb(); else { if(index==currSelector.length-1) cb(); }
      }

  if (iframeEl.contentDocument.readyState === "interactive" || iframeEl.contentDocument.readyState === "complete") {
    iframeReady();
	  
  } else {
   iframeEl.contentDocument.addEventListener('DOMContentLoaded', iframeReady);
    iframeEl.contentWindow.addEventListener('load', iframeReady);
   iframeEl.addEventListener('load', iframeReady);
  }
	});

}

$.fn.iframeload = function(cb) {
	if(this[0].tagName=="iframe" || this[0].tagName=="IFRAME") {

		var iframeHTML = this[0].contentWindow.document || this[0].contentDocument; //this.contents();
		var iframeEl = this[0];
		
		function iframeReady() {
  console.log('iframe '+iframeEl+' is ready');
	
   iframeEl.contentDocument.removeEventListener('DOMContentLoaded', iframeReady);
   iframeEl.contentWindow.removeEventListener('load', iframeReady);
  iframeEl.removeEventListener('load', iframeReady);
		cb();
      }
		
  if (this[0].contentDocument.readyState === "interactive" || this[0].contentDocument.readyState === "complete") {
    iframeReady();
	  
  } else {
    this[0].contentDocument.addEventListener('DOMContentLoaded', iframeReady);
    this[0].contentWindow.addEventListener('load', iframeReady);
    this[0].addEventListener('load', iframeReady);
  }
	  
		    // document.addEventListener('load', this, cb());
	} else {  console.log("That element is not iframe");  return false;}
}

/* Generate iframe */
$.prototype.generateIframe = function(content, container, contentType="src", iframename="") {
	var unsupported = '<span class="error">Twoja przeglądarka nie obsługuje elementów iframe</span>';
	var wrapper = "";
	if(iframename==="") var newIframe = $("<iframe></iframe>"); else if(iframename.indexOf(".")==1) { iframename = iframename.replace(".", ""); var newIframe = $('<iframe class="'+iframename+'">'); var selector="."+iframename; } else { var newIframe = $('<iframe id="'+iframename+'"></iframe>'); var selector="#"+iframename; }
	
    newIframe.html(unsupported);
	var param1 = false;
	switch(contentType) {
		case "src":
			newIframe.attr("src", content);
		break;
		case "srcdoc":
		var contentArr = content.match(/<\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/g);  //(/\"(.*?)\"/g);
	var ncontentArr = new Array();
	contentArr.forEach(function(val, index) {
		ncontentArr[index]  = val.replace(/\"/g, "'" );
	content = content.replaceAt(content.indexOf(contentArr[index]),ncontentArr[index]);
	   });
		newIframe.attr("srcdoc", content);
		break;
		case "innerScript":
		wrapper = $('<script>$("'+selector+'")[0].srcdoc=\''+content+'\'</script>;');
		param1 = true;
		break;
	}
	//$(container).append(wrapper+newIframe);
	newIframe.appendTo(container);
	if(param1) wrapper.appendTo(container);
}

$.generateIframe = $.prototype.generateIframe;
	
$.iframe =  function(selector) {return $(document).iframe(selector);}
$.iframes =  $(document).iframe("iframe");

}( jQuery ));
