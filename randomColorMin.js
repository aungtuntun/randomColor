function randomColor(e){function c(){var t,n=0,r=360,i=[n,r];if(e.hue){t=a.parseHue(e.hue);if(typeof t==="object"){i=t}else if(!t){i=[n,r]}else{i=[t,t]}if(e.hue.contrasts){i=a.shiftHue(i,a.randomBetween(r/2-30,r/2+30),"integer")}if(e.hue.complements){i=a.shiftHue(i,a.randomBetween(r/6-30,r/6+30),"integer")}return a.randomBetween(i,"integer")}if(randomColor.previousHue){do{t=a.randomBetween(i,"integer")}while(Math.abs(t-randomColor.previousHue)<a.distinctHue);return t}return a.randomBetween(i,"integer")}function h(t){function l(e){n=a.randomBetween(u.sMin,i,"integer");r=a.randomBetween(u.vMin,s,"integer");if(e){console.log("Constraints: s("+u.sMin+", "+i+"), v("+u.vMin+", "+s+")");console.log("Generated: s("+n+"), v("+r+")")}}function c(){return r<f*n+b}var n,r,i,s;var o=a.lookupColorName(t),u=a.colorDictionary[o];if(e.luminosity){if(e.luminosity==="dark"){s=u.vMin/2+50;i=u.sMin/2+50}if(e.luminosity==="dull"){s=100;i=u.sMin/2+50}}else{s=100;i=100}var f=(100-u.sMin)/(u.vMin-100);b=u.vMin-f*100;do{l()}while(c());if(e.hue==="monochrome"){n=0}return[n,r]}var t,n,r,i,s,o,u,e=e||{},a=loadUtilities();if(e.count){var f=[],l=e.count;e.count=false;while(f.length<l){f.push(randomColor(e))}return f}t=c();i=h(t);n=i[0];r=i[1];s=a.hsvRGB(t,n,r);o=a.rgbHex(s);randomColor.previousHue=t;switch(e.format){case"rgb":return"rgb("+s[0]+", "+s[1]+", "+s[2]+")";case"rgbArray":return s;case"hsv":return"hsv("+t+", "+n+", "+r+")";case"hsvArray":return[t,n,r];default:return o}}function loadUtilities(){return{goldenRatio:.61803398874989,distinctHue:40,colorDictionary:{red:{hueRange:[-26,18],sMin:47,vMin:70},orange:{hueRange:[18,46],sMin:40,vMin:83},yellow:{hueRange:[46,66],sMin:35,vMin:90},green:{hueRange:[66,168],sMin:65,vMin:65},blue:{hueRange:[168,258],sMin:48,vMin:45},purple:{hueRange:[258,282],sMin:38,vMin:55},pink:{hueRange:[282,334],sMin:40,vMin:90},monochrome:{hueRange:[0,0],sMin:0,vMin:0}},parseHue:function(e){function c(e){if(e<360&&e>0){return e}else{return false}}var t,n,r,i,s,o,u,a;if(typeof e==="object"){if(e.contrasts){return this.parseHue(e.contrasts)}if(e.complements){return this.parseHue(e.complements)}if(e.length===3){return this.rgbHSV(e[0],e[1],e[2])[0]}return false}if(typeof e==="number"){return c(e)}if(typeof e==="string"){if(this.colorDictionary[e]){var f=this.colorDictionary[e];return f.hueRange}if(e==="previous"){return randomColor.previousHue}if(e.charAt(0)==="#"&e.length<8){var t=this.hexRGB(e);return Math.round((this.rgbHSV(t[0],t[1],t[2])[0]-.5)*360)}if(e.slice(0,4)==="rgb("){var t=e.slice(4,-1).split(",");for(var l in t){t[l]=parseInt(t[l])}return Math.round((this.rgbHSV(t[0],t[1],t[2])[0]-.5)*360)}if(typeof parseInt(e)==="number"){return c(parseInt(e))}return false}},lookupColorName:function(e){if(e>334&&e<360){e-=360}for(var t in this.colorDictionary){color=this.colorDictionary[t];if(e>=color.hueRange[0]&&e<=color.hueRange[1]){return t}}return"Color not found"},randomBetween:function(e,t,n){if(typeof e==="object"){var n=t,t=e[1],e=e[0]}var r=e+Math.random()*(t-e);if(n){return~~r}return r},randomPick:function(e){return e[Math.floor(Math.random()*e.length)]},shiftHue:function(e,t){t=Math.floor(t);console.log("shifting b y "+t);if(typeof e==="object"){for(var n in e){e[n]=(e[n]+t)%360}}else if(typeof e==="number"){e=(e+t)%360}return e},rgbHex:function(e){function t(e){var t=e.toString(16);return t.length==1?"0"+t:t}return"#"+t(e[0])+t(e[1])+t(e[2])},hexRGB:function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)]:null},rgbHSV:function(e,t,n){e/=255;t/=255;n/=255;var r=Math.min.apply(Math,[e,t,n]),i=Math.max.apply(Math,[e,t,n]);var s,o,u=r;var a=r-i;o=r===0?0:a/r;if(r==i){s=0}else{switch(r){case e:s=(t-n)/a+(t<n?6:0);break;case t:s=(n-e)/a+2;break;case n:s=(e-t)/a+4;break}s/=6}return[s,o,u]},hsvRGB:function(e,t,n){var e=e/360,t=t/100,n=n/100;var r=Math.floor(e*6),i=e*6-r,s=n*(1-t),o=n*(1-i*t),u=n*(1-(1-i)*t),a=255,f=255,l=255;switch(r){case 0:a=n,f=u,l=s;break;case 1:a=o,f=n,l=s;break;case 2:a=s,f=n,l=u;break;case 3:a=s,f=o,l=n;break;case 4:a=u,f=s,l=n;break;case 5:a=n,f=s,l=o;break}return[Math.floor(a*256),Math.floor(f*256),Math.floor(l*256)]}}}