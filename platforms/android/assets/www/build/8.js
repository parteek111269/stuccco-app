webpackJsonp([8],{710:function(n,l,e){"use strict";Object.defineProperty(l,"__esModule",{value:!0});var t,u,a,o,r,i,d,s=e(1),c=e(0),p=e(13),m=e(737),f=e(26),h=e(17),g=function(){function n(n,l,e,t,u,a){var o=this;this.checktoken=n,this.event=l,this.loading=e,this.navCtrl=t,this.navParams=u,this.marketprovider=a,this.templateInfo={},this.baseUrl=f.k,console.log(this.navParams.data),this.role=JSON.parse(localStorage.userAuthData).role,this.user_id=JSON.parse(localStorage.userAuthData).id,this.templateId=this.navParams.data.templateid,this.room_type=this.navParams.data.room_type,this.styles=this.navParams.data.styles,this.getTemplateDetails(this.templateId),this.event.subscribe("templateform",function(n){o.updation(n)})}return n.prototype.ionViewDidLoad=function(){},n.prototype.backbutton=function(){this.navCtrl.pop()},n.prototype.getTemplateDetails=function(n){var l=this,e=this.loading.create({content:"Loading..."});return e.present().then(function(){l.marketprovider.getTemplateDetails(n).then(function(n){l.templateInfo={status:n.status,description:n.data.description,id:n.data.id,name:n.data.name,price:n.data.price,user_id:n.data.user_id,username:n.data.username,hp_name:n.data.hp_name,avg_rating:n.data.avg_rating,featured_image:n.data.featured_image,room_type:n.data.room_type,style_type:n.data.style_type,room_shape:n.data.room_shape,images:n.data.images,square_footage:n.data.square_footage,room_budget:n.data.room_budget,document:n.data.document,room_type_id:n.data.room_type_id,style_type_id:n.data.style_type_id},e.dismiss(),console.log(l.templateInfo)})})},n.prototype.editTemplate=function(n){console.log(n),this.navCtrl.push("TemplateformPage",{templateInfo:n,obj:{room_type:this.room_type,styles:this.styles}})},n.prototype.updation=function(n){this.templateInfo={status:!0,description:n.description,id:n.id,name:n.name,price:n.price,user_id:n.user_id,username:n.username,hp_name:n.hp_name,avg_rating:n.avg_rating,featured_image:n.featured_image,room_type:n.room_type,style_type:n.style_type,room_shape:n.room_shape,images:n.images,square_footage:n.square_footage,room_budget:n.room_budget,document:n.document,room_type_id:n.room_type_id,style_type_id:n.style_type_id}},n.prototype.purchase=function(n){console.log(n),this.navCtrl.push("PurchasetemplatePage",n)},n.prototype.goToChattingPage=function(n){var l=this,e=this.user_id,t=n.user_id;console.log(e,t),this.marketprovider.startNewConversation(e,t).then(function(n){l.navCtrl.push("ChattingPage",{conversation_id:n.conversation_id})})},n}();Object(c.__decorate)([Object(s.ViewChild)(p.t),Object(c.__metadata)("design:type","function"==typeof(t=void 0!==p.t&&p.t)&&t||Object)],g.prototype,"slides",void 0),g=Object(c.__decorate)([Object(s.Component)({selector:"page-markettemplates",templateUrl:"markettemplates.html"}),Object(c.__metadata)("design:paramtypes",["function"==typeof(u=void 0!==h.a&&h.a)&&u||Object,"function"==typeof(a=void 0!==p.f&&p.f)&&a||Object,"function"==typeof(o=void 0!==p.m&&p.m)&&o||Object,"function"==typeof(r=void 0!==p.q&&p.q)&&r||Object,"function"==typeof(i=void 0!==p.r&&p.r)&&i||Object,"function"==typeof(d=void 0!==m.a&&m.a)&&d||Object])],g);var _=e(226),b=function(){return function(){}}();b=Object(c.__decorate)([Object(s.NgModule)({declarations:[g],imports:[p.l.forChild(g),_.c],providers:[m.a]})],b);var v=e(392),y=e(393),k=e(394),I=e(395),R=e(396),C=e(397),E=e(398),T=e(399),w=e(400),O=e(170),P=e(91),j=e(64),z=e(54),N=e(175),A=e(93),B=e(72),H=e(14),S=e(176),V=e(3),q=e(5),J=e(6),D=e(30),F=e(22),U=e(81),M=e(232),x=e(228),L=e(44),$=e(60),Z=e(31),G=e(8),K=e(23),Q=e(90),W=e(61),X=e(38),Y=e(69),nn=e(37),ln=e(67),en=e(27),tn=e(9),un=e(29),an=e(173),on=e(49),rn=e(16),dn=s["ɵcrt"]({encapsulation:2,styles:[],data:{}});function sn(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,1,"img-loader",[["useImg","true"]],null,null,null,O.b,O.a)),s["ɵdid"](1,114688,null,0,P.a,[s.ElementRef,s.Renderer,j.a,z.a],{src:[0,"src"],useImg:[1,"useImg"]},null)],function(n,l){n(l,1,0,s["ɵinlineInterpolate"](2,"",l.component.baseUrl,"",l.parent.context.$implicit.image,""),"true")},null)}function cn(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,5,"ion-slide",[],null,null,null,N.b,N.a)),s["ɵdid"](1,180224,null,0,A.a,[s.ElementRef,s.Renderer,B.a],null,null),(n()(),s["ɵted"](-1,0,["\n\t          "])),(n()(),s["ɵand"](16777216,null,0,1,null,sn)),s["ɵdid"](4,16384,null,0,H.i,[s.ViewContainerRef,s.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),s["ɵted"](-1,0,["\n\t        "]))],function(n,l){n(l,4,0,""!=l.context.$implicit.image)},null)}function pn(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,5,"ion-slides",[["class","cover_slider"],["pager",""]],null,null,null,S.b,S.a)),s["ɵdid"](1,1228800,[[1,4]],0,B.a,[V.a,q.a,s.NgZone,[2,J.a],s.ElementRef,s.Renderer],{pager:[0,"pager"]},null),(n()(),s["ɵted"](-1,0,["\n\t        "])),(n()(),s["ɵand"](16777216,null,0,1,null,cn)),s["ɵdid"](4,802816,null,0,H.h,[s.ViewContainerRef,s.TemplateRef,s.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),s["ɵted"](-1,0,["\n\t    "]))],function(n,l){var e=l.component;n(l,1,0,""),n(l,4,0,e.templateInfo.images)},null)}function mn(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,1,"img-loader",[["useImg","true"]],null,null,null,O.b,O.a)),s["ɵdid"](1,114688,null,0,P.a,[s.ElementRef,s.Renderer,j.a,z.a],{src:[0,"src"],useImg:[1,"useImg"]},null)],function(n,l){n(l,1,0,l.component.cover.image[0],"true")},null)}function fn(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,1,"img-loader",[["src","assets/img/missing.png"],["style","display: block;text-align: center;"],["useImg","true"]],null,null,null,O.b,O.a)),s["ɵdid"](1,114688,null,0,P.a,[s.ElementRef,s.Renderer,j.a,z.a],{src:[0,"src"],useImg:[1,"useImg"]},null)],function(n,l){n(l,1,0,"assets/img/missing.png","true")},null)}function hn(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,3,"span",[],null,null,null,null,null)),(n()(),s["ɵeld"](1,0,null,null,2,"button",[["class","btn_font"],["ion-button",""],["round",""]],null,[[null,"click"]],function(n,l,e){var t=!0,u=n.component;"click"===l&&(t=!1!==u.editTemplate(u.templateInfo)&&t);return t},D.b,D.a)),s["ɵdid"](2,1097728,null,0,F.a,[[8,""],V.a,s.ElementRef,s.Renderer],{round:[0,"round"]},null),(n()(),s["ɵted"](-1,0,["Edit Template"]))],function(n,l){n(l,2,0,"")},null)}function gn(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),s["ɵted"](1,null,["Room Type: ",""]))],null,function(n,l){n(l,1,0,l.component.templateInfo.room_type)})}function _n(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),s["ɵted"](1,null,["Style Type: ",""]))],null,function(n,l){n(l,1,0,l.component.templateInfo.style_type)})}function bn(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),s["ɵted"](1,null,["Room Shape: ",""]))],null,function(n,l){n(l,1,0,l.component.templateInfo.room_shape)})}function vn(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),s["ɵted"](1,null,["Square Footage: ",""]))],null,function(n,l){n(l,1,0,l.component.templateInfo.square_footage)})}function yn(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,1,"p",[],null,null,null,null,null)),(n()(),s["ɵted"](1,null,["Room budget: ",""]))],null,function(n,l){n(l,1,0,l.component.templateInfo.room_budget)})}function kn(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,1,"p",[["class","justify_text"]],null,null,null,null,null)),(n()(),s["ɵted"](1,null,["",""]))],null,function(n,l){n(l,1,0,l.component.templateInfo.description)})}function In(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,73,"div",[],null,null,null,null,null)),(n()(),s["ɵted"](-1,null,["\n\t\t"])),(n()(),s["ɵand"](16777216,null,null,1,null,pn)),s["ɵdid"](3,16384,null,0,H.i,[s.ViewContainerRef,s.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),s["ɵted"](-1,null,["\n\t    "])),(n()(),s["ɵand"](16777216,null,null,1,null,mn)),s["ɵdid"](6,16384,null,0,H.i,[s.ViewContainerRef,s.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),s["ɵted"](-1,null,["\n\t    "])),(n()(),s["ɵand"](16777216,null,null,1,null,fn)),s["ɵdid"](9,16384,null,0,H.i,[s.ViewContainerRef,s.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),s["ɵted"](-1,null,["\n\t    "])),(n()(),s["ɵeld"](11,0,null,null,44,"div",[["class","template_header"]],null,null,null,null,null)),(n()(),s["ɵted"](-1,null,["\n\t\t\t"])),(n()(),s["ɵeld"](13,0,null,null,1,"h2",[],null,null,null,null,null)),(n()(),s["ɵted"](14,null,["",""])),(n()(),s["ɵted"](-1,null,["\n\t\t\t"])),(n()(),s["ɵeld"](16,0,null,null,3,"p",[],null,null,null,null,null)),(n()(),s["ɵted"](-1,null,["By "])),(n()(),s["ɵeld"](18,0,null,null,1,"a",[],null,null,null,null,null)),(n()(),s["ɵted"](19,null,["",""])),(n()(),s["ɵted"](-1,null,["\n\t    \t"])),(n()(),s["ɵeld"](21,0,null,null,14,"div",[],null,null,null,null,null)),(n()(),s["ɵted"](-1,null,["\n\t    \t\t"])),(n()(),s["ɵeld"](23,0,null,null,3,"span",[],null,null,null,null,null)),(n()(),s["ɵeld"](24,0,null,null,2,"button",[["class","btn_font"],["ion-button",""],["round",""]],null,[[null,"click"]],function(n,l,e){var t=!0,u=n.component;"click"===l&&(t=!1!==u.purchase(u.templateInfo)&&t);return t},D.b,D.a)),s["ɵdid"](25,1097728,null,0,F.a,[[8,""],V.a,s.ElementRef,s.Renderer],{round:[0,"round"]},null),(n()(),s["ɵted"](-1,0,["Buy!"])),(n()(),s["ɵted"](-1,null,["\n\t    \t\t"])),(n()(),s["ɵeld"](28,0,null,null,3,"span",[],null,null,null,null,null)),(n()(),s["ɵeld"](29,0,null,null,2,"button",[["class","btn_font"],["ion-button",""],["round",""]],null,[[null,"click"]],function(n,l,e){var t=!0,u=n.component;"click"===l&&(t=!1!==u.goToChattingPage(u.templateInfo)&&t);return t},D.b,D.a)),s["ɵdid"](30,1097728,null,0,F.a,[[8,""],V.a,s.ElementRef,s.Renderer],{round:[0,"round"]},null),(n()(),s["ɵted"](-1,0,["Message"])),(n()(),s["ɵted"](-1,null,["\n\t    \t\t"])),(n()(),s["ɵand"](16777216,null,null,1,null,hn)),s["ɵdid"](34,16384,null,0,H.i,[s.ViewContainerRef,s.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),s["ɵted"](-1,null,["\n\t    \t"])),(n()(),s["ɵted"](-1,null,["\n\t    \t"])),(n()(),s["ɵeld"](37,0,null,null,17,"div",[["class","price"]],null,null,null,null,null)),(n()(),s["ɵted"](38,null,["Price: $","\n\t    \t\t"])),(n()(),s["ɵand"](16777216,null,null,1,null,gn)),s["ɵdid"](40,16384,null,0,H.i,[s.ViewContainerRef,s.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),s["ɵted"](-1,null,["\n\t    \t\t"])),(n()(),s["ɵand"](16777216,null,null,1,null,_n)),s["ɵdid"](43,16384,null,0,H.i,[s.ViewContainerRef,s.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),s["ɵted"](-1,null,["\n\t    \t\t"])),(n()(),s["ɵand"](16777216,null,null,1,null,bn)),s["ɵdid"](46,16384,null,0,H.i,[s.ViewContainerRef,s.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),s["ɵted"](-1,null,["\n\t    \t\t"])),(n()(),s["ɵand"](16777216,null,null,1,null,vn)),s["ɵdid"](49,16384,null,0,H.i,[s.ViewContainerRef,s.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),s["ɵted"](-1,null,["\n\t    \t\t"])),(n()(),s["ɵand"](16777216,null,null,1,null,yn)),s["ɵdid"](52,16384,null,0,H.i,[s.ViewContainerRef,s.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),s["ɵted"](-1,null,["\n\t    \t\t"])),(n()(),s["ɵted"](-1,null,["\n\t    \t"])),(n()(),s["ɵted"](-1,null,["\n\t\t"])),(n()(),s["ɵted"](-1,null,["\n\t\t"])),(n()(),s["ɵeld"](57,0,null,null,15,"ion-card",[],null,null,null,null,null)),s["ɵdid"](58,16384,null,0,U.a,[V.a,s.ElementRef,s.Renderer],null,null),(n()(),s["ɵted"](-1,null,["\n\t\t\t"])),(n()(),s["ɵeld"](60,0,null,null,2,"ion-card-header",[],null,null,null,null,null)),s["ɵdid"](61,16384,null,0,M.a,[V.a,s.ElementRef,s.Renderer],null,null),(n()(),s["ɵted"](-1,null,["\n\t\t    \tTemplate Details\n\t\t  \t"])),(n()(),s["ɵted"](-1,null,["\n\t\t  \t"])),(n()(),s["ɵeld"](64,0,null,null,0,"hr",[["class","divider"]],null,null,null,null,null)),(n()(),s["ɵted"](-1,null,["\n\t\t\t"])),(n()(),s["ɵeld"](66,0,null,null,5,"ion-card-content",[],null,null,null,null,null)),s["ɵdid"](67,16384,null,0,x.a,[V.a,s.ElementRef,s.Renderer],null,null),(n()(),s["ɵted"](-1,null,["\n\t    \t\t"])),(n()(),s["ɵand"](16777216,null,null,1,null,kn)),s["ɵdid"](70,16384,null,0,H.i,[s.ViewContainerRef,s.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),s["ɵted"](-1,null,["\n\t  \t\t"])),(n()(),s["ɵted"](-1,null,["\n\t\t"])),(n()(),s["ɵted"](-1,null,["\n\t"]))],function(n,l){var e=l.component;n(l,3,0,(null==e.templateInfo.images?null:e.templateInfo.images.length)>=1),n(l,6,0,1==(null==e.cover?null:e.cover.length)),n(l,9,0,""==e.templateInfo.featured_image);n(l,25,0,"");n(l,30,0,""),n(l,34,0,1==e.role&&e.user_id==e.templateInfo.user_id),n(l,40,0,e.templateInfo.room_type),n(l,43,0,e.templateInfo.style_type),n(l,46,0,e.templateInfo.room_shape),n(l,49,0,e.templateInfo.square_footage),n(l,52,0,e.templateInfo.room_budget),n(l,70,0,e.templateInfo.description)},function(n,l){var e=l.component;n(l,14,0,e.templateInfo.name),n(l,19,0,e.templateInfo.hp_name),n(l,38,0,e.templateInfo.price)})}function Rn(n){return s["ɵvid"](0,[s["ɵqud"](671088640,1,{slides:0}),(n()(),s["ɵeld"](1,0,null,null,20,"ion-header",[],null,null,null,null,null)),s["ɵdid"](2,16384,null,0,L.a,[V.a,s.ElementRef,s.Renderer,[2,J.a]],null,null),(n()(),s["ɵted"](-1,null,["\n\t"])),(n()(),s["ɵeld"](4,0,null,null,6,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,$.b,$.a)),s["ɵdid"](5,49152,null,0,Z.a,[G.a,[2,J.a],[2,K.a],V.a,s.ElementRef,s.Renderer],null,null),(n()(),s["ɵted"](-1,3,["\n    \t"])),(n()(),s["ɵeld"](7,0,null,3,2,"ion-title",[],null,null,null,Q.b,Q.a)),s["ɵdid"](8,49152,null,0,W.a,[V.a,s.ElementRef,s.Renderer,[2,X.a],[2,Z.a]],null,null),(n()(),s["ɵted"](-1,0,["Templates"])),(n()(),s["ɵted"](-1,3,["\n  \t"])),(n()(),s["ɵted"](-1,null,["\n  \t"])),(n()(),s["ɵeld"](12,0,null,null,8,"ion-toolbar",[["class","sub-header toolbar"]],[[2,"statusbar-padding",null]],null,null,Y.b,Y.a)),s["ɵdid"](13,49152,null,0,X.a,[V.a,s.ElementRef,s.Renderer],null,null),(n()(),s["ɵted"](-1,3,["\n        "])),(n()(),s["ɵeld"](15,0,null,3,4,"a",[["class","backicon"]],null,[[null,"click"]],function(n,l,e){var t=!0;"click"===l&&(t=!1!==n.component.backbutton()&&t);return t},null,null)),(n()(),s["ɵeld"](16,0,null,null,3,"ion-icon",[["ios","ios-arrow-back"],["name","arrow-back"],["role","img"]],[[2,"hide",null]],null,null,null,null)),s["ɵdid"](17,147456,null,0,nn.a,[V.a,s.ElementRef,s.Renderer],{name:[0,"name"],ios:[1,"ios"]},null),(n()(),s["ɵeld"](18,0,null,null,1,"span",[["class","back-text"]],null,null,null,null,null)),(n()(),s["ɵted"](-1,null,["Back"])),(n()(),s["ɵted"](-1,3,["\n    "])),(n()(),s["ɵted"](-1,null,["\n"])),(n()(),s["ɵted"](-1,null,["\n"])),(n()(),s["ɵeld"](23,0,null,null,5,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],null,null,ln.b,ln.a)),s["ɵdid"](24,4374528,null,0,en.a,[V.a,q.a,tn.a,s.ElementRef,s.Renderer,G.a,un.a,s.NgZone,[2,J.a],[2,K.a]],null,null),(n()(),s["ɵted"](-1,1,["\n\t"])),(n()(),s["ɵand"](16777216,null,1,1,null,In)),s["ɵdid"](27,16384,null,0,H.i,[s.ViewContainerRef,s.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),s["ɵted"](-1,1,["\t\n"])),(n()(),s["ɵted"](-1,null,["\n"]))],function(n,l){var e=l.component;n(l,17,0,"arrow-back","ios-arrow-back"),n(l,27,0,e.templateInfo.status)},function(n,l){n(l,4,0,s["ɵnov"](l,5)._hidden,s["ɵnov"](l,5)._sbPadding),n(l,12,0,s["ɵnov"](l,13)._sbPadding),n(l,16,0,s["ɵnov"](l,17)._hidden),n(l,23,0,s["ɵnov"](l,24).statusbarPadding,s["ɵnov"](l,24)._hasRefresher)})}var Cn=s["ɵccf"]("page-markettemplates",g,function(n){return s["ɵvid"](0,[(n()(),s["ɵeld"](0,0,null,null,1,"page-markettemplates",[],null,null,null,Rn,dn)),s["ɵdid"](1,49152,null,0,g,[h.a,an.a,on.a,K.a,rn.a,m.a],null,null)],null,null)},{},{},[]),En=e(18),Tn=e(34),wn=e(224),On=e(227),Pn=e(89);e.d(l,"MarkettemplatesPageModuleNgFactory",function(){return jn});var jn=s["ɵcmf"](b,[],function(n){return s["ɵmod"]([s["ɵmpd"](512,s.ComponentFactoryResolver,s["ɵCodegenComponentFactoryResolver"],[[8,[v.a,y.a,k.a,I.a,R.a,C.a,E.a,T.a,w.a,Cn]],[3,s.ComponentFactoryResolver],s.NgModuleRef]),s["ɵmpd"](4608,H.k,H.j,[s.LOCALE_ID]),s["ɵmpd"](4608,En.x,En.x,[]),s["ɵmpd"](4608,En.g,En.g,[]),s["ɵmpd"](4608,m.a,m.a,[Tn.Http,h.a]),s["ɵmpd"](512,H.b,H.b,[]),s["ɵmpd"](512,En.v,En.v,[]),s["ɵmpd"](512,En.l,En.l,[]),s["ɵmpd"](512,En.s,En.s,[]),s["ɵmpd"](512,wn.a,wn.a,[]),s["ɵmpd"](512,wn.b,wn.b,[]),s["ɵmpd"](512,On.a,On.a,[]),s["ɵmpd"](512,b,b,[]),s["ɵmpd"](256,Pn.a,g,[])])})},737:function(n,l,e){"use strict";e.d(l,"a",function(){return c});var t,u,a=e(0),o=e(1),r=e(34),i=e(48),d=(e.n(i),e(17)),s=e(26),c=function(){function n(n,l){this.http=n,this.checktoken=l,this.url=s.k+s.j}return n.prototype.getMarketItems=function(n,l,e,t){var u,a=this;return console.log(e),n=n?"&"+n:"",u="profile"==e?this.url+"templates?user_id="+t:this.url+s._12+l+n,this.checktoken.loadUserCredentials(),this.headers=new r.Headers,this.headers.append("Authorization","Bearer "+this.checktoken.authToken),new Promise(function(n){a.http.get(u,{headers:a.headers}).subscribe(function(l){console.log(l);var e=JSON.parse(l._body);200===l.status?n(e):(alert("Request failed please try again!"),n(!1))},function(l){a.checktoken.onErrorHandlerBuzz("Market page API Endpoint Error: ",l),n(!1)})})},n.prototype.getTemplateDetails=function(n){var l=this,e=this.url+s._11+"/"+n;return this.checktoken.loadUserCredentials(),this.headers=new r.Headers,this.headers.append("Authorization","Bearer "+this.checktoken.authToken),new Promise(function(n){l.http.get(e,{headers:l.headers}).subscribe(function(l){var e=JSON.parse(l._body);200===l.status?n(e):(alert("Request failed please try again!"),n(!1))},function(e){l.checktoken.onErrorHandlerBuzz("API Endpoint Error: ",e),n(!1)})})},n.prototype.updateTemplateForm=function(n,l){var e=this,t=this.url+s._11+"/"+l;return this.checktoken.loadUserCredentials(),this.headers=new r.Headers,this.headers.append("Authorization","Bearer "+this.checktoken.authToken),new Promise(function(l){e.http.patch(t,n,{headers:e.headers}).subscribe(function(n){var e=JSON.parse(n._body);200===n.status?l(e):(alert("Request failed please try again!"),l(!1))},function(n){e.checktoken.onErrorHandlerBuzz("API Endpoint Error: ",n),l(!1)})})},n.prototype.addTemplateForm=function(n){var l=this,e=this.url+s._11;return this.checktoken.loadUserCredentials(),this.headers=new r.Headers,this.headers.append("Authorization","Bearer "+this.checktoken.authToken),new Promise(function(t){l.http.post(e,n,{headers:l.headers}).subscribe(function(n){var l=JSON.parse(n._body);200===n.status?t(l):(alert("Request failed please try again!"),t(!1))},function(n){l.checktoken.onErrorHandlerBuzz("API Endpoint Error: ",n),t(!1)})})},n.prototype.checkout=function(n,l,e){var t=this,u=this.url+s._11+s._30;this.checktoken.loadUserCredentials(),this.headers=new r.Headers,this.headers.append("Authorization","Bearer "+this.checktoken.authToken);JSON.stringify(n);return new Promise(function(n){t.http.post(u,{stripeToken:l,id:e},{headers:t.headers}).subscribe(function(l){var e=JSON.parse(l._body);!0===e.status?n(e):(alert(JSON.stringify(e)),n(!1))},function(l){t.checktoken.onErrorHandlerBuzz("Checkout process API Endpoint Error: ",l),n(!1)})})},n.prototype.startNewConversation=function(n,l){var e=this,t=this.url+s.u+"?sender_id="+n+"&recipient_id="+l;return this.checktoken.loadUserCredentials(),this.headers=new r.Headers,this.headers.append("Authorization","Bearer "+this.checktoken.authToken),new Promise(function(n){e.http.post(t,{headers:e.headers}).subscribe(function(l){var e=JSON.parse(l._body);n(200===l.status&&e)},function(l){e.checktoken.onErrorHandlerBuzz("API Endpoint Error: ",l),n(!1)})})},n}();c=Object(a.__decorate)([Object(o.Injectable)(),Object(a.__metadata)("design:paramtypes",["function"==typeof(t=void 0!==r.Http&&r.Http)&&t||Object,"function"==typeof(u=void 0!==d.a&&d.a)&&u||Object])],c)}});