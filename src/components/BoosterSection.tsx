import React, { useMemo, useRef, useState } from 'react';
import './booster-wow.css';

/* Phần dịch vụ boosting AION 2, bố cục giống trang WoW Forever:
   cột danh mục bên trái, thẻ dịch vụ có ảnh, trang chi tiết có biểu mẫu + tóm tắt đơn.
   Khách chốt đơn qua Discord (Zalo chỉ là kênh phụ). */

export type BoosterCategoryType = 'leveling' | 'pet' | 'dungeon' | 'custom';
type Lang = 'vi' | 'en';
type Cat = BoosterCategoryType | 'all';
type L = { vi: string; en: string };

const DISCORD = 'https://discord.gg/t2fPyUPGY';
const USDT_RATE = 25800;

interface Option { id: string; label: L; vnd?: number; tag?: L }
interface Product {
  id: string;
  cat: BoosterCategoryType;
  img: string;
  hot?: boolean;
  name: L;
  bullets: L[];
  desc: L;
  gets: L[];
  time?: L;
  /* cách tính giá */
  vnd?: number; // giá một đơn vị; bỏ trống = thương lượng
  unit?: 'hour' | 'turn' | 'key' | 'order';
  options?: { label: L; list: Option[] }; // lựa chọn quyết định giá (mốc GS, phe, độ khó)
  goal?: boolean; // ô mô tả yêu cầu
}

const l = (vi: string, en: string): L => ({ vi, en });
/* Ảnh đã có sẵn trong bộ nhớ đệm thì hiện ngay, còn lại mờ dần khi tải xong */
const fadeIn = (img: HTMLImageElement | null) => { if (img && img.complete && img.naturalWidth) img.classList.add('is-loaded'); };

