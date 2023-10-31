"use client"
import Link from "next/link"
import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must have more than 1 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(8, "Password must have more than 8 characters"),
})

const Login = () => {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("") // for storing error messages

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
  const onSubmit = async (values: z.infer<typeof FormSchema>, e: any) => {
    try {
      const response = await fetch("api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
        }),
      })

      if (response.ok) {
        router.push("/")
      } else {
        const errorData = await response.json() // assuming server responds with json
        setErrorMessage(errorData.message || "An error occurred")
      }
    } catch (err: any) {
      console.log("An error occurred:", err)
      setErrorMessage(err.message || "An error occurred")
    }
  }

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

              <label className="label"></label>
              <label className="label">
                <Link href="/login" className="label-text-alt link link-hover">
                  Already have an account?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            </div>
            {form.formState.errors.password &&
              form.formState.errors.password.message}
            {errorMessage && <p>{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
