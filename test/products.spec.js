import request from "./client";

describe("Products", () => {
  describe("List Products", () => {
    it("list all products", () => {
      return request.get("/products").expect(200);
    });

    it("gets products by id", async () => {
      const response = await request.get("/products/3").expect(200);
      expect(response.body[0].name).toEqual("req.body.name");
    });
  });

  describe("Create Products", () => {
    it("create new products failure: empty name", async () => {
      const response = await request
        .post("/products")
        .send({
          name: "",
          category: "testProductCategory",
          price: 99,
          stock: "20",
        })
        .expect(200);
      expect(response.text).toEqual("invalid body");
    });

    it("create new products failure: empty price", async () => {
      const response = await request
        .post("/products")
        .send({
          name: "testProductName",
          category: "testProductCategory",
          price: "",
          stock: "20",
        })
        .expect(200);
      expect(response.text).toEqual("invalid body");
    });

    it("create new products failure: NaN price", async () => {
      const response = await request
        .post("/products")
        .send({
          name: "testProductName",
          category: "testProductCategory",
          price: "testProductPrice",
          stock: "20",
        })
        .expect(200);
      expect(response.text).toEqual("invalid body");
    });

    it("create new products failure: NaN stock", async () => {
      const response = await request
        .post("/products")
        .send({
          name: "testProductName",
          category: "testProductCategory",
          price: 99,
          stock: "testProductStock",
        })
        .expect(200);
      expect(response.text).toEqual("invalid body");
    });
  });
});
