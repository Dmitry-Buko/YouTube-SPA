import { Skeleton, Box } from "@mui/material";
import "../shared/styles/VideoCard.css";

function VideoCardSkeleton({ variant = "grid" }) {
  const isList = variant === "list";

  return (
    <div
      className={`video-card ${isList ? "video-card--list" : "video-card--grid"}`}
      style={{ pointerEvents: "none" }}
    >
      {/* Thumbnail skeleton */}
      <div className="video-card__thumbnail-wrapper">
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
          sx={{ borderRadius: "12px" }}
        />
        {/* Скелетон для длительности */}
        <Skeleton
          variant="rectangular"
          width={45}
          height={18}
          animation="wave"
          sx={{
            position: "absolute",
            bottom: 8,
            right: 8,
            borderRadius: "4px",
          }}
        />
      </div>

      {/* Info skeleton */}
      <div className="video-card__info">
        {/* Title - 2 строки */}
        <Skeleton
          variant="text"
          width="95%"
          height={22}
          animation="wave"
          sx={{ mb: 0.5 }}
        />
        <Skeleton
          variant="text"
          width="70%"
          height={22}
          animation="wave"
          sx={{ mb: 1.5 }}
        />

        {/* Channel + stats */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
          <Skeleton variant="text" width="60%" height={18} animation="wave" />
          <Skeleton variant="text" width="45%" height={18} animation="wave" />
        </Box>

        {/* Description (только в list view) */}
        {isList && (
          <Box sx={{ mt: 1.5 }}>
            <Skeleton variant="text" width="100%" height={16} animation="wave" />
            <Skeleton variant="text" width="85%" height={16} animation="wave" />
          </Box>
        )}
      </div>
    </div>
  );
}

export default VideoCardSkeleton;