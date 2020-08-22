import React, { SelectHTMLAttributes } from "react";

import "./styles.css";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	name: string;
	id: string;
	options: Array<{ value: string; label: string }>;
}

const Select: React.FC<Props> = ({ name, id, options, ...rest }) => {
	return (
		<div className="select-block">
			<label htmlFor={id}>{name}</label>
			<select id={id} {...rest}>
				<option value="" disabled hidden>
					Selecione uma opção
				</option>
				{options.map((option) => {
					return (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default Select;
