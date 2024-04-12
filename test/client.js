import supertest from "supertest";

const request = supertest.agent("localhost:3000");
request.on("response", async (response) => {
  const { request, body, statusCode, headers } = response;
  const data = {
    request: {
      header: request._header,
      url: request.url,
      body: request._data,
      method: request.method,
      curl: request.req.toCurl,
    },
    response: {
      header: headers,
      status: statusCode,
      body,
    },
  };
});

export default request;
