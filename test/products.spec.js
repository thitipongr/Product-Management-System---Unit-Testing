import request from "./client";

describe("Products", () => {
  describe("List Products", () => {
    it("list all products", () => {
      return request.get("/products").expect(200);
    });

    it("gets products by id", async () => {
      return request
        .get("/products/3")
        .expect(200)
        .then((response) => {
          expect(response.body[0].name).toEqual("req.body.name");
        });
    });
  });
});
