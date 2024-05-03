"use client";
import { useEffect, useState, useContext } from "react";
import Shop from "../../Components/Shop/Shop";
import "./page.scss";
import filterIcon from "../../../../Assets/filter-icon.svg";

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

    let { filter, page } = props.searchParams;
    if (!filter && !page) {
        filter = "";
        page = 1;
    }
    const { submittedSearchText, searchActive } = useContext(SearchContext);
    const itemsPerPage = 6;

    const t = useTranslations("shopsPage");
    const t2 = useTranslations("homePage");
    const localActive = useLocale();

    const [shops, setShops] = useState([]);
    const [filteredShops, setFilteredShops] = useState<any>([]);
    const [currentItems, setCurrentItems] = useState(shops);
    const [heading, setHeading] = useState("");
    const [itemOffSet, setItemOffSet] = useState(page ? (page - 1) * itemsPerPage : 0);
    const [mobileFilterMenu, setMobileFilterMenu] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [atLeastOneVariantSelected, setAtLeastOneVariantSelected] = useState(false);
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState<any>([]);

    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        setHeading(filter ? t2(filter) : t2("all"));

        axios
            .get("api/shop/all")
            .then((res) => {
                let shops = res.data.shops;
                setShops(shops);

                if (filter) {
                    const arr = shops.filter((shop: any) => {
                        if (shop.categoryName && shop.approved) {
                            if (shop.categoryName === filter) return shop;
                        }
                    });

                    setFilteredShops(arr);
                } else {
                    const arr = shops.filter((shop: any) => {
                        if (shop.categoryName && shop.approved) {
                            return shop;
                        }
                    });
                    setFilteredShops(arr);
                }
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
                    }

                    return categ;
                });
                setCategories(categoriesDB);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (filteredShops.length) {
            let renderingArray = filteredShops;

            // -------------------------------------------------
            // Filters the shops which contain the searched text
            // -------------------------------------------------
            if (searchActive && submittedSearchText.length) {
                // User searched for something?
                renderingArray = filteredShops.filter((shop: any) => {
                    if (
                        shop.buisnessName.toLowerCase().includes(submittedSearchText.toLowerCase()) &&
                        shop.approved &&
                        shop.active
                    ) {
                        return true;
                    }
                });
            }

            // -----------------------------------------------------
            // Filters the shops which contain the selected variants
            // -----------------------------------------------------
            if (selectedCategories.length) {
                renderingArray = renderingArray?.filter((shop: any) => {
                    const filtered = shop?.subCategories?.some((shopCateg: any) => {
                        // Check if any category in selectedCategories matches shopCateg
                        return selectedCategories.some(
                            (categ: any) =>
                                categ.subCategoryArm === shopCateg.subCategoryArm && shop.approved && shop.active
                        );
                    });

                    return filtered;
                });
            }

            renderCurrentItems(renderingArray);
        }
    }, [itemOffSet, filteredShops, selectedCategories, submittedSearchText]);

    const renderCurrentItems = (currentArray: any) => {
        // Render current page shops ( max 12 )
        const arr = currentArray.length > 0 ? currentArray.slice(itemOffSet, itemOffSet + itemsPerPage) : [];
        setCurrentItems(arr);

        // Decide the pagination page count
        const count = currentArray.length > 0 ? Math.ceil(currentArray.length / itemsPerPage) : 0;
        setPageCount(count);
        if (page - 1 >= count) {
            autoChangePage(0);
        }
        setLoading(false);
    };

    const handlePageClick = (e: any) => {
        const newOffset = (e.selected * itemsPerPage) % filteredShops.length;
        push(`?filter=${filter}&page=${e.selected + 1}`);
        setItemOffSet(newOffset);
    };

    const autoChangePage = (val: number) => {
        setItemOffSet(val * itemsPerPage);
    };

    const toggleCheck = (categ: any, index: number) => {
        setAtLeastOneVariantSelected(true);
        push(`?filter=${categ.category}&page=${1}`);
        autoChangePage(0);

        categ.variants.map((vari: any, ind: number) => {
            if (ind === index) {
                vari.selected = !vari.selected;

                let array: any = [...selectedCategories];
                if (vari.selected) {
                    array = [
                        ...selectedCategories,
                        {
                            subCategoryArm: vari.subCategoryArm,
                            subCategoryEng: vari.subCategoryEng,
                        },
                    ];
                } else {
                    array = array.filter((variant: any) => variant.subCategoryArm !== vari.subCategoryArm);
                }
                if (!array.length) {
                    setAtLeastOneVariantSelected(false);
                }
                setSelectedCategories(array);
            }
            return vari;
        });
    };

    const handleOpenDropDown = (index: number, categoryName: string) => {
        clearFilters();
        setHeading(t2(categoryName));

        const arr = categories.map((categ: any, ind: number) => {
            if (index === ind) {
                categ.clicked = !categ.clicked;

                if (categ.clicked) {
                    const arr = shops.filter((shop: any) => {
                        if (shop.categoryName === categ.category) return shop;
                    });
                    setFilteredShops(arr);
                    push(`?filter=${categ.category}&page=${1}`);
                    autoChangePage(0);
                } else {
                    setFilteredShops(shops);
                    setHeading(t2("all"));
                    push(`?filter=${categ.category}&page=${1}`);
                    autoChangePage(0);
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
        <>
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

                        {currentItems && currentItems.length > 0 ? (
                            currentItems?.map((shop: any, index) => {
                                const {
                                    buisnessName,
                                    descriptionArm,
                                    descriptionEng,
                                    instaPageLink,
                                    instaPfpPreview,
                                    categoryName,
                                    subCategories,
                                    approved,
                                    active,
                                } = shop;

                                if (approved && active) {
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
                        forcePage={page - 1 > pageCount ? 0 : page - 1}
                    />
                )}
            </section>
        </>
    );
};

export default Shops;
