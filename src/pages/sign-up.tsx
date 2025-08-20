import { useState } from "react";
import * as z from "zod";

import { FormInput } from "../components/forms/FormInput";
import { Link } from "react-router";

const UserSignUp = z
  .object({
    email: z.email("Insert a valid e-mail address."),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters long.")
      .max(256, "Password should be at most 256 characters long."),
    confirm: z.string(),
  })
  .refine((o) => o.password === o.confirm, {
    message: "Password confirmation does not match.",
    path: ["confirm"],
  });

type UserSignUpType = z.infer<typeof UserSignUp>;

const DEFAULT_SIGN_UP: UserSignUpType = {
  email: "",
  password: "",
  confirm: "",
};

export function SignUp() {
  const [formData, setFormData] = useState<UserSignUpType>({
    ...DEFAULT_SIGN_UP,
  });
  const [formError, setFormError] = useState<UserSignUpType>({
    ...DEFAULT_SIGN_UP,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rawSubmitted = new FormData(e.currentTarget);
    const submitted: UserSignUpType = Object.fromEntries(
      rawSubmitted.entries(),
    ) as UserSignUpType;

    const newFormError: UserSignUpType = {
      ...DEFAULT_SIGN_UP,
    };

    try {
      UserSignUp.parse(submitted);
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const e of error.issues) {
          const name = e.path[0] as keyof UserSignUpType;
          const value = e.message;

          newFormError[name] = value;
        }
      }
    }

    setFormError(newFormError);
  };

  return (
    <div className="flex min-h-screen flex-col items-end bg-[url(../images/unsplash/sean-pollock-PhYq704ffdA-unsplash.jpg)] bg-cover bg-fixed text-zinc-100">
      <form
        method="post"
        onSubmit={handleSubmit}
        noValidate
        className="flex min-h-screen w-100 flex-col gap-8 bg-zinc-900 p-8"
      >
        <div>
          <h1 className="text-2xl font-semibold">Sign Up</h1>
        </div>
        <div className="flex flex-col gap-6">
          <FormInput
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            error={formError.email}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            error={formError.password}
            onChange={handleChange}
          />
          <FormInput
            label="Confirm password"
            name="confirm"
            type="password"
            value={formData.confirm}
            error={formError.confirm}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 underline">
              Log in instead.
            </Link>
          </p>
        </div>
        <div className="flex justify-center">
          <button className="h-12 w-48 cursor-pointer rounded-xl border-2 border-red-500 font-semibold text-red-500 transition hover:bg-red-500 hover:text-zinc-100">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}
