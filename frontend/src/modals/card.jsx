import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import cardimg from "../design/assets/card.png"

const Card = ({ data, big }) => {

  function truncateName(fullName) {
    const parts = fullName.split(" ");
    const firstNameInitial = parts[0].charAt(0);
    const truncatedName = `${firstNameInitial}. ${parts.slice(1).join(" ")}`;
    return truncatedName;
  }
  
  return (
    <>
       <div className={`singleCardWrapper ${big ? 'big' : ''}`}>
        <img className='image' src={cardimg} alt="" />
        <div className="number">
          {data && data.number}
        </div>
        <div className="name">
          {data && truncateName(data.name)}
        </div>
        <div className="att">
          <ul>
            <li>Age: {data && data.age}</li>
            <li>FRW: {data && data.FRW}</li>
            <li>MD: {data && data.MD}</li>
            <li>DEF: {data && data.DEF}</li>
            <li>GK: {data && data.GK}</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Card;
