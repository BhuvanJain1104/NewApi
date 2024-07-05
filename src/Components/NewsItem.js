import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, date, author, source } =
      this.props;
    return (
      <div className="my-3 d-flex justify-content-center">
        <div className="card" style={{ height: "500px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              right: 0,
              top: -1,
            }}
          >
            <span className=" badge rounded-pill bg-dark">{source}</span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://www.simplilearn.com/ice9/free_resources_article_thumb/Technology_Trends.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
            style={{ height: "300px", objectFit: "cover" }} // Adjust image height and style as needed
          />
          <div className="card-body d-flex flex-column justify-content-between">
            <h5 className="card-title">{title}... </h5>
            <p className="card-text">{description}...</p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark mt-auto"
            >
              Read More
            </a>
          </div>{" "}
          <div className="card-footer text-bg-dark">
            Published On :-{date.slice(0, 10)}{" "}
            <cite title="Source Title">
              BY:-{!author ? "Bhuvan Jain" : author.slice(0, 15)}
            </cite>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
