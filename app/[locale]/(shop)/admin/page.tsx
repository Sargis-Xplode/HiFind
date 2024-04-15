"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./page.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../../../Assets/logo.svg";
import eye from "../../../../Assets/eye.svg";
import eyeClosed from "../../../../Assets/eye-off.svg";
import { useLocale } from "next-intl";
// import checkAuth from "../../middleware/auth";

export default function Login() {
    const { push } = useRouter();
    const localActive = useLocale();

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);
    const [validation, setValidation] = useState(false);
    const [loginClicked, setLoginClicked] = useState(false);
    const [eyeClicked, setEyeClicked] = useState(false);
    const [passwordType, setPasswordType] = useState("password");

    useEffect(() => {
        const regex: any =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (regex.test(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }

        if (Number(password.length) > 6) {
            setPasswordValid(true);
        } else {
            setPasswordValid(false);
        }

        if (emailValid && passwordValid) {
            setValidation(true);
        } else {
            setValidation(false);
        }
    }, [email, password, validation]);

    const toggleEye = (val: string) => {
        setEyeClicked(!eyeClicked);
        setPasswordType(val);
    };

    const handleSubmit = async (e: any) => {
        if (!validation) return;
        e.preventDefault();
        setLoginClicked(true);
        try {
            const body = {
                email,
                password,
            };
            await axios
                .post("api/admin/login", JSON.stringify(body))
                .then((res) => {
                    const data = res.data;

                    if (data.success) {
                        toast(data.message, {
                            type: "success",
                        });
                        localStorage.setItem("token", data.token);
                        push(`/${localActive}/dashboard/notifications`);
                    } else {
                        toast(data.message, {
                            type: "error",
                        });
                    }
                })
                .catch((error) => {
                    toast(error.message, {
                        type: "error",
                    });
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="login-section">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="container">
                <div className="modal">
                    <Image
                        src={logo}
                        alt="Logo"
                        priority
                    ></Image>
                    <form
                        onSubmit={handleSubmit}
                        className="form"
                        name="login"
                    >
                        <p>Էլ. հասցե</p>
                        <input
                            className={(emailValid ? "" : "input-error ") + "input"}
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            placeholder="Էլ. հասցե"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {!emailValid && loginClicked && <p className="error">Invalid email</p>}

                        <p>Գաղտնաբառ</p>
                        <div className="password-container">
                            <input
                                className={(passwordValid ? "" : "input-error ") + "input"}
                                type={passwordType}
                                name="password"
                                id="password"
                                placeholder="Գաղտնաբառ"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            {eyeClicked ? (
                                <Image
                                    src={eyeClosed}
                                    alt="Closed Eye"
                                    onClick={() => toggleEye("password")}
                                ></Image>
                            ) : (
                                <Image
                                    src={eye}
                                    alt="Eye"
                                    onClick={() => toggleEye("text")}
                                ></Image>
                            )}
                        </div>
                        {!passwordValid && loginClicked && <p className="error">Invalid password</p>}

                        {validation ? (
                            <button
                                type="submit"
                                className={"button"}
                            >
                                Մուտք
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className={"button disabled"}
                            >
                                Մուտք
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}
