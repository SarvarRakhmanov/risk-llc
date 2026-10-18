(function(){var p=new URLSearchParams(location.search),m=document.getElementById('msg'),c=document.getElementById('code');
if(p.get('error')){m.textContent='Sign-in failed: '+(p.get('error_description')||p.get('error'));return;}
var code=p.get('code');if(!code){m.textContent='No authorization code in this URL.';return;}
m.textContent='Signed in. If your publisher did not capture this automatically, copy the full URL of this page into it.';c.textContent='state='+(p.get('state')||'');})();
