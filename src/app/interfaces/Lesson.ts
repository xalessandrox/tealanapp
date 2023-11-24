import { Student } from "./Student";
import { Language } from "../enums/Language";

export interface Lesson {

	id: number,
	startsAt: Date,
	finishesAt: Date,
	duration: number,
	students: Student[],
	language: Language

}