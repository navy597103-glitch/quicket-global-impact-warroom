import React, { useMemo, useState } from 'react'
import {
  Activity,
  BarChart3,
  Building2,
  CircleDollarSign,
  Factory,
  Globe2,
  Layers3,
  Lightbulb,
  MapPin,
  MousePointer2,
  Network,
  ShieldCheck,
  Sparkles,
  Trees,
  Zap,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const typeConfig = {
  'Bay Light': { label: '天井燈', color: '#0891b2', bg: 'bg-cyan-50', text: 'text-cyan-700' },
  Streetlight: { label: '路燈', color: '#2563eb', bg: 'bg-blue-50', text: 'text-blue-700' },
  'Flood Light': { label: '投射燈', color: '#16a34a', bg: 'bg-green-50', text: 'text-green-700' },
  Downlight: { label: '崁燈', color: '#9333ea', bg: 'bg-purple-50', text: 'text-purple-700' },
  'Special Lighting': { label: '特殊照明', color: '#f97316', bg: 'bg-orange-50', text: 'text-orange-700' },
}

const roleConfig = {
  Overall: {
    label: '總表視角',
    title: '整體部署效益',
    description: '顯示 QUICKET 在多案場、多燈具類型、多區域的總節約效益與部署廣度。',
    metrics: ['Total Lifecycle Savings', 'Energy Saved', 'CO₂ Reduced', 'Deployed Modules'],
  },
  Investor: {
    label: '投資人',
    title: '平台規模與市場擴張',
    description: '聚焦部署數量、年度節約總額、應用類型覆蓋與跨區域擴張性。',
    metrics: ['Total Lifecycle Savings', 'Active Regions', 'Covered Applications', 'Growth Pipeline'],
  },
  'Project Owner': {
    label: '業主',
    title: '營運成本與維護壓力下降',
    description: '聚焦長期維護成本、能源費用、停工風險與可預期的設備更新節奏。',
    metrics: ['Maintenance Cost Saved', 'Energy Saved', 'Service Events Reduced', 'Payback Signals'],
  },
  'Engineering Partner': {
    label: '工程夥伴',
    title: '規格複製與案型擴張',
    description: '聚焦標準介面、可複製案型、維護流程簡化與標案效率。',
    metrics: ['Standardized Types', 'Reusable Specs', 'Deployment Density', 'Maintenance Windows'],
  },
  'Lighting Manufacturer': {
    label: '製造商',
    title: '模組化產品線與授權機會',
    description: '聚焦燈具類型分布、出貨量、可延伸產品族群與授權製造機會。',
    metrics: ['Shipment Mix', 'Deployed Modules', 'Covered Applications', 'Product Family Potential'],
  },
  'ESG / Carbon Partner': {
    label: 'ESG / 碳夥伴',
    title: '可量化節碳資料基礎',
    description: '聚焦可追蹤案場、節碳量、方法學樣本與碳資料封裝潛力。',
    metrics: ['CO₂ Reduced', 'Traceable Sites', 'Carbon Data Packages', 'Methodology Candidates'],
  },
  'Distribution Partner': {
    label: '通路夥伴',
    title: '可複製銷售場景',
    description: '聚焦高複製性燈型、區域需求、維護替換窗口與銷售路徑。',
    metrics: ['Hot Applications', 'Regional Demand', 'Replacement Windows', 'Repeatable Sales'],
  },
}

const projects = [
  {
    id: 'tw-zongling',
    projectName: '眾鈴汽車｜台中港組裝廠',
    region: 'Taiwan',
    area: 'East Asia',
    lat: 24.28,
    lon: 120.51,
    applicationType: 'Industrial Facility',
    luminaireType: 'Bay Light',
    specification: '150W QUICKET module / 170 lm/W',
    quantity: 620,
    annualSaving: 1450000,
    energySaved: 93000,
    carbonReduced: 45.9,
    maintenanceSaving: 5580000,
    status: 'Active',
    partnerRole: 'Project Owner',
  },
  {
    id: 'tw-shipyard',
    projectName: '龍德造船｜新建廠區',
    region: 'Taiwan',
    area: 'East Asia',
    lat: 24.62,
    lon: 121.84,
    applicationType: 'Shipyard',
    luminaireType: 'Flood Light',
    specification: '120W / corrosion-resistant luminaire set',
    quantity: 380,
    annualSaving: 860000,
    energySaved: 62000,
    carbonReduced: 30.6,
    maintenanceSaving: 2840000,
    status: 'Pilot',
    partnerRole: 'Engineering Partner',
  },
  {
    id: 'tw-road',
    projectName: '北部公共道路示範案',
    region: 'Taiwan',
    area: 'East Asia',
    lat: 25.05,
    lon: 121.56,
    applicationType: 'Public Infrastructure',
    luminaireType: 'Streetlight',
    specification: '80W QUICKET streetlight module',
    quantity: 1200,
    annualSaving: 2360000,
    energySaved: 210240,
    carbonReduced: 103.9,
    maintenanceSaving: 7280000,
    status: 'Planning',
    partnerRole: 'Distribution Partner',
  },
  {
    id: 'jp-warehouse',
    projectName: 'Kansai Logistics Warehouse',
    region: 'Japan',
    area: 'East Asia',
    lat: 34.69,
    lon: 135.5,
    applicationType: 'Warehouse',
    luminaireType: 'Bay Light',
    specification: '100W / high-bay replacement package',
    quantity: 960,
    annualSaving: 3120000,
    energySaved: 278000,
    carbonReduced: 137.3,
    maintenanceSaving: 9100000,
    status: 'Partner Proposal',
    partnerRole: 'Engineering Partner',
  },
  {
    id: 'sg-office',
    projectName: 'Singapore Office Retrofit Portfolio',
    region: 'Singapore',
    area: 'Southeast Asia',
    lat: 1.35,
    lon: 103.82,
    applicationType: 'Commercial Office',
    luminaireType: 'Downlight',
    specification: '15W QUICKET downlight module',
    quantity: 2400,
    annualSaving: 1840000,
    energySaved: 156000,
    carbonReduced: 77.1,
    maintenanceSaving: 6400000,
    status: 'Simulated',
    partnerRole: 'ESG / Carbon Partner',
  },
  {
    id: 'vn-factory',
    projectName: 'Vietnam Electronics Factory',
    region: 'Vietnam',
    area: 'Southeast Asia',
    lat: 10.82,
    lon: 106.63,
    applicationType: 'Industrial Facility',
    luminaireType: 'Bay Light',
    specification: '150W industrial module set',
    quantity: 1750,
    annualSaving: 4360000,
    energySaved: 356000,
    carbonReduced: 175.9,
    maintenanceSaving: 12800000,
    status: 'Planning',
    partnerRole: 'Lighting Manufacturer',
  },
  {
    id: 'om-port',
    projectName: 'Oman Port Lighting Upgrade',
    region: 'Oman',
    area: 'Middle East',
    lat: 23.59,
    lon: 58.41,
    applicationType: 'Port / Yard',
    luminaireType: 'Flood Light',
    specification: '150W / wide-area flood module',
    quantity: 1420,
    annualSaving: 5520000,
    energySaved: 425000,
    carbonReduced: 209.9,
    maintenanceSaving: 15400000,
    status: 'Carbon Methodology',
    partnerRole: 'ESG / Carbon Partner',
  },
  {
    id: 'ae-street',
    projectName: 'UAE Smart Streetlight Cluster',
    region: 'UAE',
    area: 'Middle East',
    lat: 25.2,
    lon: 55.27,
    applicationType: 'Smart City',
    luminaireType: 'Streetlight',
    specification: '70W / PoE-ready lighting node option',
    quantity: 3200,
    annualSaving: 8960000,
    energySaved: 604800,
    carbonReduced: 298.8,
    maintenanceSaving: 23600000,
    status: 'Partner Proposal',
    partnerRole: 'Investor',
  },
  {
    id: 'de-heritage',
    projectName: 'Germany Heritage Lighting Pilot',
    region: 'Germany',
    area: 'Europe',
    lat: 52.52,
    lon: 13.4,
    applicationType: 'Architecture / Landmark',
    luminaireType: 'Special Lighting',
    specification: 'custom color-temperature module package',
    quantity: 220,
    annualSaving: 410000,
    energySaved: 28500,
    carbonReduced: 14.1,
    maintenanceSaving: 1350000,
    status: 'Pilot',
    partnerRole: 'Lighting Manufacturer',
  },
  {
    id: 'us-campus',
    projectName: 'US Campus Outdoor Retrofit',
    region: 'United States',
    area: 'North America',
    lat: 37.77,
    lon: -122.42,
    applicationType: 'Campus / Outdoor',
    luminaireType: 'Streetlight',
    specification: '90W campus lighting module',
    quantity: 780,
    annualSaving: 2380000,
    energySaved: 176000,
    carbonReduced: 86.9,
    maintenanceSaving: 4920000,
    status: 'Simulated',
    partnerRole: 'Project Owner',
  },
]

const yearlyProjection = [
  { year: 'Y1', savings: 31, energy: 2.4, carbon: 1.2 },
  { year: 'Y2', savings: 69, energy: 5.3, carbon: 2.7 },
  { year: 'Y3', savings: 118, energy: 9.1, carbon: 4.5 },
  { year: 'Y4', savings: 176, energy: 13.4, carbon: 6.6 },
  { year: 'Y5', savings: 248, energy: 18.8, carbon: 9.3 },
]

function formatNTD(value) {
  if (value >= 100000000) return `NTD ${(value / 100000000).toFixed(1)} 億`
  if (value >= 1000000) return `NTD ${(value / 1000000).toFixed(1)}M`
  return new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', maximumFractionDigits: 0 }).format(value)
}

function formatNumber(value, digits = 0) {
  return new Intl.NumberFormat('zh-TW', { maximumFractionDigits: digits }).format(value)
}

function formatKwh(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M kWh`
  return `${formatNumber(value)} kWh`
}

function totalBy(items, key) {
  return items.reduce((sum, item) => sum + item[key], 0)
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    const groupKey = item[key]
    if (!groups[groupKey]) groups[groupKey] = []
    groups[groupKey].push(item)
    return groups
  }, {})
}

function latLonToPoint(lat, lon, rotation, zoom) {
  const rad = Math.PI / 180
  const adjustedLon = lon + rotation.x
  const adjustedLat = lat + rotation.y * 0.45
  const phi = adjustedLat * rad
  const lambda = adjustedLon * rad
  const x = Math.cos(phi) * Math.sin(lambda)
  const y = -Math.sin(phi)
  const z = Math.cos(phi) * Math.cos(lambda)
  const radius = 42 * zoom
  return {
    x: 50 + x * radius,
    y: 50 + y * radius,
    visible: z > -0.35,
    depth: z,
  }
}

function buildRegionClusters(items) {
  return Object.entries(groupBy(items, 'region')).map(([region, regionItems]) => {
    const lat = regionItems.reduce((sum, item) => sum + item.lat, 0) / regionItems.length
    const lon = regionItems.reduce((sum, item) => sum + item.lon, 0) / regionItems.length
    const typeSet = Array.from(new Set(regionItems.map((item) => item.luminaireType)))
    return {
      id: `cluster-${region}`,
      region,
      area: regionItems[0].area,
      lat,
      lon,
      projects: regionItems.length,
      quantity: totalBy(regionItems, 'quantity'),
      annualSaving: totalBy(regionItems, 'annualSaving'),
      energySaved: totalBy(regionItems, 'energySaved'),
      carbonReduced: totalBy(regionItems, 'carbonReduced'),
      types: typeSet,
    }
  })
}

function KpiCard({ icon: Icon, label, value, sub }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
      <div className="mb-4 flex items-center justify-between">
        <div className="rounded-2xl bg-slate-100 p-2 text-slate-700">
          <Icon size={20} />
        </div>
        <span className="text-[11px] uppercase tracking-[0.26em] text-slate-400">QUICKET</span>
      </div>
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">{value}</div>
      <div className="mt-2 text-xs leading-5 text-slate-500">{sub}</div>
    </div>
  )
}

function MiniStat({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
      <div className="text-xs text-slate-500">{label}</div>
      <div className="mt-1 text-base font-semibold text-slate-950">{value}</div>
    </div>
  )
}

function GlobePoint({ item, point, zoom, onHover, onLeave, onSelect, isCluster }) {
  if (!point.visible) return null
  const size = isCluster ? Math.min(28, 13 + item.projects * 2) : Math.max(9, 12 * zoom)
  const color = isCluster ? '#22d3ee' : typeConfig[item.luminaireType]?.color || '#22d3ee'
  return (
    <button
      type="button"
      aria-label={isCluster ? item.region : item.projectName}
      onMouseEnter={(event) => onHover(event, item, isCluster)}
      onMouseMove={(event) => onHover(event, item, isCluster)}
      onMouseLeave={onLeave}
      onClick={() => onSelect(item, isCluster)}
      className="absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 shadow-glow transition-transform hover:scale-125"
      style={{
        left: `${point.x}%`,
        top: `${point.y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        opacity: Math.max(0.45, 0.7 + point.depth * 0.24),
      }}
    >
      {isCluster && <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">{item.projects}</span>}
    </button>
  )
}

