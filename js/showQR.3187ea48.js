(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["showQR"],{"1d15":function(e,t,s){},"2a6b":function(e,t,s){"use strict";var n=s("8bc6"),o=s.n(n);o.a},"33b5":function(e,t,s){},"50c3":function(e,t,s){"use strict";var n=s("1d15"),o=s.n(n);o.a},"7d8d":function(e,t,s){"use strict";var n=s("33b5"),o=s.n(n);o.a},"8bc6":function(e,t,s){},f101:function(e,t,s){e.exports=s.p+"img/animated-logo.60213ba4.gif"},ff7f:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",["STARTED"===e.request.response?s("section",{staticClass:"section"},[s("div",{staticClass:"container"},[s("view-answer",{attrs:{mymodel:e.mymodel}})],1)]):"FINALIZED"===e.request.response?s("section",{staticClass:"section"},[s("div",{staticClass:"container"},[s("show-response",{attrs:{mymodel:e.mymodel}})],1)]):s("section",{staticClass:"section"},[s("div",{staticClass:"container"},[s("scan-question",{attrs:{mymodel:e.mymodel}})],1)]),e.debug?s("div",[s("pre",[e._v(e._s(e.session))]),s("pre",[e._v(e._s(e.request))])]):e._e()])},o=[],i=(s("96cf"),s("3040")),r=s("c93e"),a=(s("cadf"),s("551c"),s("097d"),s("d7b0")),c=s("2f62"),u=s("d722"),d=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("h1",{staticClass:"title"},[e._v(e._s(e.mymodel.description))]),s("h2",{staticClass:"subtitle"},[e._v("Scan onderstaande code om deze vraag te beantwoorden")]),s("div",[s("qrcode-vue",{attrs:{value:e.mymodel.url+e.mymodel.session.session_id,size:e.mymodel.size,level:"H"}}),s("div",[e._v(e._s(e.mymodel.url)+e._s(e.mymodel.session.session_id))])],1)])},l=[],m={name:"ScanQuestion",props:["mymodel"],components:{QrcodeVue:a["a"]},data:function(){return{}},methods:{},mounted:function(){},watch:{}},f=m,p=(s("7d8d"),s("2877")),v=Object(p["a"])(f,d,l,!1,null,"88b23358",null);v.options.__file="ScanQuestion.vue";var h=v.exports,w=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[e.mymodel.session.response.data?s("div",{staticClass:"has-text-centered"},[s("answer",{attrs:{question:e.mymodel.description,status:e.mymodel.session.response.data.request_status,valid:e.mymodel.session.response.data.request_valid,color:e.mymodel.session.response.data.secret}}),s("br"),s("p",[s("button",{staticClass:"button",on:{click:function(t){e.mymodel.endRequest()}}},[e._v("OK")])])],1):e._e()])},_=[],b={name:"ShowResponse",props:["mymodel"],data:function(){return{}},methods:{},mounted:function(){},watch:{}},y=b,g=(s("2a6b"),Object(p["a"])(y,w,_,!1,null,"c5580c66",null));g.options.__file="ShowResponse.vue";var j=g.exports,O=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},S=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",{staticClass:"title"},[e._v("Wacht op antwoord...")]),n("h2",{staticClass:"subtitle has-text-centered"},[n("img",{attrs:{src:s("f101"),width:"100"}})])])}],q={name:"waitForAnswer",props:["mymodel"],data:function(){return{}},methods:{},mounted:function(){},watch:{}},x=q,C=(s("50c3"),Object(p["a"])(x,O,S,!1,null,"df2f2a52",null));C.options.__file="waitForAnswer.vue";var R=C.exports,E=s("156d"),A=null,I={data:function(){return{size:300,session:{},request:{},attribute:"ouderdan18",description:"Ben je 18 jaar of ouder?",url:"http://localhost:8080"===window.location["origin"]?window.location["origin"]+"?session=":window.location["origin"]+"/decode?session="}},computed:Object(r["a"])({},Object(c["c"])(["debug"]),{mymodel:function(){return this}}),components:{WaitForAnswer:R,ShowResponse:j,ScanQuestion:h,QrcodeVue:a["a"],ViewAnswer:E["a"]},methods:Object(r["a"])({},Object(c["b"])({setSession:"setSession"}),{endRequest:function(){this.$router.push("/")},getSession:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(){var t=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["g"])(this.attribute,this.description);case 2:this.session=e.sent,this.setSession(this.session),A=setInterval(Object(i["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["h"])(t.session.session_id);case 2:if(t.request=e.sent,"FINALIZED"!==t.request.response){e.next=9;break}return clearInterval(A),e.next=7,Object(u["e"])(t.session.session_id);case 7:t.session=e.sent,t.setSession(t.session);case 9:case"end":return e.stop()}},e,this)})),1e3);case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}),mounted:function(){this.getSession()},destroyed:function(){A&&clearInterval(A)}},Q=I,k=Object(p["a"])(Q,n,o,!1,null,null,null);k.options.__file="showQR.vue";t["default"]=k.exports}}]);
//# sourceMappingURL=showQR.3187ea48.js.map