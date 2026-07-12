import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { useSelector, useDispatch } from "react-redux";
import {
  addInputValue,
  fetchPopularVideos,
  searchVideos,
} from "./store/searchSlice";
import { useLocation } from "react-router-dom";
import { useSaveQueryModal } from "../hooks/useSaveQueryModal";
import VideoPlayerModal from "../shared/ui/mui_components/VideoPlayerModal";
import VideoCardSkeleton from "./VideoCardSkeleton";

import {
  Container,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Alert,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";

function SearchPage() {
  const [viewType, setViewType] = useState("grid");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [playerOpen, setPlayerOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const { searchQuery, searchResults, loading, error } = useSelector(
    (store) => store.search,
  );
  const { openModal, SaveQueryModalComp } = useSaveQueryModal();

  useEffect(() => {
    const state = location.state || {};
    const targetText = state.searchTarget;
    const order = state.order;
    const maxResults = state.maxResults;

    if (targetText) {
      dispatch(addInputValue(targetText));
    }
    dispatch(searchVideos({ order, maxResults }));
  }, [dispatch, location.state]);

  useEffect(() => {
    dispatch(fetchPopularVideos());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchVideos());
  };

  const handleAddToFavorites = () => {
    openModal({ query: searchQuery });
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setPlayerOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 3, px: { xs: 2, md: 4 }, color: "#e0e0e0" }}
    >
      {/* Поисковая строка */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 720 }}>
          <TextField
            fullWidth
            value={searchQuery}
            onChange={(e) => dispatch(addInputValue(e.target.value))}
            placeholder="Поиск видео..."
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "9999px",
                bgcolor: "#1f1f1f",
                color: "#e0e0e0",
                "&:hover": { bgcolor: "#272727" },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      onClick={handleAddToFavorites}
                      sx={{ color: "#aaa" }}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={loading}
                      sx={{
                        borderRadius: "9999px",
                        px: 5,
                        textTransform: "none",
                      }}
                    >
                      {loading ? "Поиск..." : "Найти"}
                    </Button>
                  </InputAdornment>
                ),
              },
            }}
          />
        </form>
      </Box>

      {/* Переключатель вида — иконки */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <ToggleButtonGroup
          value={viewType}
          exclusive
          onChange={(e, newValue) => newValue && setViewType(newValue)}
          size="small"
          sx={{ bgcolor: "#1f1f1f", borderRadius: "9999px", p: 0.5 }}
        >
          <ToggleButton
            value="grid"
            sx={{ border: "none", borderRadius: "9999px", color: "#e0e0e0" }}
          >
            <GridViewIcon />
          </ToggleButton>
          <ToggleButton
            value="list"
            sx={{ border: "none", borderRadius: "9999px", color: "#e0e0e0" }}
          >
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* === LOADING + ERROR + RESULTS === */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, maxWidth: 800, mx: "auto" }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <div
          className={`video-layout ${viewType === "grid" ? "grid-view" : "list-view"}`}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <VideoCardSkeleton key={index} variant={viewType} />
          ))}
        </div>
      ) : (
        <div
          className={`video-layout ${viewType === "grid" ? "grid-view" : "list-view"}`}
        >
          {searchResults.length > 0
            ? searchResults.map((video) => (
                <VideoCard
                  key={video.id}
                  data={video}
                  variant={viewType}
                  onClick={handleVideoClick}
                />
              ))
            : searchQuery && (
                <Typography
                  align="center"
                  sx={{ mt: 4, color: "#f0f0f0", bgcolor: "#1f1f1f" }}
                >
                  Ничего не найдено по запросу «{searchQuery}»
                </Typography>
              )}
        </div>
      )}

      {/* Модальный видеоплеер */}
      <VideoPlayerModal
        open={playerOpen}
        onClose={handleClosePlayer}
        video={selectedVideo}
      />

      {/* Модалка сохранения запроса */}
      <SaveQueryModalComp />
    </Container>
  );
}

export default SearchPage;
