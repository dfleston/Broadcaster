export interface SocialContent {
  twitter: string;
  instagram: string;
  youtube: string;
}

export enum WorkflowStatus {
  IDLE = 'idle',
  GENERATING_STORY = 'generating_story',
  GENERATING_SOCIAL = 'generating_social',
  GENERATING_IMAGES = 'generating_images',
  COMPLETED = 'completed',
  ERROR = 'error'
}

export interface AgentState {
  seed: string;
  story: string;
  socialContent: SocialContent | null;
  images: string[];
  status: WorkflowStatus;
  error?: string;
}