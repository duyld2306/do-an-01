import fetcher from "./Fetcher";

const baseURL = "https://dummyjson.com";

export interface IGetIGetProductsParams {
  limit?: number;
  skip?: number;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
}

export interface IGetProductsResponse {
  products?: IProduct[];
  total?: number;
  skip?: number;
  limit?: number;
}

const getProducts = (
  params?: IGetIGetProductsParams
): Promise<IGetProductsResponse> => {
  return fetcher(baseURL, { method: "get", url: "/products", params });
};

const getProductById = (id: number): Promise<IProduct> => {
  return fetcher(baseURL, {
    method: "get",
    url: `/products/${id}`,
  });
};

export { getProducts, getProductById };
