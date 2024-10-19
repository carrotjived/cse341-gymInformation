const swaggerAutogen = require("swagger-autogen");

const doc = {
  info: {
    title: "Gym Information API",
    description: "Gym Information API",
  },
  host: "localhost:2222",
  schemes: ["http", "https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
