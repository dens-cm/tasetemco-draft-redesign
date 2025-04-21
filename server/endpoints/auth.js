import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js"

const router = express.Router()

// access token
const generateAccessToken = (userId, isAdmin) => {
    return jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

// refresh token
const generateRefreshToken = (userId, isAdmin) => {
    return jwt.sign({ userId, isAdmin }, process.env.REFRESH_SECRET, { expiresIn: '1d' })
}

router.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(404).json({ error: "No account found with this email" })

        const isMatch = await user.comparePassword(password)
        if (!isMatch) return res.status(400).json({ error: "Incorrect password" })

        // tokens
        const accessToken = generateAccessToken(user._id, user.is_admin)
        const refreshToken = generateRefreshToken(user._id, user.is_admin)

        // Store refresh token in HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        res.status(200).json({ accessToken })
    } catch (err) {
        res.status(500).json({ error: `Error logging in: ${err}` })
    }
})

router.post("/signup", async (req, res) => {
    const { email, password, is_admin } = req.body

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" })
        }

        const newUser = new User({
            email,
            password,
            is_admin
        })

        await newUser.save()
        const accessToken = generateAccessToken(newUser._id)
        const refreshToken = generateRefreshToken(newUser._id)

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })

        res.status(201).json({ message: 'Account created successfully', accessToken })
    } catch (error) {
        res.status(500).json({ error: `Failed to create account: ${error}` })
    }
})

router.post("/logout", (req, res) => {
    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })

    res.status(200).json({ message: "Logout successfully" })
})

router.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) return res.status(401).json({ error: "Refresh token required" })

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid refresh token" })

        const accessToken = generateAccessToken(decoded.userId, decoded.isAdmin)
        res.json({ accessToken })
    })
})

export default router