export interface Feature {
  id: string;
  title: string;
  description: string;
  videoUrl?: string;
  component: string;
}

export interface FeatureNavigationProps {
  features: Feature[];
  activeFeature: string;
  onFeatureSelect: (featureId: string) => void;
}

export interface VideoFeatureProps {
  imageUrl: string;
  altText: string;
}

export interface FeatureDescriptionProps {
  title: string;
  description: string;
}

export interface BottomSectionProps {
  instructionText: string;
  onExit: () => void;
}
