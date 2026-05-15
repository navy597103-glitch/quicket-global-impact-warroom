import React, { useMemo } from 'react'
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Building2,
  Factory,
  Globe2,
  Leaf,
  Lightbulb,
  MapPin,
  Network,
  PackageCheck,
  ShieldCheck,
  Truck,
  Zap,
} from 'lucide-react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const projectData = [
  {
    id: 'TW-001',
    projectName: '眾鈴汽車台中港新增組裝廠',
    region: 'Taiwan',
    city: 'Taichung',
    applicationType: 'Industrial Facility',
    luminaireType: 'Bay Light',
    quantity: 620,
    annualSaving: 1450000,
    energySaved: 93000,
    carbonReduced: 73,
    maintenanceSaving: 871875,
    status: 'Active',
    partnerRole: 'Project Owner',
    coordinates: { x: 76, y: 50 },
  },
  {
    id: 'TW-002',
    projectName: '北部物流倉儲中心',
    region: 'Taiwan',
    city: 'Taoyuan',
    applicationType: 'Warehouse',
    luminaireType: 'Bay Light',
    quantity: 1200,
    annualSaving: 2680000,
    energySaved: 184000,
    carbonReduced: 91,
    maintenanceSaving: 1320000,
    status: 'Pilot',
    partnerRole: 'Engineering Partner',
    coordinates: { x: 75, y: 48 },
  },
  {
    id: 'JP-001',
    projectName: '日本商辦更新示範案',
    region: 'Japan',
    city: 'Osaka',
    applicationType: 'Commercial Office',
    luminaireType: 'Downlight',
    quantity: 800,
    annualSaving: 760000,
    energySaved: 42000,
    carbonReduced: 21,
    maintenanceSaving: 390000,
    status: 'Planning',
    partnerRole: 'Distribution Partner',
    coordinates: { x: 78, y: 44 },
  },
  {
    id: 'SG-001',
    projectName: '東南亞港區投射燈方案',
    region: 'Singapore',
    city: 'Singapore',
    applicationType: 'Port Infrastructure',
    luminaireType: 'Flood Light',
    quantity: 950,
    annualSaving: 2140000,
    energySaved: 125000,
    carbonReduced: 62,
    maintenanceSaving: 1040000,
    status: 'Proposal',
    partnerRole: 'Engineering Partner',
    coordinates: { x: 70, y: 64 },
  },
  {
    id: 'AE-001',
    projectName: '中東園區路燈更新計畫',
    region: 'Middle East',
    city: 'Muscat',
    applicationType: 'Public Infrastructure',
    luminaireType: 'Streetlight',
    quantity: 2400,
    annualSaving: 4860000,
    energySaved: 310000,
    carbonReduced: 153,
    maintenanceSaving: 2280000,
    status: 'Methodology',
    partnerRole: 'ESG / Carbon Partner',
    coordinates: { x: 58, y: 56 },
  },
  {
    id: 'EU-001',
    projectName: '歐洲工業園區節碳組合',
    region: 'Europe',
    city: 'Rotterdam',
    applicationType: 'Industrial Park',
    luminaireType: 'Bay Light',
    quantity: 1800,
    annualSaving: 3920000,
    energySaved: 260000,
    carbonReduced: 128,
    maintenanceSaving: 1760000,
    status: 'Planning',
    partnerRole: 'Lighting Manufacturer',
    coordinates: { x: 47, y: 39 },
  },
  {
    id: 'US-001',
    projectName: '北美停車場與公共區域照明',
    region: 'North America',
    city: 'Seattle',
    applicationType: 'Public Space',
    luminaireType: 'Streetlight',
    quantity: 1500,
    annualSaving: 3010000,
    energySaved: 198000,
    carbonReduced: 98,
    maintenanceSaving: 1410000,
    status: 'Partner Proposal',
    partnerRole: 'Distribution Partner',
    coordinates: { x: 20, y: 39 },
  },
  {
    id: 'AU-001',
    projectName: '澳洲特殊照明測試場域',
    region: 'Australia',
    city: 'Melbourne',
    applicationType: 'Special Application',
    luminaireType: 'Special Lighting',
    quantity: 320,
    annualSaving: 920000,
    energySaved: 51000,
    carbonReduced: 25,
    maintenanceSaving: 460000,
    status: 'Pilot',
    partnerRole: 'Lighting Manufacturer',
    coordinates: { x: 82, y: 78 },
  },
]

