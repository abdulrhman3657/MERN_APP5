import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user' // 'user' is the name of the model in mongoose.model("user", userSchema)
  },
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