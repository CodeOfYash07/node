const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "ecommerce",
        format: async () => 'png',
        public_id: (req, file) => file.fieldname + '-' + Date.now()
    }
});