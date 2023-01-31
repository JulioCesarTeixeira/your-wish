import { getProductByIdSchema, productInputSchema } from "@src/common/validation/products";
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { getProductByIdController, getProductsController } from "../controllers/product.controller";

// create trpc product router
export const productRouter = router({
  // POST /api/product
  // Create a new product
  // createProduct: protectedProcedure
  //   .input(productInputSchema)
  //   .mutation(async ({ input, ctx }) => createProductController({ input, ctx })),
  // GET /api/product
  // Get all products
  getProducts: publicProcedure

    .query(async ({ ctx }) => getProductsController({ ctx })),
  // GET /api/product/:id 
  // Get a product by id
  getProductById: publicProcedure
    .input(getProductByIdSchema)

    .query(async ({ input, ctx }) => getProductByIdController({ input, ctx })),
  
  // getProductByCategoryId: publicProcedure
  //   .input(getProductByIdSchema)
  //   .query(async ({ input, ctx }) => getProductByIdController({ input, ctx })),
})
