import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const VideoPlayerModal = ({ open, onClose, video }) => {
  if (!video) return null;

  const videoId = typeof video.id === "string" ? video.id : video.id?.videoId;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: { borderRadius: 3, overflow: "hidden" },
        },
      }}
    >
      <DialogTitle
      component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pr: 1,
          py: 1.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, pr: 2, color: "black" }}
          noWrap
        >
          {video.title}
        </Typography>
        <IconButton onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0 }}>
        {/* 16:9 responsive iframe */}
        <Box
          sx={{ position: "relative", paddingTop: "56.25%", bgcolor: "#000" }}
        >
          <iframe
            src={embedUrl}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              border: "none",
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={video.title}
          />
        </Box>

        <Box sx={{ p: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
            {video.channelTitle}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {video.viewCount?.toLocaleString("ru-RU")} просмотров •{" "}
            {video.publishedAt}
          </Typography>

          {video.description && (
            <Typography
              variant="body2"
              sx={{
                mt: 2,
                color: "text.secondary",
                whiteSpace: "pre-line",
                maxHeight: 120,
                overflow: "auto",
              }}
            >
              {video.description.length > 400
                ? video.description.slice(0, 400) + "..."
                : video.description}
            </Typography>
          )}

          <Button
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            startIcon={<OpenInNewIcon />}
            variant="outlined"
            sx={{ mt: 2.5, borderRadius: 2 }}
          >
            Смотреть на YouTube
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default VideoPlayerModal;
