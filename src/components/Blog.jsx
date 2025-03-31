import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Blog() {
  const categories = ["All", "Technology", "Business", "Science", "Sports"];

  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedArticle, setExpandedArticle] = useState(null);

  useEffect(() => {
    fetch(
      "https://newsapi.org/v2/everything?q=tesla&from=2025-02-28&sortBy=publishedAt&apiKey=fa081bce27354559b50936e589dd3b84"
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.articles) {
          setArticles(data.articles);
          setFilteredArticles(data.articles);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter(
          (article) =>
            article.title?.toLowerCase().includes(category.toLowerCase()) ||
            article.description?.toLowerCase().includes(category.toLowerCase())
        )
      );
    }
  };

  return (
    <div className='container mt-4'>
      <nav
        className='navbar navbar-expand-lg mb-4 px-4 py-3'
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <div className='container-fluid'>
          <a
            className='navbar-brand fw-bold fs-3'
            href='#'
            style={{
              background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.5px",
            }}
          >
            <i className='bi bi-pen-fill me-2'></i>
            Pulse<span style={{ fontWeight: "400" }}>Blog</span>
          </a>

          <div className='d-flex flex-wrap gap-2'>
            {categories.map((category, index) => {
              const colors = {
                Technology: {
                  bg: "#2563eb",
                  text: "#ffffff",
                  hover: "#1d4ed8",
                },
                Business: { bg: "#059669", text: "#ffffff", hover: "#047857" },
                Health: { bg: "#dc2626", text: "#ffffff", hover: "#b91c1c" },
                Sports: { bg: "#d97706", text: "#ffffff", hover: "#b45309" },
                Entertainment: {
                  bg: "#7c3aed",
                  text: "#ffffff",
                  hover: "#6d28d9",
                },
                Science: { bg: "#0891b2", text: "#ffffff", hover: "#0e7490" },
                General: { bg: "#4b5563", text: "#ffffff", hover: "#374151" },
              };

              const categoryColor = colors[category] || {
                bg: "#6b7280",
                text: "#ffffff",
                hover: "#4b5563",
              };

              return (
                <button
                  key={index}
                  className={`btn btn-sm fw-medium position-relative overflow-hidden`}
                  onClick={() => filterByCategory(category)}
                  style={{
                    backgroundColor:
                      selectedCategory === category
                        ? categoryColor.bg
                        : "transparent",
                    color:
                      selectedCategory === category
                        ? categoryColor.text
                        : categoryColor.bg,
                    border: `2px solid ${categoryColor.bg}`,
                    borderRadius: "8px",
                    padding: "6px 16px",
                    transition: "all 0.3s ease",
                    zIndex: 1,
                    "--hover-color": categoryColor.hover,
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.backgroundColor = `${categoryColor.bg}20`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  {category}
                  {selectedCategory === category && (
                    <span className='position-absolute top-0 start-100 translate-middle p-1 bg-white border border-light rounded-circle'>
                      <span className='visually-hidden'>Active</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className='row'>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <div key={index} className='col-lg-4 col-md-6 mb-4'>
              <div
                className='card h-100 border-0 shadow-sm overflow-hidden hover-shadow-lg transition-all'
                style={{
                  borderRadius: "12px",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-5px)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
              >
                {article.urlToImage && (
                  <div
                    className='card-img-top overflow-hidden'
                    style={{
                      height: "200px",
                      backgroundImage: `url(${article.urlToImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      position: "relative",
                    }}
                  >
                    <div className='position-absolute top-0 end-0 m-2'>
                      <span className='badge rounded-pill bg-danger'>
                        {article.source?.name || "News"}
                      </span>
                    </div>
                  </div>
                )}

                <div className='card-body d-flex flex-column'>
                  <div className='mb-2'>
                    <small className='text-muted d-flex align-items-center'>
                      <i className='bi bi-calendar me-1'></i>
                      {new Date(article.publishedAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </small>
                  </div>

                  <h5
                    className='card-title fw-bold mb-3'
                    style={{ color: "#2c3e50" }}
                  >
                    {article.title}
                  </h5>

                  <p className='card-text text-muted flex-grow-1'>
                    {article.description
                      ? article.description.slice(0, 120) +
                        (article.description.length > 120 ? "..." : "")
                      : "No description available."}
                  </p>

                  <div className='d-flex justify-content-between align-items-center mt-3'>
                    {article.author && (
                      <small className='text-primary fw-medium'>
                        <i className='bi bi-person-fill me-1'></i>
                        {article.author.slice(0, 20)}
                        {article.author.length > 20 ? "..." : ""}
                      </small>
                    )}

                    <button
                      className='btn btn-outline-primary rounded-pill px-3 py-1 d-flex align-items-center'
                      onClick={() => setExpandedArticle(index)}
                      style={{
                        borderWidth: "2px",
                        transition: "all 0.3s",
                      }}
                    >
                      <span>Read</span>
                      <i className='bi bi-arrow-right ms-2'></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-12 text-center py-5'>
            <div className='d-flex flex-column align-items-center'>
              <i
                className='bi bi-newspaper text-muted'
                style={{ fontSize: "3rem" }}
              ></i>
              <h4 className='mt-3 text-muted'>No articles found</h4>
              <p className='text-muted'>Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>

      {expandedArticle !== null && (
        <div
          className='modal fade show d-block'
          tabIndex='-1'
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
        >
          <div className='modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable'>
            <div
              className='modal-content'
              style={{ borderRadius: "12px", overflow: "hidden" }}
            >
              <div
                className='modal-header'
                style={{ borderBottom: "none", paddingBottom: 0 }}
              >
                <div className='d-flex justify-content-between w-100 align-items-center'>
                  <div>
                    <span className='badge bg-primary mb-2'>
                      {filteredArticles[expandedArticle].source?.name || "News"}
                    </span>
                    <h5
                      className='modal-title fw-bold'
                      style={{ fontSize: "1.5rem" }}
                    >
                      {filteredArticles[expandedArticle].title}
                    </h5>
                  </div>
                  <button
                    type='button'
                    className='btn-close'
                    onClick={() => setExpandedArticle(null)}
                    style={{ fontSize: "0.8rem" }}
                  ></button>
                </div>
              </div>

              <div className='modal-body pt-0'>
                {filteredArticles[expandedArticle].urlToImage && (
                  <div
                    className='img-fluid mb-4 rounded'
                    style={{
                      height: "300px",
                      backgroundImage: `url(${filteredArticles[expandedArticle].urlToImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                )}

                <div className='d-flex align-items-center mb-3 text-muted'>
                  <small>
                    {filteredArticles[expandedArticle].author && (
                      <span className='me-3'>
                        <i className='bi bi-person-fill me-1'></i>
                        {filteredArticles[expandedArticle].author}
                      </span>
                    )}
                    {filteredArticles[expandedArticle].publishedAt && (
                      <span>
                        <i className='bi bi-clock me-1'></i>
                        {new Date(
                          filteredArticles[expandedArticle].publishedAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </small>
                </div>

                <div
                  className='article-content mb-4'
                  style={{ lineHeight: "1.8" }}
                >
                  {filteredArticles[expandedArticle].content ||
                    filteredArticles[expandedArticle].description}
                </div>

                <div className='d-flex justify-content-end'>
                  <a
                    href={filteredArticles[expandedArticle].url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='btn btn-primary px-4 py-2 d-flex align-items-center'
                    style={{ borderRadius: "8px" }}
                  >
                    <i className='bi bi-newspaper me-2'></i>
                    Read Full Article
                  </a>
                </div>
              </div>

              <div className='modal-footer' style={{ borderTop: "none" }}>
                <small className='text-muted'>
                  Powered by{" "}
                  {filteredArticles[expandedArticle].source?.name || "News API"}
                </small>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
