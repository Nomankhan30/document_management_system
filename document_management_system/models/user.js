import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
    },
    role: String, //shortcut notation

})

const user = mongoose.model("user", userSchema)
export default user