import React from "react"
import {markdown} from "markdown"


export default class Page extends React.Component {


  render() {
    return <div className="row">
      <h1 className="large-12 columns">{this.props.item.name}</h1>
      <div className="large-12 columns">{this.renderPageBody()}</div>
      <div className="large-12 columns"><em>Key: {this.props.item._key}</em></div>
    </div>;
  }

  renderPageBody() {
    if (this.props.item.body) {
      var md = markdown.toHTML(this.props.item.body);
      return <div dangerouslySetInnerHTML={{__html: md}}></div>
    }
  }

}