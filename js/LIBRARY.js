function readSize(){var e=0,t=0;"number"==typeof window.innerWidth?(e=window.innerWidth,t=window.innerHeight):document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)?(e=document.documentElement.clientWidth,t=document.documentElement.clientHeight):document.body&&(document.body.clientWidth||document.body.clientHeight)&&(e=document.body.clientWidth,t=document.body.clientHeight),DIMS.width=e,DIMS.height=t}function easing(e,t,n,i,s,o){if(e==t)return 0;s=isNaN(s)?1:s;var r=(t-e)/n;return o&&(r=t>e?Math.ceil(r):Math.floor(r)),Math.abs(r)<s?Math.abs(e-t)>s?t>e?s:-s:t-e:t>e?Math.min(r,i):Math.max(r,-i)}function addEvent(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n)}function removeEvent(e,t,n){e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n)}function ADD_EVENT_DISPACTHER(e){Object.extend(e,Event_Dispatcher)}function ADD_EVENT_DISPATCHER(e){Object.extend(e,Event_Dispatcher)}function RESIZE_DIMS(e,t,n,i,s,o,r){var a=e,d=t,c=n,h=i,p=d,v=a;"VIEW_ALL"==s&&(p=h,v=a*h/d,v>c&&(p=d*c/a,v=c)),"FILL_ALL"==s&&(p=h,v=a*h/d,c>v&&(p=d*c/a,v=c)),0==r&&(v>a||p>d)&&(p=d,v=a),v=Math.round(v),p=Math.round(p);var E=-Math.round((v-c)/2),u=-Math.round((p-h)/2),l=o||"C";return"T"==l.slice(0,1)&&(u=0),"B"==l.slice(0,1)&&(u=h-p),("L"==l.slice(0,1)||"L"==l.slice(1,2))&&(E=0),("R"==l.slice(0,1)||"R"==l.slice(1,2))&&(E=c-v),{width:v,height:p,x:E,y:u}}Object.extend=function(e,t){for(var n in t)e[n]=t[n];return e},Event={},Event.CANCEL="cancel",Event.OPEN="open",Event.CLOSE="close",Event.COMPLETE="onComplete",Event.CHANGE="onChange",Event.MOVE="MOVE",Event.START="START",Event.STOP="STOP",Event.RESIZE="resize",Event.SELECT="select",Event.RENDER="render",Event.REFRESH="refresh",Event.STATE_CHANGE="stateChange",Event.SOUND_COMPLETE="soundComplete",Event.FOCUS_OUT="focusOut",Event.FOCUS_IN="focusIn",Event.REMOVE="remove";var DIMS={},Event_Dispatcher={};Event_Dispatcher.addEventListener=function(e,t,n){if(this.events||(this.events={}),this.events[e]||(this.events[e]=new Array),this.events[e].push({listener:t,scope:n}),this.events["promise."+e]){var i=this.events["promise."+e];"function"==(typeof t).toString()?(n.eventRecieverFunction=t,n.eventRecieverFunction({currentTarget:this,type:e,data:i})):n[t]({currentTarget:this,type:e,data:i})}},Event_Dispatcher.dispatchEvent=function(e,t,n){if(this.events||(this.events={}),n&&(this.events["promise."+e]=t),this.events[e])for(var i=this.events[e],s=0;s<i.length;s++){var o=i[s].listener,r=i[s].scope;"function"==(typeof o).toString()?(r.eventRecieverFunction=o,r.eventRecieverFunction({currentTarget:this,type:e,data:t})):r[o]({currentTarget:this,type:e,data:t})}},Event_Dispatcher.removeEventListener=function(e,t,n){if(!this.events)return!1;if(!this.events[e])return!1;for(var i=this.events[e],s=0;s<i.length;s++)t==i[s].listener&&n==i[s].scope&&i.splice(s,1)},Event_Dispatcher._addEventListener=Event_Dispatcher.addEventListener,Event_Dispatcher._dispatchEvent=Event_Dispatcher.dispatchEvent,Event_Dispatcher._removeEventListener=Event_Dispatcher.removeEventListener,Event.PROGRESS="progress",Event.UPLOAD="upload",ImageUploader=function(e){this.fileInput=document.createElement("input"),this.fileInput.setAttribute("type","file"),this.fileInput.setAttribute("onchange","this.dragUploader.processFiles(this.files)"),this.fileInput.dragUploader=this,document.body.appendChild(this.fileInput),this.fileInput.style.position="fixed",this.fileInput.style.top="-300px",this.upload=e&&e.upload,ADD_EVENT_DISPACTHER(this)},ImageUploader.prototype.browse=function(e){console.log(e),this.fileInput.click(e)},ImageUploader.prototype.imageReady=function(e){this.data=e,this.dispatchEvent(Event.COMPLETE),this.fileInput.setAttribute("onchange",""),this.fileInput.dragUploader=null,document.body.removeChild(this.fileInput),this.fileInput=document.createElement("input"),this.fileInput.setAttribute("type","file"),this.fileInput.setAttribute("onchange","this.dragUploader.processFiles(this.files)"),this.fileInput.dragUploader=this,document.body.appendChild(this.fileInput),this.fileInput.style.position="fixed",this.fileInput.style.top="-300px"},ImageUploader.prototype.onProgress=function(e){this.progress=e.loaded/e.total,this.dispatchEvent(Event.PROGRESS)},ImageUploader.prototype.startUpload=function(e){if(this.upload){var t=this,n=new FormData;n.append("file",e);var i=new XMLHttpRequest;i.onreadystatechange=function(){if(4==i.readyState&&200==i.status)try{var e=JSON.parse(this.responseText);t.dispatchEvent(Event.UPLOAD,e)}catch(n){t.dispatchEvent(Event.UPLOAD)}},i.upload.addEventListener("progress",function(e){t.onProgress(e)},!1),i.open("POST",this.upload),i.send(n)}},ImageUploader.prototype.processFiles=function(e){var t=e[0];if(t){var n=t.name,i=n.split(/\./).pop().toLowerCase();if(("png"==i||"jpg"==i||"gif"==i||"jpeg"==i)&&"undefined"!=typeof FileReader){var s=this,o=new FileReader;o.onload=function(e){s.startUpload(t),s.imageReady(e.target.result)},o.readAsDataURL(t)}}};
function TimeLine(t,i){this.duration=t,this.direction=1,this.position=0,this.status="STOP",this.startTime=0,this.interval=i,this.intervalObj,this.data={},this.events={},ADD_EVENT_DISPACTHER(this);var e=this;this.REQ_ANIMATION=function(){e.update()}}TimeLine.prototype.play=function(){if(1==this.direction&&this.position==this.duration||-1==this.direction&&0==this.position);else{if(this.startTime=(new Date).getTime()-this.position,"PLAY"!=this.status){var t=this,i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame;if(i)i(this.REQ_ANIMATION);else{var t=this;this.intervalObj=setInterval(function(){t.update()},this.interval)}}this.status="PLAY"}},TimeLine.prototype.pause=function(){this.status="PAUSE",clearInterval(this.intervalObj)},TimeLine.prototype.stop=function(){this.status="STOP",clearInterval(this.intervalObj)},TimeLine.prototype.position=function(t){this.position=t,this.startTime=(new Date).getTime()-this.position},TimeLine.prototype.update=function(){if(Date.now||(Date.now=function(){return(new Date).getTime()}),"PLAY"!=this.status)return!1;var t=Date.now();if(1==this.direction){if(this.position=t-this.startTime,this.position=Math.min(this.duration,this.position),this.position==this.duration)this.status="STOP",clearInterval(this.intervalObj),this.dispatchEvent(Event.COMPLETE),this.onComplete&&this.onComplete();else if("PLAY"==this.status){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame;i&&i(this.REQ_ANIMATION)}}else if(this.position=Math.max(2*this.position-(t-this.startTime),0),this.startTime=t-this.position,0==this.position)this.status="STOP",clearInterval(this.intervalObj),this.dispatchEvent(Event.COMPLETE),this.onComplete&&this.onComplete();else if("PLAY"==this.status){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame;i&&i(this.REQ_ANIMATION)}this.dispatchEvent(Event.CHANGE)},TimeLine.prototype.getTime=function(t,i,e){var n=Math.min(Math.max(this.position-t,0),i);return null!=e?e(n,0,1,i):this.easeInOut(n,0,1,i)},TimeLine.prototype.easeInOut=function(t,i,e,n){return-e/2*(Math.cos(Math.PI*t/n)-1)+i},TimeLine.prototype.easeInOutPos=function(t,i,e,n){return Math.acos(-(t-i)*(2/e)+1)*n/Math.PI};var Scroll={};Scroll.end,Scroll.timeLine=new TimeLine(500,33),Scroll.timeLine.addEventListener(Event.CHANGE,"refresh",Scroll),Scroll.go=function(t,i){Scroll.start=i||document.body.scrollTop||document.documentElement.scrollTop,Scroll.end=t,Scroll.timeLine.duration=Math.min(Math.max(200,1.5*Math.abs(Scroll.end-Scroll.start)),1500),Scroll.timeLine.position=0,Scroll.timeLine.play()},Scroll.refresh=function(){var t=Scroll.start+(Scroll.end-Scroll.start)*Scroll.timeLine.getTime(0,Scroll.timeLine.duration);document.body.scrollTop=t,document.documentElement.scrollTop=t};
function JSON_Loader(){this.request,this.url,this.isReady=!1,ADD_EVENT_DISPACTHER(this)}JSON_Loader.prototype.load=function(e,t,s,r){this.url=e,this.data=null,this.isReady=!1;var i=this;for(var n in s)this.url=this.url.replace("{"+n+"}",s[n]);if(this.request&&this.request.abort(),window.XMLHttpRequest)this.request=new XMLHttpRequest,this.request.overrideMimeType&&this.request.overrideMimeType("text/xml");else if(window.ActiveXObject)try{this.request=new ActiveXObject("Msxml2.XMLHTTP")}catch(a){try{this.request=new ActiveXObject("Microsoft.XMLHTTP")}catch(a){}}return this.request?(this.request.onreadystatechange=function(e){var t=e.target,s=t.readyState;try{if(4==s&&(200==t.status||"file:"===window.location.protocol&&0==t.status))try{var r=unescape(escape(this.responseText).replace(/%0A/gim,"").replace(/%0D/gim,""));i.data=JSON.parse(r),i.isReady=!0,i.dispatchEvent(Event.COMPLETE)}catch(n){console.log("error:"+i.url+","+n),console.log("string:"+r),i.dispatchEvent(Event.CANCEL)}}catch(n){console.log("error-->"+n)}},void(t?(this.request.open("POST",this.url,!0),r&&this.request.setRequestHeader("Content-Type",r),this.request.setRequestHeader("Content-type","application/x-www-form-urlencoded"),this.request.send(t)):(this.request.open("GET",this.url,!0),r&&this.request.setRequestHeader("Content-Type",r),this.request.send(null)))):(alert("Giving up :( Cannot create an XMLHTTP instance"),!1)};
function addEventSimple(t,e,i){t.addEventListener?t.addEventListener(e,i,!1):t.attachEvent&&t.attachEvent("on"+e,i)}function removeEventSimple(t,e,i){t.removeEventListener?t.removeEventListener(e,i,!1):t.detachEvent&&t.detachEvent("on"+e,i)}function getDrag(){return new DragTouch}var el=document.createElement("div");el.setAttribute("ontouchstart","return;");var IS_TOUCH_DEVICE="function"==typeof el.ontouchstart;DragTouch=function(){this.startX=0,this.endY=0,ADD_EVENT_DISPACTHER(this);var t=this;this.moveFN=function(e){t.move(e),e.preventDefault()},this.downFN=function(e){t.end(e),e.preventDefault()}},DragTouch.prototype.start=function(t){return this.startTime=(new Date).getTime(),this.startX=t.touches?t.touches[0].clientX:t.clientX,this.startY=t.touches?t.touches[0].clientY:t.clientY,this.moveX=0,this.moveY=0,this.dispatchEvent(Event.START),this.HTML_DIV=null,t.preventDefault(),"touchstart"==t.type?(addEventSimple(document,"touchmove",this.moveFN),addEventSimple(document,"touchend",this.downFN)):"mousedown"==t.type&&(addEventSimple(document,"mousemove",this.moveFN),addEventSimple(document,"mouseup",this.downFN)),!1},DragTouch.prototype.startDrag=function(t,e,i){this.start(t),i=i||{},e&&(this.HTML_DIV=e,this.divX_Start=this.HTML_DIV.offsetLeft,this.divY_Start=this.HTML_DIV.offsetTop),this.leftLimit=i.left!=i.undefined?i.left:null,this.topLimit=i.top!=i.undefined?i.top:null,this.rightLimit=i.right!=i.undefined?i.right:null,this.bottomLimit=i.bottom!=i.undefined?i.bottom:null,this.moveFree=null==this.leftLimit&&null==this.topLimit&&null==this.rightLimit&&null==this.bottomLimit},DragTouch.prototype.move=function(t){if(this.time=(new Date).getTime()-this.startTime,this.endX=t.touches?t.touches[0].clientX:t.clientX,this.endY=t.touches?t.touches[0].clientY:t.clientY,this.moveX=this.endX-this.startX,this.moveY=this.endY-this.startY,this.HTML_DIV){var e=this.divX_Start+this.moveX,i=this.divY_Start+this.moveY;1!=this.moveFree?(null!=this.rightLimit&&null!=this.leftLimit&&(e=Math.min(e,this.rightLimit),e=Math.max(e,this.leftLimit),this.HTML_DIV.style.left=e+"px"),null!=this.bottomLimit&&null!=this.topLimit&&(i=Math.min(i,this.bottomLimit),i=Math.max(i,this.topLimit),this.HTML_DIV.style.top=i+"px")):(this.HTML_DIV.style.left=e+"px",this.HTML_DIV.style.top=i+"px")}this.dispatchEvent(Event.MOVE,{clientX:this.endX,clientY:this.endY})},DragTouch.prototype.end=function(t){this.time=(new Date).getTime()-this.startTime,"touchend"==t.type?(removeEventSimple(document,"touchmove",this.moveFN),removeEventSimple(document,"touchend",this.downFN)):"mouseup"==t.type&&(removeEventSimple(document,"mousemove",this.moveFN),removeEventSimple(document,"mouseup",this.downFN));var e=t.touches?t.touches.length>0?t.touches[0].clientX:this.endX:t.clientX,i=t.touches?t.touches.length>0?t.touches[0].clientY:this.endY:t.clientY;t={clientX:e,clientY:i},this.dispatchEvent(Event.STOP,t),document.getElementsByTagName("body")[0].style.userSelect="",document.getElementsByTagName("body")[0].style.webkitUserSelect="",document.getElementsByTagName("body")[0].style.MozUserSelect="",document.getElementsByTagName("body")[0].setAttribute("unselectable","off")};