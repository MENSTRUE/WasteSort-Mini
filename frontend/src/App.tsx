import { useCallback, useEffect, useRef, useState } from 'react';
import { Activity, ArrowDownRight, ArrowRight, Check, CheckCircle2, ChevronDown, Clock3, CloudUpload, Code2, Cpu, ExternalLink, FileImage, History, Info, Layers3, Leaf, LoaderCircle, LockKeyhole, Menu, Microscope, RotateCcw, ScanSearch, ShieldCheck, Sparkles, Trash2, UploadCloud, X, Zap } from 'lucide-react';

type Ranking = { label: string; probability: number };
type Prediction = { label: string; confidence: number; rankings: Ranking[]; tip: string; image: { width: number; height: number }; model: string; disclaimer: string };
type Ready = { ready: boolean; model_loaded: boolean; checkpoint_found: boolean; error: string | null };
type ModelInfo = { name: string; dataset: string; classes: string[]; metrics: {test_accuracy?:number|null; test_macro_f1?:number|null; test_images?:number|null}|null };
type Previous = { id: string; name: string; label: string; confidence: number; date: string };
const API = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
const MAX = 10 * 1024 * 1024;
const CLASSES = ['Cardboard','Food Organics','Glass','Metal','Miscellaneous Trash','Paper','Plastic','Textile Trash','Vegetation'];
const COLORS = ['#8a9bb3','#829eb0','#a2b1c9','#83b5c9','#c4a5a0','#9aa9bd','#739ccb','#b7a4cf','#82b8a2'];
function pct(n:number) { return (n*100).toFixed(1) + '%'; }
function stamp() { return new Intl.DateTimeFormat('id-ID', {day:'2-digit',month:'short', hour:'2-digit',minute:'2-digit'}).format(new Date()); }
const size = (s:number) => (s/1024/1024).toFixed(2)+' MB';

