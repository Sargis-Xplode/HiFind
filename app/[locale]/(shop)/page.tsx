"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import "./page.scss";
import shopBox from "../../../types/shopBox";

import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Shop from "../Components/Shop/Shop";

import shoppingBagIcon from "../../../public/shopping-bag.svg";
import gearsIcon from "../../../public/gears.svg";
import dishesIcon from "../../../public/dishes.svg";
import brushIcon from "../../../public/brush.svg";
import heartPlusIcon from "../../../public/heart-plus.svg";
import aboutUsImg from "../../../public/about-us-img.svg";
import { useLocale, useTranslations } from "next-intl";
import axios from "axios";
import dynamic from "next/dynamic";
import "react-loading-skeleton/dist/skeleton.css";

const Skeleton = dynamic(() => import("react-loading-skeleton"));

export default function Home() {
    const t = useTranslations("homePage");
    const t2 = useTranslations("homepageBanner");
    const localActive = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const [recentShops, setRecentShops] = useState([]);

    useEffect(() => {
        axios
            .get(`${localActive}/api/shop/all/approved`)
            .then((res) => {
                const shops = res.data.shops;
                const arr: any = [];

                for (let i = shops.length - 1; i >= shops.length - 8; i--) {
                    if (!shops[i]) {
                        continue;
                    }
                    arr.push(shops[i]);
                }
                setRecentShops(arr);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <main className="main">
            <div className={`homepage-banner`}>
                <div className="container">
                    <p>{t2("homepage_banner_heading")}</p>
                    <Link href={`/${localActive}/join-us`}>
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
                            <Link href={{ pathname: `${localActive}/shops`, query: { filter: "shops" } }}>
                                <div>
                                    <Image
                                        quality={100}
                                        src={shoppingBagIcon}
                                        alt="Picture of the author"
                                    />
                                    <p>{t("shops")}</p>
                                </div>
                            </Link>

                            <Link href={{ pathname: `${localActive}/shops`, query: { filter: "services" } }}>
                                <div>
                                    <Image
                                        quality={100}
                                        src={gearsIcon}
                                        alt="Picture of the author"
                                    />
                                    <p>{t("service")}</p>
                                </div>
                            </Link>
                        </div>

                        <Link href={{ pathname: `${localActive}/shops`, query: { filter: "entertainment" } }}>
                            <div className="second-box">
                                <Image
                                    quality={100}
                                    src={dishesIcon}
                                    alt="Picture of the author"
                                />
                                <p>{t("entertainment")}</p>
                            </div>
                        </Link>

                        <div className="third-box">
                            <Link href={{ pathname: `${localActive}/shops`, query: { filter: "beauty" } }}>
                                <div>
                                    <Image
                                        quality={100}
                                        src={brushIcon}
                                        alt="Picture of the author"
                                    />
                                    <p>{t("beauty")}</p>
                                </div>
                            </Link>

                            <Link href={{ pathname: `${localActive}/shops`, query: { filter: "healthCare" } }}>
                                <div>
                                    <Image
                                        quality={100}
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
                        {recentShops.length > 0 ? (
                            recentShops.map((shop: any, index) => {
                                let {
                                    buisnessName,
                                    descriptionArm,
                                    descriptionEng,
                                    instaPageLink,
                                    instaPfpPreview,
                                    categoryName,
                                    subCategories,
                                    approved,
                                } = shop;

                                if (approved) {
                                    return (
                                        <Shop
                                            key={index}
                                            buisnessName={buisnessName}
                                            descriptionArm={descriptionArm}
                                            descriptionEng={descriptionEng}
                                            instaPageLink={instaPageLink}
                                            instaPfpPreview={instaPfpPreview}
                                            categoryName={categoryName}
                                            subCategories={subCategories}
                                        ></Shop>
                                    );
                                }
                            })
                        ) : (
                            <div style={{ width: "100%", display: "flex" }}>
                                <Skeleton
                                    highlightColor="#e0e0e0"
                                    containerClassName="shop-box-skeleton"
                                />
                                <Skeleton
                                    highlightColor="#e0e0e0"
                                    containerClassName="shop-box-skeleton"
                                />
                                <Skeleton
                                    highlightColor="#e0e0e0"
                                    containerClassName="shop-box-skeleton"
                                />
                            </div>
                        )}
                    </div>
                </section>

                {/* About Us Section */}
                <section className="third-section">
                    <div className="img-container">
                        <Image
                            quality={100}
                            priority
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
        </main>
    );
}
