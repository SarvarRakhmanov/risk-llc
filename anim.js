(function(){
if(window.lucide)lucide.createIcons();
var RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var d=document;
// stamps on approved documents
d.querySelectorAll('.doc,.gal figure,.tcard').forEach(function(el,i){var s=d.createElement('span');s.className='stamp';s.textContent='APPROVED \u2705';el.appendChild(s);});
if(RM||!('IntersectionObserver' in window)){d.querySelectorAll('.stamp').forEach(function(s){s.classList.add('on')});return;}
var sel='main section,.sec,.fcard,.doc,.step,.tcard,.badge,.claim,.vcard,.gal figure,.ccard,.faq,.article';
var els=d.querySelectorAll(sel);els.forEach(function(e){e.classList.add('rv')});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
els.forEach(function(e){io.observe(e)});
// count-up for true numeric badges
d.querySelectorAll('.badge b').forEach(function(b){var m=b.textContent.match(/^(\d+)(\s.*)$/);if(!m)return;var n=+m[1],rest=m[2];
 var o=new IntersectionObserver(function(es){if(!es[0].isIntersecting)return;o.disconnect();var t0=performance.now();
  (function f(t){var p=Math.min(1,(t-t0)/1200);b.textContent=Math.round(n*(1-Math.pow(1-p,3)))+rest;if(p<1)requestAnimationFrame(f)})(t0)});o.observe(b)});
// confetti + staggered stamps on success gallery / homepage teaser
var path=location.pathname,ok=/success\.html$|\/$|index\.html$|\/(ru|uz)\/?$/.test(path),fired=false;
var groups=d.querySelectorAll('.gal,.docs,.tgrid');
var go=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;go.unobserve(e.target);
 e.target.querySelectorAll('.stamp').forEach(function(s,i){setTimeout(function(){s.classList.add('on')},150*i)});
 if(ok&&!fired&&window.confetti){fired=true;var r=e.target.getBoundingClientRect();confetti({particleCount:110,spread:75,startVelocity:38,origin:{x:.5,y:Math.min(.9,Math.max(.1,(r.top+80)/innerHeight))},colors:['#f5b301','#ff7a00','#0a1f44','#25d366'],disableForReducedMotion:true});}
})},{threshold:.25});
groups.forEach(function(g){go.observe(g)});
})();
(function(){
var d=document,RM=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
var imgs=[].slice.call(d.querySelectorAll('.doc img,.gal figure img,.tcard img'));if(!imgs.length)return;
var lb=d.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');
lb.innerHTML='<button class="lbx" aria-label="Close">\u00d7</button><button class="lbp" aria-label="Previous">\u2039</button><figure><img alt=""><figcaption></figcaption></figure><button class="lbn" aria-label="Next">\u203a</button>';
d.body.appendChild(lb);var big=lb.querySelector('img'),cap=lb.querySelector('figcaption'),cur=-1,busy=false;
function capOf(im){var c=im.closest('figure,.tcard');var f=c&&c.querySelector('figcaption');if(f)return f.innerHTML;var t=c&&c.querySelector('div');return t?t.innerHTML:im.alt;}
function flip(from,inv){var r=from.getBoundingClientRect(),b=big.getBoundingClientRect();if(!b.width)return'';
 return 'translate('+((r.left+r.width/2)-(b.left+b.width/2))+'px,'+((r.top+r.height/2)-(b.top+b.height/2))+'px) scale('+Math.max(r.width/b.width,.05)+')';}
function show(i,anim){cur=(i+imgs.length)%imgs.length;var im=imgs[cur];big.src=im.currentSrc||im.src;big.alt=im.alt;cap.innerHTML=capOf(im);
 if(anim&&!RM){big.style.transition='none';big.style.opacity='0';var go=function(){big.style.transform=flip(im);big.getBoundingClientRect();big.style.transition='transform .38s cubic-bezier(.2,.8,.2,1),opacity .3s';big.style.transform='none';big.style.opacity='1';};
  if(big.complete&&big.naturalWidth)requestAnimationFrame(go);else big.onload=function(){big.onload=null;go()};}
 else{big.style.transform='none';big.style.opacity='1';}}
function open(i){lb.classList.add('on');d.body.style.overflow='hidden';show(i,true);}
function close(){if(!lb.classList.contains('on')||busy)return;var im=imgs[cur];
 if(RM){lb.classList.remove('on');d.body.style.overflow='';return;}
 busy=true;big.style.transform=flip(im);big.style.opacity='0';lb.classList.add('out');
 setTimeout(function(){lb.classList.remove('on','out');big.style.transform='none';d.body.style.overflow='';busy=false;},360);}
imgs.forEach(function(im,i){im.style.cursor='zoom-in';var a=im.closest('a');(a||im).addEventListener('click',function(e){e.preventDefault();open(i)});});
lb.addEventListener('click',function(e){var t=e.target;if(t.classList.contains('lbp')){show(cur-1,false);}else if(t.classList.contains('lbn')){show(cur+1,false);}else close();});
d.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1,false);if(e.key==='ArrowRight')show(cur+1,false);});
var x0=null;lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>50){show(cur+(dx<0?1:-1),false);}});
lb.addEventListener('touchend',function(e){},{passive:true});
if(location.hash==='#lb-test')setTimeout(function(){(imgs[0].closest('a')||imgs[0]).click()},600);
})();
