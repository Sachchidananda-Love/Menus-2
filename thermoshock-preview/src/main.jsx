import React from 'react';
import { createRoot } from 'react-dom/client';
import ThermoshockCoffeeInteractive from './ThermoshockCoffeeInteractive';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThermoshockCoffeeInteractive />
  </React.StrictMode>,
);
