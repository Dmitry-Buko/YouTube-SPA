import { Outlet, Link, useNavigate } from "react-router-dom";
import { resetDataToZero } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import LetterAvatars from "../shared/ui/mui_components/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import { resetInputToZero } from "../video/store/searchSlice";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    dispatch(resetDataToZero());
    dispatch(resetInputToZero());
    navigate("/login", { replace: true });
  };
  return (
    <>
      <AppBar position="static" color="default" elevation={1} sx={{ bgcolor: "#0f0f0f", borderBottom: "1px solid #272727" }}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <LetterAvatars />
            
            <Box sx={{ display: "flex", gap: 3 }}>
              <Link to="/search" style={{ textDecoration: "none", color: "inherit" }}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: "#e0e0e0",  "&:hover": { color: "#3ea6ff" } }}>
                  Поиск
                </Typography>
              </Link>
              <Link to="/favorites" style={{ textDecoration: "none", color: "inherit" }}>
                <Typography variant="body1" sx={{ fontWeight: 500, color: "#e0e0e0", "&:hover": { color: "#3ea6ff" } }}>
                  Избранное
                </Typography>
              </Link>
            </Box>
          </Box>

          <IconButton color="error" onClick={() => {handleLogout()}}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ bgcolor: "#0f0f0f", minHeight: "calc(100vh - 64px)" }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
