import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { HiMiniPlus } from "react-icons/hi2"
import { ThemeProvider } from '@mui/material/styles'
import { MaterialReactTable } from 'material-react-table'
import { useGetMembers } from '../../hooks/useGetMembers'

export default function Dashboard({ getGreeting, tableTheme }) {

    const { members, loading, getMembers } = useGetMembers()
    const totalCBU = members.reduce((sum, member) => sum + member.cbu, 0) // get the overall total of CBU
    const totalRegularSavings = members.reduce((sum, member) => sum + member.regular_savings, 0) // get the overall total of Regular Savings

    return (
        <Chakra.Box w='100%'>
            {/* Greetings */}
            <Chakra.Box w='100%' display='flex' alignItems='center'>
                <Chakra.Box w='50%' display='flex' flexDirection='column'>
                    <Chakra.Heading fontSize='1.5vw' display='flex'>
                        Good {getGreeting()}
                        <Chakra.Highlight query="Admin" styles={{ ml: '.3vw', color: "secondary" }}>Admin</Chakra.Highlight>
                    </Chakra.Heading>
                    <Chakra.Text>May your {getGreeting()} be filled with positive thoughts.</Chakra.Text>
                </Chakra.Box>
                {/* Loan Form Button */}
                <Chakra.Box w='50%' display='flex' alignItems='center' justifyContent='right'>
                    <Chakra.Button variant='outlined' h='2.2vw' fontSize='.7vw' fontWeight='bold' outline='none'><Chakra.Icon as={HiMiniPlus} boxSize='sm' />Loan Form</Chakra.Button>
                </Chakra.Box>
            </Chakra.Box>
            <Chakra.Card.Root mt='2.5vw' p='1vw'>
                <Chakra.Box display='flex' alignItems='end' justifyContent='space-between'>
                    <Chakra.Text variant='heading'>Capital and Savings Profile (as of Dec 2024)</Chakra.Text>
                    <Chakra.Button onClick={getMembers} h='2vw' fontSize='.7vw' fontWeight='bold' textTransform='uppercase'>Refresh</Chakra.Button>
                </Chakra.Box>
                <Chakra.Box h='.1px' mt='.9vw' mb='1vw' bg='rgba(136, 136, 136, 0.42)' />
                <ThemeProvider theme={tableTheme}>
                    <MaterialReactTable
                        columns={[
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
                        ]}
                        data={members}
                        muiTableHeadCellProps={{ sx: { fontSize: '.8vw' } }}
                        muiTableBodyCellProps={{ sx: { fontSize: '.8vw', textTransform: 'capitalize' } }}
                        enableStickyHeader={true}
                        enableRowActions={false}
                        enableColumnActions={false}
                        initialState={{
                            density: 'compact', pagination: { pageSize: 15, pageIndex: 0 },
                            columnVisibility: {
                                last_name: true,
                                middle_initial: false,
                                first_name: true,
                                cbu: true,
                                regular_savings: true,
                                totals: true
                            }
                        }}
                    />
                </ThemeProvider>
            </Chakra.Card.Root>
        </Chakra.Box>
    )
}
