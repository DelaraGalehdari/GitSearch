import React from "react";
import "../css/style.css";

const Display = ({ result, type }) => {
  return (
    <div>
      {type === result.type ? (
        <div>
          <div className="container containerStyle">
            <div className="row rowStyle">
              <div className="col-sm-1.5 colStyle">
                {" "}
                <img
                  src={result.avatar_url}
                  alt="avatar"
                  className="imgHeight col-sm"
                />
              </div>
              <div className="col-sm colStyle">{result.login}</div>
              <div className="col-sm colStyle">{result.type}</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Display;
