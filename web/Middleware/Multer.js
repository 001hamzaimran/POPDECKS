import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'public/assets';
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir); // Save the file in the 'public/assets' directory
  },
  filename: (req, file, cb) => {
    // Save file with a unique timestamp and its original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File type filter (only allow video files of any type)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('video/')) {
    cb(new Error('Invalid file type. Video files are not allowed.'), false);
  } else {
    cb(null, true);
  }
};


// Multer setup with no file size limit
export const upload = multer({
  storage,
  fileFilter
  // No file size limit, allowing any size
});