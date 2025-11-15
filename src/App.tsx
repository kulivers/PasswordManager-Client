import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import LoginForm from './Components/Modals/LoginForm';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { addAccount } from './redux/slices/accountsSlice';
import { Slide } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import AccountsTable from './Components/AccountsTable';
import MyAccountsTable from './Components/MyAccountsTable';
import { Account } from './types';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  const [isLoginOpen, setLoginIsOpen] = useState(false);
  
  const dispatch = useAppDispatch();
  const accounts = useAppSelector((state) => state.accounts);

  const handleAddAccount = () => {
    const newAccount: Account = { login: 'somebody', password: 'somebody' };
    dispatch(addAccount(newAccount));
  };

  const handleLogAccounts = () => {
    console.log('accounts:', accounts);
  };

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
                <NavBar
                  toggleShowLoginForm={setLoginIsOpen}
                  ShowLoginForm={isLoginOpen}
                />
                <LoginForm isOpen={isLoginOpen} setLoginIsOpen={setLoginIsOpen} />
                <button onClick={handleAddAccount}>add acc</button>
                <button onClick={handleLogAccounts}>clg accounts</button>
                <div key={accounts.length}>
                  {accounts.map((account, index) => (
                    <li key={`${account.login}-${index}`}>
                      {account.login} {account.password}
                    </li>
                  ))}
                </div>
                <MyAccountsTable />
                <hr />
                <hr />
                <hr />
                <AccountsTable />
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