const PRODUCTS: Product[] = [
  {
    id: 'leveling', cat: 'leveling', img: 'duel.webp', hot: true,
    name: l('Leveling 1–45 trọn gói', 'Leveling 1–45 full package'),
    bullets: [l('Full Main Quest + Stronghold', 'Full Main Quest + Stronghold'), l('Feather Monolith Lv 30', 'Feather Monolith Lv 30'), l('Chọn mốc Gear Score 1,400 – 2,500+', 'Pick a Gear Score tier 1,400 – 2,500+')],
    desc: l('Team cày nhân vật từ cấp 1 lên 45, hoàn thành chuỗi nhiệm vụ chính, Stronghold, Sealed Dungeon và Feather Monolith Lv 30, rồi kéo trang bị lên mốc Gear Score bạn chọn.',
      'We level your character from 1 to 45, finish the main questline, Stronghold, Sealed Dungeon and Feather Monolith Lv 30, then push your gear to the Gear Score tier you pick.'),
    gets: [l('Nhân vật cấp 45, xong Full Main Quest', 'Level 45 character with the full main quest done'), l('Stronghold + Sealed Dungeon + Feather Monolith Lv 30', 'Stronghold + Sealed Dungeon + Feather Monolith Lv 30'), l('Gear Score đạt mốc đã chọn', 'Gear Score at the tier you chose'), l('Cập nhật tiến độ bằng ảnh chụp', 'Progress updates with screenshots')],
    options: {
      label: l('Chọn mốc Gear Score', 'Choose a Gear Score tier'),
      list: [
        { id: 'gs1400', label: l('GS 1,400+ · Gói Khởi Đầu Cơ Bản', 'GS 1,400+ · Starter package') },
        { id: 'gs1800', label: l('GS 1,800+ · Gói Chiến Binh Phó Bản', 'GS 1,800+ · Dungeon Warrior') },
        { id: 'gs2100', label: l('GS 2,100+ · Gói Chinh Phạt Cao Cấp', 'GS 2,100+ · Conquest Elite'), tag: l('Được chọn nhiều', 'Most popular') },
        { id: 'gs2500', label: l('GS 2,500+ · Gói Thần Tốc Thượng Phẩm', 'GS 2,500+ · Supreme Rush'), tag: l('VIP Endgame', 'VIP Endgame') },
      ],
    },
  },
  {
    id: 'pet-hour', cat: 'pet', img: 'pet.webp', vnd: 60000, unit: 'hour',
    name: l('Farm Pet theo giờ', 'Pet farming per hour'),
    bullets: [l('Cày exp Pet tại bãi chuẩn', 'Pet EXP on the best spots'), l('60.000 đ / giờ', '60,000 VND / hour'), l('Bạn chọn số giờ', 'You choose the hours')],
    desc: l('Cày kinh nghiệm cho thú cưng theo giờ tại bãi farm tốt nhất.', 'We level your pet by the hour on the best farming spots.'),
    gets: [l('Pet được cày đủ số giờ đã đặt', 'Your pet farmed for the hours you booked'), l('Toàn bộ vật phẩm rơi giữ trên tài khoản', 'All drops stay on your account'), l('Ảnh chụp trước và sau', 'Before and after screenshots')],
  },
  {
    id: 'feather-main', cat: 'pet', img: 'sky.webp', vnd: 70000, unit: 'order', time: l('1 – 2 giờ', '1 – 2 hours'),
    name: l('Nhặt lông vàng / đỏ (map chính)', 'Gold / red feathers (main map)'),
    bullets: [l('Thu thập lông vàng và lông đỏ', 'Collect gold and red feathers'), l('Trên bản đồ chính', 'Across the main map'), l('Xong trong 1 – 2 giờ', 'Done in 1 – 2 hours')],
    desc: l('Thu thập lông vàng và lông đỏ trên bản đồ chính cho nhân vật của bạn.', 'We collect gold and red feathers across the main map for your character.'),
    gets: [l('Lông vàng và đỏ trên map chính', 'Gold and red feathers from the main map'), l('Xong trong 1 – 2 giờ', 'Done in 1 – 2 hours')],
  },
  {
    id: 'feather-abyss', cat: 'pet', img: 'wings.webp', vnd: 80000, unit: 'order', time: l('1 – 2 giờ', '1 – 2 hours'),
    name: l('Nhặt lông Abyss', 'Abyss feathers'),
    bullets: [l('Thu gom lông chiến trường Abyss', 'Collect Abyss battlefield feathers'), l('An toàn, nhanh gọn', 'Safe and quick'), l('Xong trong 1 – 2 giờ', 'Done in 1 – 2 hours')],
    desc: l('Thu gom lông trong chiến trường Abyss an toàn và nhanh gọn.', 'We collect feathers in the Abyss battlefield, safely and quickly.'),
    gets: [l('Toàn bộ lông Abyss có thể nhặt', 'Every Abyss feather available'), l('Xong trong 1 – 2 giờ', 'Done in 1 – 2 hours')],
  },
  {
    id: 'daily-hour', cat: 'pet', img: 'land.webp', vnd: 60000, unit: 'hour', time: l('1,5 – 2 giờ / lượt', '1.5 – 2 hours per run'),
    name: l('Nhiệm vụ Q Daily & Abyss theo giờ', 'Daily & Abyss quests per hour'),
    bullets: [l('Full chuỗi nhiệm vụ hằng ngày', 'Full daily quest chain'), l('Q chiến trường Abyss', 'Abyss battlefield quests'), l('60.000 đ / giờ', '60,000 VND / hour')],
    desc: l('Chạy full chuỗi nhiệm vụ hằng ngày và nhiệm vụ chiến trường Abyss, tính theo giờ.', 'We run the full daily quest chain and Abyss battlefield quests, billed by the hour.'),
    gets: [l('Nhiệm vụ Daily và Abyss hoàn thành', 'Daily and Abyss quests completed'), l('Phần thưởng nhận trên tài khoản của bạn', 'Rewards claimed on your account')],
  },
  {
    id: 'full-service', cat: 'pet', img: 'clash.webp', vnd: 850000, unit: 'order', hot: true, time: l('10 – 24 giờ', '10 – 24 hours'),
    name: l('Full service (1+2+3+4)', 'Full service (1+2+3+4)'),
    bullets: [l('Farm Pet + lông map chính', 'Pet farming + main map feathers'), l('Lông Abyss + Q Daily Abyss', 'Abyss feathers + daily Abyss quests'), l('Combo trọn gói 850.000 đ', 'All-in-one combo 850,000 VND')],
    desc: l('Trọn gói Farm Pet, lông map chính, lông Abyss và nhiệm vụ Daily Abyss trong một đơn.', 'Pet farming, main map feathers, Abyss feathers and daily Abyss quests in one order.'),
    gets: [l('Farm Pet', 'Pet farming'), l('Lông vàng / đỏ map chính', 'Gold / red main map feathers'), l('Lông Abyss', 'Abyss feathers'), l('Q Daily và Abyss', 'Daily and Abyss quests')],
  },
  {
    id: 'full-faction', cat: 'pet', img: 'leveling.webp', vnd: 650000, unit: 'order', time: l('8 – 24 giờ', '8 – 24 hours'),
    name: l('Full 1 phe (1+2+4)', 'Full one faction (1+2+4)'),
    bullets: [l('Dành cho 1 phe xanh hoặc tím', 'For one faction, blue or purple'), l('Farm Pet + lông map + Q Daily', 'Pet + map feathers + daily quests'), l('Tiết kiệm: 650.000 đ', 'Saver: 650,000 VND')],
    desc: l('Gói tiết kiệm cho một phe: Farm Pet, lông map chính và nhiệm vụ Daily.', 'Saver package for one faction: pet farming, main map feathers and daily quests.'),
    gets: [l('Farm Pet', 'Pet farming'), l('Lông vàng / đỏ map chính', 'Gold / red main map feathers'), l('Q Daily', 'Daily quests')],
  },
  {
    id: 'pet-lv3', cat: 'pet', img: 'world.webp', unit: 'order',
    name: l('Farm Pet lên Lv.3', 'Pet farming to Lv.3'),
    bullets: [l('Pet đạt Level 3 hoàn chỉnh', 'Pet fully raised to Level 3'), l('Phe xanh 2.200.000 đ (32h++)', 'Blue faction 2,200,000 VND (32h+)'), l('Phe tím 2.000.000 đ (35h++)', 'Purple faction 2,000,000 VND (35h+)')],
    desc: l('Cày thú cưng lên Level 3 hoàn chỉnh. Giá và thời gian tùy phe.', 'We raise your pet to Level 3. Price and time depend on your faction.'),
    gets: [l('Pet Level 3 hoàn chỉnh', 'Pet at Level 3'), l('Cập nhật tiến độ trong suốt quá trình', 'Progress updates along the way')],
    options: {
      label: l('Chọn phe', 'Choose your faction'),
      list: [
        { id: 'blue', label: l('Phe xanh · 32h++', 'Blue faction · 32h+'), vnd: 2200000 },
        { id: 'purple', label: l('Phe tím · 35h++', 'Purple faction · 35h+'), vnd: 2000000 },
      ],
    },
  },
  {
    id: 'hidden-cube', cat: 'pet', img: 'crystal.webp', vnd: 15000, unit: 'key', time: l('5 – 7 phút / key', '5 – 7 min per key'),
    name: l('Mở hòm Hidden Cube', 'Hidden Cube opening'),
    bullets: [l('Mở rương theo chìa khóa', 'Chest opening per key'), l('15.000 đ / key', '15,000 VND / key'), l('5 – 7 phút mỗi key', '5 – 7 minutes per key')],
    desc: l('Mở rương Hidden Cube theo số chìa khóa bạn có.', 'We open Hidden Cube chests with the keys you have.'),
    gets: [l('Toàn bộ key được mở', 'Every key opened'), l('Phần thưởng giữ trên tài khoản', 'Rewards stay on your account')],
  },
  {
    id: 'conquest', cat: 'dungeon', img: 'raid.webp', unit: 'turn', hot: true,
    name: l('Phó bản Conquest', 'Conquest dungeon'),
    bullets: [l('Từ 1 ⭐ đến 3 ⭐, có chế độ Hard', '1 ⭐ to 3 ⭐, Hard mode included'), l('Từ 12k / lượt', 'From 12k VND per run'), l('Bạn chọn số lượt chạy', 'You choose the number of runs')],
    desc: l('Kéo phó bản Chinh Phạt (Conquest) nhanh gọn, uy tín. Chọn độ khó và số lượt.', 'Fast, reliable Conquest dungeon carries. Pick the difficulty and number of runs.'),
    gets: [l('Số lượt Conquest đã đặt', 'The Conquest runs you booked'), l('Phần thưởng phó bản trên tài khoản', 'Dungeon rewards on your account')],
    options: {
      label: l('Chọn độ khó', 'Choose difficulty'),
      list: [
        { id: 'c1', label: l('Conquest 1 ⭐', 'Conquest 1 ⭐'), vnd: 12000 },
        { id: 'c1h', label: l('Conquest 1 ⭐ Hard', 'Conquest 1 ⭐ Hard'), vnd: 20000 },
        { id: 'c2', label: l('Conquest 2 ⭐', 'Conquest 2 ⭐'), vnd: 13000 },
        { id: 'c2h', label: l('Conquest 2 ⭐ Hard', 'Conquest 2 ⭐ Hard'), vnd: 25000 },
        { id: 'c3', label: l('Conquest 3 ⭐', 'Conquest 3 ⭐'), vnd: 15000 },
      ],
    },
  },
  {
    id: 'transcendence', cat: 'dungeon', img: 'fire.webp', unit: 'turn',
    name: l('Phó bản Siêu Việt (Transcendence)', 'Transcendence dungeon'),
    bullets: [l('Từ 1 ⭐ đến 4 ⭐ Endgame', '1 ⭐ to 4 ⭐ Endgame'), l('Từ 20k / lượt', 'From 20k VND per run'), l('Bạn chọn số lượt chạy', 'You choose the number of runs')],
    desc: l('Kéo phó bản Siêu Việt (Transcendence) đến cấp Endgame. Chọn độ khó và số lượt.', 'Transcendence dungeon carries up to Endgame. Pick the difficulty and number of runs.'),
    gets: [l('Số lượt Transcendence đã đặt', 'The Transcendence runs you booked'), l('Phần thưởng phó bản trên tài khoản', 'Dungeon rewards on your account')],
    options: {
      label: l('Chọn độ khó', 'Choose difficulty'),
      list: [
        { id: 't1', label: l('Transcendence 1 ⭐', 'Transcendence 1 ⭐'), vnd: 20000 },
        { id: 't2', label: l('Transcendence 2 ⭐', 'Transcendence 2 ⭐'), vnd: 20000 },
        { id: 't3', label: l('Transcendence 3 ⭐ · Cao cấp', 'Transcendence 3 ⭐ · Advanced'), vnd: 25000 },
        { id: 't4', label: l('Transcendence 4 ⭐ · Endgame', 'Transcendence 4 ⭐ · Endgame'), vnd: 25000 },
      ],
    },
  },
  {
    id: 'gs-cp', cat: 'custom', img: 'duo.webp', goal: true,
    name: l('Nâng Gear Score & Lực chiến', 'Gear Score & Combat Power boost'),
    bullets: [l('Tối ưu trang bị, khảm ngọc', 'Gear optimisation and socketing'), l('Kéo mốc GS / CP theo yêu cầu', 'Reach the GS / CP you need'), l('Chăm sóc tài khoản', 'Account care')],
    desc: l('Nhận chăm sóc tài khoản, tối ưu trang bị, khảm ngọc và kéo mốc GS / CP đúng yêu cầu để đi mọi hoạt động.', 'We take care of your account, optimise gear, socket stones and push GS / CP to the level you need for any content.'),
    gets: [l('Mốc GS / CP theo yêu cầu', 'The GS / CP you asked for'), l('Trang bị được tối ưu', 'Optimised gear'), l('Cập nhật bằng ảnh chụp', 'Updates with screenshots')],
  },
  {
    id: 'craft', cat: 'custom', img: 'outfits.webp', goal: true,
    name: l('Craft / đúc trang bị Lv 102', 'Lv 102 gear crafting'),
    bullets: [l('Vũ khí, giáp, trang sức Lv 102', 'Lv 102 weapons, armour, accessories'), l('Opt cao, phôi đẹp', 'High rolls, clean bases'), l('Mọi hệ phái', 'Every class')],
    desc: l('Chế tạo vũ khí, giáp và trang sức cao cấp Lv 102 với opt cao, phôi đẹp cho mọi hệ phái.', 'We craft high-end Lv 102 weapons, armour and accessories with high rolls for every class.'),
    gets: [l('Trang bị Lv 102 theo yêu cầu', 'Lv 102 gear as requested'), l('Báo giá trước khi chế tạo', 'Quote before crafting')],
  },
  {
    id: 'custom', cat: 'custom', img: 'custom.webp', goal: true,
    name: l('Đơn theo yêu cầu', 'Custom order'),
    bullets: [l('Mọi thứ chưa có trong danh sách', 'Anything not on the list'), l('Mô tả mục tiêu của bạn', 'Describe your goal'), l('Lên kế hoạch cùng team', 'Plan it with the team')],
    desc: l('Có ý tưởng khác? Mô tả mục tiêu, team sẽ trao đổi và lên kế hoạch cùng bạn.', 'Have something else in mind? Describe it and we will plan it with you.'),
    gets: [l('Kế hoạch theo yêu cầu của bạn', 'A plan built around your request'), l('Chốt giá rõ ràng trước khi bắt đầu', 'Clear price agreed before we start'), l('Theo dõi tiến độ từng bước', 'Progress updates at every step')],
  },
];

