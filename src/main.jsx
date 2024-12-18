import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ApolloProviderWrapper from './ApolloClient.jsx';
import { BrowserRouter } from 'react-router-dom'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* Only wrap the App here */}
    <ApolloProviderWrapper>
      <App />
    </ApolloProviderWrapper>
  </BrowserRouter>
);
