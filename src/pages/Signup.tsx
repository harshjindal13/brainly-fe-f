import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // connects Zod validation to react-hook-form.
import { useNavigate } from "react-router";

import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { signupSchema, type SignupInput } from "../schemas/authSchema";

/* 
  shared Zod schema.
  signupSchema = validation rules
  SignupInput = TypeScript type inferred from Zod
*/

import { signupUser } from "../api/authApi"; // function that actually calls your backend.
import toast from "react-hot-toast";
import axios from "axios";

export const Signup = () => {
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
  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      toast.success("You have signed up!");
      navigate("/signin");
    },

    onError: (error: unknown) => {
      // This runs if backend fails.

      if (axios.isAxiosError(error)) {
        // checks is this an Axios error?
        const status = error.response?.status;
        const data = error.response?.data;

        if (status === 411) {
          setError("username", {
            type: "manual",
            message: "User already exists",
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
        message: "Something went wrong",
      });
    },
  });

  const onSubmit = (data: SignupInput) => {
    signupMutation.mutate(data);
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
          // If Zod fails → this contains message.
        />

        <Input
          {...register("password")}
          type="password"
          placeholder="password"
          error={errors.password?.message}
        />

        <div className="flex justify-center pt-4">
          <Button
            variant="primary"
            fullWidth
            loading={signupMutation.isPending}
          >
            Signup
          </Button>
        </div>
      </form>

      {/* <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input placeholder="Username" />
        <Input placeholder="Password"/>

        <div className="flex justify-center pt-4">
          <Button loading={false} variant="primary" fullWidth={true} > Signup </Button>
        </div>
      </div> */}
    </div>
  );
};