const CATS: { id: BoosterCategoryType; label: L }[] = [
  { id: 'leveling', label: l('Cày cấp', 'Leveling') },
  { id: 'pet', label: l('Pet & nhiệm vụ', 'Pets & quests') },
  { id: 'dungeon', label: l('Dungeon', 'Dungeons') },
  { id: 'custom', label: l('Theo yêu cầu', 'Custom') },
];

const UI = {
  vi: {
    eyebrow: 'Dịch vụ GeGe Team · Nhà Cáo', title: 'Boosting & cày thuê AION 2',
    lede: 'Leveling 1–45, farm Pet, nhặt lông, kéo phó bản Conquest và Transcendence, nâng GS theo yêu cầu. Chọn dịch vụ để xem giá, điền thông tin rồi gửi tóm tắt đơn cho team qua Discord.',
    side: 'AION 2', all: 'Tất cả', ask: 'Đặt câu hỏi', search: 'Tìm dịch vụ boosting...', top: 'Ưu đãi nổi bật', results: 'Kết quả tìm kiếm',
    none: 'Không tìm thấy dịch vụ. Thử từ khóa khác hoặc chọn danh mục.', price: 'Giá', neg: 'Thương lượng', order: 'Đặt đơn', from: 'Từ',
    back: 'Tất cả dịch vụ', desc: 'Mô tả', gets: 'Bạn sẽ nhận được', flex: 'Linh hoạt', flexD: 'Thời gian hoàn thành dự kiến — xác nhận với team trên Discord trước khi đơn bắt đầu.', time: 'Thời gian',
    server: 'Máy chủ', serverPh: 'Ví dụ: Ariel, Azphel...', char: 'Tên nhân vật (không bắt buộc)', charPh: 'Để team tìm đúng nhân vật', goal: 'Mô tả yêu cầu', goalPh: 'Nhân vật hiện tại thế nào và bạn muốn đạt điều gì...',
    notes: 'Ghi chú (không bắt buộc)', notesPh: 'Giờ chơi, điều cần tránh, bất cứ điều gì team nên biết...',
    sum: 'Tóm tắt đơn hàng', svc: 'Dịch vụ', opt: 'Lựa chọn', total: 'Tổng cộng', totalNeg: 'Liên hệ chúng tôi trên Discord để xác nhận giá cuối cùng',
    pay: 'Thanh toán bằng VNĐ hoặc USDT. Thông tin thanh toán gửi trong Discord sau khi chốt đơn; trang web không nhận tiền.',
    copy: 'Sao chép tóm tắt đơn', discord: 'Liên hệ Discord để đặt đơn', copied: 'Đã sao chép! Dán vào Discord để đặt đơn.', copyFail: 'Không sao chép được, hãy bôi đen và sao chép thủ công.',
    unit: { hour: 'Số giờ', turn: 'Số lượt', key: 'Số key', order: 'Số đơn' }, per: { hour: 'giờ', turn: 'lượt', key: 'key', order: 'đơn' },
    head: 'GeGe Team — đơn AION 2', brandSub: 'AION 2 Boosting',
  },
  en: {
    eyebrow: 'GeGe Team · Fox House services', title: 'AION 2 boosting services',
    lede: 'Leveling 1–45, pet farming, feather collecting, Conquest and Transcendence carries, and Gear Score boosts on request. Pick a service to see the price, fill in your details and send the order summary to the team on Discord.',
    side: 'AION 2', all: 'All', ask: 'Ask a question', search: 'Search boosting services...', top: 'Top offers', results: 'Search results',
    none: 'No services found. Try another word or pick a category.', price: 'Price', neg: 'Negotiable', order: 'Order', from: 'From',
    back: 'All services', desc: 'Description', gets: "What you'll get", flex: 'Flexible', flexD: 'Estimated completion time — confirmed with the team on Discord before the order starts.', time: 'Time',
    server: 'Server', serverPh: 'e.g. Ariel, Azphel...', char: 'Character name (optional)', charPh: 'So the team finds the right character', goal: 'Describe your request', goalPh: 'Where your character is now and what you want to reach...',
    notes: 'Notes (optional)', notesPh: 'Play times, things to avoid, anything we should know...',
    sum: 'Order summary', svc: 'Service', opt: 'Option', total: 'Total', totalNeg: 'Contact us on Discord to confirm the final price',
    pay: 'Pay in VND or USDT. Payment details are shared on Discord after the order is confirmed; this site never takes payments.',
    copy: 'Copy order summary', discord: 'Contact Discord to place order', copied: 'Copied! Paste it into Discord to place your order.', copyFail: "Couldn't copy. Select the summary text manually.",
    unit: { hour: 'Hours', turn: 'Runs', key: 'Keys', order: 'Orders' }, per: { hour: 'hour', turn: 'run', key: 'key', order: 'order' },
    head: 'GeGe Team — AION 2 order', brandSub: 'AION 2 Boosting',
  },
};

