import {Link} from "react-router";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="container2">
      <div className="name">
        NotesApp
      </div>
      <Link to="/create">
        <button className="button">Create Note</button>
      </Link>
    </div>
  )
}

export default Navbar;