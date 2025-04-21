import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, required: true }
})

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
})

// Compare password method
UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
}
export const User = mongoose.model("users", UserSchema)

