webpackJsonp([36],{726:function(l,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e,i,u,a,o,d,c,s,r,m,p,f,h,v,g,b,_,y,R,k=t(1),C=t(0),I=t(13),O=t(231),P=t(26),T=t(233),x=t(174),j=t(17),A=t(18),E=t(46),D=t(73),w=t(40),F=t(56),L=t(47),q=function(){function l(l,n,t,e,i,u,a,o,d,c,s,r,m,p,f,h,v,g){this.zone=l,this.alertCtrl=n,this.feedservice=t,this.platform=e,this.checktoken=i,this.transfer=u,this.filePath=a,this.loadingCtrl=o,this.camera=d,this.actionSheetCtrl=c,this.events=s,this.loading=r,this.AdviceProvider=m,this.file=p,this.imagePicker=f,this.navCtrl=h,this.navParams=v,this.formBuilder=g,this.adviceDetail={},this.baseurl=P.k,this.showloader=!1,this.comments=[],this.loadmoreText="Load more",this.limit=1,this.errFlag=!1,this.editFlag=!1,this.lastImage=null,console.log(this.navParams.data),this.advice_id=this.navParams.data.adviceId,console.log(this.advice_id);var b=localStorage.getItem("adviceId");console.log(b),void 0==this.advice_id&&(console.log("in"),this.advice_id=b),console.log(this.advice_id),this.userAuthData=JSON.parse(i.userAuthData),this.user_id=this.userAuthData.id,this.post=g.group({description:["",A.u.compose([A.u.required])]}),this.getadviceDetail(this.advice_id)}return l.prototype.ionViewDidLoad=function(){console.log("ionViewDidLoad AdvicedetailPage"),this.calltocomments(this.advice_id,this.limit)},l.prototype.getadviceDetail=function(l){var n=this,t=this.loading.create({content:"Loading.."});return t.present().then(function(){n.feedservice.getadviceDetails(l).then(function(l){n.adviceDetail={description:l.data.description,user_avatar:l.data.user_avatar,display_name:l.data.display_name,title:l.data.title,updated:l.data.updated,user_id:l.data.user_id,username:l.data.username,status:l.data.status},t.dismiss()})})},l.prototype.calltocomments=function(l,n){this.getComments(this.advice_id,this.limit).then(function(l){console.log(l),1==l&&setTimeout(function(){for(var l=document.getElementsByClassName("advice_img"),n=0;n<l.length;n++){console.log(l[n].children[0].getAttribute("src"));var t,e=P.k;console.log(l[n].children[0].getAttribute("src").includes(e)),t=l[n].children[0].getAttribute("src").includes(e)?l[n].children[0].getAttribute("src"):l[n].children[0].getAttribute("src").replace(/^/,e),l[n].children[0].setAttribute("src",t)}},200)})},l.prototype.backbutton=function(){this.navCtrl.pop()},l.prototype.editadvice=function(){var l={id:this.advice_id,adviceDetail:this.adviceDetail,type:"edit"};console.log(l),this.navCtrl.push("WritepostPage",l)},l.prototype.deladvice=function(){var l=this;this.AdviceProvider.deleteAdvice(this.advice_id).then(function(n){n.status&&l.navCtrl.setRoot(x.a)})},l.prototype.getComments=function(l,n){var t=this;return new Promise(function(e){t.AdviceProvider.getComments(l,n).then(function(l){if(console.log(l),1==l.status){if(1==n)t.comments=l.data,t.total_pages=l.total_pages;else{t.loadmoreText="Load more";for(var i=0;i<l.data.length;i++)t.comments.push(l.data[i])}e(!0)}})})},l.prototype.loadMore=function(){this.limit<this.total_pages&&(this.limit++,this.loadmoreText="Loading...",this.getComments(this.advice_id,this.limit))},l.prototype.add_photo=function(){var l=this;this.actionSheetCtrl.create({buttons:[{text:"Choose From Gallery",handler:function(){console.log("Gallery clicked"),l.takePicture(l.camera.PictureSourceType.PHOTOLIBRARY)}},{text:"Take Picture",handler:function(){console.log("camera clicked"),l.takePicture(l.camera.PictureSourceType.CAMERA)}},{text:"Cancel",role:"cancel",handler:function(){console.log("Cancel clicked")}}]}).present()},l.prototype.takePicture=function(l){var n=this;this.camera.getPicture({quality:100,sourceType:l,saveToPhotoAlbum:!1,correctOrientation:!0}).then(function(t){if(n.platform.is("android")&&l===n.camera.PictureSourceType.PHOTOLIBRARY)n.filePath.resolveNativePath(t).then(function(l){var e=l.substr(0,l.lastIndexOf("/")+1),i=t.substring(t.lastIndexOf("/")+1,t.lastIndexOf("?"));n.copyFileToLocalDir(e,i,n.createFileName())});else{var e=t.substr(t.lastIndexOf("/")+1),i=t.substr(0,t.lastIndexOf("/")+1);n.copyFileToLocalDir(i,e,n.createFileName())}},function(l){console.log(l)})},l.prototype.createFileName=function(){return(new Date).getTime()+".jpg"},l.prototype.copyFileToLocalDir=function(l,n,t){var e=this;this.file.copyFile(l,n,cordova.file.dataDirectory,t).then(function(l){e.lastImage=t,e.uploadImage()},function(l){console.log(l)})},l.prototype.pathForImage=function(l){return null===l?"":cordova.file.dataDirectory+l},l.prototype.uploadImage=function(){var l=this,n=P.k+P.j+P.i+P._52;console.log(n);var t=this.pathForImage(this.lastImage),e=this.lastImage;this.checktoken.loadUserCredentials(),this.headers=new Headers,this.headers.append("Authorization","Bearer "+this.checktoken.authToken);var i={fileKey:"file",fileName:e,chunkedMode:!1,mimeType:"multipart/form-data",params:{file:e,user_id:this.user_id},headers:this.headers,httpMethod:"POST",trustAllHosts:!0},u=this.transfer.create();this.loading1=this.loadingCtrl.create({content:"Uploading..."}),this.loading1.present(),u.upload(t,n,i).then(function(n){if(console.log(n),200===n.responseCode){var t=JSON.parse(n.response);console.log(t),l.img=t.org_img_src;var e=document.createElement("a");e.className="advice_img",e.href="",e.dataset.src=l.baseurl+l.img,e.innerHTML+='<img data-id="'+t.img_id+'" src="'+l.baseurl+l.img+'" />',document.getElementById("contenteditable").appendChild(e)}l.loading1.dismissAll()},function(n){console.log(n),l.loading1.dismissAll()})},l.prototype.onSubmit=function(l){var n=this,t=document.querySelector("[contenteditable]").innerHTML;this.post.controls.description.setValue(t),console.log(this.post.controls.description.value),""==this.post.controls.description.value?this.errFlag=!0:(this.errFlag=!1,this.editFlag?(this.editFlag=!1,this.AdviceProvider.editComment(this.user_id,this.commentId,this.post.controls.description.value).then(function(l){console.log(l),-1!==n.commentEditIndex&&(n.comments[n.commentEditIndex]=l.data),document.getElementById("contenteditable").innerHTML=""})):this.AdviceProvider.addComment(this.advice_id,this.post.controls.description.value).then(function(l){console.log(l),1==l.status&&(n.getComments(n.advice_id,n.limit),document.getElementById("contenteditable").innerHTML="")}))},l.prototype.editcomment=function(l){this.commentEditIndex=this.comments.indexOf(l),console.log(this.commentEditIndex),this.editFlag=!0,this.commentId=l.id,document.getElementById("contenteditable").innerHTML=l.comment,document.getElementById("contenteditable").focus()},l.prototype.delcomment=function(l){var n=this,t=this.comments.indexOf(l);console.log(t),this.AdviceProvider.deleteComment(l.id).then(function(l){console.log(l),1==l.status&&-1!==t&&n.comments.splice(t,1)})},l.prototype.deleteConfirm=function(l){var n=this;console.log(l),this.alertCtrl.create({message:"Are you sure?",buttons:[{text:"Cancel",role:"cancel",handler:function(){}},{text:"Yes",handler:function(){console.log("Buy clicked"),"post"==l?n.deladvice():n.delcomment(l)}}]}).present()},l}();Object(C.__decorate)([Object(k.ViewChild)(I.e),Object(C.__metadata)("design:type","function"==typeof(e=void 0!==I.e&&I.e)&&e||Object)],q.prototype,"content",void 0),q=Object(C.__decorate)([Object(k.Component)({selector:"page-advicedetail",templateUrl:"advicedetail.html"}),Object(C.__metadata)("design:paramtypes",["function"==typeof(i=void 0!==k.NgZone&&k.NgZone)&&i||Object,"function"==typeof(u=void 0!==I.b&&I.b)&&u||Object,"function"==typeof(a=void 0!==O.a&&O.a)&&a||Object,"function"==typeof(o=void 0!==I.s&&I.s)&&o||Object,"function"==typeof(d=void 0!==j.a&&j.a)&&d||Object,"function"==typeof(c=void 0!==F.a&&F.a)&&c||Object,"function"==typeof(s=void 0!==L.a&&L.a)&&s||Object,"function"==typeof(r=void 0!==I.m&&I.m)&&r||Object,"function"==typeof(m=void 0!==E.a&&E.a)&&m||Object,"function"==typeof(p=void 0!==I.a&&I.a)&&p||Object,"function"==typeof(f=void 0!==I.f&&I.f)&&f||Object,"function"==typeof(h=void 0!==I.m&&I.m)&&h||Object,"function"==typeof(v=void 0!==T.a&&T.a)&&v||Object,"function"==typeof(g=void 0!==w.a&&w.a)&&g||Object,"function"==typeof(b=void 0!==D.a&&D.a)&&b||Object,"function"==typeof(_=void 0!==I.q&&I.q)&&_||Object,"function"==typeof(y=void 0!==I.r&&I.r)&&y||Object,"function"==typeof(R=void 0!==A.g&&A.g)&&R||Object])],q);var S=function(){return function(){}}();S=Object(C.__decorate)([Object(k.NgModule)({declarations:[q],imports:[I.l.forChild(q)],providers:[O.a]})],S);var N=t(392),M=t(393),B=t(394),H=t(395),V=t(396),$=t(397),U=t(398),Z=t(399),J=t(400),Y=t(37),z=t(3),G=t(68),K=t(20),W=t(19),Q=t(45),X=t(52),ll=t(172),nl=t(14),tl=t(44),el=t(6),il=t(60),ul=t(31),al=t(8),ol=t(23),dl=t(90),cl=t(61),sl=t(38),rl=t(69),ml=t(67),pl=t(27),fl=t(5),hl=t(9),vl=t(29),gl=t(81),bl=t(232),_l=t(53),yl=t(10),Rl=t(30),kl=t(22),Cl=t(82),Il=t(49),Ol=t(65),Pl=t(173),Tl=t(16),xl=k["ɵcrt"]({encapsulation:2,styles:[],data:{}});function jl(l){return k["ɵvid"](0,[(l()(),k["ɵeld"](0,0,null,null,10,"p",[["class","dispib color_seagreen"]],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["\n\t\t\t    \t"])),(l()(),k["ɵeld"](2,0,null,null,1,"span",[["class","advide_edit"]],null,[[null,"click"]],function(l,n,t){var e=!0;"click"===n&&(e=!1!==l.component.editadvice()&&e);return e},null,null)),(l()(),k["ɵted"](-1,null,["Edit"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t    \t"])),(l()(),k["ɵeld"](5,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["|"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t    \t"])),(l()(),k["ɵeld"](8,0,null,null,1,"span",[["class","advide_del"]],null,[[null,"click"]],function(l,n,t){var e=!0;"click"===n&&(e=!1!==l.component.deleteConfirm("post")&&e);return e},null,null)),(l()(),k["ɵted"](-1,null,["Delete"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t    "]))],null,null)}function Al(l){return k["ɵvid"](0,[(l()(),k["ɵeld"](0,0,null,null,1,"p",[["class","errortxt errmsg"]],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["*Please provide a description for your post"]))],null,null)}function El(l){return k["ɵvid"](0,[(l()(),k["ɵeld"](0,0,null,null,1,"ion-icon",[["name","image"],["role","img"]],[[2,"hide",null]],null,null,null,null)),k["ɵdid"](1,147456,null,0,Y.a,[z.a,k.ElementRef,k.Renderer],{name:[0,"name"]},null)],function(l,n){l(n,1,0,"image")},function(l,n){l(n,0,0,k["ɵnov"](n,1)._hidden)})}function Dl(l){return k["ɵvid"](0,[(l()(),k["ɵeld"](0,0,null,null,10,"p",[["class","dispib color_seagreen"]],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t    \t"])),(l()(),k["ɵeld"](2,0,null,null,1,"span",[["class","advide_edit"]],null,[[null,"click"]],function(l,n,t){var e=!0;"click"===n&&(e=!1!==l.component.editcomment(l.parent.context.$implicit)&&e);return e},null,null)),(l()(),k["ɵted"](-1,null,["Edit"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t    \t"])),(l()(),k["ɵeld"](5,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["|"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t    \t"])),(l()(),k["ɵeld"](8,0,null,null,1,"span",[["class","advide_del"]],null,[[null,"click"]],function(l,n,t){var e=!0;"click"===n&&(e=!1!==l.component.deleteConfirm(l.parent.context.$implicit)&&e);return e},null,null)),(l()(),k["ɵted"](-1,null,["Delete"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t    "]))],null,null)}function wl(l){return k["ɵvid"](0,[(l()(),k["ɵeld"](0,0,null,null,23,"ion-item",[["class","avatarPositioning item item-block"]],[[8,"id",0]],null,null,G.b,G.a)),k["ɵdid"](1,1097728,null,3,K.a,[W.a,z.a,k.ElementRef,k.Renderer,[2,Q.a]],null,null),k["ɵqud"](335544320,8,{contentLabel:0}),k["ɵqud"](603979776,9,{_buttons:1}),k["ɵqud"](603979776,10,{_icons:1}),k["ɵdid"](5,16384,null,0,X.a,[],null,null),(l()(),k["ɵted"](-1,2,["\n\t\t            "])),(l()(),k["ɵeld"](7,0,null,0,4,"ion-avatar",[["class","user_avatar"],["item-start",""]],null,null,null,null,null)),k["ɵdid"](8,16384,null,0,ll.a,[],null,null),(l()(),k["ɵted"](-1,null,["\n\t\t                "])),(l()(),k["ɵeld"](10,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),k["ɵted"](-1,null,["\n\t\t            "])),(l()(),k["ɵted"](-1,2,["\n\t\t            "])),(l()(),k["ɵeld"](13,0,null,2,1,"h2",[],null,null,null,null,null)),(l()(),k["ɵted"](14,null,["",""])),(l()(),k["ɵted"](-1,2,["\n\t\t            "])),(l()(),k["ɵeld"](16,0,null,2,0,"p",[["class","inspirtion-details-cmt-box whiteSpaceNormal"]],[[8,"innerHTML",1]],null,null,null,null)),(l()(),k["ɵted"](-1,2,["\n\t\t            "])),(l()(),k["ɵeld"](18,0,null,2,1,"p",[["class","inspirtion-details-cmt-date"]],null,null,null,null,null)),(l()(),k["ɵted"](19,null,["",""])),(l()(),k["ɵted"](-1,2,["\n\t\t            "])),(l()(),k["ɵand"](16777216,null,2,1,null,Dl)),k["ɵdid"](22,16384,null,0,nl.i,[k.ViewContainerRef,k.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),k["ɵted"](-1,2,["\n\t\t        "]))],function(l,n){l(n,22,0,n.context.$implicit.user_id==n.component.user_id)},function(l,n){var t=n.component;l(n,0,0,k["ɵinlineInterpolate"](1,"",n.context.$implicit.id,"")),l(n,10,0,k["ɵinlineInterpolate"](2,"",t.baseurl,"",n.context.$implicit.user_avatar,"")),l(n,14,0,n.context.$implicit.display_name),l(n,16,0,n.context.$implicit.comment),l(n,19,0,n.context.$implicit.updated)})}function Fl(l){return k["ɵvid"](0,[(l()(),k["ɵeld"](0,0,null,null,6,"ion-item",[["class","item item-block"],["no-lines",""],["style","text-align: center;"]],null,[[null,"click"]],function(l,n,t){var e=!0;"click"===n&&(e=!1!==l.component.loadMore()&&e);return e},G.b,G.a)),k["ɵdid"](1,1097728,null,3,K.a,[W.a,z.a,k.ElementRef,k.Renderer,[2,Q.a]],null,null),k["ɵqud"](335544320,11,{contentLabel:0}),k["ɵqud"](603979776,12,{_buttons:1}),k["ɵqud"](603979776,13,{_icons:1}),k["ɵdid"](5,16384,null,0,X.a,[],null,null),(l()(),k["ɵted"](6,2,["",""]))],null,function(l,n){l(n,6,0,n.component.loadmoreText)})}function Ll(l){return k["ɵvid"](0,[(l()(),k["ɵeld"](0,0,null,null,7,"div",[["class","comments style"]],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t"])),(l()(),k["ɵand"](16777216,null,null,1,null,wl)),k["ɵdid"](3,802816,null,0,nl.h,[k.ViewContainerRef,k.TemplateRef,k.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),k["ɵted"](-1,null,["\n\t\t        "])),(l()(),k["ɵand"](16777216,null,null,1,null,Fl)),k["ɵdid"](6,16384,null,0,nl.i,[k.ViewContainerRef,k.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),k["ɵted"](-1,null,["\n\t\t\t"]))],function(l,n){var t=n.component;l(n,3,0,t.comments),l(n,6,0,t.limit<t.total_pages)},null)}function ql(l){return k["ɵvid"](0,[k["ɵqud"](402653184,1,{content:0}),(l()(),k["ɵeld"](1,0,null,null,19,"ion-header",[],null,null,null,null,null)),k["ɵdid"](2,16384,null,0,tl.a,[z.a,k.ElementRef,k.Renderer,[2,el.a]],null,null),(l()(),k["ɵted"](-1,null,["\n\t"])),(l()(),k["ɵeld"](4,0,null,null,5,"ion-navbar",[["class","toolbar"]],[[8,"hidden",0],[2,"statusbar-padding",null]],null,null,il.b,il.a)),k["ɵdid"](5,49152,null,0,ul.a,[al.a,[2,el.a],[2,ol.a],z.a,k.ElementRef,k.Renderer],null,null),(l()(),k["ɵted"](-1,3,["\n    \t"])),(l()(),k["ɵeld"](7,0,null,3,1,"ion-title",[],null,null,null,dl.b,dl.a)),k["ɵdid"](8,49152,null,0,cl.a,[z.a,k.ElementRef,k.Renderer,[2,sl.a],[2,ul.a]],null,null),(l()(),k["ɵted"](-1,3,["\n  \t"])),(l()(),k["ɵted"](-1,null,["\n  \t"])),(l()(),k["ɵeld"](11,0,null,null,8,"ion-toolbar",[["class","sub-header toolbar"]],[[2,"statusbar-padding",null]],null,null,rl.b,rl.a)),k["ɵdid"](12,49152,null,0,sl.a,[z.a,k.ElementRef,k.Renderer],null,null),(l()(),k["ɵted"](-1,3,["\n        "])),(l()(),k["ɵeld"](14,0,null,3,4,"a",[["class","backicon"]],null,[[null,"click"]],function(l,n,t){var e=!0;"click"===n&&(e=!1!==l.component.backbutton()&&e);return e},null,null)),(l()(),k["ɵeld"](15,0,null,null,3,"ion-icon",[["ios","ios-arrow-back"],["name","arrow-back"],["role","img"]],[[2,"hide",null]],null,null,null,null)),k["ɵdid"](16,147456,null,0,Y.a,[z.a,k.ElementRef,k.Renderer],{name:[0,"name"],ios:[1,"ios"]},null),(l()(),k["ɵeld"](17,0,null,null,1,"span",[["class","back-text"]],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["Back"])),(l()(),k["ɵted"](-1,3,["\n    "])),(l()(),k["ɵted"](-1,null,["\n"])),(l()(),k["ɵted"](-1,null,["\n"])),(l()(),k["ɵeld"](22,0,null,null,96,"ion-content",[["style","background: #eeeeee;"]],[[2,"statusbar-padding",null],[2,"has-refresher",null]],null,null,ml.b,ml.a)),k["ɵdid"](23,4374528,[[1,4]],0,pl.a,[z.a,fl.a,hl.a,k.ElementRef,k.Renderer,al.a,vl.a,k.NgZone,[2,el.a],[2,ol.a]],null,null),(l()(),k["ɵted"](-1,1,["\n\t"])),(l()(),k["ɵeld"](25,0,null,1,41,"div",[["class","detail_section"]],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["\n\t\t"])),(l()(),k["ɵeld"](27,0,null,null,38,"ion-card",[["class","detail_card"]],null,null,null,null,null)),k["ɵdid"](28,16384,null,0,gl.a,[z.a,k.ElementRef,k.Renderer],null,null),(l()(),k["ɵted"](-1,null,["\n\t\t\t"])),(l()(),k["ɵeld"](30,0,null,null,5,"ion-card-header",[["class","nowhitespace"]],null,null,null,null,null)),k["ɵdid"](31,16384,null,0,bl.a,[z.a,k.ElementRef,k.Renderer],null,null),(l()(),k["ɵted"](-1,null,["\n\t\t    \t"])),(l()(),k["ɵeld"](33,0,null,null,1,"h1",[["class","colorblack advice_title"]],null,null,null,null,null)),(l()(),k["ɵted"](34,null,["",""])),(l()(),k["ɵted"](-1,null,["\n\t\t  \t"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t"])),(l()(),k["ɵeld"](37,0,null,null,25,"ion-item",[["class","avatarPositioning item item-block"]],null,null,null,G.b,G.a)),k["ɵdid"](38,1097728,null,3,K.a,[W.a,z.a,k.ElementRef,k.Renderer,[2,Q.a]],null,null),k["ɵqud"](335544320,2,{contentLabel:0}),k["ɵqud"](603979776,3,{_buttons:1}),k["ɵqud"](603979776,4,{_icons:1}),k["ɵdid"](42,16384,null,0,X.a,[],null,null),(l()(),k["ɵted"](-1,2,["\n\t\t\t    "])),(l()(),k["ɵeld"](44,0,null,0,4,"ion-avatar",[["item-start",""]],null,null,null,null,null)),k["ɵdid"](45,16384,null,0,ll.a,[],null,null),(l()(),k["ɵted"](-1,null,["\n\t\t\t      "])),(l()(),k["ɵeld"](47,0,null,null,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),k["ɵted"](-1,null,["\n\t\t\t    "])),(l()(),k["ɵted"](-1,2,["\n\t\t\t    "])),(l()(),k["ɵeld"](50,0,null,2,1,"h2",[],null,null,null,null,null)),(l()(),k["ɵted"](51,null,["",""])),(l()(),k["ɵted"](-1,2,["\n\t\t\t    "])),(l()(),k["ɵeld"](53,0,null,2,5,"div",[],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["\n\t\t\t    \t"])),(l()(),k["ɵeld"](55,0,null,null,1,"p",[["class","dispib"]],null,null,null,null,null)),(l()(),k["ɵted"](56,null,[""," | "])),(l()(),k["ɵted"](-1,null,["\n\t\t\t    \t"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t    "])),(l()(),k["ɵted"](-1,2,["\n\t\t\t    "])),(l()(),k["ɵand"](16777216,null,2,1,null,jl)),k["ɵdid"](61,16384,null,0,nl.i,[k.ViewContainerRef,k.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),k["ɵted"](-1,2,["\n\t\t\t"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t"])),(l()(),k["ɵeld"](64,0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null)),(l()(),k["ɵted"](-1,null,["\n\t\t"])),(l()(),k["ɵted"](-1,null,["\n\t"])),(l()(),k["ɵted"](-1,1,["\n\t"])),(l()(),k["ɵeld"](68,0,null,1,49,"div",[["class","comment_section"],["style","background: white;"]],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["\n\t\t"])),(l()(),k["ɵted"](-1,null,["\n\t\t"])),(l()(),k["ɵeld"](71,0,null,null,45,"div",[],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["\n\t\t\t"])),(l()(),k["ɵeld"](73,0,null,null,39,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngSubmit"],[null,"submit"],[null,"reset"]],function(l,n,t){var e=!0,i=l.component;"submit"===n&&(e=!1!==k["ɵnov"](l,75).onSubmit(t)&&e);"reset"===n&&(e=!1!==k["ɵnov"](l,75).onReset()&&e);"ngSubmit"===n&&(e=!1!==i.onSubmit(i.post)&&e);return e},null,null)),k["ɵdid"](74,16384,null,0,A.w,[],null,null),k["ɵdid"](75,540672,null,0,A.j,[[8,null],[8,null]],{form:[0,"form"]},{ngSubmit:"ngSubmit"}),k["ɵprd"](2048,null,A.c,null,[A.j]),k["ɵdid"](77,16384,null,0,A.q,[A.c],null,null),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t"])),(l()(),k["ɵeld"](79,0,null,null,15,"ion-list",[["class","form-requirment"]],null,null,null,null,null)),k["ɵdid"](80,16384,null,0,_l.a,[z.a,k.ElementRef,k.Renderer,fl.a,yl.l,hl.a],null,null),(l()(),k["ɵted"](-1,null,["\n\t\t\t        "])),(l()(),k["ɵeld"](82,0,null,null,11,"ion-item",[["class","item item-block"]],null,null,null,G.b,G.a)),k["ɵdid"](83,1097728,null,3,K.a,[W.a,z.a,k.ElementRef,k.Renderer,[2,Q.a]],null,null),k["ɵqud"](335544320,5,{contentLabel:0}),k["ɵqud"](603979776,6,{_buttons:1}),k["ɵqud"](603979776,7,{_icons:1}),k["ɵdid"](87,16384,null,0,X.a,[],null,null),(l()(),k["ɵted"](-1,2,["\n\t\t\t        \t"])),(l()(),k["ɵeld"](89,0,null,2,1,"div",[["class","form_label"]],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["Add your comment here"])),(l()(),k["ɵted"](-1,2,["\n\t\t\t        \t"])),(l()(),k["ɵeld"](92,0,null,2,0,"div",[["class","question-description mar-tb-10"],["contenteditable","true"],["id","contenteditable"]],null,null,null,null,null)),(l()(),k["ɵted"](-1,2,["\n\t\t\t        "])),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t"])),(l()(),k["ɵand"](16777216,null,null,1,null,Al)),k["ɵdid"](97,16384,null,0,nl.i,[k.ViewContainerRef,k.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t"])),(l()(),k["ɵeld"](99,0,null,null,12,"div",[["class","buttons_outer"]],null,null,null,null,null)),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t\t"])),(l()(),k["ɵeld"](101,0,null,null,5,"div",[["class","add_photo"]],null,[[null,"click"]],function(l,n,t){var e=!0;"click"===n&&(e=!1!==l.component.add_photo()&&e);return e},null,null)),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t\t\t"])),(l()(),k["ɵand"](16777216,null,null,1,null,El)),k["ɵdid"](104,16384,null,0,nl.i,[k.ViewContainerRef,k.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t\t\t"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t\t  \tAdd photo\n\t\t\t\t\t"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t\t"])),(l()(),k["ɵeld"](108,0,null,null,2,"button",[["block",""],["class","postbtn"],["ion-button",""],["round",""],["type","submit"]],null,null,null,Rl.b,Rl.a)),k["ɵdid"](109,1097728,null,0,kl.a,[[8,""],z.a,k.ElementRef,k.Renderer],{round:[0,"round"],block:[1,"block"]},null),(l()(),k["ɵted"](-1,0,["Post"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t\t"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t"])),(l()(),k["ɵted"](-1,null,["\n\t\t\t"])),(l()(),k["ɵand"](16777216,null,null,1,null,Ll)),k["ɵdid"](115,16384,null,0,nl.i,[k.ViewContainerRef,k.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),k["ɵted"](-1,null,["\n\t\t"])),(l()(),k["ɵted"](-1,null,["\n\t"])),(l()(),k["ɵted"](-1,1,["\n"])),(l()(),k["ɵted"](-1,null,["\n"]))],function(l,n){var t=n.component;l(n,16,0,"arrow-back","ios-arrow-back"),l(n,61,0,t.adviceDetail.user_id==t.user_id),l(n,75,0,t.post),l(n,97,0,t.errFlag),l(n,104,0,!t.showloader);l(n,109,0,"",""),l(n,115,0,t.total_pages>0)},function(l,n){var t=n.component;l(n,4,0,k["ɵnov"](n,5)._hidden,k["ɵnov"](n,5)._sbPadding),l(n,11,0,k["ɵnov"](n,12)._sbPadding),l(n,15,0,k["ɵnov"](n,16)._hidden),l(n,22,0,k["ɵnov"](n,23).statusbarPadding,k["ɵnov"](n,23)._hasRefresher),l(n,34,0,t.adviceDetail.title),l(n,47,0,k["ɵinlineInterpolate"](2,"",t.baseurl,"",t.adviceDetail.user_avatar,"")),l(n,51,0,t.adviceDetail.display_name),l(n,56,0,t.adviceDetail.updated),l(n,64,0,t.adviceDetail.description),l(n,73,0,k["ɵnov"](n,77).ngClassUntouched,k["ɵnov"](n,77).ngClassTouched,k["ɵnov"](n,77).ngClassPristine,k["ɵnov"](n,77).ngClassDirty,k["ɵnov"](n,77).ngClassValid,k["ɵnov"](n,77).ngClassInvalid,k["ɵnov"](n,77).ngClassPending)})}var Sl=k["ɵccf"]("page-advicedetail",q,function(l){return k["ɵvid"](0,[(l()(),k["ɵeld"](0,0,null,null,1,"page-advicedetail",[],null,null,null,ql,xl)),k["ɵdid"](1,49152,null,0,q,[k.NgZone,Cl.a,O.a,fl.a,j.a,F.a,L.a,Il.a,E.a,Ol.a,Pl.a,Il.a,T.a,w.a,D.a,ol.a,Tl.a,A.g],null,null)],null,null)},{},{},[]),Nl=t(34),Ml=t(103),Bl=t(224),Hl=t(89);t.d(n,"AdvicedetailPageModuleNgFactory",function(){return Vl});var Vl=k["ɵcmf"](S,[],function(l){return k["ɵmod"]([k["ɵmpd"](512,k.ComponentFactoryResolver,k["ɵCodegenComponentFactoryResolver"],[[8,[N.a,M.a,B.a,H.a,V.a,$.a,U.a,Z.a,J.a,Sl]],[3,k.ComponentFactoryResolver],k.NgModuleRef]),k["ɵmpd"](4608,nl.k,nl.j,[k.LOCALE_ID]),k["ɵmpd"](4608,A.x,A.x,[]),k["ɵmpd"](4608,A.g,A.g,[]),k["ɵmpd"](4608,O.a,O.a,[Nl.Http,j.a,Ml.a]),k["ɵmpd"](512,nl.b,nl.b,[]),k["ɵmpd"](512,A.v,A.v,[]),k["ɵmpd"](512,A.l,A.l,[]),k["ɵmpd"](512,A.s,A.s,[]),k["ɵmpd"](512,Bl.a,Bl.a,[]),k["ɵmpd"](512,Bl.b,Bl.b,[]),k["ɵmpd"](512,S,S,[]),k["ɵmpd"](256,Hl.a,q,[])])})}});