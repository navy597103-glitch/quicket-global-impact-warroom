
import React, { useMemo, useRef, useState } from 'react'

const luminaireLabels = {
  all: '全部',
  bay: '天井燈',
  street: '路燈',
  flood: '投射燈',
  down: '崁燈',
  special: '特殊照明',
}

const metricLabels = {
  modules: '部署量',
  saving: '節約金額',
  energy: '節電量',
  carbon: '節碳量',
  maintenance: '維護節約',
}

const levelLabels = {
  global: '全球',
  country: '國家',
  district: '區域',
  site: '案場',
}


const colorMap = {
  bay: '#0ea5e9',
  street: '#2563eb',
  flood: '#16a34a',
  down: '#7c3aed',
  special: '#f97316',
}

const deployments = [
  {
    id: 'tw-taichung-bay',
    type: 'site',
    name: '眾鈴汽車｜台中港組裝廠',
    region: 'Asia',
    country: 'Taiwan',
    district: 'Taichung Port',
    luminaire: 'bay',
    application: '工廠天井燈',
    spec: '150W QUICKET 模組',
    modules: 620,
    annualSaving: 1450000,
    lifecycleSaving: 8651790,
    energySaved: 93000,
    carbonReduced: 45.9,
    maintenanceSaved: 5580000,
    status: 'Active',
    x: 57,
    y: 50,
  },
  {
    id: 'tw-north-down',
    type: 'site',
    name: '北部商辦更新案',
    region: 'Asia',
    country: 'Taiwan',
    district: 'Taipei',
    luminaire: 'down',
    application: '商辦崁燈',
    spec: '15W QUICKET 模組',
    modules: 880,
    annualSaving: 980000,
    lifecycleSaving: 5600000,
    energySaved: 72000,
    carbonReduced: 35.6,
    maintenanceSaved: 3200000,
    status: 'Planning',
    x: 55,
    y: 43,
  },
  {
    id: 'sg-bay',
    type: 'site',
    name: 'Singapore Logistics Hub',
    region: 'Asia',
    country: 'Singapore',
    district: 'Jurong',
    luminaire: 'bay',
    application: '倉儲照明',
    spec: '120W QUICKET 模組',
    modules: 1100,
    annualSaving: 2100000,
    lifecycleSaving: 11900000,
    energySaved: 152000,
    carbonReduced: 75.1,
    maintenanceSaved: 6900000,
    status: 'Pilot',
    x: 52,
    y: 58,
  },
  {
    id: 'jp-street',
    type: 'site',
    name: 'Japan Streetlight Cluster',
    region: 'Asia',
    country: 'Japan',
    district: 'Kansai',
    luminaire: 'street',
    application: '公共路燈',
    spec: '80W QUICKET 模組',
    modules: 1600,
    annualSaving: 3300000,
    lifecycleSaving: 18400000,
    energySaved: 210000,
    carbonReduced: 103.7,
    maintenanceSaved: 9800000,
    status: 'Proposal',
    x: 63,
    y: 40,
  },
  {
    id: 'om-flood',
    type: 'site',
    name: 'Oman Port Floodlight Field',
    region: 'Middle East',
    country: 'Oman',
    district: 'Sohar',
    luminaire: 'flood',
    application: '港區投射燈',
    spec: '150W QUICKET 模組',
    modules: 1800,
    annualSaving: 4200000,
    lifecycleSaving: 23600000,
    energySaved: 286000,
    carbonReduced: 141.3,
    maintenanceSaved: 12200000,
    status: 'Planning',
    x: 42,
    y: 55,
  },
  {
    id: 'ae-street',
    type: 'site',
    name: 'UAE Smart Streetlight Pilot',
    region: 'Middle East',
    country: 'UAE',
    district: 'Abu Dhabi',
    luminaire: 'street',
    application: '智慧路燈',
    spec: '90W QUICKET 模組',
    modules: 2250,
    annualSaving: 5100000,
    lifecycleSaving: 31000000,
    energySaved: 351000,
    carbonReduced: 173.4,
    maintenanceSaved: 17800000,
    status: 'Pilot',
    x: 46,
    y: 53,
  },
  {
    id: 'de-special',
    type: 'site',
    name: 'Germany Industrial Safety Lighting',
    region: 'Europe',
    country: 'Germany',
    district: 'Ruhr',
    luminaire: 'special',
    application: '特殊工業照明',
    spec: '70W QUICKET 模組',
    modules: 360,
    annualSaving: 820000,
    lifecycleSaving: 4800000,
    energySaved: 46000,
    carbonReduced: 22.7,
    maintenanceSaved: 2600000,
    status: 'Proposal',
    x: 37,
    y: 36,
  },
  {
    id: 'us-warehouse',
    type: 'site',
    name: 'US Warehouse Retrofit',
    region: 'North America',
    country: 'United States',
    district: 'Texas',
    luminaire: 'bay',
    application: '倉儲天井燈',
    spec: '140W QUICKET 模組',
    modules: 1400,
    annualSaving: 2700000,
    lifecycleSaving: 15600000,
    energySaved: 188000,
    carbonReduced: 92.9,
    maintenanceSaved: 8400000,
    status: 'Partner Proposal',
    x: 24,
    y: 46,
  },
  {
    id: 'au-down',
    type: 'site',
    name: 'Australia Retail Downlight Network',
    region: 'Oceania',
    country: 'Australia',
    district: 'Sydney',
    luminaire: 'down',
    application: '零售崁燈',
    spec: '18W QUICKET 模組',
    modules: 900,
    annualSaving: 760000,
    lifecycleSaving: 4200000,
    energySaved: 56000,
    carbonReduced: 27.7,
    maintenanceSaved: 2500000,
    status: 'Simulated',
    x: 61,
    y: 71,
  },
  {
    id: 'id-flood',
    type: 'site',
    name: 'Indonesia Outdoor Facility',
    region: 'Southeast Asia',
    country: 'Indonesia',
    district: 'Jakarta',
    luminaire: 'flood',
    application: '戶外場域',
    spec: '100W QUICKET 模組',
    modules: 1200,
    annualSaving: 2100000,
    lifecycleSaving: 12600000,
    energySaved: 148000,
    carbonReduced: 73.1,
    maintenanceSaved: 7200000,
    status: 'Planning',
    x: 55,
    y: 63,
  },
]

