export const goToDiscountedPrice = (price, discount) => {
  const discountValue = (price * discount) / 100;
  return price - discountValue;
};

export const getTax = (price, tax) => {
  const taxValue = (price * tax) / 100;
  return taxValue;
};
