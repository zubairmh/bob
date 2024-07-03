"use client";
import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import Image from "next/image";
export default function Home() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [boxStore, setboxStore] = useState([]);
  const [mode, setMode] = useState(false);
  const drawLayer = useRef(null);

  const handleMouseDown = (event) => {
    if (!mode) return;
    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    setIsDrawing(true);
    setStartX(offsetX);
    setStartY(offsetY);
    setEndX(offsetX);
    setEndY(offsetY);
  };

  const handleMouseMove = (event) => {
    if (!mode) return;
    if (!isDrawing) return;
    const cv = event.target;
    const rect = cv.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    setEndX(offsetX);
    setEndY(offsetY);

    // Draw the rectangle on the canvas
    const canvas = drawLayer.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.beginPath();
    ctx.rect(startX, startY, endX - startX, endY - startY);
    ctx.stroke();
  };

  const handleMouseUp = () => {
    if (!mode) return;
    setIsDrawing(false);
    const canvasDraw = drawLayer.current;
    const ctxDraw = canvasDraw.getContext("2d");
    ctxDraw.clearRect(0, 0, canvasDraw.width, canvasDraw.height);

    // // Reset the state
    // setStartX(0);
    // setStartY(0);
    // setEndX(0);
    // setEndY(0);

    // Prompt the user for text input
    const userInput = prompt("Enter prompt for :");
    if (userInput) {
      // Clear Drawing Canvas

      // Draw the rectangle on the main canvas
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.rect(startX, startY, endX - startX, endY - startY);
      ctx.stroke();
      // Calculate the center position of the rectangle
      const centerX = (startX + endX) / 2;
      const centerY = (startY + endY) / 2;

      // Draw the user input text inside the rectangle
      const text = userInput.trim();
      const maxLength = Math.max(endX - startX, endY - startY);
      const fontSize = Math.floor(maxLength / text.length);
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(userInput, centerX, centerY);
    }

    setMode(false);
  };

  return (
    <div className="flex flex-row min-h-screen p-10 gap-5">
      <div style={{ position: "relative", width: 600, height: 600 }}>
        <Image
          style={{
            width: 600,
            height: 600,
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 0,
          }}
          width={600}
          height={600}
          src="/bob.png"
        />
        <canvas
          ref={canvasRef}
          id="layer1"
          width={600}
          height={600}
          style={{ position: "absolute", left: 0, top: 0, zIndex: 1 }}
        ></canvas>
        <canvas
          ref={drawLayer}
          id="layer2"
          width={600}
          height={600}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          style={{ position: "absolute", left: 0, top: 0, zIndex: 2 }}
        ></canvas>
      </div>
      <div className="action-bar flex flex-col gap-4">
        <Button
          onClick={() => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
          }}
        >
          Clear
        </Button>
        <Button
          style={{ backgroundColor: mode == "text" ? "green" : "black" }}
          onClick={() => {
            if (mode == "text") {
              setMode(false);
            } else {
              setMode("text");
            }
          }}
        >
          {mode == "text" ? "Drawing Text boundary" : "Add Text Prompt"}
        </Button>
        <Button
          style={{ backgroundColor: mode == "image" ? "green" : "black" }}
          onClick={() => {
            if (mode == "image") {
              setMode(false);
            } else {
              setMode("image");
            }
          }}
        >
          {mode == "image" ? "Drawing Image boundary" : "Add Image Prompt"}
        </Button>
      </div>
    </div>
  );
}
