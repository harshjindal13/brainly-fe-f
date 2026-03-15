import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { signinUser } from "../api/authApi";
import { type SignupInput, signupSchema } from "../schemas/authSchema";

export const Signin = () => {
  const navigate = useNavigate();

  // react-hook-form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  // react-query mutation
  const signinMutation = useMutation({
    mutationFn: signinUser,
    onSuccess: () => {
      toast.success("User Signed in!");
      navigate("/dashboard");
    },

    onError: (error: unknown) => {
      // This runs if backend fails.

      if (axios.isAxiosError(error)) {
        // checks is this an Axios error?
        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 401) {
          setError("username", {
            type: "manual",
            message: "Invalid username or password",
          });
          return;
        }

        if (data?.error?.issues) {
          data.error.issues.forEach((issue: any) => {
            const fieldName = issue.path[0];

            setError(fieldName, {
              type: "manual",
              message: issue.message,
            });
          });
          return;
        }
      }

      setError("username", {
        type: "manual",
        message: "Invalid username or password",
      });
    },
  });

  const onSubmit = (data: SignupInput) => {
    signinMutation.mutate(data);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-48 rounded-xl border bg-white p-8"
      >
        <Input
          {...register("username")}
          placeholder="username"
          error={errors.username?.message}
        />
        <Input
          {...register("password")}
          type="password"
          placeholder="password"
          error={errors.password?.message}
        />

        <div className="flex items-center justify-center pt-4">
          <Button
            variant="primary"
            fullWidth={true}
            loading={signinMutation.isPending}
          >
            Signin
          </Button>
        </div>
      </form>
    </div>
  );
};
