import React from 'react'
import * as Chakra from '@chakra-ui/react'
import { HiMiniPlus, HiArrowPath, HiCalendarDateRange, HiMiniCalendarDateRange } from "react-icons/hi2"
import { VictoryPie, VictoryTheme, VictoryLegend, VictoryChart, VictoryBar, VictoryAxis } from "victory"
import { ThemeProvider } from '@mui/material/styles'
import { MaterialReactTable } from 'material-react-table'
import { useGetMembers } from '../../hooks/useGetMembers'
import { useGetProducts } from '../../hooks/useGetProducts'

export default function Dashboard({ greetings, tableTheme }) {

    const { members, membersColumn, loading, getMembers } = useGetMembers()
    const { products, productsColumns } = useGetProducts()
    const totalCBU = members.reduce((sum, member) => sum + member.cbu, 0) // get the overall total of CBU
    const totalRegularSavings = members.reduce((sum, member) => sum + member.regular_savings, 0) // get the overall total of Regular Savings

    return (
        <Chakra.Box w='100%'>
            
            {/* Greetings */}
            <Chakra.Box w='100%' display='flex' alignItems='center'>
                <Chakra.Box w='50%' display='flex' flexDirection='column'>
                    <Chakra.Heading fontSize='1.5vw' display='flex'>
                        Good {greetings()}
                        <Chakra.Highlight query="Admin" styles={{ ml: '.3vw', color: "secondary" }}>Admin</Chakra.Highlight>
                    </Chakra.Heading>
                    <Chakra.Text>May your {greetings()} be filled with positive thoughts.</Chakra.Text>
                </Chakra.Box>
                {/* Loan Form Button */}
                <Chakra.Box w='50%' display='flex' alignItems='center' justifyContent='right'>
                    <Chakra.Button variant='outlined' h='2.2vw' fontSize='.7vw' fontWeight='bold' outline='none'><Chakra.Icon as={HiMiniPlus} boxSize='sm' />Loan Form</Chakra.Button>
                </Chakra.Box>
            </Chakra.Box>

            {/* Capital and Savings Profile */}
            <Chakra.Card.Root mt='1.5vw' p='1vw' bg='rgba(255, 255, 255, 0.57)' boxShadow='0 .1vw .8vw 0 rgba(168, 168, 168, 0.34)' backdropFilter='blur(1.7vw)'>
                <Chakra.Box display='flex' alignItems='end' justifyContent='space-between'>
                    <Chakra.Text variant='heading'>Capital and Savings Profile (as of Dec 2024)</Chakra.Text>
                    <Chakra.Button onClick={getMembers} loading={loading} disabled={loading} h='2vw' fontSize='.7vw' fontWeight='bold' textTransform='uppercase'><Chakra.Icon as={HiArrowPath} boxSize='sm' /> Refresh</Chakra.Button>
                </Chakra.Box>
                <Chakra.Box h='.1px' mt='.9vw' mb='1vw' bg='rgba(123, 123, 123, 0.25)' />
                {
                    loading ? (
                        <Chakra.Box w='100%' p='2vw' display='flex' justifyContent='center'>
                            <Chakra.Spinner color='accent' mr='.5vw' boxSize='xlg' />
                            <Chakra.Text fontStyle='italic'>Fetching data</Chakra.Text>
                        </Chakra.Box>
                    ) : (
                        <ThemeProvider theme={tableTheme}>
                            <MaterialReactTable
                                columns={membersColumn}
                                data={members}
                                muiTableHeadCellProps={{ sx: { fontSize: '.8vw', backgroundColor: 'transparent' } }}
                                muiTableHeadRowProps={{ sx: { backgroundColor: 'transparent' } }}
                                muiTableBodyCellProps={{ sx: { fontSize: '.8vw', textTransform: 'capitalize' } }}
                                muiTablePaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none' } }}
                                muiTableBodyRowProps={{ sx: { backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' } } }}
                                muiBottomToolbarProps={{ sx: { backgroundColor: 'transparent' } }}
                                muiTopToolbarProps={{ sx: { backgroundColor: 'transparent' } }}
                                muiTableHeadProps={{ sx: { backgroundColor: 'transparent' } }}
                                enableStickyHeader={false}
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
                    )
                }
            </Chakra.Card.Root>

            {/* TASETEMCO Holdings Profile */}
            <Chakra.Card.Root mt='1vw' p='1vw' bg='rgba(255, 255, 255, 0.57)' boxShadow='0 .1vw .8vw 0 rgba(168, 168, 168, 0.34)' backdropFilter='blur(1.7vw)'>
                <Chakra.Box p='1vw'>
                    <Chakra.Text variant='heading' textAlign='center'>TASETEMCO Holdings Profile</Chakra.Text>
                </Chakra.Box>
                {
                    loading ? (
                        <Chakra.Box w='100%' p='2vw' display='flex' justifyContent='center'>
                            <Chakra.Spinner color='accent' mr='.5vw' boxSize='xlg' />
                            <Chakra.Text fontStyle='italic'>Fetching data</Chakra.Text>
                        </Chakra.Box>
                    ) : (
                        <Chakra.Box w='100%' h='20vw' mt='1vw' mb='1vw' display='flex'>
                            <Chakra.Box w='30%' pl='13%' display='flex' alignItems='center' justifyContent='right'>
                                <VictoryLegend
                                    orientation="vertical"
                                    data={[
                                        { name: "CBU", symbol: { fill: "#5c8001", type: "circle" } },
                                        { name: "Reg Savings", symbol: { fill: "#fb6107", type: "circle" } },
                                    ]}
                                    style={{ labels: { fontSize: 30 } }}
                                />
                            </Chakra.Box>
                            <Chakra.Box w='70%'>
                                <VictoryPie
                                    data={[
                                        { y: totalCBU, label: `${(totalCBU / (totalCBU + totalRegularSavings) * 100).toFixed(1)}%` },
                                        { y: totalRegularSavings, label: `${(totalRegularSavings / (totalCBU + totalRegularSavings) * 100).toFixed(1)}%` }
                                    ]}
                                    colorScale={["#5c8001", "#fb6107"]}
                                    theme={VictoryTheme.material}
                                    innerRadius={130}
                                    padAngle={3}
                                    cornerRadius={25}
                                    labelRadius={160}
                                    width={550}
                                    height={550}
                                    style={{ labels: { fontSize: 20, fontWeight: 'bold', fill: 'white' }, data: { filter: "url(#pieShadow)", stroke: "none" } }}
                                />
                            </Chakra.Box>
                        </Chakra.Box>
                    )
                }
                <Chakra.Box p='1vw'>
                    <Chakra.Text variant='heading' color='primary' fontSize='xsm' fontWeight='400' fontStyle='italic' textAlign='center' textTransform='uppercase'>Percentage of TASETEMCO Holdings Profile (%)</Chakra.Text>
                </Chakra.Box>
            </Chakra.Card.Root>
            <Chakra.Box w='100%' display='flex' justifyContent='space-between'>

                {/* Total Applicants for this Loan */}
                <Chakra.Card.Root w='50%' mt='1vw' mr='.5vw' p='1.5vw' bg='rgba(255, 255, 255, 0.57)' boxShadow='0 .1vw .8vw 0 rgba(168, 168, 168, 0.34)' backdropFilter='blur(1.7vw)'>
                    <Chakra.Text fontSize='xsm' variant='heading' textTransform='uppercase' textAlign='center'>Total Applicants for this Loan</Chakra.Text>
                    <Chakra.Text mt='.5vw' color='primary' textTransform='uppercase' textAlign='center'>Breakdown Date</Chakra.Text>
                    <Chakra.Text color='primary' textAlign='center'>October 27, 2024</Chakra.Text>
                    <Chakra.Text color='primary' mt='1.7vw' display='flex' alignItems='center'><Chakra.Icon as={HiCalendarDateRange} mr='.3vw' /> <b>Date Filter:</b> [ October 27, 2024 ] to [ October 28, 2024 ]</Chakra.Text>
                    <Chakra.Box w='100%' h='20vw' mt='.5vw' display='flex'>
                        <Chakra.Box w='50%' display='flex' justifyContent='right'>
                            <VictoryLegend
                                orientation="vertical"
                                data={[
                                    { name: "Providential", symbol: { fill: "#014709", type: "circle" } },
                                    { name: "Entrepreneurial", symbol: { fill: "#517601", type: "circle" } },
                                    { name: "Emergency", symbol: { fill: "#649200", type: "circle" } },
                                    { name: "Others", symbol: { fill: "#94C507", type: "circle" } },
                                ]}
                                style={{ labels: { fontSize: 20 } }}
                            />
                        </Chakra.Box>
                        <Chakra.Box w='50%'>
                            <VictoryPie
                                innerRadius={100}
                                data={[
                                    { x: "Providential", y: 30 },
                                    { x: "Entrepreneurial", y: 35 },
                                    { x: "Emergency", y: 20 },
                                    { x: "Others", y: 25 }
                                ]}
                                theme={VictoryTheme.material}
                                colorScale={["#014709", "#517601", "#649200", "#94C507"]}
                                labels={() => null}
                                padAngle={3}
                                cornerRadius={25}
                                width={500}
                                height={500}
                                style={{ data: { filter: "url(#pieShadow)", stroke: "none" } }}
                            />
                        </Chakra.Box>
                    </Chakra.Box>
                </Chakra.Card.Root>

                {/* WRS Sales Report */}
                <Chakra.Card.Root w='50%' mt='1vw' ml='.5vw' p='1.5vw' bg='rgba(255, 255, 255, 0.57)' boxShadow='0 .1vw .8vw 0 rgba(168, 168, 168, 0.34)' backdropFilter='blur(1.7vw)'>
                    <Chakra.Text fontSize='xsm' variant='heading' textTransform='uppercase' textAlign='center'>WRS Sales Report</Chakra.Text>
                    <Chakra.Text mt='.5vw' color='primary' textTransform='uppercase' textAlign='center'>Daily Breakdown Date</Chakra.Text>
                    <Chakra.Text color='primary' textAlign='center'>October 27, 2024</Chakra.Text>
                    <Chakra.Text color='primary' mt='1.7vw' display='flex' alignItems='center'><Chakra.Icon as={HiCalendarDateRange} mr='.3vw' /> <b>Date Filter:</b> [ October 27, 2024 ] to [ October 28, 2024 ]</Chakra.Text>
                    <Chakra.Box w='100%' h='20vw' mt='.5vw' display='flex'>
                        <VictoryChart domainPadding={15} height={200} theme={VictoryTheme.material} >
                            <VictoryAxis
                                dependentAxis
                                domain={[0, 100]}
                                tickValues={[0, 20, 40, 60, 80, 100]}
                                style={{
                                    tickLabels: {
                                        fontSize: 8,
                                        fontWeight: 'bold',
                                        padding: 5
                                    }
                                }}
                            />
                            <VictoryAxis
                                tickFormat={(t) => t}
                                style={{
                                    tickLabels: {
                                        angle: -25,
                                        textAnchor: 'end',
                                        fontSize: 7
                                    }
                                }}
                            />
                            <VictoryBar data={[
                                { x: "5-Gallon Refill", y: 90 },
                                { x: "1-Gallon Refill", y: 45 },
                                { x: "Half-Gallon Refill", y: 50 },
                                { x: "500 ml Refill", y: 60 },
                                { x: ".", y: 20 },
                                { x: "..", y: 10 },
                                { x: "...", y: 70 },
                                { x: "....", y: 80 },
                                { x: ".....", y: 50 },
                                { x: "......", y: 20 },
                                { x: ".......", y: 35 }
                            ]}
                                barWidth={15}
                                cornerRadius={{ top: 8 }}
                                style={{
                                    data: { fill: "#649200" }
                                }}
                            />
                        </VictoryChart>
                    </Chakra.Box>
                </Chakra.Card.Root>
            </Chakra.Box>
            <Chakra.Box w='100%' display='flex' justifyContent='space-between'>

                {/* Products */}
                <Chakra.Card.Root w='70%' mt='1vw' mr='.5vw' p='1.5vw' bg='rgba(255, 255, 255, 0.57)' boxShadow='0 .1vw .8vw 0 rgba(168, 168, 168, 0.34)' backdropFilter='blur(1.7vw)'>
                    <Chakra.Text fontSize='xsm' variant='heading' textTransform='uppercase'>Products</Chakra.Text>
                    <Chakra.Box h='.1px' mt='.9vw' mb='1vw' bg='rgba(123, 123, 123, 0.25)' />
                    <ThemeProvider theme={tableTheme}>
                        <MaterialReactTable
                            columns={productsColumns.map((column) => ({
                                ...column,
                                size: 'auto'
                            }))}
                            data={products}
                            muiTableHeadCellProps={{ sx: { fontSize: '.8vw', backgroundColor: 'transparent' } }}
                            muiTableHeadRowProps={{ sx: { backgroundColor: 'transparent' } }}
                            muiTableBodyCellProps={{ sx: { fontSize: '.8vw', textTransform: 'capitalize' } }}
                            muiTablePaperProps={{ sx: { backgroundColor: 'transparent', boxShadow: 'none' } }}
                            muiTableBodyRowProps={{ sx: { backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent' } } }}
                            muiBottomToolbarProps={{ sx: { backgroundColor: 'transparent' } }}
                            muiTopToolbarProps={{ sx: { backgroundColor: 'transparent' } }}
                            muiTableHeadProps={{ sx: { backgroundColor: 'transparent' } }}
                            enableStickyHeader={false}
                            enableRowActions={false}
                            initialState={{ density: 'compact' }}
                        />
                    </ThemeProvider>
                </Chakra.Card.Root>

                {/* Sales percentage */}
                <Chakra.Card.Root w='30%' mt='1vw' ml='.5vw' p='1.5vw' display='flex' alignItems='center' justifyContent='center' bg='rgba(255, 255, 255, 0.57)' boxShadow='0 .1vw .8vw 0 rgba(168, 168, 168, 0.34)' backdropFilter='blur(1.7vw)'>
                    <Chakra.Text color='primary'>Sales Percentage</Chakra.Text>
                    <Chakra.Heading m='2vw' fontSize='2.5vw'>25%</Chakra.Heading>
                    <Chakra.Text color='primary'>Best-Selling Product</Chakra.Text>
                    <Chakra.Text variant='heading'>Mango Ice Candy</Chakra.Text>
                    <Chakra.Text m='2vw' color='primary' textAlign='center'>Mango Ice Candy accounts for 25% of total daily sales, making it the top-selling product for this report.</Chakra.Text>
                </Chakra.Card.Root>
            </Chakra.Box>
            <Chakra.Card.Root mt='1vw' p='1vw' bg='rgba(255, 255, 255, 0.57)' boxShadow='0 .1vw .8vw 0 rgba(168, 168, 168, 0.34)' backdropFilter='blur(1.7vw)'>
                <Chakra.Box p='1vw'>
                    <Chakra.Text variant='heading' textAlign='center'>TABON SECONDARY TEACHERS, EMPLOYEES AND COMMUNITY MULTI-PURPOSE COOPERATIVE (TASETEMCO MPC) <br /> Tabon, Bislig City</Chakra.Text>
                </Chakra.Box>
                <Chakra.Box w='100%' mt='1vw' display='flex' justifyContent='space-between'>

                    {/* WRS DAILY SALES REPORT */}
                    <Chakra.Box w='49.4%'>
                        <Chakra.Box w='100%' p='1vw' borderRadius='1vw' boxShadow='0 .1vw .8vw 0 rgba(168, 168, 168, 0.34)' backdropFilter='blur(1.7vw)'>
                            <Chakra.Table.Root variant='none' size='sm'>
                                <Chakra.Table.Header h='2.5vw'>
                                    <Chakra.Table.Row>
                                        <Chakra.Table.ColumnHeader borderBottom='.1vw solid' borderColor='rgba(123, 123, 123, 0.25)' colSpan={2} color='primary' fontSize='xsm'>WRS DAILY SALES REPORT</Chakra.Table.ColumnHeader>
                                    </Chakra.Table.Row>
                                </Chakra.Table.Header>
                                <Chakra.Table.Body color='primary'>
                                    <Chakra.Table.Row h='2vw' bg='transparent' display='flex' alignItems='center' justifyContent='space-between'>
                                        <Chakra.Table.Cell fontSize='xsm' fontWeight='500'><Chakra.Icon as={HiMiniCalendarDateRange} mr='.5vw' boxSize='xsm' />DATE:</Chakra.Table.Cell>
                                        <Chakra.Table.Cell></Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row h='2vw' bg='transparent' display='flex' alignItems='center' justifyContent='space-between'>
                                        <Chakra.Table.Cell fontSize='xsm'>Gross Sales:</Chakra.Table.Cell>
                                        <Chakra.Table.Cell fontSize='xsm'>₱ 10,500.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row h='2vw' bg='transparent' display='flex' alignItems='center' justifyContent='space-between'>
                                        <Chakra.Table.Cell fontSize='xsm'>Less Expense:</Chakra.Table.Cell>
                                        <Chakra.Table.Cell fontSize='xsm'></Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row h='2vw' bg='transparent' display='flex' alignItems='center' justifyContent='space-between'>
                                        <Chakra.Table.Cell fontSize='xsm'>Total Expenses</Chakra.Table.Cell>
                                        <Chakra.Table.Cell fontSize='xsm'>₱ 500.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row h='2vw' bg='transparent' display='flex' alignItems='center' justifyContent='space-between'>
                                        <Chakra.Table.Cell fontSize='xsm'>Net Sales</Chakra.Table.Cell>
                                        <Chakra.Table.Cell fontSize='xsm'>₱ 10, 000.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row h='2vw' bg='transparent' display='flex' alignItems='center' justifyContent='space-between'>
                                        <Chakra.Table.Cell fontSize='xsm' fontWeight='700'>CREDIT SALES:</Chakra.Table.Cell>
                                        <Chakra.Table.Cell fontSize='xsm'><b>₱ 2, 500.00</b></Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                </Chakra.Table.Body>
                            </Chakra.Table.Root>
                        </Chakra.Box>
                    </Chakra.Box>

                    {/* CASH BREAKDOWN */}
                    <Chakra.Box w='49.4%'>
                        <Chakra.Box w='100%' p='1vw' borderRadius='1vw' boxShadow='0 .1vw .8vw 0 rgba(168, 168, 168, 0.34)' backdropFilter='blur(1.7vw)'>
                            <Chakra.Table.Root w='100%' variant='none' size='sm'>
                                <Chakra.Table.Header h='2.5vw'>
                                    <Chakra.Table.Row>
                                        <Chakra.Table.ColumnHeader borderBottom='.1vw solid' borderColor='rgba(123, 123, 123, 0.25)' colSpan={2} color='primary' fontSize='xsm'>CASH BREAKDOWN</Chakra.Table.ColumnHeader>
                                    </Chakra.Table.Row>
                                </Chakra.Table.Header>
                                <Chakra.Table.Body w='100%' color='primary'>
                                    <Chakra.Table.Row w='100%' h='2vw' bg='transparent' display='flex' alignItems='center'>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' fontWeight='bold'>Denomination</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' fontWeight='bold' textAlign='right'># of PCS</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' fontWeight='bold' textAlign='right'>Total</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row w='100%' h='2vw' bg='transparent' display='flex' alignItems='center'>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm'>₱ 1000.00</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>3</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>₱ 3000.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row w='100%' h='2vw' bg='transparent' display='flex' alignItems='center'>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm'>₱ 500.00</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>5</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>₱ 2500.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row w='100%' h='2vw' bg='transparent' display='flex' alignItems='center'>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm'>₱ 200.00</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>8</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>₱ 1500.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row w='100%' h='2vw' bg='transparent' display='flex' alignItems='center'>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm'>₱ 100.00</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>10</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>₱ 1000.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row w='100%' h='2vw' bg='transparent' display='flex' alignItems='center'>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm'>₱ 50.00</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>20</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>₱ 1000.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row w='100%' h='2vw' bg='transparent' display='flex' alignItems='center'>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm'>₱ 20.00</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>30</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>₱ 600.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row w='100%' h='2vw' bg='transparent' display='flex' alignItems='center'>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm'>₱ 10.00</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>40</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>₱ 400.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row w='100%' h='2vw' bg='transparent' display='flex' alignItems='center'>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm'>₱ 5.00</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>50</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>₱ 250.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row w='100%' h='2vw' bg='transparent' display='flex' alignItems='center'>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm'>₱ 1.00</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>100</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>₱ 100.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row w='100%' h='2vw' bg='transparent' display='flex' alignItems='center'>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm'>₱ 0.25</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>200</Chakra.Table.Cell>
                                        <Chakra.Table.Cell w='33%' fontSize='xsm' textAlign='right'>₱ 50.00</Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                    <Chakra.Table.Row w='100%' h='2vw' bg='transparent' display='flex' alignItems='center' justifyContent='space-between'>
                                        <Chakra.Table.Cell fontSize='xsm' fontWeight='700'>GRAND TOTAL:</Chakra.Table.Cell>
                                        <Chakra.Table.Cell fontSize='xsm'><b>₱ 10, 500.00</b></Chakra.Table.Cell>
                                    </Chakra.Table.Row>
                                </Chakra.Table.Body>
                            </Chakra.Table.Root>
                        </Chakra.Box>
                        <Chakra.Text mt='1vw' color='primary'>Prepared by: <b>Adrian Morales</b></Chakra.Text>
                        <Chakra.Text mt='1vw' color='primary'>Recieved by: <b>Manager</b></Chakra.Text>
                        <Chakra.Text mt='1vw' color='primary'>Checked by: <b>Auditor</b></Chakra.Text>
                        <Chakra.Text w='100%' variant='heading' mt='2vw' color='primary' textAlign='center'>Auditor / BOD Member</Chakra.Text>
                    </Chakra.Box>
                </Chakra.Box>
            </Chakra.Card.Root>

            {/* pie shadow */}
            <svg width="0" height="0">
                <filter id="pieShadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="5" dy="5" sCellDeviation="10" floodColor="#00000" floodOpacity="0.3" />
                </filter>
            </svg>
        </Chakra.Box>
    )
}
