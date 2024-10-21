"use client";

export default function download() {
  const link = document.createElement("a");
  link.href = "/assets/download/resume.pdf";
  link.download = "resume.pdf";
  link.click();
}
