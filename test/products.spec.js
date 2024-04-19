import request from "./client";

const mockData = [
  {
    name: `testProductName-noCategory-${new Date().toISOString()}`,
    category: "",
    price: Math.floor(Math.random() * 9999),
    stock: Math.floor(Math.random() * 999),
  },
  {
    name: `testProductName-fullBody-${new Date().toISOString()}`,
    category: `testProductCategory-${new Date().toISOString()}`,
    price: Math.floor(Math.random() * 9999),
    stock: Math.floor(Math.random() * 999),
  },
];
let createdProductId = [];
describe("Create Products", () => {
  it("create new product failure: empty name.", async () => {
    const response = await request
      .post("/products")
      .send({
        name: "",
        category: "testProductCategory",
        price: 99,
        stock: "20",
      })
      .expect(200);
    expect(response.text).toEqual("Invalid body.");
  });

  it("create new product failure: empty price.", async () => {
    const response = await request
      .post("/products")
      .send({
        name: "testProductName",
        category: "testProductCategory",
        price: "",
        stock: "20",
      })
      .expect(200);
    expect(response.text).toEqual("Invalid body.");
  });

  it("create new product failure: NaN price.", async () => {
    const response = await request
      .post("/products")
      .send({
        name: "testProductName",
        category: "testProductCategory",
        price: "testProductPrice",
        stock: "20",
      })
      .expect(200);
    expect(response.text).toEqual("Invalid body.");
  });

  it("create new product failure: NaN stock.", async () => {
    const response = await request
      .post("/products")
      .send({
        name: "testProductName",
        category: "testProductCategory",
        price: 99,
        stock: "testProductStock",
      })
      .expect(200);
    expect(response.text).toEqual("Invalid body.");
  });

  it("create new product success: empty catrgory.", async () => {
    const response = await request
      .post("/products")
      .send(mockData[0])
      .expect(200);
    const body = response.body;
    expect(body.name).toEqual(mockData[0].name);
    expect(body.category).toEqual(mockData[0].category);
    expect(body.price).toEqual(mockData[0].price);
    expect(body.stock).toEqual(mockData[0].stock);
    createdProductId.push(body.id);
  });

  it("create new product success: got full body.", async () => {
    const response = await request
      .post("/products")
      .send(mockData[1])
      .expect(200);
    const body = response.body;
    expect(body.name).toEqual(mockData[1].name);
    expect(body.category).toEqual(mockData[1].category);
    expect(body.price).toEqual(mockData[1].price);
    expect(body.stock).toEqual(mockData[1].stock);
    createdProductId.push(body.id);
  });
});

describe("List Products", () => {
  it("list products by default page and limit.", async () => {
    const response = await request.get("/products").expect(200);
    expect(response.body.length).toEqual(10);
  });

  it("list products by custom page and limit.", async () => {
    const page1Response = await request
      .get("/products?page=1&limit=15")
      .expect(200);
    const page2Response = await request
      .get("/products?page=2&limit=15")
      .expect(200);
    expect(page2Response.body.length).toEqual(15);
    expect(page1Response).not.toEqual(page2Response);
  });

  it("get product that an ID that doesn't exist.", async () => {
    const response = await request.get("/products/0").expect(200);
    expect(response.text).toEqual("Product not found.");
  });

  it("get products by existing id.", async () => {
    const response = await request
      .get(`/products/${createdProductId[1]}`)
      .expect(200);
    const body = response.body[0];
    expect(body.id).toEqual(createdProductId[1]);
    expect(body.name).toEqual(mockData[1].name);
    expect(body.category).toEqual(mockData[1].category);
    expect(body.price).toEqual(mockData[1].price);
    expect(body.stock).toEqual(mockData[1].stock);
  });
});

describe("Update Products", () => {
  it("update a product failure: search for an ID that doesn't exist.", async () => {
    const response = await request.put("/products/0").expect(200);
    expect(response.text).toEqual("Product not found.");
  });

  it("update a product failure: NaN price.", async () => {
    const response = await request
      .put(`/products/${createdProductId[0]}`)
      .send({
        name: "",
        category: "",
        price: "testProductPrice",
        stock: "20",
      })
      .expect(200);
    expect(response.text).toEqual("Invalid body.");
  });

  it("update a product failure: NaN price.", async () => {
    const response = await request
      .put(`/products/${createdProductId[0]}`)
      .send({
        name: "",
        category: "",
        price: "testProductPrice",
        stock: "20",
      })
      .expect(200);
    expect(response.text).toEqual("Invalid body.");
  });

  it("update a product success: all field empty.", async () => {
    const response = await request
      .put(`/products/${createdProductId[0]}`)
      .send({
        name: "",
        category: "",
        price: "",
        stock: "",
      })
      .expect(200);
    const body = response.body;
    expect(body.id).toEqual(createdProductId[0]);
    expect(body.name).toEqual(mockData[0].name);
    expect(body.category).toEqual(mockData[0].category);
    expect(body.price).toEqual(mockData[0].price);
    expect(body.stock).toEqual(mockData[0].stock);
  });

  it("update a product success: empty name and category.", async () => {
    const response = await request
      .put(`/products/${createdProductId[0]}`)
      .send({
        name: "",
        category: "",
        price: 99,
        stock: "20",
      })
      .expect(200);
    const body = response.body;
    expect(body.id).toEqual(createdProductId[0]);
    expect(body.name).toEqual(mockData[0].name);
    expect(body.category).toEqual(mockData[0].category);
    expect(body.price).toEqual(99);
    expect(body.stock).toEqual(20);
  });

  it("update a product success: got full body.", async () => {
    const response = await request
      .put(`/products/${createdProductId[0]}`)
      .send({
        name: "edited product name",
        category: "edited category name",
        price: 150,
        stock: "200",
      })
      .expect(200);
    const body = response.body;
    expect(body.id).toEqual(createdProductId[0]);
    expect(body.name).toEqual("edited product name");
    expect(body.category).toEqual("edited category name");
    expect(body.price).toEqual(150);
    expect(body.stock).toEqual(200);
  });
});

describe("Delete product", () => {
  it("delete a product failure.", async () => {
    const response = await request.delete("/products/0").expect(200);
    expect(response.text).toEqual("Product not found.");
  });

  it("delete a product success.", async () => {
    const response = await request
      .delete(`/products/${createdProductId[1]}`)
      .expect(200);
    const body = response.body;
    expect(body.id).toEqual(createdProductId[1]);
    expect(body.name).toEqual(mockData[1].name);
    expect(body.category).toEqual(mockData[1].category);
    expect(body.price).toEqual(mockData[1].price);
    expect(body.stock).toEqual(mockData[1].stock);

    await request.delete(`/products/${createdProductId[0]}`);

    const checkDeleteResult_0 = await request
      .get(`/products/${createdProductId[0]}`)
      .expect(200);
    expect(checkDeleteResult_0.text).toEqual("Product not found.");

    const checkDeleteResult_1 = await request
      .get(`/products/${createdProductId[1]}`)
      .expect(200);
    expect(checkDeleteResult_1.text).toEqual("Product not found.");
  });
});
