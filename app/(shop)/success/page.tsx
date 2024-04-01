"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./page.scss";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SuccessfulSubmition = () => {
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
                        <h4>Ձեր գրանցման հայտը հաջողությամբ կատարված է։</h4>
                        <p>
                            Համակարգում Ձեր էջի հաստատման կամ մերժման մասին
                            կստանաք նամակ Ձեր էլ.հասցեին:
                        </p>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default SuccessfulSubmition;
