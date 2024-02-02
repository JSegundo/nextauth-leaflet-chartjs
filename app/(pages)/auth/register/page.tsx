"use client"
import Link from "next/link"
import React, { useEffect, useState, useTransition } from "react"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { register } from "@/actions/register"
import { FormError } from "@/components/ui/FormError"
import { FormSuccess } from "@/components/ui/FormSuccess"

const RegisterSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must have more than 1 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must have more than 8 characters"),
})

const Register = () => {
  const router = useRouter()

  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // const onSubmit = async (values: z.infer<typeof RegisterSchema>, e: any) => {
  //   await register(values)
  // }

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("")
    setSuccess("")

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  useEffect(() => {
    console.log(success)
    if (success) {
      router.replace("/auth/login")
    }
  }, [success])

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
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
                <span className="label-text">Name</span>
              </label>
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    placeholder="Your name"
                    className="input input-bordered"
                    required
                  />
                )}
              />
            </div>
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
                  />
                )}
              />

              <label className="label">
                <Link
                  href="/auth/login"
                  className="label-text-alt link link-hover"
                >
                  Already have an account?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={isPending}
              >
                Register
              </button>
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
          </form>
        </div>
      </div>
    </div>
  )
}
export default Register
