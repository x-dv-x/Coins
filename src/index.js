import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.js';
import { createRoot } from 'react-dom/client';

import {config} from "dotenv";

config ({
    path: "../.env"
})

 
const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App />);


