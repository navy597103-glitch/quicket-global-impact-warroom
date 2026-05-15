
import React, { useMemo, useState } from 'react'
import { Search, Maximize2, Bell, UserRound, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts'

const productTypes = {
  all: { label: '全部機種', shortLabel: '全部', modules: 186534, annualSaving: 128700000, annualCarbon: 6842, deploymentAge: 1247 },
  downlight: { label: '崁燈', shortLabel: '崁燈', modules: 42000, annualSaving: 23600000, annualCarbon: 1240, deploymentAge: 986 },
  bayLight: { label: '天井燈', shortLabel: '天井燈', modules: 72000, annualSaving: 51200000, annualCarbon: 2380, deploymentAge: 1247 },
  floodLight: { label: '投射燈', shortLabel: '投射燈', modules: 34800, annualSaving: 28900000, annualCarbon: 1490, deploymentAge: 842 },
  streetlight: { label: '路燈', shortLabel: '路燈', modules: 37734, annualSaving: 25000000, annualCarbon: 1732, deploymentAge: 1108 },
}
const productOptions = Object.entries(productTypes).map(([value, item]) => ({ value, label: item.label }))
const mapRegions = [
  { name: '北美洲', modules: 1256, x: 16, y: 43, color: '#22c55e' },
  { name: '中南美洲', modules: 762, x: 24, y: 66, color: '#facc15' },
  { name: '歐洲', modules: 2134, x: 52, y: 34, color: '#f97316' },
  { name: '非洲', modules: 1089, x: 50, y: 57, color: '#f59e0b' },
  { name: '中東', modules: 4215, x: 64, y: 48, color: '#ef4444' },
  { name: '亞洲', modules: 6842, x: 82, y: 43, color: '#ef4444' },
  { name: '大洋洲', modules: 512, x: 89, y: 75, color: '#22c55e' },
]
const deploymentPoints = [
  { x: 12, y: 40, level: '50 - 100', color: '#22c55e' }, { x: 18, y: 46, level: '< 50', color: '#0ea5e9' },
  { x: 23, y: 54, level: '100 - 500', color: '#facc15' }, { x: 29, y: 68, level: '500 - 1,000', color: '#f97316' },
  { x: 36, y: 31, level: '< 50', color: '#0ea5e9' }, { x: 43, y: 36, level: '100 - 500', color: '#facc15' },
  { x: 49, y: 41, level: '500 - 1,000', color: '#f97316' }, { x: 57, y: 46, level: '> 1,000', color: '#ef4444' },
  { x: 61, y: 58, level: '100 - 500', color: '#facc15' }, { x: 68, y: 50, level: '500 - 1,000', color: '#f97316' },
  { x: 73, y: 53, level: '50 - 100', color: '#22c55e' }, { x: 78, y: 47, level: '100 - 500', color: '#facc15' },
  { x: 83, y: 42, level: '> 1,000', color: '#ef4444' }, { x: 87, y: 54, level: '< 50', color: '#0ea5e9' },
  { x: 87, y: 79, level: '50 - 100', color: '#22c55e' },
]
const trendData = [
  { month: '1月', saving: 38, carbon: 1.8 }, { month: '2月', saving: 59, carbon: 2.9 },
  { month: '3月', saving: 74, carbon: 3.6 }, { month: '4月', saving: 88, carbon: 4.3 },
  { month: '5月', saving: 96, carbon: 4.9 }, { month: '6月', saving: 101, carbon: 5.2 },
  { month: '7月', saving: 106, carbon: 5.4 }, { month: '8月', saving: 116, carbon: 5.8 },
  { month: '9月', saving: 126, carbon: 6.1 }, { month: '10月', saving: 132, carbon: 6.4 },
  { month: '11月', saving: 138, carbon: 6.6 }, { month: '12月', saving: 145, carbon: 6.9 },
]
const distributionBase = [
  { name: '天井燈', value: 38.7, color: '#0ea5e9' }, { name: '路燈', value: 25.4, color: '#22c55e' },
  { name: '投射燈', value: 18.6, color: '#f59e0b' }, { name: '崁燈', value: 9.8, color: '#7c3aed' },
  { name: '其他', value: 7.5, color: '#475569' },
]
function formatNumber(value) { return Number(value).toLocaleString('zh-TW') }
function formatNTD(value) { if (value >= 100000000) return `${(value / 100000000).toFixed(1)} 億`; if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`; return formatNumber(value) }

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState('all')
  const current = productTypes[selectedProduct]
  const adjustedTrend = useMemo(() => {
    const ratio = current.annualSaving / productTypes.all.annualSaving
    const carbonRatio = current.annualCarbon / productTypes.all.annualCarbon
    return trendData.map((item) => ({ ...item, saving: Math.round(item.saving * ratio), carbon: Number((item.carbon * carbonRatio).toFixed(1)) }))
  }, [current])
  const distribution = useMemo(() => {
    if (selectedProduct === 'all') return distributionBase
    const targetName = current.shortLabel
    return distributionBase.map((item) => ({ ...item, value: item.name === targetName ? 100 : 0, color: item.name === targetName ? item.color : '#1e293b' }))
  }, [selectedProduct, current])

  return (
    <main className="warroom">
      <header className="topbar">
        <section className="brand">
          <div className="brand-logo"><span>Q</span></div>
          <div className="brand-text"><div className="brand-title">QUICKET</div><div className="brand-subtitle">LIGHTING THE FUTURE</div></div>
          <div className="brand-divider" />
          <div className="warroom-title"><div>WAR ROOM</div><span>Global Deployment Overview</span></div>
        </section>
        <section className="deployment-time"><div className="date">2024/05/31</div><div className="age"><span>累計部署時間</span><strong>{formatNumber(current.deploymentAge)} 日</strong></div></section>
        <section className="utility-icons"><Maximize2 size={21} /><Bell size={21} /><UserRound size={21} /></section>
      </header>
      <section className="content-grid">
        <section className="left-column">
          <section className="map-panel panel">
            <div className="panel-head"><div><h1>全球部署分布</h1><div className="legend"><span><i className="red" /> &gt; 1,000</span><span><i className="orange" /> 500 - 1,000</span><span><i className="yellow" /> 100 - 500</span><span><i className="green" /> 50 - 100</span><span><i className="blue" /> &lt; 50</span></div></div><div className="map-actions"><button><ZoomOut size={15} /> 縮小</button><button><ZoomIn size={15} /> 放大</button></div></div>
            <div className="map-stage">
              <svg viewBox="0 0 1000 520" className="world-map" role="img" aria-label="Global deployment map"><defs><linearGradient id="land" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#0d5f94" /><stop offset="60%" stopColor="#09456e" /><stop offset="100%" stopColor="#05304d" /></linearGradient></defs><rect width="1000" height="520" fill="transparent" /><g className="grid-lines">{Array.from({ length: 18 }).map((_, idx) => <line key={`v${idx}`} x1={idx * 60} y1="0" x2={idx * 60} y2="520" />)}{Array.from({ length: 10 }).map((_, idx) => <line key={`h${idx}`} x1="0" y1={idx * 60} x2="1000" y2={idx * 60} />)}</g><g className="landmasses"><path d="M58 130 C92 88 165 83 216 119 C260 151 278 215 245 267 C214 315 143 313 94 282 C42 249 18 178 58 130Z" /><path d="M199 292 C250 255 314 281 338 338 C365 404 319 462 260 493 C207 520 169 489 184 429 C196 382 158 325 199 292Z" /><path d="M356 114 C438 63 564 72 640 126 C702 170 690 238 616 266 C529 298 415 272 354 219 C315 184 313 143 356 114Z" /><path d="M481 270 C548 220 657 242 735 307 C822 379 818 467 725 496 C635 524 545 471 489 406 C448 359 437 306 481 270Z" /><path d="M684 145 C760 108 873 117 943 174 C1001 222 972 288 892 307 C806 329 706 292 662 232 C636 197 644 165 684 145Z" /><path d="M744 404 C800 376 890 398 923 449 C952 494 903 522 827 513 C764 505 716 458 744 404Z" /></g><g className="borders"><path d="M87 153 C124 172 173 178 235 204" /><path d="M122 245 C165 246 205 267 246 304" /><path d="M372 146 C430 174 510 171 597 151" /><path d="M491 301 C559 319 631 333 704 328" /><path d="M661 193 C738 224 821 223 925 198" /><path d="M754 433 C798 459 854 471 911 456" /></g></svg>
              {deploymentPoints.map((point, index) => <span className="deployment-dot" key={index} style={{ left: `${point.x}%`, top: `${point.y}%`, '--dot-color': point.color }} title={point.level} />)}
              {mapRegions.map((region) => <div className="region-label" key={region.name} style={{ left: `${region.x}%`, top: `${region.y}%` }}><strong>{region.name}</strong><span>{formatNumber(region.modules)}</span></div>)}
              <button className="reset-view"><RotateCcw size={16} /> 重設視角</button>
            </div>
          </section>
          <section className="filters panel">
            <label><span>區域</span><select><option>全部</option><option>亞洲</option><option>中東</option><option>歐洲</option><option>北美洲</option></select></label>
            <label><span>國家</span><select><option>全部</option><option>Taiwan</option><option>Oman</option><option>Japan</option><option>UAE</option></select></label>
            <label><span>設備類型</span><select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>{productOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></label>
            <label><span>營運狀態</span><select><option>全部</option><option>已部署</option><option>測試中</option><option>規劃中</option></select></label>
            <label className="search-box"><span>搜尋模組名稱或型號</span><div><input placeholder="QUICKET 模組 / 型號" /><Search size={17} /></div></label>
          </section>
        </section>
        <aside className="right-column">
          <section className="panel kpi-panel"><h2>關鍵指標 KPI</h2><div className="kpi-grid"><div className="kpi-card product-select-card"><span>部署機種</span><select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>{productOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div><div className="kpi-card"><span>總模組數量</span><strong className="blue">{formatNumber(current.modules)}</strong><small>目前選擇：{current.label}</small></div><div className="kpi-card"><span>年度運作維修節約（NTD）</span><strong>{formatNTD(current.annualSaving)}</strong><small>依部署機種連動</small></div><div className="kpi-card"><span>年度碳排量（tCO2e）</span><strong className="blue">{formatNumber(current.annualCarbon)}</strong><small>依部署機種連動</small></div></div></section>
          <section className="panel trend-panel"><div className="section-title"><h2>年度節約趨勢</h2><select><option>本年度</option><option>近三年</option><option>累計</option></select></div><div className="chart-legend"><span><i className="saving" /> 運作維修節約（NTD）</span><span><i className="carbon" /> 碳排量（tCO2e）</span></div><div className="trend-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={adjustedTrend} margin={{ top: 18, right: 8, left: 0, bottom: 2 }}><defs><linearGradient id="savingGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22c55e" stopOpacity={0.35} /><stop offset="100%" stopColor="#22c55e" stopOpacity={0.02} /></linearGradient></defs><CartesianGrid stroke="rgba(148,163,184,0.15)" vertical={false} /><XAxis dataKey="month" tick={{ fill: '#9fb6d9', fontSize: 12 }} axisLine={false} tickLine={false} /><YAxis yAxisId="left" tick={{ fill: '#9fb6d9', fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis yAxisId="right" orientation="right" tick={{ fill: '#9fb6d9', fontSize: 11 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ background: '#081827', border: '1px solid rgba(56,189,248,0.35)', borderRadius: 12, color: '#e5f6ff' }} /><Area yAxisId="left" type="monotone" dataKey="saving" stroke="#22c55e" fill="url(#savingGradient)" strokeWidth={3} /><Line yAxisId="right" type="monotone" dataKey="carbon" stroke="#0ea5e9" strokeWidth={3} dot={false} /></AreaChart></ResponsiveContainer></div></section>
          <section className="panel distribution-panel"><h2>設備類型分布</h2><div className="distribution-content"><div className="donut"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={distribution} innerRadius={56} outerRadius={92} paddingAngle={1.5} dataKey="value">{distribution.map((entry) => <Cell key={entry.name} fill={entry.color} />)}</Pie></PieChart></ResponsiveContainer><div className="donut-center"><strong>{formatNumber(current.modules)}</strong><span>總模組數量</span></div></div><div className="distribution-list">{distributionBase.map((item) => <div key={item.name}><span><i style={{ background: item.color }} /> {item.name}</span><strong>{item.value}%</strong></div>)}</div></div></section>
        </aside>
      </section>
    </main>
  )
}
