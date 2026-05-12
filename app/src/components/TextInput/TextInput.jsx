import { useState } from 'react';
import {
	FormControl,
	InputAdornment,
	MenuItem,
	Stack,
	TextField,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const TextInput = ({
	fullWidth,
	id,
	className,
	style,
	center,
	sx,
	label,
	placeholder,
	variant,
	required,
	disabled,
	type,
	slotProps,
	helperText,
	autoComplete,
	multiline,
	maxRows,
	minRows,
	select,
	selectOptions,
	children,
	leftIcon,
	rightIcon,
	defaultValue,
	value,
	onFocus,
	onChange,
	error,
}) => {
	const [show, setShow] = useState(false);

	const toggleShow = () => {
		setShow(!show);
	};

	const themeStyles = {
		// Input text (user entered)
		'& .MuiInputBase-input': {
			color: 'var(--text)',
		},
		// Placeholder
		'& .MuiInputBase-input::placeholder': {
			color: 'var(--text-s)',
			opacity: 1, // MUI sets opacity on placeholders, override it
		},
		// Label (resting)
		'& .MuiInputLabel-root': {
			color: 'var(--text-s)',
		},
		// Label (focused)
		'& .MuiInputLabel-root.Mui-focused': {
			color: 'var(--accent)',
		},
		// Outlined border (resting)
		'& .MuiOutlinedInput-notchedOutline': {
			borderColor: 'var(--border)',
		},
		// Outlined border (hover)
		'& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
			borderColor: 'var(--border-hover)',
		},
		// Outlined border (focused)
		'& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: 'var(--border-focus)',
		},
		// Underline (standard variant, resting)
		'& .MuiInput-underline:before': {
			borderBottomColor: 'var(--border)',
		},
		// Underline (standard variant, hover)
		'& .MuiInput-underline:hover:before': {
			borderBottomColor: 'var(--accent-border-hover)',
		},
		// Underline (standard variant, focused)
		'& .MuiInput-underline:after': {
			borderBottomColor: 'var(--accent)',
		},
		// Icons (adornments)
		'& .MuiInputAdornment-root svg': {
			color: 'var(--icon)',
		},
		// Helper text
		'& .MuiFormHelperText-root': {
			color: 'var(--text-muted)',
		},
		// Helper text (error state)
		'& .MuiFormHelperText-root.Mui-error': {
			color: 'var(--error)',
		},
		// Input text (error state)
		'& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
			borderColor: 'var(--error)',
		},
		// Disabled input text
		'& .MuiInputBase-input.Mui-disabled': {
			color: 'var(--text-disabled)',
			WebkitTextFillColor: 'var(--text-disabled)',
		},
		// Disabled border
		'& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
			borderColor: 'var(--border)',
			opacity: 0.5,
		},
		// Disabled label
		'& .MuiInputLabel-root.Mui-disabled': {
			color: 'var(--text-disabled)',
		},
		// Disabled icon
		'& .MuiOutlinedInput-root.Mui-disabled .MuiInputAdornment-root svg': {
			color: 'var(--text-disabled)',
		},
	};

	const handleSlotProps = () => {
		let props = { ...(slotProps ?? {}) };

		if (leftIcon && !select) {
			props = {
				...props,
				input: {
					...props.input,
					startAdornment: (
						<InputAdornment position='start'>{leftIcon}</InputAdornment>
					),
				},
			};
		}

		if (rightIcon) {
			props = {
				...props,
				input: {
					...props.input,
					endAdornment: (
						<InputAdornment position='end'>{rightIcon}</InputAdornment>
					),
				},
			};
		}

		if (type === 'password') {
			props = {
				...props,
				input: {
					...props.input,
					endAdornment: (
						<InputAdornment position='end'>
							{show ? (
								<VisibilityOffIcon
									className='hide'
									htmlColor='grey'
									onClick={toggleShow}
								/>
							) : (
								<VisibilityIcon
									className='hide'
									htmlColor='grey'
									onClick={toggleShow}
								/>
							)}
						</InputAdornment>
					),
				},
			};
		}

		if (center) {
			props = {
				...props,
				htmlInput: {
					...props.htmlInput,
					sx: { textAlign: 'center', ...props.htmlInput?.sx },
				},
				inputLabel: {
					...props.inputLabel,
					sx: {
						width: '100%',
						transformOrigin: 'center',
						left: 0,
						textAlign: 'center',
						...props.inputLabel?.sx,
					},
				},
			};
		}

		return props;
	};

	const handleSx = () => {
		let styles = { ...themeStyles, ...sx };

		if (type === 'time') {
			styles = {
				...styles,
				'& input[type="time"]::-webkit-calendar-picker-indicator': {
					order: -1,
					marginRight: '8px',
					marginLeft: 0,
				},
			};
		}

		if (helperText) {
			styles = {
				...styles,
				'& .MuiFormHelperText-root': { textAlign: 'center' },
			};
		}

		return styles;
	};

	const handleSelectLabel = () => {
		if (leftIcon) {
			return (
				<Stack direction='row' alignItems='center' gap={1}>
					{leftIcon}
					{label}
				</Stack>
			);
		} else {
			return label;
		}
	};

	return (
		<FormControl fullWidth={fullWidth}>
			{select ? (
				<TextField
					size='small'
					margin='dense'
					select
					id={id}
					className={className}
					style={style}
					sx={handleSx()}
					slotProps={handleSlotProps()}
					label={handleSelectLabel()}
					variant={variant}
					required={required}
					disabled={disabled}
					helperText={helperText}
					defaultValue={defaultValue}
					value={value}
					onFocus={onFocus}
					onChange={onChange}
					error={error}
				>
					<MenuItem value='' sx={center ? { justifyContent: 'center' } : null}>
						Choose...
					</MenuItem>
					{selectOptions?.map((option) => (
						<MenuItem
							key={option.value}
							value={option.value}
							sx={center ? { justifyContent: 'center' } : null}
						>
							{option.label}
						</MenuItem>
					))}
					{children}
				</TextField>
			) : (
				<TextField
					size='small'
					margin='dense'
					id={id}
					className={className}
					style={style}
					sx={handleSx()}
					type={show ? 'text' : type}
					label={label}
					placeholder={placeholder}
					variant={variant}
					required={required}
					disabled={disabled}
					slotProps={handleSlotProps()}
					helperText={helperText}
					autoComplete={autoComplete}
					multiline={multiline}
					maxRows={maxRows}
					minRows={minRows}
					defaultValue={defaultValue}
					value={value}
					onFocus={onFocus}
					onChange={onChange}
					error={error}
				/>
			)}
		</FormControl>
	);
};

export default TextInput;
