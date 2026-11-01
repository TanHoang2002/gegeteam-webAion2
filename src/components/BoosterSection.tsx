import React from 'react';

export type BoosterCategoryType = 'dungeon' | 'pet' | 'leveling' | 'custom';

interface BoosterSectionProps {
  boosterCategory: BoosterCategoryType;
  setBoosterCategory: (cat: BoosterCategoryType) => void;
}

export const BoosterSection: React.FC<BoosterSectionProps> = ({
  boosterCategory,
  setBoosterCategory,
}) => {
  return (
    <div className="modal-booster-body unified-body">
      {/* 1. THANH CHUYỂN TAB GỌN GÀNG - CHỌN MỤC NÀO HIỆN MỤC ĐÓ */}
      <div className="booster-cat-tabs compact-tabs">
        <button
          type="button"
          className={`bct-btn ${boosterCategory === 'dungeon' ? 'active' : ''}`}
          onClick={() => setBoosterCategory('dungeon')}
        >
          ⚔️ Xã Nhựa Dungeon
        </button>
        <button
          type="button"
          className={`bct-btn ${boosterCategory === 'pet' ? 'active' : ''}`}
          onClick={() => setBoosterCategory('pet')}
        >
          🐾 Bảng Giá Pet & Q
        </button>
        <button
          type="button"
          className={`bct-btn ${boosterCategory === 'leveling' ? 'active' : ''}`}
          onClick={() => setBoosterCategory('leveling')}
        >
          ⚡ Leveling 1-45 (GS)
        </button>
        <button
          type="button"
          className={`bct-btn ${boosterCategory === 'custom' ? 'active' : ''}`}
          onClick={() => setBoosterCategory('custom')}
        >
          🛠️ Theo Yêu Cầu
        </button>
      </div>

      {/* 2. TAB 1: GIÁ XÃ NHỰA DUNGEON (PHÓ BẢN & SIÊU VIỆT) */}
      {boosterCategory === 'dungeon' && (
        <div className="booster-group-section fade-in">
          <div className="bgs-header">
            <span className="bgs-badge-tag cyan">⚔️ DUNGEON & TRANSCENDENCE</span>
            <h4>GIÁ XÃ NHỰA DUNGEON</h4>
            <p className="bgs-desc">Kéo phó bản Chinh Phạt (Conquest) & Siêu Việt (Transcendence) nhanh gọn, uy tín</p>
          </div>

          <div className="dungeon-two-cols">
            {/* CỘT 1: CONQUEST */}
            <div className="dungeon-col">
              <div className="dcol-header conquest">
                <span className="dcol-icon">⚔️</span>
                <h5>PHÓ BẢN CONQUEST</h5>
              </div>
              <div className="dcol-list">
                {/* Conquest 1 ⭐ */}
                <div className="dcol-item">
                  <div className="dcol-item-left">
                    <span className="dcol-dot conquest" />
                    <b className="dcol-name">Conquest 1 ⭐</b>
                  </div>
                  <div className="dcol-item-right">
                    <span className="dcol-price">12k <small>/ turn</small></span>
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Conquest%201%20sao%20(12k%2Fturn)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dcol-btn"
                    >
                      Đặt Run →
                    </a>
                  </div>
                </div>

                {/* Conquest 1 ⭐ Hard */}
                <div className="dcol-item highlight-row">
                  <div className="dcol-item-left">
                    <span className="dcol-dot conquest" />
                    <div>
                      <b className="dcol-name">Conquest 1 ⭐ Hard</b>
                      <span className="dcol-sub-badge orange">Độ Khó Cao</span>
                    </div>
                  </div>
                  <div className="dcol-item-right">
                    <span className="dcol-price orange">20k <small>/ turn</small></span>
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Conquest%201%20sao%20Hard%20(20k%2Fturn)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dcol-btn orange"
                    >
                      Đặt Run →
                    </a>
                  </div>
                </div>

                {/* Conquest 2 ⭐ */}
                <div className="dcol-item">
                  <div className="dcol-item-left">
                    <span className="dcol-dot conquest" />
                    <b className="dcol-name">Conquest 2 ⭐</b>
                  </div>
                  <div className="dcol-item-right">
                    <span className="dcol-price">13k <small>/ turn</small></span>
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Conquest%202%20sao%20(13k%2Fturn)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dcol-btn"
                    >
                      Đặt Run →
                    </a>
                  </div>
                </div>

                {/* Conquest 2 ⭐ Hard */}
                <div className="dcol-item highlight-row">
                  <div className="dcol-item-left">
                    <span className="dcol-dot conquest" />
                    <div>
                      <b className="dcol-name">Conquest 2 ⭐ Hard</b>
                      <span className="dcol-sub-badge orange">Độ Khó Cao</span>
                    </div>
                  </div>
                  <div className="dcol-item-right">
                    <span className="dcol-price orange">25k <small>/ turn</small></span>
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Conquest%202%20sao%20Hard%20(25k%2Fturn)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dcol-btn orange"
                    >
                      Đặt Run →
                    </a>
                  </div>
                </div>

                {/* Conquest 3 ⭐ */}
                <div className="dcol-item">
                  <div className="dcol-item-left">
                    <span className="dcol-dot conquest" />
                    <b className="dcol-name">Conquest 3 ⭐</b>
                  </div>
                  <div className="dcol-item-right">
                    <span className="dcol-price">15k <small>/ turn</small></span>
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Conquest%203%20sao%20(15k%2Fturn)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dcol-btn"
                    >
                      Đặt Run →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CỘT 2: TRANSCENDENCE */}
            <div className="dungeon-col">
              <div className="dcol-header trans">
                <span className="dcol-icon">🔥</span>
                <h5>PHÓ BẢN SIÊU VIỆT (TRANSCENDENCE)</h5>
              </div>
              <div className="dcol-list">
                {/* Transcendence 1 ⭐ */}
                <div className="dcol-item trans-item">
                  <div className="dcol-item-left">
                    <span className="dcol-dot trans" />
                    <b className="dcol-name">Transcendence 1 ⭐</b>
                  </div>
                  <div className="dcol-item-right">
                    <span className="dcol-price purple">20k <small>/ turn</small></span>
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Transcendence%201%20sao%20(20k%2Fturn)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dcol-btn purple"
                    >
                      Đặt Run →
                    </a>
                  </div>
                </div>

                {/* Transcendence 2 ⭐ */}
                <div className="dcol-item trans-item">
                  <div className="dcol-item-left">
                    <span className="dcol-dot trans" />
                    <b className="dcol-name">Transcendence 2 ⭐</b>
                  </div>
                  <div className="dcol-item-right">
                    <span className="dcol-price purple">20k <small>/ turn</small></span>
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Transcendence%202%20sao%20(20k%2Fturn)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dcol-btn purple"
                    >
                      Đặt Run →
                    </a>
                  </div>
                </div>

                {/* Transcendence 3 ⭐ */}
                <div className="dcol-item trans-item highlight-row">
                  <div className="dcol-item-left">
                    <span className="dcol-dot trans" />
                    <div>
                      <b className="dcol-name">Transcendence 3 ⭐</b>
                      <span className="dcol-sub-badge purple">Cao Cấp</span>
                    </div>
                  </div>
                  <div className="dcol-item-right">
                    <span className="dcol-price purple">25k <small>/ turn</small></span>
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Transcendence%203%20sao%20(25k%2Fturn)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dcol-btn purple"
                    >
                      Đặt Run →
                    </a>
                  </div>
                </div>

                {/* Transcendence 4 ⭐ */}
                <div className="dcol-item trans-item highlight-row">
                  <div className="dcol-item-left">
                    <span className="dcol-dot trans" />
                    <div>
                      <b className="dcol-name">Transcendence 4 ⭐</b>
                      <span className="dcol-sub-badge purple">Endgame</span>
                    </div>
                  </div>
                  <div className="dcol-item-right">
                    <span className="dcol-price purple">25k <small>/ turn</small></span>
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20run%20Transcendence%204%20sao%20(25k%2Fturn)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dcol-btn purple"
                    >
                      Đặt Run →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB 2: BẢNG GIÁ FARM PET & NHIỆM VỤ */}
      {boosterCategory === 'pet' && (
        <div className="booster-group-section fade-in">
          <div className="bgs-header">
            <span className="bgs-badge-tag green">🐾 LEVELING & FARM PET</span>
            <h4>BẢNG GIÁ FARM PET & NHIỆM VỤ</h4>
            <p className="bgs-desc">Cày cấp thú cưng, farm quái, nhặt lông Abyss & nhiệm vụ Daily chuẩn xác</p>
          </div>

          <div className="pet-table-container">
            <table className="pet-service-table">
              <thead>
                <tr>
                  <th className="th-stt">STT</th>
                  <th className="th-name">TÊN DỊCH VỤ</th>
                  <th className="th-time">THỜI GIAN</th>
                  <th className="th-price">ĐƠN GIÁ</th>
                  <th className="th-action">THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {/* 1. Farm pet /h */}
                <tr>
                  <td className="td-stt">1</td>
                  <td className="td-name">
                    <div className="name-badge-row">
                      <b>FARM PET /H</b>
                      <span className="pbadge blue">🐾 THEO GIỜ</span>
                    </div>
                    <small>Cày exp Pet theo giờ, farm bãi chuẩn</small>
                  </td>
                  <td className="td-time"><span className="time-pill">—</span></td>
                  <td className="td-price">
                    <span className="val">60.000 đ</span>
                    <small>/ giờ</small>
                  </td>
                  <td className="td-action">
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20thu%C3%AA%20Farm%20Pet%20%2F%20H%20(60.000%C4%91)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pet-table-btn"
                    >
                      Đặt Dịch Vụ →
                    </a>
                  </td>
                </tr>

                {/* 2. Nhặt lông vàng / đỏ (map chính) */}
                <tr>
                  <td className="td-stt">2</td>
                  <td className="td-name">
                    <div className="name-badge-row">
                      <b>NHẶT LÔNG VÀNG / ĐỎ (MAP CHÍNH)</b>
                      <span className="pbadge blue">🌾 MAP CHÍNH</span>
                    </div>
                    <small>Thu thập lông vàng & lông đỏ trên bản đồ chính</small>
                  </td>
                  <td className="td-time"><span className="time-pill">1 - 2h</span></td>
                  <td className="td-price">
                    <span className="val">70.000 đ</span>
                  </td>
                  <td className="td-action">
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20thu%C3%AA%20Nh%E1%BA%B7t%20L%C3%B4ng%20V%C3%A0ng%20%2F%20%C4%90%E1%BB%8F%20Map%20Ch%C3%ADnh%20(70.000%C4%91)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pet-table-btn"
                    >
                      Đặt Dịch Vụ →
                    </a>
                  </td>
                </tr>

                {/* 3. Nhặt lông Abyss */}
                <tr>
                  <td className="td-stt">3</td>
                  <td className="td-name">
                    <div className="name-badge-row">
                      <b>NHẶT LÔNG ABYSS</b>
                      <span className="pbadge blue">⚔️ ABYSS</span>
                    </div>
                    <small>Thu gom lông chiến trường Abyss an toàn, nhanh gọn</small>
                  </td>
                  <td className="td-time"><span className="time-pill">1 - 2h</span></td>
                  <td className="td-price">
                    <span className="val">80.000 đ</span>
                  </td>
                  <td className="td-action">
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20thu%C3%AA%20Nh%E1%BA%B7t%20L%C3%B4ng%20Abyss%20(80.000%C4%91)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pet-table-btn"
                    >
                      Đặt Dịch Vụ →
                    </a>
                  </td>
                </tr>

                {/* 4. Làm nhiệm vụ: Q Daily, Abyss /h */}
                <tr>
                  <td className="td-stt">4</td>
                  <td className="td-name">
                    <div className="name-badge-row">
                      <b>LÀM NHIỆM VỤ: Q DAILY, ABYSS /H</b>
                      <span className="pbadge blue">📜 Q DAILY</span>
                    </div>
                    <small>Chạy full chuỗi nhiệm vụ hằng ngày và Q chiến trường Abyss</small>
                  </td>
                  <td className="td-time"><span className="time-pill">1.5 - 2h</span></td>
                  <td className="td-price">
                    <span className="val">60.000 đ</span>
                    <small>/ giờ</small>
                  </td>
                  <td className="td-action">
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20thu%C3%AA%20L%C3%A0m%20Nhi%E1%BB%87m%20V%E1%BB%A5%20Q%20Daily%2C%20Abyss%20%2F%20H%20(60.000%C4%91)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pet-table-btn"
                    >
                      Đặt Dịch Vụ →
                    </a>
                  </td>
                </tr>

                {/* 5. Full service (1+2+3+4) */}
                <tr className="tr-highlight-vip">
                  <td className="td-stt">5</td>
                  <td className="td-name">
                    <div className="name-badge-row">
                      <b>Full service (1+2+3+4)</b>
                      <span className="pbadge gold">👑 COMBO ALL-IN-ONE</span>
                    </div>
                    <small>Trọn gói Farm Pet + Lông Map chính + Lông Abyss + Q Daily Abyss</small>
                  </td>
                  <td className="td-time"><span className="time-pill pill-gold">10 - 24h</span></td>
                  <td className="td-price">
                    <span className="val val-gold">850.000 đ</span>
                  </td>
                  <td className="td-action">
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20g%C3%B3i%20Full%20Service%20(1%2B2%2B3%2B4)%20850.000%C4%91"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pet-table-btn gold"
                    >
                      Đặt Gói 850k →
                    </a>
                  </td>
                </tr>

                {/* 6. Full 1 phe (xanh/tím) (1+2+4) */}
                <tr className="tr-highlight-save">
                  <td className="td-stt">6</td>
                  <td className="td-name">
                    <div className="name-badge-row">
                      <b>Full 1 phe (xanh/tím) (1+2+4)</b>
                      <span className="pbadge orange">⭐ TIẾT KIỆM</span>
                    </div>
                    <small>Gói chuyên biệt cho 1 phe: Farm Pet + Lông Map + Q Daily</small>
                  </td>
                  <td className="td-time"><span className="time-pill pill-orange">8 - 24h</span></td>
                  <td className="td-price">
                    <span className="val val-orange">650.000 đ</span>
                  </td>
                  <td className="td-action">
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20g%C3%B3i%20Full%201%20phe%20(xanh%2Ft%C3%ADm)%20650.000%C4%91"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pet-table-btn orange"
                    >
                      Đặt Gói 650k →
                    </a>
                  </td>
                </tr>

                {/* 7. Farm pet lv.3 (phe xanh) */}
                <tr>
                  <td className="td-stt">7</td>
                  <td className="td-name">
                    <div className="name-badge-row">
                      <b>Farm pet lv.3 (phe xanh)</b>
                      <span className="pbadge green">🐾 LEVEL 3 (XANH)</span>
                    </div>
                    <small>Cày thú cưng lên Level 3 hoàn chỉnh (Phe Xanh)</small>
                  </td>
                  <td className="td-time"><span className="time-pill">32h++</span></td>
                  <td className="td-price">
                    <span className="val val-green">2.200.000 đ</span>
                  </td>
                  <td className="td-action">
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20Farm%20Pet%20Lv.3%20Phe%20Xanh%20(2.200.000%C4%91)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pet-table-btn"
                    >
                      Đặt Cày Lv.3 →
                    </a>
                  </td>
                </tr>

                {/* 8. Farm pet lv.3 (phe tím) */}
                <tr>
                  <td className="td-stt">8</td>
                  <td className="td-name">
                    <div className="name-badge-row">
                      <b>Farm pet lv.3 (phe tím)</b>
                      <span className="pbadge purple">🐾 LEVEL 3 (TÍM)</span>
                    </div>
                    <small>Cày thú cưng lên Level 3 hoàn chỉnh (Phe Tím)</small>
                  </td>
                  <td className="td-time"><span className="time-pill">35h++</span></td>
                  <td className="td-price">
                    <span className="val val-purple">2.000.000 đ</span>
                  </td>
                  <td className="td-action">
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20%C4%91%E1%BA%B7t%20Farm%20Pet%20Lv.3%20Phe%20T%C3%ADm%20(2.000.000%C4%91)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pet-table-btn"
                    >
                      Đặt Cày Lv.3 →
                    </a>
                  </td>
                </tr>

                {/* 9. Mở hòm Hidden Cube /1key */}
                <tr>
                  <td className="td-stt">9</td>
                  <td className="td-name">
                    <div className="name-badge-row">
                      <b>Mở hòm Hidden Cube / 1 key</b>
                      <span className="pbadge cyan">🗝️ HIDDEN CUBE</span>
                    </div>
                    <small>Dịch vụ mở rương Hidden Cube theo chìa khóa</small>
                  </td>
                  <td className="td-time"><span className="time-pill">5 - 7p / key</span></td>
                  <td className="td-price">
                    <span className="val">15.000 đ</span>
                    <small>/ key</small>
                  </td>
                  <td className="td-action">
                    <a
                      href="https://zalo.me/0936854505?text=Ch%C3%A0o%20Admin%2C%20m%C3%ACnh%20mu%E1%BB%91n%20thu%C3%AA%20M%E1%BB%9F%20h%C3%B2m%20Hidden%20Cube%20(15.000%C4%91%2Fkey)"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pet-table-btn"
                    >
                      Đặt Mở Hòm →
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TAB 3: COMBO CÀY CẤP 1-45 (THEO GEAR SCORE) */}
      {boosterCategory === 'leveling' && (
        <div className="booster-group-section fade-in">
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

      {/* 5. TAB 4: DỊCH VỤ THEO YÊU CẦU (CUSTOM SERVICE) */}
      {boosterCategory === 'custom' && (
        <div className="booster-group-section fade-in">
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
