import React from "react";

import wppIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";
import { api } from "../../services/api";

export interface Teacher {
	id: number;
	name: string;
	avatar: string;
	whatsapp: string;
	bio: string;
	cost: number;
	subject: string;
}
interface Props {
	teacher: Teacher;
}

const TeacherItem: React.FC<Props> = ({ teacher }) => {
	const createConnection = () => {
		api.post("/connections", {
			user_id: teacher.id,
		});
	};
	return (
		<article className="teacher-item">
			<header>
				<img src={teacher.avatar} alt={teacher.name} />
				<div>
					<strong>{teacher.name}</strong>
					<span>{teacher.subject}</span>
				</div>
			</header>
			<p>{teacher.bio}</p>
			<footer>
				<p>
					Preço/hora:
					<strong>R${teacher.cost}</strong>
				</p>
				<a
					onClick={createConnection}
					href={`https://wa.me/${teacher.whatsapp}`}
				>
					<img src={wppIcon} alt="WhatsApp" />
					Entrar em contato
				</a>
			</footer>
		</article>
	);
};

export default TeacherItem;
