webpackJsonp([30],{706:function(l,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t,u,e,a,i,c,r,d,s,p=o(1),m=o(0),f=o(13),b=o(174),g=o(40),h=o(56),v=o(47),y=o(46),k=function(){function l(l,n,o,t,u,e,a,i,c){this.loadingCtrl=l,this.navCtrl=n,this.navParams=o,this.platform=t,this.camera=u,this.transfer=e,this.file=a,this.filePath=i,this.actionSheetCtrl=c,this.lastImage=null}return l.prototype.ionViewDidLoad=function(){console.log("ionViewDidLoad HomePage")},l.prototype.doLogin=function(){this.navCtrl.push("LoginPage",{},{animate:!0,animation:"transition",duration:500,direction:"forward"})},l.prototype.createAccount=function(){this.navCtrl.push("RegisterPage",{},{animate:!0,animation:"transition",duration:500,direction:"forward"})},l.prototype.doSkip=function(){this.navCtrl.push(b.a,{data:""},{animate:!0,animation:"transition",duration:500,direction:"forward"})},l}();k=Object(m.__decorate)([Object(p.Component)({selector:"page-home",templateUrl:"home.html"}),Object(m.__metadata)("design:paramtypes",["function"==typeof(t=void 0!==f.m&&f.m)&&t||Object,"function"==typeof(u=void 0!==f.q&&f.q)&&u||Object,"function"==typeof(e=void 0!==f.r&&f.r)&&e||Object,"function"==typeof(a=void 0!==f.s&&f.s)&&a||Object,"function"==typeof(i=void 0!==y.a&&y.a)&&i||Object,"function"==typeof(c=void 0!==h.a&&h.a)&&c||Object,"function"==typeof(r=void 0!==g.a&&g.a)&&r||Object,"function"==typeof(d=void 0!==v.a&&v.a)&&d||Object,"function"==typeof(s=void 0!==f.a&&f.a)&&s||Object])],k);var w=function(){return function(){}}();w=Object(m.__decorate)([Object(p.NgModule)({declarations:[k],imports:[f.l.forChild(k)],exports:[k]})],w);var j=o(392),O=o(393),R=o(394),C=o(395),_=o(396),P=o(397),L=o(398),S=o(399),x=o(400),E=o(67),F=o(27),M=o(3),N=o(5),A=o(9),D=o(8),q=o(29),H=o(6),I=o(23),V=o(129),J=o(100),U=o(99),W=o(30),Z=o(22),z=o(49),B=o(16),G=o(65),K=p["ɵcrt"]({encapsulation:2,styles:[],data:{}});function Q(l){return p["ɵvid"](0,[(l()(),p["ɵeld"](0,0,null,null,47,"ion-content",[["class","app-home-page"],["no-bounce",""],["padding",""]],[[2,"statusbar-padding",null],[2,"has-refresher",null]],null,null,E.b,E.a)),p["ɵdid"](1,4374528,null,0,F.a,[M.a,N.a,A.a,p.ElementRef,p.Renderer,D.a,q.a,p.NgZone,[2,H.a],[2,I.a]],null,null),(l()(),p["ɵted"](-1,1,["\n    "])),(l()(),p["ɵeld"](3,0,null,1,43,"ion-grid",[["class","grid"]],null,null,null,null,null)),p["ɵdid"](4,16384,null,0,V.a,[],null,null),(l()(),p["ɵted"](-1,null,["     \n        "])),(l()(),p["ɵeld"](6,0,null,null,15,"ion-row",[["class","stcapp-auth-container row"]],null,null,null,null,null)),p["ɵdid"](7,16384,null,0,J.a,[],null,null),(l()(),p["ɵted"](-1,null,["\n            "])),(l()(),p["ɵeld"](9,0,null,null,4,"ion-col",[["class","col"],["col-2",""]],null,null,null,null,null)),p["ɵdid"](10,16384,null,0,U.a,[],null,null),(l()(),p["ɵted"](-1,null,["\n                "])),(l()(),p["ɵeld"](12,0,null,null,0,"img",[["class","stcapp-img"],["src","assets/img/new-stuccco-icon.png"]],null,null,null,null,null)),(l()(),p["ɵted"](-1,null,["\n            "])),(l()(),p["ɵted"](-1,null,["\n            "])),(l()(),p["ɵeld"](15,0,null,null,5,"ion-col",[["class","col"],["col-12",""]],null,null,null,null,null)),p["ɵdid"](16,16384,null,0,U.a,[],null,null),(l()(),p["ɵted"](-1,null,["\n                "])),(l()(),p["ɵeld"](18,0,null,null,1,"p",[["class","stcapp-name"],["color","theme-text-yellow"]],null,null,null,null,null)),(l()(),p["ɵted"](-1,null,["Welcome to Stuccco"])),(l()(),p["ɵted"](-1,null,["\n            "])),(l()(),p["ɵted"](-1,null,["\n        "])),(l()(),p["ɵted"](-1,null,["\n        \n        "])),(l()(),p["ɵeld"](23,0,null,null,10,"ion-row",[["class","stcapp-auth-container row"]],null,null,null,null,null)),p["ɵdid"](24,16384,null,0,J.a,[],null,null),(l()(),p["ɵted"](-1,null,["\n            "])),(l()(),p["ɵeld"](26,0,null,null,2,"button",[["block",""],["class","home-button signup"],["color","color-brown"],["ion-button",""],["round",""]],null,[[null,"click"]],function(l,n,o){var t=!0;"click"===n&&(t=!1!==l.component.createAccount()&&t);return t},W.b,W.a)),p["ɵdid"](27,1097728,null,0,Z.a,[[8,""],M.a,p.ElementRef,p.Renderer],{color:[0,"color"],round:[1,"round"],block:[2,"block"]},null),(l()(),p["ɵted"](-1,0,["Sign up"])),(l()(),p["ɵted"](-1,null,["\n            "])),(l()(),p["ɵeld"](30,0,null,null,2,"button",[["block",""],["class","home-button signin"],["color","color-gray"],["ion-button",""],["outline",""],["round",""]],null,[[null,"click"]],function(l,n,o){var t=!0;"click"===n&&(t=!1!==l.component.doLogin()&&t);return t},W.b,W.a)),p["ɵdid"](31,1097728,null,0,Z.a,[[8,""],M.a,p.ElementRef,p.Renderer],{color:[0,"color"],outline:[1,"outline"],round:[2,"round"],block:[3,"block"]},null),(l()(),p["ɵted"](-1,0,["Sign in"])),(l()(),p["ɵted"](-1,null,["\n        "])),(l()(),p["ɵted"](-1,null,["\n        \n        "])),(l()(),p["ɵeld"](35,0,null,null,10,"ion-row",[["class","stcapp-home-skip row"]],null,null,null,null,null)),p["ɵdid"](36,16384,null,0,J.a,[],null,null),(l()(),p["ɵted"](-1,null,["\n            "])),(l()(),p["ɵeld"](38,0,null,null,6,"ion-col",[["class","col"],["col-12",""],["style","text-align: center;"]],null,null,null,null,null)),p["ɵdid"](39,16384,null,0,U.a,[],null,null),(l()(),p["ɵted"](-1,null,["\n                "])),(l()(),p["ɵeld"](41,0,null,null,2,"button",[["clear",""],["color","color-black"],["ion-button",""],["outline",""]],null,[[null,"click"]],function(l,n,o){var t=!0;"click"===n&&(t=!1!==l.component.doSkip()&&t);return t},W.b,W.a)),p["ɵdid"](42,1097728,null,0,Z.a,[[8,""],M.a,p.ElementRef,p.Renderer],{color:[0,"color"],outline:[1,"outline"],clear:[2,"clear"]},null),(l()(),p["ɵted"](-1,0,["Skip for now"])),(l()(),p["ɵted"](-1,null,["\n            "])),(l()(),p["ɵted"](-1,null,["\n        "])),(l()(),p["ɵted"](-1,null,["\n    "])),(l()(),p["ɵted"](-1,1,["\n"]))],function(l,n){l(n,27,0,"color-brown","","");l(n,31,0,"color-gray","","","");l(n,42,0,"color-black","","")},function(l,n){l(n,0,0,p["ɵnov"](n,1).statusbarPadding,p["ɵnov"](n,1)._hasRefresher)})}var T=p["ɵccf"]("page-home",k,function(l){return p["ɵvid"](0,[(l()(),p["ɵeld"](0,0,null,null,1,"page-home",[],null,null,null,Q,K)),p["ɵdid"](1,49152,null,0,k,[z.a,I.a,B.a,N.a,y.a,h.a,g.a,v.a,G.a],null,null)],null,null)},{},{},[]),X=o(14),Y=o(18),$=o(224),ll=o(89);o.d(n,"HomePageModuleNgFactory",function(){return nl});var nl=p["ɵcmf"](w,[],function(l){return p["ɵmod"]([p["ɵmpd"](512,p.ComponentFactoryResolver,p["ɵCodegenComponentFactoryResolver"],[[8,[j.a,O.a,R.a,C.a,_.a,P.a,L.a,S.a,x.a,T]],[3,p.ComponentFactoryResolver],p.NgModuleRef]),p["ɵmpd"](4608,X.k,X.j,[p.LOCALE_ID]),p["ɵmpd"](4608,Y.x,Y.x,[]),p["ɵmpd"](4608,Y.g,Y.g,[]),p["ɵmpd"](512,X.b,X.b,[]),p["ɵmpd"](512,Y.v,Y.v,[]),p["ɵmpd"](512,Y.l,Y.l,[]),p["ɵmpd"](512,Y.s,Y.s,[]),p["ɵmpd"](512,$.a,$.a,[]),p["ɵmpd"](512,$.b,$.b,[]),p["ɵmpd"](512,w,w,[]),p["ɵmpd"](256,ll.a,k,[])])})}});