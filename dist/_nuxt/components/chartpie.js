(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{306:function(t,e,r){var content=r(314);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(34).default)("abec9fd4",content,!0,{sourceMap:!1})},313:function(t,e,r){"use strict";r(306)},314:function(t,e,r){var n=r(33)(!1);n.push([t.i,"",""]),t.exports=n},320:function(t,e,r){"use strict";r.r(e);var n=r(57),o={data:function(){var t=this;return{series:[],options:{colors:["#50aaf8","#32c8a4","#f76c83","#ffdf5e","#94c962","#ac93e8"],labels:[],legend:{labels:{colors:"#fff"},formatter:function(e){var r=parseInt(e.substr(7))-1;return t.labelsData[r]}},tooltip:{y:{title:{formatter:function(e){var r=parseInt(e.substr(7))-1;return"".concat(t.labelsData[r],":")}}}},stroke:{width:1}}}},components:{"client-only":r.n(n).a},props:{seriesData:Array,labelsData:Array},watch:{seriesData:{immediate:!0,handler:function(t){this.series=t}}}},l=(r(313),r(14)),component=Object(l.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("client-only",[r("div",{staticClass:"chartItem"},[t.seriesData.length>0?r("div",[r("Apexchart",{attrs:{type:"pie",width:"100%",height:"300px",options:t.options,series:t.series}})],1):t._e(),t._v(" "),t.seriesData.length<=0?r("p",{staticClass:"none-tips"},[t._v("\n      目前尚無任何資料\n    ")]):t._e()])])}),[],!1,null,"e06cefe2",null);e.default=component.exports}}]);