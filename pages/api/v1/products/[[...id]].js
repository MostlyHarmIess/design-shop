import nc from "next-connect";

import {
  updateProduct,
  removeProduct,
  getProducts,
  addProduct,
} from "@/lib/api-functions/server/products/controllers";

const baseRoute = "/api/v1/products/:id?";

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  // .use(someMiddleware())
  .get(baseRoute, async (req, res) => {
    getProducts();
  })
  .post(baseRoute, async (req, res) => {
    addProduct();
  })
  .put(baseRoute, async (req, res) => {
    updateProduct();
  })
  .delete(baseRoute, async (req, res) => {
    removeProduct();
  });

export default handler;
