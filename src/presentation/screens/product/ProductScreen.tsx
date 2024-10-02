import { Layout, Text } from "@ui-kitten/components"
import { MainLayout } from "../../layouts/MainLayout"
import { useQuery } from "@tanstack/react-query"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParams } from "../../navigation/StackNavigator"
import { getProductById } from "../../../actions/products/getProductById"
import { useRef } from "react"
import { ScrollView } from "react-native-gesture-handler"

interface ProductScreenProps extends StackScreenProps<RootStackParams, 'ProductScreen'> {};

export const ProductScreen = ({ route }:ProductScreenProps) => {
  const productIdRef = useRef(route.params.productId);
  const {isLoading, data: product} = useQuery({
    queryKey: ['product',productIdRef.current],
    queryFn: () => getProductById(productIdRef.current)
  });
  if(!product) {
    return (
      null
    )
  }
  return (
    <MainLayout title={product.title} subtitle={`Precio: $${product.price} USD`}>
      <ScrollView style={{flex: 1}}>
        
      </ScrollView>
    </MainLayout>
  )
}