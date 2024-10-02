import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product.entity";
import { TesloProduct } from "../../infrastructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProductsByPage = async (page: number, limit: number = 20): Promise<Product[]> => {
  try{
    const { data } = await tesloApi.get<TesloProduct[]>(`/products?offset=${page * 10}&limit=${limit}`)
    const products = data.map((tesloProduct) => ProductMapper.tesloProductToEntity(tesloProduct));
    return products;
  }catch(e){
    console.log(e);
    throw new Error(`Error getting products: ${e}`);
  }
}