import { FlatList, Image } from 'react-native';
import { FadeInImage } from '../ui/FadeInImage';

interface ProductImagesProps {
  images: string[];
}

export const ProductImages = ({images}: ProductImagesProps) => {
  return (
    <>
      {images.length === 0 ? (
        <Image
          style={{width: 300, height: 300}}
          source={require('../../../assets/no-product-image.png')}
        />
      ) : (
        <FlatList
          data={images}
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
      )}
    </>
  );
};
