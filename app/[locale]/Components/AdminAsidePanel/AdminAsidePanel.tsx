import Image from "next/image";
import "./adminAsidePanel.scss";

import logo from "../../../../Assets/logo.svg";
import signOutIcon from "../../../../Assets/sign-out-icon.svg";
import bellIcon from "../../../../Assets/bell-icon.svg";
import userCheckIcon from "../../../../Assets/user-check-icon.svg";
import userMinusIcon from "../../../../Assets/user-minus-icon.svg";
import filterIcon from "../../../../Assets/filter-icon.svg";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

const AdminAsidePanel = (props: any) => {
    const { selected, notificationCounter } = props;
    const localActive = useLocale();
    const router = useRouter();

    const logOut = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <aside>
            <div className="top-part">
                <Link href={"/"}>
                    <Image
                        src={logo}
                        alt="logo"
                    ></Image>
                </Link>
                <nav>
                    <div className={selected === "notifications" ? "selected" : ""}>
                        <Link href={`/${localActive}/dashboard/notifications`}>
                            <Image
                                src={bellIcon}
                                alt="Bell Icon"
                            ></Image>
                            <div>Ծանուցումներ</div>
                            {notificationCounter !== 0 ? <span>{notificationCounter}</span> : ""}
                        </Link>
                    </div>
                    <div className={selected === "approved" ? "selected" : ""}>
                        <Link href={`/${localActive}/dashboard/approved`}>
                            <Image
                                src={userCheckIcon}
                                alt="Bell Icon"
                            ></Image>
                            <div>Հաստատված հաշիվներ</div>
                        </Link>
                    </div>
                    <div className={selected === "denied" ? "selected" : ""}>
                        <Link href={`/${localActive}/dashboard/denied`}>
                            <Image
                                src={userMinusIcon}
                                alt="Bell Icon"
                            ></Image>
                            <div>Մերժված հայտեր</div>
                        </Link>
                    </div>
                    <div className={selected === "categories-list" ? "selected" : ""}>
                        <Link href={`/${localActive}/dashboard/categories-list`}>
                            <Image
                                src={filterIcon}
                                alt="Bell Icon"
                            ></Image>
                            <div>Ընտրացանկ</div>
                        </Link>
                    </div>
                </nav>
            </div>
            <div onClick={logOut}>
                <Image
                    src={signOutIcon}
                    alt="Sign Out Icon"
                ></Image>
                <p>Դուրս գալ</p>
            </div>
        </aside>
    );
};

export default AdminAsidePanel;
