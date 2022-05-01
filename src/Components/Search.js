import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Display from "./Display";
import { fetchUser } from "../ServiceFile/userService";
import loadingImage from "../image/Iphone-spinner-2.gif";
import Header from "./Header";

const Search = () => {
  const orgConst = "+type:org";
  const userTypeUSER = "User";
  const [radioValue, setRadioValue] = useState("");
  const [searchTerm, setSearchValue] = useState("");
  const [finalResult, setFinalResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    toast.configure();
  }, []);

  //define the value of radio button
  const onChangeValue = (event) => {
    setRadioValue(event.target.value);
  };

  const updateSearchTerm = (e) => {
    setSearchValue(e.target.value);
  };

  //search in api based on users or organization t
  const onBtnSubmit = async () => {
    setIsLoading(true);
    let fetchedData;
    if (searchTerm) {
      if (radioValue === userTypeUSER) {
        fetchedData = await fetchUser(searchTerm, "");
      } else {
        fetchedData = await fetchUser(searchTerm, orgConst);
      }
      setFinalResult(fetchedData);
      setIsLoading(false);
    } else {
      setFinalResult([]);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <div className="row justify-content-md-center mt-5 mb-5 box hero-image">
          <div className="col-12 mb-3">
            <input
              className="search form-control"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={updateSearchTerm}
            />
          </div>
          <div className="col-12 mb-3 textAlignCenter text-color">
            <div onChange={onChangeValue}>
              <input type="radio" value="User" name="users" /> Users
              <span className="ml-3" />
              <input type="radio" value="Organization" name="users" />{" "}
              Organizations
            </div>
          </div>
          <div className="col-12 textAlignCenter">
            <button
              className="btn btn-primary"
              onClick={() => {
                radioValue && searchTerm.length > 0
                  ? onBtnSubmit()
                  : toast.warn("Textbox and radio button must have value");
              }}
            >
              Submit
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12 textAlignCenter">
            {isLoading && finalResult.length > 0 && (
              <img alt="loading" src={loadingImage} />
            )}
          </div>
        </div>
        {finalResult.length > 0 &&
          finalResult.map((data) => (
            <Display result={data} type={radioValue} key={data.id} />
          ))}
      </div>
    </React.Fragment>
  );
};
export default Search;
