import { Outlet, Link } from "react-router-dom";
import LetterAvatars from "../shared/ui/mui_components/Avatar";

const Layout = () => {
  return(
    <div className="app-container">
      <header className="header">
        <div>
          <LetterAvatars />
        </div>
        <nav>
          <Link to={'search'}>Поиск</Link>
          <Link to={'favorites'}>Избранное</Link>
        </nav>
        <button>Exit</button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
};

export default Layout