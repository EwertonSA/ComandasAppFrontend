import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { ReactElement } from "react";

interface SlideComponentProps<T> {
  items: T[];
  renderItem: (item: T) => ReactElement;
}

const SlideComponent = <T,>({ items, renderItem }: SlideComponentProps<T>) => {
  let slideCount = 0;

  if (items?.length > 4) {
    slideCount = 4;
  } else if (items) {
    slideCount = items.length;
  }

  return (
    <div className="d-flex flex-column align-items-center py-5">
      <Splide
        options={{
          type: "loop",
          perPage: slideCount,
          perMove: 1,
          width: slideCount * 300,
          pagination: false,
          arrows: items?.length > 4,
          drag: items?.length > 4,
          breakpoints: {
            1200: {
              perPage: slideCount >= 2 ? 2 : 1,
              arrows: items?.length > 2,
              drag: items?.length > 2,
              width: slideCount >= 2 ? 600 : 300,
            },
            600: {
              perPage: 1,
              arrows: items?.length > 1,
              drag: items?.length > 1,
              width: 300,
            },
            300: {
              perPage: 1,
              width: 230,
            },
          },
        }}
      >
        {Array.isArray(items)&&items?.map((item, index) => (
          <SplideSlide key={index}>{renderItem(item)}</SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default SlideComponent;
