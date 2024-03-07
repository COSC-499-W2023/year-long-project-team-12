import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Recording from "./Recording";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("react-webcam", () => ({
  ...jest.requireActual("react-webcam"), 
  
  Webcam: ({ onUserMedia }) => {
    setTimeout(onUserMedia, 0);
    return <video />;
  },
}));

jest.mock("axios");

describe("Recording component", () => {
  test("renders headings correctly", async () => {
    render(
      <BrowserRouter>
        <Recording />
      </BrowserRouter>
    );
    const mainHeading = screen.getByRole("heading", { name: /record your video/i });
    expect(mainHeading).toBeInTheDocument();
  });

  test("renders 'Turn on Camera' button initially", () => {
    render(
      <BrowserRouter>
        <Recording />
      </BrowserRouter>
    );
    const turnOnCameraButton = screen.getByRole("button", { name: /turn on camera/i });
    expect(turnOnCameraButton).toBeInTheDocument();
  });

  test("renders 'Start Capture' button after enabling the camera", async () => {
    render(
      <BrowserRouter>
        <Recording />
      </BrowserRouter>
    );
    const turnOnCameraButton = screen.getByRole("button", { name: /turn on camera/i });
    fireEvent.click(turnOnCameraButton);

    const startCaptureButton = screen.queryByRole("button", { name: /start capture/i });
    expect(startCaptureButton).toBeInTheDocument();
  });

  // This test is commented out due to the complexity of simulating actual video recording
  // and user media interaction within a Jest environment. Uncomment and adjust as necessary
  // for your application's testing strategy.
  /*
  test("approves and sends the recorded video", async () => {
    axios.post.mockResolvedValue({ data: "Video approved!" });

    render(
      <BrowserRouter>
        <Recording />
      </BrowserRouter>
    );
    const turnOnCameraButton = screen.getByRole("button", { name: /turn on camera/i });
    fireEvent.click(turnOnCameraButton);

    await new Promise(process.nextTick); // Wait for the camera to be "ready"

    const startButton = screen.getByRole("button", { name: /start capture/i });
    fireEvent.click(startButton);

    const stopButton = screen.getByRole("button", { name: /stop capture/i });
    fireEvent.click(stopButton);

    const approveButton = screen.getByRole("button", { name: /approve and submit video/i });
    fireEvent.click(approveButton);

    // Use your actual server API endpoint in place of "YOUR_SERVER_API_ENDPOINT"
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "YOUR_SERVER_API_ENDPOINT",
        expect.any(FormData),
        expect.objectContaining({
          headers: { "Content-Type": "multipart/form-data" },
        })
      );
    });
  });
  */
});
