import api from "../lib/axios";

type AuthPayload = {
  username: string;
  password: string;
};

export const signupUser = async (data: AuthPayload) => {
  const res = await api.post("/v1/signup", data);

  if (res.data.message === "Incorrect format")
    throw new Error("Incorrect format");

  return res.data;
};

export const signinUser = async (data: AuthPayload) => {
  const res = await api.post("/v1/signin", data);

  const jwt = res.data.token;
  localStorage.setItem("token", jwt);

  return res.data;
  // Importand bcz: React Query internally uses returned data.
};
