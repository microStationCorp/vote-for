import { NewPollInterface } from "@/utils/interfaces";
import mongoose from "mongoose";

const NewPollSchema = new mongoose.Schema<NewPollInterface>({
  subject: {
    type: String,
    required: true,
  },
  totalNominations: {
    type: Number,
    required: true,
  },
  nominations: [
    {
      nomination: {
        type: String,
        required: true,
      },
      totalVote: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  pollDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.NewPoll ||
  mongoose.model("NewPoll", NewPollSchema);
