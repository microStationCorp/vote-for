import dbConnect from "@/utils/dbConnect";
import { NewPollInterface } from "@/utils/interfaces";
import { NextApiRequest, NextApiResponse } from "next";
import NewPoll from "@/model/pollModel";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  dbConnect();
  const method = req.method;
  const { subject, totalNominations, nominations }: NewPollInterface = req.body;
  const parsing_data: NewPollInterface = {
    subject,
    totalNominations,
    nominations,
  };
  switch (method) {
    case "POST":
      try {
        const newpoll = new NewPoll(parsing_data);
        const doc = await newpoll.save();
        res.status(200).json({ msg: "ok", doc });
      } catch {
        res.status(500).json({ msg: "error occured" });
      }
      break;
    default:
      res.status(405).json({ msg: "wrong method" });
  }
}
