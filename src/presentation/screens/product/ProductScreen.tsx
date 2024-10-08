import { useRef} from 'react';
import { ScrollView} from 'react-native-gesture-handler';
import { Button,ButtonGroup,Input,Layout ,useTheme,} from '@ui-kitten/components';
import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import { StackScreenProps} from '@react-navigation/stack';
import { updateCreateProduct, getProductById } from '../../../actions';
import { MainLayout} from '../../layouts/MainLayout';
import { RootStackParams} from '../../navigation/StackNavigator';
import { CustomIcon} from '../../components/ui/CustomIcon';
import { Product } from '../../../domain/entities/product.entity';
import { Formik} from 'formik';
import { ProductImages } from '../../components/products/ProductImages';
import { genders, sizes } from '../../../config/constants/product.constants';
import { CameraAdapter } from '../../../config/adapters/camera-adapter';

interface ProductScreenProps extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route}: ProductScreenProps) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const queryClient = useQueryClient();
  
  const {data: product} = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });
  
  const mutation = useMutation({
    mutationFn: (data: Product) => updateCreateProduct({...data, id: productIdRef.current}),
    onSuccess(data: Product) {
      productIdRef.current = data.id;
      queryClient.invalidateQueries({queryKey: ['products','infinite']});
      queryClient.invalidateQueries({queryKey: ['product',data.id]});
    }
  });
  if (!product) return null;
  return (
    <Formik initialValues={product} onSubmit={mutation.mutate}>
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout
          title={values.title}
          subtitle={`Precio: $${values.price} USD`}
          rightAction={async () => {
            const photos = await CameraAdapter.takePicture();
            setFieldValue('images',[...values.images,...photos]);
          }}
          rightActionIcon='image-outline'
        >
          <ScrollView style={{flex: 1}}>
            <Layout style={{marginVertical: 10, justifyContent: 'center', alignItems: 'center'}}>
              <ProductImages images={values.images}/>
              <Layout style={{marginHorizontal: 10}}>
                <Input
                  label="Título"
                  style={{marginVertical: 5}}
                  value={values.title}
                  onChangeText={handleChange('title')}
                />
                <Input
                  label="Slug"
                  value={values.slug}
                  onChangeText={handleChange('slug')}
                  style={{marginVertical: 5}}
                />
                <Input
                  label="Descripción"
                  value={values.description}
                  onChangeText={handleChange('description')}
                  style={{marginVertical: 5}}
                />
              </Layout>
              <Layout
                style={{
                  marginVertical: 5,
                  marginHorizontal: 15,
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <Input
                  style={{flex: 1}}
                  label="Precio"
                  value={values.price.toString()}
                  onChangeText={handleChange('price')}
                  keyboardType='number-pad'
                />
                <Input
                  style={{flex: 1}}
                  label="Inventario"
                  value={values.stock.toString()}
                  onChangeText={handleChange('stock')}
                  keyboardType='number-pad'
                />
              </Layout>
              <ButtonGroup
                appearance="outline"
                style={{margin: 2, marginTop: 30, marginHorizontal: 15}}
                size="small">
                {sizes.map(size => (
                  <Button
                    onPress={
                      ()=>setFieldValue('sizes',values.sizes.includes(size) 
                        ? values.sizes.filter( s => s !== size)
                        : [...values.sizes,size]
                      )}
                    style={{
                      flex: 1,
                      backgroundColor: values.sizes.includes(size)
                        ? theme['color-primary-200']
                        : undefined,
                    }}
                    key={size}>
                    {size}
                  </Button>
                ))}
              </ButtonGroup>
              <ButtonGroup
                appearance="outline"
                style={{margin: 2, marginTop: 30, marginHorizontal: 15}}
                size="small">
                {genders.map(gender => (
                  <Button
                    onPress={()=>setFieldValue('gender',gender)}
                    style={{
                      flex: 1,
                      backgroundColor: values.gender.startsWith(gender)
                        ? theme['color-primary-200']
                        : undefined,
                    }}
                    key={gender}>
                    {gender}
                  </Button>
                ))}
              </ButtonGroup>
              <Button
                onPress={() => handleSubmit()}
                style={{margin: 15}}
                disabled={mutation.isPending}
                accessoryLeft={<CustomIcon name="save-outline" white />}>
                Guardar
              </Button>
              <Layout style={{height: 100}} />
            </Layout>
          </ScrollView>
        </MainLayout>
      )}
    </Formik>
  );
};
