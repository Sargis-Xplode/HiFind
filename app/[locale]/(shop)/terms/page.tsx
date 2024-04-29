"use client";

import { useState } from "react";
import "./page.scss";
import { useTranslations } from "next-intl";

const Terms = () => {
    const t = useTranslations("footer");
    const t2 = useTranslations("terms");

    const [users, setUsers] = useState([
        {
            name: t2("termsOfUseTitle"),
            text: t2("termsOfUse"),
            selected: true,
        },
        {
            name: t2("accaptanceOfTermsTitle"),
            text: t2("accaptanceOfTerms"),
            selected: false,
        },
        {
            name: t2("useOfHiFIndTitle"),
            text: t2("useOfHiFInd"),
            selected: false,
        },
        {
            name: t2("websiteUseGuidelinesTitle"),
            text: t2("websiteUseGuidelines"),
            selected: false,
        },
        {
            name: t2("registrationAndAccountSecurityTitle"),
            text: t2("registrationAndAccountSecurity"),
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
