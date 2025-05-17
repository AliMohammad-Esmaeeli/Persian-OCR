import { createWorker } from "tesseract.js";

export default async function OCR(image: any, setText: (text: string) => void) {
  const worker = await createWorker("fas");
  const result = await worker.recognize(image);
  setText(result.data.text);
  await worker.terminate();
}
