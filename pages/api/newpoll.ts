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
  const { subject, nominationCounter, nominations } = req.body;
  const parsing_data: NewPollInterface = {
    subject,
    totalNominations: nominationCounter,
    nominations,
  };
  switch (method) {
    case "POST":
      const newpoll = new NewPoll(parsing_data);
      const doc = await newpoll.save();
      res.status(200).json({ msg: "ok", doc });
      break;
    default:
      res.status(405).json({ msg: "wrong method" });
  }
}
