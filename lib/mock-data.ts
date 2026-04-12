import type {
  Artist,
  Product,
  Account,
  Order,
  OrderItem,
  Shipment,
  Payment,
  ActivityEvent,
  AccountBalance,
  Currency,
  ShippingAddress,
} from './types';

// =============================================================================
// FX Rates
// =============================================================================

export const fxRates: Record<Currency, number> = {
  USD: 1350.5,
  EUR: 1452.3,
  RUB: 14.85,
  KRW: 1,
};

export function krwEquivalent(amount: number, currency: Currency): number {
  return amount * fxRates[currency];
}

// =============================================================================
// Artists (4)
// =============================================================================

export const artists: Artist[] = [
  { id: 'ART-001', name: 'ATEZ', memberCount: 5 },
  { id: 'ART-002', name: 'LUVSTAR', memberCount: 6 },
  { id: 'ART-003', name: 'NOVA9', memberCount: 9 },
  { id: 'ART-004', name: 'HALO', memberCount: 4 },
];

// =============================================================================
// Products (40) — ~10 per artist
// =============================================================================

export const products: Product[] = [
  // --- ATEZ (10) ---
  { id: 'P-ATEZ-001', artistId: 'ART-001', category: '앨범', name: 'ATEZ 1st Album "DAWN" (Standard)', weightG: 450, priceKRW: 18000 },
  { id: 'P-ATEZ-002', artistId: 'ART-001', category: '앨범', name: 'ATEZ 1st Album "DAWN" (Limited)', weightG: 520, priceKRW: 32000 },
  { id: 'P-ATEZ-003', artistId: 'ART-001', category: '앨범', name: 'ATEZ 2nd Album "RISE" (Standard)', weightG: 400, priceKRW: 17000 },
  { id: 'P-ATEZ-004', artistId: 'ART-001', category: '앨범', name: 'ATEZ 2nd Album "RISE" (Fan-club)', weightG: 600, priceKRW: 45000 },
  { id: 'P-ATEZ-005', artistId: 'ART-001', category: '포토카드', name: 'ATEZ 민수 포토카드 세트', weightG: 15, priceKRW: 5000 },
  { id: 'P-ATEZ-006', artistId: 'ART-001', category: '포토카드', name: 'ATEZ 재윤 포토카드 세트', weightG: 15, priceKRW: 5000 },
  { id: 'P-ATEZ-007', artistId: 'ART-001', category: '포토카드', name: 'ATEZ 단체 포토카드 세트', weightG: 25, priceKRW: 8000 },
  { id: 'P-ATEZ-008', artistId: 'ART-001', category: '굿즈', name: 'ATEZ 공식 라이트스틱', weightG: 350, priceKRW: 28000 },
  { id: 'P-ATEZ-009', artistId: 'ART-001', category: '굿즈', name: 'ATEZ 키링 세트', weightG: 80, priceKRW: 12000 },
  { id: 'P-ATEZ-010', artistId: 'ART-001', category: '굿즈', name: 'ATEZ 포스터 세트', weightG: 120, priceKRW: 15000 },
  // --- LUVSTAR (10) ---
  { id: 'P-LUVSTAR-001', artistId: 'ART-002', category: '앨범', name: 'LUVSTAR 1st Mini "SPARKLE" (Standard)', weightG: 380, priceKRW: 16000 },
  { id: 'P-LUVSTAR-002', artistId: 'ART-002', category: '앨범', name: 'LUVSTAR 1st Mini "SPARKLE" (Limited)', weightG: 450, priceKRW: 28000 },
  { id: 'P-LUVSTAR-003', artistId: 'ART-002', category: '앨범', name: 'LUVSTAR 2nd Mini "GLOW" (Standard)', weightG: 400, priceKRW: 17000 },
  { id: 'P-LUVSTAR-004', artistId: 'ART-002', category: '앨범', name: 'LUVSTAR 2nd Mini "GLOW" (Fan-club)', weightG: 550, priceKRW: 42000 },
  { id: 'P-LUVSTAR-005', artistId: 'ART-002', category: '포토카드', name: 'LUVSTAR 하은 포토카드 세트', weightG: 12, priceKRW: 4500 },
  { id: 'P-LUVSTAR-006', artistId: 'ART-002', category: '포토카드', name: 'LUVSTAR 유진 포토카드 세트', weightG: 12, priceKRW: 4500 },
  { id: 'P-LUVSTAR-007', artistId: 'ART-002', category: '포토카드', name: 'LUVSTAR 단체 포토카드 세트', weightG: 28, priceKRW: 7500 },
  { id: 'P-LUVSTAR-008', artistId: 'ART-002', category: '굿즈', name: 'LUVSTAR 공식 라이트스틱', weightG: 320, priceKRW: 26000 },
  { id: 'P-LUVSTAR-009', artistId: 'ART-002', category: '굿즈', name: 'LUVSTAR 슬로건 타올', weightG: 200, priceKRW: 18000 },
  { id: 'P-LUVSTAR-010', artistId: 'ART-002', category: '굿즈', name: 'LUVSTAR 에코백', weightG: 150, priceKRW: 14000 },
  // --- NOVA9 (10) ---
  { id: 'P-NOVA9-001', artistId: 'ART-003', category: '앨범', name: 'NOVA9 1st Album "ORBIT" (Standard)', weightG: 480, priceKRW: 19000 },
  { id: 'P-NOVA9-002', artistId: 'ART-003', category: '앨범', name: 'NOVA9 1st Album "ORBIT" (Limited)', weightG: 550, priceKRW: 35000 },
  { id: 'P-NOVA9-003', artistId: 'ART-003', category: '앨범', name: 'NOVA9 2nd Album "COMET" (Standard)', weightG: 420, priceKRW: 18000 },
  { id: 'P-NOVA9-004', artistId: 'ART-003', category: '앨범', name: 'NOVA9 2nd Album "COMET" (Fan-club)', weightG: 580, priceKRW: 43000 },
  { id: 'P-NOVA9-005', artistId: 'ART-003', category: '포토카드', name: 'NOVA9 태현 포토카드 세트', weightG: 18, priceKRW: 5500 },
  { id: 'P-NOVA9-006', artistId: 'ART-003', category: '포토카드', name: 'NOVA9 준호 포토카드 세트', weightG: 18, priceKRW: 5500 },
  { id: 'P-NOVA9-007', artistId: 'ART-003', category: '포토카드', name: 'NOVA9 단체 포토카드 세트', weightG: 30, priceKRW: 8000 },
  { id: 'P-NOVA9-008', artistId: 'ART-003', category: '굿즈', name: 'NOVA9 공식 라이트스틱', weightG: 380, priceKRW: 30000 },
  { id: 'P-NOVA9-009', artistId: 'ART-003', category: '굿즈', name: 'NOVA9 포스터 세트', weightG: 130, priceKRW: 16000 },
  { id: 'P-NOVA9-010', artistId: 'ART-003', category: '굿즈', name: 'NOVA9 머플러 타올', weightG: 250, priceKRW: 22000 },
  // --- HALO (10) ---
  { id: 'P-HALO-001', artistId: 'ART-004', category: '앨범', name: 'HALO 1st Single "ECHO" (Standard)', weightG: 320, priceKRW: 15000 },
  { id: 'P-HALO-002', artistId: 'ART-004', category: '앨범', name: 'HALO 1st Single "ECHO" (Limited)', weightG: 400, priceKRW: 27000 },
  { id: 'P-HALO-003', artistId: 'ART-004', category: '앨범', name: 'HALO 1st Album "AURORA" (Standard)', weightG: 460, priceKRW: 18500 },
  { id: 'P-HALO-004', artistId: 'ART-004', category: '앨범', name: 'HALO 1st Album "AURORA" (Fan-club)', weightG: 530, priceKRW: 40000 },
  { id: 'P-HALO-005', artistId: 'ART-004', category: '포토카드', name: 'HALO 서연 포토카드 세트', weightG: 10, priceKRW: 3500 },
  { id: 'P-HALO-006', artistId: 'ART-004', category: '포토카드', name: 'HALO 지우 포토카드 세트', weightG: 10, priceKRW: 3500 },
  { id: 'P-HALO-007', artistId: 'ART-004', category: '포토카드', name: 'HALO 단체 포토카드 세트', weightG: 20, priceKRW: 6000 },
  { id: 'P-HALO-008', artistId: 'ART-004', category: '굿즈', name: 'HALO 공식 라이트스틱', weightG: 300, priceKRW: 25000 },
  { id: 'P-HALO-009', artistId: 'ART-004', category: '굿즈', name: 'HALO 키링', weightG: 50, priceKRW: 10000 },
  { id: 'P-HALO-010', artistId: 'ART-004', category: '굿즈', name: 'HALO 부채 세트', weightG: 70, priceKRW: 11000 },
];

