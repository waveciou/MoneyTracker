(window.webpackJsonp=window.webpackJsonp||[]).push([[11,2,3,4,8,9],{300:function(t,e,n){var content=n(303);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("d9910938",content,!0,{sourceMap:!1})},301:function(t,e,n){"use strict";n.r(e);n(17);var o={data:function(){return{title:{name:"",head:""}}},head:function(){return{title:this.title.head}},props:{name:String},fetch:function(){this.$store.commit("route/GET_PAGE_TITLE",this.$route.name),this.title.name=this.$store.state.route.pages.name,this.title.head=this.$store.state.route.pages.head,this.name&&(this.title.name=this.name)},methods:{openSearchBarHandler:function(){this.$store.commit("SET_SEARCHBAR_CONTROL",!0)}}},r=(n(302),n(14)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("header",{staticClass:"header"},[n("h1",{staticClass:"title"},[t._v("\n    "+t._s(t.title.name)+"\n  ")]),t._v(" "),n("button",{staticClass:"header__search-open-btn",on:{click:function(e){return e.stopPropagation(),t.openSearchBarHandler.apply(null,arguments)}}})])}),[],!1,null,"70a5b7e9",null);e.default=component.exports;installComponents(component,{Header:n(301).default})},302:function(t,e,n){"use strict";n(300)},303:function(t,e,n){var o=n(33)(!1);o.push([t.i,'.header[data-v-70a5b7e9]{width:100%;height:50px;max-width:480px;padding:10px 60px;position:fixed;top:0;left:50%;text-align:center;background-color:#2e363d;z-index:2000;transition:all 1s;transform:translateX(-50%)}.is-fixed .header[data-v-70a5b7e9]{background-color:#161616}.title[data-v-70a5b7e9]{overflow:hidden;font-size:1.25rem;font-weight:500;text-overflow:ellipsis;white-space:nowrap;color:#fff;line-height:1.4em;word-break:keep-all}.header__search-open-btn[data-v-70a5b7e9]{width:50px;height:50px;display:block;position:absolute;top:0;right:0;text-align:center}.header__search-open-btn[data-v-70a5b7e9]:before{font-weight:900;font-family:"Font Awesome 5 solid",sans-serif;content:"\\f002";line-height:50px;font-size:1.25rem}',""]),t.exports=o},304:function(t,e,n){var content=n(308);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("748acf80",content,!0,{sourceMap:!1})},306:function(t,e,n){var content=n(314);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("abec9fd4",content,!0,{sourceMap:!1})},307:function(t,e,n){"use strict";n(304)},308:function(t,e,n){var o=n(33)(!1);o.push([t.i,'.accordion-title[data-v-b601a084]{width:100%;padding-top:10px;display:flex;align-items:center;justify-content:space-between}.accordion-title span[data-v-b601a084]{width:calc(100% - 30px);display:block;overflow:hidden;font-size:1.25rem;text-overflow:ellipsis;white-space:nowrap;line-height:1.4em;word-break:keep-all}.accordion-title[data-v-b601a084]:after{font-weight:900;font-family:"Font Awesome 5 solid",sans-serif;content:"\\f068";width:30px;height:30px;line-height:30px;display:block;text-align:center}.accordion-title.is-close[data-v-b601a084]:after{content:"\\f067"}',""]),t.exports=o},311:function(t,e,n){"use strict";n.r(e);var o={data:function(){return{control:!0}},props:{title:String},methods:{accordionStartHandler:function(t){t.style.height=t.scrollHeight+"px"},accordionEndHandler:function(t){t.style.height=""}}},r=(n(307),n(14)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"accordion"},[n("div",{staticClass:"accordion-title",class:{"is-close":!1===t.control},on:{click:function(e){e.stopPropagation(),t.control=!t.control}}},[n("span",[t._v(t._s(t.title))])]),t._v(" "),n("transition",{attrs:{name:"accordion"},on:{enter:t.accordionStartHandler,"after-enter":t.accordionEndHandler,"before-leave":t.accordionStartHandler,"after-leave":t.accordionEndHandler}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.control,expression:"control"}]},[t._t("default")],2)])],1)}),[],!1,null,"b601a084",null);e.default=component.exports},313:function(t,e,n){"use strict";n(306)},314:function(t,e,n){var o=n(33)(!1);o.push([t.i,"",""]),t.exports=o},315:function(t,e,n){var content=n(322);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("0c840d5d",content,!0,{sourceMap:!1})},316:function(t,e,n){var content=n(324);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("60c17b8c",content,!0,{sourceMap:!1})},320:function(t,e,n){"use strict";n.r(e);var o=n(57),r={data:function(){var t=this;return{series:[],options:{colors:["#50aaf8","#32c8a4","#f76c83","#ffdf5e","#94c962","#ac93e8"],labels:[],legend:{labels:{colors:"#fff"},formatter:function(e){var n=parseInt(e.substr(7))-1;return t.labelsData[n]}},tooltip:{y:{title:{formatter:function(e){var n=parseInt(e.substr(7))-1;return"".concat(t.labelsData[n],":")}}}},stroke:{width:1}}}},components:{"client-only":n.n(o).a},props:{seriesData:Array,labelsData:Array},watch:{seriesData:{immediate:!0,handler:function(t){this.series=t}}}},c=(n(313),n(14)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("client-only",[n("div",{staticClass:"chartItem"},[t.seriesData.length>0?n("div",[n("Apexchart",{attrs:{type:"pie",width:"100%",height:"300px",options:t.options,series:t.series}})],1):t._e(),t._v(" "),t.seriesData.length<=0?n("p",{staticClass:"none-tips"},[t._v("\n      目前尚無任何資料\n    ")]):t._e()])])}),[],!1,null,"e06cefe2",null);e.default=component.exports},321:function(t,e,n){"use strict";n(315)},322:function(t,e,n){var o=n(33)(!1);o.push([t.i,'.fieldset[data-v-00efe546]{width:100%;margin-bottom:1rem}.fieldset-caption[data-v-00efe546]{display:block;font-size:1rem;margin-bottom:5px}.fieldset-text[data-v-00efe546]{width:100%;position:relative}.fieldset-text .fieldset-text__input[data-v-00efe546]{padding-right:50px}.fieldset-text__btn[data-v-00efe546]{width:38px;height:38px;position:absolute;top:0;right:0}.fieldset-text__btn[data-v-00efe546]:before{font-weight:900;font-family:"Font Awesome 5 solid",sans-serif;content:"\\f057";color:#fff}.fieldset-tags[data-v-00efe546]{width:100%;position:relative}.fieldset-tags .fieldset-tags__input[data-v-00efe546]{padding-right:50px}.fieldset-tags__btn[data-v-00efe546]{width:38px;height:38px;position:absolute;top:0;right:0}.fieldset-tags__btn[data-v-00efe546]:before{font-weight:900;font-family:"Font Awesome 5 solid",sans-serif;content:"\\f055";color:#fff}.fieldset-abreast[data-v-00efe546]{display:flex;align-items:center;justify-content:space-between}.fieldset-abreast-item[data-v-00efe546]{width:100%;flex-grow:1;flex-basis:0}.fieldset-abreast-item.size-50[data-v-00efe546]{width:calc(50% - 5px);flex-grow:0;flex-basis:auto}.time-tips[data-v-00efe546]{width:20px;display:block;text-align:center}.total-value[data-v-00efe546]{padding-top:10px;padding-bottom:10px;display:flex;justify-content:flex-end;font-size:1.5rem;font-weight:500}.total-value span[data-v-00efe546]{display:block;color:#ffdf5e;line-height:1.2em}.analysisList[data-v-00efe546]{padding-right:5px;padding-left:5px;margin-bottom:2rem}.analysisList>li[data-v-00efe546]{margin-top:10px;margin-bottom:10px}.analysisList-item[data-v-00efe546]{display:flex;align-items:center;justify-content:space-between}.analysisList-title[data-v-00efe546],.analysisList-value[data-v-00efe546]{max-width:50%;overflow:hidden;font-size:1.125rem;text-overflow:ellipsis;white-space:nowrap;word-break:keep-all;line-height:1.6em}',""]),t.exports=o},323:function(t,e,n){"use strict";n(316)},324:function(t,e,n){var o=n(33)(!1);o.push([t.i,".classificationList-header[data-v-1690b550]{padding-top:5px;padding-bottom:5px;display:flex;align-items:center;justify-content:space-between}.classificationList-value[data-v-1690b550]{color:#94c962}.classificationList-value.color-red[data-v-1690b550]{color:#f76c83}",""]),t.exports=o},331:function(t,e,n){var content=n(341);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(34).default)("3ef34996",content,!0,{sourceMap:!1})},336:function(t,e,n){"use strict";n.r(e);n(8),n(48),n(17),n(27),n(24),n(206);var o={data:function(){return{categories:"",categoriesData:[]}},components:{"chartpie-component":n(320).default},props:{accountList:Array},created:function(){this.categoriesData=n(207),this.categories=this.categoriesData.expense[0].id},methods:{getTotalValue:function(t){var e=t.reduce((function(t,e){return t+e.price}),0);return this.TO_CURRENCY(e)}},computed:{categorieList:function(){var t=this.categoriesData.expense.map((function(t){return{id:t.id,name:t.name}}));return t.push({id:"income",name:"收入"}),t},accountFormatList:function(){var t=this,e=[];return this.accountList.filter((function(e){return"income"===t.categories?!1===e.isExpense:e.categories===t.categories})).forEach((function(n){var o="income"===t.categories?n.categories:n.subcategories,r=e.findIndex((function(t){return t.id===o}));if(r<0){var c={id:o,collection:[t.DEEP_CLONE(n)]};e.push(c)}else e[r].collection.push(t.DEEP_CLONE(n))})),e},seriesData:function(){return this.accountFormatList.map((function(t){return t.collection.reduce((function(t,e){return t+e.price}),0)}))||[]},labelsData:function(){var t=this;return this.accountFormatList.map((function(e){return t.GET_CATEGORIES_NAME(e.id)}))||[]},totalValue:function(){return this.seriesData.reduce((function(t,e){return t+e}),0)}}},r=(n(321),n(14)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"align"},[n("div",{staticClass:"col col-100"},[n("div",{staticClass:"fieldset"},[n("div",{staticClass:"select"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.categories,expression:"categories"}],on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.categories=e.target.multiple?n:n[0]}}},t._l(t.categorieList,(function(e){return n("option",{key:e.id,domProps:{value:e.id}},[t._v("\n              "+t._s(e.name)+"\n            ")])})),0)])])])]),t._v(" "),n("chartpie-component",{attrs:{"series-data":t.seriesData,"labels-data":t.labelsData}}),t._v(" "),t.seriesData.length>0?n("div",{staticClass:"total-value"},[n("span",[t._v(" TWD $"+t._s(t.TO_CURRENCY(t.totalValue)))])]):t._e(),t._v(" "),n("ul",{staticClass:"analysisList"},t._l(t.accountFormatList,(function(e){return n("li",{key:e.id},[n("div",{staticClass:"analysisList-item"},[n("div",{staticClass:"analysisList-title"},[t._v("\n          "+t._s(t.GET_CATEGORIES_NAME(e.id))+"\n        ")]),t._v(" "),n("div",{staticClass:"analysisList-value"},[t._v("\n          $"+t._s(t.getTotalValue(e.collection))+"\n        ")])])])})),0)],1)}),[],!1,null,"00efe546",null);e.default=component.exports},337:function(t,e,n){"use strict";n.r(e);n(8),n(27),n(24),n(206);var o=n(311),r=n(139),c={data:function(){return{}},components:{accordionClass:o.default,"accountList-component":r.default},props:{classType:String,accountList:Array},methods:{getTotalValue:function(t){return t.reduce((function(t,e){return!0===e.isExpense?t-e.price:t+e.price}),0)},setValueFormat:function(t){var e=this.TO_CURRENCY(Math.abs(t));return t<0?"-$".concat(e):"$".concat(e)},setAccountItem:function(t,e,n,o){if(e<0){var r={id:n,collection:[this.DEEP_CLONE(o)]};t.push(r)}else t[e].collection.push(this.DEEP_CLONE(o))}},computed:{accountFormatList:function(){var t=this,e=this.classType,n=[];return"tags"===e?this.accountList.filter((function(t){return t.tags.length>0})).forEach((function(e){e.tags.forEach((function(o){var r=n.findIndex((function(t){return t.id===o}));t.setAccountItem(n,r,o,e)}))})):this.accountList.filter((function(t){return""!==t[e]})).forEach((function(o){var r=n.findIndex((function(t){return t.id===o[e]}));t.setAccountItem(n,r,o[e],o)})),n}}},l=(n(323),n(14)),component=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("ul",{staticClass:"classificationList"},t._l(t.accountFormatList,(function(e){return n("li",{key:e.id},[n("div",{staticClass:"classificationList-item"},[n("accordionClass",{attrs:{title:"#"+e.id}},[n("div",{staticClass:"classificationList-header"},[n("div",{staticClass:"classificationList-value",class:{"color-red":t.getTotalValue(e.collection)<0}},[t._v("\n              "+t._s(t.setValueFormat(t.getTotalValue(e.collection)))+"\n            ")]),t._v(" "),n("div",{staticClass:"classificationList-number"},[t._v("\n              共"+t._s(e.collection.length)+"筆\n            ")])]),t._v(" "),n("accountList-component",{attrs:{"account-list":e.collection,"show-time":!0}})],1)],1)])})),0),t._v(" "),t.accountFormatList.length<=0?n("p",{staticClass:"none-tips"},[t._v("\n    目前尚無任何資料\n  ")]):t._e()])}),[],!1,null,"1690b550",null);e.default=component.exports},340:function(t,e,n){"use strict";n(331)},341:function(t,e,n){var o=n(33)(!1);o.push([t.i,'.analysis-header[data-v-67d49dc3]{padding-right:10px;padding-left:10px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between}.analysis-header .arrow-btn[data-v-67d49dc3]{display:flex}.analysis-header .arrow-btn>span[data-v-67d49dc3]{display:none}.analysis-header .arrow-btn[data-v-67d49dc3]:before{font-weight:900;font-family:"Font Awesome 5 solid",sans-serif;display:block;font-size:1rem;color:#fff}.analysis-header .arrow-btn.btn-prevmonth[data-v-67d49dc3]:before{content:"\\f053"}.analysis-header .arrow-btn.btn-nextmonth[data-v-67d49dc3]:before{content:"\\f054"}.analysis-title[data-v-67d49dc3]{font-size:1.125rem}.enumeration-list[data-v-67d49dc3]{width:100%;display:flex;justify-content:space-between;overflow-x:auto;overflow-y:hidden;white-space:nowrap;margin-bottom:1rem;word-break:break-all}.enumeration-list>li[data-v-67d49dc3]{display:block;flex-grow:1}.enumeration-btn[data-v-67d49dc3]{min-width:100%;padding:12px 7px;line-height:1em;position:relative}.enumeration-btn[data-v-67d49dc3]:after{content:"";width:100%;height:3px;display:block;position:absolute;bottom:0;left:0;background-color:transparent}.enumeration-btn.current[data-v-67d49dc3]{color:#ffdf5e}.enumeration-btn.current[data-v-67d49dc3]:after{background-color:#ffdf5e}',""]),t.exports=o},353:function(t,e,n){"use strict";n.r(e);var o=n(30),r=(n(27),n(8),n(35),n(57)),c=n.n(r),header=n(301),l=n(336),d=n(337),f={data:function(){return{activeDate:{year:0,month:0},enumeration:"categories",enumerationList:[{id:"categories",name:"類別",componentName:"analysisCategories"},{id:"name",name:"名稱",componentName:"analysisClassification"},{id:"store",name:"商家",componentName:"analysisClassification"},{id:"tags",name:"標籤",componentName:"analysisClassification"}]}},components:{"client-only":c.a,"header-component":header.default,analysisCategories:l.default,analysisClassification:d.default},created:function(){this.activeDate.year=this.$dayjs().utcOffset(8).year(),this.activeDate.month=this.$dayjs().utcOffset(8).month()+1},methods:{changeMonth:function(t){var e=this.activeDate.month,n=!0===t?e+1:e-1;n<=0?(n=12,this.activeDate.year=this.activeDate.year-1):n>12&&(n=1,this.activeDate.year=this.activeDate.year+1),this.activeDate.month=n}},computed:{accountList:function(){var t=this,e=Object(o.a)(this.$store.state.accounts);return e.filter((function(e){return Object.keys(t.activeDate).every((function(n){return t.activeDate[n]===e.time[n]}))}))}}},h=(n(340),n(14)),component=Object(h.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("header-component"),t._v(" "),n("div",{staticClass:"wrap"},[n("div",{staticClass:"analysis-header"},[n("button",{staticClass:"arrow-btn btn-prevmonth",attrs:{title:"Previous"},on:{click:function(e){return e.preventDefault(),t.changeMonth(!1)}}},[n("span",[t._v("Previous")])]),t._v(" "),n("div",{staticClass:"analysis-title"},[t._v("\n        "+t._s(t.activeDate.year)+"年"+t._s(t.TO_TIME_FORMAT(t.activeDate.month))+"月\n      ")]),t._v(" "),n("button",{staticClass:"arrow-btn btn-nextmonth",attrs:{title:"Next"},on:{click:function(e){return e.preventDefault(),t.changeMonth(!0)}}},[n("span",[t._v("Next")])])]),t._v(" "),n("ul",{staticClass:"enumeration-list"},t._l(t.enumerationList,(function(e){return n("li",{key:e.id},[n("button",{staticClass:"enumeration-btn",class:{current:t.enumeration===e.id},attrs:{title:e.name},on:{click:function(n){n.stopPropagation(),t.enumeration=e.id}}},[t._v("\n          "+t._s(e.name)+"\n        ")])])})),0),t._v(" "),n("client-only",t._l(t.enumerationList,(function(e){return n("div",{key:e.id+"-component"},[t.enumeration===e.id?n(e.componentName,{tag:"component",attrs:{"class-type":e.id,"account-list":t.accountList}}):t._e()],1)})),0)],1)],1)}),[],!1,null,"67d49dc3",null);e.default=component.exports}}]);