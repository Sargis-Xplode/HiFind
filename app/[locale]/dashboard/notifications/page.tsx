"use client";
import { CSSProperties, useEffect, useState } from "react";
import "../page.scss";
import axios from "axios";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import sortLogo from "../../../../Assets/sort-icon.svg";
import AdminAsidePanel from "../../Components/AdminAsidePanel/AdminAsidePanel";
import TableRow from "../../Components/TableRow/TableRow";
import ReactPaginate from "react-paginate";
import { useLocale } from "next-intl";

import dynamic from "next/dynamic";
import "react-loading-skeleton/dist/skeleton.css";

const Skeleton = dynamic(() => import("react-loading-skeleton"));

const Notification = () => {
    const localActive = useLocale();
    const [loading, setLoading] = useState(true);
    const [updateShops, setUpdateShops] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [order, setOrder] = useState("desc");

    const [shops, setShops] = useState<any>([]);

    const [currentItems, setCurrentItems] = useState(shops);
    const [itemOffSet, setItemOffSet] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [pageCount, setPageCount] = useState(0);
    const [notificationCounter, setNotificationCounter] = useState(0);

    useEffect(() => {
        axios
            .get(`/${localActive}/api/shop/all`)
            .then((res) => {
                const shops = res.data.shops;
                setShops(shops);
                let count = 0;
                shops.map((shop: any) => {
                    if (shop.newRequest) {
                        count++;
                    }
                    return shop;
                });
                localStorage.setItem("notification_counter", count.toString());
                setNotificationCounter(count);

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, [updateShops]);

    useEffect(() => {
        if (shops.length) {
            setLoading(false);

            const arr = shops.slice(itemOffSet, itemOffSet + itemsPerPage);

            setCurrentItems(arr);

            const count = Math.ceil(shops.length / itemsPerPage);
            setPageCount(count);
        }
    }, [shops, rerender, itemOffSet, notificationCounter]);

    const handlePageClick = (e: any) => {
        const newOffset = (e.selected * itemsPerPage) % shops.length;
        setItemOffSet(newOffset);
    };

    const sortByDateAscending = () => {
        setOrder("asc");
        const arr = shops.sort((a: any, b: any) => {
            const dateA: any = new Date(a.date.split("/")[2], a.date.split("/")[1] - 1, a.date.split("/")[0]);
            const dateB: any = new Date(b.date.split("/")[2], b.date.split("/")[1] - 1, b.date.split("/")[0]);
            return dateA - dateB;
        });

        setShops(arr);
        setRerender(!rerender);
    };

    const sortByDateDescending = () => {
        setOrder("desc");

        const arr = shops.sort((a: any, b: any) => {
            const dateA: any = new Date(a.date.split("/")[2], a.date.split("/")[1] - 1, a.date.split("/")[0]);
            const dateB: any = new Date(b.date.split("/")[2], b.date.split("/")[1] - 1, b.date.split("/")[0]);
            return dateB - dateA;
        });

        setShops(arr);
        setRerender(!rerender);
    };

    return (
        <section className="admin-shops-section">
            <AdminAsidePanel
                selected={"notifications"}
                notificationCounter={notificationCounter}
            ></AdminAsidePanel>
            <main>
                <h2>Ծանուցումներ</h2>

                <div className="table">
                    <div className="table-titles">
                        <p className="name-title">Անուն</p>
                        <p className="email-title">Էլ. հասցե</p>
                        <p>Ինստագրամ</p>
                        <p>Նկարագրություն</p>
                        <p>Ընտրացանկ</p>
                        <p className="date-tile">
                            Օրը{" "}
                            <Image
                                onClick={() => {
                                    if (order === "asc") {
                                        sortByDateDescending();
                                    } else if (order === "desc") {
                                        sortByDateAscending();
                                    }
                                }}
                                src={sortLogo}
                                alt="Sort"
                            ></Image>
                        </p>
                    </div>

                    {currentItems.length ? (
                        currentItems.map((shop: any, index: number) => {
                            return (
                                <TableRow
                                    key={index}
                                    newRequest={shop.newRequest}
                                    instaPfpPreview={shop.instaPfpPreview}
                                    buisnessName={shop.buisnessName}
                                    email={shop.email}
                                    instaPageLink={shop.instaPageLink}
                                    descriptionArm={shop.descriptionArm}
                                    descriptionEng={shop.descriptionEng}
                                    subCategories={shop.subCategories}
                                    date={shop.date}
                                    approved={shop.approved}
                                    denied={shop.denied}
                                    id={shop._id}
                                    page={"notifications"}
                                    updateShops={updateShops}
                                    setUpdateShops={setUpdateShops}
                                    toast={toast}
                                ></TableRow>
                            );
                        })
                    ) : loading ? (
                        <Skeleton
                            height={100}
                            count={5}
                            highlightColor="#e0e0e0"
                            className="margin-bottom-10"
                        />
                    ) : (
                        <p>Nothing here yet</p>
                    )}
                </div>
                {pageCount >= 2 && (
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={(e) => handlePageClick(e)}
                        pageRangeDisplayed={3}
                        pageCount={pageCount}
                        previousLabel="<"
                        renderOnZeroPageCount={null}
                        activeClassName={"selected-page"}
                    />
                )}
            </main>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </section>
    );
};

export default Notification;
