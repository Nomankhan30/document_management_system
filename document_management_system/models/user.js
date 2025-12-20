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
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }, //shortcut notation
    refreshToken: {
        type: String,
        default: null,
        select: false
    }

})
//document level function
userSchema.methods.comparePassword = async (plainpassword) => {
    return await bcrypt.compare(plainpassword, this.password)
}
userSchema.pre("save", function () {
    console.log("REFRESH TOKEN IS HASHED FROM PRE SAVE()")
    this.refreshToken = hash(this.refreshToken)
})
const User = mongoose.model("user", userSchema)
export default User