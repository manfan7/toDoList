import { createRoot } from 'react-dom/client'
import './index.css'
 import {App} from './App'
import {Provider} from "react-redux";
import {store} from "./app/store.ts";
 //import {App} from './DimychToDo/App.tsx'


createRoot(document.getElementById('root')!).render(
    <Provider store={store}>

    <App />
    </Provider>
)
