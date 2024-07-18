import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";


it("renders Carousel without crashing", function() {
  render(<Carousel 
    photos={TEST_IMAGES}
    title="images for testing"
    />);
});


it("matches Carousel snapshot", function() {
  const { asFragment } = render(<Carousel 
    photos={TEST_IMAGES}
    title="images for testing"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});


it("works when you click the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  
  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  const leftArrow = container.querySelector(".bi-arrow-left-circle");

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // click right/forward
  fireEvent.click(rightArrow);
  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // click right/forward again
  fireEvent.click(rightArrow);
  // expect the third image to show, but not the first or second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();

  // move backward in the carousel
  fireEvent.click(leftArrow);
    // expect the second image to show, but not the first or third
    expect(
      container.querySelector('img[alt="testing image 1"]')
    ).not.toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 2"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('img[alt="testing image 3"]')
    ).not.toBeInTheDocument();
})