const regionPositions = {
  Asia: { x: 58, y: 48 },
  'Middle East': { x: 44, y: 54 },
  Europe: { x: 37, y: 36 },
  'North America': { x: 24, y: 46 },
  Oceania: { x: 61, y: 71 },
  'Southeast Asia': { x: 55, y: 61 },
}

const countryPositions = {
  Taiwan: { x: 56, y: 46 },
  Singapore: { x: 52, y: 58 },
  Japan: { x: 63, y: 40 },
  Oman: { x: 42, y: 55 },
  UAE: { x: 46, y: 53 },
  Germany: { x: 37, y: 36 },
  'United States': { x: 24, y: 46 },
  Australia: { x: 61, y: 71 },
  Indonesia: { x: 55, y: 63 },
}


function numberFormat(value) {
  return new Intl.NumberFormat('zh-TW').format(Math.round(value))
}

function compactMoney(value) {
  if (value >= 100000000) return `NTD ${(value / 100000000).toFixed(1)} 億`
  if (value >= 1000000) return `NTD ${(value / 1000000).toFixed(1)}M`
  return `NTD ${numberFormat(value)}`
}

function sum(items, key) {
  return items.reduce((total, item) => total + item[key], 0)
}

function unique(items, key) {
  return Array.from(new Set(items.map((item) => item[key])))
}

function getFilteredSites(sites, luminaire) {
  return sites.filter((site) => luminaire === 'all' || site.luminaire === luminaire)
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    const value = item[key]
    if (!groups[value]) groups[value] = []
    groups[value].push(item)
    return groups
  }, {})
}

function aggregatePoint(label, groupType, items, position) {
  const luminaireTypes = unique(items, 'luminaire')
  return {
    id: `${groupType}-${label}`,
    type: 'cluster',
    groupType,
    label,
    name: label,
    x: position?.x ?? 50,
    y: position?.y ?? 50,
    modules: sum(items, 'modules'),
    annualSaving: sum(items, 'annualSaving'),
    lifecycleSaving: sum(items, 'lifecycleSaving'),
    energySaved: sum(items, 'energySaved'),
    carbonReduced: sum(items, 'carbonReduced'),
    maintenanceSaved: sum(items, 'maintenanceSaved'),
    luminaireTypes,
    applications: unique(items, 'application'),
    sites: items.length,
    countries: unique(items, 'country'),
  }
}

