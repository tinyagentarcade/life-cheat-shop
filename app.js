'use strict';
const BUDGET=100;
// All writing is original, hand-written English. No API calls or outside assets.
const ITEMS=[
['sleep','body',40,'Sleep like a house cat','Asleep in 30 seconds. Awake with a full battery.'],
['words','people',30,'Find the words. On time.','Your perfect comeback arrives before the shower.'],
['keys','friction',15,'Never lose the thing','Keys. Wallet. That one earbud. Not your dignity.'],
['exit','people',20,'Leave without the whole goodbye','A clean exit from any party. Zero follow-up guilt.'],
['takeout','friction',15,'Order what you actually wanted','No 45-minute scroll. No food envy. Just the right noodles.'],
['focus','mind',35,'Two hours. One brain tab.','Deep focus on demand. Your phone loses its powers.'],
['replay','mind',30,'Stop replaying that conversation','Your brain finally closes the 2017 incident report.'],
['laundry','home',25,'Laundry puts itself away','Washed, dried, folded. The chair becomes a chair again.'],
['energy','body',35,'Get your evenings back','Work ends. You still have a personality left.'],
['no','people',30,'Say no without a TED Talk','A polite no. No essay. No emotional invoice.'],
['morning','body',25,'Wake up on the first alarm','One alarm. No negotiations with a horizontal lawyer.'],
['plants','home',15,'Keep every plant alive','Even the one you bought to prove a point.'],
['email','friction',25,'Emails write themselves in your voice','Warm, clear, brief. Somehow no "just circling back."'],
['names','people',20,'Remember their name. Every time.','No more "heyyy... you!" at the person you work with.'],
['phone','mind',30,'Put your phone down. Mean it.','Check the time without waking up inside another app.'],
['clean','home',35,'A home that resets overnight','You wake up. It looks like a responsible adult lives here.'],
['outfit','friction',20,'The first outfit is the right one','No pile of rejected personalities on the bed.'],
['smalltalk','people',25,'Skip straight to good conversation','Small talk gets a fast-forward button.'],
['boundaries','mind',35,'Log off in your head, too','The laptop is shut. The imaginary meeting is canceled.'],
['cook','home',30,'Dinner from whatever is left','Three sad ingredients become an actual meal.'],
['queue','friction',20,'Always pick the fast line','The other queue stops moving. For once, not your problem.'],
['pain','body',35,'A back that acts your age','Stand up without a sound effect. Revolutionary.'],
['weekend','mind',40,'Make weekends feel twice as long','Sunday night stops arriving on Saturday afternoon.'],
['money','friction',30,'Know where your money went','Mystery spending becomes a very boring list.'],
['text','people',25,'Reply before it gets weird','"Sorry, just saw this" retires with full benefits.'],
['mood','mind',25,'Not absorb everyone else\'s mood','Their bad day stays in their zip code.'],
['groceries','home',20,'Buy exactly enough groceries','Nothing rots. Nothing is missing. The avocado cooperates.'],
['coffee','body',15,'Coffee with no consequences','The buzz stays. The shakes and 2 a.m. thoughts leave.'],
['bed','mind',30,'Go to bed when you say you will','"One more episode" no longer has legislative power.'],
['shoes','body',20,'Every shoe feels like a sneaker','Nice shoes. Happy feet. No secret blister negotiations.'],
['plans','people',30,'Make plans that actually happen','The group chat picks a date before everyone grows old.'],
['wifi','friction',25,'Wi-Fi never betrays you','Full signal means full signal. Even in that one room.'],
['noise','home',25,'Neighbors with a mute button','No 1 a.m. furniture migration. No mystery drilling.'],
['decide','mind',25,'Make tiny decisions instantly','Which movie? Which mug? Done. Save the brain for life.'],
['rain','friction',20,'Never get caught in the rain','The sky respects your hair and your lunch break.'],
['social','people',35,'A social battery that recharges fast','See your favorite people. Still be a person tomorrow.']
].map(([id,cat,price,name,desc],i)=>({id,cat,price,name,desc,n:i+1}));
const CATS={all:'Everything',body:'Body',mind:'Brain',people:'People',home:'Home',friction:'Daily friction'};
// Most specific three-item matches get priority, then meaningful pairs, then category fallbacks.
const RULES=[
[['sleep','focus','keys'],'You didn\'t buy productivity. You bought being a person again.'],
[['clean','laundry','cook'],'You have outsourced being the adult in the room. To the room.'],
[['exit','no','social'],'You like people. You would just like a settings menu.'],
[['sleep','focus'],'Your dream life is apparently eight hours off and two hours on.'],
[['sleep','bed'],'You bought both ends of the problem. Excellent management.'],
[['sleep','morning'],'You would like consciousness to have opening hours.'],
[['sleep','coffee'],'Rested AND caffeinated. The rest of us never stood a chance.'],
[['focus','phone'],'You purchased a brain without the pop-up ads.'],
[['focus','decide'],'Less time deciding what to do. More time actually doing it. Suspicious.'],
[['focus','boundaries'],'You want to work better. Not become work.'],
[['weekend','boundaries'],'You don\'t want a promotion. You want your Saturday back.'],
[['weekend','energy'],'You are trying to be alive outside office hours. Radical.'],
[['replay','words'],'The comeback lands on time. The rerun gets canceled.'],
[['replay','bed'],'The bedroom is no longer a courtroom for old conversations.'],
[['replay','mood'],'You returned other people\'s problems. Receipt enclosed.'],
[['words','no'],'Clear communication. Selectively deployed.'],
[['words','smalltalk'],'You are about to become dangerously easy to talk to.'],
[['exit','smalltalk'],'A charming entrance. A surgical exit.'],
[['exit','no'],'Your next great achievement: being elsewhere.'],
[['no','mood'],'You bought a front door for your emotional life.'],
[['text','plans'],'The group chat has lost its best excuse.'],
[['names','smalltalk'],'You remember the name AND what to say. An unfair networking advantage.'],
[['social','energy'],'Finally, seeing friends is not a two-day recovery protocol.'],
[['social','exit'],'You can stay longer. You are still allowed to leave.'],
[['clean','laundry'],'The floor is visible. The chair has resigned from wardrobe duty.'],
[['cook','groceries'],'You bought dinner. Not ingredients with expiration dates.'],
[['cook','takeout'],'You want options. Mostly options that end in eating.'],
[['plants','clean'],'Your home is now better adjusted than most people.'],
[['noise','sleep'],'You didn\'t ask for much. Just silence and unconsciousness.'],
[['keys','outfit'],'You are about to leave the house on the first attempt.'],
[['keys','queue'],'A life with fewer side quests and no missing inventory.'],
[['money','takeout'],'Financial clarity. Emotionally correct noodles.'],
[['email','boundaries'],'Your inbox has a work ethic. You have a life.'],
[['coffee','pain'],'You are refurbishing the human, not replacing it.'],
[['shoes','rain'],'The forecast is comfortable with a chance of smug.'],
[['phone','bed'],'Your screen time report has entered witness protection.'],
[['wifi','focus'],'No buffering. Including inside your head.']
];
const FALLBACKS={body:'This is not a glow-up. This is basic maintenance that got wildly overdue.',mind:'You bought fewer thoughts. Somehow, that feels like more life.',people:'You don\'t hate people. You hate the unpaid admin that comes with them.',home:'You would like your home to stop assigning homework.',friction:'A few fewer stupid little problems. That is a surprisingly big life upgrade.'};
let selected=new Set(),filter='all',friend=[];const $=id=>document.getElementById(id);let total=()=>ITEMS.filter(x=>selected.has(x.id)).reduce((a,x)=>a+x.price,0),picks=()=>ITEMS.filter(x=>selected.has(x.id));
function esc(s){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function quote(){const ids=selected;for(const [rule,line] of RULES)if(rule.every(x=>ids.has(x)))return line;const counts={};for(const x of picks())counts[x.cat]=(counts[x.cat]||0)+1;let cat=Object.keys(counts).sort((a,b)=>counts[b]-counts[a])[0];if(picks().length===1)return 'One thing. You knew exactly where life was annoying you.';if(Object.keys(counts).length>=4)return 'You didn\'t pick a new life. You picked a less annoying version of this one.';return FALLBACKS[cat]||'Life, with a few bugs removed.';}
function toast(s){$('toast').textContent=s;$('toast').classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>$('toast').classList.remove('show'),2800);}
function render(){const spent=total();$('budget').textContent=`${100-spent} left`;$('cart-total').textContent=`${spent} / 100`;$('cart-count').textContent=selected.size?`${selected.size} cheat${selected.size===1?'':'s'} · ${100-spent} coins unspent`:'Your basket is a little too honest.';$('checkout').disabled=!selected.size;$('filters').innerHTML=Object.entries(CATS).map(([id,name])=>`<button class="${filter===id?'active':''}" data-filter="${id}" aria-pressed="${filter===id}">${name}</button>`).join('');$('items').innerHTML=ITEMS.filter(x=>filter==='all'||x.cat===filter).map(x=>`<button class="item ${selected.has(x.id)?'selected':''} ${!selected.has(x.id)&&spent+x.price>100?'unaffordable':''}" data-id="${x.id}" aria-pressed="${selected.has(x.id)}" aria-label="${esc(x.name)}, ${x.price} coins${selected.has(x.id)?', selected':''}"><div class="item-top"><span class="item-id">CHEAT ${String(x.n).padStart(2,'0')}</span><span class="price">${x.price}<small> ◉</small></span></div><h2>${esc(x.name)}</h2><p>${esc(x.desc)}</p><span class="add" aria-hidden="true">${selected.has(x.id)?'✓':'+'}</span></button>`).join('');}
function toggle(id){const x=ITEMS.find(x=>x.id===id);if(!x)return;if(selected.has(id))selected.delete(id);else if(total()+x.price<=100)selected.add(id);else{toast(`You need ${total()+x.price-100} more coins. Put something back first.`);return;}render();}
function orderCode(){return picks().map(x=>String(x.n).padStart(2,'0')).join('');}
function receipt(){const code=orderCode();$('receipt').innerHTML=`<div class="receipt-logo">LIFE CHEAT<br>SHOP</div><div class="receipt-sub">YOUR LIFE, ITEMIZED.</div><div class="receipt-meta"><span>ORDER #${code}</span><span>1 HUMAN</span></div><div class="dash"></div><div class="r-label">SMALL UPGRADES. BIG FEELINGS.</div>${picks().map(x=>`<div class="r-row"><span class="r-name"><span class="r-index">0${picks().indexOf(x)+1} / ${x.cat.toUpperCase()}</span>${esc(x.name)}</span><strong>${x.price}</strong></div>`).join('')}<div class="dash"></div><div class="r-row r-total"><span>TOTAL</span><span>${total()} ◉</span></div><div class="r-row r-left"><span>YOUR BUDGET: 100</span><span>LEFT: ${100-total()}</span></div><div class="dash"></div><div class="r-quote">“${esc(quote())}”</div><div class="stamp">PAID IN IMAGINARY COINS</div><div class="barcode" aria-hidden="true"></div><div class="r-footer">${code} · NO REFUNDS ON REALITY<br>lifecheatshop · 100 coins. What do YOU pick?</div>`;$('modal').showModal();document.body.style.overflow='hidden';$('modal').scrollTop=0;}
$('items').addEventListener('click',e=>{const b=e.target.closest('[data-id]');if(b)toggle(b.dataset.id);});$('filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(b){filter=b.dataset.filter;render();}});$('checkout').onclick=receipt;$('close').onclick=$('edit').onclick=()=>$('modal').close();$('modal').addEventListener('close',()=>{document.body.style.overflow='';});$('modal').addEventListener('click',e=>{if(e.target===$('modal')&&!e.target.getBoundingClientRect().contains?.(e.clientX,e.clientY)){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('modal').close();}});
function shareUrl(){const u=new URL(location.href);u.search='';u.hash='';u.searchParams.set('c',picks().map(x=>x.id).join(','));return u.href;}
function resultText(){return `My Life Cheat Shop receipt · ${total()}/100 coins\n${picks().map(x=>`${x.name} · ${x.price}`).join('\n')}\n\n${quote()}\n\nYou get the same 100 coins. What do you pick?\n${shareUrl()}`;}
async function copy(text){try{await navigator.clipboard.writeText(text);return true;}catch{const t=document.createElement('textarea');t.value=text;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();let ok=document.execCommand('copy');t.remove();return ok;}}
$('copy').onclick=async()=>toast(await copy(resultText())?'Receipt text copied. Go start an argument.':'Could not copy. Try sharing instead.');
$('share').onclick=async()=>{const data={title:'Life Cheat Shop',text:`I spent ${total()} imaginary coins fixing my life. You get 100. What do you pick?`,url:shareUrl()};if(navigator.share){try{await navigator.share(data);return;}catch(e){if(e.name==='AbortError')return;}}toast(await copy(data.url)?'Link copied. Same budget, different priorities.':'Could not copy the link.');};
// Draw a real PNG locally. No remote fonts, screenshots-as-a-service, or render libraries.
function wrap(ctx,text,width){const words=text.split(' '),lines=[];let line='';for(const word of words){const test=line?line+' '+word:word;if(ctx.measureText(test).width>width&&line){lines.push(line);line=word;}else line=test;}if(line)lines.push(line);return lines;}
function makeImage(){const W=720,pad=64;const c=document.createElement('canvas');const ctx=c.getContext('2d');ctx.font='italic 37px Georgia';let q=wrap(ctx,'“'+quote()+'”',W-pad*2),rows=picks().map(x=>{ctx.font='23px "Courier New"';return {x,lines:wrap(ctx,x.name,W-pad*2-85)};});let H=730+q.length*49+rows.reduce((a,r)=>a+38+r.lines.length*31,0);c.width=W;c.height=H;ctx.fillStyle='#e3e1d7';ctx.fillRect(0,0,W,H);ctx.fillStyle='#fffdf6';ctx.beginPath();ctx.moveTo(24,20);ctx.lineTo(W-24,20);ctx.lineTo(W-24,H-24);for(let x=W-24;x>=24;x-=16){ctx.lineTo(x-8,H-15);ctx.lineTo(x-16,H-24);}ctx.closePath();ctx.fill();ctx.fillStyle='#31332b';let y=84;function text(t,x,yy,font,align='left'){ctx.font=font;ctx.textAlign=align;ctx.fillText(t,x,yy);}function dash(yy){ctx.save();ctx.setLineDash([7,6]);ctx.strokeStyle='#898d7d';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(pad,yy);ctx.lineTo(W-pad,yy);ctx.stroke();ctx.restore();}text('LIFE CHEAT SHOP',W/2,y,'bold 37px "Courier New"','center');y+=34;text('YOUR LIFE, ITEMIZED.',W/2,y,'18px "Courier New"','center');y+=49;text('ORDER #'+orderCode(),pad,y,'16px "Courier New"');text('1 HUMAN',W-pad,y,'16px "Courier New"','right');y+=27;dash(y);y+=33;text('SMALL UPGRADES. BIG FEELINGS.',pad,y,'16px "Courier New"');y+=32;for(let i=0;i<rows.length;i++){const {x,lines}=rows[i];ctx.fillStyle='#8c8d7d';text(String(i+1).padStart(2,'0')+' / '+x.cat.toUpperCase(),pad,y,'14px "Courier New"');y+=27;ctx.fillStyle='#31332b';text(String(x.price),W-pad,y,'bold 25px "Courier New"','right');for(const l of lines){text(l,pad,y,'23px "Courier New"');y+=31;}y+=11;}dash(y);y+=46;text('TOTAL',pad,y,'bold 36px "Courier New"');text(total()+' COINS',W-pad,y,'bold 32px "Courier New"','right');y+=31;text('BUDGET: 100',pad,y,'16px "Courier New"');text('LEFT: '+(100-total()),W-pad,y,'16px "Courier New"','right');y+=26;dash(y);y+=49;for(const line of q){text(line,pad,y,'italic 37px Georgia');y+=49;}y+=16;ctx.save();ctx.translate(pad+235,y+20);ctx.rotate(-.075);ctx.strokeStyle='#7d8a57';ctx.fillStyle='#7d8a57';ctx.lineWidth=3;ctx.strokeRect(-235,-25,470,48);text('PAID IN IMAGINARY COINS',0,7,'bold 20px "Courier New"','center');ctx.restore();y+=87;ctx.fillStyle='#31332b';let x=(W-320)/2;for(let i=0;i<93;i++){let n=((i*17+orderCode().length*13)%5)+1;if(i%2===0)ctx.fillRect(x,y,n*2,55);x+=n*1.2;if(x>(W+320)/2)break;}y+=83;text(orderCode()+' · NO REFUNDS ON REALITY',W/2,y,'14px "Courier New"','center');y+=27;text('lifecheatshop · 100 coins. What do YOU pick?',W/2,y,'15px "Courier New"','center');y+=29;let site=location.hostname==='localhost'?'LIFE CHEAT SHOP':location.hostname;text(site,W/2,y,'14px "Courier New"','center');return c;}
$('save').onclick=()=>{try{makeImage().toBlob(blob=>{if(!blob){toast('Could not make image. Try again.');return;}const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='my-life-receipt.png';a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);toast('Receipt saved. Reality remains unchanged.');},'image/png');}catch{toast('Could not make image. Try copying the text.');}};
const raw=new URLSearchParams(location.search).get('c');if(raw){for(const id of raw.split(',').slice(0,36)){const x=ITEMS.find(x=>x.id===id);if(x&&!selected.has(id)&&total()+x.price<=100)selected.add(id);}friend=[...selected];if(friend.length){$('shared').hidden=false;$('shared').innerHTML=`A friend picked these. Same 100 coins. Would you choose differently?<button id="startfresh">Start fresh</button>`;$('startfresh').onclick=()=>{selected.clear();render();$('shared').hidden=true;history.replaceState(null,'',location.pathname);};}}render();
