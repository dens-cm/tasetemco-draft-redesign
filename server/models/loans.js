import mongoose from 'mongoose'

const loanSchema = new mongoose.Schema({
    user_id: { type: String, required: false },
    first_name: { type: String, required: true },
    middle_initial: { type: String, required: true },
    last_name: { type: String, required: true },
    loan_date: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    name_of_spouse: { type: String, required: true },
    purpose_of_loan: { type: String, required: true },
    loan_amount: { type: String, required: true },
    term_of_payment: { type: String, required: true },
    type_of_loan: { type: String, required: true },
    loan_action: { type: String }
})

const Loan = mongoose.model('loans', loanSchema)

export { Loan }
