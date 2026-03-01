import React, { useState, useMemo, useCallback, useRef } from "react";

const CASES = [
  {id:1,name:"Andersen v. Stability AI",st:"CA",jur:"N.D. Cal.",yr:2023,cl:"Copyright",sec:"Creative Arts",status:"Active",pl:"Visual Artists",df:"Stability AI, Midjourney, DeviantArt",desc:"Visual artists allege AI image generators trained on copyrighted artworks without consent."},
  {id:2,name:"Getty Images v. Stability AI",st:"DE",jur:"D. Del.",yr:2023,cl:"Copyright",sec:"Media",status:"Active",pl:"Getty Images",df:"Stability AI",desc:"Getty alleges Stability scraped 12M+ photos to train Stable Diffusion."},
  {id:3,name:"NY Times v. Microsoft & OpenAI",st:"NY",jur:"S.D.N.Y.",yr:2023,cl:"Copyright",sec:"Media",status:"Active",pl:"The New York Times",df:"Microsoft, OpenAI",desc:"NYT alleges ChatGPT and Bing Chat reproduce copyrighted news articles."},
  {id:4,name:"Authors Guild v. OpenAI",st:"NY",jur:"S.D.N.Y.",yr:2023,cl:"Copyright",sec:"Publishing",status:"Active",pl:"Authors Guild et al.",df:"OpenAI",desc:"Authors including John Grisham and George R.R. Martin allege OpenAI trained on copyrighted books."},
  {id:5,name:"Tremblay v. OpenAI",st:"CA",jur:"N.D. Cal.",yr:2023,cl:"Copyright",sec:"Publishing",status:"Active",pl:"Paul Tremblay, Mona Awad",df:"OpenAI",desc:"Authors allege ChatGPT trained using pirated copies of their books."},
  {id:6,name:"Silverman v. OpenAI",st:"CA",jur:"N.D. Cal.",yr:2023,cl:"Copyright",sec:"Entertainment",status:"Active",pl:"Sarah Silverman et al.",df:"OpenAI",desc:"Comedians allege their copyrighted books used to train ChatGPT without consent."},
  {id:7,name:"Kadrey v. Meta",st:"CA",jur:"N.D. Cal.",yr:2023,cl:"Copyright",sec:"Publishing",status:"Active",pl:"Richard Kadrey et al.",df:"Meta Platforms",desc:"Authors allege Meta used copyrighted books from shadow libraries to train LLaMA."},
  {id:8,name:"Concord Music v. Anthropic",st:"TN",jur:"M.D. Tenn.",yr:2023,cl:"Copyright",sec:"Music",status:"Active",pl:"UMG, Concord Music",df:"Anthropic",desc:"Music publishers allege Claude AI reproduces copyrighted song lyrics."},
  {id:9,name:"Doe v. GitHub",st:"CA",jur:"N.D. Cal.",yr:2022,cl:"Copyright",sec:"Technology",status:"Active",pl:"Anonymous programmers",df:"GitHub, Microsoft, OpenAI",desc:"Developers allege GitHub Copilot trained on open-source code violating license terms."},
  {id:10,name:"Thaler v. Perlmutter",st:"DC",jur:"D.D.C.",yr:2023,cl:"IP / Patent",sec:"Technology",status:"Decided",pl:"Stephen Thaler",df:"Register of Copyrights",desc:"Court ruled AI-generated artwork without human authorship cannot be copyrighted."},
  {id:11,name:"Thaler v. Vidal",st:"VA",jur:"E.D. Va.",yr:2022,cl:"IP / Patent",sec:"Technology",status:"Decided",pl:"Stephen Thaler",df:"USPTO Director",desc:"Federal Circuit affirmed AI systems cannot be listed as inventors on patents."},
  {id:12,name:"Huckabee v. Meta",st:"NY",jur:"S.D.N.Y.",yr:2023,cl:"Copyright",sec:"Publishing",status:"Active",pl:"Mike Huckabee et al.",df:"Meta Platforms",desc:"Authors allege Meta used their books to train LLaMA without authorization."},
  {id:13,name:"Thomson Reuters v. Ross Intelligence",st:"DE",jur:"D. Del.",yr:2020,cl:"Copyright",sec:"Legal Tech",status:"Decided",pl:"Thomson Reuters",df:"Ross Intelligence",desc:"Westlaw content used to train AI legal research tool; jury found infringement."},
  {id:14,name:"In re Google Gen AI Litigation",st:"CA",jur:"N.D. Cal.",yr:2023,cl:"Copyright",sec:"Technology",status:"Active",pl:"Multiple plaintiffs",df:"Google, Alphabet",desc:"Consolidated class action alleging Google AI products trained on copyrighted data."},
  {id:15,name:"Nazemian v. Nvidia",st:"CA",jur:"N.D. Cal.",yr:2024,cl:"Copyright",sec:"Technology",status:"Active",pl:"Brian Nazemian et al.",df:"Nvidia",desc:"Alleges Nvidia used copyrighted works to train NeMo AI models."},
  {id:16,name:"Perplexity AI Copyright Cases",st:"NY",jur:"S.D.N.Y.",yr:2024,cl:"Copyright",sec:"Technology",status:"Active",pl:"News publishers",df:"Perplexity AI",desc:"Publishers allege AI search engine repackages copyrighted content verbatim."},
  {id:17,name:"Apple OpenELM Suit",st:"CA",jur:"N.D. Cal.",yr:2024,cl:"Copyright",sec:"Technology",status:"Active",pl:"Content creators",df:"Apple Inc.",desc:"Alleges Apple used copyrighted works to train its OpenELM language models."},
  {id:18,name:"UMG v. Suno & Udio",st:"NY",jur:"S.D.N.Y.",yr:2024,cl:"Copyright",sec:"Music",status:"Active",pl:"Major record labels",df:"Suno, Udio",desc:"Music labels sue AI music generators for training on copyrighted recordings."},
  {id:19,name:"P.M. v. OpenAI",st:"CA",jur:"N.D. Cal.",yr:2023,cl:"Privacy",sec:"Technology",status:"Active",pl:"Anonymous plaintiffs",df:"OpenAI, Microsoft",desc:"Class action alleging OpenAI scraped personal data from millions of internet users."},
  {id:20,name:"Ambriz v. Google",st:"CA",jur:"N.D. Cal.",yr:2023,cl:"Privacy",sec:"Technology",status:"Active",pl:"Ambriz et al.",df:"Google",desc:"Alleges Google AI features violate California wiretapping laws (CIPA)."},
  {id:21,name:"In re Clearview AI",st:"IL",jur:"N.D. Ill.",yr:2020,cl:"Privacy",sec:"Surveillance",status:"Settled",pl:"ACLU et al.",df:"Clearview AI",desc:"BIPA class action over facial recognition scraping billions of photos from the internet."},
  {id:22,name:"Vance v. Amazon",st:"WA",jur:"W.D. Wash.",yr:2023,cl:"Privacy",sec:"Consumer Tech",status:"Active",pl:"Consumers",df:"Amazon",desc:"Alexa voice assistant accused of recording and analyzing children voices without consent."},
  {id:23,name:"Rivera v. Google",st:"IL",jur:"N.D. Ill.",yr:2020,cl:"Privacy",sec:"Technology",status:"Settled",pl:"Rivera et al.",df:"Google",desc:"Google Photos face-grouping feature alleged to violate Illinois BIPA."},
  {id:24,name:"Patel v. Facebook (BIPA)",st:"IL",jur:"N.D. Ill.",yr:2015,cl:"Privacy",sec:"Social Media",status:"Settled",pl:"Facebook users",df:"Facebook/Meta",desc:"$650M settlement over Facebook facial recognition violating Illinois BIPA."},
  {id:25,name:"Renderos v. Clearview AI",st:"CA",jur:"State Ct.",yr:2021,cl:"Privacy",sec:"Surveillance",status:"Active",pl:"Renderos et al.",df:"Clearview AI",desc:"California claims over mass scraping of photos for facial recognition AI."},
  {id:26,name:"EEOC v. iTutorGroup",st:"NY",jur:"E.D.N.Y.",yr:2022,cl:"Discrimination",sec:"Employment",status:"Settled",pl:"EEOC",df:"iTutorGroup",desc:"AI hiring software automatically rejected applicants over age 55 or 60."},
  {id:27,name:"Mobley v. Workday",st:"CA",jur:"N.D. Cal.",yr:2023,cl:"Discrimination",sec:"Employment",status:"Active",pl:"Derek Mobley",df:"Workday Inc.",desc:"AI screening tools alleged to discriminate based on race, age, and disability."},
  {id:28,name:"NYC AEDT Enforcement",st:"NY",jur:"NYC Admin",yr:2023,cl:"Discrimination",sec:"Employment",status:"Active",pl:"NYC enforcement",df:"Multiple employers",desc:"NYC Local Law 144 requires audits of AI hiring tools; enforcement for non-compliance."},
  {id:29,name:"Nilsson v. GM Cruise",st:"CA",jur:"S.F. Superior",yr:2023,cl:"Product Liability",sec:"Autonomous Vehicles",status:"Active",pl:"Pedestrian victim",df:"GM Cruise",desc:"Pedestrian struck and dragged by autonomous Cruise vehicle in San Francisco."},
  {id:30,name:"Huang v. Tesla",st:"CA",jur:"Superior Ct.",yr:2023,cl:"Product Liability",sec:"Autonomous Vehicles",status:"Active",pl:"Huang family",df:"Tesla",desc:"Fatal crash involving Tesla Autopilot; alleges defective self-driving technology."},
  {id:31,name:"Uber ATG Fatal Crash",st:"AZ",jur:"Maricopa Cty.",yr:2018,cl:"Product Liability",sec:"Autonomous Vehicles",status:"Settled",pl:"Estate of Elaine Herzberg",df:"Uber Technologies",desc:"First fatal autonomous vehicle crash involving pedestrian in Tempe, Arizona."},
  {id:32,name:"Doe v. UnitedHealth Group",st:"MN",jur:"D. Minn.",yr:2023,cl:"Consumer Protection",sec:"Healthcare",status:"Active",pl:"Medicare Advantage members",df:"UnitedHealth Group",desc:"Alleges AI tool (nH Predict) used to deny elderly patients post-acute care coverage."},
  {id:33,name:"Estate of Parris v. UnitedHealth",st:"MN",jur:"D. Minn.",yr:2023,cl:"Wrongful Death",sec:"Healthcare",status:"Active",pl:"Estate of Gene Parris",df:"UnitedHealth, NaviHealth",desc:"AI algorithm wrongfully denied nursing home coverage leading to patient death."},
  {id:34,name:"State v. Loomis",st:"WI",jur:"WI Supreme Ct.",yr:2016,cl:"Due Process",sec:"Criminal Justice",status:"Decided",pl:"Eric Loomis",df:"State of Wisconsin",desc:"Challenge to use of COMPAS algorithm in criminal sentencing; court upheld with limitations."},
  {id:35,name:"Houston Fed. Teachers v. HISD",st:"TX",jur:"S.D. Tex.",yr:2017,cl:"Due Process",sec:"Education",status:"Settled",pl:"Houston Teachers Federation",df:"Houston ISD",desc:"Teachers challenged opaque AI-based teacher evaluation system (EVAAS)."},
  {id:36,name:"Ark. DHS v. Ledgerwood",st:"AR",jur:"AR Supreme Ct.",yr:2019,cl:"Due Process",sec:"Government",status:"Decided",pl:"Ledgerwood",df:"AR DHS",desc:"Challenge to algorithm that cut Medicaid home care hours without adequate explanation."},
  {id:37,name:"FTC v. Rite Aid",st:"DC",jur:"FTC Admin",yr:2023,cl:"Consumer Protection",sec:"Retail",status:"Settled",pl:"FTC",df:"Rite Aid",desc:"FTC action over faulty facial recognition that falsely flagged shoppers."},
  {id:38,name:"In re DoNotPay",st:"DC",jur:"FTC Admin",yr:2024,cl:"Consumer Protection",sec:"Legal Tech",status:"Settled",pl:"FTC",df:"DoNotPay Inc.",desc:"FTC settlement over robot lawyer AI making deceptive claims about legal capabilities."},
  {id:39,name:"FTC v. Ascend Capventures",st:"CA",jur:"C.D. Cal.",yr:2024,cl:"Consumer Protection",sec:"Technology",status:"Active",pl:"FTC",df:"Ascend Capventures",desc:"FTC crackdown on deceptive AI income claims."},
  {id:40,name:"FTC v. TheFBAMachine",st:"NJ",jur:"D.N.J.",yr:2024,cl:"Consumer Protection",sec:"E-Commerce",status:"Active",pl:"FTC",df:"TheFBAMachine Inc.",desc:"FTC action against deceptive AI-powered Amazon store scheme."},
  {id:41,name:"FTC v. Empire Holdings",st:"PA",jur:"E.D. Pa.",yr:2024,cl:"Consumer Protection",sec:"Technology",status:"Active",pl:"FTC",df:"Empire Holdings Group",desc:"FTC crackdown on deceptive AI business opportunity claims."},
  {id:42,name:"In re Rytr LLC",st:"DC",jur:"FTC Admin",yr:2024,cl:"Consumer Protection",sec:"Technology",status:"Settled",pl:"FTC",df:"Rytr LLC",desc:"FTC action against AI writing tool for generating fake product reviews."},
  {id:43,name:"Boshart v. Sprinklr",st:"NY",jur:"S.D.N.Y.",yr:2024,cl:"Securities Fraud",sec:"Technology",status:"Active",pl:"Investors",df:"Sprinklr Inc.",desc:"Investors allege Sprinklr overstated AI capabilities (AI washing)."},
  {id:44,name:"Hoare v. Oddity Tech",st:"NY",jur:"S.D.N.Y.",yr:2024,cl:"Securities Fraud",sec:"Consumer Tech",status:"Active",pl:"Investors",df:"Oddity Tech Ltd.",desc:"Alleged overstatement of AI beauty platform capabilities; AI washing."},
  {id:45,name:"Barry v. Lyon",st:"FL",jur:"S.D. Fla.",yr:2024,cl:"Right of Publicity",sec:"Entertainment",status:"Active",pl:"Barry",df:"Lyon",desc:"AI-generated deepfake content alleged to violate right of publicity."},
  {id:46,name:"TikTok v. Garland",st:"DC",jur:"D.C. Cir.",yr:2024,cl:"First Amendment",sec:"Social Media",status:"Decided",pl:"TikTok, ByteDance",df:"AG Garland",desc:"Challenge to federal ban of AI-enabled social media app on First Amendment grounds."},
  {id:47,name:"Gonzalez v. Google",st:"DC",jur:"U.S. Supreme Ct.",yr:2023,cl:"Section 230",sec:"Technology",status:"Decided",pl:"Gonzalez family",df:"Google",desc:"Whether YouTube AI recommendation algorithm is protected by Section 230."},
  {id:48,name:"In re Social Media Addiction MDL",st:"CA",jur:"N.D. Cal.",yr:2022,cl:"Product Liability",sec:"Social Media",status:"Active",pl:"School districts, families",df:"Meta, TikTok, Snap, Google",desc:"MDL alleging AI-driven algorithms deliberately designed to addict minors."},
  {id:49,name:"Lyman v. Alphabet",st:"CA",jur:"N.D. Cal.",yr:2024,cl:"Consumer Protection",sec:"Technology",status:"Active",pl:"Lyman",df:"Alphabet/Google",desc:"Alleges Google AI Overviews provides dangerously inaccurate medical information."},
  {id:50,name:"Doe v. Emory University",st:"GA",jur:"N.D. Ga.",yr:2024,cl:"Due Process",sec:"Education",status:"Active",pl:"Student Doe",df:"Emory University",desc:"Students challenged disciplinary proceedings over use of AI-based learning tool."},
];

