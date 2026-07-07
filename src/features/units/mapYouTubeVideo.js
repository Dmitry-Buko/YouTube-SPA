// utils/mapYouTubeVideo.js
export const mapYouTubeVideo = (video) => {
  const snippet = video.snippet || {};
  const statistics = video.statistics || {};
  const contentDetails = video.contentDetails || {};

  return {
    id: video.id,
    title: snippet.title,
    channelTitle: snippet.channelTitle,
    description: snippet.description || "",
    thumbnailUrl: snippet.thumbnails?.medium?.url || 
                  snippet.thumbnails?.high?.url || 
                  snippet.thumbnails?.default?.url,
    viewCount: parseInt(statistics.viewCount || 0),
    publishedAt: formatPublishedDate(snippet.publishedAt),
    duration: formatDuration(contentDetails.duration),
  };
};

const formatPublishedDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.ceil((now - date) / (1000 * 3600 * 24));
  
  if (diffTime === 0) return "Сегодня";
  if (diffTime === 1) return "Вчера";
  if (diffTime < 30) return `${diffTime} дн. назад`;
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
};

const formatDuration = (isoDuration) => {
  if (!isoDuration) return '';
  
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';

  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};