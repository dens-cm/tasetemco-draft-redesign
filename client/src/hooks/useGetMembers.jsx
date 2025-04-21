/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { fetchMembers } from "../api/Requests"
import Toast from '../components/toast/Toast'

export const useGetMembers = () => {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(false)
    const showToast = Toast()

    const getMembers = async () => {
        setLoading(true)

        try {
            const data = await fetchMembers()
            const formattedData = data.map(member => ({
                ...member,
                cbu: parseFloat(member.cbu.replace(/,/g, '')),
                regular_savings: parseFloat(member.regular_savings.replace(/,/g, '')),
                totals: parseFloat(member.totals.replace(/,/g, ''))
            }))
            setMembers(formattedData)
        } catch (error) {
            showToast({ title: 'Error', description: `${error.message}`, status: 'error', variant: 'solid', position: 'top' })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMembers()
    }, [])

    return { members, loading, getMembers }
}