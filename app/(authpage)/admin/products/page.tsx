import React from 'react'
import ProductTable from './products-table'
import CreateProducts from './create-products'

const Products = () => {
  return (
    <div>
        <CreateProducts />
        <ProductTable/>
    </div>
  
  )
}

export default Products