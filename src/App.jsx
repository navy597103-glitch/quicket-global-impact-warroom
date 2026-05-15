
import React, { useMemo, useState } from 'react'

const luminaireTypes = [
  { id: 'all', label: '全部', en: 'All', color: '#7dd3fc' },
  { id: 'Bay Light', label: '天井燈', en: 'Bay Light', color: '#22d3ee' },
  { id: 'Streetlight', label: '路燈', en: 'Streetlight', color: '#a3e635' },
  { id: 'Flood Light', label: '投射燈', en: 'Flood Light', color: '#fbbf24' },
  { id: 'Downlight', label: '崁燈', en: 'Downlight', color: '#60a5fa' },
  { id: 'Special Lighting', label: '特殊照明', en: 'Special', color: '#c084fc' },
]

const levelOptions = [
  { id: 'global', label: '全球' },
  { id: 'country', label: '國家' },
  { id: 'region', label: '區域' },
  { id: 'site', label: '案場' },
]

const metricOptions = [
  { id: 'modules', label: '部署量' },
  { id: 'saving', label: '節約金額' },
  { id: 'energy', label: '節電量' },
  { id: 'carbon', label: '節碳量' },
  { id: 'maintenance', label: '維護節約' },
]

const deployments = [
  {
    id: 'tw-taichung-bay',
    type: 'site',
    name: '眾鈴汽車｜台中港組裝廠',
    shortName: 'Taichung Port Plant',
    region: 'Asia',
    country: 'Taiwan',
    district: 'Taichung',
    luminaireType: 'Bay Light',
    application: '工廠天井燈',
    spec: '150W QUICKET 模組',
    modules: 620,
    annualSaving: 1450000,
    lifecycleSaving: 21750000,
    energySaved: 93000,
    carbonReduced: 46,
    maintenanceSaving: 871875,
    x: 67,
    y: 47,
    level: 1,
    status: 'Active',
  },
  {
    id: 'tw-office-downlight',
    type: 'site',
    name: '台北商辦更新案',
    shortName: 'Taipei Office',
    region: 'Asia',
    country: 'Taiwan',
    district: 'Taipei',
    luminaireType: 'Downlight',
    application: '商辦崁燈',
    spec: '15W QUICKET 模組',
    modules: 1380,
    annualSaving: 980000,
    lifecycleSaving: 14700000,
    energySaved: 72000,
    carbonReduced: 36,
    maintenanceSaving: 480000,
    x: 66,
    y: 43,
    level: 2,
    status: 'Pilot',
  },
  {
    id: 'jp-streetlight',
    type: 'site',
    name: '日本地方道路照明更新',
    shortName: 'Japan Streetlight',
    region: 'Asia',
    country: 'Japan',
    district: 'Kansai',
    luminaireType: 'Streetlight',
    application: '公共路燈',
    spec: '80W QUICKET 模組',
    modules: 2400,
    annualSaving: 3800000,
    lifecycleSaving: 57000000,
    energySaved: 410000,
    carbonReduced: 202,
    maintenanceSaving: 1900000,
    x: 71,
    y: 36,
    level: 1,
    status: 'Planning',
  },
  {
    id: 'sg-flood-port',
    type: 'site',
    name: '新加坡港區投射燈案',
    shortName: 'Singapore Port',
    region: 'Asia',
    country: 'Singapore',
    district: 'Port',
    luminaireType: 'Flood Light',
    application: '港區投射燈',
    spec: '120W QUICKET 模組',
    modules: 860,
    annualSaving: 2100000,
    lifecycleSaving: 31500000,
    energySaved: 240000,
    carbonReduced: 118,
    maintenanceSaving: 980000,
    x: 61,
    y: 61,
    level: 2,
    status: 'Proposal',
  },
  {
    id: 'om-industrial',
    type: 'site',
    name: '阿曼工業園區照明案',
    shortName: 'Oman Industrial',
    region: 'Middle East',
    country: 'Oman',
    district: 'Industrial Zone',
    luminaireType: 'Bay Light',
    application: '工業天井燈',
    spec: '150W / 170 lm/W',
    modules: 5200,
    annualSaving: 9200000,
    lifecycleSaving: 138000000,
    energySaved: 1140000,
    carbonReduced: 563,
    maintenanceSaving: 4600000,
    x: 45,
    y: 51,
    level: 0,
    status: 'Strategic',
  },
  {
    id: 'ae-street-network',
    type: 'site',
    name: 'UAE 戶外公共照明組合',
    shortName: 'UAE Outdoor',
    region: 'Middle East',
    country: 'UAE',
    district: 'Urban Network',
    luminaireType: 'Streetlight',
    application: '道路與公共空間',
    spec: '80W / 100W QUICKET',
    modules: 6800,
    annualSaving: 12800000,
    lifecycleSaving: 192000000,
    energySaved: 1580000,
    carbonReduced: 780,
    maintenanceSaving: 7100000,
    x: 43,
    y: 49,
    level: 0,
    status: 'Planning',
  },
  {
    id: 'de-factory',
    type: 'site',
    name: '德國工業廠房節能示範',
    shortName: 'Germany Factory',
    region: 'Europe',
    country: 'Germany',
    district: 'Industrial',
    luminaireType: 'Bay Light',
    application: '工業廠房',
    spec: '150W QUICKET 模組',
    modules: 3300,
    annualSaving: 7600000,
    lifecycleSaving: 114000000,
    energySaved: 860000,
    carbonReduced: 425,
    maintenanceSaving: 3900000,
    x: 34,
    y: 34,
    level: 0,
    status: 'Partner Study',
  },
  {
    id: 'us-warehouse',
    type: 'site',
    name: '美國倉儲高棚燈替換案',
    shortName: 'US Warehouse',
    region: 'North America',
    country: 'United States',
    district: 'Warehouse Cluster',
    luminaireType: 'Bay Light',
    application: '倉儲高棚燈',
    spec: '150W QUICKET 模組',
    modules: 7200,
    annualSaving: 13500000,
    lifecycleSaving: 202500000,
    energySaved: 1680000,
    carbonReduced: 830,
    maintenanceSaving: 6200000,
    x: 16,
    y: 38,
    level: 0,
    status: 'Opportunity',
  },
  {
    id: 'au-special',
    type: 'site',
    name: '澳洲特殊場域照明示範',
    shortName: 'Australia Special',
    region: 'Oceania',
    country: 'Australia',
    district: 'Special Site',
    luminaireType: 'Special Lighting',
    application: '特殊照明',
    spec: '客製 QUICKET 介面',
    modules: 900,
    annualSaving: 1900000,
    lifecycleSaving: 28500000,
    energySaved: 210000,
    carbonReduced: 104,
    maintenanceSaving: 790000,
    x: 72,
    y: 72,
    level: 1,
    status: 'Pilot',
  },
]

