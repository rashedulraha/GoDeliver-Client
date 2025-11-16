import React from "react";
import Marquee from "react-fast-marquee";

import amazon from "../../../assets/brands/amazon.png";

import casio from "../../../assets/brands/casio.png";
import moonstar from "../../../assets/brands/moonstar.png";
import randstad from "../../../assets/brands/randstad.png";
import star from "../../../assets/brands/star.png";
import start_people from "../../../assets/brands/start_people.png";
import Container from "../../Responsive/Container";

const Marque = () => {
  return (
    <div className="my-10">
      <h2 className="font-bold text-3xl text-center pb-10">
        We've helped thousands of sales teams
      </h2>
      <Container>
        <Marquee>
          <div className=" flex items-center gap-10">
            <div>
              <img src={moonstar} alt="amazon" />
            </div>
            <div>
              <img src={randstad} alt="amazon" />
            </div>
            <div>
              <img src={star} alt="amazon" />
            </div>
            <div>
              <img src={start_people} alt="amazon" />
            </div>
            <div>
              <img src={moonstar} alt="amazon" />
            </div>
            <div>
              <img src={randstad} alt="amazon" />
            </div>
            <div>
              <img src={star} alt="amazon" />
            </div>
          </div>
        </Marquee>
      </Container>
    </div>
  );
};

export default Marque;
