export type Language = 'es' | 'en';
export type ImageName = 'hero' | 'staircase' | 'living' | 'terrace';
export interface ContentNode { type: 'h1' | 'h2' | 'h3' | 'p' | 'link'; text: string; href?: string; kind?: string; }
export interface ContentBlock { id: string; label: string; anchor?: string | null; eyebrow?: string | null; nodes: ContentNode[]; }
export interface BlogImage { src: string; srcset: string; width: number; height: number; alt: string; }
export interface EditorialPage { id: string; lang: Language; name: string; route: string; title: string; description: string; blocks: ContentBlock[]; isLegal?: boolean; index?: number; isArticle?: boolean; alternates?: Partial<Record<Language, string>>; }
export interface BlogArticle extends EditorialPage { heading: string; slug: string; publishDate: string; updatedDate: string; author: string; category: string; image: BlogImage | null; html: string; toc: {id: string; text: string}[]; readingMinutes: number; }
