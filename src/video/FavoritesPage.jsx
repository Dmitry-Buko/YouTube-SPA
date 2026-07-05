import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function FavoritesPage() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  
  // Получаем массив элементов из Redux Store
  // const favorites = useSelector((state) => state.favorites.items);

  // const handleItemClick = (text) => {
  //   // Передаем текст запроса обратно на страницу поиска
  //   navigate('/search', { state: { searchTarget: text } });
  // };

  // const handleDelete = (id, e) => {
  //   e.stopPropagation(); // Стопаем всплытие, чтобы не сработал клик по строке
  //   dispatch(removeFavorite(id)); // Удаляем из Redux
  // };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">Избранное</h1>
      
      {/* {favorites.length === 0 ? (
        <p className="favorites-empty">У вас пока нет избранных запросов.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((item) => (
            <li 
              key={item.id} 
              className="favorites-item"
              onClick={() => handleItemClick(item.text)}
            >
              <span className="favorites-text">{item.text}</span>
              <button 
                className="favorites-delete-btn"
                onClick={(e) => handleDelete(item.id, e)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

export default FavoritesPage;
