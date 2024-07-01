export function formatCurrency (priceCents) {
  return (priceCents / 100).toFixed(2);  
}

export default formatCurrency;//to get more detail about syntax, check checkout.js
//export default hello(); can't have this. not because of hello function doens't exist but due to the property that 1 file can have only 1 default export.