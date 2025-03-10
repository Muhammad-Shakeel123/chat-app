import multer from 'multer';

const storage = multer.memoryStorage(); // Store file in memory (not disk)

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'), false);
  }
};

export const upload = multer({ storage, fileFilter });
