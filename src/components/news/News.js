import React, { Component } from "react";
import NewsItem from "./NewsItem";
import monkeyIcon from "../../assets/images/monkey-icon.png";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsSkeleton from "../layout/NewsSkeleton";
export class News extends Component {
  static defaultProps = {
    country: "us",
    category: "general",
    pageSize: 3,
  };

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      error: false,
    };

    document.title = `${this.props.category} - NewsMonkey`;
  }

  async componentDidMount() {
    this.fetchData();
  }

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.country !== this.props.country ||
      prevProps.category !== this.props.category ||
      prevProps.pageSize !== this.props.pageSize ||
      prevProps.searchQuery !== this.props.searchQuery
    ) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      this.props.setProgress(20);

      this.setState({
        loading: true,
        error: false,
        articles: [],
        page: 1,
      });

      let url = "";

      if (this.props.searchQuery) {
        url = `https://newsmonkey-1xh6.onrender.com/api/news?search=${encodeURIComponent(
          this.props.searchQuery
        )}&page=1&pageSize=${this.props.pageSize}`;
      } else {
        url = `https://newsmonkey-1xh6.onrender.com/api/news?country=${this.props.country}&category=${this.props.category}&page=1&pageSize=${this.props.pageSize}`;
      }

      this.props.setProgress(50);

      const token = localStorage.getItem("token");

      const response = await fetch(url, {
        headers:
          this.props.category === "personalized" && token
            ? {
              Authorization: `Bearer ${token}`,
            }
            : {},
      }); 
      const parsedData = await response.json();

      this.props.setProgress(80);

      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
        page: 1,
      });

      this.props.setProgress(100);
    } catch (err) {
      console.error(err);

      this.setState({
        loading: false,
        error: true,
      });
    }
  };

  fetchMoreData = async () => {
    try {
      const nextPage = this.state.page + 1;

      let url = "";

      if (this.props.searchQuery) {
        url = `https://newsmonkey-1xh6.onrender.com/api/news?search=${encodeURIComponent(
          this.props.searchQuery
        )}&page=${nextPage}&pageSize=${this.props.pageSize}`;
      } else {
        url = `${process.env.REACT_APP_API}/news?country=${this.props.country}&category=${this.props.category}&page=${nextPage}&pageSize=${this.props.pageSize}`;
      }

      const token = localStorage.getItem("token");

      const response = await fetch(url, {
        headers:
          this.props.category === "personalized" && token
            ? {
              Authorization: `Bearer ${token}`,
            }
            : {},
      });

      const parsedData = await response.json();

      this.setState((prevState) => ({
        articles: [...prevState.articles, ...(parsedData.articles || [])],
        page: nextPage,
        totalResults: parsedData.totalResults,
        loading: false,
      }));
    } catch (err) {
      console.error(err);

      this.setState({
        loading: false,
      });
    }
  };
  render() {
    const { articles } = this.state;
    console.log("Dark Mode:", this.props.darkMode);
    return (
      <div
        className="container-fluid py-4"
        style={{
          backgroundColor: this.props.darkMode ? "#121212" : "#ffffff",
          minHeight: "100vh",
          color: this.props.darkMode ? "#fff" : "#000",
        }}
      >
        <div className="container padding-auto">
          <h1
            className="text-center"
            style={{
              color: this.props.darkMode ? "white" : "#212529",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <b>
              NewsMonkey{" "}
              <img
                src={monkeyIcon}
                alt="Monkey Icon"
                width="30"
                height="30"
                className="my-auto"
              />{" "}
              -{" "}
              {this.props.searchQuery
                ? `Search Results for "${this.props.searchQuery}"`
                : `Top ${this.props.category} Headlines`}
            </b>
          </h1>
          {this.state.loading && (
            <div className="row">
              {Array.from({ length: 6 }).map((_, index) => (
                <div className="col-lg-4 col-md-6 mb-4" key={index}>
                  <NewsSkeleton darkMode={this.props.darkMode} />
                </div>
              ))}
            </div>
          )}
          {this.state.error && (
            <div
              className="text-center mt-5"
              style={{
                color: this.props.darkMode ? "#fff" : "#000",
              }}
            >
              <h1>📡</h1>

              <h3>Unable to load news</h3>

              <p>
                Please check your internet connection
                <br />
                or try again later.
              </p>

              <button
                className={`btn ${this.props.darkMode ? "btn-light" : "btn-dark"
                  }`}
                onClick={this.fetchData}
              >
                Retry
              </button>
            </div>
          )}
          {!this.state.error && (
            <InfiniteScroll
              style={{ height: "auto", overflow: "hidden" }}
              dataLength={this.state.articles.length}
              next={this.fetchMoreData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={
                <div className="row">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div className="col-lg-4 col-md-6 mb-4" key={index}>
                      <NewsSkeleton darkMode={this.props.darkMode} />
                    </div>
                  ))}
                </div>
              }
            >
              <div className="container">
                <div className="row">
                  {articles.length > 0 &&
                    !this.state.loading &&
                    articles
                      .filter(
                        (article, index, self) =>
                          index ===
                          self.findIndex(
                            (t) =>
                              t.url === article.url &&
                              t.url !== "https://removed.com"
                          )
                      )
                      .map((element) => (
                        <div className="col-lg-4 col-md-6 mb-4 d-flex" key={element.url}>
                          <NewsItem
                            title={element.title ? element.title.slice(0, 30) : ""}
                            description={element.description ? element.description.slice(0, 80) : ""}
                            darkMode={this.props.darkMode}
                            date={element.publishedAt}
                            author={element.author}
                            imageUrl={element.urlToImage}
                            newsUrl={element.url}
                            source={element.source.name}
                          />
                        </div>
                      ))}
                </div>
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    );
  }
}

export default News;