// =============================================================================
// Shipping Addresses (~30 total)
// =============================================================================

const addr = (id: string, label: string, country: string, fullAddress: string, isPrimary: boolean, defaultIncoterm?: 'EXW' | 'FOB' | 'CIF' | 'DDP' | 'DAP'): ShippingAddress => ({
  id, label, country, fullAddress, isPrimary, defaultIncoterm,
});

const addressesForAccount: Record<string, ShippingAddress[]> = {
  'ACC-001': [addr('ADDR-001', '본사 창고', 'JP', '東京都渋谷区代々木1-2-3', true, 'FOB')],
  'ACC-002': [addr('ADDR-002', '본사', 'US', '1234 Wilshire Blvd, Los Angeles, CA 90017', true, 'CIF')],
  'ACC-003': [addr('ADDR-003', '메인 오피스', 'TH', '123 Sukhumvit Rd, Bangkok 10110', true, 'EXW')],
  'ACC-004': [addr('ADDR-004', '오사카 지점', 'JP', '大阪市中央区本町3-4-5', true, 'FOB')],
  'ACC-005': [addr('ADDR-005', '도쿄 본사', 'JP', '東京都新宿区新宿2-3-4', true, 'FOB')],
  'ACC-006': [
    addr('ADDR-006A', '본사 (도쿄)', 'JP', '東京都品川区大崎1-11-2', true, 'FOB'),
    addr('ADDR-006B', '창고 (오사카)', 'JP', '大阪市西区新町2-4-6', false, 'EXW'),
    addr('ADDR-006C', '보세창고', 'KR', '인천광역시 중구 운서동 123', false, 'DDP'),
  ],
  'ACC-007': [
    addr('ADDR-007A', 'HQ Jakarta', 'ID', 'Jl. Sudirman No.45, Jakarta 12190', true, 'CIF'),
    addr('ADDR-007B', '수라바야 창고', 'ID', 'Jl. Raya Darmo No.78, Surabaya 60241', false, 'FOB'),
  ],
  'ACC-008': [
    addr('ADDR-008A', '본점', 'VN', '123 Nguyen Hue St, Ho Chi Minh City', true, 'CIF'),
    addr('ADDR-008B', '하노이 지점', 'VN', '45 Tran Hung Dao, Hanoi', false, 'FOB'),
    addr('ADDR-008C', 'KR 보세', 'KR', '서울특별시 강남구 역삼동 789-12', false, 'DDP'),
  ],
  'ACC-009': [
    addr('ADDR-009A', '본사', 'PH', '88 Ayala Avenue, Makati City, Manila', true, 'CIF'),
    addr('ADDR-009B', '세부 창고', 'PH', '456 Osmena Blvd, Cebu City', false, 'FOB'),
  ],
  'ACC-010': [addr('ADDR-010', '본사', 'MY', '12 Jalan Bukit Bintang, KL 55100', true, 'CIF')],
  'ACC-011': [addr('ADDR-011', '모스크바 사무소', 'RU', 'Tverskaya St 15, Moscow 125009', true, 'DAP')],
  'ACC-012': [addr('ADDR-012', '본사', 'JP', '名古屋市中区栄3-15-8', true, 'FOB')],
  'ACC-013': [addr('ADDR-013', 'HQ', 'SG', '1 Raffles Place, #30-01, Singapore 048616', true, 'CIF')],
  'ACC-014': [addr('ADDR-014', '본점', 'TW', '台北市信義區松仁路100號', true, 'FOB')],
  'ACC-015': [addr('ADDR-015', '방콕 본점', 'TH', '999 Rama 1 Rd, Pathumwan, Bangkok 10330', true, 'CIF')],
  'ACC-016': [addr('ADDR-016', '본사', 'KR', '서울특별시 마포구 상암동 1234', true, 'EXW')],
  'ACC-017': [addr('ADDR-017', '오피스', 'JP', '福岡市博多区博多駅前2-1-1', true, 'FOB')],
  'ACC-018': [addr('ADDR-018', 'Main Office', 'US', '789 Broadway, New York, NY 10003', true, 'CIF')],
  'ACC-019': [addr('ADDR-019', '본사', 'KR', '부산광역시 해운대구 우동 543', true, 'EXW')],
  'ACC-020': [addr('ADDR-020', 'Berlin HQ', 'DE', 'Friedrichstraße 123, 10117 Berlin', true, 'DAP')],
};

// =============================================================================
// Accounts (20)
// =============================================================================

