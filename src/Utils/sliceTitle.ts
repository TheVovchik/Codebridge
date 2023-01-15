export function sliceTitle(title: string) {
  return title.length <= 67
    ? title
    : `${title.slice(0, 67).trim()}...`;
}
