!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=95)}({10:function(e,t,n){},24:function(e,t,n){"use strict";n(71),n(25)},25:function(e,t,n){"use strict";n(72)},28:function(e,t,n){"use strict";n(69),n(6),n(70),n(24),n(32)},32:function(e,t,n){"use strict";n(73),n(25)},33:function(e,t,n){},34:function(e,t,n){},6:function(e,t,n){"use strict";n(9)},68:function(e,t,n){},69:function(e,t,n){},7:function(e,t,n){"use strict";n(10)},70:function(e,t,n){},71:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},74:function(e,t,n){"use strict";n(68),n(7),n(28),n(24);function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var r=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.el=t,this.handlers={},this.init()}var t,n,r;return t=e,(n=[{key:"bindHandlers",value:function(){this.handlers.handleTitleClick=this.handleTitleClick.bind(this),this.handlers.handleDocumentClick=this.handleDocumentClick.bind(this)}},{key:"init",value:function(){this.bindHandlers(),this.title=this.el.querySelector(".header__submenu-title"),this.menu=this.el.querySelector(".header__submenu"),this.title.addEventListener("click",this.handlers.handleTitleClick)}},{key:"handleTitleClick",value:function(e){this.menu.classList.toggle("header__submenu_visible"),this.title.classList.toggle("header__submenu-title_hovered"),document.addEventListener("click",this.handlers.handleDocumentClick)}},{key:"handleDocumentClick",value:function(e){this.el.contains(e.target)||(document.removeEventListener("click",this.handlers.handleDocumentClick),this.menu.classList.remove("header__submenu_visible"),this.title.classList.remove("header__submenu-title_hovered"))}}])&&i(t.prototype,n),r&&i(t,r),e}();function u(e){return function(e){if(Array.isArray(e))return l(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,i=new Array(t);n<t;n++)i[n]=e[n];return i}function o(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.handlers={},this.menuExpanded=!1,this.init()}var t,n,i;return t=e,(n=[{key:"bindHandlers",value:function(){this.handlers.handleDocumentClick=this.handleDocumentClick.bind(this),this.handlers.handleTriggerClick=this.handleTriggerClick.bind(this)}},{key:"init",value:function(){this.bindHandlers(),this.el=document.querySelector(".header"),this.trigger=this.el.querySelector(".header__trigger"),this.menu=this.el.querySelector(".header__menu"),u(this.el.querySelectorAll(".header__submenu-title")).map((function(e){return new r(e.parentNode)})),this.trigger.addEventListener("click",this.handlers.handleTriggerClick)}},{key:"handleTriggerClick",value:function(e){this.menu.classList.toggle("header__menu_visible"),this.menuExpanded=!this.menuExpanded,this.menuExpanded&&document.addEventListener("click",this.handlers.handleDocumentClick)}},{key:"handleDocumentClick",value:function(e){this.el.contains(e.target)||(this.menu.classList.remove("header__menu_visible"),this.menuExpanded=!1,document.removeEventListener("click",this.handlers.handleDocumentClick))}}])&&o(t.prototype,n),i&&o(t,i),e}())},9:function(e,t,n){},95:function(e,t,n){"use strict";n.r(t);n(33),n(34),n(74),n(28)}});