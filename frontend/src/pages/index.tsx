import Image from "next/image";
import { Inter } from "next/font/google";
import { TextInput } from "@mantine/core";
import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";
import Slider from "@/Components/Sliders/Slider";
import Login from "@/Components/Login/Login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <Slider/>
    <Login/>
    </>
  )
}
