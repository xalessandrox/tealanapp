import { Lesson } from "./Lesson";
import { Level } from "../enums/Level";
import { Status } from "../enums/Status";
import { LanguageResource } from "./LanguageResource";

export interface Student {
	id: number,
	firstName: string,
	lastName: string,
	email?: string,
	phone?: string,
	language: LanguageResource[],
	lessons?: Lesson[],
	balance: number,
	status?: Status,
	level?: Level,
	createdAt?: Date
}