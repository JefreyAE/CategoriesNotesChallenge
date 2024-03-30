'use client'
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login/Login";
import { ToastContainer } from "react-toastify";
export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <div className="z-10 w-full items-center font-mono text-sm lg:flex">
        <div className="flex flex-col gap-5 w-full items-center ">
          <p className="text-3xl lg:text-4xl !leading-tight mx-auto mb-8 w-full text-center">
            Welcome, please sign in o register your user here:{" "}
          </p>
          <Login/>
        </div>
      </div>
      <ToastContainer/>
    </main>
  );
}
