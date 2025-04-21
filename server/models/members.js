import mongoose from 'mongoose'

const membersSchema = new mongoose.Schema({
    first_name: { type: String, required: false },
    middle_initial: { type: String, required: true },
    last_name: { type: String, required: true },
    cbu: { type: String, required: true },
    regular_savings: { type: String, required: true },
    totals: { type: String, required: true }
})

const Members = mongoose.model('members', membersSchema)

export { Members }
