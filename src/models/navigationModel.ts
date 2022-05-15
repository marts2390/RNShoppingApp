import { RouteProp } from '@react-navigation/native'

export type INavigationModel = {
    FilteredProductList: {filterType: string};
    ProductList: undefined;
    ProductDetails: {productId: number, productTitle: string, filterType?: string};
}

export type NavigationProps<RouteName extends keyof INavigationModel> = RouteProp<
  INavigationModel,
  RouteName
>
