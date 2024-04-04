"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./page.scss";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const SuccessfulSubmition = () => {
    const t = useTranslations("success");

    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push("/");
        }, 5000);
    }, [router]);

    return (
        <div>
            <Header></Header>
            <section className="success-submition-modal-container">
                <div className="container">
                    <div className="modal">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <h4>{t("requestSuccessful")}</h4>
                        <p>{t("approvalOrRejection")}</p>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default SuccessfulSubmition;
