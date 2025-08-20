import { useState } from "react";
import * as z from "zod";

import { FormInput } from "../components/forms/FormInput";
import { Link } from "react-router";

const UserLogin = z.object({
  email: z.email("Insert a valid e-mail address."),
  password: z.string().min(1, "Insert a password."),
});

type UserLoginType = z.infer<typeof UserLogin>;

const DEFAULT_LOGIN: UserLoginType = {
  email: "",
  password: "",
};

export function Login() {
  const [formData, setFormData] = useState<UserLoginType>({ ...DEFAULT_LOGIN });
  const [formError, setFormError] = useState<UserLoginType>({
    ...DEFAULT_LOGIN,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const rawSubmitted = new FormData(e.currentTarget);
    const submitted: UserLoginType = Object.fromEntries(
      rawSubmitted.entries(),
    ) as UserLoginType;

    const newFormError: UserLoginType = {
      email: "",
      password: "",
    };

    try {
      UserLogin.parse(submitted);
    } catch (error) {
      if (error instanceof z.ZodError) {
        for (const e of error.issues) {
          const name = e.path[0] as keyof UserLoginType;
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
          <h1 className="text-2xl font-semibold">Login</h1>
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
        </div>
        <div>
          <p className="text-sm">
            Don't have an account yet?{" "}
            <Link to="/sign-up" className="text-red-500 underline">
              Sign up now.
            </Link>
          </p>
        </div>
        <div className="flex justify-center">
          <button className="h-12 w-48 cursor-pointer rounded-xl border-2 border-red-500 font-semibold text-red-500 transition hover:bg-red-500 hover:text-zinc-100">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
