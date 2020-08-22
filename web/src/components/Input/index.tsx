import React, { InputHTMLAttributes } from "react";

import "./styles.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
}

const Input: React.FC<Props> = ({ label, id, ...rest }) => {
	return (
		<div className="input-block">
			<label htmlFor={id}>{label}</label>
			<input id={id} {...rest} />
		</div>
	);
};

export default Input;
