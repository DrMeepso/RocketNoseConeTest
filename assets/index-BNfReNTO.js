var b=Object.defineProperty;var E=(n,r,e)=>r in n?b(n,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[r]=e;var p=(n,r,e)=>E(n,typeof r!="symbol"?r+"":r,e);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=e(t);fetch(t.href,i)}})();class d{constructor(r,e,o,t=!1){p(this,"name");p(this,"description1");p(this,"description2");p(this,"clippable");this.name=r,this.description1=e,this.description2=o,this.clippable=t}usesParameter(){return!1}defaultParameter(){return 0}maxParameter(){return 1}}const a=n=>n*n,k=n=>n*n*n,u=n=>n>=0?Math.sqrt(n):0;class v extends d{constructor(){super("Conical","A conical nose cone has a profile of a triangle.","A conical transition has straight sides.")}getRadius(r,e,o,t){return e*r/o}}class A extends d{constructor(){super("Ogive","An ogive nose cone has a profile that is a segment of a circle...","An ogive transition has a profile that is a segment of a circle...")}usesParameter(){return!0}defaultParameter(){return 1}getRadius(r,e,o,t){if(o<e&&(r=r*e/o,o=e),t<1e-9)return new v().getRadius(r,e,o,t);const i=u((a(o)+a(e))*(a((2-t)*o)+a(t*e))/(4*a(t*e))),l=o/t,S=u(a(i)-a(l));return u(a(i)-a(l-r))-S}}class L extends d{constructor(){super("Ellipsoid","An ellipsoidal nose cone has a profile of a half-ellipse...","An ellipsoidal transition has a profile of a half-ellipse...",!0)}getRadius(r,e,o,t){return r=r*e/o,u(2*e*r-a(r))}}class R extends d{constructor(){super("Power series","A power series nose cone description...","A power series transition description...",!0)}usesParameter(){return!0}defaultParameter(){return .5}getRadius(r,e,o,t){return t<=1e-5?r<=1e-5?0:e:e*Math.pow(r/o,t)}}class I extends d{constructor(){super("Parabolic series","A parabolic series nose cone description...","A parabolic series transition description...")}usesParameter(){return!0}defaultParameter(){return 1}getRadius(r,e,o,t){return e*((2*r/o-t*a(r/o))/(2-t))}}class O extends d{constructor(){super("Haack series","A Haack series nose cone description...","A Haack series transition description...",!0)}usesParameter(){return!0}maxParameter(){return 1/3}getRadius(r,e,o,t){const i=Math.acos(1-2*r/o);return t===0?e*u((i-Math.sin(2*i)/2)/Math.PI):e*u((i-Math.sin(2*i)/2+t*k(Math.sin(i)))/Math.PI)}}const g={Conical:new v,Ogive:new A,Ellipsoid:new L,Power:new R,Parabolic:new I,Haack:new O},c=document.getElementById("canvas"),s=c.getContext("2d");c.width=500;c.height=500;const P=document.getElementById("dropdown"),h=document.getElementById("nosePram"),w=document.getElementById("noseLength"),y=document.getElementById("noseRadius");for(let n=0;n<Object.values(g).length;n++){let r=Object.keys(g)[n],e=document.createElement("option");e.value=r,e.text=r,P.appendChild(e)}let m=Object.values(g)[1];P.addEventListener("change",function(){m=g[P.value],h.max=m.maxParameter().toString(),h.value=m.defaultParameter().toString(),f()});h.addEventListener("input",function(){console.log(h.value),f()});w.addEventListener("input",function(){f()});y.addEventListener("input",function(){f()});function f(){s.fillStyle="white",s.clearRect(0,0,c.width,c.height),s.fillRect(0,0,c.width,c.height),s.save(),s.translate(c.width/2,c.height/2);let n=m,r=parseFloat(h.value),e=parseInt(w.value),o=parseInt(y.value);s.strokeStyle="black",s.beginPath();for(let t=0;t<=e;t+=1){let i=n.getRadius(t,o,e,r);s.lineTo(t-e/2,-i)}s.stroke(),s.strokeStyle="blue",s.beginPath();for(let t=0;t<=e;t+=1){let i=n.getRadius(t,o,e,r);s.lineTo(t-e/2,i)}s.stroke(),s.strokeStyle="black",s.beginPath(),s.moveTo(e/2,o),s.lineTo(e/2,-o),s.stroke(),s.strokeStyle="red",s.setLineDash([5,5]),s.beginPath(),s.moveTo(e/2,0),s.lineTo(-e/2,0),s.stroke(),s.strokeStyle="green",s.setLineDash([5,5]),s.beginPath(),s.moveTo(-e/2,0),s.lineTo(-e/2,-o),s.stroke(),s.restore()}f();
