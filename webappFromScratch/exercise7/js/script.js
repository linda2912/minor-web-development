(function() {
  'use strict';

  var contentContainer;

  var kzStart = {
    init: function() {
      this.cacheVars();
      router.init();
    },
    cacheVars: function() {
      contentContainer = document.getElementById('contentContainer');
    }
  };

  var router = {
    init: function() {
      var self = this;
      utils.setHash('home');

      utils.addEvent(window, 'hashchange', function(evt){
        self.changeRoute({oldHash: evt.oldURL.split('#')[1], newHash: evt.newURL.split('#')[1]});
      });
    },
    changeRoute: function(routes) {
      var template = this.getTemplateObj(routes.newHash);
      //contentContainer.innerHTML = templates[routes.newHash];
    },
    getTemplateObj: function(templateName) {
      var templateObj = _.get(templates, templateName.replace('/', '.'), undefined);
      if(templateObj) return templateObj;
      else if(new RegExp(/weather\/[a-z]+/g).test(templateName)) {
        var templateNameArray = templateName.split('/');
        templateNameArray.shift();
        
      }
    }
  };

  var view = {

  };

  //The Facade Pattern - a pattern that hides the real complexity.
  var utils = {
    //addEventListener with cross-browser compatibility
    addEvent: function(el, ev, fn) {
      if( el.addEventListener ) {
        el.addEventListener( ev, fn, false);
      } else if(el.attachEvent) {
        el.attachEvent( "on" + ev, fn);
      } else {
        el["on" + ev] = fn;
      }
    },
    //check if the template exists
    templateCheck: function(templateName) {
      if(templates[templateName]) return true;
      else return false;
    },
    //force an route change
    setHash: function(hash) {
      window.location.hash = '#' + hash;
      router.changeRoute({oldHash: undefined, newHash: hash});
    }
  };

  kzStart.init();
}())


