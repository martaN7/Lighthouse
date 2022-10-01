import { HashRouter, Link, NavLink, Outlet } from 'react-router-dom';
import Pages from './Pages';


export default function App() {
  return (
    <HashRouter>
      <Pages />
    </HashRouter>
  );
}
