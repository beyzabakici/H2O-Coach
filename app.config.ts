import "dotenv/config";

export interface AppConfig {
  BASE_URL: string;
  PRODUCT_URL: string;
}

export default {
  name: "h2o-coach",
  version: "1.0.0",
  extra: {
    BASE_URL: process.env.BASE_URL,
    PRODUCT_URL: process.env.PRODUCT_URL,
  },
};
