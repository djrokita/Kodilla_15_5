var GIPHY_API_URL = "https://api.giphy.com";
var GIPHY_PUB_KEY = "lDDdnHXEBlFLE8KxcJurBa0jXYXKBPya";

App = React.createClass({
  getInitialState() {
    return {
      loading: false,
      searchingText: "",
      gif: {}
    };
  },
  handleSearch: function(searchingText) {
    this.setState({
      loading: true
    });
    this.getGif(searchingText)
      .then(response => {
        var data = JSON.parse(response).data;
        this.setState({
          loading: false,
          gif: {
            url: data.fixed_width_downsampled_url,
            sourceUrl: data.url
          }
        });
      })
      .catch(error => console.error("Something went wrong", error));
  },
  getGif: function(searchText) {
    var url =
      GIPHY_API_URL +
      "/v1/gifs/random?api_key=" +
      GIPHY_PUB_KEY +
      "&tag=" +
      searchText;
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(new Error(this.statusText));
        }
      };
      xhr.onerror = function() {
        reject(new Error(`XMLHttpxhr Error: ${this.statusText}`));
      };
      xhr.open("GET", url);
      xhr.send();
    });
  },
  render: function() {
    var styles = {
      margin: "0 auto",
      textAlign: "center",
      width: "90%"
    };
    return (
      <div style={styles}>
        <h1>Wyszukiwarka GIFow!</h1>
        <p>
          Znajdź gifa na <a href="http://giphy.com">giphy</a>. Naciskaj enter,
          aby pobrać kolejne gify.
        </p>
        <Search onSearch={this.handleSearch} />
        <Gif
          loading={this.state.loading}
          url={this.state.gif.url}
          sourceUrl={this.state.gif.sourceUrl}
        />
      </div>
    );
  }
});