const CC={"Copyright":"#C7A94F","Privacy":"#5B7BA5","Discrimination":"#D4764E","Product Liability":"#D4898F","Consumer Protection":"#D45B7A","Due Process":"#2B4C7E","Securities Fraud":"#8B3A62","IP / Patent":"#6B4E3D","Right of Publicity":"#7B5EA7","First Amendment":"#E8B4B8","Section 230":"#8AACB8","Wrongful Death":"#C25B3F"};
const SC={Active:"#2B6B3E",Settled:"#C7A94F",Decided:"#5B7BA5"};
const SM={AL:{x:590,y:365,n:"Alabama"},AZ:{x:185,y:345,n:"Arizona"},AR:{x:500,y:350,n:"Arkansas"},CA:{x:95,y:280,n:"California"},CO:{x:275,y:270,n:"Colorado"},CT:{x:725,y:195,n:"Connecticut"},DE:{x:705,y:255,n:"Delaware"},DC:{x:695,y:270,n:"D.C."},FL:{x:640,y:430,n:"Florida"},GA:{x:625,y:375,n:"Georgia"},IL:{x:530,y:255,n:"Illinois"},IN:{x:565,y:255,n:"Indiana"},KS:{x:395,y:295,n:"Kansas"},KY:{x:590,y:300,n:"Kentucky"},LA:{x:500,y:400,n:"Louisiana"},MD:{x:690,y:260,n:"Maryland"},MA:{x:735,y:185,n:"Massachusetts"},MI:{x:565,y:195,n:"Michigan"},MN:{x:445,y:150,n:"Minnesota"},MS:{x:535,y:380,n:"Mississippi"},MO:{x:485,y:300,n:"Missouri"},NJ:{x:715,y:240,n:"New Jersey"},NY:{x:700,y:190,n:"New York"},NC:{x:660,y:325,n:"North Carolina"},OH:{x:600,y:245,n:"Ohio"},OK:{x:415,y:340,n:"Oklahoma"},OR:{x:115,y:150,n:"Oregon"},PA:{x:675,y:230,n:"Pennsylvania"},TN:{x:575,y:330,n:"Tennessee"},TX:{x:380,y:400,n:"Texas"},VA:{x:670,y:290,n:"Virginia"},WA:{x:130,y:100,n:"Washington"},WI:{x:495,y:170,n:"Wisconsin"}};

