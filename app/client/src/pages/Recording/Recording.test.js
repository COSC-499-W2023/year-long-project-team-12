import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Recording from "./Recording";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");

describe("Recording component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Recording />
      </BrowserRouter>
    );
  });

  test("initially renders 'Turn on Camera' button", () => {
    const turnOnCameraButton = screen.getByRole("button", { name: /turn on camera/i });
    expect(turnOnCameraButton).toBeInTheDocument();
  });

  test("renders 'Record your video' heading initially", () => {
    const mainHeading = screen.getByRole("heading", { name: /record your video/i });
    expect(mainHeading).toBeInTheDocument();
  });

  test("'Turn on Camera' button click changes to recording stage", () => {
    const turnOnCameraButton = screen.getByRole("button", { name: /turn on camera/i });
    fireEvent.click(turnOnCameraButton);

    const startCaptureButtonAfterClick = screen.queryByRole("button", { name: /start capture/i });
  });
});
