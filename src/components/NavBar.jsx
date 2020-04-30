import React, { Fragment } from "react";
import "./NavBar.scss";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/pudium_icon.png";
class NavBar extends React.Component {
  render() {
    const { items } = this.props;
    return (
      <div className="NavBar">
        <div className="NavBar__header">
          <img src={Logo} alt="app logo" />
          <span className="NavBar__header__heading">Defy.fyi</span>
          <span className="NavBar__header__subheading">Put your ₿ where your mouth is</span>
        </div>
        <div className="NavBar__divider" />
        <ul className="NavBar__list">
          {items.map((item, index) => (
            <Fragment key={index}>
              <li className="NavBar__list__item-wrapper">
                <NavLink
                  to={item.link}
                  className="NavBar__list__item-wrapper__item"
                  activeClassName="NavBar__list__item-wrapper__item-selected"
                >
                  <i className={`${item.icon}`} aria-hidden="true"></i>
                  <span>{item.text}</span>
                </NavLink>
              </li>
            </Fragment>
          ))}
        </ul>
      </div>
    );
  }
}
export default NavBar;
