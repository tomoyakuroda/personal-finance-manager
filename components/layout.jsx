import React, { useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import axioswal from "axioswal";
import { UserContext } from "./UserContext";
import redirectTo from "../lib/redirectTo";
import { useMediaQuery } from "react-responsive";

export default ({ children, title }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const {
    state: { isLoggedIn },
    dispatch
  } = useContext(UserContext);
  const handleLogout = event => {
    event.preventDefault();
    axioswal.delete("/api/session").then(data => {
      if (data.status === "ok") {
        dispatch({ type: "clear" });
        redirectTo("/");
      }
    });
  };
  return (
    <>
      <style jsx global>
        {`
          a {
            text-decoration: none !important;
            color: #00ad9f;
          }
          html {
            font-size: 1.25rem;
          }
          body {
            margin: 0;
            padding: 0;
            color: #111;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
              "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
              "Helvetica Neue", sans-serif;
            background-color: #f3f5f7;
            text-align: center;
          }
          button,
          input,
          textarea,
          select {
            display: block;
            padding: 0.8rem 2.5rem;
            font-size: 1rem;
            margin: 1rem auto;
            background-color: #fff;
            color: #00ad9f;
            border: none;
            border-radius: 4px;
            box-shadow: rgba(0, 0, 0, 0.1) 0 10px 20px 1px;
          }
          button {
            cursor: pointer;
          }
          button:hover,
          button:active {
            background-color: #f3f4f4;
          }
          .transactions {
            background-color: white;
            border-radius: 4px;
            margin-left: auto;
            margin-right: auto;
          }
          .center {
            margin-left: auto;
            margin-right: auto;
          }
          .text-right {
            position: absolute;
            right: 0;
            padding-right: 0.8em;
          }
        `}
      </style>
      <style jsx>
        {`
          header {
            background-color: #ffffff;
            box-shadow: rgba(0, 0, 0, 0.05) 0 10px 20px 1px;
          }
          nav {
            max-width: 1040px;
            margin: auto;
            padding: 1rem 2rem;
          }
          nav div {
            float: right;
          }
          nav div a {
            font-size: 0.9rem;
            margin-left: 0.8rem;
          }
          nav h1 {
            font-size: 1rem;
            color: #444;
            margin: 0;
            font-weight: 700;
            float: left;
          }
          nav:after {
            content: "";
            clear: both;
            display: table;
          }
          main {
            padding: 0.5rem;
            max-width: 1040px;
            margin: 0 auto;
          }
          .main-wrapper {
            background-image: linear-gradient(
              to top,
              #d5d4d0 0%,
              #d5d4d0 1%,
              #eeeeec 31%,
              #efeeec 75%,
              #e9e9e7 100%
            );
            min-height: calc(100vh - 67px);
          }
          footer {
            font-size: 0.8rem;
            margin-top: 1rem;
            padding: 3rem;
            color: #888;
          }
        `}
      </style>
      <Head>
        <title>{title || ""}</title>
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Personal Finance Manager help you manage your finance."
        />
        <meta property="og:title" content="Personal Finance Manager" />
        <meta
          property="og:description"
          content="Personal Finance Manager help you manage your finance."
        />
        <meta property="og:image" content="https://i.imgur.com/ZI0mATQ.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>
              {isTabletOrMobile ? (
                <h1>PFM</h1>
              ) : (
                <h1>Personal Finance Manager</h1>
              )}
            </a>
          </Link>

          <div>
            {!isLoggedIn ? (
              <>
                <Link href="/login">
                  <a>Login</a>
                </Link>
                <Link href="/signup">
                  <a>Sign up</a>
                </Link>
              </>
            ) : (
              <>
                {/* <Link href="/profile"><a>Profile</a></Link> */}
                {/* eslint-disable-next-line */}
                <Link href="/management">
                  <a>Dashboard</a>
                </Link>
                <Link href="/">
                  <a role="button" onClick={handleLogout}>
                    Logout
                  </a>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <div className="main-wrapper">
        <main>{children}</main>
      </div>

      {/* <footer>
      </footer> */}
    </>
  );
};
