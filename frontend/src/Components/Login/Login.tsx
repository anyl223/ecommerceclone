import { Button, TextInput } from "@mantine/core";
import React from "react";
import { Container } from "react-bootstrap";
import scss from "./Login.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";

type LoginData = {
  username: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is Required"),
  password: Yup.string().required("Password is Required"),
});

const Login = () => {
  const { register, handleSubmit ,formState:{errors}} = useForm<LoginData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      // const response = await fetch("/login")
      console.log("data", data);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-6">
          <img className={scss.image_wrapper}
            src="/assests/images/login.webp"
            alt="login_image"
          
          />
        </div>
        <div className="col-6">
          <Container>
            <div>
              <h2 className="d-flex  justify-content-center align-items-center">
                Login
              </h2>
            </div>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className={scss.input_wrapper}>
                <TextInput
                  label="Username"
                  placeholder="Username"
                  error={errors.username?.message}
                  {...register("username")}
                />
                <TextInput
                  label="Password"
                  placeholder="password"
                  error={errors.password?.message}
                  {...register("password")}
                />
                <p className="mt-2">
                  Dont have an account ? <Link href={"/register"}>Signup</Link>{" "}
                </p>
              </div>
              <div className={scss.button_wrapper}>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Login;
