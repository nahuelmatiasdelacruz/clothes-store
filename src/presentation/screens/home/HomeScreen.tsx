import {getProductsByPage} from '../../../actions/products/getProductsByPage';
import {useInfiniteQuery} from '@tanstack/react-query';
import {MainLayout} from '../../layouts/MainLayout';
import {FullScreenLoader} from '../../components/ui/FullScreenLoader';
import {ProductList} from '../../components/products/ProductList';
import {FAB} from '../../components/ui/FAB';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

export const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    queryFn: async params => await getProductsByPage(params.pageParam),
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });
  return (
    <>
      <MainLayout title="Productos - Teslo Shop" subtitle="Administración">
        {isLoading ? (
          <FullScreenLoader />
        ) : (
          <ProductList
            fetchNextPage={fetchNextPage}
            products={data?.pages.flat() ?? []}
          />
        )}
      </MainLayout>
      <FAB
        style={{position: 'absolute', bottom: 30, right: 20}}
        iconName='plus-outline'
        onPress={()=>navigation.navigate('ProductScreen', {productId: 'new'})}
      />
    </>
  );
};
