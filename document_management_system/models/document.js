import mongoose from "mongoose";
const docSchema = new mongoose.Schema({
    title: String,
    require: true
})

const document = mongooose.model("doc", docSchema)
export default document