import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newUserRegistration, setFormData } from "../features/auth/authSlice";

import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Container,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import WcIcon from "@mui/icons-material/Wc";
import CakeIcon from "@mui/icons-material/Cake";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, success, ...formData } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) =>
    dispatch(
      setFormData({
        name: e.target.name,
        value: e.target.value,
      })
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(newUserRegistration(formData)).unwrap();
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Ошибка при регистрации Register.jsx:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "#1a1a1a",
          p: 5,
          borderRadius: 3,
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ mb: 4, color: "#ffffff", fontWeight: 700 }}
        >
          Регистрация
        </Typography>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 3 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Логин"
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            required
            sx={{ 
              mb: 3,
              "& .MuiInputBase-input": { color: "#e0e0e0" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ffffff" },
              "& .MuiInputLabel-root": { color: "#e0e0e0" },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: "#e0e0e0" }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            label="E-mail"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            required
            sx={{ 
              mb: 3,
              "& .MuiInputBase-input": { color: "#e0e0e0" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ffffff" },
              "& .MuiInputLabel-root": { color: "#e0e0e0" },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: "#e0e0e0" }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            label="Пароль"
            name="password"
            type="password"
            value={formData.password || ""}
            onChange={handleChange}
            required
            sx={{ 
              mb: 3,
              "& .MuiInputBase-input": { color: "#e0e0e0" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ffffff" },
              "& .MuiInputLabel-root": { color: "#e0e0e0" },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: "#e0e0e0" }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            label="Пол"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
            required
            sx={{ 
              mb: 3,
              "& .MuiInputBase-input": { color: "#e0e0e0" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ffffff" },
              "& .MuiInputLabel-root": { color: "#e0e0e0" },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <WcIcon sx={{ color: "#e0e0e0" }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            label="Возраст"
            name="age"
            type="number"
            value={formData.age || ""}
            onChange={handleChange}
            required
            sx={{ 
              mb: 4,
              "& .MuiInputBase-input": { color: "#e0e0e0" },
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#e0e0e0" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#ffffff" },
              "& .MuiInputLabel-root": { color: "#e0e0e0" },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <CakeIcon sx={{ color: "#e0e0e0" }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: "1.1rem",
              fontWeight: 600,
              bgcolor: "#3ea6ff",
              "&:hover": { bgcolor: "#1e90ff" },
            }}
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
        </form>

        <Typography sx={{ mt: 4, color: "#e0e0e0" }}>
          Уже есть аккаунт?{" "}
          <Link
            to="/login"
            style={{ 
              color: "#58a6ff", 
              textDecoration: "none", 
              fontWeight: 500 
            }}
          >
            Войти
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;