import { useMemo, useRef, useState, useEffect } from 'react'

const typeStyles = {
  'Bay Light': { label: '天井燈', color: '#0891b2', bg: 'rgba(8,145,178,0.16)' },
  Streetlight: { label: '路燈', color: '#2563eb', bg: 'rgba(37,99,235,0.16)' },
  'Flood Light': { label: '投射燈', color: '#16a34a', bg: 'rgba(22,163,74,0.16)' },
  Downlight: { label: '崁燈', color: '#7c3aed', bg: 'rgba(124,58,237,0.16)' },
  'Special Lighting': { label: '特殊照明', color: '#f97316', bg: 'rgba(249,115,22,0.16)' },
}

const roleLabels = {
  overall: '總覽視角 / Overall',
  investor: 'Investor',
  owner: 'Project Owner',
  engineering: 'Engineering Partner',
  manufacturer: 'Lighting Manufacturer',
  esg: 'ESG / Carbon Partner',
  distribution: 'Distribution Partner',
}

const sites = [
  {
    id: 'tw-taichung-01',
    name: '眾鈴汽車｜台中港組裝廠',
    country: 'Taiwan',
    region: 'Taiwan',
    district: 'Taichung Port',
    application: 'Industrial Facility',
    luminaireType: 'Bay Light',
    specification: '150W QUICKET module, 170 lm/W',
    modules: 620,
    energySaved: 93000,
    carbonReduced: 45.9,
    annualSaving: 1450000,
    status: 'Active',
    partnerRole: 'Project Owner / Engineering Partner',
    x: 61,
    y: 34,
  },
  {
    id: 'tw-taipei-02',
    name: '台北商辦照明更新群',
    country: 'Taiwan',
    region: 'Taiwan',
    district: 'Taipei',
    application: 'Commercial Office',
    luminaireType: 'Downlight',
    specification: '15W QUICKET module, office downlight',
    modules: 980,
    energySaved: 76400,
    carbonReduced: 37.7,
    annualSaving: 960000,
    status: 'Pilot',
    partnerRole: 'Distribution Partner',
    x: 63,
    y: 31,
  },
  {
    id: 'sg-warehouse-01',
    name: 'Singapore Logistics Warehouse',
    country: 'Singapore',
    region: 'Southeast Asia',
    district: 'Jurong',
    application: 'Warehouse',
    luminaireType: 'Bay Light',
    specification: '120W QUICKET module, high-bay application',
    modules: 430,
    energySaved: 61200,
    carbonReduced: 30.2,
    annualSaving: 690000,
    status: 'Planning',
    partnerRole: 'Engineering Partner',
    x: 56,
    y: 53,
  },
  {
    id: 'om-port-01',
    name: 'Oman Port Lighting Program',
    country: 'Oman',
    region: 'Middle East',
    district: 'Sohar',
    application: 'Port / Public Infrastructure',
    luminaireType: 'Flood Light',
    specification: '150W QUICKET module, flood light application',
    modules: 1800,
    energySaved: 241000,
    carbonReduced: 119.1,
    annualSaving: 3480000,
    status: 'Partner Proposal',
    partnerRole: 'Investor / ESG Partner',
    x: 43,
    y: 47,
  },
  {
    id: 'uae-street-01',
    name: 'UAE Roadway Retrofit Cluster',
    country: 'UAE',
    region: 'Middle East',
    district: 'Abu Dhabi',
    application: 'Roadway',
    luminaireType: 'Streetlight',
    specification: '80W QUICKET module, streetlight application',
    modules: 3200,
    energySaved: 408000,
    carbonReduced: 201.6,
    annualSaving: 5260000,
    status: 'Planning',
    partnerRole: 'Distribution Partner / Project Owner',
    x: 46,
    y: 45,
  },
  {
    id: 'jp-factory-01',
    name: 'Japan Precision Factory Pilot',
    country: 'Japan',
    region: 'Japan',
    district: 'Nagoya',
    application: 'Industrial Facility',
    luminaireType: 'Bay Light',
    specification: '150W QUICKET module, factory lighting',
    modules: 720,
    energySaved: 104000,
    carbonReduced: 51.4,
    annualSaving: 1720000,
    status: 'Pilot',
    partnerRole: 'Engineering Partner',
    x: 68,
    y: 28,
  },
  {
    id: 'us-campus-01',
    name: 'US Campus Parking Retrofit',
    country: 'United States',
    region: 'North America',
    district: 'California',
    application: 'Outdoor Facility',
    luminaireType: 'Streetlight',
    specification: '90W QUICKET module, parking and roadway',
    modules: 1980,
    energySaved: 260000,
    carbonReduced: 128.4,
    annualSaving: 3990000,
    status: 'Simulated',
    partnerRole: 'Project Owner',
    x: 20,
    y: 37,
  },
  {
    id: 'de-public-01',
    name: 'Germany Public Facility Trial',
    country: 'Germany',
    region: 'Europe',
    district: 'Bavaria',
    application: 'Public Facility',
    luminaireType: 'Downlight',
    specification: '20W QUICKET module, public indoor application',
    modules: 640,
    energySaved: 49800,
    carbonReduced: 24.6,
    annualSaving: 820000,
    status: 'Simulated',
    partnerRole: 'ESG Partner',
    x: 38,
    y: 28,
  },
  {
    id: 'au-harbor-01',
    name: 'Australia Harbor Floodlight Pilot',
    country: 'Australia',
    region: 'Australia',
    district: 'Queensland',
    application: 'Harbor',
    luminaireType: 'Flood Light',
    specification: '150W QUICKET module, outdoor floodlight',
    modules: 520,
    energySaved: 70400,
    carbonReduced: 34.8,
    annualSaving: 980000,
    status: 'Planning',
    partnerRole: 'Lighting Manufacturer',
    x: 67,
    y: 70,
  },
  {
    id: 'tw-shipyard-01',
    name: '龍德造船廠照明測試案',
    country: 'Taiwan',
    region: 'Taiwan',
    district: 'Yilan',
    application: 'Shipyard',
    luminaireType: 'Special Lighting',
    specification: 'Special QUICKET module, industrial environment',
    modules: 220,
    energySaved: 28300,
    carbonReduced: 14.0,
    annualSaving: 410000,
    status: 'Testing',
    partnerRole: 'Lighting Manufacturer / Project Owner',
    x: 65,
    y: 35,
  },
]

