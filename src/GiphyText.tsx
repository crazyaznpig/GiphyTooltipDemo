import * as React from "react";
import GiphyWindow from "./GiphyWindow"

interface IGiphyTextProps {
  children: Element[] | JSX.Element[] | React.ReactElement<any>[];
}

interface IGiphyTextState {
  height: number;
  query: string;
  width: number;
  x: number;
  y: number;
}

class GiphyText extends React.Component<IGiphyTextProps, IGiphyTextState> {
  constructor(props: IGiphyTextProps) {
    super(props);
    this.state = { height: 0, query: "", width: 0, x: 0, y: 0 };
    this.CheckForSelection = this.CheckForSelection.bind(this);
    this.ClearSelection = this.ClearSelection.bind(this);
  }

  private CheckForSelection(): void {
    const selection = window.getSelection();
    const text = selection.toString();

    if (text !== "") {
      let rec = selection.getRangeAt(0).getBoundingClientRect();
      let x = rec.left + rec.width/2;
      let y = rec.top + rec.height/2;
      this.setState({ height: rec.height, query: text, width: rec.width, x: x, y: y });
    }
    else
      this.ClearSelection();
  }

  private ClearSelection(): void {
    this.setState({ height: 0, query: "", width: 0, x: 0, y: 0 });
  }

  public render(): React.ReactElement<IGiphyTextProps> {
    const styles = {
      fontFamily: "sans-serif",
      "paddingTop": "100px",
      textAlign: "center"
    };

    return (
      <React.Fragment>
        <GiphyWindow {...this.state}/>
        <div style={styles} 
          onTouchStart={this.ClearSelection}
          onMouseDown={this.ClearSelection}
          onMouseUp={this.CheckForSelection}
          onTouchEnd={this.CheckForSelection}>
            {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default GiphyText;