const regionClusters = [
  {
    id: 'cluster-asia',
    type: 'cluster',
    name: 'Asia Deployment Cluster',
    region: 'Asia',
    country: 'Japan / Taiwan / Singapore',
    luminaireTypes: ['Bay Light', 'Streetlight', 'Flood Light', 'Downlight'],
    modules: 5260,
    annualSaving: 8330000,
    lifecycleSaving: 124950000,
    energySaved: 815000,
    carbonReduced: 402,
    maintenanceSaving: 4231875,
    x: 66,
    y: 49,
    level: 0,
  },
  {
    id: 'cluster-middle-east',
    type: 'cluster',
    name: 'Middle East Deployment Cluster',
    region: 'Middle East',
    country: 'Oman / UAE',
    luminaireTypes: ['Bay Light', 'Streetlight'],
    modules: 12000,
    annualSaving: 22000000,
    lifecycleSaving: 330000000,
    energySaved: 2720000,
    carbonReduced: 1343,
    maintenanceSaving: 11700000,
    x: 44,
    y: 50,
    level: 0,
  },
  {
    id: 'cluster-global',
    type: 'cluster',
    name: 'Global QUICKET Portfolio',
    region: 'Global',
    country: 'Multi-region',
    luminaireTypes: ['Bay Light', 'Streetlight', 'Flood Light', 'Downlight', 'Special Lighting'],
    modules: 28760,
    annualSaving: 57350000,
    lifecycleSaving: 860250000,
    energySaved: 6325000,
    carbonReduced: 3110,
    maintenanceSaving: 32101875,
    x: 50,
    y: 50,
    level: -1,
  },
]

