"use client";
import styles from "../index.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";

export function LoginButton() {
    const handleLogin = () => {
        void signIn("google", {
            callbackUrl: "/dashboard"
        })
    }

    return (
        <Link
            // href={session ? "/api/auth/signout" : "/api/auth/signin"}
            href=""
            className={styles.loginButton}
            onClick={handleLogin}
        >
            Sign in
        </Link>
    );
}
