/*
 * Turbolinks 5.0.0.beta2
 * Copyright © 2016 Basecamp, LLC
 *  */
(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(t,e){return Turbolinks.controller.visit(t,e)},clearCache:function(){return Turbolinks.controller.clearCache()}}}).call(this),function(){var t,e;Turbolinks.copyObject=function(t){var e,n,r;n={};for(e in t)r=t[e],n[e]=r;return n},Turbolinks.closest=function(e,n){return t.call(e,n)},t=function(){var t,n;return t=document.documentElement,null!=(n=t.closest)?n:function(t){var n;for(n=this;n;){if(n.nodeType===Node.ELEMENT_NODE&&e.call(n,t))return n;n=n.parentNode}}}(),Turbolinks.defer=function(t){return setTimeout(t,1)},Turbolinks.dispatch=function(t,e){var n,r,i,o,s;return o=null!=e?e:{},s=o.target,n=o.cancelable,r=o.data,i=document.createEvent("Events"),i.initEvent(t,!0,n===!0),i.data=null!=r?r:{},(null!=s?s:document).dispatchEvent(i),i},Turbolinks.match=function(t,n){return e.call(t,n)},e=function(){var t,e,n,r;return t=document.documentElement,null!=(e=null!=(n=null!=(r=t.matchesSelector)?r:t.webkitMatchesSelector)?n:t.msMatchesSelector)?e:t.mozMatchesSelector}(),Turbolinks.uuid=function(){var t,e,n;for(n="",t=e=1;36>=e;t=++e)n+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return n}}.call(this),function(){Turbolinks.Location=function(){function t(t){var e,n;null==t&&(t=""),n=document.createElement("a"),n.href=t.toString(),this.absoluteURL=n.href,e=n.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=n.hash.slice(1))}var e,n,r,i;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t;return null!=(t=this.getLastPathComponent().match(/\.[^.]*$/))?t[0]:void 0},t.prototype.isHTML=function(){var t;return t=this.getExtension(),".html"===t||null==t},t.prototype.isPrefixedBy=function(t){var e;return e=n(t),this.isEqualTo(t)||i(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},n=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return r(t,"/")?t:t+"/"},i=function(t,e){return t.slice(0,e.length)===e},r=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.HttpRequest=function(){function e(e,n,r){this.delegate=e,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=Turbolinks.Location.wrap(n).requestURL,this.referrer=Turbolinks.Location.wrap(r).absoluteURL,this.createXHR()}return e.NETWORK_FAILURE=0,e.TIMEOUT_FAILURE=-1,e.timeout=60,e.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},e.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},e.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},e.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},e.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},e.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},e.prototype.requestCanceled=function(){return this.endRequest()},e.prototype.notifyApplicationBeforeRequestStart=function(){return Turbolinks.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},e.prototype.notifyApplicationAfterRequestEnd=function(){return Turbolinks.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},e.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml, application/xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},e.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},e.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},e.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var n;return n=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+n+"ms ease-out, opacity "+n/2+"ms "+n/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*n)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,n)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.classList.add("turbolinks-progress-bar"),t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.BrowserAdapter=function(){function e(e){this.controller=e,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new Turbolinks.ProgressBar}var n,r,i,o;return o=Turbolinks.HttpRequest,n=o.NETWORK_FAILURE,i=o.TIMEOUT_FAILURE,r=500,e.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},e.prototype.visitStarted=function(t){return t.changeHistory(),t.issueRequest(),t.loadCachedSnapshot()},e.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},e.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},e.prototype.visitRequestCompleted=function(t){return t.loadResponse()},e.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},e.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},e.prototype.visitCompleted=function(t){return t.followRedirect()},e.prototype.pageInvalidated=function(){return this.reload()},e.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,r)},e.prototype.showProgressBar=function(){return this.progressBar.show()},e.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},e.prototype.reload=function(){return window.location.reload()},e}()}.call(this),function(){var t,e=function(t,e){return function(){return t.apply(e,arguments)}};t=!1,addEventListener("load",function(){return Turbolinks.defer(function(){return t=!0})},!1),Turbolinks.History=function(){function n(t){this.delegate=t,this.onPopState=e(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(t,e){return t=Turbolinks.Location.wrap(t),this.update("push",t,e)},n.prototype.replace=function(t,e){return t=Turbolinks.Location.wrap(t),this.update("replace",t,e)},n.prototype.onPopState=function(t){var e,n,r,i;return this.shouldHandlePopState()&&(i=null!=(n=t.state)?n.turbolinks:void 0)?(e=Turbolinks.Location.wrap(window.location),r=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(e,r)):void 0},n.prototype.shouldHandlePopState=function(){return t===!0},n.prototype.update=function(t,e,n){var r;return r={turbolinks:{restorationIdentifier:n}},history[t+"State"](r,null,e)},n}()}.call(this),function(){Turbolinks.ElementSet=function(){function t(t){var e;this.elements=function(){var n,r,i;for(i=[],n=0,r=t.length;r>n;n++)e=t[n],e.nodeType===Node.ELEMENT_NODE&&i.push({element:e,value:e.outerHTML});return i}()}return t.prototype.selectElementsMatchingSelector=function(t){var e,n,r;return n=function(){var n,i,o,s,a;for(o=this.elements,a=[],n=0,i=o.length;i>n;n++)s=o[n],e=s.element,r=s.value,Turbolinks.match(e,t)&&a.push(e);return a}.call(this),new this.constructor(n)},t.prototype.getElementsNotPresentInSet=function(t){var e,n,r,i;return r=t.getElementIndex(),n=function(){var t,n,o,s,a;for(o=this.elements,a=[],t=0,n=o.length;n>t;t++)s=o[t],e=s.element,i=s.value,i in r||a.push(e);return a}.call(this),new this.constructor(n)},t.prototype.getElements=function(){var t,e,n,r,i;for(r=this.elements,i=[],e=0,n=r.length;n>e;e++)t=r[e].element,i.push(t);return i},t.prototype.getValues=function(){var t,e,n,r,i;for(n=this.elements,r=[],t=0,e=n.length;e>t;t++)i=n[t].value,r.push(i);return r},t.prototype.isEqualTo=function(t){return this.toString()===(null!=t?t.toString():void 0)},t.prototype.toString=function(){return this.getValues().join("")},t.prototype.getElementIndex=function(){var t,e,n;return null!=this.elementIndex?this.elementIndex:this.elementIndex=function(){var r,i,o,s;for(e={},o=this.elements,r=0,i=o.length;i>r;r++)s=o[r],t=s.element,n=s.value,e[n]=t;return e}.call(this)},t}()}.call(this),function(){Turbolinks.Snapshot=function(){function t(t){var e,n;n=t.head,e=t.body,this.head=null!=n?n:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return t.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},t.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},t.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},t.prototype.hasAnchor=function(t){return null!=this.body.querySelector("#"+t)},t.prototype.hasSameTrackedHeadElementsAsSnapshot=function(t){return this.getTrackedHeadElementSet().isEqualTo(t.getTrackedHeadElementSet())},t.prototype.getInlineHeadElementsNotPresentInSnapshot=function(t){var e,n;return n=this.getInlineHeadStyleElementSet().getElementsNotPresentInSet(t.getInlineHeadStyleElementSet()),e=this.getInlineHeadScriptElementSet().getElementsNotPresentInSet(t.getInlineHeadScriptElementSet()),n.getElements().concat(e.getElements())},t.prototype.getTemporaryHeadElements=function(){return this.getTemporaryHeadElementSet().getElements()},t.prototype.getTrackedHeadElementSet=function(){return null!=this.trackedHeadElementSet?this.trackedHeadElementSet:this.trackedHeadElementSet=this.getPermanentHeadElementSet().selectElementsMatchingSelector("[data-turbolinks-track=reload]")},t.prototype.getInlineHeadStyleElementSet=function(){return null!=this.inlineHeadStyleElementSet?this.inlineHeadStyleElementSet:this.inlineHeadStyleElementSet=this.getPermanentHeadElementSet().selectElementsMatchingSelector("style")},t.prototype.getInlineHeadScriptElementSet=function(){return null!=this.inlineHeadScriptElementSet?this.inlineHeadScriptElementSet:this.inlineHeadScriptElementSet=this.getPermanentHeadElementSet().selectElementsMatchingSelector("script:not([src])")},t.prototype.getPermanentHeadElementSet=function(){return null!=this.permanentHeadElementSet?this.permanentHeadElementSet:this.permanentHeadElementSet=this.getHeadElementSet().selectElementsMatchingSelector("script, style, link[href], [data-turbolinks-track=reload]")},t.prototype.getTemporaryHeadElementSet=function(){return null!=this.temporaryHeadElementSet?this.temporaryHeadElementSet:this.temporaryHeadElementSet=this.getHeadElementSet().getElementsNotPresentInSet(this.getPermanentHeadElementSet())},t.prototype.getHeadElementSet=function(){return null!=this.headElementSet?this.headElementSet:this.headElementSet=new Turbolinks.ElementSet(this.head.childNodes)},t}()}.call(this),function(){Turbolinks.View=function(){function t(t){this.delegate=t,this.element=document.documentElement}var e,n,r,i,o;return t.prototype.getSnapshot=function(t){var e,n;return e=(null!=t?t:{clone:!0}).clone,n=e?this.element.cloneNode(!0):this.element,Turbolinks.Snapshot.fromElement(n)},t.prototype.render=function(t,e){var n,r,i;return i=t.snapshot,n=t.html,r=t.isPreview,this.markAsPreview(r),null!=i?this.renderSnapshot(Turbolinks.Snapshot.wrap(i),e):this.renderHTML(n,e)},t.prototype.markAsPreview=function(t){return t?this.element.dataset.turbolinksPreview="":delete this.element.dataset.turbolinksPreview},t.prototype.renderSnapshot=function(t,e){var n,i,s,a,l,u,c,h,p,d,f,y;if(n=this.getSnapshot({clone:!1}),!n.hasSameTrackedHeadElementsAsSnapshot(t))return this.delegate.viewInvalidated(),!1;for(d=t.getInlineHeadElementsNotPresentInSnapshot(n),s=0,u=d.length;u>s;s++)i=d[s],document.head.appendChild(i.cloneNode(!0));for(f=n.getTemporaryHeadElements(),a=0,c=f.length;c>a;a++)i=f[a],document.head.removeChild(i);for(y=t.getTemporaryHeadElements(),l=0,h=y.length;h>l;l++)i=y[l],document.head.appendChild(i.cloneNode(!0));return p=t.body.cloneNode(!0),this.delegate.viewWillRender(p),o(p),document.body=p,r(),"function"==typeof e&&e(),this.delegate.viewRendered()},t.prototype.renderHTML=function(t,n){return document.documentElement.innerHTML=t,e(),"function"==typeof n&&n(),this.delegate.viewRendered()},o=function(t){var e,n,r,o,s,a;for(s=i(document.body),a=[],e=0,n=s.length;n>e;e++)r=s[e],(o=t.querySelector("[id='"+r.id+"']"))?a.push(o.parentNode.replaceChild(r,o)):a.push(void 0);return a},i=function(t){return t.querySelectorAll("[id][data-turbolinks-permanent]")},e=function(){var t,e,r,i,o,s;for(o=document.querySelectorAll("script"),s=[],t=0,e=o.length;e>t;t++)i=o[t],r=n(i),s.push(i.parentNode.replaceChild(r,i));return s},n=function(t){var e;return e=document.createElement("script"),t.hasAttribute("src")?e.src=t.getAttribute("src"):e.textContent=t.textContent,e},r=function(){var t;return null!=(t=document.body.querySelector("[autofocus]"))?t.focus():void 0},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.ScrollManager=function(){function e(e){this.delegate=e,this.onScroll=t(this.onScroll,this)}return e.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},e.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},e.prototype.scrollToElement=function(t){return t.scrollIntoView()},e.prototype.scrollToPosition=function(t){var e,n;return e=t.x,n=t.y,window.scrollTo(e,n)},e.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},e.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},e}()}.call(this),function(){Turbolinks.Cache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var e;return t.prototype.has=function(t){var n;return n=e(t),n in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var n;return n=e(t),this.snapshots[n]},t.prototype.write=function(t,n){var r;return r=e(t),this.snapshots[r]=n},t.prototype.touch=function(t){var n,r;return r=e(t),n=this.keys.indexOf(r),n>-1&&this.keys.splice(n,1),this.keys.unshift(r),this.trim()},t.prototype.trim=function(){var t,e,n,r,i;for(r=this.keys.splice(this.size),i=[],t=0,n=r.length;n>t;t++)e=r[t],i.push(delete this.snapshots[e]);return i},e=function(t){return Turbolinks.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.Visit=function(){function e(e,n,r){this.controller=e,this.action=r,this.performScroll=t(this.performScroll,this),this.identifier=Turbolinks.uuid(),this.location=Turbolinks.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return e.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},e.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},e.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},e.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},e.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},e.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new Turbolinks.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},e.prototype.getCachedSnapshot=function(){var t;return t=this.controller.getCachedSnapshotForLocation(this.location),null==this.location.anchor||(null!=t?t.hasAnchor(this.location.anchor):void 0)?t:void 0},e.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},e.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var n;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(n=this.adapter).visitRendered&&n.visitRendered(this),t?void 0:this.complete()})):void 0},e.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({html:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},e.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},e.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},e.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},e.prototype.requestCompletedWithResponse=function(t,e){return this.response=t,null!=e&&(this.redirectedToLocation=Turbolinks.Location.wrap(e)),this.adapter.visitRequestCompleted(this)},e.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},e.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},e.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},e.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},e.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},e.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},e.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},e.prototype.getTimingMetrics=function(){return Turbolinks.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},e.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},e.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},e.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},e.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};Turbolinks.Controller=function(){function e(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new Turbolinks.History(this),this.view=new Turbolinks.View(this),this.scrollManager=new Turbolinks.ScrollManager(this),this.restorationData={},this.clearCache()}return e.prototype.start=function(){return this.started?void 0:(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0)},e.prototype.disable=function(){return this.enabled=!1},e.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},e.prototype.clearCache=function(){return this.cache=new Turbolinks.Cache(10)},e.prototype.visit=function(t,e){var n,r;return null==e&&(e={}),t=Turbolinks.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(n=null!=(r=e.action)?r:"advance",this.adapter.visitProposedToLocationWithAction(t,n)):window.location=t:void 0},e.prototype.startVisitToLocationWithAction=function(t,e,n){var r;return Turbolinks.supported?(r=this.getRestorationDataForIdentifier(n),this.startVisit(t,e,{restorationData:r})):window.location=t},e.prototype.startHistory=function(){return this.location=Turbolinks.Location.wrap(window.location),this.restorationIdentifier=Turbolinks.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.stopHistory=function(){return this.history.stop()},e.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=Turbolinks.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},e.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,e){return this.restorationIdentifier=e,this.location=Turbolinks.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},e.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,e){var n;return this.restorationIdentifier=e,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=Turbolinks.Location.wrap(t)):this.adapter.pageInvalidated()},e.prototype.getCachedSnapshotForLocation=function(t){return this.cache.get(t)},e.prototype.cacheSnapshot=function(){var t;return this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t)},e.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},e.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},e.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},e.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},e.prototype.render=function(t,e){return this.view.render(t,e)},e.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},e.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},e.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},e.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},e.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},e.prototype.clickBubbled=function(t){var e,n,r;return this.enabled&&this.clickEventIsSignificant(t)&&(n=this.getVisitableLinkForNode(t.target))&&(r=this.getVisitableLocationForLink(n))&&this.applicationAllowsFollowingLinkToLocation(n,r)?(t.preventDefault(),e=this.getActionForLink(n),this.visit(r,{action:e})):void 0},e.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var n;return n=this.notifyApplicationAfterClickingLinkToLocation(t,e),!n.defaultPrevented},e.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},e.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,e){return Turbolinks.dispatch("turbolinks:click",{target:t,data:{url:e.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationBeforeVisitingLocation=function(t){return Turbolinks.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},e.prototype.notifyApplicationAfterVisitingLocation=function(t){return Turbolinks.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},e.prototype.notifyApplicationBeforeCachingSnapshot=function(){return Turbolinks.dispatch("turbolinks:before-cache")},e.prototype.notifyApplicationBeforeRender=function(t){return Turbolinks.dispatch("turbolinks:before-render",{data:{newBody:t}})},e.prototype.notifyApplicationAfterRender=function(){return Turbolinks.dispatch("turbolinks:render")},e.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),Turbolinks.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},e.prototype.startVisit=function(t,e,n){var r;return null!=(r=this.currentVisit)&&r.cancel(),this.currentVisit=this.createVisit(t,e,n),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},e.prototype.createVisit=function(t,e,n){var r,i,o,s,a;return i=null!=n?n:{},s=i.restorationIdentifier,o=i.restorationData,r=i.historyChanged,a=new Turbolinks.Visit(this,t,e),a.restorationIdentifier=null!=s?s:Turbolinks.uuid(),a.restorationData=Turbolinks.copyObject(o),a.historyChanged=r,a.referrer=this.location,a},e.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},e.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},e.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?Turbolinks.closest(t,"a[href]:not([target])"):void 0},e.prototype.getVisitableLocationForLink=function(t){var e;return e=new Turbolinks.Location(t.href),this.locationIsVisitable(e)?e:void 0},e.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},e.prototype.nodeIsVisitable=function(t){var e;return(e=Turbolinks.closest(t,"[data-turbolinks]"))?"false"!==e.getAttribute("data-turbolinks"):!0},e.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.getRootLocation())&&t.isHTML()},e.prototype.getRootLocation=function(){var t,e;return e=null!=(t=this.getSetting("root"))?t:"/",new Turbolinks.Location(e)},e.prototype.getSetting=function(t){var e,n;return n=document.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=n[n.length-1],null!=e?e.getAttribute("content"):void 0},e.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},e.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},e}(),function(){var t;return Turbolinks.controller=t=new Turbolinks.Controller,t.adapter=new Turbolinks.BrowserAdapter(t),t.start()}()}.call(this);
