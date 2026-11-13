import { useMemo, useRef, useState } from 'react';
import type { Language } from '../translations';
import type { KinahPrefill } from './KinahGuide';
import './booster-wow.css';

const DISCORD = 'https://discord.gg/t2fPyUPGY';

export interface RateRegion {
  code: string;
  name: string;
  short: string;
  servers: { server: string; rate: number | null }[];
}

interface Props {
  lang: Language;
  regions: RateRegion[];
  usdtRate: number;
  onSell: (p: Omit<KinahPrefill, 'n'>) => void;
}

const TXT = {
  vi: {
    side: 'Khu vực',
    ask: 'Đặt câu hỏi',
    eyebrow: 'AION 2 · Thu mua Kinah',
    title: 'Bảng giá Kinah',
    lede: 'Chọn khu vực để xem giá thu mua từng server. Bấm vào một server để tính ngay số tiền bạn nhận, rồi ký gửi qua Discord.',
    search: 'Tìm nhanh tên server...',
    live: 'Cập nhật hôm nay',
    best: 'Giá cao nhất',
    all: 'Tất cả server',
    results: 'Kết quả tìm kiếm',
    none: 'Không tìm thấy server nào.',
    per: 'đ / 1M Kinah',
    sell: 'Bán',
    paused: 'Tạm ngưng',
    calc: 'Máy tính Kinah',
    server: 'Server',
    amount: 'Số Kinah muốn bán (M = triệu)',
    currency: 'Nhận tiền bằng',
    vnd: 'VNĐ · chuyển khoản ngân hàng',
    usdt: 'USDT · ví tiền số',
    sum: 'Tóm tắt',
    rate: 'Tỷ giá',
    qty: 'Số lượng',
    total: 'Bạn nhận được',
    note: '1 USDT ≈ 25.800đ. Giá có thể thay đổi theo thị trường, admin sẽ chốt lại khi nhận đơn.',
    cta: 'Ký gửi ngay',
    guide: 'Xem hướng dẫn ký gửi',
    brandSub: 'Thu mua Kinah',
  },
  en: {
    side: 'Regions',
    ask: 'Ask a question',
    eyebrow: 'AION 2 · Kinah buying',
    title: 'Kinah rates',
    lede: 'Pick a region to see our buying rate for each server. Tap a server to calculate your payout instantly, then consign through Discord.',
    search: 'Search server name...',
    live: 'Updated today',
    best: 'Best rates',
    all: 'All servers',
    results: 'Search results',
    none: 'No server found.',
    per: 'VND / 1M Kinah',
    sell: 'Sell',
    paused: 'Paused',
    calc: 'Kinah calculator',
    server: 'Server',
    amount: 'Kinah to sell (M = million)',
    currency: 'Get paid in',
    vnd: 'VND · bank transfer',
    usdt: 'USDT · crypto wallet',
    sum: 'Summary',
    rate: 'Rate',
    qty: 'Amount',
    total: 'You receive',
    note: '1 USDT ≈ 25,800 VND. Rates follow the market; an admin confirms the final price when taking your order.',
    cta: 'Consign now',
    guide: 'Read the consignment guide',
    brandSub: 'Kinah buying',
  },
};

const QUICK = [100, 500, 1000, 3000];

