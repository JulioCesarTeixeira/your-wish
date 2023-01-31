import { GetProductByCategoryId, GetProductById } from "@src/common/validation/products";
import prisma from "@src/lib/prisma";

export const getProductById = async (input: GetProductById) => {
  const { id } = input;
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return product;
}

export const getProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
}

export const getProductByCategoryId = async (input: GetProductByCategoryId) => {
  const { categoryId } = input;
  const products = await prisma.product.findMany({
    where: { categoryId },
  });
  return products;
}