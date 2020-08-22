import React, { useState, FormEvent } from "react";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Select from "../../components/Select";

import warningIcon from "../../assets/images/icons/warning.svg";

import { api } from "../../services/api";

import "./styles.css";
import { useHistory } from "react-router-dom";

const TeacherForm: React.FC = () => {
	const history = useHistory();
	const [name, setName] = useState("");
	const [avatar, setAvatar] = useState("");
	const [whatsapp, setWhatsapp] = useState("");
	const [bio, setBio] = useState("");

	const [cost, setCost] = useState("");
	const [subject, setSubject] = useState("");

	const [scheduleItems, setScheduleItems] = useState([
		{
			week_day: "",
			from: "",
			to: "",
		},
	]);

	const addNewSchedule = () => {
		setScheduleItems([
			...scheduleItems,
			{
				week_day: "",
				from: "",
				to: "",
			},
		]);
	};

	const setScheduleItemValue = (
		pos: number,
		field: string,
		value: string
	) => {
		const updatedSchedule = scheduleItems.map((scheduleItem, index) => {
			return index === pos
				? { ...scheduleItem, [field]: value }
				: scheduleItem;
		});
		setScheduleItems(updatedSchedule);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		api.post("/classes", {
			name,
			avatar,
			bio,
			whatsapp,
			subject,
			cost: Number(cost),
			schedule: scheduleItems,
		})
			.then((req) => {
				alert("Cadastro realizado com sucesso!");
				history.push("/");
			})
			.catch((err) => {
				console.log(err.response);
				alert("Erro no cadastro");
			});
	};
	return (
		<div id="page-teacher-form" className="container">
			<PageHeader
				title="Que incrível que você quer dar aulas."
				description="O primeiro passo é preencher esse formulário de inscrição."
			/>
			<main>
				<form onSubmit={handleSubmit}>
					<fieldset>
						<legend>Seus dados</legend>
						<Input
							label="Nome completo"
							id="name"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						/>
						<Input
							label="Avatar"
							id="avatar"
							value={avatar}
							onChange={(e) => {
								setAvatar(e.target.value);
							}}
						/>
						<Input
							label="WhatsApp"
							id="whatsapp"
							value={whatsapp}
							onChange={(e) => {
								setWhatsapp(e.target.value);
							}}
						/>
						<TextArea
							label="Bio"
							id="bio"
							value={bio}
							onChange={(e) => {
								setBio(e.target.value);
							}}
						/>
					</fieldset>
					<fieldset>
						<legend>Sobre a aula</legend>
						<Select
							name="Matéria"
							id="subject"
							value={subject}
							onChange={(e) => {
								setSubject(e.target.value);
							}}
							options={[
								{ value: "ReactJS", label: "ReactJs" },
								{
									value: "React Native",
									label: "React Native",
								},
								{ value: "NodeJS", label: "NodeJS" },
								{ value: "DevOps", label: "DevOps" },
								{ value: "Laravel", label: "Laravel" },
							]}
						/>
						<Input
							label="Custo da sua hora por aula"
							id="cost"
							value={cost}
							onChange={(e) => {
								setCost(e.target.value);
							}}
						/>
					</fieldset>

					<fieldset>
						<legend>
							Horários disponíveis{" "}
							<button type="button" onClick={addNewSchedule}>
								+ Novo horário
							</button>
						</legend>
						{scheduleItems.map((scheduleItem, index) => {
							return (
								<div className="schedule-item" key={index}>
									<Select
										name="Dia da semana"
										value={scheduleItem.week_day}
										onChange={(e) => {
											setScheduleItemValue(
												index,
												"week_day",
												e.target.value
											);
										}}
										id="week"
										options={[
											{ value: "0", label: "Domingo" },
											{
												value: "1",
												label: "Segunda-feira",
											},
											{
												value: "2",
												label: "Terça-feira",
											},
											{
												value: "3",
												label: "Quarta-feira",
											},
											{
												value: "4",
												label: "Quinta-feira",
											},
											{
												value: "5",
												label: "Sexta-feira",
											},
											{ value: "6", label: "Sábado" },
										]}
									/>
									<Input
										label="Das"
										id="from"
										type="time"
										value={scheduleItem.from}
										onChange={(e) => {
											setScheduleItemValue(
												index,
												"from",
												e.target.value
											);
										}}
									/>
									<Input
										label="Até"
										id="to"
										type="time"
										value={scheduleItem.to}
										onChange={(e) => {
											setScheduleItemValue(
												index,
												"to",
												e.target.value
											);
										}}
									/>
								</div>
							);
						})}
					</fieldset>
					<footer>
						<p>
							<img src={warningIcon} alt="Aviso importante" />
							Importante <br />
							Preencha todos os dados
						</p>
						<button type="submit">Salvar cadastro</button>
					</footer>
				</form>
			</main>
		</div>
	);
};

export default TeacherForm;
