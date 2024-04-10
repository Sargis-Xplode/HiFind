"use client";

import { useEffect, useState } from "react";
import "./page.scss";
import axios from "axios";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCheckCircle, faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import editIcon from "../../../../Assets/edit-icon.svg";
import deleteIcon from "../../../../Assets/delete-icon.svg";
import AdminAsidePanel from "../../Components/AdminAsidePanel/AdminAsidePanel";
import { useLocale } from "next-intl";

const CategoriesList = () => {
    const localActive = useLocale();

    const [categories, setCategories] = useState([]);
    const [showAddNewCategoryModal, setShowAddNewCategoryModal] = useState(false);
    const [showEditCategoryModal, setShowEditCategoryModal] = useState(false);
    const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

    const [newCategoryName, setNewCategoryName] = useState("");
    const [clicked, setClicked] = useState(false);
    const [updateCategories, setUpdateCategories] = useState(false);

    const [subCategories, setSubCategories] = useState<any>([
        {
            subCategoryArm: "",
            subCategoryEng: "",
        },
    ]);

    useEffect(() => {
        axios
            .get(`/${localActive}/api/categories/all`)
            .then((res) => {
                const categoriesDB = res.data.categories;
                setCategories(categoriesDB);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [updateCategories]);

    const openAddNewCategoryModal = () => {
        setShowAddNewCategoryModal(true);
    };

    const closeAddNewCategoryModal = () => {
        setShowAddNewCategoryModal(false);
    };

    const openEditCategoryModal = () => {
        setShowEditCategoryModal(true);
    };

    const closeEditCategoryModal = () => {
        setShowEditCategoryModal(false);
    };

    const openDeleteCategoryModal = () => {
        setShowDeleteCategoryModal(true);
    };

    const closeDeleteCategoryModal = () => {
        setShowDeleteCategoryModal(false);
    };

    const handleOpenDropDown = (index: number) => {
        const arr: any = categories.map((categ: any, ind: number) => {
            if (index === ind) {
                categ.clicked = !categ.clicked;
            }
            return categ;
        });
        setCategories(arr);
    };

    const handleCategoryNameChange = (e: any) => {
        setNewCategoryName(e.target.value);
    };

    const handleSubcategoryInputChange = (e: any, ind: number, lang: string) => {
        const arr = subCategories.map((subCateg: any, index: number) => {
            if (index === ind) {
                if (lang === "hy") {
                    subCateg.subCategoryArm = e.target.value;
                } else {
                    subCateg.subCategoryEng = e.target.value;
                }
            }
            return subCateg;
        });
        setSubCategories(arr);
        setUpdateCategories(!updateCategories);
    };

    const addNewSubCategory = () => {
        const arr = [
            ...subCategories,
            {
                subCategoryArm: "",
                subCategoryEng: "",
            },
        ];
        setSubCategories(arr);
    };

    const submitNewCategory = () => {
        const body = {
            category: newCategoryName,
            clicked,
            variants: subCategories,
        };
        axios
            .post(`/${localActive}/api/categories/single`, JSON.stringify(body))
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        closeAddNewCategoryModal();
    };

    const handleEditCategoryItem = (categ: any) => {
        const body = {
            category: newCategoryName,
            clicked,
            variants: subCategories,
            id: categ._id,
        };
        axios
            .post(`/${localActive}/api/categories/single/update`, JSON.stringify(body))
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        closeEditCategoryModal();
    };

    const handleDeleteCategoryItem = (categ: any) => {
        const body = {
            id: categ._id,
        };

        console.log(body);
        axios
            .post(`/${localActive}/api/categories/single/delete`, JSON.stringify(body))
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setUpdateCategories(!updateCategories);
        closeDeleteCategoryModal();
    };

    return (
        <section className="categories-list-section">
            {showAddNewCategoryModal ? (
                <div
                    className="add-new-category-wrapper"
                    onClick={closeAddNewCategoryModal}
                >
                    <div
                        className="add-new-category-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <p
                            className="close-modal"
                            onClick={closeAddNewCategoryModal}
                        >
                            X
                        </p>
                        <h3>Ավելացնել նորը</h3>

                        <p>Ընտրացանկի անունը</p>
                        <input
                            type="text"
                            placeholder="Ընտրացանկի անունը"
                            onChange={(e) => handleCategoryNameChange(e)}
                            autoFocus
                        />

                        <div className="sub-categories-container">
                            {subCategories.length > 0
                                ? subCategories.map((subCateg: any, index: number) => {
                                      return (
                                          <div key={index}>
                                              <p>Ենթակատեգորիա {index > 0 ? index + 1 : ""}</p>
                                              <input
                                                  type="text"
                                                  placeholder="Ենթակատեգորիա (հայերեն)"
                                                  onChange={(e) => {
                                                      handleSubcategoryInputChange(e, index, "hy");
                                                  }}
                                                  value={subCateg?.subCategoryArm}
                                              />
                                              <input
                                                  type="text"
                                                  placeholder="Ենթակատեգորիա (անգլլերեն)"
                                                  onChange={(e) => {
                                                      handleSubcategoryInputChange(e, index, "en");
                                                  }}
                                                  value={subCateg?.subCategoryEng}
                                              />
                                          </div>
                                      );
                                  })
                                : ""}
                        </div>

                        <p
                            className="add-new-subCategory"
                            onClick={addNewSubCategory}
                        >
                            +Ավելացնել ենթակատեգորիա
                        </p>

                        <button
                            className="button"
                            onClick={submitNewCategory}
                        >
                            Ավելացնել
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}

            <AdminAsidePanel selected={"categories-list"}></AdminAsidePanel>
            <main>
                <div className="categories-list-header">
                    <h2>Ընտրացանկ</h2>
                    <div>
                        <button
                            className="button"
                            onClick={openAddNewCategoryModal}
                        >
                            + Ավելացնել նորը
                        </button>
                    </div>
                </div>

                <div className="list">
                    {categories.length
                        ? categories.map((categ: any, index) => {
                              return (
                                  <div
                                      className="category-item-container"
                                      key={index}
                                  >
                                      <div
                                          className={(categ.clicked ? "row-clicked" : "") + " row"}
                                          onClick={() => handleOpenDropDown(index)}
                                      >
                                          <div className="first-column">
                                              {categ.clicked ? (
                                                  <FontAwesomeIcon icon={faChevronUp}></FontAwesomeIcon>
                                              ) : (
                                                  <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                                              )}

                                              <p>{categ.category}</p>
                                          </div>
                                          <div className="edit-delete-icons">
                                              <div>
                                                  <Image
                                                      src={editIcon}
                                                      alt="Edit Icon"
                                                      //   onClick={(e) => {
                                                      //       e.stopPropagation();
                                                      //       handleEditCategoryItem(categ);
                                                      //   }}
                                                  ></Image>
                                              </div>
                                              <div>
                                                  <Image
                                                      src={deleteIcon}
                                                      alt="Edit Icon"
                                                      onClick={(e) => {
                                                          e.stopPropagation();
                                                          handleDeleteCategoryItem(categ);
                                                      }}
                                                  ></Image>
                                              </div>
                                          </div>
                                      </div>

                                      <div className={(categ?.clicked ? "clicked " : "") + "dropdown-slider"}>
                                          {categ.variants?.length
                                              ? categ.variants.map((variant: any, index: number) => {
                                                    return (
                                                        <div
                                                            className="variant"
                                                            key={index}
                                                        >
                                                            {localActive === "hy"
                                                                ? variant.subCategoryArm
                                                                : variant.subCategoryEng}
                                                        </div>
                                                    );
                                                })
                                              : ""}
                                      </div>
                                  </div>
                              );
                          })
                        : ""}
                </div>
            </main>
        </section>
    );
};

export default CategoriesList;
