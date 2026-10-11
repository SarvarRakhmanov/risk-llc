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
d.querySelectorAll('.badge b').forEach(function(b){var m=b.textContent.match(/^(\d+)(.*)$/);if(!m)return;var n=+m[1],rest=m[2];
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