function currency(value) {
  if (value >= 100000000) return `NTD ${(value / 100000000).toFixed(1)} 億`
  if (value >= 1000000) return `NTD ${(value / 1000000).toFixed(1)}M`
  return `NTD ${value.toLocaleString('zh-TW')}`
}

function number(value) {
  return value.toLocaleString('zh-TW')
}

function sum(list, key) {
  return list.reduce((total, item) => total + item[key], 0)
}

function buildRegionClusters(list) {
  const map = new Map()
  list.forEach((site) => {
    const current = map.get(site.region) || {
      id: `region-${site.region}`,
      kind: 'region',
      name: site.region,
      region: site.region,
      modules: 0,
      energySaved: 0,
      carbonReduced: 0,
      annualSaving: 0,
      applications: new Set(),
      luminaireTypes: new Set(),
      sites: 0,
      x: 0,
      y: 0,
    }
    current.modules += site.modules
    current.energySaved += site.energySaved
    current.carbonReduced += site.carbonReduced
    current.annualSaving += site.annualSaving
    current.applications.add(site.application)
    current.luminaireTypes.add(site.luminaireType)
    current.sites += 1
    current.x += site.x
    current.y += site.y
    map.set(site.region, current)
  })
  return Array.from(map.values()).map((cluster) => ({
    ...cluster,
    x: cluster.x / cluster.sites,
    y: cluster.y / cluster.sites,
    applications: Array.from(cluster.applications),
    luminaireTypes: Array.from(cluster.luminaireTypes),
  }))
}

const globalSignals = {
  overall: [
    'Deployment data is grouped by region, country, district, luminaire type and saving events instead of exposing raw site lists.',
    'Bay Light and Streetlight deployments form the largest repeatable application base.',
    'Regional clustering shows where QUICKET can become a reusable lighting interface rather than a single-project product.',
  ],
  investor: [
    'Portfolio scale is visible through deployed modules, active regions and covered applications.',
    'Middle East and Taiwan clusters indicate different expansion paths: infrastructure scale and industrial proof.',
    'Accumulated lifecycle savings can be used to discuss platform value beyond luminaire sales.',
  ],
  owner: [
    'Project owners see reduced energy cost, fewer full-luminaire replacements and lower long-term maintenance pressure.',
    'Hovering each deployment point shows the specification and quantity behind the saving estimate.',
    'Cluster mode helps compare a single facility against regional portfolio performance.',
  ],
  engineering: [
    'Repeated Bay Light, Streetlight and Flood Light cases show which specifications can become reusable design packages.',
    'District-level aggregation can support project planning without exposing full customer site details.',
    'Maintenance events can become planning signals for replacement windows and upgrade timing.',
  ],
  manufacturer: [
    'Luminaire type clusters reveal where a modular product line can extend beyond one fixture category.',
    'Shipment quantities are represented through modules and applications, not only by individual projects.',
    'Special Lighting cases can be separated from standard applications for co-developed product opportunities.',
  ],
  esg: [
    'Carbon reduction is grouped by region and application type, forming an early data package structure.',
    'Each deployment point keeps specification, quantity, saving event and maintenance event fields available for verification.',
    'Clustered data can support methodology sampling without presenting every site as a public list.',
  ],
  distribution: [
    'Regions with multiple luminaire types show stronger repeatable sales scenarios.',
    'Distribution partners can focus on application clusters instead of selling isolated luminaires.',
    'Aggregated deployment volume helps frame regional inventory and channel planning.',
  ],
}

