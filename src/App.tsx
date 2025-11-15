import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import { Slide } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import RegistrationPage from './pages/RegistrationPage';

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
          <Route
            path="/"
            element={
              <div
                className="App"
                style={{
                  position: 'relative',
                  height: '100vh',
                }}
              >
                <NavBar />
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

