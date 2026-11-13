import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  ChevronDown,
  Clock3,
  Gamepad2,
  Headphones,
  Menu,
  RefreshCw,
  Search,
  ShieldCheck,
  Wallet,
  X,
  Zap,
} from 'lucide-react';
import { Language, TRANSLATIONS } from './translations';
import { BoosterSection, BoosterCategoryType } from './components/BoosterSection';
import { FeatherField } from './components/AionDecor';
import { AskFloat } from './components/AskFloat';
import { KinahGuide, KinahPrefill, KinahRegion } from './components/KinahGuide';
const USDT_RATE = 25800; // 1 USDT = 25,800 VNĐ

interface ServerItem {
  server: string;
  rate: number | null;
}

interface RegionData {
  code: string;
  name: string;
  emoji: string;
  ping: string;
  row1: ServerItem[];
  row2: ServerItem[];
}

const REGIONS_DATA: Record<string, RegionData> = {
  ASIA: {
    code: 'ASIA',
    name: 'Asia',
    emoji: '🌏',
    ping: '24ms',
    row1: [
      { server: 'Siel', rate: 13.9 },
      { server: 'Nezekan', rate: 13.1 },
      { server: 'Vaizel', rate: 11.3 },
      { server: 'Kaisinel', rate: 13.3 },
      { server: 'Meslamtaeda', rate: 11.8 },
      { server: 'Fregion', rate: 11.8 },
      { server: 'Yustiel', rate: 15.3 },
      { server: 'Ariel', rate: 13.9 },
      { server: 'Hithanya', rate: 11.7 },
      { server: 'Nania', rate: 13.7 },
    ],
    row2: [
      { server: 'Israphel', rate: 13.5 },
      { server: 'Zikel', rate: 13.0 },
      { server: 'Triniel', rate: 13.2 },
      { server: 'Lumiel', rate: 13.4 },
      { server: 'Beritra', rate: 10.8 },
      { server: 'Ereshkigal', rate: 13.2 },
      { server: 'Marchutan', rate: 15.8 },
      { server: 'Azphel', rate: 10.0 },
      { server: 'Nemon', rate: 13.8 },
      { server: 'Hadala', rate: 14.8 },
    ],
  },
  EU: {
    code: 'EU',
    name: 'Europe',
    emoji: '🏰',
    ping: '96ms',
    row1: [
      { server: 'Siel', rate: 13.1 },
      { server: 'Nezekan', rate: 14.5 },
      { server: 'Vaizel', rate: 14.4 },
      { server: 'Kaisinel', rate: 14.1 },
      { server: 'Meslamtaeda', rate: 9.9 },
      { server: 'Fregion', rate: 16.2 },
      { server: 'Yustiel', rate: 13.2 },
      { server: 'Ariel', rate: 13.0 },
      { server: 'Hithanya', rate: 13.1 },
      { server: 'Nania', rate: 25.2 },
      { server: 'Tahavatha', rate: 15.2 },
      { server: 'Luteros', rate: 21.5 },
      { server: 'Phemos', rate: 30.2 },
      { server: 'Daminu', rate: 24.2 },
      { server: 'Kasaka', rate: 20.5 },
      { server: 'Bakarma', rate: 26.7 },
      { server: 'Tsenka', rate: 33.7 },
      { server: 'Kochi', rate: 27.7 },
      { server: 'Ishtar', rate: 17.1 },
      { server: 'Tiamat', rate: 28.4 },
      { server: 'Gauss', rate: 38.6 },
      { server: 'Lamuatan', rate: 24.3 },
      { server: 'Nathara', rate: 41.0 },
    ],
    row2: [
      { server: 'Israphel', rate: 13.9 },
      { server: 'Zikel', rate: 13.9 },
      { server: 'Triniel', rate: 17.5 },
      { server: 'Lumiel', rate: 17.0 },
      { server: 'Beritra', rate: 18.6 },
      { server: 'Ereshkigal', rate: 15.3 },
      { server: 'Marchutan', rate: 20.4 },
      { server: 'Azphel', rate: 14.6 },
      { server: 'Nemon', rate: 20.3 },
      { server: 'Hadala', rate: 18.7 },
      { server: 'Ludra', rate: 25.4 },
      { server: 'Ulgorn', rate: 18.6 },
      { server: 'Mumin', rate: 18.9 },
      { server: 'Odar', rate: 19.1 },
      { server: 'Zemurru', rate: 20.5 },
      { server: 'Kromede', rate: 19.1 },
      { server: 'Baba', rate: 24.3 },
      { server: 'Fafnir', rate: 25.1 },
      { server: 'Indnath', rate: 18.0 },
      { server: 'Agnita', rate: 21.8 },
      { server: 'Atiel', rate: 23.0 },
      { server: 'Tassin', rate: 25.4 },
      { server: 'Quai', rate: 19.0 },
    ],
  },
  'NA-WEST': {
    code: 'NA-WEST',
    name: 'NA West',
    emoji: '🦅',
    ping: '142ms',
    row1: [
      { server: 'Siel', rate: 17.3 },
      { server: 'Nezekan', rate: 14.9 },
      { server: 'Vaizel', rate: 19.4 },
      { server: 'Kaisinel', rate: 15.3 },
      { server: 'Meslamtaeda', rate: null },
      { server: 'Fregion', rate: null },
      { server: 'Yustiel', rate: 21.3 },
      { server: 'Ariel', rate: null },
    ],
    row2: [
      { server: 'Israphel', rate: 13.6 },
      { server: 'Zikel', rate: 15.9 },
      { server: 'Triniel', rate: 14.0 },
      { server: 'Lumiel', rate: 16.9 },
      { server: 'Beritra', rate: null },
      { server: 'Ereshkigal', rate: null },
      { server: 'Marchutan', rate: 16.3 },
      { server: 'Azphel', rate: null },
    ],
  },
  'NA-EAST': {
    code: 'NA-EAST',
    name: 'NA East',
    emoji: '🗽',
    ping: '158ms',
    row1: [
      { server: 'Siel', rate: 22.9 },
      { server: 'Nezekan', rate: 21.1 },
      { server: 'Vaizel', rate: 16.8 },
      { server: 'Kaisinel', rate: 16.4 },
      { server: 'Meslamtaeda', rate: 13.7 },
      { server: 'Fregion', rate: 10.4 },
      { server: 'Yustiel', rate: 20.1 },
      { server: 'Ariel', rate: 20.1 },
      { server: 'Hithanya', rate: 15.3 },
    ],
    row2: [
      { server: 'Israphel', rate: 18.2 },
      { server: 'Zikel', rate: 20.5 },
      { server: 'Triniel', rate: 17.4 },
      { server: 'Lumiel', rate: 18.3 },
      { server: 'Beritra', rate: 24.3 },
      { server: 'Ereshkigal', rate: 15.1 },
      { server: 'Marchutan', rate: 14.4 },
      { server: 'Azphel', rate: 16.2 },
      { server: 'Nemon', rate: 22.2 },
    ],
  },
  SA: {
    code: 'SA',
    name: 'South America',
    emoji: '🌴',
    ping: '181ms',
    row1: [
      { server: 'Siel', rate: 30.4 },
      { server: 'Nezekan', rate: 32.0 },
      { server: 'Vaizel', rate: 29.4 },
      { server: 'Kaisinel', rate: 45.2 },
      { server: 'Meslamtaeda', rate: null },
      { server: 'Fregion', rate: null },
      { server: 'Yustiel', rate: 38.4 },
      { server: 'Ariel', rate: 122.7 },
    ],
    row2: [
      { server: 'Israphel', rate: 25.5 },
      { server: 'Zikel', rate: 29.4 },
      { server: 'Triniel', rate: 42.0 },
      { server: 'Lumiel', rate: null },
      { server: 'Beritra', rate: null },
      { server: 'Ereshkigal', rate: null },
      { server: 'Marchutan', rate: null },
      { server: 'Azphel', rate: 48.4 },
    ],
  },
};