function KpiCard({ title, value, note }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-sm">
      <div className="text-sm text-slate-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{value}</div>
      <div className="mt-3 text-xs leading-5 text-slate-500">{note}</div>
    </div>
  )
}

function Pill({ children }) {
  return <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600">{children}</span>
}

function App() {
  const globeRef = useRef(null)
  const [zoom, setZoom] = useState(0.95)
  const [rotation, setRotation] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, rotation: 0 })
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const [luminaireFilter, setLuminaireFilter] = useState('All')
  const [regionFilter, setRegionFilter] = useState('All')
  const [role, setRole] = useState('overall')

  const clusters = useMemo(() => buildRegionClusters(sites), [])

  const filteredSites = useMemo(() => {
    return sites.filter((site) => {
      const matchType = luminaireFilter === 'All' || site.luminaireType === luminaireFilter
      const matchRegion = regionFilter === 'All' || site.region === regionFilter
      return matchType && matchRegion
    })
  }, [luminaireFilter, regionFilter])

  const filteredClusters = useMemo(() => buildRegionClusters(filteredSites), [filteredSites])
  const activePoints = zoom < 1.12 ? filteredClusters : filteredSites
  const activeItem = selected || hovered

  const global = useMemo(() => {
    const active = filteredSites.length > 0 ? filteredSites : sites
    return {
      projects: active.length,
      regions: new Set(active.map((item) => item.region)).size,
      modules: sum(active, 'modules'),
      energySaved: sum(active, 'energySaved'),
      carbonReduced: sum(active, 'carbonReduced'),
      annualSaving: sum(active, 'annualSaving'),
      applications: new Set(active.map((item) => item.application)).size,
      luminaireTypes: new Set(active.map((item) => item.luminaireType)).size,
    }
  }, [filteredSites])

  useEffect(() => {
    const node = globeRef.current
    if (!node) return undefined
    const handleWheel = (event) => {
      event.preventDefault()
      const delta = event.deltaY > 0 ? -0.08 : 0.08
      setZoom((current) => Math.min(1.55, Math.max(0.78, Number((current + delta).toFixed(2)))))
    }
    node.addEventListener('wheel', handleWheel, { passive: false })
    return () => node.removeEventListener('wheel', handleWheel)
  }, [])

  const handleMouseDown = (event) => {
    setDragging(true)
    setDragStart({ x: event.clientX, rotation })
  }

  const handleMouseMove = (event) => {
    if (!dragging) return
    const diff = event.clientX - dragStart.x
    setRotation(dragStart.rotation + diff * 0.18)
  }

  const stopDragging = () => setDragging(false)

  const resetView = () => {
    setZoom(0.95)
    setRotation(0)
    setSelected(null)
    setHovered(null)
  }

  const regions = ['All', ...Array.from(new Set(sites.map((site) => site.region)))]
  const luminaireTypes = ['All', ...Object.keys(typeStyles)]
  const insight = activeItem || { kind: 'global', name: 'Global Portfolio' }
  const signals = globalSignals[role]

  return (
    <main className="min-h-screen px-4 py-4 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-[1560px] space-y-5">
        <header className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-sm lg:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
                <span>◎</span>
                Modular Lighting Network
              </div>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                QUICKET Global Impact Warroom
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                全球節約效益與應用部署總覽。地球儀呈現 QUICKET 在不同地區、燈具類型與參與角色下累積出的生命週期節約規模。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Project Nodes</div>
                <div className="mt-2 text-2xl font-semibold">{number(global.projects)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Active Regions</div>
                <div className="mt-2 text-2xl font-semibold">{number(global.regions)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Deployed Modules</div>
                <div className="mt-2 text-2xl font-semibold">{number(global.modules)}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm text-slate-500">Covered Applications</div>
                <div className="mt-2 text-2xl font-semibold">{number(global.applications)}</div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
          <KpiCard title="Total Lifecycle Savings" value={currency(global.annualSaving * 8)} note="以多案場年節約推估的生命週期效益" />
          <KpiCard title="Annual Saving" value={currency(global.annualSaving)} note="目前篩選條件下的年度節約" />
          <KpiCard title="Energy Saved" value={`${(global.energySaved / 1000000).toFixed(2)}M kWh`} note="年度節電總量" />
          <KpiCard title="CO₂ Reduced" value={`${global.carbonReduced.toFixed(1)} t`} note="年度量化節碳量" />
          <KpiCard title="Deployed Modules" value={number(global.modules)} note="跨燈具類型模組部署數" />
          <KpiCard title="Application Coverage" value={`${global.luminaireTypes} types`} note="燈具類型與應用場域覆蓋" />
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.48fr_0.92fr]">
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-sm lg:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-sm font-medium text-cyan-700">Interactive Administrative Globe</div>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight">行政區域式部署地球儀</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  拖曳旋轉，滾輪縮放。縮小顯示國家或區域聚合，放大顯示單一案場。游標移入地球儀時，頁面滾軸不會跟著移動。
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 lg:w-[620px]">
                <select value={luminaireFilter} onChange={(event) => setLuminaireFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  {luminaireTypes.map((item) => <option key={item}>{item}</option>)}
                </select>
                <select value={regionFilter} onChange={(event) => setRegionFilter(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  {regions.map((item) => <option key={item}>{item}</option>)}
                </select>
                <button onClick={resetView} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:border-cyan-300 hover:text-cyan-700">
                  Reset Globe View
                </button>
              </div>
            </div>

            <div
              ref={globeRef}
              className="globe-shell grid-bg relative mt-5 h-[520px] overflow-hidden rounded-[1.6rem] border border-slate-900 select-none lg:h-[580px]"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={stopDragging}
              onMouseLeave={() => {
                stopDragging()
                setHovered(null)
              }}
            >
              <div className="absolute left-6 top-5 z-20 rounded-2xl bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur">
                {zoom < 1.12 ? 'Cluster mode：國家／地區聚合' : 'Site mode：單一案場'}
              </div>
              <div className="absolute right-5 top-5 z-20 flex gap-2">
                <button onClick={() => setZoom((current) => Math.min(1.55, current + 0.08))} className="rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur hover:bg-white/20">＋</button>
                <button onClick={() => setZoom((current) => Math.max(0.78, current - 0.08))} className="rounded-full bg-white/10 px-3 py-2 text-sm text-white backdrop-blur hover:bg-white/20">－</button>
              </div>

              <div
                className="globe-sphere absolute left-1/2 top-1/2 h-[460px] w-[460px] rounded-full lg:h-[560px] lg:w-[560px]"
                style={{ transform: `translate(-50%, -50%) scale(${zoom}) rotate(${rotation}deg)` }}
              >
                <div className="globe-equator" />
                <div className="admin-line left-[18%] top-[26%] h-[18%] w-[34%] rotate-[-18deg]" />
                <div className="admin-line left-[36%] top-[18%] h-[20%] w-[40%] rotate-[14deg]" />
                <div className="admin-line left-[24%] top-[52%] h-[16%] w-[42%] rotate-[9deg]" />
                <div className="admin-line left-[52%] top-[43%] h-[19%] w-[27%] rotate-[-22deg]" />
                <div className="region-line left-[18%] top-[37%] w-[64%] rotate-[-8deg]" />
                <div className="region-line left-[20%] top-[61%] w-[56%] rotate-[11deg]" />
                <div className="region-line left-[32%] top-[48%] w-[45%] rotate-[-28deg]" />
              </div>

              {activePoints.map((point) => {
                const kind = point.kind === 'region' ? 'region' : 'site'
                const type = kind === 'site' ? point.luminaireType : point.luminaireTypes[0]
                const style = typeStyles[type] || typeStyles['Bay Light']
                const size = kind === 'region' ? Math.min(36, 20 + point.sites * 4) : 15
                return (
                  <button
                    key={point.id}
                    type="button"
                    onMouseEnter={() => setHovered(point)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={(event) => {
                      event.stopPropagation()
                      setSelected(point)
                    }}
                    className="absolute z-30 flex items-center justify-center rounded-full text-[11px] font-semibold text-white shadow-lg transition hover:scale-110"
                    style={{
                      left: `${point.x}%`,
                      top: `${point.y}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      background: style.color,
                      boxShadow: `0 0 0 6px ${style.bg}, 0 0 18px ${style.color}`,
                    }}
                  >
                    {kind === 'region' ? point.sites : ''}
                  </button>
                )
              })}

              {(hovered || selected) && (
                <div className="absolute bottom-5 left-5 z-40 max-w-md rounded-3xl border border-white/15 bg-slate-950/88 p-4 text-white shadow-2xl backdrop-blur">
                  {insight.kind === 'region' ? (
                    <div>
                      <div className="text-xs uppercase tracking-[0.25em] text-cyan-200">Regional Cluster</div>
                      <div className="mt-2 text-xl font-semibold">{insight.region}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-300">
                        部署規格：{insight.luminaireTypes.join(' / ')}<br />
                        總量：{number(insight.modules)} modules｜年度節約：{currency(insight.annualSaving)}｜節碳：{insight.carbonReduced.toFixed(1)} t
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-xs uppercase tracking-[0.25em] text-cyan-200">Project Site</div>
                      <div className="mt-2 text-xl font-semibold">{insight.name}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-300">
                        {insight.luminaireType}｜{insight.specification}<br />
                        用量：{number(insight.modules)} modules｜年度節約：{currency(insight.annualSaving)}｜節碳：{insight.carbonReduced.toFixed(1)} t
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="absolute bottom-5 right-5 z-20 flex flex-wrap justify-end gap-2">
                {Object.entries(typeStyles).map(([key, item]) => (
                  <div key={key} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
                    <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: item.color }} />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-sm lg:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm font-medium text-cyan-700">Dynamic Insight Panel</div>
                  <h2 className="mt-1 text-2xl font-semibold tracking-tight">總合解讀面板</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">依地球儀 hover 或選取結果變動。</p>
                </div>
                <button onClick={() => setSelected(null)} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500 hover:text-cyan-700">
                  Clear
                </button>
              </div>

              <div className="mt-5 rounded-[1.5rem] bg-slate-950 p-5 text-white">
                <div className="text-xs uppercase tracking-[0.25em] text-cyan-300">{insight.kind === 'region' ? 'Regional View' : insight.kind === 'global' ? 'Global View' : 'Site View'}</div>
                <h3 className="mt-3 text-2xl font-semibold">{insight.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {insight.kind === 'global' && '顯示 QUICKET 在多案場、多燈具類型與多區域下的總節約效益與部署密度。'}
                  {insight.kind === 'region' && `${insight.region} 聚合 ${insight.sites} 個部署節點，主要應用包含 ${insight.applications.join('、')}。`}
                  {insight.kind !== 'global' && insight.kind !== 'region' && `${insight.country}｜${insight.district}｜${insight.application}，目前狀態為 ${insight.status}。`}
                </p>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-slate-400">Modules</div>
                    <div className="mt-1 text-xl font-semibold">{number(insight.modules || global.modules)}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-slate-400">Annual Saving</div>
                    <div className="mt-1 text-xl font-semibold">{currency(insight.annualSaving || global.annualSaving)}</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-slate-400">CO₂ Reduced</div>
                    <div className="mt-1 text-xl font-semibold">{(insight.carbonReduced || global.carbonReduced).toFixed(1)} t</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs text-slate-400">Scope</div>
                    <div className="mt-1 text-xl font-semibold">{insight.kind === 'region' ? `${insight.sites} sites` : insight.kind === 'global' ? `${global.regions} regions` : insight.luminaireType}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-sm lg:p-6">
              <div className="text-sm font-medium text-cyan-700">View Selector</div>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">角色視角與總合訊號</h2>
              <select value={role} onChange={(event) => setRole(event.target.value)} className="mt-4 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                {Object.entries(roleLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}
              </select>
              <div className="mt-4 space-y-3">
                {signals.map((signal) => (
                  <div key={signal} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                    {signal}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="rounded-[2rem] border border-white/70 bg-white/90 p-5 shadow-sm lg:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-sm font-medium text-cyan-700">Data Structure Layer</div>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">資料分類與封裝暗線</h2>
              <p className="mt-2 max-w-4xl text-sm leading-7 text-slate-600">
                本頁表面呈現 QUICKET 部署與節約效益，底層資料依地區、國家、行政區、案場、燈具類型、應用類型、規格、數量、節約事件、維護事件、參與角色與狀態聚合。這讓部署資料可以被分類、查詢、聚合與封裝，而不需要在頁面上直接展開完整案場清單。
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
              {['Region', 'Country', 'District', 'Site', 'Luminaire Type', 'Application Type', 'Specification', 'Quantity', 'Saving Event', 'Maintenance Event', 'Partner Role', 'Status'].map((item) => <Pill key={item}>{item}</Pill>)}
            </div>
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
