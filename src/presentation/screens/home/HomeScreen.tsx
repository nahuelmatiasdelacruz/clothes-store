import { getProductsByPage } from "../../../actions/products/getProductsByPage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MainLayout } from "../../layouts/MainLayout";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { ProductList } from "../../components/products/ProductList";

export const HomeScreen = () => {
  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products','infinite'],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    queryFn: async (params) => await getProductsByPage(params.pageParam),
    getNextPageParam: (lastPage, allPages) => allPages.length
  });
  return (
    <MainLayout
      title='Productos - Teslo Shop'
      subtitle='Administración'
    >
      { isLoading ? <FullScreenLoader/> : <ProductList fetchNextPage={fetchNextPage} products={data?.pages.flat() ?? []}/>}
    </MainLayout>
  )
}