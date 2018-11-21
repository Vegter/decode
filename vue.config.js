module.exports = {
  baseUrl: process.env.NODE_ENV === "production" ? "/decode/" : "/",
  devServer: {
    hot: true,
    disableHostCheck: true,
    host: "localhost",
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:8080/",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "3600",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, x-id, Content-Length, X-Requested-With",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
    }
  }
};
