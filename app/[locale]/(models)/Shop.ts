import mongoose, { Schema } from "mongoose";

const shopSchema = new Schema({
    buisnessName: String,
    email: String,
    instaPageLink: String,
    descriptionArm: String,
    descriptionEng: String,
    instaPfpPreview: String,
    subCategories: Array,
});

const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema);
export default Shop;
