import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  }
},
{
    timestamps: true
}
);

const goalModel = mongoose.model("goal", goalSchema);

export default goalModel;