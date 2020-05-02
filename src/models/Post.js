import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      ref: "users",
      required: true,
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.plugin(paginate);
const Post = model("posts", PostSchema);
export default Post;