function GlobeTooltip({ tooltip }) {
  if (!tooltip) return null
  const { item, x, y, isCluster } = tooltip
  return (
    <div
      className="pointer-events-none fixed z-50 max-w-xs rounded-2xl border border-slate-700 bg-slate-950/95 p-4 text-white shadow-2xl"
      style={{ left: x + 16, top: y + 16 }}
    >
      {isCluster ? (
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">Regional Aggregate</div>
          <div className="mt-1 text-lg font-semibold">{item.region}</div>
          <div className="mt-3 space-y-1 text-sm text-slate-300">
            <div>部署規格：{item.types.join(' / ')}</div>
            <div>總量：{formatNumber(item.quantity)} 套</div>
            <div>年度節約：{formatNTD(item.annualSaving)}</div>
            <div>年度節碳：{formatNumber(item.carbonReduced, 1)} t</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">Deployment Site</div>
          <div className="mt-1 text-base font-semibold">{item.projectName}</div>
          <div className="mt-3 space-y-1 text-sm text-slate-300">
            <div>應用：{item.applicationType}</div>
            <div>規格：{item.specification}</div>
            <div>用量：{formatNumber(item.quantity)} 套</div>
            <div>年度節電：{formatKwh(item.energySaved)}</div>
            <div>年度節碳：{formatNumber(item.carbonReduced, 1)} t</div>
          </div>
        </div>
      )}
    </div>
  )
}

