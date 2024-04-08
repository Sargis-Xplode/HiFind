"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import "./page.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../../../Assets/logo.svg";
import { useLocale } from "next-intl";
import checkAuth from "../../middleware/auth";

export default function Login() {
    const { push } = useRouter();
    const localActive = useLocale();

    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [password, setPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(false);
    const [error, setError] = useState("");
    const [validation, setValidation] = useState(false);
    const [loginClicked, setLoginClicked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            checkAuth(token).then((data) => {
                console.log(data);
                if (data.success) {
                    push(`/${localActive}/dashboard/notifications`);
                }
            });
        }
    }, []);

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
                    console.log(res);

                    if (data.success) {
                        toast(data.message, {
                            type: "success",
                        });
                        localStorage.setItem("token", data.token);
                        push(`/${localActive}/dashboard/notifications`);
                    } else {
                        setError(data.message);
                        toast(data.message, {
                            type: "error",
                        });
                    }
                })
                .catch((error) => {
                    setError(error.message);
                    toast(error.message, {
                        type: "error",
                    });
                });
        } catch (error) {
            console.error(error);
        }
    };

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

    return (
        <section>
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
                        <input
                            className={(passwordValid ? "" : "input-error ") + "input"}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Գաղտնաբառ"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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
