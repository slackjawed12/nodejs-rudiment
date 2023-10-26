import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// default table 이름 : users
export default mongoose.model("User", userSchema);
// 테이블 수동 설정
// export default mongoose.model("User", userSchema, 'user_table');
