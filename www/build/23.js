webpackJsonp([23],{720:function(l,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t,a,o,u,i=e(1),d=e(0),r=e(13),c=e(225),s=e(17),p=e(26),b=function(){function l(l,n,e,t){this.navCtrl=l,this.navParams=n,this.iab=e,this.checktoken=t,this.userAuthData=t.authToken?JSON.parse(t.userAuthData):"null"}return l.prototype.goToProjectBillingSection=function(){this.iab.create(p.k+p._26+this.userAuthData.id,"_blank","location=yes,hidden=yes,hardwareback=no,zoom=no,toolbar=yes,transitionstyle=fliphorizontal").show()},l.prototype.backbutton=function(){this.navCtrl.pop()},l.prototype.ionViewDidLoad=function(){console.log("ionViewDidLoad SettingProjectBillingPage")},l}();b=Object(d.__decorate)([Object(i.Component)({selector:"page-setting-project-billing",templateUrl:"setting-project-billing.html"}),Object(d.__metadata)("design:paramtypes",["function"==typeof(t=void 0!==r.q&&r.q)&&t||Object,"function"==typeof(a=void 0!==r.r&&r.r)&&a||Object,"function"==typeof(o=void 0!==c.a&&c.a)&&o||Object,"function"==typeof(u=void 0!==s.a&&s.a)&&u||Object])],b);var g=function(){return function(){}}();g=Object(d.__decorate)([Object(i.NgModule)({declarations:[b],imports:[r.l.forChild(b)]})],g);var f=e(392),m=e(393),h=e(394),v=e(395),j=e(396),k=e(397),y=e(398),R=e(399),_=e(400),O=e(44),P=e(3),w=e(6),C=e(60),E=e(31),B=e(8),D=e(23),S=e(90),M=e(61),N=e(38),A=e(69),F=e(37),L=e(67),T=e(27),q=e(5),x=e(9),z=e(29),J=e(16),V=i["ɵcrt"]({encapsulation:2,styles:[],data:{}});function I(l){return i["ɵvid"](0,[(l()(),i["ɵeld"](0,0,null,null,22,"ion-header",[],null,null,null,null,null)),i["ɵdid"](1,16384,null,0,O.a,[P.a,i.ElementRef,i.Renderer,[2,w.a]],null,null),(l()(),i["ɵted"](-1,null,["\n  "])),(l()(),i["ɵeld"](3,0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,C.b,C.a)),i["ɵdid"](4,49152,null,0,E.a,[B.a,[2,w.a],[2,D.a],P.a,i.ElementRef,i.Renderer],null,null),(l()(),i["ɵted"](-1,3,["\n    "])),(l()(),i["ɵeld"](6,0,null,3,2,"ion-title",[],null,null,null,S.b,S.a)),i["ɵdid"](7,49152,null,0,M.a,[P.a,i.ElementRef,i.Renderer,[2,N.a],[2,E.a]],null,null),(l()(),i["ɵted"](-1,0,["setting-project-billing"])),(l()(),i["ɵted"](-1,3,["\n  "])),(l()(),i["ɵted"](-1,null,["\n"])),(l()(),i["ɵeld"](11,0,null,null,10,"ion-toolbar",[["class","sub-header toolbar"]],[[2,"statusbar-padding",null]],null,null,A.b,A.a)),i["ɵdid"](12,49152,null,0,N.a,[P.a,i.ElementRef,i.Renderer],null,null),(l()(),i["ɵted"](-1,3,["\n    "])),(l()(),i["ɵeld"](14,0,null,3,2,"a",[["class","backicon"]],null,[[null,"click"]],function(l,n,e){var t=!0;"click"===n&&(t=!1!==l.component.backbutton()&&t);return t},null,null)),(l()(),i["ɵeld"](15,0,null,null,1,"ion-icon",[["ios","ios-arrow-back"],["name","arrow-back"],["role","img"]],[[2,"hide",null]],null,null,null,null)),i["ɵdid"](16,147456,null,0,F.a,[P.a,i.ElementRef,i.Renderer],{name:[0,"name"],ios:[1,"ios"]},null),(l()(),i["ɵted"](-1,3,["\n    "])),(l()(),i["ɵeld"](18,0,null,3,2,"ion-title",[["class","title"]],null,null,null,S.b,S.a)),i["ɵdid"](19,49152,null,0,M.a,[P.a,i.ElementRef,i.Renderer,[2,N.a],[2,E.a]],null,null),(l()(),i["ɵted"](-1,0,["projects & billing"])),(l()(),i["ɵted"](-1,3,["\n"])),(l()(),i["ɵted"](-1,null,[" \n"])),(l()(),i["ɵted"](-1,null,["\n"])),(l()(),i["ɵeld"](24,0,null,null,8,"ion-content",[["padding",""]],[[2,"statusbar-padding",null],[2,"has-refresher",null]],null,null,L.b,L.a)),i["ɵdid"](25,4374528,null,0,T.a,[P.a,q.a,x.a,i.ElementRef,i.Renderer,B.a,z.a,i.NgZone,[2,w.a],[2,D.a]],null,null),(l()(),i["ɵted"](-1,1,["\n    "])),(l()(),i["ɵeld"](27,0,null,1,1,"p",[["class","projectBilling"]],null,null,null,null,null)),(l()(),i["ɵted"](-1,null,["To make yourself available for hire and manage your project and billing settings, visit Settings"])),(l()(),i["ɵted"](-1,1,["\n    "])),(l()(),i["ɵeld"](30,0,null,1,1,"a",[["href","#"]],null,[[null,"click"]],function(l,n,e){var t=!0;"click"===n&&(t=!1!==l.component.goToProjectBillingSection()&&t);return t},null,null)),(l()(),i["ɵted"](-1,null,["Manage Projects & Billing"])),(l()(),i["ɵted"](-1,1,["\n"])),(l()(),i["ɵted"](-1,null,["\n"]))],function(l,n){l(n,16,0,"arrow-back","ios-arrow-back")},function(l,n){l(n,3,0,i["ɵnov"](n,4)._hidden,i["ɵnov"](n,4)._sbPadding),l(n,11,0,i["ɵnov"](n,12)._sbPadding),l(n,15,0,i["ɵnov"](n,16)._hidden),l(n,24,0,i["ɵnov"](n,25).statusbarPadding,i["ɵnov"](n,25)._hasRefresher)})}var U=i["ɵccf"]("page-setting-project-billing",b,function(l){return i["ɵvid"](0,[(l()(),i["ɵeld"](0,0,null,null,1,"page-setting-project-billing",[],null,null,null,I,V)),i["ɵdid"](1,49152,null,0,b,[D.a,J.a,c.a,s.a],null,null)],null,null)},{},{},[]),Z=e(14),G=e(18),H=e(224),K=e(89);e.d(n,"SettingProjectBillingPageModuleNgFactory",function(){return Q});var Q=i["ɵcmf"](g,[],function(l){return i["ɵmod"]([i["ɵmpd"](512,i.ComponentFactoryResolver,i["ɵCodegenComponentFactoryResolver"],[[8,[f.a,m.a,h.a,v.a,j.a,k.a,y.a,R.a,_.a,U]],[3,i.ComponentFactoryResolver],i.NgModuleRef]),i["ɵmpd"](4608,Z.k,Z.j,[i.LOCALE_ID]),i["ɵmpd"](4608,G.x,G.x,[]),i["ɵmpd"](4608,G.g,G.g,[]),i["ɵmpd"](512,Z.b,Z.b,[]),i["ɵmpd"](512,G.v,G.v,[]),i["ɵmpd"](512,G.l,G.l,[]),i["ɵmpd"](512,G.s,G.s,[]),i["ɵmpd"](512,H.a,H.a,[]),i["ɵmpd"](512,H.b,H.b,[]),i["ɵmpd"](512,g,g,[]),i["ɵmpd"](256,K.a,b,[])])})}});