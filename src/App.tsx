import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import { Slide } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import { PasswordManager } from './features/passwords/components/PasswordManager';

function App() {
  return (
    <Router>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        TransitionComponent={Slide}
      >
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <div className="App">
                <NavBar />
                <PasswordManager />
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SnackbarProvider>
    </Router>
  );
}

export default App;

