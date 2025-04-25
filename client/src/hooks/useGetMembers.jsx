/* eslint-disable react-hooks/exhaustive-deps */
import * as Chakra from '@chakra-ui/react'
import { useState, useEffect } from "react"
import { fetchMembers } from "../api/Requests"
import Toast from '../components/toast/Toast'

export const useGetMembers = () => {
    const [members, setMembers] = useState([])
    const [membersColumn, setMembersColumn] = useState([])
    const [loading, setLoading] = useState(false)
    const showToast = Toast()

    const getMembers = async () => {
        setLoading(true)
        setMembersColumn([
            {
                accessorKey: 'last_name',
                header: 'Lastname',
                size: 250
            },
            {
                accessorKey: 'middle_initial',
                header: 'Middle Initial'
            },
            {
                accessorKey: 'first_name',
                header: 'Firstname', size: 250
            },
            {
                accessorKey: 'cbu',
                header: 'CBU',
                size: 10,
                muiTableHeadCellProps: { sx: { '& .Mui-TableHeadCell-Content': { fontSize: '.8vw', justifyContent: 'right' } } },
                Cell: ({ cell }) => (
                    <Chakra.Box textAlign='right'>
                        {Number(cell.getValue()).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Chakra.Box>
                )
            },
            {
                accessorKey: 'regular_savings', header: 'Regular Savings',
                muiTableHeadCellProps: { sx: { '& .Mui-TableHeadCell-Content': { fontSize: '.8vw', justifyContent: 'right' } } },
                Cell: ({ cell }) => (
                    <Chakra.Box textAlign='right'>
                        {Number(cell.getValue()).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Chakra.Box>
                )
            },
            {
                accessorKey: 'totals', header: 'Totals',
                muiTableHeadCellProps: { sx: { '& .Mui-TableHeadCell-Content': { fontSize: '.8vw', justifyContent: 'right' } } },
                Cell: ({ cell }) => (
                    <Chakra.Box textAlign='right'>
                        {Number(cell.getValue()).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Chakra.Box>
                )
            }
        ])

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

    return { members, membersColumn, loading, getMembers }
}