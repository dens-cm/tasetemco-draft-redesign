import { useState, useEffect } from "react"

export const useGetProducts = () => {
    const [products, setProducts] = useState([])
    const [productsColumns, setProductsColumns] = useState([])

    const getProducts = async () => {
        setProductsColumns([
            {
                accessorKey: 'product_name',
                header: 'Product Name'
            },
            {
                accessorKey: 'supplier',
                header: 'Supplier'
            },
            {
                accessorKey: 'stock',
                header: 'Stock'
            },
            {
                accessorKey: 'price',
                header: 'Price'
            },
            {
                accessorKey: 'retail_price',
                header: 'Retail Price'
            },
            {
                accessorKey: 'action',
                header: 'Action'
            }
        ])

        setProducts([
            {
                product_name: 'Cheese Sticks',
                supplier: 'Adrian Morales',
                stock: '20',
                price: '₱15.00',
                retail_price: '₱25.00',
                action: '...',
            },
            {
                product_name: 'Mango Ice Candy',
                supplier: 'Marco Santos',
                stock: '10',
                price: '₱10.00',
                retail_price: '₱15.00',
                action: '...',
            },
            {
                product_name: 'Budbod na Pilit',
                supplier: 'Joshua Mirez',
                stock: '15',
                price: '₱12.00',
                retail_price: '₱20.00',
                action: '...',
            },
            {
                product_name: 'Banana Cue',
                supplier: 'Adrian Morales',
                stock: '25',
                price: '₱20.00',
                retail_price: '₱35.00',
                action: '...',
            },
            {
                product_name: 'Nilupak',
                supplier: 'Daniel Garcia',
                stock: '12',
                price: '₱18.00',
                retail_price: '₱28.00',
                action: '...',
            }
        ])
    }

    useEffect(() => {
        getProducts()
    }, [])

    return { products, productsColumns }
}