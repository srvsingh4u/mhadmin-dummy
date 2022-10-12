import axios from "axios";
import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Cookies from "react-cookie";
import { useRouter } from "next/router";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);

  const router = useRouter();
  async function login() {
    const res = await axios.post("https://mhbed.appiness.cc/api/admin/login/", {
      email: email,
      password: password,
    });

    console.log(res);
    setCookie("token", res.data.token);
    // console.log(cookies.token);

    router.push("/salespage");
    localStorage.setItem("name", res.data.data.first_name);
  }

  return (
    <div className="signin-page">
      <div className="logo">
        <img src="https://mhadmin.appiness.cc/logo.svg" alt="signin_logo" />
      </div>
      <div className="form-signin">
        <div className="signin-form">
          <div className="signin-heading">
            <h1> Admin Login</h1>
          </div>
          <div className="email">
            <label className="input-tags">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password">
            <label className="input-tags">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="sign-btn">
            <button className="login-btn" onClick={login}>
              Log In{" "}
            </button>
          </div>
          <div className="mb-1"></div>
          <div className="forget">Forgot Password?</div>
        </div>
      </div>
    </div>
  );
}
