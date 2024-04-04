"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import "./page.scss";
import { recentShopsFile } from "../../../Assets/js/assets";
import shopBox from "../../../types/shopBox";

import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Shop from "../Components/Shop/Shop";

import shoppingBagIcon from "../../../Assets/shopping-bag.svg";
import gearsIcon from "../../../Assets/gears.svg";
import dishesIcon from "../../../Assets/dishes.svg";
import brushIcon from "../../../Assets/brush.svg";
import heartPlusIcon from "../../../Assets/heart-plus.svg";
import aboutUsImg from "../../../Assets/about-us-img.svg";
import { useLocale, useTranslations } from "next-intl";

export default function Home() {
    const [recentShops, setRecentShops] = useState(recentShopsFile);
    const t = useTranslations("homePage");
    const t2 = useTranslations("homepageBanner");
    const localActive = useLocale();

    return (
        <main className="main">
            <Header></Header>
            <div className="homepage-banner">
                <div className="container">
                    <p>{t2("homepage_banner_heading")}</p>
                    <Link href={`${localActive}/join-us`}>
                        <button
                            type="button"
                            className="button"
                        >
                            {t2("join_us_btn")}
                        </button>
                    </Link>
                </div>
            </div>
            <div className="container">
                {/* ////////////////////  Explore Instagram Section ////////////////////////// */}
                <section className="first-section">
                    <h3>{t("discover")}</h3>
                    <div className="instagram-boxes-container">
                        <div className="first-box">
                            <Link href={`${localActive}/shops`}>
                                <div>
                                    <Image
                                        src={shoppingBagIcon}
                                        alt="Picture of the author"
                                    />
                                    <p>{t("shops")}</p>
                                </div>
                            </Link>

                            <Link href={`${localActive}/shops`}>
                                <div>
                                    <Image
                                        src={gearsIcon}
                                        alt="Picture of the author"
                                    />
                                    <p>{t("services")}</p>
                                </div>
                            </Link>
                        </div>

                        <Link href={`${localActive}/shops`}>
                            <div className="second-box">
                                <Image
                                    src={dishesIcon}
                                    alt="Picture of the author"
                                />
                                <p>{t("entertainment")}</p>
                            </div>
                        </Link>

                        <div className="third-box">
                            <Link href={`${localActive}/shops`}>
                                <div>
                                    <Image
                                        src={brushIcon}
                                        alt="Picture of the author"
                                    />
                                    <p>{t("beauty")}</p>
                                </div>
                            </Link>

                            <Link href={`${localActive}/shops`}>
                                <div>
                                    <Image
                                        src={heartPlusIcon}
                                        alt="Picture of the author"
                                    />
                                    <p>{t("healthCare")}</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Suggested Pages Section */}
                <section className="second-section">
                    <h3>{t("recommendedPages")}</h3>
                    <div className="boxes-container">
                        {recentShops.map((shop, index) => {
                            return (
                                <Shop
                                    key={index}
                                    categoryIcon={shop.categoryIcon}
                                    brandLogo={shop.brandLogo}
                                    shopName={shop.shopName}
                                    shopInstaName={shop.shopInstaName}
                                    shopDescription={shop.shopDescription}
                                ></Shop>
                            );
                        })}
                    </div>
                </section>

                {/* About Us Section */}
                <section className="third-section">
                    <div className="img-container">
                        <Image
                            src={aboutUsImg}
                            alt="Picture of the author"
                        />
                    </div>
                    <div className="about-us-container">
                        <h3>{t("aboutUs")}</h3>
                        <div className="about-us-text">{t("welcome")}</div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </main>
    );
}