import React from "react"
import {Link} from "react-router"
import {fb} from "../firebase.js"

export default class Navbar extends React.Component {

  render() {

    //adapted  from Founation documentation
    return <nav className="top-bar" data-topbar role="navigation">
      <ul className="title-area">
        <li className="name">
          <h1><a href="#">Serverless CMS</a></h1>
        </li>
        <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
      </ul>
    
      <section className="top-bar-section">
        <ul className="right">
          {this.renderUserDropdown()}
        </ul>

        <ul className="left">
          {this.renderNew()}
          {this.renderEditView()}
        </ul>

      </section>
    </nav>
  }

  //render the edit items if there is a user logged in
  renderNew() {
    if (!this.props.authData)
      return null;

    return <li className="has-dropdown">
      <a>New</a>
        <ul className="dropdown">
        <li><Link to="/admin/pages/new">Page</Link></li>
      </ul>
    </li>
  }

  renderEditView() {
    if (!this.props.authData)
      return null;

    //determine if this is a page view
    if (this.props.location.pathname.startsWith("/pages/")) {
      var targetUrl = "/admin/pages/"+this.props.params.id;
      return <li><Link to={targetUrl}>Edit</Link></li>
    }

    //or a page edit view
    if (this.props.location.pathname.startsWith("/admin/pages/") && this.props.params.id) {
      var targetUrl = "/pages/"+this.props.params.id;
      return <li><Link to={targetUrl}>View</Link></li>
    }
    
    return null;
  }

  renderUserDropdown() {
    if (!this.props.authData)
      return <li><Link to="/login">Log In</Link></li>;
    else {
      return <li className="has-dropdown">
        <a href="#">{this.props.authData.password.email}</a>
        <ul className="dropdown">
          <li><Link to="" onClick={this.signout}>Log Out</Link></li>
        </ul>
      </li>
    }

  }

  signout = evt => {
    fb.unauth();
    return false;
  }
}

/*
<nav className="top-bar" data-topbar role="navigation">
  <ul className="title-area">
    <li className="name">
      <h1><a href="#">My Site</a></h1>
    </li>
     <!-- Remove the className "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
    <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
  </ul>

  <section className="top-bar-section">
    <!-- Right Nav Section -->
    <ul className="right">
      <li className="active"><a href="#">Right Button Active</a></li>
      <li className="has-dropdown">
        <a href="#">Right Button Dropdown</a>
        <ul className="dropdown">
          <li><a href="#">First link in dropdown</a></li>
          <li className="active"><a href="#">Active link in dropdown</a></li>
        </ul>
      </li>
    </ul>

    <!-- Left Nav Section -->
    <ul className="left">
      <li><a href="#">Left Nav Button</a></li>
    </ul>
  </section>
</nav>
*/