"use client";
import { useEffect, useState, useContext } from "react";
import Shop from "../../Components/Shop/Shop";
import "./page.scss";
import filterIcon from "../../../../Assets/filter-icon.svg";
import Categories from "../../../../types/categories";

import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMinus, faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import "react-loading-skeleton/dist/skeleton.css";
import dynamic from "next/dynamic";
import { SearchContext } from "../../provider";
import { useRouter } from "next/navigation";
const Skeleton = dynamic(() => import("react-loading-skeleton"));

const Shops = (props: any) => {
    const { push } = useRouter();
    const { filter } = props.searchParams;
    const { submittedSearchText, searchActive } = useContext(SearchContext);
    const t = useTranslations("shopsPage");
    const t2 = useTranslations("homePage");
    const localActive = useLocale();

    const [shops, setShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState([]);
    const [currentItems, setCurrentItems] = useState(shops);
    const [heading, setHeading] = useState("");

    const [itemOffSet, setItemOffSet] = useState(0);
    const [endOffSet, setEndOffSet] = useState(0);
    const [mobileFilterMenu, setMobileFilterMenu] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [pageCount, setPageCount] = useState(0);
    const [atLeastOneVariantSelected, setAtLeastOneVariantSelected] = useState(false);
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState<any>([]);

    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        setHeading(filter ? t2(filter) : t2("shops"));

        axios
            .get("api/shop/all")
            .then((res) => {
                let shops = res.data.shops;
                setShops(shops.reverse());

                if (filter) {
                    shops = shops.filter((shop: any) => {
                        if (shop.categoryName) {
                            console.log(shop.categoryName, t2(filter));
                            if (shop.categoryName === t2(filter)) return shop;
                        }
                    });
                    setFilteredShops(shops.reverse());
                } else {
                    shops = shops.filter((shop: any) => {
                        if (shop.categoryName) {
                            if (shop.categoryName === t2("shops")) return shop;
                        }
                    });
                    setFilteredShops(shops.reverse());
                }

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });

        axios
            .get(`/${localActive}/api/categories/all`)
            .then((res) => {
                const categoriesDB = res.data.categories;
                categoriesDB.map((categ: any) => {
                    if (filter) {
                        if (categ.category === filter) {
                            categ.clicked = true;
                        }
                    } else {
                        if (categ.category === "shops") {
                            categ.clicked = true;
                        }
                    }

                    return categ;
                });
                setCategories(categoriesDB);

                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (shops.length || filteredShops.length) {
            let filtered = false;

            const arr = shops.filter((shop: any) => {
                filtered = false;

                selectedCategories.map((category: any) => {
                    shop.subCategories.map((shopCateg: any, index: number) => {
                        if (
                            shopCateg.subCategoryArm === category.subCategoryArm ||
                            shopCateg.subCategoryEng === category.subCategoryEng
                        ) {
                            filtered = true;
                        }
                        return shopCateg;
                    });

                    return category;
                });

                if (filtered) return shop;
            });

            if (arr.length && searchActive && submittedSearchText.length) {
                const filteredShops = arr.filter((shop: any) => {
                    if (
                        shop.buisnessName.toLowerCase().includes(submittedSearchText.toLowerCase()) ||
                        shop.descriptionArm.toLowerCase().includes(submittedSearchText.toLowerCase()) ||
                        shop.descriptionEng.toLowerCase().includes(submittedSearchText.toLowerCase())
                    ) {
                        return shop;
                    }
                });
                setFilteredShops(filteredShops);
            } else if (!arr.length && searchActive && submittedSearchText.length) {
                const filteredShops = shops.filter((shop: any) => {
                    if (
                        shop.buisnessName.toLowerCase().includes(submittedSearchText.toLowerCase()) ||
                        shop.descriptionArm.toLowerCase().includes(submittedSearchText.toLowerCase()) ||
                        shop.descriptionEng.toLowerCase().includes(submittedSearchText.toLowerCase())
                    ) {
                        return shop;
                    }
                });
                setFilteredShops(filteredShops);
            } else if (arr.length && !searchActive && !submittedSearchText.length) {
                setFilteredShops(arr);
            } else if (!arr.length && !searchActive && !submittedSearchText.length) {
                if (filter) {
                    const array = shops.filter((shop: any) => {
                        if (shop.categoryName) {
                            if (shop.categoryName === t2(filter)) return shop;
                        }
                    });
                    setFilteredShops(array.reverse());
                } else {
                    const array = shops.filter((shop: any) => {
                        if (shop.categoryName) {
                            if (shop.categoryName === t2("shops")) return shop;
                        }
                    });
                    setFilteredShops(array);
                }
            }
        }
    }, [submittedSearchText, searchActive]);

    useEffect(() => {
        if (shops.length || filteredShops.length) {
            setEndOffSet(itemOffSet + itemsPerPage);
            const arr = filteredShops.length > 0 ? filteredShops.slice(itemOffSet, itemOffSet + itemsPerPage) : [];

            setCurrentItems(arr);

            const count = filteredShops.length > 0 ? Math.ceil(filteredShops.length / itemsPerPage) : 0;
            setPageCount(count);
            setLoading(false);
        }
    }, [itemOffSet, filteredShops, searchActive, submittedSearchText]);

    const handlePageClick = (e: any) => {
        const newOffset = (e.selected * itemsPerPage) % shops.length;
        setItemOffSet(newOffset);
    };

    const toggleCheck = (categ: any, index: number) => {
        setAtLeastOneVariantSelected(true);
        categ.variants.map((vari: any, ind: number) => {
            if (ind === index) {
                vari.selected = !vari.selected;
                let array: any = [...selectedCategories];
                if (vari.selected) {
                    array = [
                        ...selectedCategories,
                        {
                            subCategoryArm: vari.subCategoryArm,
                            subcategoryEng: vari.subCategoryEng,
                        },
                    ];
                } else {
                    array.pop();
                }
                setSelectedCategories(array);
            }
            return vari;
        });

        setCategories([...categories]);
    };

    const handleOpenDropDown = (index: number, categoryName: string) => {
        clearFilters();
        setHeading(t2(categoryName));

        const arr = categories.map((categ: any, ind: number) => {
            if (index === ind) {
                categ.clicked = !categ.clicked;

                if (categ.clicked) {
                    const arr = shops.filter((shop: any) => {
                        if (shop.categoryName === t2(categ.category)) return shop;
                    });
                    setFilteredShops(arr);
                    push(`?filter=${categ.category}`);
                }
            } else {
                categ.clicked = false;
            }
            return categ;
        });
        setCategories(arr);
    };

    const clearFilters = () => {
        const arr = categories.map((categ: any) => {
            categ?.variants?.map((vari: any) => {
                vari.selected = false;
                return vari;
            });
            return categ;
        });

        setAtLeastOneVariantSelected(false);
        setSelectedCategories([]);
        setCategories(arr);
    };

    const filterMobile = () => {
        closeMobileFilter();
    };

    const openMobileFilter = () => {
        setMobileFilterMenu(true);
    };

    const closeMobileFilter = () => {
        setMobileFilterMenu(false);
    };

    return (
        <div>
            <section className="shops-section">
                <h2>{heading}</h2>
                <div className="container">
                    {mobileFilterMenu && (
                        <div className="filters-container-mobile">
                            <div className="container">
                                <div className="filter-heading-container-mobile">
                                    <div>
                                        <h3>{heading}</h3>
                                        <Image
                                            src={filterIcon}
                                            alt={"filter"}
                                        ></Image>
                                    </div>
                                    <FontAwesomeIcon
                                        icon={faX}
                                        onClick={closeMobileFilter}
                                    />
                                </div>

                                {categories.length
                                    ? categories.map((category: any, index: number) => {
                                          return (
                                              <div
                                                  className="categories-mobile"
                                                  key={index}
                                              >
                                                  <div
                                                      className="categories-with-plus-mobile"
                                                      onClick={() => handleOpenDropDown(index, category.category)}
                                                  >
                                                      {t2(category.category)}
                                                      {category.clicked ? (
                                                          <FontAwesomeIcon icon={faMinus} />
                                                      ) : (
                                                          <FontAwesomeIcon icon={faPlus} />
                                                      )}
                                                  </div>
                                                  <div
                                                      className={
                                                          (category.clicked ? "clicked " : "") + "dropdown-slider"
                                                      }
                                                  >
                                                      {category.variants.length
                                                          ? category.variants.map((variant: any, index: number) => {
                                                                return (
                                                                    <div
                                                                        className="variant"
                                                                        key={index}
                                                                        onClick={() => toggleCheck(category, index)}
                                                                    >
                                                                        <div></div>
                                                                        <div
                                                                            className={
                                                                                (variant.selected ? "checked " : "") +
                                                                                "checkbox-round"
                                                                            }
                                                                        >
                                                                            {variant.selected ? (
                                                                                <FontAwesomeIcon
                                                                                    icon={faCheckCircle}
                                                                                ></FontAwesomeIcon>
                                                                            ) : (
                                                                                ""
                                                                            )}
                                                                        </div>
                                                                        <div className="variant-text-container">
                                                                            {localActive === "hy"
                                                                                ? variant.subCategoryArm
                                                                                : variant.subCategoryEng}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })
                                                          : ""}
                                                  </div>
                                              </div>
                                          );
                                      })
                                    : ""}

                                <div className="buttons-container-mobile">
                                    <div
                                        className={
                                            (atLeastOneVariantSelected ? "" : "display-none") + " clear-filters-mobile"
                                        }
                                        onClick={clearFilters}
                                    >
                                        {t("clearFilters")}
                                    </div>
                                    <button
                                        className="filter-check-mobile button"
                                        onClick={filterMobile}
                                    >
                                        {t("filter")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="filters-container">
                        <div className="filter-heading-container">
                            <h3>{t("filters")}</h3>
                            <Image
                                src={filterIcon}
                                alt={"filter"}
                            ></Image>
                        </div>

                        {categories.length ? (
                            categories.map((category: any, index: number) => {
                                return (
                                    <div
                                        className="categories"
                                        key={index}
                                    >
                                        <div
                                            className="categories-with-plus "
                                            onClick={() => handleOpenDropDown(index, category.category)}
                                        >
                                            {t2(category.category)}
                                            {category.clicked ? (
                                                <FontAwesomeIcon icon={faMinus} />
                                            ) : (
                                                <FontAwesomeIcon icon={faPlus} />
                                            )}
                                        </div>
                                        <div className={(category.clicked ? "clicked " : "") + "dropdown-slider"}>
                                            {category?.variants?.length
                                                ? category?.variants.map((variant: any, index: number) => {
                                                      return (
                                                          <div
                                                              className="variant"
                                                              key={index}
                                                              onClick={() => toggleCheck(category, index)}
                                                              title={
                                                                  localActive === "hy"
                                                                      ? variant.subCategoryArm
                                                                      : variant.subCategoryEng
                                                              }
                                                          >
                                                              <div
                                                                  className={
                                                                      (variant.selected ? "checked " : "") +
                                                                      "checkbox-round"
                                                                  }
                                                              >
                                                                  {variant.selected ? (
                                                                      <FontAwesomeIcon
                                                                          icon={faCheckCircle}
                                                                      ></FontAwesomeIcon>
                                                                  ) : (
                                                                      ""
                                                                  )}
                                                              </div>
                                                              <div className="variant-text-container">
                                                                  {localActive === "hy"
                                                                      ? variant.subCategoryArm
                                                                      : variant.subCategoryEng}
                                                              </div>
                                                          </div>
                                                      );
                                                  })
                                                : ""}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div>
                                <Skeleton
                                    height={40}
                                    highlightColor="#e0e0e0"
                                    className="margin-bottom-10"
                                />
                                <Skeleton
                                    count={5}
                                    height={20}
                                    highlightColor="#e0e0e0"
                                    className="margin-bottom-5"
                                />
                                <Skeleton
                                    height={40}
                                    highlightColor="#e0e0e0"
                                    className="margin-bottom-10 margin-top-10"
                                />
                                <Skeleton
                                    count={5}
                                    height={20}
                                    highlightColor="#e0e0e0"
                                    className="margin-bottom-5"
                                />
                            </div>
                        )}

                        <div
                            className={(atLeastOneVariantSelected ? "" : "display-none") + " clear-filters"}
                            onClick={clearFilters}
                        >
                            {t("clearFilters")}
                        </div>
                    </div>

                    <div className={(mobileFilterMenu ? "display-none" : "") + " shops-container"}>
                        {searchActive && currentItems.length === 0 ? (
                            ""
                        ) : (
                            <div
                                className="filters-btn-mobile"
                                onClick={openMobileFilter}
                            >
                                {t("filters")}
                                <Image
                                    src={filterIcon}
                                    alt="Filter"
                                ></Image>
                            </div>
                        )}

                        {currentItems.length > 0 ? (
                            currentItems.map((shop: any, index) => {
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

                                instaPageLink = instaPageLink.split("https://www.instagram.com");
                                if (approved) {
                                    return (
                                        <Shop
                                            key={index}
                                            buisnessName={buisnessName}
                                            descriptionArm={descriptionArm}
                                            descriptionEng={descriptionEng}
                                            instaPageLink={instaPageLink}
                                            // instaPfpPreview={instaPfpPreview}
                                            instaPfpPreview={""}
                                            categoryName={categoryName}
                                            subCategories={subCategories}
                                        ></Shop>
                                    );
                                }
                            })
                        ) : loading ? (
                            <div style={{ width: "100%", display: "flex" }}>
                                <Skeleton
                                    highlightColor="#e0e0e0"
                                    containerClassName="shop-box-skeleton"
                                />
                                <Skeleton
                                    highlightColor="#e0e0e0"
                                    containerClassName="shop-box-skeleton"
                                />
                            </div>
                        ) : (
                            <div>
                                <h1>{t("noResults")}</h1>
                                <p>{t("trySearchingSmthElse")}</p>
                            </div>
                        )}
                    </div>
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
            </section>
        </div>
    );
};

export default Shops;
