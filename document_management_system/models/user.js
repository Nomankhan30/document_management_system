import mongoose from "mongoose"
import bcrypt from "bcryptjs"
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
userSchema.methods.comparePassword = async function (plainpassword) {
    return await bcrypt.compare(plainpassword, this.password)
}
userSchema.pre("save", async function () {
    if (!this.isModified("refreshToken")) {
        return  //if nothing changes
    }
    console.log("REFRESH TOKEN IS HASHED FROM PRE SAVE()", this.refreshToken)
    if (this.refreshToken !== null) {
        console.log("bcrypt se pehlay")
        this.refreshToken = await bcrypt.hash(this.refreshToken, 11)
    }

})
const User = mongoose.model("user", userSchema)
export default User