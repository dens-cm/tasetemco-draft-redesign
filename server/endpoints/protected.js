import express from 'express'
import authenticateUser from '../middleware/auth.js'
import { Loan } from '../models/loans.js'
import { Members } from '../models/members.js'

const router = express.Router()

router.get("/tasetemco", authenticateUser, (req, res) => {
    res.json({ message: 'Access granted', user: req.user })
})

router.post("/submit-loan", authenticateUser, async (req, res) => {
    const { user_id, first_name, middle_initial, last_name, loan_date, gender, address, name_of_spouse, purpose_of_loan, loan_amount, term_of_payment, type_of_loan, loan_action } = req.body

    // review fields
    if (!first_name || !middle_initial || !last_name || !loan_date || !gender || !address || !name_of_spouse || !purpose_of_loan || !loan_amount || !term_of_payment || !type_of_loan || !loan_action) {
        return res.status(400).json({ error: "Missing required loan data" })
    }

    try {
        const newLoan = new Loan({ user_id, first_name, middle_initial, last_name, loan_date, gender, address, name_of_spouse, purpose_of_loan, loan_amount, term_of_payment, type_of_loan, loan_action })

        await newLoan.save()
        res.status(201).json({ message: "Loan submitted successfully", loan: newLoan })
    } catch (error) {
        res.status(500).json({ error: `Failed to submit loan: ${error.message}` })
    }
})

router.get("/loans", authenticateUser, async (req, res) => {
    try {
        const loans = await Loan.find()
        res.status(200).json(loans)
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch data: ${error.message}` })
    }
})

router.get("/members", authenticateUser, async (req, res) => {
    try {
        const members = await Members.find()
        res.status(200).json(members)
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch data: ${error.message}` })
    }
})

export default router

