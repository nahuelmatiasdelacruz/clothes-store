import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product.entity";
import { TesloProduct } from "../../infrastructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProductById = async (id: string): Promise<Product> => {
  try{
    const { data } = await tesloApi.get<TesloProduct>(`/products/${id}`);
    return ProductMapper.tesloProductToEntity(data);
  }catch(e){
    console.log(e);
    throw new Error(`Error getting product by id: ${id}`);
  }
}