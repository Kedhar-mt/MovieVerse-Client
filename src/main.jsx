import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ApolloProviderWrapper from './ApolloClient.jsx';
import { BrowserRouter } from 'react-router-dom'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* Only wrap the App here */}
    <ApolloProviderWrapper>
      <App />
    </ApolloProviderWrapper>
  </BrowserRouter>
);
