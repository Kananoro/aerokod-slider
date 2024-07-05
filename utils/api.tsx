import axios from "axios";
import { List } from "@/schemas/api-types";

const instance = axios.create({
	baseURL: "http://localhost:4000",
});

async function getSliderList() {
	try {
		const data = await instance.get("/list");
		return data.data;
	} catch (error) {
		const data: List[] = []
		return data;
	}
}

export const api = { getSliderList };
