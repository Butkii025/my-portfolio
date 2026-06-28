export interface ArtImage { 
  id: number; 
  name: string; 
}

export interface RangoliFact {
  icon: string;
  text: string;
}

export const ART_IMAGES: ArtImage[] = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  name: `artworks/image${i === 0 ? '' : i}.jpg`,
}));

export const RANGOLI_FACTS: RangoliFact[] = [
  { icon: '🎨', text: '50,000 disposable cups' },
  { icon: '📐', text: '2,500 sq. ft. coverage' },
  { icon: '🏛️', text: 'Bhoomi Fest 2026, Lucknow University' },
  { icon: '🕊️', text: 'Tribute to Pahalgam victims' },
  { icon: '🤝', text: 'Collaboration With SFD-Awadh' },
];