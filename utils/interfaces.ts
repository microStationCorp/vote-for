export interface NewPollInterface {
  subject: string;
  totalNominations: number;
  nominations: { nomination: string; totalVote?: number }[];
  pollDate?: Date;
}
