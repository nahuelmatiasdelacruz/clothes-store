import {Button,ButtonGroup,Input,Layout,Text,useTheme,} from '@ui-kitten/components';
import {useQuery} from '@tanstack/react-query';
import {StackScreenProps} from '@react-navigation/stack';
import {MainLayout} from '../../layouts/MainLayout';
import {RootStackParams} from '../../navigation/StackNavigator';
import {getProductById} from '../../../actions/products/getProductById';
import {useRef} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {FlatList} from 'react-native';
import {FadeInImage} from '../../components/ui/FadeInImage';
import {Gender, Size} from '../../../domain/entities/product.entity';
import {CustomIcon} from '../../components/ui/CustomIcon';
import {Formik} from 'formik';

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl];

const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex];

interface ProductScreenProps extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({route}: ProductScreenProps) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const {isLoading, data: product} = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current),
  });
  if (!product) {
    return null;
  }
  return (
    <Formik initialValues={product} onSubmit={values => {}}>
      {({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
        <MainLayout
          title={values.title}
          subtitle={`Precio: $${values.price} USD`}>
          <ScrollView style={{flex: 1}}>
            <Layout>
              <FlatList
                data={values.images}
                horizontal
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <FadeInImage
                    uri={item}
                    style={{width: 300, height: 300, marginHorizontal: 7}}
                  />
                )}
              />
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
                />
                <Input
                  style={{flex: 1}}
                  label="Inventario"
                  value={values.stock.toString()}
                  onChangeText={handleChange('stock')}
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
                onPress={() => {}}
                style={{margin: 15}}
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
