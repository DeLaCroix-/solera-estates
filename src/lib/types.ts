export type Language = 'es' | 'en';
export type ImageName = 'hero' | 'staircase' | 'living' | 'terrace';
export interface ContentNode { type: 'h1' | 'h2' | 'h3' | 'p' | 'link'; text: string; href?: string; kind?: string; }
export interface ContentBlock { id: string; label: string; anchor?: string | null; eyebrow?: string | null; nodes: ContentNode[]; }
export interface EditorialPage { id: string; lang: Language; name: string; route: string; title: string; description: string; blocks: ContentBlock[]; isLegal?: boolean; index?: number; }
