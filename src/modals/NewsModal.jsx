import { pb } from "../pocketbase.js";

function NewsModal({ news, onClose }) {
  if (!news) return null;

  const imageUrls =
    news.images && news.images.length > 0
      ? news.images.map((img) => pb.files.getUrl(news, img))
      : [];

  return (
    <div className="news-reader-overlay" onClick={onClose}>
      <div
        className="news-reader-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button className="news-reader-close" onClick={onClose}>
          ×
        </button>

        {/* TITLE */}
        <h2 className="news-reader-title">{news.title}</h2>

        {/* GALLERY */}
        {imageUrls.length > 0 && (
          <div className="news-reader-gallery">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`news-${index}`}
                className="news-reader-image"
              />
            ))}
          </div>
        )}

        {/* DATE */}
        {news.date && (
          <span className="news-reader-date">
            {new Date(news.date).toLocaleDateString()}
          </span>
        )}

        {/* CONTENT */}
        {news.content && (
          <div className="news-reader-content">
            <div
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsModal;