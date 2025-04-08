import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          User Management
        </Typography>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
