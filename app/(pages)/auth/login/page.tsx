"use client"

import Link from "next/link"
import React, { useState, useTransition } from "react"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { login } from "@/actions/login"
import { LoginSchema } from "@/schemas"
import { FormError } from "@/components/ui/FormError"
import { FormSuccess } from "@/components/ui/FormSuccess"

const Login = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl")
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : ""

  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }

          //  if (data?.success) {
          //    form.reset()
          //    setSuccess(data.success)
          //  }

          //  if (data?.twoFactor) {
          //    setShowTwoFactor(true)
          //  }
        })
        .catch(() => setError("Something went wrong"))
    })
  }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <Controller
                name="email"
                control={form.control}
                render={({ field }) => (
                  <input
                    type="email"
                    {...field}
                    placeholder="email"
                    className="input input-bordered"
                    required
                    disabled={isPending}
                  />
                )}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <Controller
                name="password"
                control={form.control}
                render={({ field }) => (
                  <input
                    type="password"
                    {...field}
                    placeholder="password"
                    className="input input-bordered"
                    required
                    disabled={isPending}
                  />
                )}
              />

              <div className="py-4">
                <FormSuccess message={success} />
                {error && <FormError message={error} />}
              </div>

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
              <label className="label">
                <Link
                  href="/auth/register"
                  className="label-text-alt link link-hover"
                >
                  You dont have an account?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isPending}
              >
                Login
              </button>
            </div>
            {form.formState.errors.password &&
              form.formState.errors.password.message}
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
