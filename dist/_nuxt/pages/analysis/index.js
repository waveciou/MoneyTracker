(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{229:function(t,e,n){var content=n(232);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(35).default)("343fc649",content,!0,{sourceMap:!1})},230:function(t,e,n){"use strict";n.r(e);n(21);var o={data:function(){return{title:{name:"",head:""}}},head:function(){return{title:this.title.head}},props:{name:String},fetch:function(){this.$store.commit("GET_PAGE_TITLE",this.$route.name),this.title.name=this.$store.state.pages.name,this.title.head=this.$store.state.pages.head,this.name&&(this.title.name=this.name)}},r=(n(231),n(20)),component=Object(r.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("header",{staticClass:"header"},[e("h1",{staticClass:"title"},[this._v("\n    "+this._s(this.title.name)+"\n  ")])])}),[],!1,null,"3720b5ea",null);e.default=component.exports;installComponents(component,{Header:n(230).default})},231:function(t,e,n){"use strict";n(229)},232:function(t,e,n){(e=n(34)(!1)).push([t.i,".header[data-v-3720b5ea]{width:100%;height:50px;max-width:480px;padding:10px;position:fixed;top:0;left:50%;text-align:center;background-color:#2e363d;z-index:2000;transition:all 1s;transform:translateX(-50%)}.is-fixed .header[data-v-3720b5ea]{background-color:#161616}.title[data-v-3720b5ea]{font-size:1.25rem;color:#fff;line-height:1.4em}",""]),t.exports=e},243:function(t,e,n){var content=n(252);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(35).default)("a171e7c8",content,!0,{sourceMap:!1})},251:function(t,e,n){"use strict";n(243)},252:function(t,e,n){(e=n(34)(!1)).push([t.i,"",""]),t.exports=e},270:function(t,e,n){"use strict";n.r(e);var o={components:{"header-component":n(230).default}},r=(n(251),n(20)),component=Object(r.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("header-component"),this._v(" "),e("div",{staticClass:"wrap"})],1)}),[],!1,null,"71ce3e38",null);e.default=component.exports}}]);