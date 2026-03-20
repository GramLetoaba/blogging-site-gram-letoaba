const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type.'));
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
