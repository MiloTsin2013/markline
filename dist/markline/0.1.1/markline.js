define("markline/0.1.1/markline",["jquery/2.1.1/jquery"],function(t,e,a){function n(t,e){this.element=t,this._datafile=e}function s(t){return t?new Date(t.replace(/\-/g,"/").replace("T"," ")):new Date}function r(t){var e=s(t);return d.test(t)?e.setYear(e.getFullYear()+1):u.test(t)&&(11===e.getMonth()?(e.setYear(e.getFullYear()+1),e.setMonth(0)):e.setMonth(e.getMonth()+1)),e}function i(t){for(var e,a=t.split(/\r\n|\r|\n/),n={title:"",data:{}},i=/^#\s+(.*)$/,l=/^##+\s+(.*)$/,o=/^[\*\-]\s+(([0-9\/\-]+)(?:~([0-9\/\-]*))?)\s+(.*)$/,d=/^\s+[\*\-]\s+(([0-9\/\-]+)(?:~([0-9\/\-]*))?)\s+(.*)$/,u="",h=0,p=a.length;p>h;h++){var c,v=a[h];if(c=v.match(i))n.title=c[1];else if(c=v.match(l)){var f=c[1];u=f,n.data[u]=[]}else if(c=v.match(o)){n.data[u]||(n.data[u]=[]);var m=c[2],g=void 0===c[3]?m:c[3],y=c[4],_={date:c[1],"date-start":s(m),"date-end":r(g),name:y,events:[]};n.data[u].push(_),e=_}else if(c=v.match(d)){var j=c[1],b=c[2],q=void 0===c[3]?b:c[3],w=c[4];e.events.push({date:j,"date-start":s(b),"date-end":r(q),name:w})}}return n}var l=t("markline/0.1.1/timeline"),o=t("jquery/2.1.1/jquery"),d=/^\d{4}$/,u=/^\d{4}[\/\-]\d{1,2}$/;n.prototype.render=function(){var t=this;o.get(this._datafile,function(e){var a=i(e),n=new l(t.element,a.data);n.render()})},a.exports=n}),define("markline/0.1.1/timeline",["jquery/2.1.1/jquery"],function(t,e,a){function n(t,e){this._element=i(t),this._data=e}function s(t){return parseInt(t/864e5*d/365.24,10)}function r(t){return"[object Function]"===Object.prototype.toString.call(t)}var i=t("jquery/2.1.1/jquery"),l=30,o=20,d=100;n.prototype._process=function(t,e){if(e)for(var a in t)if(t.hasOwnProperty(a)){var n=t[a];r(e["group:start"])&&e["group:start"].call(this,a,n);for(var s=0,i=n.length;i>s;s++){var l=n[s];if(r(e["line:start"])&&e["line:start"].call(this,l),l.events)for(var o=0,d=l.events.length;d>o;o++)r(e.event)&&e.event.call(this,l.events[o]);r(e["line:stop"])&&e["line:stop"].call(this,l)}r(e["group:stop"])&&e["group:stop"].call(this,a,n)}},n.prototype.render=function(){var t,e;this._process(this._data,{"line:start":function(a){var n=a["date-start"],s=a["date-end"];(!t||t>n)&&(t=n),(!e||s>e)&&(e=s)}});var a=t.getFullYear(),n=e.getFullYear()+2;t=new Date(a,0,1);for(var r=['<div class="dates">',"<ol>"],d=a;n>=d;d++)r.push("<li><label>",d,"</label></li>");r.push("</ol>","</div>");var u=['<div class="events" id="events">'],h=0;this._process(this._data,{"group:start":function(t){u.push('<div class="groups">',"<label>",t,"</label>","<ol>")},"group:stop":function(){u.push("</ol>","</div>")},"line:start":function(e){var a=e["date-start"],n=e["date-end"],r=s(a-t)+l;h=a;var i=s(n-a);8>i&&(i=8),u.push('<li style="left:',r,'px;">','<ol style="width:',i,'px;">')},"line:stop":function(t){u.push("</ol>","<time>",t.date,"</time>","<label>",t.name,"</label>","</li>")},event:function(t){var e=s(t["date-start"]-h),a=s(t["date-end"]-t["date-start"]);8>a&&(a=8),u.push('<li style="left:',e,"px;width:",a,'px" title="',t.date," ",t.name,'"></li>')}});this._element.addClass("markline"),this._element.on("scroll",function(){var t=i(this),e=i(".dates",this);e.css({top:t.scrollTop()});var a=i(".groups > label",this);a.css({left:t.scrollLeft()-90})}),this._element.append(r.join("")),this._element.append(u.join("")),i(".dates > ol > li",this._element).height(i(".events",this.element).height()+o)},a.exports=n});