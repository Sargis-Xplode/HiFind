import Image from "next/image";
import "./footer.scss";
import Link from "next/link";

import logo from "../../../../Assets/logo.svg";
import emailIcon from "../../../../Assets/mail.svg";
import { useLocale, useTranslations } from "next-intl";

export default function Footer() {
    const t = useTranslations("footer");

    const localActive = useLocale();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-logo-container">
                    <Image
                        src={logo}
                        alt="Picture of the author"
                    />
                </div>
                <div className={(localActive === "en" ? "english-format" : "") + " footer-links-container"}>
                    <Link href={`/${localActive}/privacy`}>
                        <p>{t("privacy")}</p>
                    </Link>

                    <Link href={`/${localActive}/terms`}>
                        <p>{t("terms")}</p>
                    </Link>
                    <p>{t("contactUs")}</p>
                    <div>
                        <div className="mail-icon-container">
                            <Image
                                src={emailIcon}
                                alt="Picture of the author"
                            />
                        </div>{" "}
                        info@xplode.am
                    </div>
                </div>
                <div className="footer-info-container">
                    <p>
                        {t("developed")}
                        <span>
                            <Link
                                href={"https://xplode.am/"}
                                target="_blank"
                            >
                                {t("xPlodeLLC")}
                            </Link>
                        </span>
                        {t("by")}
                    </p>
                    <p className="all-rights-reserved">{t("allRightsReserved")}</p>
                </div>
            </div>
        </footer>
    );
}
