const PASSWORD_HASH="1f45c06afa9727d7a5f8950b6f59c220126ddb383e1d2e0cd27ee1627cb875b6"; // placeholder hash; change with the instructions below
let DATA=null, tokenMemory="";
const $=id=>document.getElementById(id);
async function sha(s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
$('loginBtn').onclick=async()=>{const h=await sha($('password').value);if(h===PASSWORD_HASH){sessionStorage.admin='1';openPanel()}else alert('Wrong password')}
if(sessionStorage.admin==='1')openPanel();
async function openPanel(){ $('login').classList.add('hidden');$('panel').classList.remove('hidden');try{const r=await fetch('content.json?'+Date.now());DATA=await r.json()}catch(e){DATA={}};fill()}
function val(id,v){$(id).value=v??''}
function fill(){
val('brand',DATA.brand);val('heroEyebrow',DATA.hero?.eyebrow);val('heroTitle',DATA.hero?.title);val('heroText',DATA.hero?.text);val('heroImage',DATA.hero?.heroImage);val('heroPrimary',DATA.hero?.primaryCta);val('heroSecondary',DATA.hero?.secondaryCta);
val('whatsapp',DATA.contact?.whatsapp);val('phone',DATA.contact?.phone);val('messenger',DATA.contact?.messenger);val('meeting',DATA.contact?.meeting);val('email',DATA.contact?.email);
val('gtmId',DATA.tracking?.gtmId);val('ga4Id',DATA.tracking?.ga4MeasurementId);val('metaId',DATA.tracking?.metaPixelId);val('clarityId',DATA.tracking?.clarityProjectId);
val('skills',(DATA.skills||[]).join('\n'));val('tools',(DATA.tools||[]).join('\n'));renderServices();renderPortfolio();renderPackages();renderFAQ();
}
function renderServices(){ $('services').innerHTML=(DATA.services||[]).map((x,i)=>`<div class="repeat"><div class="row"><label>Title<input data-s="${i}" data-k="0" value="${esc(x[0])}"></label><label>Category<input data-s="${i}" data-k="2" value="${esc(x[2])}"></label></div><label>Description<textarea data-s="${i}" data-k="1">${esc(x[1])}</textarea></label></div>`).join('')}
function renderPackages(){ $('packages').innerHTML=(DATA.packages||[]).map((x,i)=>`<div class="repeat"><label>Title<input data-p="${i}" data-k="0" value="${esc(x[0])}"></label><label>Description<textarea data-p="${i}" data-k="1">${esc(x[1])}</textarea></label></div>`).join('')}
function renderFAQ(){ $('faq').innerHTML=(DATA.faq||[]).map((x,i)=>`<div class="repeat"><label>Question<input data-f="${i}" data-k="0" value="${esc(x[0])}"></label><label>Answer<textarea data-f="${i}" data-k="1">${esc(x[1])}</textarea></label></div>`).join('')}
function renderPortfolio(){ $('portfolioList').innerHTML=(DATA.portfolio||[]).map((x,i)=>`<div class="repeat"><div class="row"><label>Title<input data-pf="${i}" data-k="title" value="${esc(x.title)}"></label><label>Type<select data-pf="${i}" data-k="type"><option ${x.type==='Image'?'selected':''}>Image</option><option ${x.type==='Video'?'selected':''}>Video</option></select></label></div><label>Media path / URL<input data-pf="${i}" data-k="media" value="${esc(x.media)}"></label><label>Thumbnail path / URL<input data-pf="${i}" data-k="image" value="${esc(x.image||'')}"></label><label>Description<textarea data-pf="${i}" data-k="description">${esc(x.description)}</textarea></label><label>Tags, comma separated<input data-pf="${i}" data-k="tags" value="${esc((x.tags||[]).join(', '))}"></label><button class="remove" onclick="removePortfolio(${i})">Remove</button></div>`).join('')}
function esc(x){return String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function collect(){
DATA.brand=$('brand').value;DATA.hero={...DATA.hero,eyebrow:$('heroEyebrow').value,title:$('heroTitle').value,text:$('heroText').value,heroImage:$('heroImage').value,primaryCta:$('heroPrimary').value,secondaryCta:$('heroSecondary').value};
DATA.contact={whatsapp:$('whatsapp').value,phone:$('phone').value,messenger:$('messenger').value,meeting:$('meeting').value,email:$('email').value};
DATA.tracking={gtmId:$('gtmId').value,ga4MeasurementId:$('ga4Id').value,metaPixelId:$('metaId').value,clarityProjectId:$('clarityId').value};
DATA.skills=$('skills').value.split('\n').map(x=>x.trim()).filter(Boolean);DATA.tools=$('tools').value.split('\n').map(x=>x.trim()).filter(Boolean);
document.querySelectorAll('[data-s]').forEach(e=>DATA.services[+e.dataset.s][+e.dataset.k]=e.value);
document.querySelectorAll('[data-p]').forEach(e=>DATA.packages[+e.dataset.p][+e.dataset.k]=e.value);
document.querySelectorAll('[data-f]').forEach(e=>DATA.faq[+e.dataset.f][+e.dataset.k]=e.value);
document.querySelectorAll('[data-pf]').forEach(e=>{let o=DATA.portfolio[+e.dataset.pf];let k=e.dataset.k;if(k==='tags')o.tags=e.value.split(',').map(x=>x.trim()).filter(Boolean);else o[k]=e.value});
return DATA;
}
$('saveLocal').onclick=()=>{collect();localStorage.nexuraContent=JSON.stringify(DATA);alert('Saved in this browser. Download content.json to publish it publicly.')}
$('download').onclick=()=>{collect();const b=new Blob([JSON.stringify(DATA,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='content.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
$('addPortfolio').onclick=()=>{collect();DATA.portfolio.push({title:'New Project',type:'Image',media:'assets/replace-me.jpg',image:'assets/replace-me.jpg',description:'Replace this demo.',tags:['Demo']});renderPortfolio()}
function removePortfolio(i){collect();DATA.portfolio.splice(i,1);renderPortfolio()}
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.add('hidden'));$(b.dataset.tab).classList.remove('hidden')})
$('github').onclick=()=>{document.querySelector('[data-tab="githubTab"]').click()}
$('publishNow').onclick=async()=>{collect();tokenMemory=$('ghToken').value.trim();if(!tokenMemory)return alert('Enter a GitHub fine-grained token for this one-time session.');const owner=$('ghOwner').value.trim(),repo=$('ghRepo').value.trim(),branch=$('ghBranch').value.trim()||'main',path=$('ghPath').value.trim()||'content.json';if(!owner||!repo)return alert('Enter owner and repository.');const api=`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${path.split('/').map(encodeURIComponent).join('/')}`;let shaVal=null;try{const old=await fetch(api+`?ref=${encodeURIComponent(branch)}`,{headers:{Authorization:`Bearer ${tokenMemory}`,Accept:'application/vnd.github+json'}});if(old.ok){const j=await old.json();shaVal=j.sha}}catch(e){}const body={message:'Update website content',content:btoa(unescape(encodeURIComponent(JSON.stringify(DATA,null,2)))),branch};if(shaVal)body.sha=shaVal;const r=await fetch(api,{method:'PUT',headers:{Authorization:`Bearer ${tokenMemory}`,Accept:'application/vnd.github+json','Content-Type':'application/json'},body:JSON.stringify(body)});$('publishStatus').textContent=r.ok?'Published. GitHub Pages may take a little time to show the change.':`Publish failed: ${await r.text()}`;tokenMemory='';$('ghToken').value=''}
