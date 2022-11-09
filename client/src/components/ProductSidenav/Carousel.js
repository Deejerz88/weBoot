import { useEffect, useState } from "react";
import { Carousel, Image } from "react-bootstrap";
import $ from "jquery";

function ImageCarousel({ images, show }) {
  const [indicators, setIndicators] = useState([]);
  const [numImages, setNumImages] = useState(0);
  const [carouselInt, setCarouselInt] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    return () => {
      clearInterval(carouselInt);
      setCarouselInt(null);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("activeIndex", activeIndex);
  }, [activeIndex]);

  useEffect(() => {
    if (!show || !numImages) return;
    setCarouselInt(
      setInterval(() => {
        if (!show) return clearInterval(carouselInt);
        console.log("carouselInt", activeIndex, numImages);
        setActiveIndex((prev) => (prev >= numImages - 1 ? 0 : prev + 1));
      }, 4000)
    );
    $(".carousel-control-next-icon").on("click", () => {
      setActiveIndex((prev) => (prev >= numImages - 1 ? 0 : prev + 1));
    });
    $(".carousel-control-prev-icon").on("click", () => {
      setActiveIndex((prev) => (prev <= 0 ? numImages - 1 : prev - 1));
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numImages]);

  useEffect(() => {
    console.log("show", show);
    setIndicators([]);
    setNumImages(() => 0);
    setActiveIndex(() => 0);
    clearInterval(carouselInt);
    setCarouselInt(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    console.log("ImageCarousel images", images, images.length);
    console.log("carouselInt", carouselInt);
    clearInterval(carouselInt);
    if (!images.length) {
      console.log("no images");
      return;
    }
    setNumImages(images.length);
    $(".carousel-indicators").remove();
    const indicatorsEl = $('<div class="carousel-indicators"></div>');
    $(".carousel").append(indicatorsEl);
    let slide = 0;
    let newIndicators = [];
    for (let i = 0; i < images.length; i++) {
      slide++;
      const image = `<img type="button"  data-bs-target arial-label="Slide ${slide}" src="${images[i]}" id="indicator-${slide}" key="indicator-${slide}"/>`;
      indicatorsEl.append($(image)[0]);
      newIndicators.push(image);
    }
    setIndicators(newIndicators);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  useEffect(() => {
    console.log("ImageCarousel indicators", indicators);
    if (indicators.length === 0) return;
    const activateImage = (e) => {
      const image = Number(e.target.id.split("-")[1]) - 1;
      console.log("activateImage", image);
      setActiveIndex(image);
    };
    const buttons = $(".carousel-indicators").children();
    buttons.each((i, button) => {
      $(button).on("click", activateImage);
    });
  }, [indicators]);

  return (
    <Carousel
      fade="true"
      indicators={false}
      activeIndex={activeIndex}
      interval={null}
    >
      {images?.map((image, i) => (
        <Carousel.Item id={`item-${i + 1}`} key={`item-${i + 1}`}>
          <Image
            src={image}
            id={`image-${i + 1}`}
            className="d-block mx-auto my-3 rounded w-25"
            alt={`image-${i + 1}`}
            key={`image-${i + 1}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export { ImageCarousel as Carousel };
