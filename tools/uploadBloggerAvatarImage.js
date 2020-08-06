const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/userProfile')
  },
  filename: function(req, file, cb) {
    cb(null, 'userProfile' + '-' + file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});




// Init upload 
module.exports.uploadBloggerAvatarImage = multer({
  storage: storage, 
  limits: {
    fileSize: 10000000
  },

  fileFilter: function(req, file, cb){

    // allowed ext
    const fileTypes = /jpeg|jpg|png|gif/ ; 
    // check the extension 
    const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    // check meme
    const mimeType = fileTypes.test(file.mimetype);

    if(mimeType && extname){
      return cb (null, true);
    } else {
      cb ('Error: Images Only!')
    }
  }
})



