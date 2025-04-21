import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_admin: { type: Boolean, required: true, default: false }
})

const Account = mongoose.model('accounts', accountSchema)

export { Account }
