const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.cloundName,
    api_key: process.env.APIKey,
    api_secret: process.env.APISecret,
});

exports.UploadCloudary = async (profileimg) => {
    try {
        // Accept either a file object or a string path
        const filePath = profileimg.path 
        const upload = await cloudinary.uploader.upload(filePath);
        
        return upload;
    } catch (e) {
        console.log(`cloudinary upload error ${e}`);
        throw e;
    }
};