const yearlyProjection = [
  { year: 'Y1', savings: 19.7, energy: 1.26, carbon: 651 },
  { year: 'Y2', savings: 39.4, energy: 2.53, carbon: 1302 },
  { year: 'Y3', savings: 59.1, energy: 3.79, carbon: 1953 },
  { year: 'Y4', savings: 78.8, energy: 5.05, carbon: 2604 },
  { year: 'Y5', savings: 98.5, energy: 6.32, carbon: 3255 },
  { year: 'Y6', savings: 118.2, energy: 7.58, carbon: 3906 },
  { year: 'Y7', savings: 137.9, energy: 8.85, carbon: 4557 },
  { year: 'Y8', savings: 157.6, energy: 10.11, carbon: 5208 },
]

const applicationColors = {
  'Bay Light': '#22d3ee',
  Streetlight: '#38bdf8',
  'Flood Light': '#818cf8',
  Downlight: '#34d399',
  'Special Lighting': '#fbbf24',
}

const statusStyles = {
  Active: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200',
  Pilot: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200',
  Planning: 'border-sky-400/30 bg-sky-400/10 text-sky-200',
  Proposal: 'border-violet-400/30 bg-violet-400/10 text-violet-200',
  Methodology: 'border-amber-400/30 bg-amber-400/10 text-amber-200',
  'Partner Proposal': 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-200',
}

const participantCards = [
  {
    role: 'Project Owner',
    icon: Building2,
    title: '降低長期營運成本',
    description: '以模組化維護降低整燈更換、停工與高空作業壓力。',
  },
  {
    role: 'Engineering Partner',
    icon: Factory,
    title: '提高設計與維護效率',
    description: '透過統一介面縮短規格確認、標案設計與後續維護流程。',
  },
  {
    role: 'Lighting Manufacturer',
    icon: PackageCheck,
    title: '建立可延伸產品線',
    description: '讓燈具製造從單一規格競爭轉向模組介面與授權合作。',
  },
  {
    role: 'ESG / Carbon Partner',
    icon: Leaf,
    title: '形成可量化節碳基礎',
    description: '將能耗、維護與材料延壽轉為可追蹤的碳效益資料。',
  },
  {
    role: 'Distribution Partner',
    icon: Truck,
    title: '擴大可複製銷售場景',
    description: '以案例組合與效益數據降低客戶溝通成本。',
  },
]

const opportunityAlerts = [
  {
    level: 'High',
    title: 'Bay Light deployments show fastest payback',
    detail: '天井燈案場在工業場域具備高工時、高維護成本與高節電回收優勢。',
  },
  {
    level: 'Medium',
    title: 'Streetlight portfolio has carbon package potential',
    detail: '路燈應用數量大、年度工時穩定，適合建立長期節碳資料封裝。',
  },
  {
    level: 'Medium',
    title: 'Maintenance window approaching in active sites',
    detail: '部分案場進入傳統 LED 整燈替換期，可導入模組化維護比較。',
  },
  {
    level: 'Strategic',
    title: 'Partner roles can be mapped as deployment nodes',
    detail: '案場、工程商、製造方與 ESG 夥伴可形成跨角色效益網絡。',
  },
]

const formatNTD = (value) =>
  new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    maximumFractionDigits: 0,
  }).format(value)

const formatNumber = (value, digits = 0) =>
  new Intl.NumberFormat('zh-TW', {
    maximumFractionDigits: digits,
  }).format(value)

