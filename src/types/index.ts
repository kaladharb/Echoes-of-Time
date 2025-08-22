export interface Location {
  id: string;
  title: string;
  location: string;
  year: string;
  period: string;
  thenImage: string;
  nowImage: string;
  thumbnail: string;
  gallery: string[];
  story: {
    overview: string[];
    historical: string[];
    changes: string[];
    significance: string[];
  };
  tags: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
  rulers?: Ruler[];
  architecture?: ArchitecturalDetails;
}

export interface Ruler {
  name: string;
  title: string;
  reign: string;
  portrait: string;
  achievements: string[];
  dynasty: string;
}

export interface ArchitecturalDetails {
  style: string;
  materials: string[];
  features: string[];
  dimensions?: string;
}

export interface Era {
  id: string;
  name: string;
  period: string;
  description: string;
  keyRulers: Ruler[];
  majorAchievements: string[];
  culturalHighlights: string[];
  architecture: string[];
  image: string;
  locations: string[];
}