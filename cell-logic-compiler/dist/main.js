/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";let e=()=>{};new WeakMap;let n={},o={},t={},r={Enter:"enter",Escape:"esc",Space:"space",ArrowLeft:"arrowleft",ArrowUp:"arrowup",ArrowRight:"arrowright",ArrowDown:"arrowdown"};function a(n=e,o){n._pd&&o.preventDefault(),n(o)}function i(e){let o=r[e.code],i=n[o];t[o]=!0,a(i,e)}function d(e){let n=r[e.code],i=o[n];t[n]=!1,a(i,e)}function c(){t={}}function w(e,t,{handler:r="keydown",preventDefault:a=!0}={}){let i="keydown"==r?n:o;t._pd=a,[].concat(e).map((e=>i[e]=t))}(function(){let e;for(e=0;e<26;e++)r["Key"+String.fromCharCode(e+65)]=String.fromCharCode(e+97);for(e=0;e<10;e++)r["Digit"+e]=r["Numpad"+e]=""+e;window.addEventListener("keydown",i),window.addEventListener("keyup",d),window.addEventListener("blur",c)})(),w("p",(function(e){console.log("pauze"+e)})),w(["enter","space"],(function(e){console.log("enter of spazie")}))})();