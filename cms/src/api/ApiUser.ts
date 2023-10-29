import { fetcher } from "./Fetcher";

export interface ILoginBody {
  username: string;
  password: string;
}

// export interface ILoginRes

function login(data: ILoginBody) {
  return fetcher({ url: "login", method: "post", data });
}

export default {
  login,
};
