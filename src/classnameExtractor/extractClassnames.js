import path from "path";
import fs from "fs/promises";
import { extractClassnamesFromHTML } from "./extractClassnamesFromHTML.js";
import { extractClassnamesFromJSX } from "./extractClassnamesFromJSX.js";
import { extractClassnamesFromJS } from "./extractClassnamesFromJS.js";

export const extractClassnames = async (file, classNames) => {
	const fileName = path.basename(file);
	if (!fileName.includes("baristaIgnore")) {
		try {
			const content = await fs.readFile(file, "utf-8");
			const extension = path.extname(file);
			if ([".js", ".ts", ".jsx", ".tsx"].includes(extension)) {
				extractClassnamesFromJSX(content, classNames);
				extractClassnamesFromJS(content, classNames);
			} else if (extension === ".html") {
				extractClassnamesFromHTML(content, classNames);
			}
		} catch (error) {
			console.error(`Error processing file ${file}:`, error);
		}
	}
};
