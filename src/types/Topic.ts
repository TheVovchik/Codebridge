export interface Topic {
  id: number,
  title: string,
  url: string,
  imageUrl: string,
  newsSite: string,
  summary: string,
  publishedAt: Date,
  updatedAt: Date,
}

export interface SortedTopic extends Topic {
  titleQueryMatches: number,
  summaryQueryMatches: number,
}
