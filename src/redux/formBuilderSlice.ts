import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormField } from '../types/formTypes';

interface FormBuilderState {
    fields: FormField[];
    formName: string;
}

const initialState: FormBuilderState = {
    fields: [],
    formName: '',
};

const formBuilderSlice = createSlice({
    name: 'formBuilder',
    initialState,
    reducers: {
        updateField: (state, action) => {
            const { index, updatedField } = action.payload;
            state.fields[index] = { ...state.fields[index], ...updatedField };
        },
        addField(state, action: PayloadAction<FormField>) {
            state.fields.push(action.payload);
        },
        deleteField(state, action: PayloadAction<number>) {
            state.fields.splice(action.payload, 1);
        },
        reorderFields(state, action: PayloadAction<FormField[]>) {
            state.fields = action.payload;
        },
        setFormName(state, action: PayloadAction<string>) {
            state.formName = action.payload;
        },
        resetForm(state) {
            state.fields = [];
            state.formName = '';
        }
    }
});

export const {
    addField,
    updateField,
    deleteField,
    reorderFields,
    setFormName,
    resetForm
} = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
