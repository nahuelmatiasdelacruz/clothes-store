import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product.entity";

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
  product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);
  if(product.id && product.id !== 'new') return updateProduct(product);
  return createProduct(product);
};

const updateProduct = async (product: Partial<Product>) => {
  const {id, images = [], ...rest} = product;
  try{
    const checkedImages = prepareImages(images);
    const { data } = await tesloApi.patch(`/products/${id}`,{
      images: checkedImages,
      ...rest
    });
    return data;
  }catch(e){
    if(isAxiosError(e)) console.log(e.response?.data);
    throw new Error(`Error al actualizar producto: ${id}`);
  };
};

const createProduct = async (product: Partial<Product>): Promise<Product> => {
  const {id, images = [], ...rest} = product;
  try{
    const checkedImages = prepareImages(images);
    const { data } = await tesloApi.post(`/products`,{
      images: checkedImages,
      ...rest
    });
    return data;
  }catch(e){
    if(isAxiosError(e)) console.log(e.response?.data);
    throw new Error(`Error al crear producto`);
  }
}

const prepareImages = (images: string[]) => images.map((image)=>image.split('/').pop());