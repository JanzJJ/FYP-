
export type ReportStep = 'location' | 'media' | 'details' | 'action';

export interface LocationData {
  address: string;
  lat: number;
  lng: number;
}

export interface ReportData {
  location: LocationData | null;
  media: string[];
  description: string;
  action: 'adopt' | 'care' | 'report' | null;
}

export type View = 'home' | 'report' | 'adopt' | 'info' | 'disease' | 'login';

export interface AnalysisResult {
  imageUrl: string;
  matches: {
    name: string;
    confidence: number;
  }[];
  careAdvice: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CLEAR';
}

export interface StrayDog {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  status: 'Ready for Adoption' | 'In Temporary Care' | 'Newly Reported';
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'Adoption Drive' | 'Vaccination Camp' | 'Fundraiser';
}
