// URLShortening.jsx
import { useState, useEffect, useRef } from "react";
import "./URLShortening.css"; // Create this CSS file for styling

const URLShortening = () => {
  // State management
  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [urlHistory, setUrlHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("shortener");
  const chartRef = useRef(null);

  // Generate random slug
  const generateSlug = (length = 6) => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array(length)
      .fill("")
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join("");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validate URL
    if (!originalUrl.trim()) {
      setError("Please enter a URL");
      setIsLoading(false);
      return;
    }

    let processedUrl = originalUrl.trim();
    if (
      !processedUrl.startsWith("http://") &&
      !processedUrl.startsWith("https://")
    ) {
      processedUrl = "https://" + processedUrl;
    }

    try {
      new URL(processedUrl); // Validate URL format
    } catch (err) {
      setError("Please enter a valid URL");
      setIsLoading(false);
      return;
    }

    const slug = customSlug.trim() || generateSlug();

    // Validate slug characters
    if (/[^a-zA-Z0-9-]/.test(slug)) {
      setError("Custom alias can only contain letters, numbers, and hyphens");
      setIsLoading(false);
      return;
    }

    // Check if slug exists
    if (urlHistory.some((u) => u.slug === slug)) {
      setError("This alias is already in use");
      setIsLoading(false);
      return;
    }

    const newShortUrl = `${window.location.origin}/${slug}`;
    const newUrlEntry = {
      id: Date.now(),
      originalUrl: processedUrl,
      shortUrl: newShortUrl,
      slug,
      createdAt: new Date().toISOString(),
      clicks: 0,
      clickHistory: [],
    };

    setShortUrl(newShortUrl);
    setUrlHistory((prev) => [newUrlEntry, ...prev]);
    setSuccess("URL successfully shortened!");
    setOriginalUrl("");
    setCustomSlug("");
    setIsLoading(false);

    setTimeout(() => setSuccess(""), 3000);
  };

  // Copy to clipboard
  const copyToClipboard = (urlToCopy) => {
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        // Update click count
        setUrlHistory((prev) =>
          prev.map((url) =>
            url.shortUrl === urlToCopy
              ? {
                  ...url,
                  clicks: url.clicks + 1,
                  clickHistory: [
                    ...url.clickHistory,
                    { timestamp: new Date().toISOString(), type: "copy" },
                  ],
                }
              : url
          )
        );
      })
      .catch((err) => console.error("Failed to copy:", err));
  };

  // Delete URL from history
  const deleteUrl = (id) => {
    if (window.confirm("Are you sure you want to delete this short URL?")) {
      setUrlHistory((prev) => prev.filter((u) => u.id !== id));
    }
  };

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("urlHistory")) || [];
    setUrlHistory(savedHistory);
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("urlHistory", JSON.stringify(urlHistory));
  }, [urlHistory]);

  // Analytics chart effect
  useEffect(() => {
    if (
      activeTab === "analytics" &&
      chartRef.current &&
      urlHistory.length > 0
    ) {
      const ctx = chartRef.current.getContext("2d");

      // Prepare data for chart
      const labels = urlHistory.map((url) => url.slug);
      const clickData = urlHistory.map((url) => url.clicks);

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Clicks",
              data: clickData,
              backgroundColor: "rgba(99, 102, 241, 0.7)",
              borderColor: "rgba(99, 102, 241, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [activeTab, urlHistory]);

  return (
    <div className="url-shortener-app">
      {/* Navigation */}
      <nav className="app-nav">
        <button
          className={activeTab === "shortener" ? "active" : ""}
          onClick={() => setActiveTab("shortener")}
        >
          URL Shortener
        </button>
        <button
          className={activeTab === "analytics" ? "active" : ""}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </button>
      </nav>

      {/* Main Content */}
      <main className="app-main">
        {activeTab === "shortener" ? (
          <div className="shortener-container">
            <h2>Shorten Your URL</h2>

            <form onSubmit={handleSubmit} className="shortener-form">
              <div className="form-group">
                <label htmlFor="originalUrl">Original URL:</label>
                <input
                  type="url"
                  id="originalUrl"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customSlug">Custom Alias (optional):</label>
                <div className="slug-input-group">
                  <span className="domain-prefix">{window.location.host}/</span>
                  <input
                    type="text"
                    id="customSlug"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value)}
                    placeholder="my-custom-link"
                    pattern="[a-zA-Z0-9-]+"
                    title="Only letters, numbers, and hyphens"
                  />
                </div>
              </div>

              {error && <div className="error-message">{error}</div>}
              {success && <div className="success-message">{success}</div>}

              <button type="submit" className="submit-btn" disabled={isLoading}>
                {isLoading ? "Shortening..." : "Shorten URL"}
              </button>
            </form>

            {shortUrl && (
              <div className="result-container">
                <h3>Your Short URL:</h3>
                <div className="result-display">
                  <a
                    href={shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      // Track click
                      setUrlHistory((prev) =>
                        prev.map((url) =>
                          url.shortUrl === shortUrl
                            ? {
                                ...url,
                                clicks: url.clicks + 1,
                                clickHistory: [
                                  ...url.clickHistory,
                                  {
                                    timestamp: new Date().toISOString(),
                                    type: "visit",
                                  },
                                ],
                              }
                            : url
                        )
                      );
                    }}
                  >
                    {shortUrl}
                  </a>
                  <button
                    onClick={() => copyToClipboard(shortUrl)}
                    className="copy-btn"
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}

            {urlHistory.length > 0 && (
              <div className="history-section">
                <h3>Your Shortened URLs</h3>
                <ul className="url-list">
                  {urlHistory.map((url) => (
                    <li key={url.id} className="url-item">
                      <div className="url-info">
                        <a
                          href={url.shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            // Track click
                            setUrlHistory((prev) =>
                              prev.map((u) =>
                                u.id === url.id
                                  ? {
                                      ...u,
                                      clicks: u.clicks + 1,
                                      clickHistory: [
                                        ...u.clickHistory,
                                        {
                                          timestamp: new Date().toISOString(),
                                          type: "visit",
                                        },
                                      ],
                                    }
                                  : u
                              )
                            );
                          }}
                        >
                          {url.shortUrl}
                        </a>
                        <p className="original-url">{url.originalUrl}</p>
                        <div className="url-meta">
                          <span>Clicks: {url.clicks}</span>
                          <span>
                            Created:{" "}
                            {new Date(url.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="url-actions">
                        <button
                          onClick={() => copyToClipboard(url.shortUrl)}
                          className="action-btn copy"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => deleteUrl(url.id)}
                          className="action-btn delete"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="analytics-container">
            <h2>URL Analytics</h2>

            {urlHistory.length > 0 ? (
              <>
                <div className="chart-container">
                  <canvas ref={chartRef}></canvas>
                </div>

                <div className="analytics-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Short URL</th>
                        <th>Original URL</th>
                        <th>Clicks</th>
                        <th>Created</th>
                        <th>Last Click</th>
                      </tr>
                    </thead>
                    <tbody>
                      {urlHistory.map((url) => (
                        <tr key={url.id}>
                          <td>
                            <a
                              href={url.shortUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {url.slug}
                            </a>
                          </td>
                          <td className="original-url-cell">
                            {url.originalUrl}
                          </td>
                          <td>{url.clicks}</td>
                          <td>
                            {new Date(url.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            {url.clickHistory.length > 0
                              ? new Date(
                                  url.clickHistory[
                                    url.clickHistory.length - 1
                                  ].timestamp
                                ).toLocaleString()
                              : "Never"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <p className="no-data-message">
                No URLs have been shortened yet.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default URLShortening;
