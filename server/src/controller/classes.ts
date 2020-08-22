import { Request, Response } from "express";

import db from "../database/connection";
import convertHourToMinute from "../utils/convertHourToMinute";

interface ScheduleItem {
	week_day: number;
	from: string;
	to: string;
}
export async function index(req: Request, res: Response) {
	const queries = req.query;
	const filters = {
		week_day: queries.week_day ? queries.week_day : null,
		subject: queries.subject ? queries.subject : "",
		time: queries.time ? convertHourToMinute(queries.time as string) : null,
	};

	const classes = await db("classes")
		.where(function () {
			this.where("classes.subject", "ilike", "%" + filters.subject + "%");
			if (filters.time) {
				this.andWhere("class_schedule.from", "<=", filters.time);
				this.andWhere("class_schedule.to", ">", filters.time);
			}

			if (filters.week_day) {
				this.andWhere(
					"class_schedule.week_day",
					"=",
					Number(filters.week_day)
				);
			}
		})
		.select(["classes.*", "users.*"])
		.join("class_schedule", "class_schedule.class_id", "=", "classes.id")
		.join("users", "classes.user_id", "=", "users.id")
		.groupBy("classes.id", "users.id");

	return res.json(classes);
}

export async function create(req: Request, res: Response) {
	const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;
	const trx = await db.transaction();
	try {
		const createdUser = await trx("users")
			.insert({
				name,
				avatar,
				whatsapp,
				bio,
			})
			.returning("id");

		const user_id = +createdUser;

		const createdClasses = await trx("classes")
			.insert({
				subject,
				cost,
				user_id,
			})
			.returning("id");

		const class_id = +createdClasses;

		const classSchedule = schedule.map((item: ScheduleItem) => {
			return {
				week_day: Number(item.week_day),
				from: convertHourToMinute(item.from),
				to: convertHourToMinute(item.to),
				class_id,
			};
		});

		await trx("class_schedule").insert(classSchedule);

		await trx.commit();

		return res.status(201).send();
	} catch (err) {
		await trx.rollback();
		return res.status(400).json({
			error: "Unexpected error while creating new class",
		});
	}
}
