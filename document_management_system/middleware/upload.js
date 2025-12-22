import { upload } from "../config/multer.config.js";

export const uploadAvatar = upload.single("avatar");
//export const uploadMultiple = upload.array("files", 5);
