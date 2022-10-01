import { HashRouter, Link, NavLink, Outlet } from 'react-router-dom';
import Pages from './Pages';
import "./styles/main.scss";


export default function App() {
  return (
    <HashRouter>
      <Pages />
    </HashRouter>
  );
}
