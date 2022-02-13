export interface NewPollInterface {
  subject: string;
  totalNominations: number;
  nominations: { nomination: string }[];
  pollDate?: Date;
}
