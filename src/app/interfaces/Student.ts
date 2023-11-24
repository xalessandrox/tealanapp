import { Language } from "../enums/Language";
import { Lesson } from "./Lesson";
import { Level } from "../enums/Level";
import { Status } from "../enums/Status";

export interface Student {
	id: number,
	firstName: string,
	lastName: string,
	email?: string,
	phone?: string,
	language: Language[],
	lessons?: Lesson[],
	balance: number,
	status?: Status,
	level?: Level,
	createdAt?: Date
}