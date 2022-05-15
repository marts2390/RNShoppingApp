import { RouteProp } from '@react-navigation/native'

export type IBottomTabsNavigationModel = {
    ProductList: undefined;
    SavedItems: undefined;
    CartItems: undefined;
}

export type NavigationProps<RouteName extends keyof IBottomTabsNavigationModel> = RouteProp<
  IBottomTabsNavigationModel,
  RouteName
>
