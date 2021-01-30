function outline(props) {
	const { colorScheme: c } = props;
	return {
		boxSizing: 'border-box',
		transition: '0.1s all',
		border: '1px solid',
		bg: 'transparent',
		borderColor: `${c}.500`,
		color: `${c}.500`,
		_hover: {
			bg: `${c}.500`,
			color: 'white'
		},
		_active: {
			bg: `${c}.500`,
			color: 'white'
		},
		_focus: {
			boxShadow: 'none',
			outline: 'none'
		}
	};
}

export const Button = {
	baseStyles: {
		_focus: {
			outline: 'none'
		}
	},
	variants: {
		outline,
		solid: {
			_focus: {
				boxShadow: 'none',
				outline: 'none'
			}
		}
	}
};