function formatMoney(value) {
  if (value >= 100000000) return `NTD ${(value / 100000000).toFixed(1)}億`
  if (value >= 1000000) return `NTD ${(value / 1000000).toFixed(1)}M`
  return `NTD ${Math.round(value).toLocaleString('zh-TW')}`
}

function formatNumber(value) {
  return Math.round(value).toLocaleString('zh-TW')
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function getColor(type) {
  return luminaireTypes.find((item) => item.id === type)?.color || '#7dd3fc'
}

function aggregate(items) {
  return items.reduce(
    (acc, item) => {
      acc.modules += item.modules
      acc.annualSaving += item.annualSaving
      acc.lifecycleSaving += item.lifecycleSaving
      acc.energySaved += item.energySaved
      acc.carbonReduced += item.carbonReduced
      acc.maintenanceSaving += item.maintenanceSaving
      acc.applicationSet.add(item.application || item.region)
      acc.typeSet.add(item.luminaireType)
      return acc
    },
    {
      modules: 0,
      annualSaving: 0,
      lifecycleSaving: 0,
      energySaved: 0,
      carbonReduced: 0,
      maintenanceSaving: 0,
      applicationSet: new Set(),
      typeSet: new Set(),
    },
  )
}

function ControlSelect({ label, value, onChange, options }) {
  return (
    <label className="control-select">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function GlobeMap({ sites, clusters, zoom, rotation, tilt, selected, hovered, onSelect, onHover, onZoom, onDrag }) {
  const [dragging, setDragging] = useState(null)

  const visibleSites = sites.filter((site) => {
    if (zoom < 1.25 && site.level > 0) return false
    if (zoom < 1.7 && site.level > 1) return false
    return true
  })

  const visibleClusters = clusters.filter((cluster) => {
    if (zoom >= 1.45 && cluster.id === 'cluster-global') return false
    if (zoom >= 1.9 && cluster.region !== 'Global') return false
    return true
  })

  function pointerDown(event) {
    const point = { x: event.clientX, y: event.clientY, rotation, tilt }
    setDragging(point)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function pointerMove(event) {
    if (!dragging) return
    const dx = event.clientX - dragging.x
    const dy = event.clientY - dragging.y
    onDrag({
      rotation: dragging.rotation + dx * 0.24,
      tilt: clamp(dragging.tilt + dy * 0.12, -12, 12),
    })
  }

  function pointerUp(event) {
    setDragging(null)
    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch (error) {
      return
    }
  }

  function wheel(event) {
    event.preventDefault()
    event.stopPropagation()
    const nextZoom = clamp(zoom + (event.deltaY > 0 ? -0.12 : 0.12), 0.82, 2.15)
    onZoom(nextZoom)
  }

  const mapShift = rotation % 360

  return (
    <div
      className="globe-shell"
      onWheel={wheel}
      onPointerDown={pointerDown}
      onPointerMove={pointerMove}
      onPointerUp={pointerUp}
      onPointerCancel={pointerUp}
      onMouseLeave={() => onHover(null)}
      style={{ '--zoom': zoom, '--map-shift': `${mapShift}px`, '--tilt': `${tilt}px` }}
    >
      <svg className="globe-svg" viewBox="0 0 1000 1000" aria-label="QUICKET global deployment map">
        <defs>
          <radialGradient id="oceanGradient" cx="46%" cy="38%" r="58%">
            <stop offset="0%" stopColor="#155e75" stopOpacity="0.92" />
            <stop offset="48%" stopColor="#0f3f53" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#061826" stopOpacity="1" />
          </radialGradient>
          <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e7b7d" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#113d4d" stopOpacity="0.84" />
          </linearGradient>
          <clipPath id="globeClip">
            <circle cx="500" cy="500" r="430" />
          </clipPath>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle className="globe-outer" cx="500" cy="500" r="448" />
        <circle className="globe-water" cx="500" cy="500" r="430" fill="url(#oceanGradient)" />

        <g clipPath="url(#globeClip)" className="world-layer" transform={`translate(${mapShift - 180} ${tilt}) scale(${zoom})`}>
          <g transform="translate(0 0)">
            <WorldShapes />
          </g>
          <g transform="translate(760 0)">
            <WorldShapes />
          </g>
          <g transform="translate(-760 0)">
            <WorldShapes />
          </g>
        </g>

        <g clipPath="url(#globeClip)">
          <line className="equator" x1="75" y1="500" x2="925" y2="500" />
          <path className="admin-ring" d="M120 360 C260 410, 370 430, 500 418 C640 405, 760 378, 890 330" />
          <path className="admin-ring soft" d="M112 645 C250 600, 380 585, 512 596 C640 608, 760 650, 890 680" />
          <path className="admin-ring soft" d="M290 105 C250 285, 250 690, 310 890" />
          <path className="admin-ring soft" d="M520 70 C470 275, 466 665, 540 930" />
          <path className="admin-ring soft" d="M725 120 C690 310, 685 690, 760 880" />
        </g>

        <circle className="globe-shade" cx="500" cy="500" r="430" />
      </svg>

      <div className="map-points">
        {visibleClusters.map((cluster) => (
          <button
            key={cluster.id}
            className={`map-point cluster ${selected?.id === cluster.id ? 'active' : ''}`}
            style={{
              left: `${cluster.x}%`,
              top: `${cluster.y}%`,
              '--point-color': '#38bdf8',
              transform: `translate(-50%, -50%) scale(${clamp(1.2 / zoom, 0.75, 1.25)})`,
            }}
            onMouseEnter={() => onHover(cluster)}
            onFocus={() => onHover(cluster)}
            onClick={(event) => {
              event.stopPropagation()
              onSelect(cluster)
            }}
          >
            <span>{cluster.region === 'Global' ? 'G' : cluster.region.slice(0, 2)}</span>
          </button>
        ))}

        {visibleSites.map((site) => (
          <button
            key={site.id}
            className={`map-point site ${selected?.id === site.id ? 'active' : ''}`}
            style={{
              left: `${site.x}%`,
              top: `${site.y}%`,
              '--point-color': getColor(site.luminaireType),
              transform: `translate(-50%, -50%) scale(${clamp(1 / zoom, 0.72, 1.12)})`,
            }}
            onMouseEnter={() => onHover(site)}
            onFocus={() => onHover(site)}
            onClick={(event) => {
              event.stopPropagation()
              onSelect(site)
            }}
          >
            <span />
          </button>
        ))}
      </div>

      {hovered && (
        <div
          className={`globe-tooltip ${hovered.type === 'site' ? 'site-tooltip' : 'cluster-tooltip'}`}
          style={{
            left: `${hovered.x}%`,
            top: `${hovered.y}%`,
          }}
        >
          <div className="tooltip-kicker">{hovered.type === 'site' ? '案場節點' : '區域聚合'}</div>
          <strong>{hovered.type === 'site' ? hovered.name : hovered.region}</strong>
          {hovered.type === 'site' ? (
            <dl>
              <div><dt>使用規格</dt><dd>{hovered.spec}</dd></div>
              <div><dt>用量</dt><dd>{formatNumber(hovered.modules)} 套</dd></div>
              <div><dt>年度節約</dt><dd>{formatMoney(hovered.annualSaving)}</dd></div>
              <div><dt>年度節碳</dt><dd>{formatNumber(hovered.carbonReduced)} t</dd></div>
            </dl>
          ) : (
            <dl>
              <div><dt>部署規格</dt><dd>{hovered.luminaireTypes.join(' / ')}</dd></div>
              <div><dt>總量</dt><dd>{formatNumber(hovered.modules)} 套</dd></div>
              <div><dt>年度節約</dt><dd>{formatMoney(hovered.annualSaving)}</dd></div>
              <div><dt>年度節碳</dt><dd>{formatNumber(hovered.carbonReduced)} t</dd></div>
            </dl>
          )}
        </div>
      )}
    </div>
  )
}

function WorldShapes() {
  return (
    <g className="land-and-borders">
      <path className="land" d="M70 310 C118 265 184 248 245 275 C305 300 318 358 285 410 C248 470 154 462 102 420 C55 382 32 350 70 310 Z" />
      <path className="land" d="M212 472 C270 435 330 458 356 518 C385 585 330 650 284 707 C238 764 210 833 162 812 C118 792 140 710 168 655 C195 602 166 512 212 472 Z" />
      <path className="land" d="M378 245 C440 198 545 205 598 260 C650 315 628 390 556 420 C490 448 400 428 365 370 C337 325 336 276 378 245 Z" />
      <path className="land" d="M470 420 C540 390 622 410 685 470 C760 542 790 625 744 690 C702 750 612 718 548 670 C488 625 420 566 420 500 C420 462 435 438 470 420 Z" />
      <path className="land" d="M642 270 C716 238 835 255 900 318 C955 370 946 430 882 464 C820 498 740 488 688 446 C640 408 590 315 642 270 Z" />
      <path className="land" d="M708 710 C765 682 845 710 884 760 C918 805 882 845 812 850 C742 854 680 815 674 772 C670 744 684 723 708 710 Z" />

      <path className="border" d="M115 326 C160 340 210 332 265 372" />
      <path className="border" d="M204 505 C260 520 310 555 336 610" />
      <path className="border" d="M412 262 C458 305 520 320 585 304" />
      <path className="border" d="M520 425 C560 482 620 510 690 504" />
      <path className="border" d="M646 304 C712 350 800 360 900 330" />
      <path className="border" d="M715 738 C758 775 805 787 865 780" />
      <path className="border faint" d="M380 350 C448 370 510 370 610 340" />
      <path className="border faint" d="M450 545 C520 548 612 575 728 642" />
      <path className="border faint" d="M640 430 C700 430 774 450 860 438" />
    </g>
  )
}

function ImpactPanel({ focus, metricMode, viewLevel }) {
  const title = focus?.type === 'site' ? focus.name : focus?.name || 'Global Portfolio'
  const subtitle =
    focus?.type === 'site'
      ? `${focus.country} / ${focus.district} · ${focus.luminaireType}`
      : focus?.type === 'cluster'
        ? `${focus.country} · ${focus.luminaireTypes.join(' / ')}`
        : 'Multi-region deployment portfolio'

  return (
    <aside className="impact-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">Current View</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <span className="status-pill">{focus?.status || viewLevel}</span>
      </div>

      <div className="kpi-grid">
        <MetricCard label="Modules" value={formatNumber(focus.modules)} />
        <MetricCard label="Annual Saving" value={formatMoney(focus.annualSaving)} />
        <MetricCard label="Lifecycle Saving" value={formatMoney(focus.lifecycleSaving)} />
        <MetricCard label="Energy Saved" value={`${formatNumber(focus.energySaved)} kWh`} />
        <MetricCard label="CO₂ Reduced" value={`${formatNumber(focus.carbonReduced)} t`} />
        <MetricCard label="Maintenance Saved" value={formatMoney(focus.maintenanceSaving)} />
      </div>

      <div className="interpretation">
        <span className="eyebrow">Dynamic Interpretation</span>
        <p>{buildInterpretation(focus, metricMode)}</p>
      </div>
    </aside>
  )
}

function MetricCard({ label, value }) {
  return (
    <div className="metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function buildInterpretation(focus, metricMode) {
  if (focus.type === 'site') {
    return `${focus.name} 以 ${focus.spec} 導入 ${formatNumber(focus.modules)} 套模組。此視角聚焦於 ${metricMode}，可用於呈現單一案場的部署規格、用量與節約成果。`
  }

  if (focus.region === 'Global') {
    return `目前顯示 QUICKET 全球組合視角。地球儀負責呈現部署廣度與節點密度，右側面板則統合目前範圍內的部署量、節約金額、節電量與節碳成果。`
  }

  return `${focus.region} 聚合點包含 ${focus.luminaireTypes.join(' / ')} 等部署規格，總量達 ${formatNumber(focus.modules)} 套。此層級適合展示國家或區域的部署總量與節約規模。`
}

function App() {
  const [luminaireType, setLuminaireType] = useState('all')
  const [viewLevel, setViewLevel] = useState('global')
  const [metricMode, setMetricMode] = useState('modules')
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [tilt, setTilt] = useState(0)
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)

  const filteredDeployments = useMemo(() => {
    return deployments.filter((site) => {
      const typeMatch = luminaireType === 'all' || site.luminaireType === luminaireType
      return typeMatch
    })
  }, [luminaireType])

  const filteredClusters = useMemo(() => {
    return regionClusters.filter((cluster) => {
      const typeMatch = luminaireType === 'all' || cluster.luminaireTypes.includes(luminaireType)
      return typeMatch
    })
  }, [luminaireType])

  const portfolio = useMemo(() => {
    const total = aggregate(filteredDeployments)
    return {
      id: 'portfolio',
      type: 'cluster',
      name: 'Global Portfolio',
      region: 'Global',
      country: 'Portfolio View',
      luminaireTypes: Array.from(total.typeSet),
      modules: total.modules,
      annualSaving: total.annualSaving,
      lifecycleSaving: total.lifecycleSaving,
      energySaved: total.energySaved,
      carbonReduced: total.carbonReduced,
      maintenanceSaving: total.maintenanceSaving,
      applications: Array.from(total.applicationSet),
    }
  }, [filteredDeployments])

  const focus = hovered || selected || portfolio

  return (
    <main className="app-shell">
      <section className="warroom-layout">
        <div className="stage-panel">
          <header className="brand-row">
            <div className="brand-mark">Q</div>
            <div>
              <p className="brand-name">QUICKET</p>
              <p className="brand-subtitle">Global Impact Warroom</p>
            </div>
          </header>

          <div className="globe-header">
            <div>
              <span className="eyebrow">Global Deployment Network</span>
              <h1>QUICKET 全球部署</h1>
            </div>
            <div className="globe-hint">拖曳旋轉｜滾輪縮放｜移至節點查看部署資料</div>
          </div>

          <GlobeMap
            sites={filteredDeployments}
            clusters={filteredClusters}
            zoom={zoom}
            rotation={rotation}
            tilt={tilt}
            selected={selected}
            hovered={hovered}
            onSelect={setSelected}
            onHover={setHovered}
            onZoom={setZoom}
            onDrag={({ rotation: nextRotation, tilt: nextTilt }) => {
              setRotation(nextRotation)
              setTilt(nextTilt)
            }}
          />

          <div className="control-row">
            <ControlSelect label="部署類型" value={luminaireType} onChange={setLuminaireType} options={luminaireTypes} />
            <ControlSelect label="地區層級" value={viewLevel} onChange={setViewLevel} options={levelOptions} />
            <ControlSelect label="指標模式" value={metricMode} onChange={setMetricMode} options={metricOptions} />
          </div>
        </div>

        <ImpactPanel focus={focus} metricMode={metricOptions.find((item) => item.id === metricMode)?.label || metricMode} viewLevel={levelOptions.find((item) => item.id === viewLevel)?.label || viewLevel} />
      </section>
    </main>
  )
}

export default App
