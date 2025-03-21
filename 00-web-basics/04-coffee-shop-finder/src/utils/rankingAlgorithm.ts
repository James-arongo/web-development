export function calculateScore(rating: number, reviewCount: number): number {
  // Wilson score confidence interval for rating
  // This favors places with more reviews while considering the rating
  const z = 1.96; // 95% confidence interval
  const n = reviewCount;
  const p = rating / 5; // Convert 5-star rating to probability

  const denominator = 1 + z * z / n;
  const center = p + z * z / (2 * n);
  const uncertainty = z * Math.sqrt((p * (1 - p) + z * z / (4 * n)) / n);

  return (center - uncertainty) / denominator;
}