import { fetch } from "./core";

// 导出初始化工作簿 API
export const API_getWorkerBook = (gridKey: string) => {
	return fetch({
		url: "/getWorkerBook",
		method: "post",
		data: { gridKey },
	});
};

// 导出图片上传API
export const API_uploadImage = (data: FormData) => {
	return fetch({
		url: "/uploadImage",
		method: "POST",
		data,
	});
};