function buildGlobePoints(sites, level, zoom) {
  if (level === 'site' || zoom > 1.65) {
    return sites
  }

  if (level === 'district' || zoom > 1.25) {
    const grouped = groupBy(sites, 'country')
    return Object.entries(grouped).map(([country, items]) => (
      aggregatePoint(country, 'country', items, countryPositions[country])
    ))
  }

  if (level === 'country' || zoom > 0.95) {
    const grouped = groupBy(sites, 'country')
    return Object.entries(grouped).map(([country, items]) => (
      aggregatePoint(country, 'country', items, countryPositions[country])
    ))
  }

  const grouped = groupBy(sites, 'region')
  return Object.entries(grouped).map(([region, items]) => (
    aggregatePoint(region, 'region', items, regionPositions[region])
  ))
}

function statusLabel(status) {
  const map = {
    Active: 'Active',
    Pilot: 'Pilot',
    Planning: 'Planning',
    Proposal: 'Proposal',
    Simulated: 'Simulated',
    'Partner Proposal': 'Partner Proposal',
  }
  return map[status] || status
}

function computeSummary(items) {
  return {
    modules: sum(items, 'modules'),
    annualSaving: sum(items, 'annualSaving'),
    lifecycleSaving: sum(items, 'lifecycleSaving'),
    energySaved: sum(items, 'energySaved'),
    carbonReduced: sum(items, 'carbonReduced'),
    maintenanceSaved: sum(items, 'maintenanceSaved'),
    applications: unique(items, 'application').length,
    regions: unique(items, 'region').length,
    countries: unique(items, 'country').length,
    sites: items.length,
  }
}

function buildSelectionSummary(selected, filteredSites) {
  if (!selected) {
    return {
      title: 'Global Portfolio',
      label: 'GLOBAL VIEW',
      description: '顯示 QUICKET 在多案場、多燈具類型與多地區下的總節約效益與部署密度。',
      summary: computeSummary(filteredSites),
      chips: ['Global', 'Portfolio', 'Aggregated'],
    }
  }

  if (selected.type === 'cluster') {
    const summary = {
      modules: selected.modules,
      annualSaving: selected.annualSaving,
      lifecycleSaving: selected.lifecycleSaving,
      energySaved: selected.energySaved,
      carbonReduced: selected.carbonReduced,
      maintenanceSaved: selected.maintenanceSaved,
      applications: selected.applications.length,
      regions: selected.groupType === 'region' ? 1 : undefined,
      countries: selected.countries.length,
      sites: selected.sites,
    }
    return {
      title: `${selected.label} Deployment Cluster`,
      label: selected.groupType === 'region' ? 'REGION CLUSTER' : 'COUNTRY CLUSTER',
      description: `聚合 ${selected.sites} 個部署節點，涵蓋 ${selected.luminaireTypes.map((type) => luminaireLabels[type]).join('、')}。`,
      summary,
      chips: selected.applications.slice(0, 4),
    }
  }

  return {
    title: selected.name,
    label: 'SITE NODE',
    description: `${selected.country}｜${selected.district}｜${selected.application}｜${selected.spec}`,
    summary: {
      modules: selected.modules,
      annualSaving: selected.annualSaving,
      lifecycleSaving: selected.lifecycleSaving,
      energySaved: selected.energySaved,
      carbonReduced: selected.carbonReduced,
      maintenanceSaved: selected.maintenanceSaved,
      applications: 1,
      regions: 1,
      countries: 1,
      sites: 1,
    },
    chips: [luminaireLabels[selected.luminaire], selected.status, selected.application],
  }
}


function buildPanelInterpretation(selectionSummary, metric) {
  const metricLabel = metricLabels[metric]
  const title = selectionSummary.title
  const summary = selectionSummary.summary

  if (selectionSummary.label === 'SITE NODE') {
    return `${title} 目前以單一案場節點呈現。此視角聚焦於 ${metricLabel}，可直接查看該案場的用量、年度節約、節電與節碳成果。`
  }

  if (selectionSummary.label === 'REGION CLUSTER' || selectionSummary.label === 'COUNTRY CLUSTER') {
    return `${title} 為聚合視角，涵蓋 ${summary.sites} 個部署節點。此視角可用於比較區域部署密度、總量與年度節約成果。`
  }

  return `目前顯示 QUICKET 全球部署組合。地球儀負責呈現部署廣度與節點密度，右側面板統合目前範圍內的部署量、節約金額、節電量與節碳成果。`
}

