'use client';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { ReactNode, Children } from "react";

interface SlideComponentProps {
  children: ReactNode;
  itemsLength: number;
}

const SlideComponent = ({ children, itemsLength }: SlideComponentProps) => {
  let slideCount = itemsLength > 4 ? 4 : itemsLength;

  return (
    <div className="d-flex flex-column align-items-center py-5">
      <Splide
        options={{
          type: "loop",
          perPage: slideCount,
          perMove: 1,
          width: slideCount * 400,
          pagination: false,
          arrows: itemsLength > 4,
          drag: itemsLength > 4,
          breakpoints: {
            1600: {
              perPage: slideCount >= 2 ? 2 : 1,
              arrows: itemsLength > 2,
              drag: itemsLength > 2,
              width: slideCount >= 2 ? 800 : 400,
            },
            800: {
              perPage: 1,
              arrows: itemsLength > 1,
              drag: itemsLength > 1,
              width: 400,
            },
            400: {
              perPage: 1,
              width: 230,
            },
          },
        }}
      >
        {Children.map(children, (child) => (
          <SplideSlide>{child}</SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default SlideComponent;
