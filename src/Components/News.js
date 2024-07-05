import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import monkeyIcon from "./monkey-icon.png";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
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
      prevProps.pageSize !== this.props.pageSize
    ) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    try {
      this.props.setProgress(20);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      this.props.setProgress(40);
      let data = await fetch(url);
      this.props.setProgress(60);
      let parsedData = await data.json();
      this.props.setProgress(80);
      this.setState({
        articles: parsedData.articles || [],
        loading: false,
        totalResults: parsedData.totalResults || 0,
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
  };

  fetchMoreData = async () => {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;

      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState((prevState) => ({
        articles: [...prevState.articles, ...parsedData.articles],
        page: prevState.page + 1,
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching more data:", error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { articles } = this.state;

    return (
      <div className="container">
        <div className="container padding-auto">
          <h1
            className="text-center"
            style={{ marginTop: "20px", marginBottom: "20px" }}
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
              - Top {this.props.category} Headlines{" "}
            </b>
          </h1>
          {this.state.loading && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <Spinner />
            </div>
          )}
          <InfiniteScroll
            style={{ height: "auto", overflow: "hidden" }}
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "200px" }}
              >
                <Spinner />
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
                      <div className="col-md-4 mb-3" key={element.url}>
                        <NewsItem
                          title={
                            element.title ? element.title.slice(0, 30) : ""
                          }
                          description={
                            element.description
                              ? element.description.slice(0, 80)
                              : ""
                          }
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
        </div>
      </div>
    );
  }
}

export default News;