function App() {
  const [viewMode, setViewMode] = useState('Overall')
  const [metricMode, setMetricMode] = useState('Overall Impact')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [selectedItem, setSelectedItem] = useState(null)
  const [tooltip, setTooltip] = useState(null)
  const [zoom, setZoom] = useState(1.05)
  const [rotation, setRotation] = useState({ x: 228, y: -10 })
  const [dragState, setDragState] = useState(null)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const typeMatch = selectedType === 'All' || project.luminaireType === selectedType
      const regionMatch = selectedRegion === 'All' || project.region === selectedRegion
      return typeMatch && regionMatch
    })
  }, [selectedType, selectedRegion])

  const totals = useMemo(() => {
    return {
      lifecycle: totalBy(filteredProjects, 'annualSaving') * 6 + totalBy(filteredProjects, 'maintenanceSaving'),
      annualSaving: totalBy(filteredProjects, 'annualSaving'),
      energy: totalBy(filteredProjects, 'energySaved'),
      carbon: totalBy(filteredProjects, 'carbonReduced'),
      maintenance: totalBy(filteredProjects, 'maintenanceSaving'),
      modules: totalBy(filteredProjects, 'quantity'),
      applications: new Set(filteredProjects.map((item) => item.luminaireType)).size,
      regions: new Set(filteredProjects.map((item) => item.region)).size,
      projects: filteredProjects.length,
    }
  }, [filteredProjects])

  const clusters = useMemo(() => buildRegionClusters(filteredProjects), [filteredProjects])
  const globeItems = zoom < 1.35 ? clusters : filteredProjects

  const applicationMix = useMemo(() => {
    return Object.entries(groupBy(filteredProjects, 'luminaireType')).map(([type, items]) => ({
      type,
      label: typeConfig[type]?.label || type,
      quantity: totalBy(items, 'quantity'),
      annualSaving: totalBy(items, 'annualSaving'),
      carbon: totalBy(items, 'carbonReduced'),
      color: typeConfig[type]?.color || '#0891b2',
    }))
  }, [filteredProjects])

  const regionImpact = useMemo(() => {
    return Object.entries(groupBy(filteredProjects, 'region')).map(([region, items]) => ({
      region,
      saving: Math.round(totalBy(items, 'annualSaving') / 1000000),
      carbon: Math.round(totalBy(items, 'carbonReduced')),
      modules: totalBy(items, 'quantity'),
    }))
  }, [filteredProjects])

  const insight = roleConfig[viewMode]
  const selectedSummary = selectedItem || {
    region: selectedRegion === 'All' ? 'Global Portfolio' : selectedRegion,
    annualSaving: totals.annualSaving,
    energySaved: totals.energy,
    carbonReduced: totals.carbon,
    quantity: totals.modules,
    projects: totals.projects,
    types: applicationMix.map((item) => item.type),
  }

  const handlePointerDown = (event) => {
    setDragState({ startX: event.clientX, startY: event.clientY, rotation })
  }

  const handlePointerMove = (event) => {
    if (!dragState) return
    setRotation({
      x: dragState.rotation.x + (event.clientX - dragState.startX) * 0.45,
      y: Math.max(-55, Math.min(55, dragState.rotation.y + (event.clientY - dragState.startY) * 0.28)),
    })
  }

  const handlePointerUp = () => setDragState(null)

  const handleWheel = (event) => {
    event.preventDefault()
    const nextZoom = zoom + (event.deltaY < 0 ? 0.1 : -0.1)
    setZoom(Math.max(0.75, Math.min(1.85, nextZoom)))
  }

  const handleHover = (event, item, isCluster) => {
    setTooltip({ item, isCluster, x: event.clientX, y: event.clientY })
  }

  const handleSelect = (item, isCluster) => {
    setSelectedItem(item)
    if (isCluster) setSelectedRegion(item.region)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <GlobeTooltip tooltip={tooltip} />
      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <header className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft">
          <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
                <Globe2 size={14} /> Modular Lighting Network
              </div>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                QUICKET Global Impact Warroom
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
                全球節約效益與應用部署總覽。地球儀展示 QUICKET 在不同地區、燈具類型與參與角色下累積出的生命週期節約規模；指標切換則讓不同參與者看到自己關心的總合表現。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              <MiniStat label="Project Nodes" value={formatNumber(totals.projects)} />
              <MiniStat label="Active Regions" value={formatNumber(totals.regions)} />
              <MiniStat label="Deployed Modules" value={formatNumber(totals.modules)} />
              <MiniStat label="Covered Applications" value={formatNumber(totals.applications)} />
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KpiCard icon={CircleDollarSign} label="Total Lifecycle Savings" value={formatNTD(totals.lifecycle)} sub="年度節約與維護節約之總合展示" />
          <KpiCard icon={Zap} label="Energy Saved" value={formatKwh(totals.energy)} sub="年度節電總量" />
          <KpiCard icon={Trees} label="CO₂ Reduced" value={`${formatNumber(totals.carbon, 1)} t`} sub="年度可量化節碳量" />
          <KpiCard icon={Factory} label="Maintenance Saved" value={formatNTD(totals.maintenance)} sub="整燈替換轉為模組替換" />
          <KpiCard icon={Layers3} label="Deployed Modules" value={formatNumber(totals.modules)} sub="跨燈具類型的模組部署數" />
          <KpiCard icon={Network} label="Application Coverage" value={`${formatNumber(totals.applications)} types`} sub="燈具類型與應用場域覆蓋" />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-soft sm:p-6">
            <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-950">
                  <Globe2 className="text-cyan-600" size={22} /> Interactive Deployment Globe
                </h2>
                <p className="mt-1 text-sm text-slate-500">拖曳旋轉、滾輪縮放。放大看單一案場；縮小看地區聚合。</p>
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  <option value="All">All luminaire types</option>
                  {Object.keys(typeConfig).map((type) => <option key={type} value={type}>{typeConfig[type].label} / {type}</option>)}
                </select>
                <select value={selectedRegion} onChange={(event) => setSelectedRegion(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  <option value="All">All regions</option>
                  {Array.from(new Set(projects.map((project) => project.region))).map((region) => <option key={region} value={region}>{region}</option>)}
                </select>
                <select value={metricMode} onChange={(event) => setMetricMode(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  <option>Overall Impact</option>
                  <option>Application Mix</option>
                  <option>Energy Saving</option>
                  <option>Carbon Reduction</option>
                  <option>Maintenance Saving</option>
                </select>
              </div>
            </div>

            <div className="globe-grid relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-950 p-4 text-white">
              <div className="absolute left-4 top-4 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs backdrop-blur">
                <MousePointer2 size={14} /> Hover site points for details
              </div>
              <div className="absolute bottom-4 left-4 z-30 flex flex-wrap gap-2">
                {Object.entries(typeConfig).map(([type, config]) => (
                  <span key={type} className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100">
                    <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: config.color }} />
                    {config.label}
                  </span>
                ))}
              </div>
              <div className="absolute right-4 top-4 z-30 flex gap-2">
                <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20" type="button" onClick={() => setZoom((value) => Math.min(1.85, value + 0.12))}><ZoomIn size={16} /></button>
                <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20" type="button" onClick={() => setZoom((value) => Math.max(0.75, value - 0.12))}><ZoomOut size={16} /></button>
              </div>
              <div
                className="relative mx-auto aspect-square w-full max-w-[620px] cursor-grab select-none rounded-full active:cursor-grabbing"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={() => { handlePointerUp(); setTooltip(null) }}
                onWheel={handleWheel}
              >
                <div className="globe-shell absolute inset-2 rounded-full border border-cyan-200/20 shadow-glow" />
                {globeItems.map((item) => {
                  const point = latLonToPoint(item.lat, item.lon, rotation, zoom)
                  const isCluster = item.id.startsWith('cluster-')
                  return (
                    <GlobePoint
                      key={item.id}
                      item={item}
                      point={point}
                      zoom={zoom}
                      isCluster={isCluster}
                      onHover={handleHover}
                      onLeave={() => setTooltip(null)}
                      onSelect={handleSelect}
                    />
                  )
                })}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-slate-950">Dynamic Insight Panel</h2>
                  <p className="mt-1 text-sm text-slate-500">選擇角色視角與地球儀節點後，查看總合表現。</p>
                </div>
                <Activity className="text-cyan-600" />
              </div>
              <select value={viewMode} onChange={(event) => setViewMode(event.target.value)} className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                {Object.entries(roleConfig).map(([role, config]) => <option key={role} value={role}>{config.label} / {role}</option>)}
              </select>
              <div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white">
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">{insight.label}</div>
                <h3 className="mt-2 text-xl font-semibold">{insight.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{insight.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {insight.metrics.map((metric) => <span key={metric} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-slate-200">{metric}</span>)}
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <MiniStat label="Current Scope" value={selectedSummary.region || selectedSummary.projectName} />
                <MiniStat label="Modules" value={formatNumber(selectedSummary.quantity)} />
                <MiniStat label="Annual Saving" value={formatNTD(selectedSummary.annualSaving)} />
                <MiniStat label="CO₂ Reduced" value={`${formatNumber(selectedSummary.carbonReduced, 1)} t`} />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-950"><Sparkles size={19} className="text-cyan-600" />Aggregated Signals</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Bay Light deployments show the strongest industrial payback signals.</div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Streetlight clusters create high-density maintenance replacement windows.</div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Selected sites are suitable for carbon data package preparation.</div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">Regional clustering indicates a reusable application specification layer.</div>
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-950"><BarChart3 className="text-cyan-600" size={20} />Application Mix</h2>
            <p className="mt-1 text-sm text-slate-500">依燈具類型顯示部署量與應用廣度。</p>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={applicationMix} dataKey="quantity" nameKey="label" innerRadius={62} outerRadius={96} paddingAngle={3}>
                    {applicationMix.map((entry) => <Cell key={entry.type} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(value) => `${formatNumber(value)} modules`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid gap-2">
              {applicationMix.map((item) => (
                <div key={item.type} className="flex items-center justify-between rounded-2xl border border-slate-200 p-3 text-sm">
                  <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />{item.label}</span>
                  <span className="font-semibold text-slate-950">{formatNumber(item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-950"><MapPin className="text-cyan-600" size={20} />Regional Aggregated Performance</h2>
            <p className="mt-1 text-sm text-slate-500">不列出完整案場表，而以區域總合呈現部署規模、節約與節碳。</p>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div className="h-72 rounded-3xl border border-slate-200 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionImpact}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="region" stroke="#64748b" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(value, name) => [name === 'saving' ? `NTD ${value}M` : value, name]} />
                    <Bar dataKey="saving" fill="#0891b2" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="h-72 rounded-3xl border border-slate-200 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={yearlyProjection}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="year" stroke="#64748b" />
                    <YAxis stroke="#64748b" />
                    <Tooltip />
                    <Area dataKey="savings" name="Savings NTD M" type="monotone" stroke="#0891b2" fill="#cffafe" />
                    <Area dataKey="carbon" name="CO₂ kt" type="monotone" stroke="#16a34a" fill="#dcfce7" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-950"><ShieldCheck className="text-cyan-600" size={20} />Data Structure Layer</h2>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600">
            本頁表面呈現 QUICKET 部署與節約效益，底層資料則依 Region、Application Type、Luminaire Type、Specification、Quantity、Saving Event、Maintenance Event、Partner Role 與 Status 聚合。這讓 QUICKET 的部署資料可被分類、查詢、聚合與封裝，而不需要在頁面上直接展示完整案場清單。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Region', 'Site', 'Luminaire Type', 'Application Type', 'Specification', 'Quantity', 'Saving Event', 'Maintenance Event', 'Partner Role', 'Status'].map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600">{tag}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
