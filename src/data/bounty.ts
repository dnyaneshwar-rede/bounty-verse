// types/bounty.ts
export type BountyCreateForm = {
    title: string;
    contentHtml: string;
    reward: number;
    deadline?: Date;
    attachments?: string[];
  };