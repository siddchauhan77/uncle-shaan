import contentData from "@/data/content.json";

export type ContentEntry = {
  id: string;
  quote: string;
  full_excerpt: string;
  source_url: string;
  source_title: string;
  date: string;
  type: "essay" | "newsletter";
  themes: string[];
  life_situations: string[];
  oracle_eligible: boolean;
  scrollytelling_eligible: boolean;
};

const content: ContentEntry[] = contentData as ContentEntry[];

export function getOracleCards(): ContentEntry[] {
  return content.filter((c) => c.oracle_eligible);
}

export function getScrollytellingCards(): ContentEntry[] {
  return content.filter((c) => c.scrollytelling_eligible);
}

export function getContentMetadata() {
  return content.map(({ id, source_title, source_url, date, themes, life_situations }) => ({
    id,
    source_title,
    source_url,
    date,
    themes,
    life_situations,
  }));
}

export function getEntryById(id: string): ContentEntry | undefined {
  return content.find((c) => c.id === id);
}

export function getEntriesByIds(ids: string[]): ContentEntry[] {
  return ids.map((id) => content.find((c) => c.id === id)).filter(Boolean) as ContentEntry[];
}

export default content;
