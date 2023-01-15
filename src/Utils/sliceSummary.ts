export function sliceSummary(summary: string) {
  return summary.length <= 100
    ? summary
    : `${summary.slice(0, 97).trim()}...`;
}