const REGION_ASSETS: Record<string, { earth: string; color: string }> = {
  ASIA: { earth: './earth-asia.svg', color: '#2bd8c0' },
  EU: { earth: './earth-europe.svg', color: '#38bdf8' },
  'NA-WEST': { earth: './earth-north-america.svg', color: '#ff9d4a' },
  'NA-EAST': { earth: './earth-na-east.svg', color: '#818cf8' },
  SA: { earth: './earth-south-america.svg', color: '#4ade80' },
};

const REGION_SHORT_LABEL: Record<string, string> = {
  ASIA: 'Asia',
  EU: 'EU',
  'NA-WEST': 'NA-W',
  'NA-EAST': 'NA-E',
  SA: 'S',
};

const regions = Object.values(REGIONS_DATA).map((reg) => ({
  name: reg.name,
  code: reg.code,
  emoji: reg.emoji,
  servers: reg.row1.length + reg.row2.length,
  ping: reg.ping,
}));

const allServerList = Object.entries(REGIONS_DATA).flatMap(([regCode, reg]) =>
  [...reg.row1, ...reg.row2].map((s, idx) => ({
    name: s.server,
    region: regCode,
    regionName: reg.name,
    rate: s.rate,
    online: s.rate !== null ? 350 + ((idx * 47) % 520) : 0,
    price: s.rate !== null ? `${s.rate}k / M` : 'N/A',
    status: s.rate !== null ? 'Ổn định' : 'Tạm ngưng',
  }))
);

