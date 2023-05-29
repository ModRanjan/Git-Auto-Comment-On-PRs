export type PRStatDataType = {
  totalPRs: number;
  totalOpenPRs: number;
};

export type PRsDataType = {
  autoComment: boolean;
  repoId: number;
  repoTitle: string;
  PRId: number;
  PRTitle: string;
  html_url: string;
  changed_files: number;
  status: boolean;
  from_branch: string;
  to_branch: string;
  numberOfPRs: number;
  numberOfCommits: number;
  user_avatar?: string;
  userId: number;
};
