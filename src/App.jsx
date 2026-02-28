
import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";
import Heatmap from "./Heatmap";
import NetworkGraph from "./NetworkGraph";
import SankeyDiagram from "./SankeyDiagram";
import BarChart from "./BarChart";

// ── INSIGHTS TABS ──
function InsightsTabs({ cases }) {
  const [tab, setTab] = useState("bar");
  const tabList = [
    { key: "bar", label: "Bar Chart" },
    { key: "sankey", label: "Sankey Diagram" },
    { key: "network", label: "Network Graph" }
  ];
  return (
    <div style={{ padding: 24, overflowY: "auto", height: "100%" }}>
      <h2 style={{ fontSize: 19, fontWeight: 800, color: "#FAFAFA", letterSpacing: "-0.03em", marginBottom: 3 }}>Trends & Insights</h2>
      <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
        {tabList.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: "8px 18px",
              borderRadius: 7,
              border: tab === t.key ? "2px solid #60A5FA" : "1px solid rgba(255,255,255,0.08)",
              background: tab === t.key ? "rgba(96,165,250,0.10)" : "rgba(255,255,255,0.03)",
              color: tab === t.key ? "#60A5FA" : "#FAFAFA",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "'Outfit',sans-serif",
              transition: "all .18s"
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: 18, border: "1px solid rgba(255,255,255,0.06)", minHeight: 420 }}>
        {tab === "bar" && <BarChart cases={cases} />}
        {tab === "sankey" && <SankeyDiagram cases={cases} />}
        {tab === "network" && <NetworkGraph cases={cases} />}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   MAS AI LITIGATION MAP
   GW Law Ethical Tech Initiative — Hackathon 2026
   ═══════════════════════════════════════════════════════════════════════ */

// ── DATA ──────────────────────────────────────────────────────────────
const CASES = [
  {id:1,name:"Andersen v. Stability AI",st:"CA",jur:"N.D. Cal.",yr:2023,cl:"Copyright",sec:"Creative Arts",status:"Active",pl:"Visual Artists",df:"Stability AI, Midjourney, DeviantArt",desc:"Visual artists allege AI image generators trained on copyrighted artworks without consent."},
  {id:2,name:"Getty Images v. Stability AI",st:"DE",jur:"D. Del.",yr:2023,cl:"Copyright",sec:"Media",status:"Active",pl:"Getty Images",df:"Stability AI",desc:"Getty alleges Stability scraped 12M+ photos to train Stable Diffusion."},
  {id:3,name:"NY Times v. Microsoft & OpenAI",st:"NY",jur:"S.D.N.Y.",yr:2023,cl:"Copyright",sec:"Media",status:"Active",pl:"The New York Times",df:"Microsoft, OpenAI",desc:"NYT alleges ChatGPT and Bing Chat reproduce copyrighted news articles."},
  {id:4,name:"Authors Guild v. OpenAI",st:"NY",jur:"S.D.N.Y.",yr:2023,cl:"Copyright",sec:"Publishing",status:"Active",pl:"Authors Guild et al.",df:"OpenAI",desc:"Authors including John Grisham and George R.R. Martin allege OpenAI trained on copyrighted books."},
  {id:5,name:"Tremblay v. OpenAI",st:"CA",jur:"N.D. Cal.",yr:2023,cl:"Copyright",sec:"Publishing",status:"Active",pl:"Paul Tremblay, Mona Awad",df:"OpenAI",desc:"Authors allege ChatGPT trained using pirated copies of their books."},
  {id:6,name:"Silverman v. OpenAI",st:"CA",jur:"N.D. Cal.",yr:2023,cl:"Copyright",sec:"Entertainment",status:"Active",pl:"Sarah Silverman et al.",df:"OpenAI",desc:"Comedians allege their copyrighted books used to train ChatGPT without consent."},
  {id:7,name:"Kadrey v. Meta",st:"CA",jur:"N.D. Cal.",yr:2023,cl:"Copyright",sec:"Publishing",status:"Active",pl:"Richard Kadrey et al.",df:"Meta Platforms",desc:"Authors allege Meta used copyrighted books from 'shadow libraries' to train LLaMA."},
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
  {id:22,name:"Vance v. Amazon",st:"WA",jur:"W.D. Wash.",yr:2023,cl:"Privacy",sec:"Consumer Tech",status:"Active",pl:"Consumers",df:"Amazon",desc:"Alexa voice assistant accused of recording and analyzing children's voices without consent."},
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
  {id:38,name:"In re DoNotPay",st:"DC",jur:"FTC Admin",yr:2024,cl:"Consumer Protection",sec:"Legal Tech",status:"Settled",pl:"FTC",df:"DoNotPay Inc.",desc:"FTC settlement over 'robot lawyer' AI making deceptive claims about legal capabilities."},
  {id:39,name:"FTC v. Ascend Capventures",st:"CA",jur:"C.D. Cal.",yr:2024,cl:"Consumer Protection",sec:"Technology",status:"Active",pl:"FTC",df:"Ascend Capventures",desc:"FTC crackdown on deceptive AI income claims."},
  {id:40,name:"FTC v. TheFBAMachine",st:"NJ",jur:"D.N.J.",yr:2024,cl:"Consumer Protection",sec:"E-Commerce",status:"Active",pl:"FTC",df:"TheFBAMachine Inc.",desc:"FTC action against deceptive AI-powered Amazon store scheme."},
  {id:41,name:"FTC v. Empire Holdings",st:"PA",jur:"E.D. Pa.",yr:2024,cl:"Consumer Protection",sec:"Technology",status:"Active",pl:"FTC",df:"Empire Holdings Group",desc:"FTC crackdown on deceptive AI business opportunity claims."},
  {id:42,name:"In re Rytr LLC",st:"DC",jur:"FTC Admin",yr:2024,cl:"Consumer Protection",sec:"Technology",status:"Settled",pl:"FTC",df:"Rytr LLC",desc:"FTC action against AI writing tool for generating fake product reviews."},
  {id:43,name:"Boshart v. Sprinklr",st:"NY",jur:"S.D.N.Y.",yr:2024,cl:"Securities Fraud",sec:"Technology",status:"Active",pl:"Investors",df:"Sprinklr Inc.",desc:"Investors allege Sprinklr overstated AI capabilities ('AI washing')."},
  {id:44,name:"Hoare v. Oddity Tech",st:"NY",jur:"S.D.N.Y.",yr:2024,cl:"Securities Fraud",sec:"Consumer Tech",status:"Active",pl:"Investors",df:"Oddity Tech Ltd.",desc:"Alleged overstatement of AI beauty platform capabilities; 'AI washing'."},
  {id:45,name:"Barry v. Lyon",st:"FL",jur:"S.D. Fla.",yr:2024,cl:"Right of Publicity",sec:"Entertainment",status:"Active",pl:"Barry",df:"Lyon",desc:"AI-generated deepfake content alleged to violate right of publicity."},
  {id:46,name:"TikTok v. Garland",st:"DC",jur:"D.C. Cir.",yr:2024,cl:"First Amendment",sec:"Social Media",status:"Decided",pl:"TikTok, ByteDance",df:"AG Garland",desc:"Challenge to federal ban of AI-enabled social media app on First Amendment grounds."},
  {id:47,name:"Gonzalez v. Google",st:"DC",jur:"U.S. Supreme Ct.",yr:2023,cl:"Section 230",sec:"Technology",status:"Decided",pl:"Gonzalez family",df:"Google",desc:"Whether YouTube AI recommendation algorithm is protected by Section 230."},
  {id:48,name:"In re Social Media Addiction MDL",st:"CA",jur:"N.D. Cal.",yr:2022,cl:"Product Liability",sec:"Social Media",status:"Active",pl:"School districts, families",df:"Meta, TikTok, Snap, Google",desc:"MDL alleging AI-driven algorithms deliberately designed to addict minors."},
  {id:49,name:"Lyman v. Alphabet",st:"CA",jur:"N.D. Cal.",yr:2024,cl:"Consumer Protection",sec:"Technology",status:"Active",pl:"Lyman",df:"Alphabet/Google",desc:"Alleges Google AI Overviews provides dangerously inaccurate medical information."},
  {id:50,name:"Doe v. Emory University",st:"GA",jur:"N.D. Ga.",yr:2024,cl:"Due Process",sec:"Education",status:"Active",pl:"Student Doe",df:"Emory University",desc:"Students challenged disciplinary proceedings over use of AI-based learning tool."},
];

const CC = {"Copyright":"#FF6B4A","Privacy":"#A78BFA","Discrimination":"#34D399","Product Liability":"#FBBF24","Consumer Protection":"#60A5FA","Due Process":"#F97316","Securities Fraud":"#EF4444","IP / Patent":"#FB923C","Right of Publicity":"#C084FC","First Amendment":"#2DD4BF","Section 230":"#38BDF8","Wrongful Death":"#94A3B8"};
const SC = {Active:"#34D399",Settled:"#FBBF24",Decided:"#60A5FA"};

// Simple US state coordinates (pixel positions on 800x500 canvas)
const SM = {
  AL:{x:590,y:365,n:"Alabama"},AZ:{x:185,y:345,n:"Arizona"},AR:{x:500,y:350,n:"Arkansas"},
  CA:{x:95,y:280,n:"California"},CO:{x:275,y:270,n:"Colorado"},CT:{x:725,y:195,n:"Connecticut"},
  DE:{x:705,y:255,n:"Delaware"},DC:{x:695,y:270,n:"D.C."},FL:{x:640,y:430,n:"Florida"},
  GA:{x:625,y:375,n:"Georgia"},IL:{x:530,y:255,n:"Illinois"},IN:{x:565,y:255,n:"Indiana"},
  KS:{x:395,y:295,n:"Kansas"},KY:{x:590,y:300,n:"Kentucky"},LA:{x:500,y:400,n:"Louisiana"},
  MD:{x:690,y:260,n:"Maryland"},MA:{x:735,y:185,n:"Massachusetts"},MI:{x:565,y:195,n:"Michigan"},
  MN:{x:445,y:150,n:"Minnesota"},MS:{x:535,y:380,n:"Mississippi"},MO:{x:485,y:300,n:"Missouri"},
  NJ:{x:715,y:240,n:"New Jersey"},NY:{x:700,y:190,n:"New York"},NC:{x:660,y:325,n:"North Carolina"},
  OH:{x:600,y:245,n:"Ohio"},OK:{x:415,y:340,n:"Oklahoma"},OR:{x:115,y:150,n:"Oregon"},
  PA:{x:675,y:230,n:"Pennsylvania"},TN:{x:575,y:330,n:"Tennessee"},TX:{x:380,y:400,n:"Texas"},
  VA:{x:670,y:290,n:"Virginia"},WA:{x:130,y:100,n:"Washington"},WI:{x:495,y:170,n:"Wisconsin"},
};

// ── MAIN APP ──────────────────────────────────────────────────────────
export default function App() {
  const [filters, setFilters] = useState({years:[],claims:[],sectors:[],statuses:[]});
  const [search, setSearch] = useState("");
  const [view, setView] = useState("map");
  const [page, setPage] = useState("main"); // 'main', 'timeline', 'cases', 'insights'
  // Visualization selector options
  const vizOptions = [
    { k: "map", l: "Map" }
  ];
  const [sel, setSel] = useState(null);
  const [hov, setHov] = useState(null);
  const [sidebar, setSidebar] = useState(true);

  const allYears = useMemo(() => [...new Set(CASES.map(c=>c.yr))].sort(), []);
  const allClaims = useMemo(() => [...new Set(CASES.map(c=>c.cl))].sort(), []);
  const allSectors = useMemo(() => [...new Set(CASES.map(c=>c.sec))].sort(), []);

  const filtered = useMemo(() => CASES.filter(c => {
    if (filters.years.length && !filters.years.includes(c.yr)) return false;
    if (filters.claims.length && !filters.claims.includes(c.cl)) return false;
    if (filters.sectors.length && !filters.sectors.includes(c.sec)) return false;
    if (filters.statuses.length && !filters.statuses.includes(c.status)) return false;
    if (search) {
      const q = search.toLowerCase();
      return [c.name,c.pl,c.df,c.desc,c.sec,c.cl].some(s=>s.toLowerCase().includes(q));
    }
    return true;
  }), [filters, search]);

  const byState = useMemo(() => {
    const m = {};
    filtered.forEach(c => { (m[c.st]=m[c.st]||[]).push(c); });
    return m;
  }, [filtered]);

  const stats = useMemo(() => {
    const byCl={},bySec={},byYr={},bySt={};
    filtered.forEach(c => {
      byCl[c.cl]=(byCl[c.cl]||0)+1;
      bySec[c.sec]=(bySec[c.sec]||0)+1;
      byYr[c.yr]=(byYr[c.yr]||0)+1;
      bySt[c.status]=(bySt[c.status]||0)+1;
    });
    return {byCl,bySec,byYr,bySt};
  }, [filtered]);

  const tog = useCallback((cat,val) => {
    setFilters(p=>({...p,[cat]:p[cat].includes(val)?p[cat].filter(v=>v!==val):[...p[cat],val]}));
  }, []);

  const clr = useCallback(() => {
    setFilters({years:[],claims:[],sectors:[],statuses:[]});
    setSearch(""); setSel(null);
  }, []);

  const fc = Object.values(filters).flat().length+(search?1:0);

  return (
    <div style={{fontFamily:"'Outfit',sans-serif",background:"#09090B",color:"#FAFAFA",height:"100vh",overflow:"hidden",position:"relative"}}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Outfit',sans-serif;background:#09090B;color:#FAFAFA}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.08);border-radius:10px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
        @keyframes breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
        .chip{transition:all .2s;cursor:pointer;user-select:none;border:none;font-family:'Outfit',sans-serif}
        .chip:hover{transform:translateY(-1px)}
        .row:hover{background:rgba(255,255,255,0.04)!important}
        .dot{transition:all .25s;cursor:pointer}
        .dot:hover{filter:brightness(1.4) drop-shadow(0 0 8px currentColor)}
      `}</style>

      {/* BG */}
      <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}>
        <div style={{position:"absolute",top:"-30%",right:"-20%",width:"60vw",height:"60vw",background:"radial-gradient(circle,rgba(255,107,74,0.05) 0%,transparent 70%)",filter:"blur(60px)",animation:"breathe 8s ease-in-out infinite"}}/>
        <div style={{position:"absolute",bottom:"-20%",left:"-10%",width:"45vw",height:"45vw",background:"radial-gradient(circle,rgba(96,165,250,0.04) 0%,transparent 70%)",filter:"blur(50px)",animation:"breathe 12s ease-in-out infinite 3s"}}/>
        <div style={{position:"absolute",inset:0,opacity:0.012,backgroundImage:"radial-gradient(rgba(255,255,255,0.5) 1px,transparent 1px)",backgroundSize:"24px 24px"}}/>
      </div>

      {/* NAV */}
      <nav style={{position:"relative",zIndex:50,padding:"0 28px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(9,9,11,0.85)",backdropFilter:"blur(20px)"}}>
        <div style={{display:"flex",alignItems:"center",gap:18}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}>
            <div style={{width:28,height:28,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg,#FF6B4A,#FF8F6B)",boxShadow:"0 2px 12px rgba(255,107,74,0.3)"}}>
              <span style={{fontSize:13,fontWeight:900,color:"#FFF"}}>M</span>
            </div>
            <div>
              <div style={{fontSize:14,fontWeight:700,color:"#FAFAFA",letterSpacing:"-0.02em",lineHeight:1}}>MAS AI Litigation Map</div>
              <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.3)",letterSpacing:"0.15em",textTransform:"uppercase",marginTop:1}}>GW Law Ethical Tech Initiative</div>
            </div>
          </div>
          <div style={{width:1,height:22,background:"rgba(255,255,255,0.08)"}}/>
          {/* Visualization Selector */}
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginRight:4}}>View:</span>
            <select
              value={view}
              onChange={e => { setView(e.target.value); setPage("main"); setSel(null); }}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.06)",
                color: "#FAFAFA",
                fontFamily: "'Outfit',sans-serif",
                fontSize: 12,
                fontWeight: 500,
                outline: "none",
                cursor: "pointer",
                appearance: "none"
              }}
            >
              {vizOptions.map(opt => (
                <option key={opt.k} value={opt.k} style={{color:'#18181B',background:'#FFF'}}>{opt.l}</option>
              ))}
            </select>
            <style>{`
              select option {
                color: #18181B !important;
                background: #FFF !important;
              }
            `}</style>
          </div>
          {/* Add navigation buttons for Timeline, Cases, Insights */}
          <div style={{display:"flex",alignItems:"center",gap:6,marginLeft:18}}>
            <button onClick={()=>{setPage("timeline"); setSel(null);}} style={{padding:"6px 14px",borderRadius:6,border:page==="timeline"?"1.5px solid #FF6B4A":"1px solid rgba(255,255,255,0.08)",background:page==="timeline"?"rgba(255,107,74,0.10)":"rgba(255,255,255,0.06)",color:page==="timeline"?"#FF6B4A":"#FAFAFA",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>Timeline</button>
            <button onClick={()=>{setPage("cases"); setSel(null);}} style={{padding:"6px 14px",borderRadius:6,border:page==="cases"?"1.5px solid #60A5FA":"1px solid rgba(255,255,255,0.08)",background:page==="cases"?"rgba(96,165,250,0.10)":"rgba(255,255,255,0.06)",color:page==="cases"?"#60A5FA":"#FAFAFA",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>Cases</button>
            <button onClick={()=>{setPage("insights"); setSel(null);}} style={{padding:"6px 14px",borderRadius:6,border:page==="insights"?"1.5px solid #34D399":"1px solid rgba(255,255,255,0.08)",background:page==="insights"?"rgba(52,211,153,0.10)":"rgba(255,255,255,0.06)",color:page==="insights"?"#34D399":"#FAFAFA",fontFamily:"'Outfit',sans-serif",fontSize:12,fontWeight:600,cursor:"pointer"}}>Trends & Insights</button>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{position:"relative"}}>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search cases, parties, claims..." style={{width:240,padding:"7px 12px 7px 30px",borderRadius:7,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.04)",color:"#FAFAFA",fontFamily:"'Outfit',sans-serif",fontSize:12,outline:"none"}}/>
            <span style={{position:"absolute",left:10,top:"50%",transform:"translateY(-50%)",fontSize:12,color:"rgba(255,255,255,0.2)"}}>⌕</span>
          </div>
          <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.25)",padding:"3px 8px",borderRadius:4,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.05)"}}>{filtered.length}/{CASES.length}</span>
        </div>
      </nav>

      {/* BODY */}
      <div style={{display:"flex",height:"calc(100vh - 54px)",position:"relative",zIndex:1}}>

        {/* SIDEBAR */}
        <aside style={{width:sidebar?320:0,overflow:"hidden",flexShrink:0,borderRight:"1px solid rgba(255,255,255,0.05)",background:"rgba(255,255,255,0.01)",transition:"width .3s"}}>
          <div style={{width:320,padding:"24px 20px",overflowY:"auto",height:"100%"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
              <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,fontWeight:600,color:"rgba(255,255,255,0.25)",letterSpacing:"0.12em",textTransform:"uppercase"}}>Filters</span>
              {fc>0&&<button onClick={clr} style={{padding:"2px 7px",borderRadius:4,border:"1px solid rgba(255,107,74,0.3)",background:"rgba(255,107,74,0.08)",color:"#FF6B4A",fontFamily:"'Outfit',sans-serif",fontSize:10,cursor:"pointer"}}>Clear {fc}</button>}
            </div>
            <FB t="Year" items={allYears} act={filters.years} tog={v=>tog("years",v)} gc={()=>"#FF6B4A"} cnt={stats.byYr}/>
            <FB t="Claim Type" items={allClaims} act={filters.claims} tog={v=>tog("claims",v)} gc={v=>CC[v]} cnt={stats.byCl}/>
            <FB t="Sector" items={allSectors} act={filters.sectors} tog={v=>tog("sectors",v)} gc={()=>"#60A5FA"} cnt={stats.bySec}/>
            <FB t="Status" items={["Active","Settled","Decided"]} act={filters.statuses} tog={v=>tog("statuses",v)} gc={v=>SC[v]} cnt={stats.bySt}/>
            <div style={{marginTop:18,padding:10,borderRadius:7,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)"}}>
              <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,fontWeight:600,color:"rgba(255,255,255,0.2)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:5}}>Methodology</div>
              <p style={{fontSize:9.5,color:"rgba(255,255,255,0.25)",lineHeight:1.5}}>Data from GW Law DAIL database, public court records, FTC enforcement actions, and legal research. Geographic mapping by filing jurisdiction. For research/educational purposes only.</p>
            </div>
          </div>
        </aside>
        <button onClick={()=>setSidebar(p=>!p)} style={{position:"absolute",left:sidebar?218:-1,top:10,zIndex:20,width:22,height:22,borderRadius:5,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(9,9,11,0.9)",color:"rgba(255,255,255,0.35)",cursor:"pointer",fontSize:9,display:"flex",alignItems:"center",justifyContent:"center",transition:"left .3s",fontFamily:"'Outfit',sans-serif"}}>{sidebar?"◂":"▸"}</button>

        {/* MAIN */}
        <main style={{flex:1,overflow:"hidden",position:"relative"}}>
          {page==="main" && (
            <>
              {view==="map"&&<MapV cases={filtered} byState={byState} hov={hov} setHov={setHov} sel={sel} setSel={setSel}/>}
            </>
          )}
          {page==="timeline" && <TimeV cases={filtered} stats={stats} sel={sel} setSel={setSel} />}
          {page==="cases" && <CaseV cases={filtered} sel={sel} setSel={setSel} />}
        {page==="insights" && <InsightsTabs cases={filtered} />}
        </main>

        {/* DETAIL */}
        {sel&&<Detail c={sel} onClose={()=>setSel(null)} setSel={setSel}/>}
      </div>
    </div>
  );
}

// ── Filter Block ──
function FB({t,items,act,tog,gc,cnt}) {
  const [open,setOpen]=useState(true);
  return (
    <div style={{marginBottom:18}}>
      <button onClick={()=>setOpen(p=>!p)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:"none",border:"none",cursor:"pointer",padding:"6px 0",marginBottom:8}}>
        <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:13,fontWeight:700,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em",textTransform:"uppercase"}}>{t}</span>
        <span style={{fontSize:12,color:"rgba(255,255,255,0.15)",transform:open?"rotate(0)":"rotate(-90deg)",transition:"transform .2s"}}>▾</span>
      </button>
      {open&&items.map(item=>{
        const on=act.includes(item);const color=gc(item)||"#60A5FA";
        return <button key={item} className="chip" onClick={()=>tog(item)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",padding:"8px 14px",borderRadius:6,border:`1.5px solid ${on?color+"33":"transparent"}`,background:on?color+"18":"transparent",marginBottom:3}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:9,height:9,borderRadius:3,background:on?color:"rgba(255,255,255,0.1)",transition:"all .2s"}}/>
            <span style={{fontSize:15,color:on?"#FAFAFA":"rgba(255,255,255,0.38)",fontWeight:on?600:400}}>{item}</span>
          </div>
          <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:13,color:"rgba(255,255,255,0.18)"}}>{cnt[item]||0}</span>
        </button>;
      })}
    </div>
  );
}

// ── Detail Panel ──
function Detail({c,onClose,setSel}) {
  const color=CC[c.cl]||"#60A5FA";
  const related=CASES.filter(r=>r.id!==c.id&&(r.cl===c.cl||r.sec===c.sec)).slice(0,4);
  return (
    <aside style={{width:330,flexShrink:0,overflowY:"auto",borderLeft:"1px solid rgba(255,255,255,0.06)",background:"rgba(9,9,11,0.95)",backdropFilter:"blur(20px)",animation:"slideIn .25s ease-out",padding:"18px 16px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
        <span style={{fontFamily:"'IBM Plex Mono',monospace",padding:"3px 8px",borderRadius:4,fontSize:10,fontWeight:600,background:color+"18",color,border:`1px solid ${color}30`}}>{c.cl}</span>
        <button onClick={onClose} style={{background:"rgba(255,255,255,0.05)",border:"none",color:"rgba(255,255,255,0.4)",width:24,height:24,borderRadius:6,cursor:"pointer",fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Outfit',sans-serif"}}>✕</button>
      </div>
      <h2 style={{fontSize:17,fontWeight:700,color:"#FAFAFA",lineHeight:1.25,marginBottom:12,letterSpacing:"-0.02em"}}>{c.name}</h2>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7,marginBottom:14,padding:12,borderRadius:8,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
        {[{l:"Jurisdiction",v:c.jur},{l:"State",v:SM[c.st]?.n||c.st},{l:"Filed",v:c.yr},{l:"Status",v:c.status,c:SC[c.status]},{l:"Sector",v:c.sec}].map(r=><div key={r.l}><div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:2}}>{r.l}</div><div style={{fontSize:12,fontWeight:500,color:r.c||"#FAFAFA"}}>{r.v}</div></div>)}
      </div>
      {[{l:"Plaintiff",v:c.pl},{l:"Defendant",v:c.df}].map(p=><div key={p.l} style={{marginBottom:6,padding:"8px 10px",borderRadius:6,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)"}}><div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:2}}>{p.l}</div><div style={{fontSize:12,fontWeight:500,color:"#FAFAFA"}}>{p.v}</div></div>)}
      <div style={{padding:12,borderRadius:8,marginTop:6,marginBottom:16,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)"}}>
        <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:5}}>Summary</div>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.6)",lineHeight:1.65}}>{c.desc}</p>
      </div>
      {related.length>0&&<div>
        <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:6}}>Related Cases</div>
        {related.map(r=><button key={r.id} onClick={()=>setSel(r)} style={{display:"block",width:"100%",textAlign:"left",padding:"6px 8px",marginBottom:2,borderRadius:5,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)",cursor:"pointer",fontFamily:"'Outfit',sans-serif",color:"#FAFAFA",fontSize:11,fontWeight:500}}>{r.name} <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.25)",marginLeft:6}}>{r.yr}</span></button>)}
      </div>}
    </aside>
  );
}

// ══════════════════════════════════════════════════════════════════════
// MAP VIEW — Pure SVG, no d3
// ══════════════════════════════════════════════════════════════════════
function MapV({cases,byState,hov,setHov,sel,setSel}) {
  const mx = Math.max(...Object.values(byState).map(a=>a.length),1);
  return (
    <div style={{width:"100%",height:"100%",position:"relative",overflow:"hidden"}}>
      {/* Stats */}
      <div style={{position:"absolute",top:14,left:14,right:14,zIndex:10,display:"flex",gap:8,flexWrap:"wrap"}}>
        {[{l:"Total Cases",v:cases.length,c:"#FF6B4A"},{l:"Active",v:cases.filter(c=>c.status==="Active").length,c:"#34D399"},{l:"Settled",v:cases.filter(c=>c.status==="Settled").length,c:"#FBBF24"},{l:"Decided",v:cases.filter(c=>c.status==="Decided").length,c:"#60A5FA"},{l:"Jurisdictions",v:Object.keys(byState).length,c:"#C084FC"}].map((s,i)=>(
          <div key={s.l} style={{padding:"9px 14px",borderRadius:9,background:"rgba(9,9,11,0.85)",border:"1px solid rgba(255,255,255,0.06)",backdropFilter:"blur(16px)",animation:`fadeUp .4s ease-out ${.05+i*.04}s both`}}>
            <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.3)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:2}}>{s.l}</div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:s.c,letterSpacing:"-0.03em",fontVariantNumeric:"tabular-nums"}}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* SVG Map */}
      <svg viewBox="0 0 800 500" style={{width:"100%",height:"100%",padding:"50px 10px 10px"}}>
        {Object.entries(SM).map(([abbr,coord])=>{
          const cs=byState[abbr]||[];
          if(cs.length===0) return <circle key={abbr} cx={coord.x} cy={coord.y} r={2.5} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.07)" strokeWidth={0.5}/>;
          const r=7+(cs.length/mx)*28;
          const isH=hov===abbr;
          const clMap={};cs.forEach(c=>clMap[c.cl]=(clMap[c.cl]||0)+1);
          const top=Object.entries(clMap).sort((a,b)=>b[1]-a[1])[0][0];
          const color=CC[top]||"#FF6B4A";
          return (
            <g key={abbr} className="dot" onMouseEnter={()=>setHov(abbr)} onMouseLeave={()=>setHov(null)} onClick={()=>{if(cs.length===1)setSel(cs[0]);}}>
              <circle cx={coord.x} cy={coord.y} r={r+8} fill={`${color}06`}/>
              <circle cx={coord.x} cy={coord.y} r={r} fill={`${color}${isH?"30":"18"}`} stroke={isH?color:`${color}50`} strokeWidth={isH?2:1} style={{transition:"all .2s"}}/>
              <circle cx={coord.x} cy={coord.y} r={Math.max(3,r*.3)} fill={color} opacity={0.85}/>
              {cs.length>1&&<text x={coord.x} y={coord.y+1} textAnchor="middle" dominantBaseline="central" style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:Math.max(9,r*.4),fill:"#FFF",pointerEvents:"none"}}>{cs.length}</text>}
              <text x={coord.x} y={coord.y+r+12} textAnchor="middle" style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:7.5,fontWeight:600,fill:isH?"#FAFAFA":"rgba(255,255,255,0.2)",transition:"fill .2s",pointerEvents:"none"}}>{abbr}</text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {hov&&byState[hov]&&<div style={{position:"absolute",bottom:16,left:16,zIndex:20,maxWidth:340,padding:"12px 16px",borderRadius:10,background:"rgba(9,9,11,0.95)",border:"1px solid rgba(255,255,255,0.1)",backdropFilter:"blur(20px)",boxShadow:"0 12px 40px rgba(0,0,0,0.5)",animation:"fadeUp .12s ease-out"}}>
        <div style={{fontWeight:700,fontSize:13,color:"#FAFAFA",marginBottom:6}}>{SM[hov]?.n} <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.35)",fontWeight:400,marginLeft:6}}>{byState[hov].length} case{byState[hov].length>1?"s":""}</span></div>
        {byState[hov].slice(0,5).map(c=><div key={c.id} onClick={()=>setSel(c)} style={{display:"flex",alignItems:"center",gap:7,padding:"4px 6px",borderRadius:4,cursor:"pointer",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
          <div style={{width:5,height:5,borderRadius:2,background:CC[c.cl]||"#666",flexShrink:0}}/>
          <span style={{fontSize:11,fontWeight:500,color:"#FAFAFA",flex:1}}>{c.name}</span>
          <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.25)"}}>{c.yr}</span>
        </div>)}
        {byState[hov].length>5&&<div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.2)",marginTop:4,paddingLeft:6}}>+{byState[hov].length-5} more</div>}
      </div>}

      {/* Legend */}
      <div style={{position:"absolute",bottom:14,right:14,zIndex:10,padding:"10px 14px",borderRadius:8,background:"rgba(9,9,11,0.85)",border:"1px solid rgba(255,255,255,0.06)",backdropFilter:"blur(16px)"}}>
        <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:8,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:6}}>Claim Type</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"3px 16px"}}>
          {Object.entries(CC).map(([t,c])=><div key={t} style={{display:"flex",alignItems:"center",gap:5}}><div style={{width:5,height:5,borderRadius:2,background:c,flexShrink:0}}/><span style={{fontSize:9,color:"rgba(255,255,255,0.4)"}}>{t}</span></div>)}
        </div>
      </div>
    </div>
  );
}

// ── TIMELINE ──
function TimeV({cases,stats,sel,setSel}) {
  const yrs=Object.keys(stats.byYr).sort();
  const mx=Math.max(...Object.values(stats.byYr));
  return (
    <div style={{padding:24,overflowY:"auto",height:"100%"}}>
      <h2 style={{fontSize:19,fontWeight:800,color:"#FAFAFA",letterSpacing:"-0.03em",marginBottom:3}}>Litigation Timeline</h2>
      <p style={{fontSize:12,color:"rgba(255,255,255,0.38)",marginBottom:24}}>The rapid acceleration of AI-related lawsuits across the United States</p>
      {yrs.map((yr,i)=>{
        const cnt=stats.byYr[yr];const yc=cases.filter(c=>c.yr===parseInt(yr));
        return <div key={yr} style={{marginBottom:18,animation:`fadeUp .35s ease-out ${.05+i*.04}s both`}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:8}}>
            <div style={{fontSize:26,fontWeight:900,color:"#FAFAFA",width:50,letterSpacing:"-0.04em"}}>{yr}</div>
            <div style={{flex:1}}><div style={{height:28,borderRadius:7,background:"rgba(255,255,255,0.03)",overflow:"hidden"}}><div style={{height:"100%",borderRadius:7,background:"linear-gradient(90deg,#FF6B4A,rgba(255,107,74,0.35))",width:`${(cnt/mx)*100}%`,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:10,transition:"width .6s"}}><span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:11,fontWeight:700,color:"#FFF"}}>{cnt}</span></div></div></div>
          </div>
          <div style={{marginLeft:64,display:"flex",flexWrap:"wrap",gap:4}}>
            {yc.map(c=><button key={c.id} onClick={()=>setSel(c)} className="chip" style={{padding:"4px 9px",borderRadius:5,background:sel?.id===c.id?"rgba(255,107,74,0.12)":"rgba(255,255,255,0.03)",border:`1px solid ${sel?.id===c.id?"rgba(255,107,74,0.3)":"rgba(255,255,255,0.05)"}`,fontSize:10.5,color:"rgba(255,255,255,0.6)",display:"flex",alignItems:"center",gap:4}}><span style={{width:4,height:4,borderRadius:2,background:CC[c.cl]||"#666"}}/>{c.name}</button>)}
          </div>
        </div>;
      })}
    </div>
  );
}

// ── CASES TABLE ──
function CaseV({cases,sel,setSel}) {
  return (
    <div style={{padding:22,overflowY:"auto",height:"100%"}}>
      <h2 style={{fontSize:19,fontWeight:800,color:"#FAFAFA",letterSpacing:"-0.03em",marginBottom:3}}>Case Database</h2>
      <p style={{fontSize:12,color:"rgba(255,255,255,0.38)",marginBottom:18}}>{cases.length} cases — Click any row for details</p>
      <div style={{display:"grid",gridTemplateColumns:"2.5fr 1fr 1fr .5fr .6fr",gap:10,padding:"6px 12px",borderBottom:"1px solid rgba(255,255,255,0.06)",marginBottom:3}}>
        {["Case","Claim","Sector","Year","Status"].map(h=><span key={h} style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,fontWeight:600,color:"rgba(255,255,255,0.2)",letterSpacing:"0.08em",textTransform:"uppercase"}}>{h}</span>)}
      </div>
      {cases.map((c,i)=><button key={c.id} className="row" onClick={()=>setSel(c)} style={{display:"grid",gridTemplateColumns:"2.5fr 1fr 1fr .5fr .6fr",gap:10,padding:"8px 12px",borderRadius:6,width:"100%",textAlign:"left",background:sel?.id===c.id?"rgba(255,107,74,0.06)":"transparent",border:`1px solid ${sel?.id===c.id?"rgba(255,107,74,0.15)":"rgba(255,255,255,0.02)"}`,cursor:"pointer",fontFamily:"'Outfit',sans-serif",animation:`fadeUp .25s ease-out ${i*.012}s both`,transition:"background .15s"}}>
        <span style={{fontSize:12,fontWeight:600,color:"#FAFAFA"}}>{c.name}</span>
        <div style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:5,height:5,borderRadius:2,background:CC[c.cl]||"#666"}}/><span style={{fontSize:11,color:CC[c.cl]||"rgba(255,255,255,0.4)"}}>{c.cl}</span></div>
        <span style={{fontSize:11,color:"rgba(255,255,255,0.4)"}}>{c.sec}</span>
        <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:10,color:"rgba(255,255,255,0.3)"}}>{c.yr}</span>
        <span style={{fontSize:10,fontWeight:600,color:SC[c.status]}}>{c.status}</span>
      </button>)}
    </div>
  );
}

// ── INSIGHTS ──
function InsV({cases,stats,setSel,title}) {
  const clE=Object.entries(stats.byCl).sort((a,b)=>b[1]-a[1]);
  const secE=Object.entries(stats.bySec).sort((a,b)=>b[1]-a[1]);
  const yrE=Object.entries(stats.byYr).sort((a,b)=>a[0]-b[0]);
  const mxCl=clE[0]?.[1]||1;const mxSec=secE[0]?.[1]||1;const mxYr=Math.max(...yrE.map(e=>e[1]),1);
  const defM={};cases.forEach(c=>{const d=c.df.split(",")[0].trim();defM[d]=(defM[d]||0)+1;});
  const topD=Object.entries(defM).sort((a,b)=>b[1]-a[1]).slice(0,8);
  return (
    <div style={{padding:24,overflowY:"auto",height:"100%"}}>
      <h2 style={{fontSize:19,fontWeight:800,color:"#FAFAFA",letterSpacing:"-0.03em",marginBottom:3}}>{title || "Trends & Insights"}</h2>
      <p style={{fontSize:12,color:"rgba(255,255,255,0.38)",marginBottom:22}}>Trend analysis across {cases.length} AI-related cases</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
        {/* Year chart */}
        <div style={{padding:18,borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:14}}>Filing Trend</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:5,height:110}}>
            {yrE.map(([yr,cnt])=><div key={yr} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,fontWeight:700,color:"#FF6B4A"}}>{cnt}</span>
              <div style={{width:"100%",maxWidth:36,borderRadius:3,background:"linear-gradient(180deg,#FF6B4A,rgba(255,107,74,0.25))",height:`${(cnt/mxYr)*100}%`,minHeight:3}}/>
              <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:7.5,color:"rgba(255,255,255,0.2)"}}>{String(yr).slice(-2)}</span>
            </div>)}
          </div>
        </div>
        {/* Top defendants */}
        <div style={{padding:18,borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>Top Defendants</div>
          {topD.map(([n,cnt])=><div key={n} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
            <span style={{fontSize:10.5,color:"rgba(255,255,255,0.55)",width:110,flexShrink:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{n}</span>
            <div style={{flex:1,height:12,borderRadius:3,background:"rgba(255,255,255,0.03)",overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:"rgba(167,139,250,0.5)",width:`${(cnt/topD[0][1])*100}%`}}/></div>
            <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,fontWeight:600,color:"#A78BFA",width:16,textAlign:"right"}}>{cnt}</span>
          </div>)}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}}>
        {/* Claims */}
        <div style={{padding:18,borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>By Claim Type</div>
          {clE.map(([t,cnt])=><div key={t} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
            <div style={{width:5,height:5,borderRadius:2,background:CC[t]||"#666",flexShrink:0}}/><span style={{fontSize:10.5,color:"rgba(255,255,255,0.4)",width:120,flexShrink:0}}>{t}</span>
            <div style={{flex:1,height:12,borderRadius:3,background:"rgba(255,255,255,0.03)",overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:CC[t]||"#666",opacity:0.6,width:`${(cnt/mxCl)*100}%`}}/></div>
            <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,fontWeight:600,color:"#FAFAFA",width:18,textAlign:"right"}}>{cnt}</span>
          </div>)}
        </div>
        {/* Sectors */}
        <div style={{padding:18,borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
          <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:12}}>By Sector</div>
          {secE.map(([t,cnt])=><div key={t} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
            <span style={{fontSize:10.5,color:"rgba(255,255,255,0.4)",width:120,flexShrink:0}}>{t}</span>
            <div style={{flex:1,height:12,borderRadius:3,background:"rgba(255,255,255,0.03)",overflow:"hidden"}}><div style={{height:"100%",borderRadius:3,background:"#60A5FA",opacity:0.45,width:`${(cnt/mxSec)*100}%`}}/></div>
            <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,fontWeight:600,color:"#FAFAFA",width:18,textAlign:"right"}}>{cnt}</span>
          </div>)}
        </div>
      </div>
      {/* Findings */}
      <div style={{padding:18,borderRadius:12,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)"}}>
        <div style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:9,color:"rgba(255,255,255,0.25)",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>Key Findings</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
          {[{t:"Copyright Dominates",b:"Copyright claims are the largest category, driven by generative AI training data disputes between content creators and AI developers.",c:"#FF6B4A"},{t:"California Hub",b:"The Northern District of California hosts more AI cases than any other jurisdiction due to Silicon Valley's concentration of AI companies.",c:"#60A5FA"},{t:"2023-2024 Surge",b:"AI-related filings accelerated dramatically in 2023-2024, coinciding with mainstream adoption of large language models.",c:"#34D399"}].map(k=><div key={k.t} style={{padding:12,borderRadius:8,background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)"}}>
            <div style={{fontSize:12.5,fontWeight:700,color:k.c,marginBottom:5}}>{k.t}</div>
            <p style={{fontSize:11,color:"rgba(255,255,255,0.4)",lineHeight:1.55}}>{k.b}</p>
          </div>)}
        </div>
      </div>
    </div>
  );
}
