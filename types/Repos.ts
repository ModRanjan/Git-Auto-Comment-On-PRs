export type ReposType = {
  id: number;
  avtarUrl?: string;
  projectName: string;
  branch: string;
  description?: string;
  commit?: string;
  time?: Date;
  repoURL: string;
  isHookExists: boolean;
};
