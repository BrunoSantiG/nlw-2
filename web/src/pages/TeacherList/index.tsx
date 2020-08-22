import React, { useState, FormEvent } from "react";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";

import "./styles.css";
import Input from "../../components/Input";
import Select from "../../components/Select";
import { api } from "../../services/api";

const TeacherList: React.FC = () => {
	const [subject, setSubject] = useState("");
	const [week_day, setWeekDay] = useState("");
	const [time, setTime] = useState("");
	const [teachers, setTeachers] = useState([]);
	const handleFilters = async (e: FormEvent) => {
		e.preventDefault();

		const request = await api.get("/classes", {
			params: {
				subject,
				week_day,
				time,
			},
		});

		setTeachers(request.data);
	};
	return (
		<div id="page-teacher-list" className="container">
			<PageHeader title="Estes são os proffys disponíveis.">
				<form id="search-teachers" onSubmit={handleFilters}>
					<Select
						name="Matéria"
						id="subject"
						value={subject}
						onChange={(e) => {
							setSubject(e.target.value);
						}}
						options={[
							{ value: "ReactJS", label: "ReactJs" },
							{ value: "React Native", label: "React Native" },
							{ value: "NodeJS", label: "NodeJS" },
							{ value: "DevOps", label: "DevOps" },
							{ value: "Laravel", label: "Laravel" },
						]}
					/>
					<Select
						name="Dia da semana"
						id="week"
						value={week_day}
						onChange={(e) => {
							setWeekDay(e.target.value);
						}}
						options={[
							{ value: "0", label: "Domingo" },
							{ value: "1", label: "Segunda-feira" },
							{ value: "2", label: "Terça-feira" },
							{ value: "3", label: "Quarta-feira" },
							{ value: "4", label: "Quinta-feira" },
							{ value: "5", label: "Sexta-feira" },
							{ value: "6", label: "Sábado" },
						]}
					/>
					<Input
						label="Hora"
						id="time"
						type="time"
						value={time}
						onChange={(e) => {
							setTime(e.target.value);
						}}
					/>
					<button type="submit">Buscar</button>
				</form>
			</PageHeader>
			<main>
				{teachers.map((teacher: Teacher) => {
					return <TeacherItem key={teacher.id} teacher={teacher} />;
				})}
			</main>
		</div>
	);
};

export default TeacherList;
