const ExtraCategory = require('../model/extracategory.model');
const Category = require('../model/category.model');
const SubCategory = require('../model/subcategory.model');
const Product = require('../model/product.model');

// Add Page
module.exports.addExtraCategoryPage = async (req,res)=>{
    try{

        const admin = req.user;   // 👈 admin add કરો
        if(!admin){
            return res.redirect('/');
        }

        let categories = await Category.find();
        let subcategories = await SubCategory.find();

        res.render('extracategory/addExtraCategory',{
            admin,              // 👈 admin send કરો
            categories,
            subcategories
        });

    }catch(err){
        console.log(err);
    }
}

// Add Extra Category
module.exports.addExtraCategory = async (req, res) => {
    try {
        await ExtraCategory.create({
            name: req.body.name,
            category: req.body.category,
            subcategory: req.body.subcategory
        });
    } catch (err) {
        console.error(err);
    }
    res.redirect('/viewExtraCategories');
};

// View Page
module.exports.viewExtraCategoryPage = async (req, res) => {
    const admin = req.user;
    if (!admin) return res.redirect('/');

    const extras = await ExtraCategory.find()
        .populate('category')
        .populate('subcategory');

    res.render('extracategory/viewExtraCategories', { admin, extras });
};

// Edit Page
module.exports.editExtraCategoryPage = async (req, res) => {
    const admin = req.user;
    if (!admin) return res.redirect('/');

    const extra = await ExtraCategory.findById(req.params.id);
    const categories = await Category.find();
    const subcategories = await SubCategory.find({ category: extra.category });

    res.render('extracategory/editExtraCategory', { admin, extra, categories, subcategories });
};

// Update
module.exports.updateExtraCategory = async (req, res) => {
    try {
        await ExtraCategory.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            category: req.body.category,
            subcategory: req.body.subcategory
        });
    } catch (err) {
        console.error(err);
    }
    res.redirect('/viewExtraCategories');
};

// Delete
module.exports.deleteExtraCategory = async (req, res) => {
    const id = req.params.id;
    try {
        await Product.deleteMany({ extraCategory: id });
        await ExtraCategory.findByIdAndDelete(id);
    } catch (err) {
        console.error(err);
    }
    res.redirect('/viewExtraCategories');
};