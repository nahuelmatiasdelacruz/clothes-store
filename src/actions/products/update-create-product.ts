import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product.entity";

export const updateCreateProduct = (product: Partial<Product>) => {
  product.stock = Number(product.stock);
  product.price = Number(product.price);
  if(product.id){
    return updateProduct(product);
  }
  throw new Error(`Creation not implemented`);
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
    if(isAxiosError(e)){
      console.log(e.response?.data);
    }
    throw new Error(`Error al actualizar producto: ${id}`);
  }
};

const prepareImages = (images: string[]) => images.map((image)=>image.split('/').pop());