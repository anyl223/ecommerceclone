import { Button, Group, PasswordInput, Radio, TextInput } from "@mantine/core";
import React from "react";
import { Container } from "react-bootstrap";
import scss from "./register.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { FaMobileRetro } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import axios from "axios";
import Image from "next/image";

type RegisterData = {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
  mobile: string;
  gender: string;
  displayName: string;
};

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .test({
      name: "no-uppercase",
      test: (value: any) => !/[A-Z]/.test(value),
      message: "Uppercase letters are not allowed",
    })
    .test({
      name: "no-spaces",
      test: (value: any) => !/\s/.test(value),
      message: "Spaces are not allowed",
    })

    .required("Username is required")
    .matches(/^[a-z0-9_]+$/, {
      message:
        "Username can only contain lowercase letters, numbers, and underscores",
    }),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .test(
      "uppercase",
      "Password must contain at least one uppercase letter",
      (value) => /[A-Z]/.test(value)
    )
    .test(
      "lowercase",
      "Password must contain at least one lowercase letter",
      (value) => /[a-z]/.test(value)
    )
    .test("number", "Password must contain at least one number", (value) =>
      /\d/.test(value)
    )
    .test(
      "special",
      "Password must contain at least one special character",
      (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value)
    ),
  confirmPassword: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
  gender: Yup.string().required("Gender is required"),
  mobile: Yup.string().required("Mobile Number Is Required"),

  displayName: Yup.string().required("Please Enter Display Name"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    getValues,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<RegisterData> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        data
      );
      // console.log(response);

      if (response.data == "Registered") {
        alert("Registered successfully");
      }
      console.log("data", data);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <Image
              // className={scss.image_wrapper}
              src="/assests/images/login.png"
              width={500}
              height={500}
              alt="login_image"
            />
          </div>
          <div className="col-6 col-md-6 col-sm-12">
            <div>
              <h2 className="d-flex  justify-content-center align-items-center">
                Register
              </h2>
            </div>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-6">
                  <TextInput
                    label="Username"
                    placeholder="Username"
                    leftSection={<FaRegUser />}
                    error={errors.username?.message}
                    {...register("username")}
                  />
                </div>
                <div className="col">
                  <Radio.Group
                    onChange={(value: any) => {
                      setValue("gender", value);
                      clearErrors("gender");
                    }}
                    label="Gender"
                    value={getValues("gender")}
                    error={errors.gender?.message}
                  >
                    <Group mt="xs">
                      <Radio value="1" label="Male" />
                      <Radio value="2" label="Female" />
                    </Group>
                  </Radio.Group>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <PasswordInput
                    label="Password"
                    placeholder="password"
                    leftSection={<RiLockPasswordLine />}
                    autoComplete="new-password"
                    error={errors.password?.message}
                    {...register("password")}
                  />
                </div>
                <div className="col">
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="confirmpassword"
                    leftSection={<RiLockPasswordLine />}
                    error={errors.confirmPassword?.message}
                    {...register("confirmPassword")}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <TextInput
                    label="Mobile"
                    type="number"
                    leftSection={<FaMobileRetro />}
                    placeholder="mobile"
                    error={errors.mobile?.message}
                    {...register("mobile")}
                    maxLength={10}
                  />
                </div>
                <div className="col">
                  <TextInput
                    label="Email"
                    placeholder="email"
                    leftSection={<MdOutlineMailOutline />}
                    error={errors.email?.message}
                    {...register("email")}
                    type="email"
                  />
                </div>
              </div>

              <TextInput
                label="Displayname"
                placeholder="displayName"
                leftSection={<FaRegUser />}
                error={errors.displayName?.message}
                {...register("displayName")}
                style={{ width: "299px" }}
              />
              <p className="mt-2">
                Dont have an account ? <Link href={"/register"}>Signup</Link>{" "}
              </p>

              <div className={scss.button_wrapper}>
                <Button type="submit">Submit</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
