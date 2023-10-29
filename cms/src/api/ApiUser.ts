import store from "@/redux/store";
import { fetcher } from "./Fetcher";

export interface ILoginBody {
  email: string;
  password: string;
}

export interface ILoginRes {
  email?: string;
  name?: string;
  address?: string;
  phoneNumber?: string;
  roles?: ("ROLE_ADMIN" | "ROLE_USER" | "ROLE_RECEPTIONIST")[];
  accessToken?: string;
  active?: true;
  avatar?: string;
}

function login(data: ILoginBody): Promise<ILoginRes> {
  return fetcher(
    { url: "users/login", method: "post", data },
    { isXWWWForm: true },
  );
}

function getAuthToken(): string | undefined {
  const { user } = store.getState();
  return user.accessToken;
}

function isLogin(): boolean {
  return !!getAuthToken();
}

export default {
  login,
  isLogin,
};
