!function(){var e=window.navigator.userAgent.toLowerCase();(e.indexOf("msie")>=0||e.indexOf("trident")>=0)&&(alert("Sorry, Internet Explorer is not supported."),window.history.back());var t=document.querySelector(".page-wrapper"),n=document.querySelector("#start"),r=document.querySelector("#previous"),o=document.querySelector("#next"),i=Array.from(document.querySelectorAll(".page")),a=document.querySelector(".page-wrapper"),c=i.length-1,l=0,d=function(e){a.style.scrollBehavior=e?"smooth":"auto"},s=function(e){var n=i[e];t.scrollLeft=n.offsetLeft,n.dataset.loaded||(n.dataset.loaded=!0,function(e){Array.from(i[e].querySelectorAll("img.lazy")).filter((function(e){return e.dataset.src})).forEach((function(e){e.src=e.dataset.src,e.classList.remove("lazy")}))}(e)),function(e){0===e?(window.history.pushState("",document.title,window.location.href.replace(window.location.hash,"")),r.style.opacity=0,o.style.opacity=0):(window.location.hash="#".concat(e),r.style.opacity=1,o.style.opacity=e===c?0:1),gtag("config","UA-140031790-2",{page_path:0===e?"/":"/#".concat(e)})}(e)},u=function(e){d(!1),s(e),d(!0)},w=function(){l>0&&s(l-=1)},f=function(){l<c&&s(l+=1)};if(n.addEventListener("click",f),r.addEventListener("click",w),o.addEventListener("click",f),window.addEventListener("keydown",(function(e){switch(e.key){case"ArrowLeft":w();break;case"ArrowRight":f()}})),window.addEventListener("resize",(function(){return u(l)})),window.location.hash){var h=Number(window.location.hash.substr(1));h>=0&&h<i.length?u(l=h):s(0)}else s(0);var y=2*Math.PI,g=document.querySelector("#particles"),m=g.getContext("2d"),p=window.innerWidth,v=window.innerHeight,x=null,S=null,A=null,L=function(e){return Math.random()*e},q=function(e,t){return L(t-e)+e},k=function(){var e=p*v/1e4,t=p,n=v,r=p,o=v/2,i=function(){var e=L(t),r=L(n),o=L(1.5),i=Math.floor(q(128,256)),a=Math.floor(q(128,256));return{x:e,y:r,size:o,color:"rgba(".concat(a,",255,255,").concat(i,")")}},a=function(){var e,t;return Math.random()<r/(r+o)?(e=L(r),t=0):(e=p,t=L(o)),{x:e,y:t,speed:q(64,128)}};return S=Array.from({length:e},i),A=a(),{createMeteor:a,createStar:i,draw:function(){m.clearRect(0,0,p,v);for(var e=0,t=S.length;e<t;e+=1){var n=S[e];m.beginPath(),m.fillStyle=n.color,m.arc(n.x,n.y,n.size,0,y),m.fill(),n.x+=.01}var r=.78*A.speed,o=.61*A.speed;m.beginPath(),m.strokeStyle="rgba(255,255,255,128)",m.moveTo(A.x,A.y),m.lineTo(A.x+r,A.y-o),m.stroke(),A.x-=r/8,A.y+=o/8,(A.x<=-128||A.y>=v+128)&&(A=x.createMeteor())}}};g.width=p,g.height=v,x=k(),window.addEventListener("resize",(function(){p=window.innerWidth,v=window.innerHeight,x=k(),g.width=p,g.height=v}));var b=function(){x.draw(),window.requestAnimationFrame(b)};window.requestAnimationFrame(b)}();