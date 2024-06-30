"use client";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { setCookie } from "cookies-next";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { customFetch } from "@/lib/axiosInstance";
import Wrapper from "@/components/Wrapper";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";

type IProps = {
  email: string;
  password: string;
  linkedinUrl?: string;
};

const Auth = () => {
  const [inputs, setInputs] = useState<IProps>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const [variant, setVariant] = useState("login");
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (variant === "login") {
      try {
        setLoading(true);
        const { data } = await customFetch.post("/auth/signin", {
          email: inputs.email,
          password: inputs.password,
        });
        setCookie("token", data.access_token);
        toast.success("Welcome back!");
        setLoading(false);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const { data } = await customFetch.post("/auth/signup", {
          email: inputs.email,
          password: inputs.password,
          linkedInUrl: inputs.linkedinUrl,
        });
        setCookie("token", data.access_token);
        setLoading(false);
      } catch (error: any) {
        toast.error(error?.response?.data?.message);
        setLoading(false);
      }
    }

    router.replace("/");
    router.refresh();
  };
  return (
    <Wrapper>
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">
            {variant === "login" ? "Login" : "Register"}
          </CardTitle>
          <CardDescription>
            {variant === "login" ? "Login" : "Register"} to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                type="email"
                value={inputs.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Enter your email"
                required
                type="password"
                value={inputs.password}
                onChange={handleChange}
              />
            </div>
            {variant === "register" && (
              <div className="space-y-2">
                <Label htmlFor="password">Linkedin URL</Label>
                <Input
                  id="llinkedinUrl"
                  name="linkedinUrl"
                  placeholder="Enter your linkedin profile url"
                  required
                  type="text"
                  value={inputs.linkedinUrl}
                  onChange={handleChange}
                />
              </div>
            )}
            <Button className="w-full" type="submit">
              {variant === "login" ? (
                loading ? (
                  <Spinner />
                ) : (
                  "Login"
                )
              ) : loading ? (
                <Spinner />
              ) : (
                "Register"
              )}
            </Button>
            <button
              onClick={toggleVariant}
              className="mt-2 block w-full hover:text-blue-500 duration-300"
            >
              {variant === "login"
                ? "you don't have an account ?"
                : "you already have an account ?"}
            </button>
          </form>
        </CardContent>
      </Card>
    </Wrapper>
  );
};
export default Auth;
