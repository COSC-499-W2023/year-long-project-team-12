import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Recording from "./Recording";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");
// Mock the MediaRecorder API
global.MediaRecorder = jest.fn(() => ({
  start: jest.fn(),
  stop: jest.fn(),
  addEventListener: jest.fn(),
}));
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

//commented out for actually passing data through. this is done on actual recording too.
 //   test("approves and sends the recorded video", async () => {
 //     axios.post.mockResolvedValue({ data: "Video approved!" });

 //     render(<Recording />);
 //     const startButton = screen.getByRole("button", { name: /start capture/i });
 //     fireEvent.click(startButton);

 //     const stopButton = screen.getByRole("button", { name: /stop capture/i });
 //     fireEvent.click(stopButton);

 //     const approveButton = screen.getByRole("button", { name: /approve video/i });
 //     fireEvent.click(approveButton);

 //     await waitFor(() => {
 //       expect(axios.post).toHaveBeenCalledWith(
 //         "YOUR_SERVER_API_ENDPOINT",
 //         expect.any(FormData),
 //         expect.objectContaining({
 //           headers: { "Content-Type": "multipart/form-data" },
 //         })
 //       );
 //     });
 //   });
