"use client";

import { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import "./page.scss";
import { useTranslations } from "next-intl";

const Terms = () => {
    const t = useTranslations("footer");
    const t2 = useTranslations("privacy");

    const [users, setUsers] = useState([
        {
            name: t2("informationCollectionAndUseTitle"),
            text: t2("informationCollectionAndUse"),
            selected: true,
        },
        {
            name: t2("dataSecurityTitle"),
            text: t2("dataSecurity"),
            selected: false,
        },
        {
            name: t2("informationSharingTitle"),
            text: t2("informationSharing"),
            selected: false,
        },
        {
            name: t2("dataRetentionTitle"),
            text: t2("dataRetention"),
            selected: false,
        },
        {
            name: t2("userRightsTitle"),
            text: t2("userRights"),
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
            <section className="privacy-section">
                <div className="container">
                    <h2>{t("privacy")}</h2>
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
