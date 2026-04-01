export function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)
}

export function getLogoUrl(domain) {
  if (!domain) return 'https://logo.clearbit.com/clearbit.com'
  return `https://logo.clearbit.com/${domain}`
}