// ── MAIN APP ──
export default function App(){
  const[filters,setFilters]=useState({years:[],claims:[],sectors:[],statuses:[]});
  const[search,setSearch]=useState("");
  const[view,setView]=useState("map");
  const[sel,setSel]=useState(null);
  const[chatOpen,setChatOpen]=useState(false);

  const allYears=useMemo(()=>[...new Set(CASES.map(c=>c.yr))].sort(),[]);
  const allClaims=useMemo(()=>[...new Set(CASES.map(c=>c.cl))].sort(),[]);
  const allSectors=useMemo(()=>[...new Set(CASES.map(c=>c.sec))].sort(),[]);

  const filtered=useMemo(()=>CASES.filter(c=>{
    if(filters.years.length&&!filters.years.includes(c.yr))return false;
    if(filters.claims.length&&!filters.claims.includes(c.cl))return false;
    if(filters.sectors.length&&!filters.sectors.includes(c.sec))return false;
    if(filters.statuses.length&&!filters.statuses.includes(c.status))return false;
    if(search){const q=search.toLowerCase();return[c.name,c.pl,c.df,c.desc,c.sec,c.cl].some(s=>s.toLowerCase().includes(q));}
    return true;
  }),[filters,search]);

  const byState=useMemo(()=>{const m={};filtered.forEach(c=>{(m[c.st]=m[c.st]||[]).push(c);});return m;},[filtered]);

  const stats=useMemo(()=>{
    const byCl={},bySec={},byYr={},bySt={};
    filtered.forEach(c=>{byCl[c.cl]=(byCl[c.cl]||0)+1;bySec[c.sec]=(bySec[c.sec]||0)+1;byYr[c.yr]=(byYr[c.yr]||0)+1;bySt[c.status]=(bySt[c.status]||0)+1;});
    return{byCl,bySec,byYr,bySt};
  },[filtered]);

  const tog=useCallback((cat,val)=>{setFilters(p=>({...p,[cat]:p[cat].includes(val)?p[cat].filter(v=>v!==val):[...p[cat],val]}));},[]);
  const clr=useCallback(()=>{setFilters({years:[],claims:[],sectors:[],statuses:[]});setSearch("");setSel(null);},[]);
  const fc=Object.values(filters).flat().length+(search?1:0);

  return(
    <div style={{fontFamily:"'Merriweather Sans',sans-serif",background:"#F5F0E8",color:"#1A1A2E",height:"100vh",overflow:"hidden",display:"flex",flexDirection:"column"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@300;400;500;600;700;800&family=Playfair+Display:wght@600;700;800;900&family=Source+Code+Pro:wght@400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#F5F0E8;color:#1A1A2E}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-track{background:#E8E0D0}::-webkit-scrollbar-thumb{background:#B8A88A;border-radius:10px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .fb-item:hover{background:rgba(43,76,126,0.06)!important}
        .trow:hover{background:rgba(43,76,126,0.05)!important}
        .chip{cursor:pointer;border:none;font-family:'Merriweather Sans',sans-serif;transition:all .15s}
        .chip:hover{transform:translateY(-1px)}
      `}</style>

      {/* HEADER */}
      <header style={{background:"linear-gradient(135deg,#1A1A2E 0%,#2B4C7E 100%)",padding:"0 32px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,borderBottom:"3px solid #C7A94F"}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:42,height:42,border:"2px solid #C7A94F",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(199,169,79,0.1)"}}>
            <span style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:800,color:"#C7A94F"}}>ETI</span>
          </div>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#FFFFFF",lineHeight:1.1}}>National AI Litigation Cases Explorer</div>
            <div style={{fontSize:10,color:"rgba(199,169,79,0.85)",letterSpacing:"0.05em",marginTop:1}}>Ethical Tech Initiative (ETI) At GW Center for Law and Tech</div>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          {[{k:"map",e:"\u25C9",l:"Map"},{k:"timeline",e:"\u25F7",l:"Timeline"},{k:"cases",e:"\u2630",l:"Cases"},{k:"insights",e:"\u25C8",l:"Trends & Insights"}].map(v=>(
            <button key={v.k} onClick={()=>{setView(v.k);setSel(null);}} style={{padding:"8px 16px",borderRadius:4,border:view===v.k?"1px solid #C7A94F":"1px solid transparent",cursor:"pointer",fontFamily:"'Merriweather Sans',sans-serif",fontSize:13,fontWeight:view===v.k?700:500,color:view===v.k?"#FFFFFF":"rgba(255,255,255,0.65)",background:view===v.k?"rgba(199,169,79,0.2)":"transparent",transition:"all .2s"}}>{v.e} {v.l}</button>
          ))}
          <div style={{width:1,height:28,background:"rgba(255,255,255,0.15)",margin:"0 8px"}}/>
          <div style={{position:"relative"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." style={{width:160,padding:"6px 10px 6px 10px",borderRadius:4,border:"1px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.1)",color:"#FFF",fontFamily:"'Merriweather Sans',sans-serif",fontSize:12,outline:"none"}}/>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* SIDEBAR */}
        <aside style={{width:260,flexShrink:0,borderRight:"1px solid #D4C9B0",background:"#FFFDF7",overflowY:"auto"}}>
          <div style={{padding:"16px 14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14,paddingBottom:10,borderBottom:"2px solid #C7A94F"}}>
              <span style={{fontSize:14}}>&#x1F3E0;</span>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:14,fontWeight:700,color:"#2B4C7E"}}>Ethical Tech Initiative (ETI)</span>
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{fontSize:13,fontWeight:700,color:"#2B4C7E"}}>&#x25BD; Filters</span>
              </div>
              {fc>0&&<button onClick={clr} style={{padding:"2px 8px",borderRadius:3,border:"1px solid #C7A94F",background:"rgba(199,169,79,0.1)",color:"#8B6F2A",fontFamily:"'Merriweather Sans',sans-serif",fontSize:10,cursor:"pointer",fontWeight:600}}>Clear {fc}</button>}
            </div>
            <FB t="Data by Year" items={allYears} act={filters.years} tog={v=>tog("years",v)} cnt={stats.byYr}/>
            <FB t="Data by Claim Type" items={allClaims} act={filters.claims} tog={v=>tog("claims",v)} cnt={stats.byCl} cc={CC}/>
            <FB t="Data by Status" items={["Active","Settled","Decided"]} act={filters.statuses} tog={v=>tog("statuses",v)} cnt={stats.bySt} cc={SC}/>
            <FB t="Data by Sector" items={allSectors} act={filters.sectors} tog={v=>tog("sectors",v)} cnt={stats.bySec}/>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
          {/* STAT CARDS */}
          <div style={{display:"flex",gap:10,padding:"14px 20px",borderBottom:"1px solid #D4C9B0",background:"#FFFDF7",flexShrink:0,flexWrap:"wrap"}}>
            {[{l:"Total Cases",v:filtered.length},{l:"Active",v:filtered.filter(c=>c.status==="Active").length},{l:"Settled",v:filtered.filter(c=>c.status==="Settled").length},{l:"Decided",v:filtered.filter(c=>c.status==="Decided").length},{l:"Jurisdictions",v:Object.keys(byState).length}].map((s,i)=>(
              <div key={s.l} style={{padding:"10px 20px",borderRadius:6,background:"linear-gradient(135deg,#C7A94F22,#C7A94F11)",border:"1px solid #C7A94F55",minWidth:110,animation:`fadeUp .3s ease-out ${i*.05}s both`}}>
                <div style={{fontSize:11,fontWeight:600,color:"#8B6F2A",letterSpacing:"0.03em",marginBottom:2}}>{s.l}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:800,color:"#2B4C7E"}}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{flex:1,overflow:"auto",position:"relative"}}>
            {view==="map"&&<MapV cases={filtered} byState={byState} sel={sel} setSel={setSel}/>}
            {view==="timeline"&&<TimeV cases={filtered} stats={stats} sel={sel} setSel={setSel}/>}
            {view==="cases"&&<CaseV cases={filtered} sel={sel} setSel={setSel}/>}
            {view==="insights"&&<InsV cases={filtered} stats={stats}/>}
          </div>
        </main>
        {sel&&<Detail c={sel} onClose={()=>setSel(null)} setSel={setSel}/>}
      </div>
      <ChatBot open={chatOpen} setOpen={setChatOpen}/>
    </div>
  );
}

// ── Filter Block ──
function FB({t,items,act,tog,cnt,cc}){
  const[open,setOpen]=useState(false);
  return(
    <div style={{marginBottom:4,borderBottom:"1px solid #E8E0D0"}}>
      <button onClick={()=>setOpen(p=>!p)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:"none",border:"none",cursor:"pointer",padding:"10px 4px",fontFamily:"'Merriweather Sans',sans-serif"}}>
        <span style={{fontSize:13,fontWeight:600,color:"#1A1A2E"}}>{t}</span>
        <span style={{fontSize:14,color:"#8B6F2A",fontWeight:700}}>{open?"\u2212":"+"}</span>
      </button>
      {open&&<div style={{padding:"0 4px 10px"}}>
        {items.map(item=>{
          const on=act.includes(item);const color=cc?cc[item]:null;
          return <button key={item} className="fb-item chip" onClick={()=>tog(item)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"5px 8px",borderRadius:4,background:on?"rgba(43,76,126,0.08)":"transparent",border:on?"1px solid rgba(43,76,126,0.2)":"1px solid transparent",marginBottom:1}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}>
              {color&&<div style={{width:8,height:8,borderRadius:"50%",background:color,flexShrink:0}}/>}
              <span style={{fontSize:12,color:on?"#2B4C7E":"#555",fontWeight:on?600:400}}>{item}</span>
            </div>
            <span style={{fontFamily:"'Source Code Pro',monospace",fontSize:10,color:"#999"}}>{cnt[item]||0}</span>
          </button>;
        })}
      </div>}
    </div>
  );
}

// ── Detail Panel ──
function Detail({c,onClose,setSel}){
  const color=CC[c.cl]||"#5B7BA5";
  const related=CASES.filter(r=>r.id!==c.id&&(r.cl===c.cl||r.sec===c.sec)).slice(0,4);
  return(
    <aside style={{width:340,flexShrink:0,overflowY:"auto",borderLeft:"1px solid #D4C9B0",background:"#FFFDF7",animation:"slideIn .2s ease-out",padding:"20px 18px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <span style={{padding:"4px 10px",borderRadius:4,fontSize:11,fontWeight:700,background:color+"22",color:color,border:"1px solid "+color+"44"}}>{c.cl}</span>
        <button onClick={onClose} style={{background:"#E8E0D0",border:"none",color:"#666",width:26,height:26,borderRadius:4,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>x</button>
      </div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#1A1A2E",lineHeight:1.25,marginBottom:14}}>{c.name}</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14,padding:14,borderRadius:6,background:"#F5F0E8",border:"1px solid #E8E0D0"}}>
        {[{l:"Jurisdiction",v:c.jur},{l:"State",v:SM[c.st]?.n||c.st},{l:"Filed",v:c.yr},{l:"Status",v:c.status,c:SC[c.status]},{l:"Sector",v:c.sec}].map(r=><div key={r.l}><div style={{fontSize:9,fontWeight:700,color:"#999",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:2}}>{r.l}</div><div style={{fontSize:12,fontWeight:600,color:r.c||"#1A1A2E"}}>{r.v}</div></div>)}
      </div>
      {[{l:"Plaintiff",v:c.pl},{l:"Defendant",v:c.df}].map(p=><div key={p.l} style={{marginBottom:6,padding:"8px 10px",borderRadius:4,background:"#F5F0E8",border:"1px solid #E8E0D0"}}><div style={{fontSize:9,fontWeight:700,color:"#999",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:2}}>{p.l}</div><div style={{fontSize:12,fontWeight:600,color:"#1A1A2E"}}>{p.v}</div></div>)}
      <div style={{padding:14,borderRadius:6,marginTop:6,marginBottom:16,background:"#F5F0E8",border:"1px solid #E8E0D0"}}>
        <div style={{fontSize:9,fontWeight:700,color:"#999",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>Summary</div>
        <p style={{fontSize:13,color:"#444",lineHeight:1.65}}>{c.desc}</p>
      </div>
      {related.length>0&&<div><div style={{fontSize:10,fontWeight:700,color:"#8B6F2A",textTransform:"uppercase",marginBottom:6}}>Related Cases</div>
        {related.map(r=><button key={r.id} onClick={()=>setSel(r)} className="chip" style={{display:"block",width:"100%",textAlign:"left",padding:"7px 10px",marginBottom:2,borderRadius:4,background:"#F5F0E8",border:"1px solid #E8E0D0",fontFamily:"'Merriweather Sans',sans-serif",color:"#2B4C7E",fontSize:12,fontWeight:600}}>{r.name} <span style={{fontSize:10,color:"#999",marginLeft:4}}>{r.yr}</span></button>)}
      </div>}
    </aside>
  );
}

// ── MAP VIEW ──
function MapV({cases,byState,sel,setSel}){
  const[hov,setHov]=useState(null);
  const mx=Math.max(...Object.values(byState).map(a=>a.length),1);
  return(
    <div style={{width:"100%",height:"100%",position:"relative",overflow:"hidden",background:"#F5F0E8"}}>
      <svg viewBox="0 0 800 500" style={{width:"100%",height:"100%",padding:"10px"}}>
        {Object.entries(SM).map(([abbr,coord])=>{
          const cs=byState[abbr]||[];
          if(cs.length===0)return <g key={abbr}><circle cx={coord.x} cy={coord.y} r={14} fill="#D4C9B0" opacity={0.3} stroke="#B8A88A" strokeWidth={0.5}/><text x={coord.x} y={coord.y+1} textAnchor="middle" dominantBaseline="central" style={{fontFamily:"'Source Code Pro',monospace",fontSize:7,fill:"#999",fontWeight:500}}>{abbr}</text></g>;
          const intensity=Math.min(cs.length/mx,1);
          const clMap={};cs.forEach(c=>{clMap[c.cl]=(clMap[c.cl]||0)+1;});
          const topCl=Object.entries(clMap).sort((a,b)=>b[1]-a[1])[0][0];
          const baseColor=CC[topCl]||"#5B7BA5";
          const r=16+intensity*22;
          const isH=hov===abbr;
          return(
            <g key={abbr} style={{cursor:"pointer"}} onMouseEnter={()=>setHov(abbr)} onMouseLeave={()=>setHov(null)} onClick={()=>{if(cs.length===1)setSel(cs[0]);}}>
              <circle cx={coord.x} cy={coord.y} r={r+4} fill={baseColor} opacity={isH?0.15:0.08}/>
              <circle cx={coord.x} cy={coord.y} r={r} fill={baseColor} opacity={isH?0.5:0.3} stroke={isH?baseColor:"#fff"} strokeWidth={isH?2:1}/>
              <text x={coord.x} y={coord.y-(cs.length>1?2:0)} textAnchor="middle" dominantBaseline="central" style={{fontFamily:"'Playfair Display',serif",fontSize:cs.length>9?14:12,fontWeight:800,fill:"#fff",pointerEvents:"none"}}>{cs.length>0?cs.length:""}</text>
              <text x={coord.x} y={coord.y+r+10} textAnchor="middle" style={{fontFamily:"'Source Code Pro',monospace",fontSize:8,fontWeight:600,fill:isH?"#2B4C7E":"#999",pointerEvents:"none"}}>{abbr}</text>
            </g>
          );
        })}
      </svg>
      {hov&&byState[hov]&&<div style={{position:"absolute",bottom:16,left:16,zIndex:20,maxWidth:340,padding:"14px 18px",borderRadius:8,background:"#FFFDF7",border:"1px solid #C7A94F",boxShadow:"0 8px 32px rgba(0,0,0,0.12)",animation:"fadeUp .12s ease-out"}}>
        <div style={{fontFamily:"'Playfair Display',serif",fontWeight:700,fontSize:14,color:"#2B4C7E",marginBottom:6}}>{SM[hov]?.n} <span style={{fontSize:11,color:"#999",fontWeight:400,fontFamily:"'Merriweather Sans',sans-serif",marginLeft:4}}>{byState[hov].length} case{byState[hov].length>1?"s":""}</span></div>
        {byState[hov].slice(0,5).map(c=><div key={c.id} onClick={()=>setSel(c)} style={{display:"flex",alignItems:"center",gap:8,padding:"4px 6px",borderRadius:4,cursor:"pointer"}} className="trow">
          <div style={{width:8,height:8,borderRadius:"50%",background:CC[c.cl]||"#666",flexShrink:0}}/>
          <span style={{fontSize:12,fontWeight:500,color:"#333",flex:1}}>{c.name}</span>
          <span style={{fontFamily:"'Source Code Pro',monospace",fontSize:10,color:"#999"}}>{c.yr}</span>
        </div>)}
      </div>}
      <div style={{position:"absolute",top:14,right:14,padding:"12px 16px",borderRadius:6,background:"#FFFDF7",border:"1px solid #D4C9B0",boxShadow:"0 2px 8px rgba(0,0,0,0.06)"}}>
        <div style={{fontSize:11,fontWeight:700,color:"#2B4C7E",marginBottom:8}}>CLAIM TYPE</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px 14px"}}>
          {Object.entries(CC).map(([t,c])=><div key={t} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:8,height:8,borderRadius:"50%",background:c,flexShrink:0}}/><span style={{fontSize:10,color:"#555"}}>{t}</span></div>)}
        </div>
      </div>
    </div>
  );
}

// ── TIMELINE ──
function TimeV({cases,stats,sel,setSel}){
  const yrs=Object.keys(stats.byYr).sort();const mx=Math.max(...Object.values(stats.byYr));
  return(
    <div style={{padding:24,overflowY:"auto",height:"100%"}}>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:"#2B4C7E",marginBottom:4}}>Litigation Timeline</h2>
      <p style={{fontSize:13,color:"#777",marginBottom:24}}>The rapid acceleration of AI-related lawsuits across the United States</p>
      {yrs.map((yr,i)=>{const cnt=stats.byYr[yr];const yc=cases.filter(c=>c.yr===parseInt(yr));
        return <div key={yr} style={{marginBottom:18,animation:"fadeUp .3s ease-out "+(0.05+i*0.04)+"s both"}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:8}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:900,color:"#2B4C7E",width:56}}>{yr}</div>
            <div style={{flex:1}}><div style={{height:30,borderRadius:6,background:"#E8E0D0",overflow:"hidden"}}><div style={{height:"100%",borderRadius:6,background:"linear-gradient(90deg,#2B4C7E,#5B7BA5)",width:(cnt/mx)*100+"%",display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:12}}><span style={{fontFamily:"'Source Code Pro',monospace",fontSize:12,fontWeight:700,color:"#FFF"}}>{cnt}</span></div></div></div>
          </div>
          <div style={{marginLeft:70,display:"flex",flexWrap:"wrap",gap:4}}>
            {yc.map(c=><button key={c.id} onClick={()=>setSel(c)} className="chip" style={{padding:"5px 10px",borderRadius:4,background:sel?.id===c.id?"rgba(43,76,126,0.1)":"#FFFDF7",border:"1px solid "+(sel?.id===c.id?"#2B4C7E":"#D4C9B0"),fontSize:11,color:"#333",display:"flex",alignItems:"center",gap:4}}><span style={{width:6,height:6,borderRadius:"50%",background:CC[c.cl]||"#666"}}/>{c.name}</button>)}
          </div>
        </div>;
      })}
    </div>
  );
}

// ── CASES TABLE ──
function CaseV({cases,sel,setSel}){
  return(
    <div style={{padding:22,overflowY:"auto",height:"100%"}}>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:"#2B4C7E",marginBottom:4}}>Case Database</h2>
      <p style={{fontSize:13,color:"#777",marginBottom:18}}>{cases.length} cases - Click any row for details</p>
      <div style={{display:"grid",gridTemplateColumns:"2.5fr 1fr 1fr .5fr .6fr",gap:10,padding:"8px 14px",borderBottom:"2px solid #C7A94F",marginBottom:4}}>
        {["Case","Claim","Sector","Year","Status"].map(h=><span key={h} style={{fontSize:10,fontWeight:700,color:"#8B6F2A",letterSpacing:"0.08em",textTransform:"uppercase"}}>{h}</span>)}
      </div>
      {cases.map((c,i)=><button key={c.id} className="trow" onClick={()=>setSel(c)} style={{display:"grid",gridTemplateColumns:"2.5fr 1fr 1fr .5fr .6fr",gap:10,padding:"9px 14px",borderRadius:4,width:"100%",textAlign:"left",background:sel?.id===c.id?"rgba(43,76,126,0.06)":"transparent",border:"1px solid "+(sel?.id===c.id?"#2B4C7E22":"transparent"),cursor:"pointer",fontFamily:"'Merriweather Sans',sans-serif",animation:"fadeUp .2s ease-out "+i*0.01+"s both"}}>
        <span style={{fontSize:12.5,fontWeight:600,color:"#1A1A2E"}}>{c.name}</span>
        <div style={{display:"flex",alignItems:"center",gap:5}}><span style={{width:7,height:7,borderRadius:"50%",background:CC[c.cl]||"#666"}}/><span style={{fontSize:11,color:"#555"}}>{c.cl}</span></div>
        <span style={{fontSize:11,color:"#777"}}>{c.sec}</span>
        <span style={{fontFamily:"'Source Code Pro',monospace",fontSize:11,color:"#999"}}>{c.yr}</span>
        <span style={{fontSize:11,fontWeight:700,color:SC[c.status]}}>{c.status}</span>
      </button>)}
    </div>
  );
}

// ── INSIGHTS ──
function InsV({cases,stats}){
  const clE=Object.entries(stats.byCl).sort((a,b)=>b[1]-a[1]);
  const yrE=Object.entries(stats.byYr).sort((a,b)=>a[0]-b[0]);
  const mxCl=clE[0]?.[1]||1;const mxYr=Math.max(...yrE.map(e=>e[1]),1);
  const defM={};cases.forEach(c=>{const d=c.df.split(",")[0].trim();defM[d]=(defM[d]||0)+1;});
  const topD=Object.entries(defM).sort((a,b)=>b[1]-a[1]).slice(0,8);
  return(
    <div style={{padding:24,overflowY:"auto",height:"100%"}}>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:800,color:"#2B4C7E",marginBottom:4}}>Litigation Insights</h2>
      <p style={{fontSize:13,color:"#777",marginBottom:22}}>Trend analysis across {cases.length} AI-related cases</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <div style={{padding:20,borderRadius:8,background:"#FFFDF7",border:"1px solid #D4C9B0"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#2B4C7E",marginBottom:14}}>Filing Trend</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:6,height:120}}>
            {yrE.map(([yr,cnt])=><div key={yr} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <span style={{fontFamily:"'Source Code Pro',monospace",fontSize:9,fontWeight:700,color:"#2B4C7E"}}>{cnt}</span>
              <div style={{width:"100%",maxWidth:40,borderRadius:4,background:"linear-gradient(180deg,#5B7BA5,#8AACB8)",height:(cnt/mxYr)*100+"%",minHeight:4}}/>
              <span style={{fontFamily:"'Source Code Pro',monospace",fontSize:8,color:"#999"}}>{String(yr).slice(-2)}</span>
            </div>)}
          </div>
        </div>
        <div style={{padding:20,borderRadius:8,background:"#FFFDF7",border:"1px solid #D4C9B0"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#2B4C7E",marginBottom:14}}>Top Defendants</div>
          {topD.map(([n,cnt])=><div key={n} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
            <span style={{fontSize:12,color:"#444",flex:1}}>{n}</span>
            <span style={{fontFamily:"'Source Code Pro',monospace",fontSize:11,fontWeight:600,color:"#2B4C7E"}}>{cnt}</span>
          </div>)}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div style={{padding:20,borderRadius:8,background:"#FFFDF7",border:"1px solid #D4C9B0"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#2B4C7E",marginBottom:14}}>By Claim Type</div>
          {clE.map(([t,cnt])=><div key={t} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:CC[t]||"#666",flexShrink:0}}/>
            <span style={{fontSize:11,color:"#555",width:120,flexShrink:0}}>{t}</span>
            <div style={{flex:1,height:14,borderRadius:4,background:"#E8E0D0",overflow:"hidden"}}><div style={{height:"100%",borderRadius:4,background:CC[t]||"#666",opacity:0.6,width:(cnt/mxCl)*100+"%"}}/></div>
            <span style={{fontFamily:"'Source Code Pro',monospace",fontSize:10,fontWeight:600,color:"#2B4C7E",width:20,textAlign:"right"}}>{cnt}</span>
          </div>)}
        </div>
        <div style={{padding:20,borderRadius:8,background:"#FFFDF7",border:"1px solid #D4C9B0"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#2B4C7E",marginBottom:14}}>Key Findings</div>
          {[{t:"Copyright Dominates",b:"Copyright claims are the largest category, driven by generative AI training data disputes.",c:"#C7A94F"},{t:"California Hub",b:"N.D. California hosts more AI cases than any other jurisdiction due to Silicon Valley.",c:"#5B7BA5"},{t:"2023-2024 Surge",b:"AI-related filings accelerated dramatically, coinciding with mainstream LLM adoption.",c:"#2B6B3E"}].map(k=><div key={k.t} style={{padding:12,borderRadius:6,background:"#F5F0E8",border:"1px solid #E8E0D0",marginBottom:8}}>
            <div style={{fontSize:12,fontWeight:700,color:k.c,marginBottom:3}}>{k.t}</div>
            <p style={{fontSize:11,color:"#666",lineHeight:1.5}}>{k.b}</p>
          </div>)}
        </div>
      </div>
    </div>
  );
}

// ── SMART CHATBOT (local search, no API needed) ──
function ChatBot({open,setOpen}){
  const[msgs,setMsgs]=useState([{role:"assistant",content:"Hello! I'm the ETI AI Litigation Assistant. Ask me anything about the 50 AI litigation cases in our database.\n\nTry questions like:\n• \"Which cases involve OpenAI?\"\n• \"Show me copyright cases from 2024\"\n• \"What cases are in California?\"\n• \"How many privacy cases are there?\"\n• \"Tell me about the NYT case\""}]);
  const[input,setInput]=useState("");
  const endRef=useRef(null);
  const scroll=()=>{setTimeout(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),50);};

  const smartSearch=(query)=>{
    const q=query.toLowerCase();
    let results=[];let intent="";

    // Detect counting questions
    const isCount=/how many|count|total|number of/.test(q);
    // Detect specific case lookup
    const isTellMe=/tell me about|details|explain|describe|what is|what's/.test(q);
    // Detect listing
    const isList=/which|show|list|find|what cases|what are/.test(q);
    // Detect stats
    const isStats=/most common|biggest|largest|top|trending|popular|breakdown|summary|overview|statistics/.test(q);

    // Search by defendant
    const defMatches=CASES.filter(c=>c.df.toLowerCase().includes(q.replace(/which cases involve |cases with |cases against |show me |find /g,"")));
    // Search by plaintiff
    const plMatches=CASES.filter(c=>c.pl.toLowerCase().includes(q.replace(/which cases involve |cases with |cases by |show me |find /g,"")));
    // Search by claim type
    const claimTypes=Object.keys(CC);
    const matchedClaim=claimTypes.find(ct=>q.includes(ct.toLowerCase()));
    // Search by state
    const stateEntries=Object.entries(SM);
    const matchedState=stateEntries.find(([abbr,data])=>q.includes(data.n.toLowerCase())||q.includes(abbr.toLowerCase()+" cases")||q==abbr.toLowerCase());
    // Search by year
    const yearMatch=q.match(/(20\d{2})/);
    // Search by status
    const statusMatch=["active","settled","decided"].find(s=>q.includes(s));
    // Search by sector
    const sectors=[...new Set(CASES.map(c=>c.sec))];
    const matchedSector=sectors.find(s=>q.includes(s.toLowerCase()));
    // General keyword search
    const keywords=q.replace(/\?|which|what|how|many|show|me|find|list|tell|about|the|are|is|in|of|cases|case|from|with|involving|involved/g,"").trim().split(/\s+/).filter(w=>w.length>2);

    // Build results based on detected patterns
    if(matchedClaim){
      results=CASES.filter(c=>c.cl===matchedClaim);
      intent="claim type: "+matchedClaim;
    }else if(matchedState){
      results=CASES.filter(c=>c.st===matchedState[0]);
      intent="state: "+matchedState[1].n;
    }else if(yearMatch){
      const yr=parseInt(yearMatch[1]);
      results=CASES.filter(c=>c.yr===yr);
      intent="year: "+yr;
    }else if(statusMatch){
      results=CASES.filter(c=>c.status.toLowerCase()===statusMatch);
      intent="status: "+statusMatch;
    }else if(matchedSector){
      results=CASES.filter(c=>c.sec.toLowerCase()===matchedSector.toLowerCase());
      intent="sector: "+matchedSector;
    }else if(defMatches.length>0){
      results=defMatches;
      intent="defendant match";
    }else if(plMatches.length>0){
      results=plMatches;
      intent="plaintiff match";
    }else if(keywords.length>0){
      results=CASES.filter(c=>{
        const blob=(c.name+" "+c.df+" "+c.pl+" "+c.desc+" "+c.sec+" "+c.cl+" "+c.jur).toLowerCase();
        return keywords.some(kw=>blob.includes(kw));
      });
      intent="keyword search";
    }

    // Generate response
    if(isStats&&!matchedClaim&&!matchedState){
      const byCl={};CASES.forEach(c=>{byCl[c.cl]=(byCl[c.cl]||0)+1;});
      const sorted=Object.entries(byCl).sort((a,b)=>b[1]-a[1]);
      const byYr={};CASES.forEach(c=>{byYr[c.yr]=(byYr[c.yr]||0)+1;});
      const defMap={};CASES.forEach(c=>{const d=c.df.split(",")[0].trim();defMap[d]=(defMap[d]||0)+1;});
      const topDef=Object.entries(defMap).sort((a,b)=>b[1]-a[1]).slice(0,5);
      return "Here's an overview of the database:\n\n"+
        "Total cases: "+CASES.length+"\n"+
        "Active: "+CASES.filter(c=>c.status==="Active").length+", Settled: "+CASES.filter(c=>c.status==="Settled").length+", Decided: "+CASES.filter(c=>c.status==="Decided").length+"\n\n"+
        "By claim type:\n"+sorted.map(([t,n])=>"  \u2022 "+t+": "+n).join("\n")+"\n\n"+
        "Top defendants:\n"+topDef.map(([d,n])=>"  \u2022 "+d+" ("+n+" cases)").join("\n")+"\n\n"+
        "Cases by year:\n"+Object.entries(byYr).sort((a,b)=>a[0]-b[0]).map(([y,n])=>"  \u2022 "+y+": "+n).join("\n");
    }

    if(results.length===0){
      return "I couldn't find cases matching that query. Try searching by:\n\u2022 Company name (e.g. \"OpenAI\", \"Meta\", \"Google\")\n\u2022 Claim type (e.g. \"Copyright\", \"Privacy\")\n\u2022 State (e.g. \"California\", \"New York\")\n\u2022 Year (e.g. \"2024\")\n\u2022 Or ask for an \"overview\" of all cases";
    }

    if(isTellMe&&results.length>=1){
      const c=results[0];
      return c.name+" ("+c.yr+")\n\n"+
        "Claim: "+c.cl+" | Sector: "+c.sec+" | Status: "+c.status+"\n"+
        "Jurisdiction: "+c.jur+" ("+SM[c.st]?.n+")\n"+
        "Plaintiff: "+c.pl+"\nDefendant: "+c.df+"\n\n"+
        c.desc+(results.length>1?"\n\nI also found "+(results.length-1)+" other related case"+(results.length>2?"s":"")+". Ask me to list them!":"");
    }

    if(isCount){
      return "I found "+results.length+" case"+(results.length!==1?"s":"")+(intent?" matching "+intent:"")+"."+
        (results.length<=6?"\n\n"+results.map(c=>"\u2022 "+c.name+" ("+c.yr+") — "+c.cl+", "+c.status).join("\n"):"");
    }

    // Default: list results
    const shown=results.slice(0,8);
    return "Found "+results.length+" case"+(results.length!==1?"s":"")+(intent?" for "+intent:"")+":\n\n"+
      shown.map(c=>"\u2022 "+c.name+" ("+c.yr+")\n  "+c.cl+" | "+c.status+" | "+c.df.split(",")[0].trim()).join("\n\n")+
      (results.length>8?"\n\n...and "+(results.length-8)+" more. Try narrowing your search.":"");
  };

  const send=()=>{
    if(!input.trim())return;
    const userMsg=input.trim();
    setInput("");
    setMsgs(prev=>[...prev,{role:"user",content:userMsg}]);
    const reply=smartSearch(userMsg);
    setTimeout(()=>{setMsgs(prev=>[...prev,{role:"assistant",content:reply}]);scroll();},300);
  };

  return(
    <>
      {/* FAB */}
      <button onClick={()=>setOpen(p=>!p)} style={{position:"fixed",bottom:24,right:24,zIndex:1000,width:56,height:56,borderRadius:"50%",background:"linear-gradient(135deg,#2B4C7E,#1A1A2E)",border:"2px solid #C7A94F",boxShadow:"0 4px 20px rgba(0,0,0,0.25)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform .2s",transform:open?"rotate(45deg)":"rotate(0)"}}>
        <span style={{fontSize:24,color:"#C7A94F"}}>{open?"+":"\u{1F4AC}"}</span>
      </button>

      {/* Panel */}
      {open&&<div style={{position:"fixed",bottom:90,right:24,zIndex:999,width:380,height:500,borderRadius:12,background:"#FFFDF7",border:"1px solid #C7A94F",boxShadow:"0 12px 48px rgba(0,0,0,0.2)",display:"flex",flexDirection:"column",overflow:"hidden",animation:"fadeUp .2s ease-out"}}>
        <div style={{padding:"14px 18px",background:"linear-gradient(135deg,#1A1A2E,#2B4C7E)",borderBottom:"2px solid #C7A94F"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,color:"#FFF"}}>ETI AI Assistant</div>
          <div style={{fontSize:10,color:"rgba(199,169,79,0.85)"}}>Ask about AI litigation cases</div>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
          {msgs.map((m,i)=><div key={i} style={{marginBottom:10,display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            <div style={{maxWidth:"85%",padding:"10px 14px",borderRadius:m.role==="user"?"12px 12px 2px 12px":"12px 12px 12px 2px",background:m.role==="user"?"#2B4C7E":"#F5F0E8",color:m.role==="user"?"#FFF":"#333",fontSize:13,lineHeight:1.5,border:m.role==="user"?"none":"1px solid #E8E0D0",whiteSpace:"pre-wrap"}}>
              {m.content}
            </div>
          </div>)}
          <div ref={endRef}/>
        </div>
        <div style={{padding:"10px 14px",borderTop:"1px solid #E8E0D0",display:"flex",gap:8}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")send();}} placeholder="Ask about AI litigation..." style={{flex:1,padding:"8px 12px",borderRadius:6,border:"1px solid #D4C9B0",background:"#FFF",fontFamily:"'Merriweather Sans',sans-serif",fontSize:12,outline:"none",color:"#333"}}/>
          <button onClick={send} style={{padding:"8px 16px",borderRadius:6,background:"#2B4C7E",border:"none",color:"#FFF",fontFamily:"'Merriweather Sans',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>Send</button>
        </div>
      </div>}
    </>
  );
}
