import * as mongoose from "mongoose";

export const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
})