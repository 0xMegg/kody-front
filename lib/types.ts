// =============================================================================
// Union Types
// =============================================================================

export type Currency = 'KRW' | 'USD' | 'EUR' | 'RUB';

export type OrderStatus = '주문대기' | '주문완료' | '주문중지';

export type ShipmentStatus = '출고대기' | '출고완료';

export type ProductCategory = '앨범' | '포토카드' | '굿즈';

export type OrderItemShipmentStatus = '미출고' | '출고대기' | '출고완료';

export type Incoterm = 'EXW' | 'FOB' | 'CIF' | 'DDP' | 'DAP';

export type DepositSource = '농협외환' | '하나외환' | 'Paypal' | 'Payoneer';

// =============================================================================
// Entity Interfaces
// =============================================================================

export interface Artist {
  id: string;
  name: string;
  memberCount: number;
}

export interface Product {
  id: string;
  artistId: string;
  category: ProductCategory;
  name: string;
  weightG: number;
  priceKRW: number;
}

export interface ShippingAddress {
  id: string;
  label: string;
  country: string;
  fullAddress: string;
  isPrimary: boolean;
  defaultIncoterm?: Incoterm;
}

export interface Account {
  id: string;
  name: string;
  representative: string;
  primaryDepositor: string;
  salesRepId: string;
  defaultDiscountRate: number;
  relatedAccountIds: string[];
  shippingAddresses: ShippingAddress[];
  depositSource: DepositSource;
  memo?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  unitPrice: number;
  quantity: number;
  discountRate: number;
  subtotal: number;
  shipmentStatus: OrderItemShipmentStatus;
}

export interface Order {
  id: string;
  orderDate: string;
  accountId: string;
  salesRepId: string;
  currency: Currency;
  status: OrderStatus;
  shippingFee: number;
  remittanceFee: number;
  memo?: string;
  items: OrderItem[];
}

export interface ShipmentItem {
  orderItemId: string;
  productId: string;
  quantity: number;
  hsCode: string;
  htsCode: string;
  subtotal: number;
}

export interface Shipment {
  id: string;
  accountId: string;
  shippingAddressId: string;
  shipDate?: string;
  items: ShipmentItem[];
  incoterm: Incoterm;
  undervalueFile?: string;
  trackingNumber?: string;
  status: ShipmentStatus;
}

export interface Payment {
  id: string;
  date: string;
  accountId: string;
  depositSource: DepositSource;
  currency: Currency;
  amount: number;
  krwEquivalent: number;
  memo?: string;
}

export interface AccountBalance {
  USD: number;
  EUR: number;
  RUB: number;
  KRW: number;
  totalKRW: number;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  persona: string;
  description: string;
}
