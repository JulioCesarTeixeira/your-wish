import { GetProductByCategoryId, GetProductById } from "@src/common/validation/products";
import { Context } from "../context";
import { getProductById, getProducts, getProductByCategoryId } from "../services/product.service";



export const getProductByIdController = async({
  input,
  ctx,
}: {
  input: GetProductById;
  ctx: Context;
  }) => {
  const { id } = input;
  const product = await getProductById({ id });
  return {
    status: 200,
    message: "Product fetched successfully",
    product,
  };
};

export const getProductsController = async ({ ctx }: { ctx: Context }) => {
  const products = await getProducts();
  return {
    status: 200,
    message: "Products fetched successfully",
    products,
  };
}

export const getProductByCategoryIdController = async({
  input,
  ctx,
}: {
  input: GetProductByCategoryId;
  ctx: Context;
  }) => {
  const { categoryId } = input;
  const products = await getProductByCategoryId({ categoryId });
  return {
    status: 200,
    message: "Products fetched successfully",
    products,
  };
}