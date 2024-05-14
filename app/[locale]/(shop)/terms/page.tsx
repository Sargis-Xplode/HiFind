"use client";

import { useEffect, useState } from "react";
import "./page.scss";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

const Terms = () => {
    const { push } = useRouter();
    const t = useTranslations("footer");
    const t2 = useTranslations("terms");

    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") ?? "0";

    const [users, setUsers] = useState([
        {
            name: t2("guideLinesTitle"),
            text: t2("guideLines"),
            selected: tab === "0" || tab === "null" || tab === "" ? true : false,
            id: 0,
        },
        {
            name: t2("userIntegrityTitle"),
            text: t2("userIntegrity"),
            selected: tab === "1" ? true : false,
            id: 1,
        },
        {
            name: t2("propertyAndLiabilityTitle"),
            text: t2("propertyAndLiability"),
            selected: tab === "2" ? true : false,
            id: 2,
        },
        {
            name: t2("abuseAndGoverningLawsTitle"),
            text: t2("abuseAndGoverningLaws"),
            selected: tab === "3" ? true : false,
            id: 3,
        },
        {
            name: t2("modificationsTitle"),
            text: t2("modifications"),
            selected: tab === "4" ? true : false,
            id: 4,
        },
    ]);
    const [userName, setUserName] = useState("");
    const [userText, setUserText] = useState("");

    useEffect(() => {
        const activeTab: any = users.filter((user) => user.selected);
        setUserName(activeTab[0]?.name);
        setUserText(activeTab[0]?.text);
    }, [tab]);

    const handleChangeText = (user: any, index: number) => {
        setUserName(user.name);
        setUserText(user.text);

        push(`?tab=${index}`);

        const arr: any = users.map((user, ind) => {
            if (index === ind) {
                user.selected = true;
            } else {
                user.selected = false;
            }
            return user;
        });

        setUsers(arr);
    };

    return (
        <div>
            <section className="terms-section">
                <div className="container">
                    <h2>{t("terms")}</h2>
                    <div className="section-container">
                        <div className="users-name-container">
                            {users.length
                                ? users.map((user, index) => {
                                      return (
                                          <div
                                              key={index}
                                              onClick={() => handleChangeText(user, index)}
                                          >
                                              <p className={user.selected ? "selected" : ""}>{user.name}</p>

                                              <div className={(user.selected ? "selected" : "") + " users-text-mobile"}>
                                                  {userText}
                                              </div>
                                          </div>
                                      );
                                  })
                                : ""}
                        </div>

                        <div className="users-text-container">
                            <div className="users-name">{userName}</div>
                            <div className="users-text">{userText}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Terms;
