import React, { TextareaHTMLAttributes } from "react";

import "./styles.css";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	id: string;
}

const TextArea: React.FC<Props> = ({ label, id, ...rest }) => {
	return (
		<div className="textarea-block">
			<label htmlFor={id}>{label}</label>
			<textarea id={id} {...rest} />
		</div>
	);
};

export default TextArea;
