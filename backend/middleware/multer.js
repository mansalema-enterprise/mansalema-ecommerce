import multer from "multer";

const storage = multer.memoryStorage(); // store files in memory (RAM)
const upload = multer({ storage });

export default upload;
