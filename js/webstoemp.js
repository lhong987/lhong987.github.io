/*! apollo.js v1.7.0 | (c) 2014 @toddmotto | https://github.com/toddmotto/apollo */
(function (root, factory) {

  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.apollo = factory();
  }
})(this, function () {

  'use strict';

  var apollo = {};

  var hasClass, addClass, removeClass, toggleClass;

  var forEach = function (items, fn) {
    if (Object.prototype.toString.call(items) !== '[object Array]') {
      items = items.split(' ');
    }
    for (var i = 0; i < items.length; i++) {
      fn(items[i], i);
    }
  };

  if ('classList' in document.documentElement) {
    hasClass = function (elem, className) {
      return elem.classList.contains(className);
    };
    addClass = function (elem, className) {
      elem.classList.add(className);
    };
    removeClass = function (elem, className) {
      elem.classList.remove(className);
    };
    toggleClass = function (elem, className) {
      elem.classList.toggle(className);
    };
  } else {
    hasClass = function (elem, className) {
      return new RegExp('(^|\\s)' + className + '(\\s|$)').test(elem.className);
    };
    addClass = function (elem, className) {
      if (!hasClass(elem, className)) {
        elem.className += (elem.className ? ' ' : '') + className;
      }
    };
    removeClass = function (elem, className) {
      if (hasClass(elem, className)) {
        elem.className = elem.className.replace(new RegExp('(^|\\s)*' + className + '(\\s|$)*', 'g'), '');
      }
    };
    toggleClass = function (elem, className) {
      (hasClass(elem, className) ? removeClass : addClass)(elem, className);
    };
  }

  apollo.hasClass = function (elem, className) {
    return hasClass(elem, className);
  };

  apollo.addClass = function (elem, classes) {
    forEach(classes, function (className) {
      addClass(elem, className);
    });
  };

  apollo.removeClass = function (elem, classes) {
    forEach(classes, function (className) {
      removeClass(elem, className);
    });
  };

  apollo.toggleClass = function (elem, classes) {
    forEach(classes, function (className) {
      toggleClass(elem, className);
    });
  };

  return apollo;

});

var myNavigation = (function () {

  'use strict';

  //create vars
  var menuLink,
      menu,
      menuState;

  //check dependencies
  var checkDependencies = function() {
    return ('querySelector' in document && 'addEventListener' in window);
  };

  // initiate navigation
  var initNav = function() {

    if(checkDependencies())
    {
      // set vars
      menuLink = document.querySelector('.js-mainnav-compact > a');
      menu = document.querySelector('.js-mainnav');
      menuState = 'closed';

      //hide menu
      apollo.addClass(menu, 'js-is-hidden');

      //bin actions
      bindActions();
    }

  };

  //bind navigation actions
  var bindActions = function() {

    menuLink.addEventListener('click', function(e) {

      toggleMenu(menuState);
      e.preventDefault();
      //console.log(menuState);

    }, false);

  };

  //toggle menu
  var toggleMenu = function(state) {

    //swap classes
    if (state === 'closed' ){
      apollo.removeClass(menu, 'js-is-hidden');
      apollo.addClass(menu, 'js-is-visible');
    } else {
      apollo.removeClass(menu, 'js-is-visible');
      apollo.addClass(menu, 'js-is-hidden');
    }

    // toggle menu state
    menuState = (state === 'closed') ? 'open' : 'closed';

  };

  //make init publicly accessible
  return {
    initNav:initNav
  };

}());

myNavigation.initNav();
(function(f,k,l,e,m){function g(a,c){if(c){var b=c.getAttribute("viewBox"),d=f.createDocumentFragment(),e=c.cloneNode(!0);for(b&&a.setAttribute("viewBox",b);e.childNodes.length;)d.appendChild(e.childNodes[0]);a.appendChild(d)}}function n(){var a=f.createElement("x"),c=this.s;a.innerHTML=this.responseText;this.onload=function(){c.splice(0).map(function(b){g(b[0],a.querySelector("#"+b[1].replace(/(\W)/g,"\\$1")))})};this.onload()}function h(){for(var a;a=k[0];){var c=a.parentNode,b=a.getAttribute("xlink:href").split("#"),
d=b[0],b=b[1];c.removeChild(a);if(d.length){if(a=e[d]=e[d]||new XMLHttpRequest,a.s||(a.s=[],a.open("GET",d),a.onload=n,a.send()),a.s.push([c,b]),4===a.readyState)a.onload()}else g(c,f.getElementById(b))}l(h)}m&&h()})(document,document.getElementsByTagName("use"),window.requestAnimationFrame||window.setTimeout,{},/Trident\/[567]\b/.test(navigator.userAgent)||537>(navigator.userAgent.match(/AppleWebKit\/(\d+)/)||[])[1]);