export function RateBoard({ lang, regions, usdtRate, onSell }: Props) {
  const u = TXT[lang];
  const [region, setRegion] = useState(regions[0].code);
  const [q, setQ] = useState('');
  const first = regions[0].servers.find((s) => s.rate !== null)!;
  const [selKey, setSelKey] = useState(`${regions[0].code}|${first.server}|${first.rate}`);
  const [amount, setAmount] = useState<number | ''>(100);
  const [currency, setCurrency] = useState<'VND' | 'USDT'>('VND');
  const calcRef = useRef<HTMLDivElement>(null);

  const reg = regions.find((r) => r.code === region) || regions[0];
  const num = (n: number) => n.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US');
  const usdt = (vnd: number) => (vnd / usdtRate).toFixed(2);

  const query = q.trim().toLowerCase();
  const results = useMemo(() => {
    if (!query) return [];
    return regions.flatMap((r) =>
      r.servers.filter((s) => s.server.toLowerCase().includes(query)).map((s) => ({ ...s, reg: r })),
    );
  }, [query, regions]);
  const best = useMemo(
    () => [...reg.servers].filter((s) => s.rate !== null).sort((a, b) => b.rate! - a.rate!).slice(0, 3),
    [reg],
  );

  const [selRegion, selServer, selRateStr] = selKey.split('|');
  const selRate = parseFloat(selRateStr) || 0;
  const amt = typeof amount === 'number' ? amount : 0;
  const totalVnd = Math.round(amt * selRate * 1000);
  const selReg = regions.find((r) => r.code === selRegion);

  const pick = (r: RateRegion, s: { server: string; rate: number | null }) => {
    if (s.rate === null) return;
    setSelKey(`${r.code}|${s.server}|${s.rate}`);
    calcRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const card = (r: RateRegion, s: { server: string; rate: number | null }, showRegion = false) => {
    const key = `${r.code}|${s.server}|${s.rate}`;
    const na = s.rate === null;
    return (
      <button
        type="button"
        key={`${r.code}-${s.server}`}
        className={`rb-card${na ? ' is-na' : ''}${key === selKey ? ' is-sel' : ''}`}
        disabled={na}
        onClick={() => pick(r, s)}
      >
        <span className="rb-top">
          <img src="./kinah-coin.png" alt="" width={28} height={28} />
          <b>{s.server}</b>
          {showRegion && <em>{r.short}</em>}
        </span>
        {na ? (
          <span className="rb-rate rb-rate-na">{u.paused}</span>
        ) : (
          <span className="rb-rate">
            <b>{num(s.rate! * 1000)}</b>
            <small>{u.per}</small>
          </span>
        )}
        <span className="rb-foot">
          <span>{na ? '—' : `≈ ${usdt(s.rate! * 1000)} USDT / 1M`}</span>
          {!na && <span className="rb-sell">{u.sell}</span>}
        </span>
      </button>
    );
  };

  return (
    <div className="bw rb">
      <div className="bw-layout">
        <aside className="bw-sidebar">
          <p className="bw-side-label">
            <img src="./gegeteam-logo.webp" alt="" width={22} height={22} />
            <span>{u.side}</span>
          </p>
          <div className="bw-side-list" role="group" aria-label={u.side}>
            {regions.map((r) => (
              <button
                type="button"
                key={r.code}
                aria-pressed={!query && r.code === region}
                onClick={() => {
                  setRegion(r.code);
                  setQ('');
                }}
              >
                <span>{r.name}</span>
                <span className="cnt">{r.servers.length}</span>
              </button>
            ))}
          </div>
          <a className="bw-ask" href={DISCORD} target="_blank" rel="noopener noreferrer">
            <span className="bw-ask-mail" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></svg>
            </span>
            <span className="bw-ask-line">{u.ask}</span>
            <svg className="bw-ask-pen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 3.5a2.1 2.1 0 0 1 3 3L8 18.5l-4 1 1-4Z" /><path d="m15 5.5 3 3" /></svg>
          </a>
        </aside>

        <div className="bw-main">
          <div className="bw-hero rb-hero">
            <img className="bw-hero-fox" src="./gegeteam-logo.webp" alt="" />
            <p className="bw-eyebrow">{u.eyebrow}</p>
            <h2>{u.title}</h2>
            <p className="bw-lede">{u.lede}</p>
            <div className="rb-searchrow">
              <div className="bw-search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={u.search} aria-label={u.search} />
              </div>
              <span className="rb-live"><i />{u.live}</span>
            </div>
          </div>

          <div className="bw-view" key={query ? 'q' : region}>
            {query ? (
              <section className="bw-cat-section">
                <h3 className="bw-sec-title"><img src="./gegeteam-logo.webp" alt="" />{u.results}</h3>
                {results.length ? (
                  <div className="rb-grid">{results.map((s) => card(s.reg, s, true))}</div>
                ) : (
                  <p className="bw-none">{u.none}</p>
                )}
              </section>
            ) : (
              <>
                <section className="bw-cat-section">
                  <h3 className="bw-sec-title"><img src="./gegeteam-logo.webp" alt="" />{u.best} · {reg.name}</h3>
                  <div className="rb-grid rb-grid-best">{best.map((s) => card(reg, s))}</div>
                </section>
                <section className="bw-cat-section">
                  <h3 className="bw-sec-title"><img src="./gegeteam-logo.webp" alt="" />{u.all} · {reg.name} <span className="rb-count">{reg.servers.length}</span></h3>
                  <div className="rb-grid">{reg.servers.map((s) => card(reg, s))}</div>
                </section>
              </>
            )}
          </div>

          <section className="bw-cat-section" id="calc-widget">
            <h3 className="bw-sec-title"><img src="./gegeteam-logo.webp" alt="" />{u.calc}</h3>
            <div className="rb-calc" ref={calcRef}>
              <div className="bw-form">
                <div className="bw-field">
                  <label htmlFor="rb-server">{u.server}</label>
                  <select id="rb-server" className="rb-select" value={selKey} onChange={(e) => setSelKey(e.target.value)}>
                    {regions.map((r) => (
                      <optgroup key={r.code} label={r.name}>
                        {r.servers
                          .filter((s) => s.rate !== null)
                          .map((s) => (
                            <option key={`${r.code}-${s.server}`} value={`${r.code}|${s.server}|${s.rate}`}>
                              {s.server} ({r.short}) · {num(s.rate! * 1000)}đ / 1M
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div className="bw-field">
                  <label htmlFor="rb-amount">{u.amount}</label>
                  <div className="rb-amount">
                    <input
                      id="rb-amount"
                      type="number"
                      inputMode="decimal"
                      min={0}
                      value={amount}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setAmount(e.target.value === '' || isNaN(v) ? '' : Math.max(0, v));
                      }}
                    />
                    <span>M</span>
                  </div>
                  <div className="rb-chips">
                    {QUICK.map((n) => (
                      <button type="button" key={n} aria-pressed={amount === n} onClick={() => setAmount(n)}>{num(n)}M</button>
                    ))}
                  </div>
                </div>
                <div className="bw-field">
                  <span className="bw-flabel">{u.currency}</span>
                  <div className="bw-checks" role="radiogroup">
                    {(['VND', 'USDT'] as const).map((c) => (
                      <button type="button" key={c} role="radio" aria-checked={currency === c} className="bw-radio-row" onClick={() => setCurrency(c)}>
                        <span className="bw-dot" />
                        <span className="bw-rlabel">{c === 'VND' ? u.vnd : u.usdt}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="bw-panel rb-panel" aria-live="polite">
                <div className="bw-op-brand">
                  <img src="./gegeteam-logo.webp" alt="" />
                  <div>
                    <div className="bw-op-bname">GeGe Team · {lang === 'vi' ? 'Nhà Cáo' : 'Fox House'}</div>
                    <div className="bw-op-bsub">{u.brandSub}</div>
                  </div>
                </div>
                <h3>{u.sum}</h3>
                <div className="bw-op-sum">
                  <ul>
                    <li><span>{u.server}</span><span>{selServer} ({selReg?.short})</span></li>
                    <li><span>{u.rate}</span><span>{num(selRate * 1000)}đ / 1M</span></li>
                    <li><span>{u.qty}</span><span>{num(amt)}M Kinah</span></li>
                  </ul>
                </div>
                <div className="bw-op-total">
                  <p className="t-label">{u.total}</p>
                  {currency === 'VND' ? (
                    <p>{num(totalVnd)} đ<small>≈ {usdt(totalVnd)} USDT</small></p>
                  ) : (
                    <p>{usdt(totalVnd)} USDT<small>≈ {num(totalVnd)} đ</small></p>
                  )}
                </div>
                <p className="bw-op-pay">{u.note}</p>
                <a
                  className="bw-btn bw-btn-primary"
                  href="#kinah-guide"
                  onClick={() => onSell({ key: selKey, amount: amt, currency })}
                >
                  {u.cta}
                </a>
                <a className="bw-btn rb-btn-ghost" href="#kinah-guide">{u.guide}</a>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