function App() {
  const [lang, setLang] = useState<Language>('vi');
  const t = TRANSLATIONS[lang];

  const [activeRegion, setActiveRegion] = useState('ASIA');
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [consignModalOpen, setConsignModalOpen] = useState(false);
  const [boosterCategory, setBoosterCategory] = useState<BoosterCategoryType>('leveling');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'excel' | 'cards'>(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return 'cards';
    }
    return 'excel';
  });
  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);

  // Thanh sáng dưới menu: đổi trực tiếp transform, không render lại cả trang khi rê chuột
  const [activeNav, setActiveNav] = useState('home');
  const navRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);

  const moveGlow = (el: HTMLElement | null | undefined) => {
    if (!el || !glowRef.current) return;
    glowRef.current.style.opacity = '1';
    glowRef.current.style.transform = `translateX(${el.offsetLeft}px) scaleX(${el.offsetWidth / 100})`;
  };
  const activeNavLink = () => navRef.current?.querySelector<HTMLAnchorElement>(`a[data-nav="${activeNav}"]`);

  useEffect(() => {
    const update = () => moveGlow(navRef.current?.querySelector<HTMLAnchorElement>(`a[data-nav="${activeNav}"]`));
    update();
    document.fonts?.ready.then(update);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [activeNav, lang]);

  const handleNavHover = (e: React.MouseEvent<HTMLAnchorElement>) => moveGlow(e.currentTarget);
  const handleNavLeave = () => moveGlow(activeNavLink());

  // Calculator states
  const [calcServerKey, setCalcServerKey] = useState('ASIA|Siel|13.9');
  const [calcAmount, setCalcAmount] = useState<number | string>(0);
  const [payoutCurrency, setPayoutCurrency] = useState<'VND' | 'USDT'>('VND');

  const selectedCalcServer = useMemo(() => {
    const [region, server, rateStr] = calcServerKey.split('|');
    const rate = parseFloat(rateStr) || 0;
    return { region, server, rate };
  }, [calcServerKey]);

  const [kinahPrefill, setKinahPrefill] = useState<KinahPrefill>({ key: '', amount: 0, currency: 'VND', n: 0 });
  const kinahRegions = useMemo<KinahRegion[]>(
    () =>
      Object.values(REGIONS_DATA).map((reg) => ({
        code: reg.code,
        label: `${reg.name} (${REGION_SHORT_LABEL[reg.code] || reg.code})`,
        servers: [...reg.row1, ...reg.row2]
          .filter((x) => x.rate !== null)
          .map((x) => ({ server: x.server, rate: x.rate as number })),
      })),
    [],
  );

  const numericCalcAmount = typeof calcAmount === 'number' ? calcAmount : (parseFloat(calcAmount) || 0);
  const calcTotalVND = Math.round(numericCalcAmount * selectedCalcServer.rate * 1000);
  const calcTotalUSDT = (calcTotalVND / USDT_RATE).toFixed(2);

  const filteredServers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return allServerList.filter((server) => server.region === activeRegion);
    }
    // Match in current region first
    const inRegion = allServerList.filter(
      (server) => server.region === activeRegion && server.name.toLowerCase().includes(q)
    );
    if (inRegion.length > 0) return inRegion;
    // Or match across all regions
    return allServerList.filter((server) => server.name.toLowerCase().includes(q));
  }, [activeRegion, search]);

  const currentRegionData = REGIONS_DATA[activeRegion] || REGIONS_DATA['ASIA'];

  const onSelectServerForCalc = (regionCode: string, serverName: string, rate: number | null) => {
    if (rate === null) return;
    setCalcServerKey(`${regionCode}|${serverName}|${rate}`);
    const el = document.getElementById('calc-widget');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <FeatherField />
      <header className="site-header">
        <a className="brand" href="../../" title="Về trang chủ GeGe Team" aria-label="Về trang chủ GeGe Team">
          <img src="./gegeteam-logo.webp" alt="GeGe Team Logo" className="brand-logo-img" />
          <span className="brand-text-wrap">
            <strong>GEGE</strong>
            <small>TEAM</small>
          </span>
        </a>
        <nav
          ref={navRef}
          className={`main-nav ${mobileMenu ? 'is-open' : ''}`}
          onMouseLeave={handleNavLeave}
        >
          <a
            data-nav="home"
            className={activeNav === 'home' ? 'active' : ''}
            href="#sec-landing"
            onMouseEnter={handleNavHover}
            onClick={() => {
              setActiveNav('home');
              setMobileMenu(false);
            }}
          >
            {t.nav.home}
          </a>
          <a
            data-nav="pricing"
            className={activeNav === 'pricing' ? 'active' : ''}
            href="#pricing"
            onMouseEnter={handleNavHover}
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('pricing');
              setMobileMenu(false);
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t.nav.pricing}
          </a>
          <a
            data-nav="boost"
            className={activeNav === 'boost' ? 'active' : ''}
            href="#boost"
            onMouseEnter={handleNavHover}
            onClick={(e) => {
              e.preventDefault();
              setActiveNav('boost');
              setMobileMenu(false);
              document.getElementById('boost')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t.nav.consign}
          </a>
          <a
            data-nav="support"
            className={activeNav === 'support' ? 'active' : ''}
            href="https://discord.gg/t2fPyUPGY"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleNavHover}
            onClick={() => {
              setActiveNav('support');
              setMobileMenu(false);
            }}
          >
            {t.nav.support}
          </a>

          {/* Thanh ngang phát sáng di chuyển trượt theo con chuột */}
          <span ref={glowRef} className="nav-gliding-glow-bar" />
        </nav>
        <div className="header-actions">
          {/* Language Switcher */}
          <button
            type="button"
            className="lang-toggle-btn"
            onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
            title={lang === 'vi' ? 'Chuyển sang Tiếng Anh (English)' : 'Switch to Vietnamese'}
          >
            <span>{lang === 'vi' ? '🇻🇳 VN' : '🇬🇧 EN'}</span>
          </button>
          <button
            className="menu-toggle"
            aria-label="Mở menu"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="sec-landing">
        <section className="hero-section">
          {/* Ảnh chính thức AION 2 làm nền cả phần đầu trang */}
          <div className="hero-backdrop" aria-hidden="true">
            <img src="./hero-aion2.webp" alt="" />
          </div>
          <div className="hero-copy">
            <img className="hero-game-logo" src="./aion2-logo.webp" width="296" height="202" alt="AION 2" />
            <div className="eyebrow eyebrow-orange">{t.hero.eyebrow}</div>
            <h1>
              {t.hero.title1}
              <br />
              <em>{t.hero.title2}</em>
            </h1>
            <p>{t.hero.desc}</p>
            <div className="hero-actions">
              <a
                href="#pricing"
                className="primary-button"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t.hero.cta} <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>


        <section className="pricing-section" id="pricing">
          <div className="section-heading">
            <div>
              <div className="eyebrow eyebrow-orange">{t.pricing.eyebrow}</div>
              <h2>
                {t.pricing.title} <em>{t.pricing.titleEm}</em>
              </h2>
              <p>{t.pricing.subtitle}</p>
            </div>
            <div className="updated updated-orange">
              <span className="live-pulse-dot" />
              {t.pricing.updated} <b>{t.pricing.justNow}</b>
            </div>
          </div>

          <div className="market-panel">
            <div className="market-toolbar">
              <div className="game-select-wrap">
                <button
                  type="button"
                  className="game-select-toggle"
                  onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                  aria-expanded={regionDropdownOpen}
                >
                  <Gamepad2 size={18} />
                  <span>
                    <small>{t.pricing.viewingGame}</small>
                    <b>AION 2</b>
                  </span>
                  <ChevronDown size={16} className={`chevron-icon ${regionDropdownOpen ? 'rotated' : ''}`} />
                </button>

                {regionDropdownOpen && (
                  <div className="region-menu-dropdown">
                    {regions.map((region) => (
                      <button
                        key={region.code}
                        type="button"
                        className={`region-menu-row ${activeRegion === region.code ? 'active' : ''}`}
                        onClick={() => {
                          setActiveRegion(region.code);
                          setRegionDropdownOpen(false);
                        }}
                      >
                        <span className="rmr-flag">{region.emoji}</span>
                        <span className="rmr-name">{region.name}</span>
                        <span className="rmr-servers">{region.servers} {t.pricing.serversWord}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                className="refresh-button"
                onClick={() => {
                  alert(t.pricing.refreshAlert);
                }}
              >
                <RefreshCw size={15} /> {t.pricing.refresh}
              </button>
            </div>

            {/* VÙNG CHỌN REGION: Mặc định tối giản chuẩn như ảnh mẫu, Hover hiện quả địa cầu 3D tràn ngập ô */}
            <div className="region-grid">
              {regions.map((region) => {
                const asset = REGION_ASSETS[region.code] || REGION_ASSETS['ASIA'];
                const isSelected = activeRegion === region.code;
                return (
                  <button
                    key={region.code}
                    type="button"
                    className={`region-card ${isSelected ? 'selected' : ''} region-card-${region.code.toLowerCase()}`}
                    onClick={() => setActiveRegion(region.code)}
                  >
                    {/* Quả địa cầu 3D tràn ngập toàn bộ ô khi Hover */}
                    <div className="rc-hover-backdrop">
                      <img
                        src={asset.earth}
                        alt=""
                        className="rc-full-earth"
                      />
                      <div className="rc-backdrop-overlay" />
                    </div>

                    {/* Nội dung trung tâm: Mặc định chỉ hiện chữ tên Vùng (ASIA, EUROPE...) */}
                    <div className="rc-main-content">
                      <b className="rc-title">{region.name}</b>
                      <span className="rc-meta">
                        <span>{region.servers} servers</span>
                        <i className="rc-meta-sep">•</i>
                        <span className="rc-ping">{region.ping}</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="server-head">
              <div className="search-box">
                <Search size={16} />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder={t.pricing.searchPlaceholder}
                />
                {search && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setSearch('')}
                    title={t.pricing.clearSearch}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="table-note">
                <button
                  type="button"
                  className={`table-view-btn ${viewMode === 'excel' ? 'active' : ''}`}
                  onClick={() => setViewMode('excel')}
                >
                  {t.pricing.viewExcel}
                </button>
                <button
                  type="button"
                  className={`table-view-btn ${viewMode === 'cards' ? 'active' : ''}`}
                  onClick={() => setViewMode('cards')}
                >
                  {t.pricing.viewCards}
                </button>
              </div>
            </div>

            <div className="active-region">
              <span>
                {t.pricing.viewing} <b>{currentRegionData.name}</b> ({currentRegionData.row1.length + currentRegionData.row2.length} {t.pricing.serversWord})
              </span>
              <small>{t.pricing.hintClick}</small>
            </div>

            {/* VIEW 1: BẢNG EXCEL ĐẦY ĐỦ - SỐ NỔI BẬT THU HÚT GIAO DỊCH */}
            {viewMode === 'excel' && (
              <div className="excel-sheet-wrapper">
                <div className="excel-region-row">
                  <div className="excel-region-title">
                    <span>{currentRegionData.name}</span>
                  </div>
                  <div className="excel-table-scroll">
                    <table className="excel-green-table">
                      <thead>
                        <tr>
                          {currentRegionData.row1.map((item) => (
                            <th key={`h1-${item.server}`} className={search.trim() && item.server.toLowerCase().includes(search.toLowerCase()) ? 'th-highlighted' : ''}>{item.server}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          {currentRegionData.row1.map((item) => (
                            <td
                              key={`r1-${item.server}`}
                              className={`${item.rate === null ? 'cell-na' : 'cell-clickable'} ${search.trim() && item.server.toLowerCase().includes(search.toLowerCase()) ? 'cell-highlighted' : ''} ${selectedCalcServer.server === item.server && selectedCalcServer.region === currentRegionData.code ? 'cell-selected' : ''}`.trim()}
                              onClick={() => onSelectServerForCalc(currentRegionData.code, item.server, item.rate)}
                              title={item.rate !== null ? `🔥 Nhấp để ký gửi ngay server ${item.server} (Tỷ giá ${item.rate})` : 'Chưa có tỷ giá'}
                            >
                              {item.rate !== null ? (
                                <span className="rate-num-val">
                                  {item.rate.toFixed(1)}
                                </span>
                              ) : (
                                <span className="rate-na-text">N/A</span>
                              )}
                            </td>
                          ))}
                        </tr>
                        <tr className="excel-header-row2">
                          {currentRegionData.row2.map((item) => (
                            <th key={`h2-${item.server}`} className={search.trim() && item.server.toLowerCase().includes(search.toLowerCase()) ? 'th-highlighted' : ''}>{item.server}</th>
                          ))}
                        </tr>
                        <tr>
                          {currentRegionData.row2.map((item) => (
                            <td
                              key={`r2-${item.server}`}
                              className={`${item.rate === null ? 'cell-na' : 'cell-clickable'} ${search.trim() && item.server.toLowerCase().includes(search.toLowerCase()) ? 'cell-highlighted' : ''} ${selectedCalcServer.server === item.server && selectedCalcServer.region === currentRegionData.code ? 'cell-selected' : ''}`.trim()}
                              onClick={() => onSelectServerForCalc(currentRegionData.code, item.server, item.rate)}
                              title={item.rate !== null ? `🔥 Nhấp để ký gửi ngay server ${item.server} (Tỷ giá ${item.rate})` : 'Chưa có tỷ giá'}
                            >
                              {item.rate !== null ? (
                                <span className="rate-num-val">
                                  {item.rate.toFixed(1)}
                                </span>
                              ) : (
                                <span className="rate-na-text">N/A</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: DẠNG THẺ DANH SÁCH GỌN */}
            {viewMode === 'cards' && (
              <div className="server-list">
                {filteredServers.length ? (
                  filteredServers.map((server) => (
                    <div
                      className="server-row server-row-orange"
                      key={`${server.region}-${server.name}`}
                      onClick={() => onSelectServerForCalc(server.region, server.name, server.rate)}
                    >
                      <img src="./kinah-coin.png" alt="Kinah" className="server-coin-icon" />
                      <span className="server-name-orange">
                        <b>{server.name}</b>
                        {search.trim() !== '' && (
                          <small className="server-reg-badge">{server.regionName}</small>
                        )}
                      </span>
                      <strong className="server-price-orange">
                        {server.rate !== null ? `${t.pricing.rateWord}: ${server.rate}` : 'N/A'}
                      </strong>
                      <button
                        className="buy-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectServerForCalc(server.region, server.name, server.rate);
                        }}
                      >
                        {t.pricing.sellBtn} <ArrowRight size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty-state">
                    {t.pricing.noServers}
                  </div>
                )}
              </div>
            )}

            {/* MÁY TÍNH TIỀN KINA NHANH (HỖ TRỢ CẢ TIỀN VIỆT VNĐ VÀ VÍ TIỀN SỐ USDT) */}
            <div className="quick-calculator-card" id="calc-widget">
              <div className="calc-top-header">
                <div className="calc-title-box">
                  <Calculator size={18} color="#38bdf8" />
                  <span className="calc-top-title">{t.calculator.title}</span>
                  <span className="calc-top-sub">{t.calculator.subtitle}</span>
                </div>

                {/* Thanh chọn đơn vị tiền: VNĐ vs USDT Ví Crypto */}
                <div className="calc-currency-pills">
                  <span className="ccp-label">{t.calculator.payoutMethod}</span>
                  <button
                    type="button"
                    className={`ccp-pill ${payoutCurrency === 'VND' ? 'active' : ''}`}
                    onClick={() => setPayoutCurrency('VND')}
                  >
                    🇻🇳 VNĐ
                  </button>
                  <button
                    type="button"
                    className={`ccp-pill ${payoutCurrency === 'USDT' ? 'active' : ''}`}
                    onClick={() => setPayoutCurrency('USDT')}
                  >
                    <img src="./usdt-icon.svg" alt="USDT" className="ccp-usdt-icon" />
                    ₮ USDT
                  </button>
                  <span className="ccp-rate-badge">{t.calculator.usdtRateHint}</span>
                </div>
              </div>

              <div className="calc-inputs-bar">
                <div className="calc-input-item">
                  <label>{t.calculator.selectServer}</label>
                  <select
                    value={calcServerKey}
                    onChange={(e) => setCalcServerKey(e.target.value)}
                  >
                    {Object.values(REGIONS_DATA).map((reg) => (
                      <optgroup key={reg.code} label={`${reg.name} (${REGION_SHORT_LABEL[reg.code] || reg.code})`}>
                        {[...reg.row1, ...reg.row2]
                          .filter((s) => s.rate !== null)
                          .map((s) => (
                            <option
                              key={`${reg.code}-${s.server}`}
                              value={`${reg.code}|${s.server}|${s.rate}`}
                            >
                              {s.server} ({REGION_SHORT_LABEL[reg.code] || reg.code}) · {s.rate}k
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                <div className="calc-input-item">
                  <label>{t.calculator.amountLabel}</label>
                  <div className="calc-amount-input-wrap">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      placeholder="0"
                      value={calcAmount}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setCalcAmount('');
                        } else {
                          const parsed = parseFloat(val);
                          setCalcAmount(isNaN(parsed) ? '' : Math.max(0, parsed));
                        }
                      }}
                    />
                    <span className="calc-amount-unit">M</span>
                  </div>
                </div>

                {/* Cột hiển thị số tiền nhận được */}
                <div className="calc-input-item calc-output-item">
                  <label>{payoutCurrency === 'VND' ? 'Số tiền nhận được (VNĐ)' : 'Số tiền nhận được (USDT)'}</label>
                  <div className="calc-display-screen">
                    {payoutCurrency === 'VND' ? (
                      <>
                        <span className="calc-screen-val">
                          {calcTotalVND.toLocaleString('vi-VN')}
                        </span>
                        <span className="calc-screen-unit">VNĐ</span>
                        <button
                          type="button"
                          className="calc-screen-convert-pill"
                          onClick={() => setPayoutCurrency('USDT')}
                          title="Đổi hiển thị sang USDT"
                        >
                          ≈ {calcTotalUSDT} USDT
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="calc-screen-val">
                          {calcTotalUSDT}
                        </span>
                        <span className="calc-screen-unit">USDT</span>
                        <button
                          type="button"
                          className="calc-screen-convert-pill"
                          onClick={() => setPayoutCurrency('VND')}
                          title="Đổi hiển thị sang VNĐ"
                        >
                          ≈ {calcTotalVND.toLocaleString('vi-VN')} đ
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="calc-cta-wrap">
                  <a
                    href="#kinah-guide"
                    className="calc-sell-btn"
                    onClick={() =>
                      setKinahPrefill((p) => ({
                        key: calcServerKey,
                        amount: numericCalcAmount,
                        currency: payoutCurrency,
                        n: p.n + 1,
                      }))
                    }
                  >
                    <span>{t.calculator.sellNow}</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>

            <div className="market-footer">
              <span>
                <Clock3 size={15} /> {t.pricing.footerNote}
              </span>
              <a href="#kinah-guide">
                {t.pricing.footerLink} <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        <section className="support-section unified-booster-section" id="boost">

          <BoosterSection lang={lang} />
        </section>

        <section className="support-section unified-booster-section kinah-guide-section" id="kinah-guide">
          <KinahGuide lang={lang} regions={kinahRegions} prefill={kinahPrefill} />
        </section>

        <section className="community-section" id="support">
          <div className="section-heading" style={{ marginBottom: '22px' }}>
            <div>
              <div className="eyebrow eyebrow-orange">{t.community.eyebrow}</div>
              <h2>{t.community.title} <em>{t.community.titleEm}</em></h2>
              <p>{t.community.desc}</p>
            </div>
            <a
              href="https://gegeteam.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="hub-link-badge"
            >
              {t.community.hubLink} <ArrowRight size={15} />
            </a>
          </div>

          <div className="community-grid">

            {/* 1. Discord (kênh chính) */}
            <a
              href="https://discord.gg/t2fPyUPGY"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card comm-card-discord"
            >
              <div className="ccc-hover-backdrop">
                <img src="./logo-discord.svg" alt="Discord" className="ccc-full-logo" />
                <div className="ccc-backdrop-overlay" />
              </div>
              <div className="ccc-main-content">
                <div className="ccc-icon-wrap discord-bg">
                  <img src="./logo-discord.svg" alt="Discord" className="ccc-badge-logo" />
                </div>
                <div className="ccc-content">
                  <b>{t.community.discord}</b>
                  <small>{t.community.discordSub}</small>
                </div>
                <span className="ccc-action-tag">{t.community.connect}</span>
              </div>
            </a>
            {/* 2. Fanpage Facebook */}
            <a
              href="https://www.facebook.com/GegeTeam.net/"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card comm-card-fb"
            >
              <div className="ccc-hover-backdrop">
                <img src="./logo-facebook.svg" alt="Facebook" className="ccc-full-logo" />
                <div className="ccc-backdrop-overlay" />
              </div>
              <div className="ccc-main-content">
                <div className="ccc-icon-wrap fb-bg">
                  <img src="./logo-facebook.svg" alt="Facebook" className="ccc-badge-logo" />
                </div>
                <div className="ccc-content">
                  <b>{t.community.fbPage}</b>
                  <small>{t.community.fbPageSub}</small>
                </div>
                <span className="ccc-action-tag">{t.community.followNow}</span>
              </div>
            </a>

            {/* 3. Group Facebook */}
            <a
              href="https://www.facebook.com/groups/457999664580741"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card comm-card-group"
            >
              <div className="ccc-hover-backdrop">
                <img src="./logo-facebook.svg" alt="Group Facebook" className="ccc-full-logo" />
                <div className="ccc-backdrop-overlay" />
              </div>
              <div className="ccc-main-content">
                <div className="ccc-icon-wrap group-bg">
                  <img src="./logo-facebook.svg" alt="Group" className="ccc-badge-logo" />
                </div>
                <div className="ccc-content">
                  <b>{t.community.fbGroup}</b>
                  <small>{t.community.fbGroupSub}</small>
                </div>
                <span className="ccc-action-tag">{t.community.enterGroup}</span>
              </div>
            </a>

            {/* Nhóm Zalo (phụ) */}
            <a
              href="https://zalo.me/g/kmxfzujpa7akgrijn5hk"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card comm-card-zalo"
            >
              <div className="ccc-hover-backdrop">
                <img src="./logo-zalo.svg" alt="Zalo" className="ccc-full-logo" />
                <div className="ccc-backdrop-overlay" />
              </div>
              <div className="ccc-main-content">
                <div className="ccc-icon-wrap zalo-bg">
                  <img src="./logo-zalo.svg" alt="Zalo" className="ccc-badge-logo" />
                </div>
                <div className="ccc-content">
                  <b>{t.community.zaloGroup}</b>
                  <small>{t.community.zaloGroupSub}</small>
                </div>
                <span className="ccc-action-tag">{t.community.joinNow}</span>
              </div>
            </a>


            {/* 6. Cổng Tổng Hợp gegeteam.xyz */}
            <a
              href="https://gegeteam.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="comm-channel-card comm-card-portal"
            >
              <div className="ccc-hover-backdrop">
                <img src="./gegeteam-logo.webp" alt="GeGe Team" className="ccc-full-logo ccc-full-logo-gege" />
                <div className="ccc-backdrop-overlay" />
              </div>
              <div className="ccc-main-content">
                <div className="ccc-icon-wrap bio-bg">
                  <img src="./gegeteam-logo.webp" alt="GeGe Portal" className="ccc-badge-logo" />
                </div>
                <div className="ccc-content">
                  <b>{t.community.portal}</b>
                  <small>{t.community.portalSub}</small>
                </div>
                <span className="ccc-action-tag">{t.community.openPortal}</span>
              </div>
            </a>
          </div>
        </section>

        {/* MODAL KÝ GỬI & BOOSTER DỊCH VỤ */}
        {consignModalOpen && (
          <div className="modal-overlay" onClick={() => setConsignModalOpen(false)}>
            <div className="modal-content-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-bar">
                <div className="modal-title-group">
                  <span className="modal-tag-badge">{t.modal.tag}</span>
                  <h3>{t.modal.title}</h3>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setConsignModalOpen(false)}
                  aria-label="Đóng"
                >
                  ✕
                </button>
              </div>

              <BoosterSection lang={lang} />
            </div>
          </div>
        )}

      </main>

      <AskFloat lang={lang} />

      <footer className="site-footer">
        <span>{t.footer.rights}</span>
        <span>{t.footer.privacy}&nbsp;&nbsp; {t.footer.terms}</span>
      </footer>
    </div>
  );
}

export default App;
