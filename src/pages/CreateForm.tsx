import React, { useState } from 'react';
import {
    Box, Button, TextField, Typography, MenuItem, IconButton, Stack, Divider, Checkbox, FormControlLabel
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import {
    addField, deleteField, setFormName, resetForm, updateField
} from '../redux/formBuilderSlice';
import { v4 as uuidv4 } from 'uuid';
import { FormField, FieldType } from '../types/formTypes';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const fieldTypes: { label: string; value: FieldType }[] = [
    { label: 'Text', value: 'text' },
    { label: 'Number', value: 'number' },
    { label: 'Textarea', value: 'textarea' },
    { label: 'Select', value: 'select' },
    { label: 'Radio', value: 'radio' },
    { label: 'Checkbox', value: 'checkbox' },
    { label: 'Date', value: 'date' },
];

const CreateForm = () => {
    const dispatch = useDispatch();
    const form = useSelector((state: RootState) => state.formBuilder);
    const [newFieldType, setNewFieldType] = useState<FieldType>('text');
    const [showSavePrompt, setShowSavePrompt] = useState(false);
    const [formTitle, setFormTitle] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editData, setEditData] = useState<Partial<FormField>>({});

    const handleAddField = () => {
        const newField: FormField = {
            id: uuidv4(),
            label: 'New Field',
            type: newFieldType,
            defaultValue: '',
            validations: {
                required: false,
                minLength: undefined,
                maxLength: undefined,
                isEmail: false,
                isPassword: false
            },
        };
        dispatch(addField(newField));
    };

    const handleSaveForm = () => {
        if (!form.formName) {
            setShowSavePrompt(true);
            return;
        }

        const schema = {
            name: form.formName,
            createdAt: new Date().toISOString(),
            fields: form.fields,
        };

        const savedForms = JSON.parse(localStorage.getItem('savedForms') || '[]');
        localStorage.setItem('savedForms', JSON.stringify([...savedForms, schema]));
        alert('Form saved successfully!');
        dispatch(resetForm());
    };

    const handleDelete = (index: number) => {
        dispatch(deleteField(index));
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setEditData(form.fields[index]);
    };

    const handleCancelEdit = () => {
        setEditIndex(null);
        setEditData({});
    };

    const handleSaveEdit = (index: number) => {
        dispatch(updateField({ index, updatedField: editData }));
        setEditIndex(null);
        setEditData({});
    };

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>Create New Form</Typography>

            {showSavePrompt && (
                <Box mb={2}>
                    <TextField
                        label="Form Name"
                        fullWidth
                        value={formTitle}
                        onChange={(e) => {
                            setFormTitle(e.target.value);
                            dispatch(setFormName(e.target.value));
                        }}
                    />
                </Box>
            )}

            <Stack direction="row" spacing={2} alignItems="center" mb={3} width={"100vw"}>
                <TextField
                    select
                    label="Field Type"
                    value={newFieldType}
                    onChange={(e) => setNewFieldType(e.target.value as FieldType)}
                    sx={{ width: 200 }}
                >
                    {fieldTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </TextField>
                <Button variant="contained" onClick={handleAddField}>
                    Add Field
                </Button>
            </Stack>

            {form.fields.length === 0 && (
                <Typography variant="body1">No fields added yet.</Typography>
            )}

            {form.fields.map((field, idx) => (
                <Box key={field.id} mb={3} p={2} border="1px solid #ccc" borderRadius={2}>
                    {editIndex === idx ? (
                        <>
                            <TextField
                                label="Label"
                                fullWidth
                                value={editData.label || ''}
                                onChange={(e) => setEditData({ ...editData, label: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!editData.validations?.required}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                validations: {
                                                    ...editData.validations,
                                                    required: e.target.checked
                                                }
                                            })
                                        }
                                    />
                                }
                                label="Required"
                            />
                            <TextField
                                label="Default Value"
                                fullWidth
                                value={editData.defaultValue || ''}
                                onChange={(e) => setEditData({ ...editData, defaultValue: e.target.value })}
                                sx={{ mb: 2 }}
                            />
                            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                                <TextField
                                    label="Min Length"
                                    type="number"
                                    value={editData.validations?.minLength || ''}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            validations: {
                                                ...editData.validations,
                                                minLength: e.target.value ? Number(e.target.value) : undefined
                                            }
                                        })
                                    }
                                />
                                <TextField
                                    label="Max Length"
                                    type="number"
                                    value={editData.validations?.maxLength || ''}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            validations: {
                                                ...editData.validations,
                                                maxLength: e.target.value ? Number(e.target.value) : undefined
                                            }
                                        })
                                    }
                                />
                            </Stack>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!editData.validations?.isEmail}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                validations: {
                                                    ...editData.validations,
                                                    isEmail: e.target.checked
                                                }
                                            })
                                        }
                                    />
                                }
                                label="Email Format"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={!!editData.validations?.isPassword}
                                        onChange={(e) =>
                                            setEditData({
                                                ...editData,
                                                validations: {
                                                    ...editData.validations,
                                                    isPassword: e.target.checked
                                                }
                                            })
                                        }
                                    />
                                }
                                label="Password Rule"
                            />
                            <Stack direction="row" spacing={1} mt={2}>
                                <IconButton color="primary" onClick={() => handleSaveEdit(idx)}>
                                    <SaveIcon />
                                </IconButton>
                                <IconButton color="secondary" onClick={handleCancelEdit}>
                                    <CancelIcon />
                                </IconButton>
                            </Stack>
                        </>
                    ) : (
                        <>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="h6">{field.label || 'Unnamed Field'}</Typography>
                                <Stack direction="row" spacing={1}>
                                    <IconButton onClick={() => handleEdit(idx)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(idx)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Stack>
                            </Stack>
                            <Typography variant="body2">Type: {field.type}</Typography>
                            <Typography variant="body2">
                                Required: {field.validations?.required ? 'Yes' : 'No'}
                            </Typography>
                            <Typography variant="body2">Default: {field.defaultValue}</Typography>
                        </>
                    )}
                </Box>
            ))}

            <Divider sx={{ my: 4 }} />

            <Button
                variant="contained"
                color="primary"
                onClick={handleSaveForm}
                disabled={form.fields.length === 0}
            >
                Save Form
            </Button>
        </Box>
    );
};

export default CreateForm;
