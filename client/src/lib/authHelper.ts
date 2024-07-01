import { cookies } from "next/headers";

export const getToken = (): string | undefined => {
  const cookieStore = cookies();
  return cookieStore.get("token")?.value;
};