function App() {
  const [luminaire, setLuminaire] = useState('all')
  const [level, setLevel] = useState('global')
  const [metric, setMetric] = useState('modules')
  const [zoom, setZoom] = useState(0.88)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState(null)
  const [selected, setSelected] = useState(null)
  const globeRef = useRef(null)


  const filteredSites = useMemo(() => {
    return getFilteredSites(deployments, luminaire)
  }, [luminaire])

  const points = useMemo(() => {
    return buildGlobePoints(filteredSites, level, zoom)
  }, [filteredSites, level, zoom])

  const globalSummary = useMemo(() => computeSummary(filteredSites), [filteredSites])
  const selectionSummary = useMemo(() => buildSelectionSummary(selected, filteredSites), [selected, filteredSites])

  const handleWheel = (event) => {
    event.preventDefault()
    event.stopPropagation()
    const direction = event.deltaY > 0 ? -0.08 : 0.08
    setZoom((current) => Math.min(1.85, Math.max(0.72, current + direction)))
  }

  const handleMouseDown = (event) => {
    setDragging(true)
    setDragStart({ x: event.clientX, y: event.clientY, rotation })
  }

  const handleMouseMove = (event) => {
    if (!dragging || !dragStart) return
    const dx = event.clientX - dragStart.x
    const dy = event.clientY - dragStart.y
    setRotation({
      x: dragStart.rotation.x + dx * 0.12,
      y: dragStart.rotation.y + dy * 0.08,
    })
  }

  const handleMouseUp = () => {
    setDragging(false)
    setDragStart(null)
  }

  const resetView = () => {
    setZoom(0.88)
    setRotation({ x: 0, y: 0 })
    setSelected(null)
  }

  const makePointStyle = (point) => {
    const baseScale = point.type === 'cluster'
      ? Math.min(2.3, Math.max(1, point.modules / 3000))
      : Math.min(1.45, Math.max(0.85, point.modules / 900))
    const color = point.type === 'cluster' ? '#22d3ee' : colorMap[point.luminaire]
    return {
      left: `${point.x}%`,
      top: `${point.y}%`,
      '--point-color': color,
      '--point-scale': baseScale,
    }
  }

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand-block">
          <div className="brand-mark">Q</div>
          <div>
            <div className="eyebrow">Modular Lighting Network</div>
            <h1>QUICKET Global Impact Warroom</h1>
          </div>
        </div>
      </header>

      <main className="warroom-grid">
        <section className="globe-card">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Global Deployment Network</span>
              <h2>QUICKET 全球部署</h2>
            </div>
            <button className="ghost-button" type="button" onClick={resetView}>Reset View</button>
          </div>

          <div
            className="globe-stage"
            ref={globeRef}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
          >
            <div className="globe-help">拖曳旋轉｜滾輪縮放｜移至節點查看資料</div>
            <div
              className="globe-sphere"
              style={{
                transform: `translate(-50%, -50%) scale(${zoom}) rotate(${rotation.x}deg)`,
              }}
            >
              <div className="equator-line" />
              <div className="globe-axis-line" />
              <div className="admin-line admin-line-one" />
              <div className="admin-line admin-line-two" />
              <div className="admin-line admin-line-three" />
              <div className="admin-line admin-line-four" />
              <div className="map-zone zone-north-america"><span>North America</span></div>
              <div className="map-zone zone-europe"><span>Europe</span></div>
              <div className="map-zone zone-middle-east"><span>Middle East</span></div>
              <div className="map-zone zone-asia"><span>Asia</span></div>
              <div className="map-zone zone-southeast-asia"><span>SEA</span></div>
              <div className="map-zone zone-oceania"><span>Oceania</span></div>
              <div className="country-boundary country-taiwan" title="Taiwan" />
              <div className="country-boundary country-japan" title="Japan" />
              <div className="country-boundary country-oman" title="Oman" />
              <div className="country-boundary country-uae" title="UAE" />
              <div className="country-boundary country-germany" title="Germany" />
              <div className="country-boundary country-us" title="United States" />
              <div className="country-boundary country-australia" title="Australia" />
              <div className="country-boundary country-indonesia" title="Indonesia" />
            </div>

            {points.map((point) => (
              <button
                key={point.id}
                className={`deployment-point ${point.type === 'cluster' ? 'cluster-point' : ''}`}
                style={makePointStyle(point)}
                type="button"
                onMouseEnter={() => setSelected(point)}
                onFocus={() => setSelected(point)}
                onClick={() => setSelected(point)}
                aria-label={point.name}
              >
                <span>{point.type === 'cluster' ? point.sites : ''}</span>
                <div className="tooltip">
                  {point.type === 'cluster' ? (
                    <>
                      <strong>{point.label}</strong>
                      <p>部署規格：{point.luminaireTypes.map((type) => luminaireLabels[type]).join('、')}</p>
                      <p>總量：{numberFormat(point.modules)} modules</p>
                      <p>年度節約：{compactMoney(point.annualSaving)}</p>
                      <p>年度節碳：{point.carbonReduced.toFixed(1)} t</p>
                    </>
                  ) : (
                    <>
                      <strong>{point.name}</strong>
                      <p>{point.application}｜{point.spec}</p>
                      <p>用量：{numberFormat(point.modules)} modules</p>
                      <p>年度節約：{compactMoney(point.annualSaving)}</p>
                      <p>年度節碳：{point.carbonReduced.toFixed(1)} t</p>
                    </>
                  )}
                </div>
              </button>
            ))}

            <div className="globe-legend">
              {Object.entries(colorMap).map(([type, color]) => (
                <span key={type}><i style={{ background: color }} />{luminaireLabels[type]}</span>
              ))}
            </div>
          </div>

          <div className="control-row">
            <label>
              <span>部署類型</span>
              <select value={luminaire} onChange={(event) => { setLuminaire(event.target.value); setSelected(null) }}>
                <option value="all">全部燈具類型</option>
                <option value="bay">天井燈</option>
                <option value="street">路燈</option>
                <option value="flood">投射燈</option>
                <option value="down">崁燈</option>
                <option value="special">特殊照明</option>
              </select>
            </label>

            <label>
              <span>地區層級</span>
              <select value={level} onChange={(event) => { setLevel(event.target.value); setSelected(null) }}>
                <option value="global">全球聚合</option>
                <option value="country">國家聚合</option>
                <option value="district">區域聚合</option>
                <option value="site">案場節點</option>
              </select>
            </label>

            <label>
              <span>指標模式</span>
              <select value={metric} onChange={(event) => setMetric(event.target.value)}>
                <option value="modules">部署量</option>
                <option value="saving">節約金額</option>
                <option value="energy">節電量</option>
                <option value="carbon">節碳量</option>
                <option value="maintenance">維護節約</option>
              </select>
            </label>
          </div>
        </section>

        <aside className="impact-panel">
          <div className="panel-top">
            <span className="section-kicker">Impact Control Panel</span>
            <h2>{selectionSummary.title}</h2>
            <p>{selectionSummary.description}</p>
          </div>

          <div className="kpi-matrix">
            <div>
              <span>Modules</span>
              <strong>{numberFormat(selectionSummary.summary.modules)}</strong>
            </div>
            <div>
              <span>Annual Saving</span>
              <strong>{compactMoney(selectionSummary.summary.annualSaving)}</strong>
            </div>
            <div>
              <span>Lifecycle Saving</span>
              <strong>{compactMoney(selectionSummary.summary.lifecycleSaving)}</strong>
            </div>
            <div>
              <span>Energy Saved</span>
              <strong>{numberFormat(selectionSummary.summary.energySaved)} kWh</strong>
            </div>
            <div>
              <span>CO₂ Reduced</span>
              <strong>{selectionSummary.summary.carbonReduced.toFixed(1)} t</strong>
            </div>
            <div>
              <span>Application Coverage</span>
              <strong>{selectionSummary.summary.applications} types</strong>
            </div>
          </div>

          <div className="chip-row">
            {selectionSummary.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>

          <div className="interpretation">
            <div className="interpretation-title">
              <span>Dynamic Interpretation</span>
              <strong>{metricLabels[metric]}</strong>
            </div>
            <p>{buildPanelInterpretation(selectionSummary, metric)}</p>
          </div>
        </aside>
      </main>
    </div>
  )
}

export default App
