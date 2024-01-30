import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Recording from "./Recording";

jest.mock("axios");

describe("Recording component", () => {
  test("renders headings", () => {
    render(<Recording />);
    const mainHeading = screen.getByRole("heading", { name: /record your video/i });
    expect(mainHeading).toBeInTheDocument();
  });

  test("renders buttons", () => {
    render(<Recording />);
    const startRecordingButton = screen.getByRole("button", { name: /start capture/i });
    expect(startRecordingButton).toBeInTheDocument();
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

  

 
});
