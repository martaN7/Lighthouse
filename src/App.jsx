import { HashRouter, Link, NavLink, Outlet } from 'react-router-dom';
import { AuthProvider } from './components/Auth/Auth';
import Pages from './components/Pages';
import "./styles/main.scss";


export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Pages />
      </HashRouter>
    </AuthProvider>
  );
}
