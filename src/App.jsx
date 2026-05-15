
import React, { useMemo, useState } from 'react'

const productTypes = {
  all: { label: '全部機種', shortLabel: '全部', modules: 186534, annualSaving: 128700000, annualCarbon: 6842, deploymentAge: 1247 },
  downlight: { label: '崁燈', shortLabel: '崁燈', modules: 42000, annualSaving: 23600000, annualCarbon: 1240, deploymentAge: 986 },
  bayLight: { label: '天井燈', shortLabel: '天井燈', modules: 72000, annualSaving: 51200000, annualCarbon: 2380, deploymentAge: 1247 },
  floodLight: { label: '投射燈', shortLabel: '投射燈', modules: 34800, annualSaving: 28900000, annualCarbon: 1490, deploymentAge: 842 },
  streetlight: { label: '路燈', shortLabel: '路燈', modules: 37734, annualSaving: 25000000, annualCarbon: 1732, deploymentAge: 1108 },
}
const productOptions = Object.entries(productTypes).map(([value, item]) => ({ value, label: item.label }))
const mapRegions = [
  { name:'北美洲', modules:1256, x:16, y:43, color:'#22c55e' }, { name:'中南美洲', modules:762, x:24, y:66, color:'#facc15' },
  { name:'歐洲', modules:2134, x:52, y:34, color:'#f97316' }, { name:'非洲', modules:1089, x:50, y:57, color:'#f59e0b' },
  { name:'中東', modules:4215, x:64, y:48, color:'#ef4444' }, { name:'亞洲', modules:6842, x:82, y:43, color:'#ef4444' },
  { name:'大洋洲', modules:512, x:89, y:75, color:'#22c55e' },
]
const deploymentPoints = [
  [12,40,'#22c55e'],[18,46,'#0ea5e9'],[23,54,'#facc15'],[29,68,'#f97316'],[36,31,'#0ea5e9'],[43,36,'#facc15'],[49,41,'#f97316'],[57,46,'#ef4444'],[61,58,'#facc15'],[68,50,'#f97316'],[73,53,'#22c55e'],[78,47,'#facc15'],[83,42,'#ef4444'],[87,54,'#0ea5e9'],[87,79,'#22c55e']
]
const trendData = [38,59,74,88,96,101,106,116,126,132,138,145]
const months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
const distributionBase = [
  { name:'天井燈', value:38.7, color:'#0ea5e9' }, { name:'路燈', value:25.4, color:'#22c55e' }, { name:'投射燈', value:18.6, color:'#f59e0b' }, { name:'崁燈', value:9.8, color:'#7c3aed' }, { name:'其他', value:7.5, color:'#475569' },
]
function formatNumber(v){ return Number(v).toLocaleString('zh-TW') }
function formatNTD(v){ if(v>=100000000) return `${(v/100000000).toFixed(1)} 億`; if(v>=1000000) return `${(v/1000000).toFixed(1)}M`; return formatNumber(v) }
function Icon({type}){ return <span className={`icon ${type}`} /> }
function TrendChart({current}){
  const ratio = current.annualSaving / productTypes.all.annualSaving
  const max = Math.max(...trendData.map(v=>v*ratio)) || 1
  const points = trendData.map((v,i)=>`${40+i*38},${190-(v*ratio/max)*150}`).join(' ')
  const carbonPoints = trendData.map((v,i)=>`${40+i*38},${195-(v/current.modules*9000)*120}`).join(' ')
  return <svg className="trend-svg" viewBox="0 0 500 220" role="img" aria-label="年度節約趨勢">
    {[0,1,2,3,4].map(i=><line key={`h${i}`} x1="35" x2="485" y1={35+i*38} y2={35+i*38} />)}
    {[0,1,2,3,4,5,6,7,8,9,10,11].map(i=><text key={i} x={34+i*38} y="213">{months[i]}</text>)}
    <polyline points={points} className="saving-line" />
    <polyline points={carbonPoints} className="carbon-line" />
    {points.split(' ').map((p,i)=>{const [x,y]=p.split(','); return <circle key={i} cx={x} cy={y} r="4" className="saving-dot" />})}
  </svg>
}
function DonutChart({selected,current}){
  const data = selected==='all' ? distributionBase : distributionBase.map(d=>({...d, value:d.name===current.shortLabel?100:0, color:d.name===current.shortLabel?d.color:'#1e293b'}))
  let offset = 25
  return <div className="donut-wrap">
    <svg className="donut-svg" viewBox="0 0 220 220">
      {data.map(d=>{ const dash=d.value*2.75; const el=<circle key={d.name} cx="110" cy="110" r="76" fill="none" stroke={d.color} strokeWidth="34" strokeDasharray={`${dash} ${275-dash}`} strokeDashoffset={-offset} />; offset += dash; return el })}
    </svg>
    <div className="donut-center"><strong>{formatNumber(current.modules)}</strong><span>總模組數量</span></div>
  </div>
}
export default function App(){
  const [selectedProduct,setSelectedProduct]=useState('all')
  const current=productTypes[selectedProduct]
  const select=<select value={selectedProduct} onChange={e=>setSelectedProduct(e.target.value)}>{productOptions.map(o=><option key={o.value} value={o.value}>{o.label}</option>)}</select>
  return <main className="warroom">
    <header className="topbar">
      <section className="brand"><div className="brand-logo">Q</div><div className="brand-text"><div className="brand-title">QUICKET</div><div className="brand-subtitle">LIGHTING THE FUTURE</div></div><div className="brand-divider"/><div className="warroom-title"><div>WAR ROOM</div><span>Global Deployment Overview</span></div></section>
      <section className="deployment-time"><div className="date">2024/05/31</div><div className="age"><span>累計部署時間</span><strong>{formatNumber(current.deploymentAge)} 日</strong></div></section>
      <section className="utility-icons"><Icon type="expand"/><Icon type="bell"/><Icon type="user"/></section>
    </header>
    <section className="content-grid">
      <section className="left-column">
        <section className="map-panel panel"><div className="panel-head"><div><h1>全球部署分布</h1><div className="legend"><span><i className="red"/> &gt; 1,000</span><span><i className="orange"/> 500 - 1,000</span><span><i className="yellow"/> 100 - 500</span><span><i className="green"/> 50 - 100</span><span><i className="blue"/> &lt; 50</span></div></div><div className="map-actions"><button>⌕ 縮小</button><button>⌕ 放大</button></div></div>
          <div className="map-stage"><svg viewBox="0 0 1000 520" className="world-map"><defs><linearGradient id="land" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0d5f94"/><stop offset="60%" stopColor="#09456e"/><stop offset="100%" stopColor="#05304d"/></linearGradient></defs><rect width="1000" height="520" fill="transparent"/><g className="grid-lines">{Array.from({length:18}).map((_,i)=><line key={`v${i}`} x1={i*60} y1="0" x2={i*60} y2="520"/>)}{Array.from({length:10}).map((_,i)=><line key={`h${i}`} x1="0" y1={i*60} x2="1000" y2={i*60}/>)}</g><g className="landmasses"><path d="M58 130 C92 88 165 83 216 119 C260 151 278 215 245 267 C214 315 143 313 94 282 C42 249 18 178 58 130Z"/><path d="M199 292 C250 255 314 281 338 338 C365 404 319 462 260 493 C207 520 169 489 184 429 C196 382 158 325 199 292Z"/><path d="M356 114 C438 63 564 72 640 126 C702 170 690 238 616 266 C529 298 415 272 354 219 C315 184 313 143 356 114Z"/><path d="M481 270 C548 220 657 242 735 307 C822 379 818 467 725 496 C635 524 545 471 489 406 C448 359 437 306 481 270Z"/><path d="M684 145 C760 108 873 117 943 174 C1001 222 972 288 892 307 C806 329 706 292 662 232 C636 197 644 165 684 145Z"/><path d="M744 404 C800 376 890 398 923 449 C952 494 903 522 827 513 C764 505 716 458 744 404Z"/></g><g className="borders"><path d="M87 153 C124 172 173 178 235 204"/><path d="M122 245 C165 246 205 267 246 304"/><path d="M372 146 C430 174 510 171 597 151"/><path d="M491 301 C559 319 631 333 704 328"/><path d="M661 193 C738 224 821 223 925 198"/><path d="M754 433 C798 459 854 471 911 456"/><path d="M353 207 C446 235 528 239 637 210"/><path d="M511 390 C593 385 675 426 752 463"/></g></svg>{deploymentPoints.map((p,i)=><span className="deployment-dot" key={i} style={{left:`${p[0]}%`,top:`${p[1]}%`,'--dot-color':p[2]}}/>)}{mapRegions.map(r=><div className="region-label" key={r.name} style={{left:`${r.x}%`,top:`${r.y}%`}}><strong>{r.name}</strong><span>{formatNumber(r.modules)}</span></div>)}<button className="reset-view">↻ 重設視角</button></div>
        </section>
        <section className="filters panel"><label><span>區域</span><select><option>全部</option><option>亞洲</option><option>中東</option></select></label><label><span>國家</span><select><option>全部</option><option>Taiwan</option><option>Oman</option></select></label><label><span>設備類型</span>{select}</label><label><span>營運狀態</span><select><option>全部</option><option>已部署</option><option>測試中</option></select></label><label className="search-box"><span>搜尋模組名稱或型號</span><div><input placeholder="QUICKET 模組 / 型號"/><b>⌕</b></div></label></section>
      </section>
      <aside className="right-column"><section className="panel kpi-panel"><h2>關鍵指標 KPI</h2><div className="kpi-grid"><div className="kpi-card product-select-card"><span>部署機種</span>{select}</div><div className="kpi-card"><span>總模組數量</span><strong className="blue">{formatNumber(current.modules)}</strong><small>目前選擇：{current.label}</small></div><div className="kpi-card"><span>年度運作維修節約（NTD）</span><strong>{formatNTD(current.annualSaving)}</strong><small>依部署機種連動</small></div><div className="kpi-card"><span>年度碳排量（tCO2e）</span><strong className="blue">{formatNumber(current.annualCarbon)}</strong><small>依部署機種連動</small></div></div></section>
        <section className="panel trend-panel"><div className="section-title"><h2>年度節約趨勢</h2><select><option>本年度</option><option>近三年</option></select></div><div className="chart-legend"><span><i className="saving"/> 運作維修節約（NTD）</span><span><i className="carbon"/> 碳排量（tCO2e）</span></div><TrendChart current={current}/></section>
        <section className="panel distribution-panel"><h2>設備類型分布</h2><div className="distribution-content"><DonutChart selected={selectedProduct} current={current}/><div className="distribution-list">{distributionBase.map(d=><div key={d.name}><span><i style={{background:d.color}}/> {d.name}</span><strong>{d.value}%</strong></div>)}</div></div></section>
      </aside>
    </section>
  </main>
}
