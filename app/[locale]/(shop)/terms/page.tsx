"use client";

import { useState } from "react";
import "./page.scss";
import { useTranslations } from "next-intl";

const Terms = () => {
    const t = useTranslations("footer");
    const t2 = useTranslations("terms");

    const [users, setUsers] = useState([
        // {
        //     name: t2("welocmeTitle"),
        //     text: t2("welocme"),
        //     selected: true,
        // },
        {
            name: t2("guideLinesTitle"),
            text: t2("guideLines"),
            selected: true,
        },
        {
            name: t2("userIntegrityTitle"),
            text: t2("userIntegrity"),
            selected: false,
        },
        {
            name: t2("propertyAndLiabilityTitle"),
            text: t2("propertyAndLiability"),
            selected: false,
        },
        {
            name: t2("abuseAndGoverningLawsTitle"),
            text: t2("abuseAndGoverningLaws"),
            selected: false,
        },
        {
            name: t2("modificationsTitle"),
            text: t2("modifications"),
            selected: false,
        },
    ]);
    const [userName, setUserName] = useState(users[0].name);
    const [userText, setUserText] = useState(users[0].text);

    const handleChangeText = (user: any, index: number) => {
        setUserName(user.name);
        setUserText(user.text);

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
                    <div className="users-container">
                        {users.length
                            ? users.map((user, index) => {
                                  return (
                                      <div
                                          className="user-container"
                                          key={index}
                                      >
                                          <div
                                              className={(user.selected ? "selected" : "") + " user-circle"}
                                              key={index}
                                              onClick={() => handleChangeText(user, index)}
                                          >
                                              {user.name}
                                          </div>
                                          <div className={(user.selected ? "selected" : "") + " users-text-mobile"}>
                                              {userText}
                                          </div>
                                      </div>
                                  );
                              })
                            : ""}
                    </div>

                    <div className="users-text-container mobile-display-none">
                        <div className="users-name">{userName}</div>
                        <div className="users-text">{userText}</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Terms;
