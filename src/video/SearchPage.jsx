import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { useSelector, useDispatch } from "react-redux";
import {
  addInputValue,
  fetchPopularVideos,
  searchVideos,
} from "./store/searchSlice";
import { FaRegHeart } from "react-icons/fa"; //+ FaHeart
// import SaveQueryModal from "../shared/ui/mui_components/SaveQueryModal";
import { useLocation } from "react-router-dom";
import { useSaveQueryModal } from "../hooks/useSaveQueryModal";


function SearchPage() {
  const [viewType, setViewType] = useState("grid");
  const dispatch = useDispatch();
  const location = useLocation();
  const { searchQuery, searchResults } = useSelector((store) => store.search);
  const {openModal, SaveQueryModalComp } = useSaveQueryModal()
  //передача запроса от избранного
  useEffect(() => {
    const targetText = location.state?.searchTarget;
    if (targetText) {
      dispatch(addInputValue(targetText));
    }
    dispatch(searchVideos());
  }, [dispatch, location.state?.searchTarget]);

  const fetchVideo = () => {
    dispatch(fetchPopularVideos());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchVideos());
  };

  const handleAddToFavorites = () => {
    openModal({
      query: searchQuery,
    });
  };

  return (
    <div className="search-results-container">
      <div className="results-header">
        <form onSubmit={handleSubmit} className="search-form">
          <div className="search-input-wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => dispatch(addInputValue(e.target.value))}
              placeholder="Поиск видео..."
            />
            <button
              type="button"
              className="favorite-btn"
              onClick={handleAddToFavorites}
              title="Добавить в избранное"
            >
              {/* {isFavorite ? <FaHeart color="#ff4d4d" /> : <FaRegHeart />} */}
              <FaRegHeart />
            </button>
            <SaveQueryModalComp />
            <button type="submit" className="search-btn">
              Найти
            </button>
          </div>
        </form>
        <div className="view-switchers">
          <p>Видео по запросу: {searchQuery}</p>
          <button onClick={() => setViewType("grid")}>Сетка</button>
          <button onClick={() => setViewType("list")}>Список</button>
        </div>
        <button onClick={fetchVideo}>загрузить популярные видео</button>
      </div>
      <div
        className={`video-layout ${viewType === "grid" ? "grid-view" : "list-view"}`}
      >
        {searchResults.map((video) => (
          <VideoCard
            key={video.id?.videoId || video.id}
            data={video}
            variant={viewType}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
