(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["readQR"],{"0b61":function(e,t,n){},"0d1a":function(e,t){e.exports="-- generate a simple keyring\nkeyring = ECDH.new()\nkeyring:keygen()\n\n-- export the keypair to json\nexport = JSON.encode(\n   {\n      public  = keyring:public():base64(),\n\t  private = keyring:private():base64()\n   }\n)\nprint(export)\n"},"156d":function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",["STARTED"==e.base.status?n("div",[n("h1",{staticClass:"title"},[e._v("Aan het wachten op antwoord...")])]):e._e(),n("br"),n("h1",[e._v(e._s(e.base.question))]),n("br"),"ACCEPTED"==e.base.status?n("div",[e.valid?n("div",{staticClass:"answer",style:{"border-color":e.base.color}},[n("p",[e._v("Antwoord ontvangen en valide")])]):e._e(),e.valid?e._e():n("div",[n("p",[e._v("Antwoord ontvangen maar invalide")])])]):e._e(),"DENIED"==e.base.status?n("div",[n("p",[e._v("Vraag is geweigerd")])]):e._e(),n("br"),n("div",[n("button",{staticClass:"button is-link",on:{click:function(t){e.base.cancel()}}},[e._v("Annuleren")])])])},i=[],r={name:"Answer",props:["base"]},a=r,o=(n("cf2c"),n("2877")),c=Object(o["a"])(a,s,i,!1,null,null,null);c.options.__file="ViewAnswer.vue";t["a"]=c.exports},"1e79":function(e,t,n){"use strict";var s=n("8b26"),i=n.n(s);i.a},"2fdb":function(e,t,n){"use strict";var s=n("5ca1"),i=n("d2c8"),r="includes";s(s.P+s.F*n("5147")(r),"String",{includes:function(e){return!!~i(this,e,r).indexOf(e,arguments.length>1?arguments[1]:void 0)}})},"312f":function(e,t,n){},"471f":function(e,t,n){"use strict";var s=n("b7dd"),i=n.n(s);i.a},5147:function(e,t,n){var s=n("2b4c")("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[s]=!1,!"/./"[e](t)}catch(e){}}return!0}},"559b":function(e,t,n){"use strict";n.d(t,"d",function(){return s}),n.d(t,"b",function(){return i}),n.d(t,"a",function(){return r}),n.d(t,"c",function(){return a});var s=window.io.connect("http://oscity.nl:5005/");function i(e){s.emit("join_room",{session_id:e})}function r(e){s.emit("close_room",{session_id:e})}var a={INITIALIZED:"INITIALIZED",STARTED:"STARTED",GOT_PUB_KEY:"GOT_PUB_KEY",GOT_ENCR_DATA:"GOT_ENCR_DATA",FINALIZED:"FINALIZED"}},6762:function(e,t,n){"use strict";var s=n("5ca1"),i=n("c366")(!0);s(s.P,"Array",{includes:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")("includes")},7003:function(e,t,n){"use strict";var s=n("0b61"),i=n.n(s);i.a},"8b26":function(e,t,n){},"98f4":function(e,t,n){},a860:function(e,t){e.exports="data = read_json(DATA)\nkeys = read_json(KEYS)\n\nheader = msgunpack(base64(data.header))\n\ninternal_key = ECDH.new()\ninternal_key:private(base64(keys.private))\n\npayload = decrypt(internal_key, base64(header.pub_key), map(data, base64))\n\nprint(JSON.encode(msgunpack(payload.text)))\n"},aae3:function(e,t,n){var s=n("d3f4"),i=n("2d95"),r=n("2b4c")("match");e.exports=function(e){var t;return s(e)&&(void 0!==(t=e[r])?!!t:"RegExp"==i(e))}},b7dd:function(e,t,n){},ce71:function(e,t,n){"use strict";var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",{staticClass:"title"},[e._v("Beantwoord vraag")]),n("br"),n("h2",{staticClass:"subtitle"},[e._v(e._s(e.base.request.description))]),n("h2",{staticClass:"subtitle"},[e._v(e._s(e.base.request.request))]),n("div",[n("button",{staticClass:"button is-link",on:{click:function(t){e.base.acceptQuestion()}}},[e._v("OK")]),e._v("\n     \n    "),n("button",{staticClass:"button is-danger",on:{click:function(t){e.base.denyQuestion()}}},[e._v("Weiger")])])])},i=[],r={name:"AnswerQuestion",props:["base"],data:function(){return{}}},a=r,o=(n("7003"),n("2877")),c=Object(o["a"])(a,s,i,!1,null,"3cbfda6c",null);c.options.__file="AnswerQuestion.vue";t["a"]=c.exports},cf2c:function(e,t,n){"use strict";var s=n("312f"),i=n.n(s);i.a},d2c8:function(e,t,n){var s=n("aae3"),i=n("be13");e.exports=function(e,t,n){if(s(t))throw TypeError("String#"+n+" doesn't accept regex!");return String(i(e))}},dfc5:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.loggedIn?e.onboardingRequest?n("section",{staticClass:"section"},[n("div",{staticClass:"container"},[n("onboarding-request",{attrs:{mymodel:e.mymodel}})],1)]):e.disclosureRequest?n("section",{staticClass:"section"},[n("div",{staticClass:"container"},[e.response?e.response.response.data?n("div",{staticClass:"has-text-centered"},[n("show-answer",{attrs:{mymodel:e.mymodel}})],1):e._e():n("div",[n("answer-question",{attrs:{mymodel:e.mymodel}})],1)])]):n("section",{staticClass:"section"},[n("div",{staticClass:"container"},[n("scan-i-d-question",{attrs:{mymodel:e.mymodel}})],1)]):n("section",{staticClass:"section"},[n("div",{staticClass:"container"},[n("login",{attrs:{mymodel:e.mymodel}})],1)]),e.debug?n("div",[n("pre",[e._v(e._s(e.sessionId))]),n("pre",[e._v(e._s(e.request))]),n("pre",[e._v(e._s(e.response))])]):e._e()])},i=[],r=(n("96cf"),n("3040")),a=(n("6762"),n("2fdb"),n("c93e")),o=(n("cadf"),n("551c"),n("097d"),n("2f62")),c=n("9a3e"),u=n("559b"),l=n("298f"),d=n("d722"),p=n("0d1a"),m=n.n(p),h=n("a860"),v=n.n(h),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",{staticClass:"title"},[e._v("Login")]),n("div",[n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[e._v("Naam")]),n("div",{staticClass:"control"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.mymodel.inputUsername,expression:"mymodel.inputUsername"}],staticClass:"input",attrs:{type:"text",placeholder:"Je naam"},domProps:{value:e.mymodel.inputUsername},on:{input:function(t){t.target.composing||e.$set(e.mymodel,"inputUsername",t.target.value)}}})])]),n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[e._v("Pincode")]),n("div",{staticClass:"control"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.mymodel.pincode,expression:"mymodel.pincode"}],staticClass:"input",attrs:{type:"password",maxlength:"4",placeholder:"Pincode",pattern:"[0-9]{4}"},domProps:{value:e.mymodel.pincode},on:{input:function(t){t.target.composing||e.$set(e.mymodel,"pincode",t.target.value)}}})])]),n("p",[n("button",{staticClass:"button is-link",attrs:{disabled:!(e.mymodel.inputUsername&&4===e.mymodel.pincode.length)},on:{click:function(t){e.mymodel.login()}}},[e._v("Log in")])])])])},b=[],g={props:["mymodel"],name:"Login",data:function(){return{}},methods:{},mounted:function(){},watch:{}},y=g,_=(n("ed2b"),n("2877")),w=Object(_["a"])(y,f,b,!1,null,"1d660260",null);w.options.__file="Login.vue";var O=w.exports,R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",[n("h1",{staticClass:"title"},[e._v("Join onboarding?")]),n("button",{staticClass:"button is-link",on:{click:function(t){e.joinOnboarding("yes")}}},[e._v("YES")]),n("button",{staticClass:"button is-link",on:{click:function(t){e.joinOnboarding("no")}}},[e._v("NO")])]),n("br"),n("div",[e.mymodel.data?n("div",[n("pre",[e._v(e._s(e.mymodel.data[0]))]),n("img",{attrs:{src:"data:image/jpeg;base64,"+e.mymodel.image}})]):e._e()])])},k=[],C={name:"OnboardingRequest",props:["mymodel"],data:function(){return{}},methods:{},mounted:function(){},watch:{}},x=C,I=(n("471f"),Object(_["a"])(x,R,k,!1,null,"4fae6252",null));I.options.__file="OnboardingRequest.vue";var j=I.exports,q=n("ce71"),S=n("156d"),E=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",{staticClass:"title"},[e._v("Scan QR Code")]),n("div",[n("h2",{staticClass:"subtitle"},[e._v("Scan de QR code om de identiteitsvraag te lezen")]),n("div",[n("qrcode-reader",{on:{decode:e.mymodel.onDecode}})],1)]),n("div",{staticClass:"field"},[n("label",{staticClass:"label"},[e._v("Session ID manual input")]),n("div",{staticClass:"control"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.mymodel.inputSession,expression:"mymodel.inputSession"}],staticClass:"input",attrs:{type:"text",placeholder:"Session code"},domProps:{value:e.mymodel.inputSession},on:{change:e.mymodel.onInputSession,input:function(t){t.target.composing||e.$set(e.mymodel,"inputSession",t.target.value)}}})]),n("p",[n("button",{staticClass:"button is-link",attrs:{disabled:!e.mymodel.inputSession},on:{click:function(t){e.mymodel.getRequest(e.sessionId)}}},[e._v("Get Request")])])])])},D=[],A={name:"ScanIDQuestion",props:["mymodel"],components:{QrcodeReader:c["QrcodeReader"]},data:function(){return{}},methods:{},mounted:function(){},watch:{}},Q=A,T=(n("1e79"),Object(_["a"])(Q,E,D,!1,null,"3b424999",null));T.options.__file="ScanIDQuestion.vue";var N=T.exports,U={data:function(){return{sessionId:null,request:null,onboardingRequest:null,disclosureRequest:null,response:null,inputSession:"",inputUsername:"aj.jansen",pincode:"1234",pictureUrl:null,loggedIn:!1,result:null,keypair:null,encryptedData:null,decrypted:null,session:null,data:null,image:null}},computed:Object(a["a"])({},Object(o["c"])(["username","debug"]),{mymodel:function(){return this}}),components:{ScanIDQuestion:N,ViewAnswer:S["a"],AnswerQuestion:q["a"],OnboardingRequest:j,Login:O,QrcodeReader:c["QrcodeReader"]},methods:Object(a["a"])({},Object(o["b"])({setUsername:"setUsername"}),{onDecode:function(e){if(e){if(e.includes("http")){var t=e.indexOf("?");this.sessionId=e.substring(t+"?session=".length,e.length)}else this.sessionId=e;this.getRequest(this.sessionId)}},zenroom:function(e){var t=this;window.Module=Object(a["a"])({},window.Module,{exec_ok:function(){return t.result+=" OK"},exec_error:function(){return t.result+=" ERROR"}});var n=function(){window.Module.print=function(e){return t.keypair=e};var e=null,n=null,s=null,i=m.a;window.Module.ccall("zenroom_exec","number",["string","string","string","string","number"],[i,s,e,n,1])},s=function(){window.Module.print=function(e){return t.setDecryptedValue(e)};var e=t.keypair,n=t.encryptedData,s=null,i=v.a;window.Module.ccall("zenroom_exec","number",["string","string","string","string","number"],[i,s,e,n,1])};"keypair"===e?n():"decrypt"===e&&s()},joinOnboarding:function(e){"yes"===e&&(this.zenroom("keypair"),this.result=this.keypair,this.sendPublicKey(JSON.parse(this.keypair).public))},sendPublicKey:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(d["b"])(t,this.sessionId);case 2:this.response=e.sent,this.result=this.response;case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),handleEncrypedData:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(d["f"])(this.sessionId);case 2:this.session=e.sent,this.encryptedData=this.session.response.data.encrypted,this.zenroom("decrypt");case 5:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),setDecryptedValue:function(e){this.decrypted=e;var t=JSON.parse(this.decrypted);this.data=JSON.parse(t.data),this.image=this.data[1].image_base64,Object(l["c"])("personal_data",this.data[0]),Object(l["c"])("personal_photo",this.image)},getRequest:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(d["f"])(t);case 2:this.request=e.sent,"onboarding"===this.request.response.request?(this.onboardingRequest=this.request.response,Object(u["b"])(this.sessionId),this.joinOnboarding()):this.disclosureRequest=this.request.response;case 4:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}(),acceptQuestion:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(d["a"])(this.disclosureRequest.id,this.username);case 2:this.response=e.sent;case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),denyQuestion:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(d["d"])(this.disclosureRequest.id);case 2:this.response=e.sent;case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),endQuestion:function(){this.$router.push("/")},onInputSession:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.inputSession.includes("http")?(t=this.inputSession.indexOf("?"),this.sessionId=this.inputSession.substring(t+"?session=".length,this.inputSession.length)):this.sessionId=this.inputSession,this.result=this.sessionId,this.getRequest(this.sessionId);case 3:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}(),login:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.inputUsername&&this.pincode&&(this.loggedIn=!0,this.setUsername(this.inputUsername));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()}),mounted:function(){var e=this;this.loggedIn=!!this.username,this.sessionId=this.$route.query.session,this.sessionId&&this.getRequest(this.sessionId);var t=function(e){return console.log(e)};u["d"].on("status_update",function(n){t(n),n.status==u["c"].GOT_ENCR_DATA&&e.handleEncrypedData()}),console.log("API URL: http://oscity.nl:5005/")}},P=U,$=Object(_["a"])(P,s,i,!1,null,null,null);$.options.__file="readQR.vue";t["default"]=$.exports},ed2b:function(e,t,n){"use strict";var s=n("98f4"),i=n.n(s);i.a}}]);
//# sourceMappingURL=readQR.8d840323.js.map