import { useState } from 'react';
import { MascotasView } from './views/MascotasView';
import { LandingPage } from './views/LandingPage';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  if (!showDashboard) {
    return <LandingPage onEnter={() => setShowDashboard(true)} />;
  }

  return <MascotasView />;
}

export default App;
