import React, { FC } from 'react'
import ProductItemComponent from '../components/ProductItem'
import { IProductModel } from '../models/productModel'
import { useNavigation } from '@react-navigation/native'

interface IProductOverviewScreenProps {
  products: IProductModel[]
}

const ProductListComponent:FC<IProductOverviewScreenProps> = ({ products }) => {
  const navigation = useNavigation()

  return (
    <>
      {products.map((item) => (
        <ProductItemComponent
          key={ item.id }
          item={ item }
          onPress={ () => {
            navigation.navigate('ProductDetails', {
              productId: item.id,
              productTitle: item.title,
            })
          } }
        />
      ))}
    </>
  )
}

export default ProductListComponent