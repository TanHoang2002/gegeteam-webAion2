import React, { useEffect, useState } from 'react';
import './booster-wow.css';

/* Hướng dẫn ký gửi Kina ở cuối trang: phiếu ký gửi (tự tính tiền) + khung tóm tắt gửi qua Discord,
   bên dưới là khối thông tin giống trang WoW (dành cho ai, cách làm, vì sao chọn, hỏi đáp). */

const DISCORD = 'https://discord.gg/t2fPyUPGY';
const USDT_RATE = 25800;

type Lang = 'vi' | 'en';
export interface KinahRegion { code: string; label: string; servers: { server: string; rate: number }[] }
export interface KinahPrefill { key: string; amount: number; currency: 'VND' | 'USDT'; n: number }

const T = {
  vi: {
    eyebrow: 'Hướng dẫn ký gửi Kina', title: 'Ký gửi Kina cho GeGe Team',
    lede: 'Điền phiếu bên dưới: chọn máy chủ, nhập số Kina và cách nhận tiền, trang sẽ tự tính số tiền theo rate hiện tại. Xong bấm sao chép phiếu rồi nhắn cho admin trên Discord để chốt và giao Kina.',
    form: 'Phiếu ký gửi', server: 'Máy chủ', amount: 'Số Kina muốn bán', amountUnit: 'M Kina', amountHint: '1M = 1.000.000 Kina',
    payout: 'Nhận tiền bằng', vnd: 'VNĐ (chuyển khoản)', usdt: 'USDT', network: 'Mạng USDT', char: 'Tên nhân vật trong game', charPh: 'Nhân vật sẽ giao Kina',
    contact: 'Discord của bạn', contactPh: 'Tên Discord để admin liên hệ lại', notes: 'Ghi chú (không bắt buộc)', notesPh: 'Giờ có thể giao, chia nhiều lần, điều cần lưu ý...',
    sum: 'Tóm tắt phiếu ký gửi', rate: 'Rate', rateUnit: 'k / 1M Kina', receive: 'Bạn nhận được', empty: 'Nhập số Kina để xem số tiền.',
    rateLive: 'Rate thay đổi theo thị trường và được admin xác nhận lại trên Discord trước khi giao Kina.',
    pay: 'Thông tin nhận tiền (số tài khoản, ví USDT) chỉ gửi trong Discord sau khi chốt; trang web không thu thông tin hay nhận tiền.',
    copy: 'Sao chép phiếu ký gửi', discord: 'Nhắn Discord để ký gửi', copied: 'Đã sao chép! Dán vào Discord để gửi admin.', copyFail: 'Không sao chép được, hãy bôi đen và sao chép thủ công.',
    head: 'GeGe Team — phiếu ký gửi Kina AION 2', total: 'Số tiền', brandSub: 'AION 2 · Ký gửi Kina',
    whoT: 'Ký gửi Kina dành cho ai?', whoP: 'Dù bạn farm Kina mỗi ngày hay chỉ dư một ít, team đều thu mua:',
    who: ['Người chơi dư Kina muốn đổi ra tiền', 'Người farm Kina hằng ngày cần chỗ thu mua ổn định', 'Người chơi ở nhiều máy chủ Asia, EU, NA, SA', 'Người muốn nhận tiền bằng USDT thay vì VNĐ', 'Người có lượng Kina lớn muốn chia nhiều lần giao', 'Người muốn biết trước số tiền trước khi giao'],
    howT: 'Cách ký gửi',
    steps: [['Điền phiếu', 'Chọn máy chủ, nhập số Kina, cách nhận tiền và tên nhân vật ở phiếu phía trên.'], ['Nhắn Discord', 'Bấm sao chép phiếu rồi dán vào Discord gửi admin GeGe Team.'], ['Chốt rate & giao Kina', 'Admin xác nhận rate hiện tại và hướng dẫn cách giao Kina trong game.'], ['Nhận tiền', 'Team nhận đủ Kina thì chuyển tiền VNĐ hoặc USDT đúng số đã chốt.']],
    trustT: 'Vì sao chọn GeGe Team',
    trust: [['Rate công khai', 'Bảng rate từng máy chủ ở trên được cập nhật liên tục, bạn biết trước mình nhận bao nhiêu.'], ['Chốt rõ trước khi giao', 'Rate, số Kina và số tiền được xác nhận trên Discord trước khi giao. Không làm kiểu đoán chừng.'], ['VNĐ hoặc USDT', 'Nhận chuyển khoản VNĐ hoặc USDT qua TRC20 / BEP20, tùy bạn chọn.'], ['Người thật hỗ trợ', 'Bạn trao đổi trực tiếp với admin trên Discord trước, trong và sau khi giao.']],
    faqT: 'Hỏi đáp',
    faq: [
      ['Rate ký gửi tính thế nào?', 'Rate trong bảng là nghìn đồng cho 1M Kina, ví dụ 13.9k nghĩa là 13.900 đ cho mỗi 1.000.000 Kina. Số tiền = số M Kina × rate. Rate thay đổi theo thị trường và được xác nhận lại khi bạn nhắn Discord.'],
      ['Tôi nhận tiền bằng gì?', 'Chuyển khoản VNĐ hoặc USDT (TRC20 hoặc BEP20). Quy đổi tham khảo 1 USDT ≈ 25.800 đ. Thông tin nhận tiền chỉ gửi cho admin trong Discord.'],
      ['Khi nào tôi nhận được tiền?', 'Sau khi team xác nhận đã nhận đủ số Kina như phiếu đã chốt, tiền được chuyển theo cách bạn chọn.'],
      ['Máy chủ của tôi báo "Tạm ngưng" thì sao?', 'Nghĩa là team đang tạm ngưng thu mua ở máy chủ đó. Bạn vẫn có thể nhắn Discord để hỏi khi nào mở lại.'],
      ['Ký gửi có an toàn không?', 'Chỉ giao Kina sau khi admin đã xác nhận rate trên kênh chính thức ở trang này. Không bao giờ đưa mật khẩu tài khoản, và cẩn thận với người giả danh admin.'],
      ['Tôi có nhiều Kina, bán một lần được không?', 'Được. Lượng lớn có thể chia thành nhiều lần giao, bạn ghi vào phần ghi chú hoặc trao đổi với admin trên Discord.'],
    ],
  },
  en: {
    eyebrow: 'Kinah consignment guide', title: 'Sell your Kinah to GeGe Team',
    lede: 'Fill in the slip below: pick your server, enter the Kinah amount and how you want to be paid, and the page works out the payout at the current rate. Then copy the slip and message the admin on Discord to confirm and hand over the Kinah.',
    form: 'Consignment slip', server: 'Server', amount: 'Kinah to sell', amountUnit: 'M Kinah', amountHint: '1M = 1,000,000 Kinah',
    payout: 'Get paid in', vnd: 'VND (bank transfer)', usdt: 'USDT', network: 'USDT network', char: 'In-game character name', charPh: 'The character handing over the Kinah',
    contact: 'Your Discord', contactPh: 'Discord name so the admin can reach you', notes: 'Notes (optional)', notesPh: 'When you can trade, split deliveries, anything to note...',
    sum: 'Slip summary', rate: 'Rate', rateUnit: 'k VND / 1M Kinah', receive: "You'll receive", empty: 'Enter an amount to see the payout.',
    rateLive: 'Rates move with the market and are confirmed again by the admin on Discord before you hand over Kinah.',
    pay: 'Payment details (bank account, USDT wallet) are only shared on Discord after confirmation; this site never collects details or takes payments.',
    copy: 'Copy consignment slip', discord: 'Message Discord to sell', copied: 'Copied! Paste it into Discord to send to the admin.', copyFail: "Couldn't copy. Select the text manually.",
    head: 'GeGe Team — AION 2 Kinah consignment', total: 'Payout', brandSub: 'AION 2 · Kinah consignment',
    whoT: 'Who is Kinah consignment for?', whoP: 'Whether you farm Kinah every day or just have some spare, the team buys it:',
    who: ['Players with spare Kinah who want cash', 'Daily farmers who need a steady buyer', 'Players on Asia, EU, NA and SA servers', 'Players who prefer USDT over VND', 'Players with large amounts to split into several trades', 'Anyone who wants to know the payout up front'],
    howT: 'How it works',
    steps: [['Fill in the slip', 'Pick your server, enter the Kinah amount, payout method and character name in the slip above.'], ['Message Discord', 'Copy the slip and paste it to the GeGe Team admin on Discord.'], ['Confirm & hand over', 'The admin confirms the current rate and explains how to hand over the Kinah in game.'], ['Get paid', 'Once the team receives the full amount, you get VND or USDT exactly as agreed.']],
    trustT: 'Why GeGe Team',
    trust: [['Public rates', 'The per-server rate table above is updated constantly, so you know your payout up front.'], ['Clear numbers first', 'Rate, amount and payout are confirmed on Discord before any handover. No guesswork.'], ['VND or USDT', 'Get a VND bank transfer or USDT via TRC20 / BEP20 — your choice.'], ['Real people', 'You talk directly with the admin on Discord before, during and after the trade.']],
    faqT: 'FAQ',
    faq: [
      ['How is the rate calculated?', 'Rates are in thousand VND per 1M Kinah, e.g. 13.9k means 13,900 VND for every 1,000,000 Kinah. Payout = M Kinah × rate. Rates follow the market and are confirmed again when you message Discord.'],
      ['How do I get paid?', 'VND bank transfer or USDT (TRC20 or BEP20). Reference rate 1 USDT ≈ 25,800 VND. Payment details are only shared with the admin on Discord.'],
      ['When do I get paid?', 'Once the team confirms it has received the full Kinah amount on your slip, the payout is sent the way you chose.'],
      ['My server says "Paused"?', 'The team is not buying on that server right now. You can still ask on Discord when it reopens.'],
      ['Is it safe?', 'Only hand over Kinah after the admin confirms the rate on the official channel linked here. Never share your password and watch out for fake admins.'],
      ['Can I sell a large amount at once?', 'Yes. Large amounts can be split into several handovers — add it to the notes or arrange it with the admin on Discord.'],
    ],
  },
};

