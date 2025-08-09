import React, { useEffect, useState } from 'react';
import {
    Box, Typography, List, ListItemButton, ListItemText, Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormSchema } from '../types/formTypes';

const MyForms = () => {
    const [forms, setForms] = useState<FormSchema[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem('savedForms');
        if (stored) {
            setForms(JSON.parse(stored));
        }
    }, []);

    const handleSelectForm = (form: FormSchema) => {
        localStorage.setItem('currentForm', JSON.stringify(form));
        navigate('/preview');
    };

    return (
        <Box p={4}>
            <Typography variant="h4" gutterBottom>Saved Forms</Typography>

            {forms.length === 0 ? (
                <Typography>No forms saved yet. Go to /create to build a new form.</Typography>
            ) : (
                <List>
                    {forms.map((form, index) => (
                        <React.Fragment key={index}>
                            <ListItemButton onClick={() => handleSelectForm(form)}>
                                <ListItemText
                                    primary={form.name}
                                    secondary={new Date(form.createdAt).toLocaleString()}
                                />
                            </ListItemButton>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default MyForms;
