import React, { useEffect, useState } from 'react';
import {
    Box, TextField, Typography, MenuItem, RadioGroup, FormControlLabel,
    Radio, Checkbox, Button, FormHelperText
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FormField } from '../types/formTypes';

const PreviewForm = () => {
    const reduxFields = useSelector((state: RootState) => state.formBuilder.fields);
    const [fields, setFields] = useState<FormField[]>([]);
    const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Load fields from redux or localStorage
    useEffect(() => {
        if (reduxFields.length > 0) {
            setFields(reduxFields);
        } else {
            const stored = localStorage.getItem('currentForm');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed?.fields) setFields(parsed.fields);
            }
        }
    }, [reduxFields]);

    const handleChange = (id: string, value: any) => {
        setFormValues((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        fields.forEach(field => {
            const val = formValues[field.id];

            if (field.validations?.required && !val) {
                newErrors[field.id] = 'This field is required';
                return;
            }
            if (field.validations?.minLength && val?.length < field.validations.minLength) {
                newErrors[field.id] = `Min length is ${field.validations.minLength}`;
            }
            if (field.validations?.maxLength && val?.length > field.validations.maxLength) {
                newErrors[field.id] = `Max length is ${field.validations.maxLength}`;
            }
            if (field.validations?.isEmail) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(val)) newErrors[field.id] = 'Invalid email';
            }
            if (field.validations?.isPassword) {
                const pwRegex = /^(?=.*[0-9]).{8,}$/;
                if (!pwRegex.test(val)) newErrors[field.id] = 'Password must be 8+ chars & include number';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Derived Fields
    useEffect(() => {
        fields.forEach(field => {
            if (field.derived) {
                try {
                    const parentValues = field.derived.parentFields.map(p => formValues[p] || 0);
                    const computed = eval(field.derived.formula); // ⚠ unsafe
                    setFormValues((prev) => ({ ...prev, [field.id]: computed }));
                } catch (err) {
                    console.error(`Error evaluating derived field: ${field.label}`, err);
                }
            }
        });
    }, [formValues, fields]);

    const handleSubmit = () => {
        if (validate()) {
            alert('Form submitted successfully!');
            console.log('Form Values:', formValues);
        }
    };

    const renderField = (field: FormField) => {
        const value = formValues[field.id] ?? '';
        const error = errors[field.id];

        switch (field.type) {
            case 'text':
            case 'email':
            case 'date':
            case 'number':
            case 'textarea':
                return (
                    <TextField
                        fullWidth
                        type={field.type}
                        label={field.label}
                        value={value}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                        multiline={field.type === 'textarea'}
                        rows={field.type === 'textarea' ? 3 : undefined}
                    />
                );

            case 'checkbox':
                return (
                    <>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!!value}
                                    onChange={(e) => handleChange(field.id, e.target.checked)}
                                />
                            }
                            label={field.label}
                        />
                        {error && <FormHelperText error>{error}</FormHelperText>}
                    </>
                );

            case 'select':
                return (
                    <TextField
                        select
                        fullWidth
                        label={field.label}
                        value={value}
                        onChange={(e) => handleChange(field.id, e.target.value)}
                        error={Boolean(error)}
                        helperText={error}
                    >
                        {field.options?.map(opt => (
                            <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                        ))}
                    </TextField>
                );

            case 'radio':
                return (
                    <>
                        <Typography>{field.label}</Typography>
                        <RadioGroup
                            value={value}
                            onChange={(e) => handleChange(field.id, e.target.value)}
                        >
                            {field.options?.map(opt => (
                                <FormControlLabel key={opt} value={opt} control={<Radio />} label={opt} />
                            ))}
                        </RadioGroup>
                        {error && <FormHelperText error>{error}</FormHelperText>}
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>Form Preview</Typography>

            {fields.length === 0 ? (
                <Typography>No fields configured. Go to /create or /myforms to load a form.</Typography>
            ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    {fields.map((field) => (
                        <Box key={field.id} mb={3}>
                            {renderField(field)}
                        </Box>
                    ))}

                    <Button type="submit" variant="contained">Submit</Button>
                </form>
            )}
        </Box>
    );
};

export default PreviewForm;