function KpiCard({ icon: Icon, label, value, sublabel }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/30">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
          <Icon size={22} />
        </div>
        <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">QUICKET</span>
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-2 text-2xl font-semibold tracking-tight text-white md:text-3xl">{value}</div>
      <p className="mt-3 text-xs leading-5 text-slate-500">{sublabel}</p>
    </div>
  )
}

function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-5">
      <div className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-300">{eyebrow}</div>
      <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">{description}</p>
    </div>
  )
}

function DeploymentMap({ projects }) {
  return (
    <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl shadow-slate-950/40">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.18),_rgba(15,23,42,0.08)_38%,_rgba(2,6,23,1)_72%)]" />
      <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20 bg-slate-900/50 shadow-[0_0_90px_rgba(34,211,238,0.12)]" />
      <div className="absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-700/70" />
      <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-slate-700/50" />
      <div className="absolute inset-x-10 top-1/2 border-t border-dashed border-cyan-400/15" />
      <div className="absolute inset-y-8 left-1/2 border-l border-dashed border-cyan-400/15" />

      {projects.map((project) => (
        <div
          key={project.id}
          className="group absolute"
          style={{
            left: `${project.coordinates.x}%`,
            top: `${project.coordinates.y}%`,
          }}
        >
          <div
            className="h-3 w-3 rounded-full ring-4 ring-slate-950 transition-transform group-hover:scale-125"
            style={{ backgroundColor: applicationColors[project.luminaireType] }}
          />
          <div className="pointer-events-none absolute left-4 top-4 z-10 hidden w-64 rounded-2xl border border-slate-700 bg-slate-950/95 p-4 text-xs shadow-xl group-hover:block">
            <div className="font-semibold text-white">{project.projectName}</div>
            <div className="mt-2 text-slate-400">{project.region} · {project.luminaireType}</div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-slate-300">
              <span>Modules</span><span className="text-right">{formatNumber(project.quantity)}</span>
              <span>Annual Saving</span><span className="text-right">{formatNTD(project.annualSaving)}</span>
              <span>CO₂</span><span className="text-right">{project.carbonReduced} t</span>
            </div>
          </div>
        </div>
      ))}

      <div className="relative z-[1] flex h-full min-h-[420px] flex-col justify-between p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
              <Globe2 size={14} />
              Deployment Network View
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white">全球部署節點示意</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
              以地區、燈具類型與參與角色呈現 QUICKET 在不同應用架構中的部署廣度。
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs md:grid-cols-1">
            {Object.entries(applicationColors).map(([name, color]) => (
              <div key={name} className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-950/70 px-3 py-2 text-slate-300">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
                {name}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="text-xs text-slate-500">Active / Pilot Sites</div>
            <div className="mt-2 text-2xl font-semibold text-white">8</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="text-xs text-slate-500">Regions Covered</div>
            <div className="mt-2 text-2xl font-semibold text-white">7</div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <div className="text-xs text-slate-500">Application Types</div>
            <div className="mt-2 text-2xl font-semibold text-white">5</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const totals = useMemo(() => {
    const annualSaving = projectData.reduce((sum, item) => sum + item.annualSaving, 0)
    const energySaved = projectData.reduce((sum, item) => sum + item.energySaved, 0)
    const carbonReduced = projectData.reduce((sum, item) => sum + item.carbonReduced, 0)
    const maintenanceSaving = projectData.reduce((sum, item) => sum + item.maintenanceSaving, 0)
    const modules = projectData.reduce((sum, item) => sum + item.quantity, 0)
    const applications = new Set(projectData.map((item) => item.luminaireType)).size

    return {
      annualSaving,
      lifecycleSavings: annualSaving * 8,
      energySaved,
      carbonReduced,
      maintenanceSaving,
      modules,
      applications,
    }
  }, [])

  const applicationMix = useMemo(() => {
    const map = new Map()
    projectData.forEach((item) => {
      const existing = map.get(item.luminaireType) || { name: item.luminaireType, quantity: 0, annualSaving: 0 }
      existing.quantity += item.quantity
      existing.annualSaving += item.annualSaving
      map.set(item.luminaireType, existing)
    })
    return Array.from(map.values())
  }, [])

  const participantMix = useMemo(() => {
    const map = new Map()
    projectData.forEach((item) => {
      const existing = map.get(item.partnerRole) || { role: item.partnerRole, projects: 0, savings: 0 }
      existing.projects += 1
      existing.savings += item.annualSaving
      map.set(item.partnerRole, existing)
    })
    return Array.from(map.values())
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-[1500px] px-4 py-5 md:px-8">
        <header className="relative overflow-hidden rounded-[2rem] border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/70 p-6 shadow-2xl shadow-slate-950/50 md:p-8">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
                <Network size={14} />
                Portfolio-level Impact Dashboard
              </div>
              <h1 className="mt-5 max-w-4xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                QUICKET Global Impact Warroom
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
                以多案場、多燈具類型、多地區與多參與角色展示 QUICKET 的生命週期節約規模、應用廣度與平台型部署潛力。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:w-[420px]">
              <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-4">
                <div className="text-xs text-slate-500">Mode</div>
                <div className="mt-1 font-medium text-white">Demo Portfolio</div>
              </div>
              <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-4">
                <div className="text-xs text-slate-500">Last Updated</div>
                <div className="mt-1 font-medium text-white">Current Scenario</div>
              </div>
            </div>
          </div>
        </header>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KpiCard icon={ArrowUpRight} label="Total Lifecycle Savings" value={formatNTD(totals.lifecycleSavings)} sublabel="8-year portfolio-level value" />
          <KpiCard icon={Zap} label="Energy Saved" value={`${formatNumber(totals.energySaved)} kWh`} sublabel="Annual electricity reduction" />
          <KpiCard icon={Leaf} label="CO₂ Reduced" value={`${formatNumber(totals.carbonReduced)} t`} sublabel="Annual carbon reduction" />
          <KpiCard icon={ShieldCheck} label="Maintenance Cost Saved" value={formatNTD(totals.maintenanceSaving)} sublabel="Annual O&M saving base" />
          <KpiCard icon={Lightbulb} label="Deployed Modules" value={formatNumber(totals.modules)} sublabel="Mock portfolio modules" />
          <KpiCard icon={Activity} label="Covered Applications" value={`${totals.applications}`} sublabel="Luminaire architecture types" />
        </section>

        <main className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <section>
            <DeploymentMap projects={projectData} />
          </section>

          <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/30">
            <SectionTitle
              eyebrow="Application Mix"
              title="燈具類型與出貨組合"
              description="依照出貨與案場應用類型，呈現 QUICKET 在不同照明架構中的延展性。"
            />
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={applicationMix} dataKey="quantity" nameKey="name" innerRadius={65} outerRadius={105} paddingAngle={3}>
                    {applicationMix.map((entry) => (
                      <Cell key={entry.name} fill={applicationColors[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [formatNumber(value), name]}
                    contentStyle={{ background: '#020617', border: '1px solid #334155', borderRadius: 14 }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-5 space-y-3">
              {applicationMix.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: applicationColors[item.name] }} />
                    <span className="text-sm text-slate-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-white">{formatNumber(item.quantity)} pcs</span>
                </div>
              ))}
            </div>
          </section>
        </main>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/30">
            <SectionTitle eyebrow="Trend Projection" title="累積效益趨勢" description="以示範案場組合估算多年度累積節約、節電與節碳趨勢。" />
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearlyProjection}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#020617', border: '1px solid #334155', borderRadius: 14 }} />
                  <Legend />
                  <Area type="monotone" dataKey="savings" name="Lifecycle Savings (NTD M)" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.16} />
                  <Area type="monotone" dataKey="energy" name="Energy Saved (M kWh)" stroke="#34d399" fill="#34d399" fillOpacity={0.12} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/30">
            <SectionTitle eyebrow="Participant Network" title="參與者價值分布" description="同一套部署資料可以對應不同參與者的商業利益，形成平台式合作網絡。" />
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={participantMix} layout="vertical" margin={{ left: 40, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis type="number" stroke="#94a3b8" tickFormatter={(value) => `${Math.round(value / 1000000)}M`} />
                  <YAxis type="category" dataKey="role" width={120} stroke="#94a3b8" />
                  <Tooltip formatter={(value) => formatNTD(value)} contentStyle={{ background: '#020617', border: '1px solid #334155', borderRadius: 14 }} />
                  <Bar dataKey="savings" name="Annual Saving" fill="#38bdf8" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/30">
          <SectionTitle eyebrow="Project Performance" title="案場績效清單" description="以 mock portfolio data 展示不同區域、應用類型、合作角色與部署狀態。" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-separate border-spacing-y-2 text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-[0.18em] text-slate-500">
                  <th className="px-4 py-2">Project</th>
                  <th className="px-4 py-2">Region</th>
                  <th className="px-4 py-2">Luminaire</th>
                  <th className="px-4 py-2 text-right">Modules</th>
                  <th className="px-4 py-2 text-right">Annual Saving</th>
                  <th className="px-4 py-2 text-right">CO₂</th>
                  <th className="px-4 py-2">Partner</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {projectData.map((project) => (
                  <tr key={project.id} className="rounded-2xl bg-slate-950/60 text-slate-300">
                    <td className="rounded-l-2xl px-4 py-4">
                      <div className="font-medium text-white">{project.projectName}</div>
                      <div className="mt-1 text-xs text-slate-500">{project.applicationType}</div>
                    </td>
                    <td className="px-4 py-4">{project.region}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: applicationColors[project.luminaireType] }} />
                        {project.luminaireType}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">{formatNumber(project.quantity)}</td>
                    <td className="px-4 py-4 text-right text-cyan-200">{formatNTD(project.annualSaving)}</td>
                    <td className="px-4 py-4 text-right">{project.carbonReduced} t</td>
                    <td className="px-4 py-4">{project.partnerRole}</td>
                    <td className="rounded-r-2xl px-4 py-4">
                      <span className={`inline-flex rounded-full border px-3 py-1 text-xs ${statusStyles[project.status] || 'border-slate-700 bg-slate-800 text-slate-300'}`}>
                        {project.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/30">
            <SectionTitle eyebrow="Participant Value" title="合作角色價值" description="讓不同參與者看見自己在 QUICKET 生態中的得利方式。" />
            <div className="grid gap-4 md:grid-cols-2">
              {participantCards.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.role} className="rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-2xl bg-cyan-400/10 p-3 text-cyan-300">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{card.role}</div>
                        <div className="text-xs text-slate-500">{card.title}</div>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-slate-400">{card.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 shadow-xl shadow-slate-950/30">
            <SectionTitle eyebrow="Opportunity / Alerts" title="機會提醒" description="以戰情室邏輯呈現可追蹤的擴張、維護與碳封裝機會。" />
            <div className="space-y-4">
              {opportunityAlerts.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-950/60 p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-amber-400/10 p-2 text-amber-300">
                      <AlertTriangle size={18} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-slate-700 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-slate-400">{item.level}</span>
                        <h3 className="font-medium text-white">{item.title}</h3>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-5 text-sm leading-6 text-slate-400">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="font-medium text-slate-200">Strategic note:</span> This page presents QUICKET as a portfolio-level deployment network. It is designed to show lifecycle savings, application breadth, and participant value before moving into deeper data verification or platform integration.
            </div>
            <div className="flex items-center gap-2 text-cyan-300">
              <MapPin size={16} />
              Demo data only
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
