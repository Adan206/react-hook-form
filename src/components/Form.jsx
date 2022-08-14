import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./Form.css";

function Form() {
  const schema = yup.object().shape({
    fullName: yup.string().required("Your full name is required"),
    email: yup.string().email().required("Please enter valid email"),
    age: yup
      .number()
      .positive()
      .integer()
      .min(18)
      .required("age must be older than 18"),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords did not match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <section>
        <h2>Revolving Door Data</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type='text'
            {...register("fullName")}
            placeholder='full name'
          />
          <p className='error'>{errors.fullName?.message}</p>
          <input type='email' {...register("email")} placeholder='email' />
          <p className='error'>{errors.email?.message}</p>
          <input type='number' {...register("age")} placeholder='age' />
          <p className='error'>{errors.age?.message}</p>
          <input
            type='password'
            {...register("password")}
            placeholder='password'
          />
          <p className='error'>{errors.password?.message}</p>
          <input
            type='password'
            {...register("confirmPassword")}
            placeholder='confirm password'
          />
          <p className='error'>{errors.confirmPassword?.message}</p>
          <input type='submit' value='Submit' />

          <p>Or Connect With</p>

          <ul>
            <li>
              <a href='/'>Facebook</a>
            </li>
            <li>
              <a href='/'>Twitter</a>
            </li>
            <li>
              <a href='/'>Google</a>
            </li>
          </ul>

          <a href='/'>Forgot Password?</a>

          <p>
            Create an account: <a href='/'>Sign up</a>
          </p>
        </form>
      </section>
    </div>
  );
}

export default Form;
