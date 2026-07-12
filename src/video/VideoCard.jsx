import "../shared/styles/VideoCard.css";

function VideoCard({ data, variant = "grid", onClick }) {
  const isList = variant === "list";

  const formatViews = (views) => {
    if (views >= 1000000)
      return `${(views / 1000000).toFixed(1)} млн. просмотров`;
    if (views >= 1000) return `${(views / 1000).toFixed(0)} тыс. просмотров`;
    return `${views} просмотров`;
  };

  const handleClick = () => {
    if (onClick) onClick(data);
  };

  return (
    <div
      className={`video-card ${isList ? "video-card--list" : "video-card--grid"}`}
      onClick={handleClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <div className="video-card__thumbnail-wrapper">
        <img
          src={data.thumbnailUrl || "https://via.placeholder.com/320x180?text=No+Image"}
          alt={data.title}
          className="video-card__thumbnail"
        />
        {data.duration && (
          <span className="video-card__duration">{data.duration}</span>
        )}
      </div>

      <div className="video-card__info">
        <h3 className="video-card__title" title={data.title}>
          {data.title}
        </h3>

        <div className="video-card__meta">
          <span className="video-card__channel">{data.channelTitle}</span>

          <div className="video-card__stats">
            {data.viewCount > 0 && (
              <>
                <span>{formatViews(data.viewCount)}</span>
                <span className="video-card__dot">•</span>
              </>
            )}
            <span>{data.publishedAt}</span>
          </div>
        </div>

        {isList && data.description && (
          <p className="video-card__description">{data.description}</p>
        )}
      </div>
    </div>
  );
}

export default VideoCard;