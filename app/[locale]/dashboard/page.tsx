"use client";
import { usePathname, useRouter } from "next/navigation";
import "./page.scss";
import { useEffect } from "react";

const Dashboard = () => {
    const { push } = useRouter();
    const path = usePathname();

    useEffect(() => {
        push(`${path}/notifications`);
    }, []);

    return <div>Loading</div>;
};

export default Dashboard;
