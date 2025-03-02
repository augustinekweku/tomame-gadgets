"use client";
import React from "react";
import Slider from "react-slick";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const SLIDE_IMAGES = [
  "/images/slider-3.jpeg",
  "/images/slider-4.jpeg",
  "/images/slider-1.jpeg",
  "/images/slider-5.jpeg",
];

export default function HomePageSlider() {
  const route = useRouter();
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      {SLIDE_IMAGES.map((image) => (
        <div key={image} className="">
          <div
            className="h-[300px] lg:h-[400px] relative"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backdropFilter: "brightness(0.5)",
            }}
          >
            <div className="absolute bottom-10 left-4 w-4/6 lg:w-2/6">
              <div className="slider-backdrop">
                <h2 className="text-white font-bold text-lg lg:text-2xl mb-3">
                  Shop the Latest Phones, Laptops & Gaming Gear Today!
                </h2>
                <Button
                  onClick={() => {
                    route.push("#shop");
                  }}
                  variant="default"
                  className="text-white font-bold"
                >
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
