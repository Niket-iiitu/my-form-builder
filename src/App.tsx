import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateForm from './pages/CreateForm';
import PreviewForm from './pages/PreviewForm';
import MyForms from './pages/MyForms';
import Home from './pages/Home';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateForm />} />
                <Route path="/preview" element={<PreviewForm />} />
                <Route path="/myforms" element={<MyForms />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
