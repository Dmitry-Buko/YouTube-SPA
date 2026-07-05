import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { useSelector, useDispatch } from "react-redux";
import {
  addInputValue,
  fetchPopularVideos,
  searchVideos,
} from "./store/searchSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import SaveQueryModal from "../shared/ui/mui_components/SaveQueryModal";

function SearchPage() {
  const [viewType, setViewType] = useState("grid");
  const dispatch = useDispatch();
  const { searchQuery, searchResults } = useSelector((store) => store.search);
  const [openSaveModal, setOpenSaveModal] = useState(false);
  
  const fetchVideo = () => {
    dispatch(fetchPopularVideos());
  };

  console.log("searchResults", searchResults); //---------------------


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchVideos(searchQuery));
  };

  const handleAddToFavorites = () => {
    setOpenSaveModal(true);
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
            <SaveQueryModal
              open={openSaveModal}
              onClose={() => setOpenSaveModal(false)}
              query={searchQuery} // передаём текущий запрос
            />
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