const fmtVnd = (n: number, lang: Lang) => (lang === 'vi' ? n.toLocaleString('vi-VN') + ' đ' : n.toLocaleString('en-US') + ' VND');

export const KinahGuide: React.FC<{ lang?: Lang; regions: KinahRegion[]; prefill?: KinahPrefill }> = ({ lang = 'vi', regions, prefill }) => {
  const u = T[lang];
  const first = regions[0];
  const [key, setKey] = useState(`${first.code}|${first.servers[0].server}`);
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState<'VND' | 'USDT'>('VND');
  const [network, setNetwork] = useState<'TRC20' | 'BEP20'>('TRC20');
  const [char, setChar] = useState('');
  const [contact, setContact] = useState('');
  const [notes, setNotes] = useState('');
  const [copyNote, setCopyNote] = useState('');

  // Nút "Ký gửi ngay" ở máy tính phía trên chuyển máy chủ / số Kina / loại tiền xuống phiếu này
  useEffect(() => {
    if (!prefill || !prefill.n) return;
    const [code, server] = prefill.key.split('|');
    if (regions.some(r => r.code === code && r.servers.some(s => s.server === server))) setKey(`${code}|${server}`);
    if (prefill.amount > 0) setAmount(String(prefill.amount));
    setCurrency(prefill.currency);
  }, [prefill?.n]);

  const [code, serverName] = key.split('|');
  const region = regions.find(r => r.code === code) || first;
  const server = region.servers.find(s => s.server === serverName) || region.servers[0];
  const m = Math.max(0, parseFloat(amount.replace(',', '.')) || 0);
  const totalVnd = Math.round(m * server.rate * 1000);
  const usdt = (totalVnd / USDT_RATE).toFixed(2);
  const payoutText = currency === 'VND' ? fmtVnd(totalVnd, lang) : `${usdt} USDT`;

  const rows: [string, string][] = [
    [u.server, `${server.server} · ${region.label}`],
    [u.rate, `${server.rate}${u.rateUnit}`],
  ];
  if (m > 0) rows.push([u.amount, `${m.toLocaleString(lang === 'vi' ? 'vi-VN' : 'en-US')} ${u.amountUnit}`]);
  rows.push([u.payout, currency === 'VND' ? u.vnd : `USDT (${network})`]);
  if (char.trim()) rows.push([u.char, char.trim()]);
  if (contact.trim()) rows.push([u.contact, contact.trim()]);
  if (notes.trim()) rows.push([u.notes.replace(/ \(.*\)$/, ''), notes.trim()]);

  const copy = async () => {
    const text = [u.head, ...rows.map(([k, v]) => `${k}: ${v}`), `${u.total}: ${m > 0 ? (currency === 'VND' ? `${fmtVnd(totalVnd, lang)} (≈ ${usdt} USDT)` : `${usdt} USDT (≈ ${fmtVnd(totalVnd, lang)})`) : '—'}`].join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopyNote(u.copied);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      const ok = document.execCommand('copy'); ta.remove();
      setCopyNote(ok ? u.copied : u.copyFail);
    }
  };

  return (
    <div className="bw kg">
      <div className="bw-hero kg-hero">
        <img className="bw-hero-fox" src="./gegeteam-logo.webp" alt="" />
        <p className="bw-eyebrow">{u.eyebrow}</p>
        <h2>{u.title}</h2>
        <p className="bw-lede">{u.lede}</p>
      </div>

      <div className="kg-grid">
        <div className="bw-form">
          <h3 className="kg-form-title">{u.form}</h3>
          <div className="bw-field">
            <label htmlFor="kg-server">{u.server}</label>
            <select id="kg-server" className="kg-select" value={key} onChange={e => setKey(e.target.value)}>
              {regions.map(r => (
                <optgroup key={r.code} label={r.label}>
                  {r.servers.map(s => <option key={s.server} value={`${r.code}|${s.server}`}>{s.server} · {s.rate}k / M</option>)}
                </optgroup>
              ))}
            </select>
          </div>
          <div className="bw-field">
            <label htmlFor="kg-amount">{u.amount} <span className="kg-hint">({u.amountHint})</span></label>
            <div className="kg-amount">
              <input id="kg-amount" type="number" min="0" step="1" inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" />
              <span>{u.amountUnit}</span>
            </div>
          </div>
          <div className="bw-field">
            <span className="bw-flabel">{u.payout}</span>
            <div className="kg-seg">
              <button type="button" aria-pressed={currency === 'VND'} onClick={() => setCurrency('VND')}>{u.vnd}</button>
              <button type="button" aria-pressed={currency === 'USDT'} onClick={() => setCurrency('USDT')}>{u.usdt}</button>
            </div>
          </div>
          {currency === 'USDT' && (
            <div className="bw-field">
              <span className="bw-flabel">{u.network}</span>
              <div className="kg-seg">
                {(['TRC20', 'BEP20'] as const).map(nw => <button type="button" key={nw} aria-pressed={network === nw} onClick={() => setNetwork(nw)}>{nw}</button>)}
              </div>
            </div>
          )}
          <div className="kg-two">
            <div className="bw-field">
              <label htmlFor="kg-char">{u.char}</label>
              <input id="kg-char" type="text" value={char} onChange={e => setChar(e.target.value)} placeholder={u.charPh} />
            </div>
            <div className="bw-field">
              <label htmlFor="kg-contact">{u.contact}</label>
              <input id="kg-contact" type="text" value={contact} onChange={e => setContact(e.target.value)} placeholder={u.contactPh} />
            </div>
          </div>
          <div className="bw-field">
            <label htmlFor="kg-notes">{u.notes}</label>
            <textarea id="kg-notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder={u.notesPh} />
          </div>
        </div>

        <aside className="bw-panel" aria-live="polite">
          <div className="bw-op-brand">
            <img src="./gegeteam-logo.webp" alt="" />
            <div><div className="bw-op-bname">GeGe Team · {lang === 'vi' ? 'Nhà Cáo' : 'Fox House'}</div><div className="bw-op-bsub">{u.brandSub}</div></div>
          </div>
          <h3>{u.sum}</h3>
          <div className="bw-op-sum"><ul>{rows.map(([k, v], i) => <li key={i}><span>{k}</span><span>{v}</span></li>)}</ul></div>
          <div className="bw-op-total">
            <p className="t-label">{u.receive}</p>
            {m > 0 ? (
              <p>{payoutText}<small>≈ {currency === 'VND' ? `${usdt} USDT` : fmtVnd(totalVnd, lang)}</small></p>
            ) : (
              <p className="kg-empty">{u.empty}</p>
            )}
          </div>
          <p className="bw-op-pay">{u.rateLive} {u.pay}</p>
          <button type="button" className="bw-btn bw-btn-copy" onClick={copy}>{u.copy}</button>
          <a className="bw-btn bw-btn-primary" href={DISCORD} target="_blank" rel="noopener noreferrer">{u.discord}</a>
          <p className="bw-copy-note">{copyNote}</p>
        </aside>
      </div>

      <div className="kg-info">
        <section>
          <h3>{u.whoT}</h3>
          <p>{u.whoP}</p>
          <ul className="kg-dots">{u.who.map((w, i) => <li key={i}>{w}</li>)}</ul>
        </section>
        <section>
          <h3>{u.howT}</h3>
          <ol className="kg-steps">{u.steps.map(([h, p], i) => <li key={i}><h4>{h}</h4><p>{p}</p></li>)}</ol>
        </section>
        <section>
          <h3>{u.trustT}</h3>
          <ul className="kg-trust">{u.trust.map(([h, p], i) => <li key={i}><h4>{h}</h4><p>{p}</p></li>)}</ul>
        </section>
        <section className="kg-faq">
          <h3>{u.faqT}</h3>
          {u.faq.map(([q, a], i) => <details key={i}><summary>{q}</summary><p>{a}</p></details>)}
        </section>
      </div>
    </div>
  );
};
