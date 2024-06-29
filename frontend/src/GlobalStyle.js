// src/GlobalStyle.js
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
    background: url('https://images.pexels.com/photos/5410042/pexels-photo-5410042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1') no-repeat center center/cover;
    
        font-family: Arial, sans-serif;
        overflow-x: hidden;
    }
`;

export default GlobalStyle;
