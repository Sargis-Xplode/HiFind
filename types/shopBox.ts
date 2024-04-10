interface Shop {
    buisnessName: string;
    descriptionArm: string;
    descriptionEng: string;
    instaPageLink: string;
    instaPfpPreview: string;
    subCategories: Array<{
        subCategoryArm: string;
        subCategoryEng: string;
        selected: boolean;
    }>;
}

export default Shop;
