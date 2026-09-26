// src/utils/shipping.js

export const SHIPPING_GRID = [
  { maxWeight: 0.25, price: 3.64 },
  { maxWeight: 0.5, price: 3.64 },
  { maxWeight: 1.0, price: 3.86 },
  { maxWeight: 2.0, price: 3.86 },
  { maxWeight: 3.0, price: 4.09 },
  { maxWeight: 4.0, price: 4.32 },
  { maxWeight: 5.0, price: 4.55 },
  { maxWeight: 7.0, price: 6.27 },
  { maxWeight: 10.0, price: 8.09 },
  { maxWeight: 15.0, price: 11.73 },
  { maxWeight: 20.0, price: 14.36 },
  { maxWeight: 30.0, price: 24.82 },
];

export const INSURANCE_GRID = [
  { maxAmount: 25, price: 0.0 },
  { maxAmount: 50, price: 2.5 },
  { maxAmount: 125, price: 3.5 },
  { maxAmount: 250, price: 5.0 },
  { maxAmount: 375, price: 6.5 },
  { maxAmount: 500, price: 8.0 },
];

export function calculateShippingFee(totalWeightInKg) {
  const tier = SHIPPING_GRID.find((t) => totalWeightInKg <= t.maxWeight);
  return tier ? tier.price : 24.82;
}

export function calculateInsuranceFee(totalAmount) {
  const tier = INSURANCE_GRID.find((t) => totalAmount <= t.maxAmount);
  return tier ? tier.price : 8.0;
}