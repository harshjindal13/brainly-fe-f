import { useForm, type SubmitHandler } from "react-hook-form";

import { Input } from "./Input";
import { Button } from "./Button";
import { X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../lib/axios";
import axios from "axios";
import { useState } from "react";

const enum ContentType {
  Youtube = "youtube",
  X = "twitter",
}

type Inputs = {
  title: string;
  link: string;
  type: ContentType;
};

type FormInputs = Omit<Inputs, "type">;

type CreateComponentProps = {
  open: boolean;
  onClose: () => void;
};

export const CreateComponent = ({ open, onClose }: CreateComponentProps) => {
  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  async function addContent(data: Inputs) {
    await api.post(
      "/v1/content",
      data,
      {
        headers: {
          Authorization: localStorage.getItem("token") ?? "",
        },
      },
    );

    onClose();
  }

  const {
    register,
    handleSubmit,
    setError,
  } = useForm<FormInputs>();

  const contentCreateMutation = useMutation({
    mutationFn: addContent,
    onSuccess: () => {
      toast.success("Content added!");

      // close the content add card
    },

    onError: (error: unknown) => {
      if (axios.isAxiosError(error)) {
        // const status = error.response?.status;

        const data = error.response?.data;

        if (typeof data?.message === "string") {
          toast.error(data.message);
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
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = (data) =>
    contentCreateMutation.mutate({ ...data, type });

  return (
    <div>
      {open && (
        <div>
          <div className="fixed inset-0 z-10 flex size-full justify-center bg-slate-800/70 opacity-60"></div>
          <div className="flex">
            <span className="fixed inset-0 z-20 place-self-center rounded-md bg-white p-4">
              <div className="flex justify-end">
                <button className="cursor-pointer" onClick={onClose}>
                  <X size={17} onClick={() => toast.error("closed")} />
                </button>
              </div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input {...register("title")} placeholder="title" />

                  <Input {...register("link")} placeholder="link" />

                  <div className="my-2 flex items-center justify-around gap-2.5">
                    <Button
                      variant={
                        type === ContentType.Youtube ? "primary" : "secondary"
                      }
                      fullWidth
                      type="button"
                      onClick={() => setType(ContentType.Youtube)}
                    >
                      Youtube
                    </Button>

                    <Button
                      variant={type === ContentType.X ? "primary" : "secondary"}
                      fullWidth
                      type="button"
                      onClick={() => setType(ContentType.X)}
                    >
                      X
                    </Button>
                  </div>

                  <Button
                    variant="primary"
                    fullWidth
                    loading={contentCreateMutation.isPending}
                    type="submit"
                  >
                    Add Content
                  </Button>
                </form>
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