export const accounts: Account[] = [
  // ACC-001 ~ ACC-003: negative balance accounts
  { id: 'ACC-001', name: '사쿠라뮤직 재팬', representative: '田中一郎', primaryDepositor: '田中一郎', salesRepId: 'REP-01', defaultDiscountRate: 0.05, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-001'], depositSource: '농협외환', memo: '장기 거래처 — 미수금 주의' },
  { id: 'ACC-002', name: 'StarWave Entertainment US', representative: 'James Park', primaryDepositor: 'James Park', salesRepId: 'REP-02', defaultDiscountRate: 0.08, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-002'], depositSource: 'Paypal', memo: '대량 선주문 후 미입금 이력' },
  { id: 'ACC-003', name: 'Siam K-Pop Trading', representative: 'Somchai L.', primaryDepositor: 'Somchai L.', salesRepId: 'REP-01', defaultDiscountRate: 0.03, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-003'], depositSource: 'Payoneer' },
  // ACC-004 & ACC-005: related accounts (reciprocal)
  { id: 'ACC-004', name: '하나엔터 오사카', representative: '佐藤花子', primaryDepositor: '佐藤花子', salesRepId: 'REP-03', defaultDiscountRate: 0.10, relatedAccountIds: ['ACC-005'], shippingAddresses: addressesForAccount['ACC-004'], depositSource: '하나외환' },
  { id: 'ACC-005', name: '하나엔터 도쿄', representative: '佐藤太郎', primaryDepositor: '佐藤太郎', salesRepId: 'REP-03', defaultDiscountRate: 0.10, relatedAccountIds: ['ACC-004'], shippingAddresses: addressesForAccount['ACC-005'], depositSource: '하나외환' },
  // ACC-006 ~ ACC-009: multiple shipping addresses
  { id: 'ACC-006', name: '미도리 디스트리뷰션', representative: '鈴木次郎', primaryDepositor: '鈴木次郎', salesRepId: 'REP-01', defaultDiscountRate: 0.12, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-006'], depositSource: '농협외환' },
  { id: 'ACC-007', name: 'Indo Rhythm Corp', representative: 'Budi Santoso', primaryDepositor: 'Budi Santoso', salesRepId: 'REP-02', defaultDiscountRate: 0.06, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-007'], depositSource: 'Paypal' },
  { id: 'ACC-008', name: 'Saigon Sound Co.', representative: 'Nguyen Minh', primaryDepositor: 'Nguyen Minh', salesRepId: 'REP-01', defaultDiscountRate: 0.04, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-008'], depositSource: 'Payoneer' },
  { id: 'ACC-009', name: 'Manila Beats Inc.', representative: 'Maria Santos', primaryDepositor: 'Maria Santos', salesRepId: 'REP-03', defaultDiscountRate: 0.07, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-009'], depositSource: 'Paypal' },
  // ACC-010 ~ ACC-020: standard single-address accounts
  { id: 'ACC-010', name: 'KL Music Sdn Bhd', representative: 'Ahmad Razak', primaryDepositor: 'Ahmad Razak', salesRepId: 'REP-02', defaultDiscountRate: 0.05, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-010'], depositSource: 'Payoneer' },
  { id: 'ACC-011', name: 'Москва Мьюзик', representative: 'Иван Петров', primaryDepositor: 'Иван Петров', salesRepId: 'REP-01', defaultDiscountRate: 0.02, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-011'], depositSource: '하나외환' },
  { id: 'ACC-012', name: '나고야 K-Shop', representative: '高橋健太', primaryDepositor: '高橋健太', salesRepId: 'REP-03', defaultDiscountRate: 0.09, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-012'], depositSource: '농협외환' },
  { id: 'ACC-013', name: 'Lion City Records', representative: 'Lim Wei Ming', primaryDepositor: 'Lim Wei Ming', salesRepId: 'REP-02', defaultDiscountRate: 0.06, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-013'], depositSource: 'Paypal' },
  { id: 'ACC-014', name: '타이베이 팬클럽 스토어', representative: '陳美玲', primaryDepositor: '陳美玲', salesRepId: 'REP-01', defaultDiscountRate: 0.11, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-014'], depositSource: '하나외환' },
  { id: 'ACC-015', name: 'Bangkokpop Co., Ltd.', representative: 'Nattapong S.', primaryDepositor: 'Nattapong S.', salesRepId: 'REP-03', defaultDiscountRate: 0.05, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-015'], depositSource: 'Payoneer' },
  { id: 'ACC-016', name: '한류직송 코리아', representative: '김영수', primaryDepositor: '김영수', salesRepId: 'REP-01', defaultDiscountRate: 0.15, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-016'], depositSource: '농협외환' },
  { id: 'ACC-017', name: '후쿠오카 뮤직하우스', representative: '山田太郎', primaryDepositor: '山田太郎', salesRepId: 'REP-02', defaultDiscountRate: 0.08, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-017'], depositSource: '하나외환' },
  { id: 'ACC-018', name: 'NYC K-Pop Wholesale', representative: 'Emily Chen', primaryDepositor: 'Emily Chen', salesRepId: 'REP-03', defaultDiscountRate: 0.07, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-018'], depositSource: 'Paypal' },
  { id: 'ACC-019', name: '부산 웨이브 엔터', representative: '이정호', primaryDepositor: '이정호', salesRepId: 'REP-01', defaultDiscountRate: 0.00, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-019'], depositSource: '농협외환' },
  { id: 'ACC-020', name: 'Berlin K-Culture GmbH', representative: 'Hans Müller', primaryDepositor: 'Hans Müller', salesRepId: 'REP-02', defaultDiscountRate: 0.04, relatedAccountIds: [], shippingAddresses: addressesForAccount['ACC-020'], depositSource: 'Payoneer' },
];

// =============================================================================
// Orders (40) with OrderItems (~120 total)
// =============================================================================

function makeItem(id: string, orderId: string, productId: string, unitPrice: number, quantity: number, discountRate: number, shipmentStatus: '미출고' | '출고대기' | '출고완료'): OrderItem {
  return { id, orderId, productId, unitPrice, quantity, discountRate, subtotal: unitPrice * quantity * (1 - discountRate), shipmentStatus };
}

export const orders: Order[] = [
  // --- 주문완료 (28) ---
  {
    id: '2602280010000', orderDate: '2026-02-28', accountId: 'ACC-001', salesRepId: 'REP-01', currency: 'USD', status: '주문완료', shippingFee: 25, remittanceFee: 15,
    items: [
      makeItem('2602280010001', '2602280010000', 'P-ATEZ-001', 13.5, 50, 0.05, '출고완료'),
      makeItem('2602280010002', '2602280010000', 'P-ATEZ-005', 3.8, 100, 0.05, '출고완료'),
      makeItem('2602280010003', '2602280010000', 'P-ATEZ-008', 21, 20, 0.05, '출고완료'),
    ],
  },
  {
    id: '2603010020000', orderDate: '2026-03-01', accountId: 'ACC-002', salesRepId: 'REP-02', currency: 'USD', status: '주문완료', shippingFee: 30, remittanceFee: 20,
    items: [
      makeItem('2603010020001', '2603010020000', 'P-LUVSTAR-001', 12, 80, 0.08, '출고완료'),
      makeItem('2603010020002', '2603010020000', 'P-LUVSTAR-008', 19.5, 30, 0.08, '출고완료'),
    ],
  },
  {
    id: '2603020030000', orderDate: '2026-03-02', accountId: 'ACC-004', salesRepId: 'REP-03', currency: 'USD', status: '주문완료', shippingFee: 20, remittanceFee: 10,
    items: [
      makeItem('2603020030001', '2603020030000', 'P-NOVA9-001', 14.5, 60, 0.10, '출고완료'),
      makeItem('2603020030002', '2603020030000', 'P-NOVA9-005', 4.2, 80, 0.10, '출고완료'),
      makeItem('2603020030003', '2603020030000', 'P-NOVA9-008', 22.5, 15, 0.10, '출고완료'),
    ],
  },
  {
    id: '2603030040000', orderDate: '2026-03-03', accountId: 'ACC-005', salesRepId: 'REP-03', currency: 'USD', status: '주문완료', shippingFee: 18, remittanceFee: 10,
    items: [
      makeItem('2603030040001', '2603030040000', 'P-HALO-001', 11.2, 40, 0.10, '출고완료'),
      makeItem('2603030040002', '2603030040000', 'P-HALO-005', 2.6, 120, 0.10, '출고완료'),
    ],
  },
  {
    id: '2603050050000', orderDate: '2026-03-05', accountId: 'ACC-006', salesRepId: 'REP-01', currency: 'USD', status: '주문완료', shippingFee: 35, remittanceFee: 15,
    items: [
      makeItem('2603050050001', '2603050050000', 'P-ATEZ-002', 24, 30, 0.12, '출고완료'),
      makeItem('2603050050002', '2603050050000', 'P-LUVSTAR-002', 21, 25, 0.12, '출고완료'),
      makeItem('2603050050003', '2603050050000', 'P-NOVA9-002', 26, 20, 0.12, '출고완료'),
      makeItem('2603050050004', '2603050050000', 'P-HALO-002', 20, 15, 0.12, '출고완료'),
    ],
  },
  {
    id: '2603070060000', orderDate: '2026-03-07', accountId: 'ACC-007', salesRepId: 'REP-02', currency: 'USD', status: '주문완료', shippingFee: 22, remittanceFee: 12,
    items: [
      makeItem('2603070060001', '2603070060000', 'P-ATEZ-003', 12.8, 40, 0.06, '출고완료'),
      makeItem('2603070060002', '2603070060000', 'P-ATEZ-009', 9, 50, 0.06, '출고대기'),
    ],
  },
  {
    id: '2603080070000', orderDate: '2026-03-08', accountId: 'ACC-008', salesRepId: 'REP-01', currency: 'USD', status: '주문완료', shippingFee: 28, remittanceFee: 18,
    items: [
      makeItem('2603080070001', '2603080070000', 'P-LUVSTAR-003', 12.8, 60, 0.04, '출고완료'),
      makeItem('2603080070002', '2603080070000', 'P-LUVSTAR-005', 3.4, 100, 0.04, '출고완료'),
      makeItem('2603080070003', '2603080070000', 'P-LUVSTAR-009', 13.5, 25, 0.04, '출고대기'),
    ],
  },
  {
    id: '2603100080000', orderDate: '2026-03-10', accountId: 'ACC-009', salesRepId: 'REP-03', currency: 'USD', status: '주문완료', shippingFee: 20, remittanceFee: 10,
    items: [
      makeItem('2603100080001', '2603100080000', 'P-NOVA9-003', 13.5, 45, 0.07, '출고완료'),
      makeItem('2603100080002', '2603100080000', 'P-NOVA9-007', 6, 80, 0.07, '출고완료'),
    ],
  },
  {
    id: '2603110090000', orderDate: '2026-03-11', accountId: 'ACC-010', salesRepId: 'REP-02', currency: 'USD', status: '주문완료', shippingFee: 15, remittanceFee: 8,
    items: [
      makeItem('2603110090001', '2603110090000', 'P-HALO-003', 13.8, 35, 0.05, '출고완료'),
      makeItem('2603110090002', '2603110090000', 'P-HALO-007', 4.5, 60, 0.05, '출고대기'),
      makeItem('2603110090003', '2603110090000', 'P-HALO-009', 7.5, 40, 0.05, '미출고'),
    ],
  },
  {
    id: '2603120100000', orderDate: '2026-03-12', accountId: 'ACC-011', salesRepId: 'REP-01', currency: 'RUB', status: '주문완료', shippingFee: 3000, remittanceFee: 1500,
    items: [
      makeItem('2603120100001', '2603120100000', 'P-ATEZ-001', 1300, 30, 0.02, '출고완료'),
      makeItem('2603120100002', '2603120100000', 'P-ATEZ-006', 370, 60, 0.02, '출고완료'),
    ],
  },
  {
    id: '2603130110000', orderDate: '2026-03-13', accountId: 'ACC-012', salesRepId: 'REP-03', currency: 'USD', status: '주문완료', shippingFee: 20, remittanceFee: 10,
    items: [
      makeItem('2603130110001', '2603130110000', 'P-LUVSTAR-004', 31.5, 20, 0.09, '출고완료'),
      makeItem('2603130110002', '2603130110000', 'P-LUVSTAR-006', 3.4, 80, 0.09, '출고완료'),
      makeItem('2603130110003', '2603130110000', 'P-LUVSTAR-010', 10.5, 30, 0.09, '미출고'),
    ],
  },
  {
    id: '2603150120000', orderDate: '2026-03-15', accountId: 'ACC-013', salesRepId: 'REP-02', currency: 'USD', status: '주문완료', shippingFee: 25, remittanceFee: 12,
    items: [
      makeItem('2603150120001', '2603150120000', 'P-NOVA9-004', 32.2, 15, 0.06, '출고완료'),
      makeItem('2603150120002', '2603150120000', 'P-NOVA9-006', 4.2, 90, 0.06, '출고대기'),
    ],
  },
  {
    id: '2603170130000', orderDate: '2026-03-17', accountId: 'ACC-014', salesRepId: 'REP-01', currency: 'USD', status: '주문완료', shippingFee: 18, remittanceFee: 10,
    items: [
      makeItem('2603170130001', '2603170130000', 'P-HALO-004', 30, 10, 0.11, '출고완료'),
      makeItem('2603170130002', '2603170130000', 'P-HALO-006', 2.6, 60, 0.11, '출고완료'),
      makeItem('2603170130003', '2603170130000', 'P-HALO-010', 8.2, 25, 0.11, '미출고'),
    ],
  },
  {
    id: '2603180140000', orderDate: '2026-03-18', accountId: 'ACC-015', salesRepId: 'REP-03', currency: 'USD', status: '주문완료', shippingFee: 20, remittanceFee: 10,
    items: [
      makeItem('2603180140001', '2603180140000', 'P-ATEZ-004', 33.5, 8, 0.05, '출고완료'),
      makeItem('2603180140002', '2603180140000', 'P-ATEZ-010', 11.2, 30, 0.05, '출고대기'),
    ],
  },
  {
    id: '2603200150000', orderDate: '2026-03-20', accountId: 'ACC-016', salesRepId: 'REP-01', currency: 'KRW', status: '주문완료', shippingFee: 5000, remittanceFee: 0,
    items: [
      makeItem('2603200150001', '2603200150000', 'P-LUVSTAR-001', 16000, 100, 0.15, '출고완료'),
      makeItem('2603200150002', '2603200150000', 'P-LUVSTAR-007', 7500, 50, 0.15, '출고완료'),
      makeItem('2603200150003', '2603200150000', 'P-LUVSTAR-008', 26000, 20, 0.15, '미출고'),
    ],
  },
  {
    id: '2603210160000', orderDate: '2026-03-21', accountId: 'ACC-017', salesRepId: 'REP-02', currency: 'USD', status: '주문완료', shippingFee: 22, remittanceFee: 12,
    items: [
      makeItem('2603210160001', '2603210160000', 'P-NOVA9-001', 14.5, 50, 0.08, '출고완료'),
      makeItem('2603210160002', '2603210160000', 'P-NOVA9-009', 12, 30, 0.08, '출고대기'),
    ],
  },
  {
    id: '2603230170000', orderDate: '2026-03-23', accountId: 'ACC-018', salesRepId: 'REP-03', currency: 'USD', status: '주문완료', shippingFee: 30, remittanceFee: 15,
    items: [
      makeItem('2603230170001', '2603230170000', 'P-HALO-001', 11.2, 60, 0.07, '출고완료'),
      makeItem('2603230170002', '2603230170000', 'P-HALO-008', 18.8, 25, 0.07, '출고완료'),
      makeItem('2603230170003', '2603230170000', 'P-HALO-005', 2.6, 80, 0.07, '미출고'),
    ],
  },
  {
    id: '2603250180000', orderDate: '2026-03-25', accountId: 'ACC-019', salesRepId: 'REP-01', currency: 'KRW', status: '주문완료', shippingFee: 3000, remittanceFee: 0,
    items: [
      makeItem('2603250180001', '2603250180000', 'P-ATEZ-001', 18000, 30, 0, '출고완료'),
      makeItem('2603250180002', '2603250180000', 'P-ATEZ-007', 8000, 40, 0, '출고완료'),
    ],
  },
  {
    id: '2603260190000', orderDate: '2026-03-26', accountId: 'ACC-020', salesRepId: 'REP-02', currency: 'EUR', status: '주문완료', shippingFee: 18, remittanceFee: 12,
    items: [
      makeItem('2603260190001', '2603260190000', 'P-LUVSTAR-002', 19.5, 20, 0.04, '출고완료'),
      makeItem('2603260190002', '2603260190000', 'P-LUVSTAR-005', 3.1, 60, 0.04, '출고대기'),
      makeItem('2603260190003', '2603260190000', 'P-LUVSTAR-009', 12.5, 15, 0.04, '미출고'),
    ],
  },
  {
    id: '2603280200000', orderDate: '2026-03-28', accountId: 'ACC-001', salesRepId: 'REP-01', currency: 'USD', status: '주문완료', shippingFee: 30, remittanceFee: 15,
    items: [
      makeItem('2603280200001', '2603280200000', 'P-NOVA9-002', 26, 25, 0.05, '출고완료'),
      makeItem('2603280200002', '2603280200000', 'P-NOVA9-010', 16.5, 20, 0.05, '출고대기'),
    ],
  },
  {
    id: '2603290210000', orderDate: '2026-03-29', accountId: 'ACC-003', salesRepId: 'REP-01', currency: 'USD', status: '주문완료', shippingFee: 22, remittanceFee: 10,
    items: [
      makeItem('2603290210001', '2603290210000', 'P-ATEZ-002', 24, 20, 0.03, '출고대기'),
      makeItem('2603290210002', '2603290210000', 'P-ATEZ-006', 3.8, 80, 0.03, '미출고'),
      makeItem('2603290210003', '2603290210000', 'P-ATEZ-009', 9, 30, 0.03, '미출고'),
    ],
  },
  {
    id: '2603300220000', orderDate: '2026-03-30', accountId: 'ACC-006', salesRepId: 'REP-01', currency: 'USD', status: '주문완료', shippingFee: 25, remittanceFee: 12,
    items: [
      makeItem('2603300220001', '2603300220000', 'P-HALO-003', 13.8, 40, 0.12, '출고대기'),
      makeItem('2603300220002', '2603300220000', 'P-HALO-010', 8.2, 50, 0.12, '미출고'),
    ],
  },
  {
    id: '2604010230000', orderDate: '2026-04-01', accountId: 'ACC-002', salesRepId: 'REP-02', currency: 'USD', status: '주문완료', shippingFee: 35, remittanceFee: 20,
    items: [
      makeItem('2604010230001', '2604010230000', 'P-LUVSTAR-003', 12.8, 70, 0.08, '출고대기'),
      makeItem('2604010230002', '2604010230000', 'P-LUVSTAR-006', 3.4, 120, 0.08, '미출고'),
      makeItem('2604010230003', '2604010230000', 'P-LUVSTAR-010', 10.5, 40, 0.08, '미출고'),
    ],
  },
  {
    id: '2604020240000', orderDate: '2026-04-02', accountId: 'ACC-011', salesRepId: 'REP-01', currency: 'RUB', status: '주문완료', shippingFee: 4000, remittanceFee: 2000,
    items: [
      makeItem('2604020240001', '2604020240000', 'P-NOVA9-003', 1350, 25, 0.02, '미출고'),
      makeItem('2604020240002', '2604020240000', 'P-NOVA9-007', 600, 50, 0.02, '미출고'),
    ],
  },
  {
    id: '2604030250000', orderDate: '2026-04-03', accountId: 'ACC-012', salesRepId: 'REP-03', currency: 'USD', status: '주문완료', shippingFee: 18, remittanceFee: 10,
    items: [
      makeItem('2604030250001', '2604030250000', 'P-ATEZ-003', 12.8, 45, 0.09, '미출고'),
      makeItem('2604030250002', '2604030250000', 'P-ATEZ-010', 11.2, 20, 0.09, '미출고'),
    ],
  },
  {
    id: '2604040260000', orderDate: '2026-04-04', accountId: 'ACC-009', salesRepId: 'REP-03', currency: 'USD', status: '주문완료', shippingFee: 22, remittanceFee: 12,
    items: [
      makeItem('2604040260001', '2604040260000', 'P-HALO-002', 20, 18, 0.07, '미출고'),
      makeItem('2604040260002', '2604040260000', 'P-HALO-006', 2.6, 70, 0.07, '미출고'),
      makeItem('2604040260003', '2604040260000', 'P-HALO-008', 18.8, 12, 0.07, '미출고'),
    ],
  },
  {
    id: '2604050270000', orderDate: '2026-04-05', accountId: 'ACC-013', salesRepId: 'REP-02', currency: 'USD', status: '주문완료', shippingFee: 20, remittanceFee: 10,
    items: [
      makeItem('2604050270001', '2604050270000', 'P-LUVSTAR-004', 31.5, 12, 0.06, '미출고'),
      makeItem('2604050270002', '2604050270000', 'P-NOVA9-004', 32.2, 10, 0.06, '미출고'),
    ],
  },
  {
    id: '2604070280000', orderDate: '2026-04-07', accountId: 'ACC-014', salesRepId: 'REP-01', currency: 'USD', status: '주문완료', shippingFee: 20, remittanceFee: 10,
    items: [
      makeItem('2604070280001', '2604070280000', 'P-ATEZ-004', 33.5, 5, 0.11, '미출고'),
      makeItem('2604070280002', '2604070280000', 'P-NOVA9-006', 4.2, 50, 0.11, '미출고'),
    ],
  },
  // --- 주문대기 (8) ---
  {
    id: '2604080290000', orderDate: '2026-04-08', accountId: 'ACC-003', salesRepId: 'REP-01', currency: 'USD', status: '주문대기', shippingFee: 25, remittanceFee: 15,
    items: [
      makeItem('2604080290001', '2604080290000', 'P-ATEZ-001', 13.5, 40, 0.03, '미출고'),
      makeItem('2604080290002', '2604080290000', 'P-ATEZ-005', 3.8, 80, 0.03, '미출고'),
      makeItem('2604080290003', '2604080290000', 'P-LUVSTAR-001', 12, 50, 0.03, '미출고'),
    ],
  },
  {
    id: '2604080300000', orderDate: '2026-04-08', accountId: 'ACC-007', salesRepId: 'REP-02', currency: 'USD', status: '주문대기', shippingFee: 20, remittanceFee: 10,
    items: [
      makeItem('2604080300001', '2604080300000', 'P-NOVA9-001', 14.5, 30, 0.06, '미출고'),
      makeItem('2604080300002', '2604080300000', 'P-NOVA9-005', 4.2, 60, 0.06, '미출고'),
    ],
  },
  {
    id: '2604090310000', orderDate: '2026-04-09', accountId: 'ACC-010', salesRepId: 'REP-02', currency: 'USD', status: '주문대기', shippingFee: 18, remittanceFee: 10,
    items: [
      makeItem('2604090310001', '2604090310000', 'P-HALO-001', 11.2, 25, 0.05, '미출고'),
      makeItem('2604090310002', '2604090310000', 'P-HALO-009', 7.5, 40, 0.05, '미출고'),
      makeItem('2604090310003', '2604090310000', 'P-HALO-005', 2.6, 60, 0.05, '미출고'),
    ],
  },
  {
    id: '2604090320000', orderDate: '2026-04-09', accountId: 'ACC-015', salesRepId: 'REP-03', currency: 'USD', status: '주문대기', shippingFee: 22, remittanceFee: 12,
    items: [
      makeItem('2604090320001', '2604090320000', 'P-LUVSTAR-002', 21, 15, 0.05, '미출고'),
      makeItem('2604090320002', '2604090320000', 'P-LUVSTAR-008', 19.5, 10, 0.05, '미출고'),
    ],
  },
  {
    id: '2604100330000', orderDate: '2026-04-10', accountId: 'ACC-001', salesRepId: 'REP-01', currency: 'USD', status: '주문대기', shippingFee: 30, remittanceFee: 15,
    items: [
      makeItem('2604100330001', '2604100330000', 'P-NOVA9-002', 26, 20, 0.05, '미출고'),
      makeItem('2604100330002', '2604100330000', 'P-NOVA9-008', 22.5, 10, 0.05, '미출고'),
      makeItem('2604100330003', '2604100330000', 'P-ATEZ-007', 6, 50, 0.05, '미출고'),
    ],
  },
  {
    id: '2604100340000', orderDate: '2026-04-10', accountId: 'ACC-016', salesRepId: 'REP-01', currency: 'KRW', status: '주문대기', shippingFee: 5000, remittanceFee: 0,
    items: [
      makeItem('2604100340001', '2604100340000', 'P-HALO-003', 18500, 20, 0.15, '미출고'),
      makeItem('2604100340002', '2604100340000', 'P-HALO-004', 40000, 5, 0.15, '미출고'),
    ],
  },
  {
    id: '2604110350000', orderDate: '2026-04-11', accountId: 'ACC-004', salesRepId: 'REP-03', currency: 'USD', status: '주문대기', shippingFee: 20, remittanceFee: 10,
    items: [
      makeItem('2604110350001', '2604110350000', 'P-ATEZ-002', 24, 15, 0.10, '미출고'),
      makeItem('2604110350002', '2604110350000', 'P-LUVSTAR-003', 12.8, 30, 0.10, '미출고'),
      makeItem('2604110350003', '2604110350000', 'P-NOVA9-009', 12, 20, 0.10, '미출고'),
    ],
  },
  {
    id: '2604120360000', orderDate: '2026-04-12', accountId: 'ACC-018', salesRepId: 'REP-03', currency: 'USD', status: '주문대기', shippingFee: 25, remittanceFee: 15,
    items: [
      makeItem('2604120360001', '2604120360000', 'P-HALO-002', 20, 20, 0.07, '미출고'),
      makeItem('2604120360002', '2604120360000', 'P-NOVA9-010', 16.5, 15, 0.07, '미출고'),
    ],
  },
  // --- 주문중지 (4) ---
  {
    id: '2603150370000', orderDate: '2026-03-15', accountId: 'ACC-002', salesRepId: 'REP-02', currency: 'USD', status: '주문중지', shippingFee: 20, remittanceFee: 10, memo: '거래처 요청으로 중지',
    items: [
      makeItem('2603150370001', '2603150370000', 'P-ATEZ-001', 13.5, 30, 0.08, '미출고'),
      makeItem('2603150370002', '2603150370000', 'P-ATEZ-008', 21, 10, 0.08, '미출고'),
    ],
  },
  {
    id: '2603200380000', orderDate: '2026-03-20', accountId: 'ACC-008', salesRepId: 'REP-01', currency: 'USD', status: '주문중지', shippingFee: 15, remittanceFee: 8, memo: '재고 부족으로 중지',
    items: [
      makeItem('2603200380001', '2603200380000', 'P-LUVSTAR-004', 31.5, 15, 0.04, '미출고'),
      makeItem('2603200380002', '2603200380000', 'P-NOVA9-004', 32.2, 10, 0.04, '미출고'),
      makeItem('2603200380003', '2603200380000', 'P-NOVA9-006', 4.2, 40, 0.04, '미출고'),
    ],
  },
  {
    id: '2603250390000', orderDate: '2026-03-25', accountId: 'ACC-011', salesRepId: 'REP-01', currency: 'RUB', status: '주문중지', shippingFee: 2500, remittanceFee: 1000, memo: '송금 제한으로 중지',
    items: [
      makeItem('2603250390001', '2603250390000', 'P-HALO-001', 1120, 20, 0.02, '미출고'),
      makeItem('2603250390002', '2603250390000', 'P-HALO-008', 1880, 8, 0.02, '미출고'),
    ],
  },
  {
    id: '2604010400000', orderDate: '2026-04-01', accountId: 'ACC-005', salesRepId: 'REP-03', currency: 'USD', status: '주문중지', shippingFee: 18, remittanceFee: 10, memo: '중복 주문으로 취소',
    items: [
      makeItem('2604010400001', '2604010400000', 'P-LUVSTAR-001', 12, 20, 0.10, '미출고'),
      makeItem('2604010400002', '2604010400000', 'P-LUVSTAR-005', 3.4, 40, 0.10, '미출고'),
    ],
  },
];

// =============================================================================
// Shipments (15)
// =============================================================================

export const shipments: Shipment[] = [
  // --- 출고완료 (10) ---
  {
    id: 'SHIP-260305-01', accountId: 'ACC-001', shippingAddressId: 'ADDR-001', shipDate: '2026-03-05', status: '출고완료', incoterm: 'FOB', trackingNumber: '102938475612',
    items: [
      { orderItemId: '2602280010001', productId: 'P-ATEZ-001', quantity: 50, hsCode: '854321', htsCode: '8543210010', subtotal: 641.25 },
      { orderItemId: '2602280010002', productId: 'P-ATEZ-005', quantity: 100, hsCode: '490199', htsCode: '4901990050', subtotal: 361 },
    ],
  },
  {
    id: 'SHIP-260306-01', accountId: 'ACC-002', shippingAddressId: 'ADDR-002', shipDate: '2026-03-06', status: '출고완료', incoterm: 'CIF', trackingNumber: '293847561023',
    items: [
      { orderItemId: '2603010020001', productId: 'P-LUVSTAR-001', quantity: 80, hsCode: '854321', htsCode: '8543210010', subtotal: 883.2 },
      { orderItemId: '2603010020002', productId: 'P-LUVSTAR-008', quantity: 30, hsCode: '950300', htsCode: '9503001500', subtotal: 538.2 },
    ],
  },
  {
    id: 'SHIP-260307-01', accountId: 'ACC-004', shippingAddressId: 'ADDR-004', shipDate: '2026-03-07', status: '출고완료', incoterm: 'FOB', trackingNumber: '384756102938',
    items: [
      { orderItemId: '2603020030001', productId: 'P-NOVA9-001', quantity: 60, hsCode: '854321', htsCode: '8543210010', subtotal: 783 },
      { orderItemId: '2603020030002', productId: 'P-NOVA9-005', quantity: 80, hsCode: '490199', htsCode: '4901990050', subtotal: 302.4 },
    ],
  },
  {
    id: 'SHIP-260308-01', accountId: 'ACC-005', shippingAddressId: 'ADDR-005', shipDate: '2026-03-08', status: '출고완료', incoterm: 'FOB', trackingNumber: '475610293847',
    items: [
      { orderItemId: '2603030040001', productId: 'P-HALO-001', quantity: 40, hsCode: '854321', htsCode: '8543210010', subtotal: 403.2 },
      { orderItemId: '2603030040002', productId: 'P-HALO-005', quantity: 120, hsCode: '490199', htsCode: '4901990050', subtotal: 280.8 },
    ],
  },
  {
    id: 'SHIP-260310-01', accountId: 'ACC-006', shippingAddressId: 'ADDR-006A', shipDate: '2026-03-10', status: '출고완료', incoterm: 'FOB', trackingNumber: '561029384756',
    items: [
      { orderItemId: '2603050050001', productId: 'P-ATEZ-002', quantity: 30, hsCode: '854321', htsCode: '8543210010', subtotal: 633.6 },
      { orderItemId: '2603050050002', productId: 'P-LUVSTAR-002', quantity: 25, hsCode: '854321', htsCode: '8543210010', subtotal: 462 },
    ],
  },
  {
    id: 'SHIP-260312-01', accountId: 'ACC-008', shippingAddressId: 'ADDR-008A', shipDate: '2026-03-12', status: '출고완료', incoterm: 'CIF', trackingNumber: '610293847561',
    items: [
      { orderItemId: '2603080070001', productId: 'P-LUVSTAR-003', quantity: 60, hsCode: '854321', htsCode: '8543210010', subtotal: 737.28 },
      { orderItemId: '2603080070002', productId: 'P-LUVSTAR-005', quantity: 100, hsCode: '490199', htsCode: '4901990050', subtotal: 326.4 },
    ],
  },
  {
    id: 'SHIP-260315-01', accountId: 'ACC-009', shippingAddressId: 'ADDR-009A', shipDate: '2026-03-15', status: '출고완료', incoterm: 'CIF', trackingNumber: '748392015634',
    items: [
      { orderItemId: '2603100080001', productId: 'P-NOVA9-003', quantity: 45, hsCode: '854321', htsCode: '8543210010', subtotal: 565.07 },
      { orderItemId: '2603100080002', productId: 'P-NOVA9-007', quantity: 80, hsCode: '490199', htsCode: '4901990050', subtotal: 446.4 },
    ],
  },
  {
    id: 'SHIP-260318-01', accountId: 'ACC-011', shippingAddressId: 'ADDR-011', shipDate: '2026-03-18', status: '출고완료', incoterm: 'DAP', trackingNumber: '839201563478',
    items: [
      { orderItemId: '2603120100001', productId: 'P-ATEZ-001', quantity: 30, hsCode: '854321', htsCode: '8543210010', subtotal: 38220 },
      { orderItemId: '2603120100002', productId: 'P-ATEZ-006', quantity: 60, hsCode: '490199', htsCode: '4901990050', subtotal: 21756 },
    ],
  },
  {
    id: 'SHIP-260320-01', accountId: 'ACC-012', shippingAddressId: 'ADDR-012', shipDate: '2026-03-20', status: '출고완료', incoterm: 'FOB', trackingNumber: '920156347839',
    items: [
      { orderItemId: '2603130110001', productId: 'P-LUVSTAR-004', quantity: 20, hsCode: '854321', htsCode: '8543210010', subtotal: 573.3 },
      { orderItemId: '2603130110002', productId: 'P-LUVSTAR-006', quantity: 80, hsCode: '490199', htsCode: '4901990050', subtotal: 247.52 },
    ],
  },
  {
    id: 'SHIP-260325-01', accountId: 'ACC-016', shippingAddressId: 'ADDR-016', shipDate: '2026-03-25', status: '출고완료', incoterm: 'EXW', trackingNumber: '015634783920', undervalueFile: 'undervalue-20260325.xlsx',
    items: [
      { orderItemId: '2603200150001', productId: 'P-LUVSTAR-001', quantity: 100, hsCode: '854321', htsCode: '8543210010', subtotal: 1360000 },
      { orderItemId: '2603200150002', productId: 'P-LUVSTAR-007', quantity: 50, hsCode: '490199', htsCode: '4901990050', subtotal: 318750 },
    ],
  },
  // --- 출고대기 (5) ---
  {
    id: 'SHIP-260401-01', accountId: 'ACC-006', shippingAddressId: 'ADDR-006B', status: '출고대기', incoterm: 'EXW',
    items: [
      { orderItemId: '2603300220001', productId: 'P-HALO-003', quantity: 40, hsCode: '854321', htsCode: '8543210010', subtotal: 485.76 },
    ],
  },
  {
    id: 'SHIP-260402-01', accountId: 'ACC-002', shippingAddressId: 'ADDR-002', status: '출고대기', incoterm: 'CIF',
    items: [
      { orderItemId: '2604010230001', productId: 'P-LUVSTAR-003', quantity: 70, hsCode: '854321', htsCode: '8543210010', subtotal: 824.32 },
    ],
  },
  {
    id: 'SHIP-260403-01', accountId: 'ACC-010', shippingAddressId: 'ADDR-010', status: '출고대기', incoterm: 'CIF', undervalueFile: 'undervalue-20260403.xlsx',
    items: [
      { orderItemId: '2603110090001', productId: 'P-HALO-003', quantity: 35, hsCode: '854321', htsCode: '8543210010', subtotal: 458.85 },
      { orderItemId: '2603110090002', productId: 'P-HALO-007', quantity: 60, hsCode: '490199', htsCode: '4901990050', subtotal: 256.5 },
    ],
  },
  {
    id: 'SHIP-260405-01', accountId: 'ACC-013', shippingAddressId: 'ADDR-013', status: '출고대기', incoterm: 'CIF',
    items: [
      { orderItemId: '2603150120002', productId: 'P-NOVA9-006', quantity: 90, hsCode: '490199', htsCode: '4901990050', subtotal: 355.32 },
    ],
  },
  {
    id: 'SHIP-260407-01', accountId: 'ACC-017', shippingAddressId: 'ADDR-017', status: '출고대기', incoterm: 'FOB',
    items: [
      { orderItemId: '2603210160002', productId: 'P-NOVA9-009', quantity: 30, hsCode: '950300', htsCode: '9503001500', subtotal: 331.2 },
    ],
  },
];

// =============================================================================
// Payments (30)
// =============================================================================

export const payments: Payment[] = [
  // Week 1: Feb 28 – Mar 6
  { id: 'PAY-001', date: '2026-02-28', accountId: 'ACC-004', depositSource: '하나외환', currency: 'USD', amount: 800, krwEquivalent: 1080400, memo: '3월분 선입금' },
  { id: 'PAY-002', date: '2026-03-01', accountId: 'ACC-006', depositSource: '농협외환', currency: 'USD', amount: 1500, krwEquivalent: 2025750 },
  { id: 'PAY-003', date: '2026-03-02', accountId: 'ACC-005', depositSource: '하나외환', currency: 'USD', amount: 600, krwEquivalent: 810300 },
  { id: 'PAY-004', date: '2026-03-03', accountId: 'ACC-009', depositSource: 'Paypal', currency: 'USD', amount: 700, krwEquivalent: 945350 },
  { id: 'PAY-005', date: '2026-03-05', accountId: 'ACC-007', depositSource: 'Paypal', currency: 'USD', amount: 500, krwEquivalent: 675250 },
  // Week 2: Mar 7 – 13
  { id: 'PAY-006', date: '2026-03-07', accountId: 'ACC-010', depositSource: 'Payoneer', currency: 'USD', amount: 450, krwEquivalent: 607725 },
  { id: 'PAY-007', date: '2026-03-08', accountId: 'ACC-012', depositSource: '농협외환', currency: 'USD', amount: 900, krwEquivalent: 1215450 },
  { id: 'PAY-008', date: '2026-03-10', accountId: 'ACC-013', depositSource: 'Paypal', currency: 'USD', amount: 650, krwEquivalent: 877825 },
  { id: 'PAY-009', date: '2026-03-11', accountId: 'ACC-014', depositSource: '하나외환', currency: 'USD', amount: 400, krwEquivalent: 540200 },
  { id: 'PAY-010', date: '2026-03-12', accountId: 'ACC-011', depositSource: '하나외환', currency: 'RUB', amount: 50000, krwEquivalent: 742500 },
  // Week 3: Mar 14 – 20
  { id: 'PAY-011', date: '2026-03-14', accountId: 'ACC-015', depositSource: 'Payoneer', currency: 'USD', amount: 350, krwEquivalent: 472675 },
  { id: 'PAY-012', date: '2026-03-15', accountId: 'ACC-008', depositSource: 'Payoneer', currency: 'USD', amount: 1100, krwEquivalent: 1485550 },
  { id: 'PAY-013', date: '2026-03-17', accountId: 'ACC-016', depositSource: '농협외환', currency: 'KRW', amount: 2000000, krwEquivalent: 2000000 },
  { id: 'PAY-014', date: '2026-03-18', accountId: 'ACC-017', depositSource: '하나외환', currency: 'USD', amount: 750, krwEquivalent: 1012875 },
  { id: 'PAY-015', date: '2026-03-19', accountId: 'ACC-019', depositSource: '농협외환', currency: 'KRW', amount: 900000, krwEquivalent: 900000 },
  // Week 4: Mar 21 – 27
  { id: 'PAY-016', date: '2026-03-21', accountId: 'ACC-018', depositSource: 'Paypal', currency: 'USD', amount: 900, krwEquivalent: 1215450 },
  { id: 'PAY-017', date: '2026-03-22', accountId: 'ACC-020', depositSource: 'Payoneer', currency: 'EUR', amount: 500, krwEquivalent: 726150 },
  { id: 'PAY-018', date: '2026-03-24', accountId: 'ACC-001', depositSource: '농협외환', currency: 'USD', amount: 400, krwEquivalent: 540200, memo: '일부 입금' },
  { id: 'PAY-019', date: '2026-03-25', accountId: 'ACC-004', depositSource: '하나외환', currency: 'USD', amount: 500, krwEquivalent: 675250 },
  { id: 'PAY-020', date: '2026-03-26', accountId: 'ACC-006', depositSource: '농협외환', currency: 'USD', amount: 800, krwEquivalent: 1080400 },
  // Week 5: Mar 28 – Apr 3
  { id: 'PAY-021', date: '2026-03-28', accountId: 'ACC-012', depositSource: '농협외환', currency: 'USD', amount: 400, krwEquivalent: 540200 },
  { id: 'PAY-022', date: '2026-03-30', accountId: 'ACC-009', depositSource: 'Paypal', currency: 'USD', amount: 600, krwEquivalent: 810300 },
  { id: 'PAY-023', date: '2026-03-31', accountId: 'ACC-013', depositSource: 'Paypal', currency: 'USD', amount: 500, krwEquivalent: 675250 },
  { id: 'PAY-024', date: '2026-04-01', accountId: 'ACC-015', depositSource: 'Payoneer', currency: 'USD', amount: 300, krwEquivalent: 405150 },
  { id: 'PAY-025', date: '2026-04-02', accountId: 'ACC-017', depositSource: '하나외환', currency: 'USD', amount: 500, krwEquivalent: 675250 },
  // Week 6: Apr 4 – 10
  { id: 'PAY-026', date: '2026-04-04', accountId: 'ACC-014', depositSource: '하나외환', currency: 'USD', amount: 350, krwEquivalent: 472675 },
  { id: 'PAY-027', date: '2026-04-05', accountId: 'ACC-019', depositSource: '농협외환', currency: 'KRW', amount: 500000, krwEquivalent: 500000 },
  { id: 'PAY-028', date: '2026-04-07', accountId: 'ACC-020', depositSource: 'Payoneer', currency: 'EUR', amount: 300, krwEquivalent: 435690 },
  { id: 'PAY-029', date: '2026-04-09', accountId: 'ACC-010', depositSource: 'Payoneer', currency: 'USD', amount: 400, krwEquivalent: 540200 },
  { id: 'PAY-030', date: '2026-04-10', accountId: 'ACC-018', depositSource: 'Paypal', currency: 'USD', amount: 600, krwEquivalent: 810300 },
];

// =============================================================================
// Activity Events (10)
// =============================================================================

export const activityEvents: ActivityEvent[] = [
  { id: 'EVT-001', timestamp: '2026-04-12T09:15:00', persona: '정민수 (영업)', description: '주문 #2604120360000 신규 등록 — NYC K-Pop Wholesale' },
  { id: 'EVT-002', timestamp: '2026-04-11T17:42:00', persona: '김하나 (물류)', description: '출고 SHIP-260407-01 피킹 시작 — 후쿠오카 뮤직하우스' },
  { id: 'EVT-003', timestamp: '2026-04-11T14:30:00', persona: '박서연 (경영관리)', description: '수금 PAY-030 확인 — NYC K-Pop Wholesale $600' },
  { id: 'EVT-004', timestamp: '2026-04-10T16:20:00', persona: '정민수 (영업)', description: '주문 #2604100330000 신규 등록 — 사쿠라뮤직 재팬' },
  { id: 'EVT-005', timestamp: '2026-04-10T11:05:00', persona: '이준호 (출고)', description: '출고 SHIP-260405-01 서류 준비 완료 — Lion City Records' },
  { id: 'EVT-006', timestamp: '2026-04-09T15:30:00', persona: '정민수 (영업)', description: '주문 #2604090310000 신규 등록 — KL Music Sdn Bhd' },
  { id: 'EVT-007', timestamp: '2026-04-09T10:00:00', persona: '박서연 (경영관리)', description: '수금 PAY-029 확인 — KL Music Sdn Bhd $400' },
  { id: 'EVT-008', timestamp: '2026-04-08T16:45:00', persona: '김하나 (물류)', description: '출고 SHIP-260403-01 언더벨류 파일 첨부 — KL Music Sdn Bhd' },
  { id: 'EVT-009', timestamp: '2026-04-07T13:20:00', persona: '이준호 (출고)', description: '출고 SHIP-260325-01 완료 — 한류직송 코리아 (송장 015634783920)' },
  { id: 'EVT-010', timestamp: '2026-04-05T09:50:00', persona: '정민수 (영업)', description: '주문 #2604050270000 신규 등록 — Lion City Records' },
];

// =============================================================================
// Helper Functions
// =============================================================================

export const salesRepNames: Record<string, string> = {
  'REP-01': '정영업',
  'REP-02': '김수출',
  'REP-03': '이물류',
};

export function getAccountById(id: string): Account | undefined {
  return accounts.find((a) => a.id === id);
}

export function getOrderById(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getRecentOrdersByAccount(accountId: string, limit: number): Order[] {
  return orders
    .filter((o) => o.accountId === accountId)
    .sort((a, b) => b.orderDate.localeCompare(a.orderDate))
    .slice(0, limit);
}

export function getBalanceByAccount(accountId: string): AccountBalance {
  const balance: AccountBalance = { USD: 0, EUR: 0, RUB: 0, KRW: 0, totalKRW: 0 };

  // Credits: payments for this account
  for (const p of payments) {
    if (p.accountId === accountId) {
      balance[p.currency] += p.amount;
    }
  }

  // Debits: completed + pending orders for this account (exclude 주문중지)
  for (const o of orders) {
    if (o.accountId === accountId && o.status !== '주문중지') {
      const orderTotal = o.items.reduce((sum, item) => sum + item.subtotal, 0) + o.shippingFee + o.remittanceFee;
      balance[o.currency] -= orderTotal;
    }
  }

  // Compute totalKRW
  balance.totalKRW =
    balance.USD * fxRates.USD +
    balance.EUR * fxRates.EUR +
    balance.RUB * fxRates.RUB +
    balance.KRW * fxRates.KRW;

  return balance;
}
