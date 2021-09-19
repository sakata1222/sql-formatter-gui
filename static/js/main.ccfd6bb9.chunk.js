(this["webpackJsonpsql-formatter-gui"]=this["webpackJsonpsql-formatter-gui"]||[]).push([[0],{13:function(e,t,a){},25:function(e,t,a){},40:function(e,t,a){},42:function(e,t,a){},43:function(e,t,a){},44:function(e,t,a){},50:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),s=a(15),c=a.n(s),i=a(20),r=(a(25),a(7)),l=a(16),d=a(17),u=(a(40),a(1));var h=function(e){return Object(u.jsx)("div",{className:"InputTextBox",children:Object(u.jsx)("textarea",{className:"box",value:e.value,placeholder:e.placeholder,onChange:e.inputEventHandler})})};a(42);var b=function(e){return Object(u.jsx)("div",{className:"TextBox "+e.class,children:Object(u.jsx)("textarea",{className:"box",readOnly:!0,placeholder:e.placeholder,value:e.formattedSql,wrap:e.wrap})})};a(43),a(13),a(44);var j=function(e){return Object(u.jsx)("div",{className:"simple-button-area",children:Object(u.jsx)("button",{className:"button "+e.buttonClass,type:"button",onClick:e.onClickEventHandler,"data-tooltip":e.tooltip,children:e.buttonText})})};function p(e){var t=document.createElement("div");t.appendChild(document.createElement("pre")).textContent=e,document.body.appendChild(t);var a=document.getSelection();null!=a&&a.selectAllChildren(t),document.execCommand("copy"),document.body.removeChild(t)}var m=function(){var e=Object(n.useState)(""),t=Object(r.a)(e,2),a=t[0],o=t[1],s=Object(n.useState)(""),c=Object(r.a)(s,2),i=c[0],m=c[1],x=Object(n.useState)(""),f=Object(r.a)(x,2),v=f[0],O=f[1];return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)("header",{className:"App-header has-background-info",children:Object(u.jsx)("div",{className:"title is-3 has-text-white-ter has-text-weight-bold",children:"SQL Formatter"})}),Object(u.jsxs)("div",{className:"App-main",children:[Object(u.jsx)("div",{className:"input-area",children:Object(u.jsx)(h,{value:a,placeholder:"Please input SQL",inputEventHandler:function(e){var t=e.target.value,a=Object(d.format)(e.target.value);o(t),m(a),O(l.pd.sqlmin(a))}})}),Object(u.jsxs)("div",{className:"display-area",children:[Object(u.jsxs)("div",{className:"formatted-area",children:[Object(u.jsxs)("div",{className:"button-area",children:[Object(u.jsx)("div",{className:"button-wrapper",children:Object(u.jsx)(j,{buttonClass:"is-info is-rounded is-fullwidth has-tooltip-info",buttonText:"copy",onClickEventHandler:function(e){return p(i)},tooltip:"Copy the formatted SQL to the clipboard"})}),Object(u.jsx)("div",{className:"button-wrapper",children:Object(u.jsx)(j,{buttonClass:"is-info is-rounded is-fullwidth has-tooltip-info",buttonText:"<<",onClickEventHandler:function(e){return o(i)},tooltip:"Update the input area by the formatted SQL"})})]}),Object(u.jsx)("div",{className:"text-area",children:Object(u.jsx)(b,{placeholder:"This area shows formatted input SQL",formattedSql:i})})]}),Object(u.jsxs)("div",{className:"minified-area",children:[Object(u.jsx)("div",{className:"button-area",children:Object(u.jsx)(j,{buttonClass:"is-info is-rounded is-fullwidth has-tooltip-info",buttonText:"copy",onClickEventHandler:function(e){return p(v)},tooltip:"Copy the minified SQL to the clipboard"})}),Object(u.jsx)("div",{className:"text-area",children:Object(u.jsx)(b,{placeholder:"This area shows minified input SQL",formattedSql:v,wrap:"off",class:"no-scroll"})})]})]})]})]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(Object(u.jsxs)(o.a.StrictMode,{children:[Object(u.jsx)(i.a,{basename:"https://sakata1222.github.io/sql-formatter-gui/"}),Object(u.jsx)(m,{})]}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[50,1,2]]]);
//# sourceMappingURL=main.ccfd6bb9.chunk.js.map