import { artists, products, accounts, orders, shipments, payments, activityEvents, getBalanceByAccount, getAccountById, getOrderById, krwEquivalent } from './lib/mock-data';

console.log('=== VOLUMES ===');
console.log('artists:', artists.length);
console.log('products:', products.length);
console.log('accounts:', accounts.length);
console.log('orders:', orders.length);
const allItems = orders.flatMap(o => o.items);
console.log('items:', allItems.length);
console.log('shipments:', shipments.length);
console.log('payments:', payments.length);
console.log('events:', activityEvents.length);

console.log('\n=== ORDER STATUS ===');
const os: Record<string, number> = {};
orders.forEach(o => { os[o.status] = (os[o.status] || 0) + 1; });
console.log(JSON.stringify(os));

console.log('\n=== SHIPMENT STATUS ===');
const ss: Record<string, number> = {};
shipments.forEach(s => { ss[s.status] = (ss[s.status] || 0) + 1; });
console.log(JSON.stringify(ss));

console.log('\n=== NEGATIVE BALANCES ===');
const neg = accounts.filter(a => getBalanceByAccount(a.id).totalKRW < 0);
console.log('count:', neg.length);
neg.forEach(a => console.log(a.id, getBalanceByAccount(a.id).totalKRW.toFixed(0)));

console.log('\n=== RELATED ACCOUNTS ===');
const rel = accounts.filter(a => a.relatedAccountIds.length > 0);
console.log('count:', rel.length);
rel.forEach(a => console.log(a.id, '->', a.relatedAccountIds));

console.log('\n=== MULTI-ADDRESS ===');
const multi = accounts.filter(a => a.shippingAddresses.length >= 2);
console.log('count:', multi.length);
multi.forEach(a => console.log(a.id, a.shippingAddresses.length));

console.log('\n=== DEPOSIT SOURCES ===');
const src: Record<string, number> = {};
accounts.forEach(a => { src[a.depositSource] = (src[a.depositSource] || 0) + 1; });
console.log(JSON.stringify(src));

console.log('\n=== DISCOUNT RANGE ===');
const rates = accounts.map(a => a.defaultDiscountRate);
console.log(Math.min(...rates), '-', Math.max(...rates));

console.log('\n=== HELPERS ===');
console.log('getAccountById(ACC-001):', getAccountById('ACC-001')?.name);
console.log('getAccountById(x):', getAccountById('x'));
console.log('getOrderById:', getOrderById(orders[0].id)?.id);
console.log('krwEquivalent(100,USD):', krwEquivalent(100, 'USD'));
console.log('krwEquivalent(100,KRW):', krwEquivalent(100, 'KRW'));

console.log('\n=== REFERENTIAL INTEGRITY ===');
const pids = new Set(products.map(p => p.id));
const oiids = new Set(allItems.map(i => i.id));
const aids = new Set(accounts.map(a => a.id));
console.log('badItemProd:', allItems.filter(i => !pids.has(i.productId)).length);
console.log('badShipOI:', shipments.flatMap(s => s.items).filter(i => !oiids.has(i.orderItemId)).length);
console.log('badShipAcc:', shipments.filter(s => !aids.has(s.accountId)).length);
console.log('totalAddr:', accounts.reduce((s, a) => s + a.shippingAddresses.length, 0));

const badPay = payments.filter(p => {
  const a = getAccountById(p.accountId);
  return a && a.depositSource !== p.depositSource;
});
console.log('payDepMismatch:', badPay.length);
if (badPay.length > 0) badPay.forEach(p => console.log(' ', p.id, p.depositSource, 'vs', getAccountById(p.accountId)?.depositSource));
