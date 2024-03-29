import React from "react";
import Input from "./Input";
import Button from "./Button";
import "./TopBar.css";

const TopBar = (props) => {
  return (
    <>
      <div className="search_container">
        {props.searching === true ? (
          <>
            <div className="search_input_container">
              <Input
                PlaceHolder="First Name"
                Value={props.NameValue}
                OnChange={props.OnNameChange}
              />
              <Input
                PlaceHolder="Last name"
                Value={props.LnameValue}
                OnChange={props.OnLnameChange}
              />
            </div>
            <Button
              ClassName="search_button1"
              OnClick={props.OnSearchClick}
              title="Search"
            />
            {props.notFiltering !== true ? (
              <Button
                ClassName="search_button2"
                OnClick={props.OnFilterClick}
                title="Filter"
              />
            ) : null}
          </>
        ) : null}

        {/* <div className="search_button2" onClick={() => setFiltering(true)}>
            Filter
          </div> */}
      </div>
    </>
  );
};

export default TopBar;
