import { Link, useNavigate } from "react-router-dom";
import InputLogin from "../shared/ui/InputLogin";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setFormData } from "../video/store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, success, email, password } = useSelector(
    (state) => state.auth,
  );

  const handleChange = (e) =>
    dispatch(
      setFormData({
        name: e.target.name,
        value: e.target.value,
      }),
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser()).unwrap();
      setTimeout(() => {
        navigate("/search");
      }, 1500);
    } catch (error) {
      console.error("Ошибка при входе Login.jsx:", error);
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Вход в ToDo</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="form-group">
            <label>E-mail</label>
            <InputLogin
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Введите e-mail"
              required
            />
          </div>

          <div className="form-group">
            <label>Пароль</label>
            <InputLogin
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Введите пароль"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="form-group__btn-enter"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>

        <p className="switch-link">
          Нет аккаунта?
          <Link to="/register" className="switch-link__login">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