const fmtVnd = (n: number, lang: Lang) => (lang === 'vi' ? n.toLocaleString('vi-VN') + ' đ' : n.toLocaleString('en-US') + ' VND');
const fmtUsdt = (n: number) => (n / USDT_RATE).toFixed(2) + ' USDT';
const minPrice = (p: Product) => p.vnd ?? (p.options && p.options.list.some(o => o.vnd) ? Math.min(...p.options.list.map(o => o.vnd || Infinity)) : undefined);

interface BoosterSectionProps {
  boosterCategory?: BoosterCategoryType;
  setBoosterCategory?: (cat: BoosterCategoryType) => void;
  lang?: Lang;
}

export const BoosterSection: React.FC<BoosterSectionProps> = ({ lang = 'vi' }) => {
  const u = UI[lang];
  const tr = (x: L) => x[lang];
  const rootRef = useRef<HTMLDivElement>(null);
  const [cat, setCat] = useState<Cat>('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const scrollTop = () => rootRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const mainRef = useRef<HTMLDivElement>(null);
  /* Đổi danh mục: nếu đầu lưới thẻ đã bị cuộn qua thì cuộn mượt về đầu lưới (trừ thanh danh mục dính trên điện thoại) */
  const pickCat = (c: Cat) => {
    setCat(c); setQuery('');
    requestAnimationFrame(() => {
      const el = (rootRef.current?.querySelector('.bw-view') as HTMLElement | null) || mainRef.current; if (!el) return;
      const bar = window.innerWidth <= 960 ? 70 : 16;
      const top = el.getBoundingClientRect().top;
      if (top < bar) window.scrollTo({ top: window.scrollY + top - bar, behavior: 'smooth' });
    });
  };
  const open = (id: string) => { setOpenId(id); requestAnimationFrame(scrollTop); };
  const close = () => { setOpenId(null); requestAnimationFrame(scrollTop); };

  const priceText = (p: Product) => {
    const m = minPrice(p);
    if (m === undefined) return u.neg;
    const one = !p.options || p.options.list.every(o => o.vnd === m);
    const per = p.unit && p.unit !== 'order' ? ' / ' + u.per[p.unit] : '';
    return (one ? '' : u.from + ' ') + fmtVnd(m, lang) + per;
  };

  const card = (p: Product, i: number) => (
    <button type="button" key={p.id} className="bw-card" onClick={() => open(p.id)}>
      <div className="bw-art-wrap">
        <img className="bw-art" src={`./boost/${p.img}`} alt="" loading="lazy" decoding="async" ref={fadeIn} onLoad={e => e.currentTarget.classList.add('is-loaded')} />
        <h3>{tr(p.name)}</h3>
      </div>
      <div className="bw-cbody">
        <ul>{p.bullets.map((b, i) => <li key={i}>{tr(b)}</li>)}</ul>
        <div className="bw-cfoot">
          <span className="bw-price"><small>{u.price}</small><b>{priceText(p)}</b></span>
          <span className="bw-order-btn">{u.order}</span>
        </div>
      </div>
    </button>
  );

  const q = query.trim().toLowerCase();
  const results = useMemo(
    () => (q ? PRODUCTS.filter(p => [p.name, ...p.bullets, p.desc].some(x => x.vi.toLowerCase().includes(q) || x.en.toLowerCase().includes(q))) : []),
    [q],
  );

  const product = PRODUCTS.find(p => p.id === openId);

  return (
    <div className="bw" ref={rootRef}>
      {product ? (
        <Detail key={product.id} p={product} lang={lang} onBack={close} />
      ) : (
        <div className="bw-layout">
          <aside className="bw-sidebar">
            <p className="bw-side-label"><img src="./gegeteam-logo.webp" alt="" width={22} height={22} /><span>{u.side}</span></p>
            <div className="bw-side-list" role="group" aria-label="Categories">
              {CATS.map(c => (
                <button type="button" key={c.id} aria-pressed={cat === c.id} onClick={() => pickCat(c.id)}>
                  {tr(c.label)}<span className="cnt">{PRODUCTS.filter(p => p.cat === c.id).length}</span>
                </button>
              ))}
              <button type="button" aria-pressed={cat === 'all'} onClick={() => pickCat('all')}>
                {u.all}<span className="cnt">{PRODUCTS.length}</span>
              </button>
            </div>
            <a className="bw-ask" href={DISCORD} target="_blank" rel="noopener noreferrer">
              <span className="bw-ask-mail" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6.5 8.5 6.5 8.5-6.5" /></svg></span>
              <span className="bw-ask-line">{u.ask}</span>
              <svg className="bw-ask-pen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M17 3.5a2.1 2.1 0 0 1 3 3L8 18.5l-4 1 1-4Z" /><path d="m15 5.5 3 3" /></svg>
            </a>
          </aside>

          <div className="bw-main" ref={mainRef}>
            <div className="bw-hero">
              <img className="bw-hero-fox" src="./gegeteam-logo.webp" alt="" />
              <p className="bw-eyebrow">{u.eyebrow}</p>
              <h2>{u.title}</h2>
              <p className="bw-lede">{u.lede}</p>
              <div className="bw-search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
                <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder={u.search} aria-label={u.search} />
              </div>
            </div>

            <div className="bw-view" key={q ? 'q' : cat}>
            {q ? (
              <section className="bw-cat-section">
                <h3 className="bw-sec-title"><img src="./gegeteam-logo.webp" alt="" />{u.results}</h3>
                {results.length ? <div className="bw-grid">{results.map(card)}</div> : <p className="bw-none">{u.none}</p>}
              </section>
            ) : cat === 'all' ? (
              <>
                <section className="bw-cat-section bw-top">
                  <h3 className="bw-sec-title"><img src="./gegeteam-logo.webp" alt="" />{u.top}</h3>
                  <div className="bw-grid">{PRODUCTS.filter(p => p.hot).map(card)}</div>
                </section>
                {CATS.map(c => (
                  <section className="bw-cat-section" key={c.id}>
                    <h3 className="bw-sec-title"><img src="./gegeteam-logo.webp" alt="" />{tr(c.label)}</h3>
                    <div className="bw-grid">{PRODUCTS.filter(p => p.cat === c.id).map(card)}</div>
                  </section>
                ))}
              </>
            ) : (
              <section className="bw-cat-section">
                <h3 className="bw-sec-title"><img src="./gegeteam-logo.webp" alt="" />{tr(CATS.find(c => c.id === cat)!.label)}</h3>
                <div className="bw-grid">{PRODUCTS.filter(p => p.cat === cat).map(card)}</div>
              </section>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ---------------- Trang chi tiết dịch vụ ---------------- */
const Detail: React.FC<{ p: Product; lang: Lang; onBack: () => void }> = ({ p, lang, onBack }) => {
  const u = UI[lang];
  const tr = (x: L) => x[lang];
  const [optId, setOptId] = useState(p.options ? p.options.list[0].id : '');
  const [qty, setQty] = useState(1);
  const [server, setServer] = useState('');
  const [char, setChar] = useState('');
  const [goal, setGoal] = useState('');
  const [notes, setNotes] = useState('');
  const [copyNote, setCopyNote] = useState('');

  const opt = p.options?.list.find(o => o.id === optId);
  const unitPrice = opt?.vnd ?? p.vnd;
  const total = unitPrice !== undefined ? unitPrice * qty : undefined;
  const showQty = !!p.unit;
  const maxQty = p.unit === 'key' ? 200 : 99;
  const catLabel = tr(CATS.find(c => c.id === p.cat)!.label);

  const rows: [string, string][] = [[u.svc, tr(p.name)]];
  if (opt) rows.push([u.opt, tr(opt.label)]);
  if (showQty) rows.push([u.unit[p.unit!], String(qty)]);
  if (server.trim()) rows.push([u.server, server.trim()]);
  if (char.trim()) rows.push([u.char.replace(/ \(.*\)$/, ''), char.trim()]);
  if (goal.trim()) rows.push([u.goal, goal.trim()]);
  if (notes.trim()) rows.push([u.notes.replace(/ \(.*\)$/, ''), notes.trim()]);

  const summaryText = () => {
    const lines = [u.head, ...rows.map(([k, v]) => `${k}: ${v}`)];
    lines.push(`${u.total}: ${total !== undefined ? fmtVnd(total, lang) + ' (≈ ' + fmtUsdt(total) + ')' : u.neg}`);
    return lines.join('\n');
  };

  const copy = async () => {
    const text = summaryText();
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
    <div className="bw-detail">
      <div className="bw-crumbs">
        <button type="button" className="bw-back" onClick={onBack}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          <span>{u.back}</span>
        </button>
        <span className="bw-crumb-path">GeGe Team / AION 2 / <b>{catLabel}</b> / <b>{tr(p.name)}</b></span>
      </div>
      <h2 className="bw-detail-title">{tr(p.name)}</h2>

      <div className="bw-detail-grid">
        <div className="bw-dcol">
          <div className="bw-banner">
            <img className="bw-art" src={`./boost/${p.img}`} alt="" decoding="async" ref={fadeIn} onLoad={e => e.currentTarget.classList.add('is-loaded')} />
            <div className="bw-tags">{p.bullets.map((b, i) => <span key={i}>{tr(b)}</span>)}</div>
          </div>
          <div className="bw-flex">
            <b>{p.time ? u.time + ': ' + tr(p.time) : u.flex}</b>
            <span>{u.flexD}</span>
          </div>
          <h3>{u.desc}</h3>
          <p className="bw-desc">{tr(p.desc)}</p>
          <h3>{u.gets}</h3>
          <ul className="bw-get">{p.gets.map((g, i) => <li key={i}><span className="n">{i + 1}</span><span>{tr(g)}</span></li>)}</ul>
        </div>

        <div className="bw-form">
          {p.options && (
            <div className="bw-field">
              <span className="bw-flabel">{tr(p.options.label)}</span>
              <div className="bw-checks" role="radiogroup">
                {p.options.list.map(o => (
                  <button type="button" key={o.id} role="radio" aria-checked={o.id === optId} className="bw-radio-row" onClick={() => setOptId(o.id)}>
                    <span className="bw-dot" />
                    <span className="bw-rlabel">{tr(o.label)}{o.tag && <em>{tr(o.tag)}</em>}</span>
                    {o.vnd !== undefined && <span className="bw-rprice">{fmtVnd(o.vnd, lang)}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="bw-field">
            <label htmlFor="bw-server">{u.server}</label>
            <input id="bw-server" type="text" value={server} onChange={e => setServer(e.target.value)} placeholder={u.serverPh} />
          </div>
          <div className="bw-field">
            <label htmlFor="bw-char">{u.char}</label>
            <input id="bw-char" type="text" value={char} onChange={e => setChar(e.target.value)} placeholder={u.charPh} />
          </div>
          {p.goal && (
            <div className="bw-field">
              <label htmlFor="bw-goal">{u.goal}</label>
              <textarea id="bw-goal" value={goal} onChange={e => setGoal(e.target.value)} placeholder={u.goalPh} />
            </div>
          )}
          <div className="bw-field">
            <label htmlFor="bw-notes">{u.notes}</label>
            <textarea id="bw-notes" value={notes} onChange={e => setNotes(e.target.value)} placeholder={u.notesPh} />
          </div>
        </div>

        <aside className="bw-panel" aria-live="polite">
          <div className="bw-op-brand">
            <img src="./gegeteam-logo.webp" alt="" />
            <div><div className="bw-op-bname">GeGe Team · {lang === 'vi' ? 'Nhà Cáo' : 'Fox House'}</div><div className="bw-op-bsub">{u.brandSub}</div></div>
          </div>
          <h3>{u.sum}</h3>
          {showQty && (
            <>
              <p className="bw-op-label">{u.unit[p.unit!]}</p>
              <div className="bw-stepper">
                <button type="button" aria-label="-" disabled={qty <= 1} onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                <span className="val">{qty}</span>
                <button type="button" aria-label="+" disabled={qty >= maxQty} onClick={() => setQty(q => Math.min(maxQty, q + 1))}>+</button>
              </div>
            </>
          )}
          <div className="bw-op-sum">
            <ul>{rows.map(([k, v], i) => <li key={i}><span>{k}</span><span>{v}</span></li>)}</ul>
          </div>
          <div className="bw-op-total">
            <p className="t-label">{u.total}</p>
            {total !== undefined ? (
              <p>{fmtVnd(total, lang)}<small>≈ {fmtUsdt(total)}{unitPrice !== undefined && showQty && qty > 1 ? ` · ${fmtVnd(unitPrice, lang)} × ${qty}` : ''}</small></p>
            ) : (
              <p>{u.totalNeg}</p>
            )}
          </div>
          <p className="bw-op-pay">{u.pay}</p>
          <button type="button" className="bw-btn bw-btn-copy" onClick={copy}>{u.copy}</button>
          <a className="bw-btn bw-btn-primary" href={DISCORD} target="_blank" rel="noopener noreferrer">{u.discord}</a>
          <p className="bw-copy-note">{copyNote}</p>
        </aside>
      </div>
    </div>
  );
};
