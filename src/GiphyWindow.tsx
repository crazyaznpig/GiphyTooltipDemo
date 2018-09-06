import * as React from "react";

interface IGiphyWindowProps {
  height: number;
  query: string;
  width: number;
  x: number;
  y: number;
}

interface IGiphyWindowState {
  query: string,
  url: string
}

class GiphyWindow extends React.Component<IGiphyWindowProps, IGiphyWindowState> {
  constructor(props: IGiphyWindowProps) {
    super(props);
    this.state = { query: "", url: "" };
    this.SetImgUrl = this.SetImgUrl.bind(this);
  }

  private SetImgUrl(query: string): void {
    if (this.props.query !== "") {
      const API = "https://api.giphy.com/v1/gifs/search?api_key=4Z15yuylYr1bEQkpJiBb3dd4ffvUfs5v&limit=1&q="
        + encodeURIComponent(query);
      fetch(API)
        .then(response => response.json())
        .then(data => {
          if (data.data.length > 0)
            this.setState({ query: query, url: data.data[0].images.fixed_width.url });
        });
    }
    else {
      this.setState({ query: "", url: "" });
    }
  }

  public render() {
    if (this.state.query != this.props.query)
      this.SetImgUrl(this.props.query);

    const style = {
      background: "#FFFFFF",
      border: "1px solid green",
      width: this.props.x > 0 ? "300px" : 0,
      left: this.props.x - 150,
      padding: "5px",
      position: 'absolute' as 'absolute',
      top: this.props.y + this.props.height / 2
    };

    return <img style={style} src={this.state.url} />;
  }
}

export default GiphyWindow;
