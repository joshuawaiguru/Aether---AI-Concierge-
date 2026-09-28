export type TabType = 'chat' | 'itinerary' | 'lounge' | 'services';

export interface Mission {
  id: string;
  time: string;
  category: string;
  status: string;
  statusBadgeColor?: string;
  title: string;
  subtitle: string;
  image?: string;
  badgeDetail?: string;
  sommelierPairing?: {
    wine: string;
    description: string;
  };
  bentoStats?: {
    climate: string;
    luminescence: string;
    acoustics: string;
  };
}

export interface LuxuryService {
  id: string;
  title: string;
  description: string;
  category: 'aviation' | 'travel' | 'horology' | 'wellness' | 'art';
  price: string;
  pricePeriod: string;
  image: string;
  location?: string;
  subLocation?: string;
  statusBadge: string;
  subBadge?: string;
  tags?: string[];
  specs?: {
    label: string;
    val: string;
  }[];
  actionLabel: string;
  actionIcon: string;
}

export interface ShaderPreset {
  id: string;
  name: string;
  edge: number;
  rim: number;
  distort: number;
  ripple: number;
  blur: number;
  tint: number;
  shape?: 'rounded-rect' | 'pill' | 'circle';
}

export interface ChatMessage {
  id: string;
  sender: 'aether' | 'user';
  text: string;
  timestamp: string;
  actionCard?: {
    type: 'flight' | 'wine' | 'mission';
    title: string;
    details: string;
  };
}
