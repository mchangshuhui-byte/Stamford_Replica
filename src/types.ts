export interface CardItem {
  id: string;
  title: string;
  category: 'Workshop' | 'Tool' | 'Story' | 'Project' | 'Book' | 'Deck';
  tag: string;
  description: string;
  longDescription: string;
  price?: number;
  imageUrl?: string;
  duration?: string;
  groupSize?: string;
  materials?: string[];
  steps?: { name: string; instruction: string; time: string; }[];
  whyItWorks?: string;
  spanClass?: string;
  bgColorClass: string;
  textColorClass: string;
  tagBgClass: string;
  tagTextClass: string;
  interactiveLink?: string;
}

export interface GeneratedMethod {
  title: string;
  category: string;
  duration: string;
  groupSize: string;
  tag: string;
  description: string;
  materials: string[];
  steps: { name: string; instruction: string; time: string; }[];
  whyItWorks: string;
}

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

export interface CustomerDetails {
  name: string;
  email: string;
  address: string;
}

export interface CustomUserTool {
  id: string;
  title: string;
  category: 'Workshop' | 'Tool' | 'Story' | 'Project';
  tag: string;
  description: string;
  steps: { name: string; instruction: string; time: string; }[];
  bgColor: string;
  createdAt: string;
}
