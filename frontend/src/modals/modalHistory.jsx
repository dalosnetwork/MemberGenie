import React, { useState, useEffect } from "react";
import close from "../design/assets/x.png"
import { useSelector } from "react-redux";

const ModalTrain = ({ show, onClose, data }) => {

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  
  const { league } = useSelector((state) => state.league);


  return (
    <div
      className={`modal-history ${show ? "show" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal-content">
        <div className={`modal ${show ? "show" : ""}`}>
          <div className="modal-background"></div>
          <div className="trainWrapper">
            <img className="x" onClick={()=>onClose()} src={close} alt="" />
            <div className="row text-center">
              <h1 className="title">Your Last Team</h1>
              <div className="col-12 d-flex justify-content-center scroll">
                <div className="pitchWrapper text-center">
                  <div className="pitch">
                    <div className="pitchInner d-flex justify-content-center">
                      <div className="row d-flex justify-content-center text-center" style={{ height: "100%", width: "80%" }}>
                        {Array(11)
                          .fill()
                          .map((_, index) => (
                            <div key={index} className="col-3 m-auto">
                              <div className="playerWrapper">
                                <div
                                  className="pickedCircle"
                                  /* onClick={() => setIsPicking(true)} */
                                >
                                  <div className="innerCircle"></div>
                                  <div className="number">99</div>
                                </div>
                                <div className="name">Haaland</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTrain;
