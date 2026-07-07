import { Link, useNavigate } from "react-router-dom";
import InputLogin from "../shared/ui/InputLogin";
import { useDispatch, useSelector } from "react-redux";
import { newUserRegistration, setFormData } from "../video/store/authSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, success, ...formData } = useSelector(
    (state) => state.auth,
  );
  
  //добавление ключ-значение в стор
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
      await dispatch(newUserRegistration(formData)).unwrap()
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Ошибка при регистрации Register.jsx:", error);
    } 
  };

  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__title">Регистрация</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit} className="login__form">
          {/*Логин */}
          <div className="form-group">
            <label>Логин</label>
            <InputLogin
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Придумайте логин"
              required
            />
          </div>

          {/*E-mail */}
          <div className="form-group">
            <label>E-mail</label>
            <InputLogin
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Введите e-mail"
              required
            />
          </div>

          {/*Пароль */}
          <div className="form-group">
            <label>Пароль</label>
            <InputLogin
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Придумайте пароль"
              required
            />
          </div>

          {/*Gender */}
          <div className="form-group">
            <label>Пол</label>
            <InputLogin
              type="text"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              placeholder="Ваш гендер"
              required
            />
          </div>

          {/*Возраст */}
          <div className="form-group">
            <label>Возраст</label>
            <InputLogin
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Ваш возраст"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="form-group__btn-enter"
          >
            {loading ? "Регистрация..." : "Зарегистрироваться"}
          </button>
        </form>

        <p className="switch-link">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="switch-link__login">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
