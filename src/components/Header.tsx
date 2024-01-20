import { AppBar, Typography, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

const style = {
  color: "white",
  margin: "0.5rem",
  textDecoration: "none",
};

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" mr={"auto"} textTransform={"uppercase"}>
          LearnDo
        </Typography>
        <Link style={style} to={"/"}>
          Home
        </Link>
        <Link style={style} to={"/login"}>
          Login
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
