import React from 'react';

interface BoosterSectionProps {
  boosterCategory: 'all' | 'leveling' | 'pet' | 'dungeon' | 'custom';
  setBoosterCategory: (cat: 'all' | 'leveling' | 'pet' | 'dungeon' | 'custom') => void;
}

export const BoosterSection: React.FC<BoosterSectionProps> = ({
  boosterCategory,
  setBoosterCategory,
}) => {
  return (
    <div className="modal-booster-body">
      {/* 1. THANH ĐIỀU HƯỚNG / BỘ LỌC DANH MỤC NHANH */}
      <div className="booster-cat-tabs">
        <button
          type="button"
          className={`bct-btn ${boosterCategory === 'all' ? 'active' : ''}`}
          onClick={() => setBoosterCategory('all')}
        >
          🔥 Tất Cả Dịch Vụ
        </button>
        <button
          type="button"
          className={`bct-btn ${boosterCategory === 'leveling' ? 'active' : ''}`}
          onClick={() => setBoosterCategory('leveling')}
        >
          ⚡ Combo 1-45 (GS)
        </button>
        <button
          type="button"
          className={`bct-btn ${boosterCategory === 'dungeon' ? 'active' : ''}`}
          onClick={() => setBoosterCategory('dungeon')}
        >
          ⚔️ Phó Bản & Siêu Việt
        </button>
        <button
          type="button"
          className={`bct-btn ${boosterCategory === 'pet' ? 'active' : ''}`}
          onClick={() => setBoosterCategory('pet')}
        >
          🐾 Farm & Level Pet
        </button>
        <button
          type="button"
          className={`bct-btn ${boosterCategory === 'custom' ? 'active' : ''}`}
          onClick={() => setBoosterCategory('custom')}
        >
          🛠️ Theo Yêu Cầu
        </button>
      </div>

      {/* 2. MỤC 2: COMBO CÀY CẤP 1-45 (THEO GEAR SCORE) */}
      {(boosterCategory === 'all' || boosterCategory === 'leveling') && (
        <div className="booster-group-section">
          <div className="bgs-header">
            <div className="bgs-title-wrap">
              <span className="bgs-badge-tag gold">⚡ GÓI LEVELING TRỌN GÓI</span>
              <h4>Leveling 1 - 45 (Full Quest & Gear Score)</h4>
              <p className="bgs-desc">
                Bao gồm trọn gói: <b>Full Main Quest</b> + <b>Stronghold</b> + <b>Dungeon</b> + <b>Feather Monolith Lv 30</b>
              </p>
            </div>
            <div className="bgs-notice-box">
              💬 <i>Riêng các gói cày cấp theo GS, vui lòng <b>Inbox Admin Zalo</b> để được tư vấn mốc đồ và chốt giá ưu đãi chính xác nhất!</i>
            </div>
          </div>

          <div className="booster-gs-grid">
            {/* GS 1,400 */}
            <div className="bgs-card">
              <div className="bgsc-top">
                <span className="bgsc-gs-badge">GS 1,400+</span>
                <h5>Gói Khởi Đầu Cơ Bản</h5>
                <div className="bgsc-price contact">
                  <span>💬 Inbox Admin</span>
                </div>
              </div>
              <ul className="bgsc-specs">
                <li>✓ Cày cấp từ Level 1 lên 45</li>
                <li>✓ Hoàn thành Full Main Quest</li>
                <li>✓ Stronghold + Sealed Dungeon</li>
                <li>✓ Feather Monolith đạt Lv 30</li>
                <li>✓ Đạt chuẩn Gear Score 1,400+</li>
              </ul>
              <a
                href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20b%C3%A1o%20gi%C3%A1%20g%C3%B3i%20Leveling%201-45%20%2B%20GS%201400%20AION%202"
                target="_blank"
                rel="noopener noreferrer"
                className="bgsc-action-btn"
              >
                💬 Inbox Admin Nhận Giá →
              </a>
            </div>

            {/* GS 1,800 */}
            <div className="bgs-card">
              <div className="bgsc-top">
                <span className="bgsc-gs-badge blue">GS 1,800+</span>
                <h5>Gói Chiến Binh Phó Bản</h5>
                <div className="bgsc-price contact">
                  <span>💬 Inbox Admin</span>
                </div>
              </div>
              <ul className="bgsc-specs">
                <li>✓ Cày cấp từ Level 1 lên 45</li>
                <li>✓ Hoàn thành Full Main Quest</li>
                <li>✓ Stronghold + Sealed Dungeon</li>
                <li>✓ Feather Monolith đạt Lv 30</li>
                <li>✓ Đạt chuẩn Gear Score 1,800+</li>
              </ul>
              <a
                href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20b%C3%A1o%20gi%C3%A1%20g%C3%B3i%20Leveling%201-45%20%2B%20GS%201800%20AION%202"
                target="_blank"
                rel="noopener noreferrer"
                className="bgsc-action-btn"
              >
                💬 Inbox Admin Nhận Giá →
              </a>
            </div>

            {/* GS 2,100 */}
            <div className="bgs-card highlight">
              <div className="bgsc-top">
                <span className="bgsc-gs-badge orange">GS 2,100+</span>
                <span className="bgsc-hot-tag">🔥 ĐƯỢC CHỌN NHIỀU</span>
                <h5>Gói Chinh Phạt Cao Cấp</h5>
                <div className="bgsc-price contact">
                  <span>💬 Inbox Admin</span>
                </div>
              </div>
              <ul className="bgsc-specs">
                <li>✓ Cày cấp từ Level 1 lên 45</li>
                <li>✓ Hoàn thành Full Main Quest</li>
                <li>✓ Stronghold + Sealed Dungeon</li>
                <li>✓ Feather Monolith đạt Lv 30</li>
                <li>✓ Đạt chuẩn Gear Score 2,100+</li>
                <li>✓ Đủ điều kiện đi các Dungeon Conquest</li>
              </ul>
              <a
                href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20b%C3%A1o%20gi%C3%A1%20g%C3%B3i%20Leveling%201-45%20%2B%20GS%202100%20AION%202"
                target="_blank"
                rel="noopener noreferrer"
                className="bgsc-action-btn orange"
              >
                💬 Inbox Admin Nhận Giá →
              </a>
            </div>

            {/* GS 2,500 */}
            <div className="bgs-card vip">
              <div className="bgsc-top">
                <span className="bgsc-gs-badge purple">GS 2,500+</span>
                <span className="bgsc-hot-tag purple">👑 VIP ENDGAME</span>
                <h5>Gói Thần Tốc Thượng Phẩm</h5>
                <div className="bgsc-price contact">
                  <span>💬 Inbox Admin</span>
                </div>
              </div>
              <ul className="bgsc-specs">
                <li>✓ Cày cấp từ Level 1 lên 45</li>
                <li>✓ Hoàn thành Full Main Quest</li>
                <li>✓ Stronghold + Sealed Dungeon</li>
                <li>✓ Feather Monolith đạt Lv 30</li>
                <li>✓ Gear Score siêu cấp 2,500+</li>
                <li>✓ Đủ điều kiện đi Dungeon Siêu Việt (Transcendence)</li>
              </ul>
              <a
                href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20b%C3%A1o%20gi%C3%A1%20g%C3%B3i%20Leveling%201-45%20%2B%20GS%202500%20AION%202"
                target="_blank"
                rel="noopener noreferrer"
                className="bgsc-action-btn purple"
              >
                💬 Inbox Admin Nhận Giá →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 3. MỤC 3: PHÓ BẢN CHINH PHẠT (CONQUEST) & SIÊU VIỆT (TRANSCENDENCE) */}
      {(boosterCategory === 'all' || boosterCategory === 'dungeon') && (
        <div className="booster-group-section">
          <div className="bgs-header">
            <span className="bgs-badge-tag cyan">⚔️ KÉO PHÓ BẢN (RUN DUNGEON)</span>
            <h4>Phó Bản Chinh Phạt (Conquest) & Siêu Việt (Transcendence)</h4>
            <p className="bgs-desc">Kéo slot phó bản nhanh gọn, nhận đồ Tím/Vàng, an toàn tuyệt đối</p>
          </div>

          <div className="booster-dungeon-grid">
            {/* Conquest items */}
            <div className="bd-row">
              <div className="bd-info">
                <span className="bd-tag conquest">✴️ CONQUEST</span>
                <b className="bd-title">Urugugu Canyon</b>
                <span className="bd-req">Yêu cầu GS: <b>1,400+</b></span>
              </div>
              <div className="bd-action-box">
                <span className="bd-price">25k <small>/ run</small></span>
                <a
                  href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Urugugu%20Canyon%20(25k)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bd-btn"
                >
                  Đặt Slot →
                </a>
              </div>
            </div>

            <div className="bd-row">
              <div className="bd-info">
                <span className="bd-tag conquest">✴️ CONQUEST</span>
                <b className="bd-title">Vakron Sky Island</b>
                <span className="bd-req">Yêu cầu GS: <b>1,400+</b></span>
              </div>
              <div className="bd-action-box">
                <span className="bd-price">25k <small>/ run</small></span>
                <a
                  href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Vakron%20Sky%20Island%20(25k)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bd-btn"
                >
                  Đặt Slot →
                </a>
              </div>
            </div>

            <div className="bd-row">
              <div className="bd-info">
                <span className="bd-tag conquest">✴️ CONQUEST</span>
                <b className="bd-title">Ferocious Horn Den (Normal)</b>
                <span className="bd-req">Yêu cầu GS: <b>2,100+</b></span>
              </div>
              <div className="bd-action-box">
                <span className="bd-price">25k <small>/ run</small></span>
                <a
                  href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Ferocious%20Horn%20Den%2025k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bd-btn"
                >
                  Đặt Slot →
                </a>
              </div>
            </div>

            <div className="bd-row">
              <div className="bd-info">
                <span className="bd-tag conquest">✴️ CONQUEST</span>
                <b className="bd-title">Ferocious Horn Den (Hard)</b>
                <span className="bd-req">Yêu cầu GS: <b>2,100+</b></span>
              </div>
              <div className="bd-action-box">
                <span className="bd-price orange">60k <small>/ run</small></span>
                <a
                  href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Ferocious%20Horn%20Den%2060k"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bd-btn"
                >
                  Đặt Slot →
                </a>
              </div>
            </div>

            <div className="bd-row">
              <div className="bd-info">
                <span className="bd-tag conquest">✴️ CONQUEST</span>
                <b className="bd-title">Fire Temple</b>
                <span className="bd-req">Yêu cầu GS: <b>2,100+</b></span>
              </div>
              <div className="bd-action-box">
                <span className="bd-price orange">60k <small>/ run</small></span>
                <a
                  href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Fire%20Temple%20(60k)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bd-btn"
                >
                  Đặt Slot →
                </a>
              </div>
            </div>

            {/* Transcendence items */}
            <div className="bd-row trans-row">
              <div className="bd-info">
                <span className="bd-tag trans">✴️ TRANSCENDENCE</span>
                <b className="bd-title">Deus Research Base (Stage 3)</b>
                <span className="bd-req">Yêu cầu GS: <b>2,100+</b></span>
              </div>
              <div className="bd-action-box">
                <span className="bd-price purple">70k <small>/ run</small></span>
                <a
                  href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Deus%20Research%20Base%20Stage%203%20(70k)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bd-btn purple"
                >
                  Đặt Slot →
                </a>
              </div>
            </div>

            <div className="bd-row trans-row">
              <div className="bd-info">
                <span className="bd-tag trans">✴️ TRANSCENDENCE</span>
                <b className="bd-title">Shattered Arkanis (Stage 4)</b>
                <span className="bd-req">Yêu cầu GS: <b>2,500+</b></span>
              </div>
              <div className="bd-action-box">
                <span className="bd-price purple">100k <small>/ run</small></span>
                <a
                  href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Shattered%20Arkanis%20Stage%204%20(100k)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bd-btn purple"
                >
                  Đặt Slot →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MỤC 1: LEVELING & FARM PET */}
      {(boosterCategory === 'all' || boosterCategory === 'pet') && (
        <div className="booster-group-section">
          <div className="bgs-header">
            <span className="bgs-badge-tag green">🐾 LEVELING & FARM PET</span>
            <h4>Nâng Cấp Pet & Farm Giờ</h4>
            <p className="bgs-desc">Cày cấp thú cưng, farm quái nhặt nguyên liệu và trang bị Pet</p>
          </div>

          <div className="booster-pet-grid">
            <div className="bpet-card">
              <div className="bpet-header">
                <span className="bpet-icon">🐾</span>
                <div>
                  <h5>Pet Level 0 - 3</h5>
                  <small>Nâng cấp Pet sơ cấp nhanh chóng</small>
                </div>
              </div>
              <div className="bpet-price">40k</div>
              <a
                href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20c%C3%A0y%20Pet%20level%200-3%20(40k)"
                target="_blank"
                rel="noopener noreferrer"
                className="bpet-btn"
              >
                Đặt Cày Pet →
              </a>
            </div>

            <div className="bpet-card">
              <div className="bpet-header">
                <span className="bpet-icon">⏳</span>
                <div>
                  <h5>1 Giờ Farm Pet</h5>
                  <small>Farm quái nhặt đồ, tích lũy exp Pet</small>
                </div>
              </div>
              <div className="bpet-price">80k <small>/ giờ</small></div>
              <a
                href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20thu%C3%AA%201%20hour%20farm%20Pet%20(80k)"
                target="_blank"
                rel="noopener noreferrer"
                className="bpet-btn"
              >
                Thuê Farm 1 Giờ →
              </a>
            </div>

            <div className="bpet-card highlight">
              <div className="bpet-save-badge">🔥 TIẾT KIỆM 50K</div>
              <div className="bpet-header">
                <span className="bpet-icon">🎁</span>
                <div>
                  <h5>Bundle 5 Giờ Farm Pet</h5>
                  <small>Gói farm liên tục tối ưu chi phí</small>
                </div>
              </div>
              <div className="bpet-price orange">350k <small className="strike">400k</small></div>
              <a
                href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20Bundle%205%20hours%20farm%20Pet%20(350k)"
                target="_blank"
                rel="noopener noreferrer"
                className="bpet-btn orange"
              >
                Đặt Bundle 350k →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 5. MỤC 4: DỊCH VỤ THEO YÊU CẦU (CUSTOM SERVICE) */}
      {(boosterCategory === 'all' || boosterCategory === 'custom') && (
        <div className="booster-group-section">
          <div className="bgs-header">
            <span className="bgs-badge-tag orange">🛠️ CUSTOM SERVICE</span>
            <h4>Dịch Vụ Theo Yêu Cầu</h4>
            <p className="bgs-desc">Cá nhân hóa theo nhân vật & tài khoản của bạn</p>
          </div>

          <div className="booster-custom-grid">
            <div className="bcustom-card">
              <div className="bcc-title-row">
                <span className="bcc-icon">🛡️</span>
                <div>
                  <h5>Nâng Cấp Gear Score (GS) & Lực Chiến (CP)</h5>
                  <p>Nhận chăm sóc tài khoản, tối ưu trang bị, khảm ngọc và kéo mốc GS/CP chuẩn yêu cầu đi mọi hoạt động.</p>
                </div>
              </div>
              <div className="bcc-bottom">
                <span className="bcc-price-tag">Giá: <b>Inbox Admin</b></span>
                <a
                  href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20N%C3%A2ng%20c%E1%BA%A5p%20GS%20%2F%20CP%20theo%20y%C3%AAu%20c%E1%BA%A7u"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bcustom-btn"
                >
                  💬 Nhắn Zalo Báo Giá Ngay →
                </a>
              </div>
            </div>

            <div className="bcustom-card">
              <div className="bcc-title-row">
                <span className="bcc-icon">🔨</span>
                <div>
                  <h5>Craft / Đúc Item Trang Bị Lv 102</h5>
                  <p>Chế tạo trang bị vũ khí, giáp, trang sức cao cấp Lv 102 chuẩn opt cao, phôi đẹp cho mọi hệ phái.</p>
                </div>
              </div>
              <div className="bcc-bottom">
                <span className="bcc-price-tag">Giá: <b>Inbox Admin</b></span>
                <a
                  href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20c%E1%BA%A7n%20t%C6%B0%20v%E1%BA%A5n%20Craft%20item%20trang%20b%E1%BB%8B%20Lv102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bcustom-btn"
                >
                  💬 Nhắn Zalo Báo Giá Ngay →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. LIÊN HỆ TỔNG ĐÀI ADMIN */}
      <div className="booster-contact-strip">
        <span>📞 Hotline / Zalo: <b>0936.854.505</b></span>
        <span>🎮 Discord: <b>gege_team</b></span>
        <a
          href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%20GeGe%20Team%2C%20m%C3%ACnh%20mu%E1%BB%91n%20t%C6%B0%20v%E1%BA%A5n%20d%E1%BB%8Bch%20v%E1%BB%A5%20Booster"
          target="_blank"
          rel="noopener noreferrer"
          className="bcs-link-btn"
        >
          Nhắn Zalo Nhận Tư Vấn 24/7 →
        </a>
      </div>
    </div>
  );
};