function App() {
  const input = useRef<HTMLInputElement>(null);
  const [file,setFile] = useState<File|null>(null);
  const [preview,setPreview] = useState<string|null>(null);
  const [drag,setDrag] = useState(false);
  const [busy,setBusy] = useState(false);
  const [result,setResult] = useState<Prediction|null>(null);
  const [ready,setReady] = useState<Ready|null>(null);
  const [info,setInfo] = useState<ModelInfo|null>(null);
  const [error,setError] = useState('');
  const [tab,setTab] = useState<'analyze'|'history'|'about'>('analyze');
  const [history,setHistory] = useState<Previous[]>([]);
  const [mobileMenu,setMobileMenu] = useState(false);
  const [viewAll,setViewAll] = useState(false);

  const checkBackend = useCallback(async () => {
    try {
      const [r,m] = await Promise.all([fetch(`${API}/api/v1/ready`),fetch(`${API}/api/v1/model`)]);
      if(!r.ok || !m.ok) throw new Error('Server tidak merespons');
      setReady(await r.json()); setInfo(await m.json());
    } catch { setReady({ready:false,model_loaded:false,checkpoint_found:false,error:'Backend tidak terhubung. Jalankan FastAPI di port 8000.'}); }
  },[]);
  useEffect(()=>{void checkBackend();},[checkBackend]);
  useEffect(()=>{if(!file){setPreview(null);return;}const url=URL.createObjectURL(file);setPreview(url);return ()=>URL.revokeObjectURL(url);},[file]);
  const pick = (newFile?:File) => {
    if(!newFile)return;
    if(!['image/jpeg','image/png','image/webp'].includes(newFile.type)){setError('Format yang didukung: JPG, PNG, atau WebP.');return;}
    if(newFile.size > MAX){setError('Ukuran maksimal gambar adalah 10 MB.');return;}
    setError('');setFile(newFile);setResult(null);setViewAll(false);setTab('analyze');
  };
  const reset=()=>{setFile(null);setResult(null);setError('');setViewAll(false);if(input.current)input.current.value='';};
  const analyze=async()=>{
    if(!file||busy)return;
    if(!ready?.ready){setError('Model belum siap. Jalankan backend dan pastikan checkpoint tersedia.');return;}
    setBusy(true);setError('');
    try {
      const body=new FormData();body.append('file',file);
      const resp=await fetch(`${API}/api/v1/predict`,{method:'POST',body});
      const data=await resp.json();
      if(!resp.ok)throw new Error(typeof data.detail==='string'?data.detail:(data.detail?.message||`Permintaan gagal (${resp.status})`));
      const prediction=data as Prediction;setResult(prediction);
      setHistory(old=>[{id:`${Date.now()}`,name:file.name,label:prediction.label,confidence:prediction.confidence,date:stamp()},...old].slice(0,15));
    }catch(e){setError(e instanceof Error?e.message:'Gagal melakukan prediksi.');}finally{setBusy(false);}
  };
  const menu=(id:'analyze'|'history'|'about')=>{setTab(id);setMobileMenu(false)};
  const rows=result?.rankings.slice(0,viewAll?9:5);

  return <div className="app">
    <aside className={`sidebar ${mobileMenu?'mobile-open':''}`}>
      <a href="#home" className="brand" onClick={()=>menu('analyze')}><span className="brand-logo"><Layers3 size={23} strokeWidth={2.3}/></span><span><strong>WasteSort<span className="brand-highlight">.</span></strong><small>AI MATERIAL EXPLORER</small></span></a>
      <div className="nav-section-title">WORKSPACE</div>
      <nav className="sidebar-nav">
        <button className={`navitem ${tab==='analyze'?'active':''}`} onClick={()=>menu('analyze')}><ScanSearch size={18}/> Material analyzer <span className="nav-trail"><ArrowRight size={15}/></span></button>
        <button className={`navitem ${tab==='history'?'active':''}`} onClick={()=>menu('history')}><History size={18}/> Recent scans <span className="history-count">{history.length}</span></button>
      </nav>
      <div className="nav-section-title nav-title-secondary">RESOURCES</div>
      <nav className="sidebar-nav"><button className={`navitem ${tab==='about'?'active':''}`} onClick={()=>menu('about')}><Microscope size={18}/> About the model</button><a className="navitem" href="https://github.com/MENSTRUE/WasteSort-Mini" target="_blank" rel="noreferrer"><Code2 size={18}/> Source code <ExternalLink size={13} className="right"/></a></nav>
      <div className="sidebar-bottom"><div className="sidebar-mini"><div className="sidebar-mini-head"><Sparkles size={17}/> Built for better decisions</div><p>Kenali jenis material dengan computer vision. Mulai dari satu foto.</p></div><div className="sidebar-foot"><div className="avatar">WS</div><span><b>WasteSort Mini</b><small>Day 41 / 100 Projects</small></span><span className="version">v1.0</span></div></div>
    </aside>
    {mobileMenu&&<div className="mobile-scrim" onClick={()=>setMobileMenu(false)}/>}
    <div className="main-shell">
      <header className="topbar"><div className="top-left"><button className="icon-btn hamburger" aria-label="Buka menu" onClick={()=>setMobileMenu(true)}><Menu size={21}/></button><span className="top-prefix">Workspace</span><span className="slash">/</span><span className="top-current">{tab==='analyze'?'Material analyzer':tab==='history'?'Recent scans':'About the model'}</span></div><div className="top-actions"><div className={`connection ${ready?.ready?'online':'offline'}`}><span className="connection-dot"/>{ready?.ready?'Model online':'Model offline'}</div><button className="top-avatar" title="Refresh status" onClick={()=>void checkBackend()}><RotateCcw size={17}/></button></div></header>
      <main className="content" id="home">
        {tab==='analyze'&&<>
          <div className="eyebrow"><span className="eyebrow-line"/> COMPUTER VISION · DAY 41</div>
          <div className="hero"><div className="hero-copy"><h1>Every material<br/><span>has a story.</span></h1><p>Temukan kategori material dari sebuah gambar dengan AI. Cepat, sederhana, dan bisa kamu eksplorasi sendiri.</p><div className="hero-badges"><span><Cpu size={14}/> MobileNetV3-Small</span><span><Layers3 size={14}/> 9 material classes</span></div></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-1"/><div className="orbit orbit-2"/><div className="art-back"/><div className="art-tile art-tile-1"><Leaf size={25}/></div><div className="art-tile art-tile-2"><FileImage size={25}/></div><div className="art-center"><ScanSearch size={49}/></div><div className="art-glow"/></div></div>
          <div className="section-heading"><div><span className="step">01 / ANALYZE</span><h2>Material recognition</h2><p>Upload gambar untuk melihat prediksi AI secara langsung.</p></div><div className="privacy-pill"><LockKeyhole size={14}/> File diproses lokal oleh backend</div></div>
          <div className="analysis-layout"><section className="panel upload-panel"><div className="panel-heading"><div className="panel-title"><span className="mini-icon"><UploadCloud size={19}/></span><div><h3>Upload an image</h3><p>Choose a clear photo of a single material</p></div></div>{file&&<button className="light-button" onClick={reset}><RotateCcw size={14}/> Reset</button>}</div>
            <input type="file" ref={input} accept="image/jpeg,image/png,image/webp" className="file-input" onChange={e=>pick(e.target.files?.[0])}/>
            <div className={`dropzone ${drag?'dragging':''} ${preview?'has-file':''}`} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();input.current?.click();}}} onClick={()=>input.current?.click()} onDragOver={e=>{e.preventDefault();setDrag(true)}} onDragLeave={e=>{e.preventDefault();setDrag(false)}} onDrop={e=>{e.preventDefault();setDrag(false);pick(e.dataTransfer.files?.[0]);}}>
              {preview?<><img src={preview} alt="Preview gambar yang dipilih" className="image-preview"/><div className="preview-overlay"><FileImage size={16}/> Click to replace image</div></>:<><div className="upload-circle"><CloudUpload size={31}/></div><h4>Drop your image here</h4><p>or <span>browse files</span> to upload</p><small>PNG, JPG, or WEBP · Max 10 MB</small></>}
            </div>
            {file&&<div className="file-summary"><div className="file-icon"><FileImage size={19}/></div><div className="file-detail"><b title={file.name}>{file.name}</b><small>{size(file.size)} · Ready for analysis</small></div><CheckCircle2 size={18} className="valid-icon"/></div>}
            {error&&<div className="error-banner" role="alert"><Info size={17}/><span>{error}</span><button aria-label="Tutup pesan" onClick={()=>setError('')}><X size={16}/></button></div>}
            <button className="primary-btn" onClick={()=>void analyze()} disabled={!file||busy||!ready?.ready}>{busy?<><LoaderCircle size={18} className="spin"/> Analyzing image...</>:<><Sparkles size={18}/> Analyze material <ArrowRight size={18}/></>}</button>
            <p className="upload-note"><ShieldCheck size={14}/> Gambar tidak disimpan di server. Riwayat hanya dalam sesi browser ini.</p>
          </section>
          <section className={`panel results-panel ${result?'with-result':''}`}><div className="panel-heading"><div className="panel-title"><span className="mini-icon"><Activity size={19}/></span><div><h3>Analysis results</h3><p>AI-generated material insights</p></div></div>{result&&<span className="completed"><Check size={13}/> Complete</span>}</div>
            {!result?<div className="empty-result"><div className="empty-illustration"><div className="scan-box"><ScanSearch size={40}/></div><span className="dashed d1"/><span className="dashed d2"/></div><h4>Your insights will appear here</h4><p>Upload a photo and run an analysis to see the predicted material and confidence scores.</p><div className="empty-facts"><span><Zap size={13}/> Fast inference</span><span><Layers3 size={13}/> 9 categories</span></div></div>:<div className="results-filled"><div className="result-spotlight"><div><div className="result-subtitle">TOP PREDICTION</div><h3>{result.label}</h3><p>{result.tip}</p></div><div className="confidence-ring" style={{'--progress':`${result.confidence*100}%`} as React.CSSProperties}><div><strong>{(result.confidence*100).toFixed(0)}%</strong><small>confidence</small></div></div></div><div className="bar-header"><h4>Confidence breakdown</h4><span>Model probabilities</span></div><div className="ranking-list">{rows?.map((r,i)=><div className="rank" key={r.label}><div className="rank-line"><span className="rank-name"><span className="rank-dot" style={{background:COLORS[CLASSES.indexOf(r.label)]||'#9db4d2'}}/>{r.label}</span><b>{pct(r.probability)}</b></div><div className="progress-track"><div className="progress-value" style={{width:pct(r.probability),background:i===0?'#6fa1ec':'#8c9cb4'}}/></div></div>)}</div><button className="show-more" onClick={()=>setViewAll(v=>!v)}>{viewAll?'Show fewer':'View all 9 classes'} <ChevronDown size={15} className={viewAll?'flipped':''}/></button><div className="result-caution"><Info size={15}/> Probabilitas belum terkalibrasi. Hasil ini bukan keputusan resmi daur ulang.</div></div>}
          </section></div>
          <div className="section-heading lower-head"><div><span className="step">02 / BEHIND THE MODEL</span><h2>Built on real experiments</h2><p>Model dan pengukuran aktual dari pelatihan RealWaste.</p></div></div>
          <div className="stats-grid"><div className="stat-card"><span className="stat-icon"><Layers3 size={19}/></span><strong>9 <small>classes</small></strong><span>Original RealWaste taxonomy</span></div><div className="stat-card"><span className="stat-icon"><Cpu size={19}/></span><strong>MobileNet<span className="small-stat">V3</span></strong><span>Lightweight vision backbone</span></div><div className="stat-card"><span className="stat-icon"><Activity size={19}/></span><strong>{info?.metrics?.test_accuracy!=null?pct(info.metrics.test_accuracy):'—'}</strong><span>Held-out test accuracy{info?.metrics?.test_accuracy==null?' (report not attached)':''}</span></div><div className="stat-card"><span className="stat-icon"><ShieldCheck size={19}/></span><strong>On-device <small>ready</small></strong><span>Runs with local Python backend</span></div></div>
          <footer className="footer"><span>WasteSort Mini © 2026 · Research prototype</span><span>Built with React + FastAPI + PyTorch <ArrowDownRight size={14}/></span></footer>
        </>}
        {tab==='history'&&<section className="secondary-view"><div className="eyebrow">WORKSPACE / SESSION</div><h1>Recent scans<span className="blue-dot">.</span></h1><p>Hasil prediksi dari sesi browser ini. Data ini tidak dikirim ke database.</p><div className="history-panel"><div className="history-head"><strong>Prediction history</strong><button className="light-button" onClick={()=>setHistory([])} disabled={!history.length}><Trash2 size={14}/> Clear history</button></div>{history.length?history.map(h=><div className="history-entry" key={h.id}><div className="history-file"><FileImage size={19}/></div><div className="history-name"><b>{h.name}</b><small><Clock3 size={12}/>{h.date}</small></div><div className="history-pred"><b>{h.label}</b><small>{pct(h.confidence)}</small></div></div>):<div className="history-empty"><History size={38}/><strong>No scans yet</strong><span>Analisis gambar pertamamu untuk mulai mengisi riwayat.</span><button className="secondary-btn" onClick={()=>menu('analyze')}>Start analyzing <ArrowRight size={16}/></button></div>}</div></section>}
        {tab==='about'&&<section className="secondary-view"><div className="eyebrow">KNOW YOUR AI</div><h1>Under the hood<span className="blue-dot">.</span></h1><p>Model classification yang dapat diperiksa dan ditelusuri hasil eksperimennya.</p><div className="about-grid"><div className="about-card"><span className="stat-icon"><Cpu size={22}/></span><h3>MobileNetV3-Small</h3><p>Model transfer learning dengan backbone ImageNet, disesuaikan untuk sembilan kelas material RealWaste.</p></div><div className="about-card"><span className="stat-icon"><Layers3 size={22}/></span><h3>9 material classes</h3><p>Cardboard, Food Organics, Glass, Metal, Miscellaneous Trash, Paper, Plastic, Textile Trash, Vegetation.</p></div><div className="about-card"><span className="stat-icon"><ShieldCheck size={22}/></span><h3>Transparent limitations</h3><p>Foto tidak memastikan resin, komposisi campuran, atau status daur ulang setempat. Generalisasi lintas dataset masih terbatas.</p></div><div className="about-card"><span className="stat-icon"><Activity size={22}/></span><h3>Real inference</h3><p>Prediksi berasal dari checkpoint .pt hasil pelatihan Kaggle, dijalankan di FastAPI, bukan angka simulasi pada frontend.</p></div></div><div className="about-note"><Info size={19}/><span>Model status: <b>{ready?.ready?'Online':'Offline'}</b>. {ready?.error||'Checkpoint loaded successfully.'}</span><button className="light-button" onClick={()=>void checkBackend()}><RotateCcw size={14}/> Refresh</button></div></section>}
      </main>
    </div>
  </div>;
}
export default App;
