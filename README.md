# Persian OCR

**A web app for extracting, summarizing, and translating Persian text from images using Tesseract.js and Gemini AI.**

> [!NOTE]
> This app uses [Tesseract.js](https://github.com/naptha/tesseract.js) to convert images to text
>
> Also use Gemini Api to summarize and translate

## Abstract

OCR is a revolutionary technology that helps preserve culture. It is software that recognizes text from images. In other words, it converts images to text. This is useful for extracting valuable works from historic poets and writers.

## Keywords

Persian OCR, summarizing, translating, artificial intelligence, OCR, NLP, LLM

## Introduction

Let's start by cloning this repo & run project with:

```bash
git clone https://github.com/AliMohammad-Esmaeeli/Persian-OCR.git
```

```bash
cd Persian-OCR
```

```bash
npm install
```
Finally:
```bash
npm run dev
```

Dependencies that we need and use:

- Axios
- Tesseract.js
- Zustand
- HeroUI
- HatScripts/circle-flags
- Hero icons

## Discussion

### Hidden Input

There is a hidden input with `ref` attribute that, when called, opens the file input:

```tsx
    <input
        accept=".png, .jpg" type="file" name="" id=""
        hidden ref={inputFileRef}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
            ...
        }}
    />
```

### User-Friendly Drag & Drop Box

A drag-and-drop box is located in the middle of the page:

![Drag & Drop component](./screenshots/Drag%20&%20Drop%20component%20screenshot.png "User-friendly drag-and-drop area")

- `onDragOver`: This attribute triggers when a file is dragged over the element, allowing visual feedback (e.g., "Drop the file").

- `onDragLeave`: This attribute resets the component when the user cancels the drag operation.

- `onDrop`: This attribute processes the file when the user drops it successfully.

```tsx
    <div
        className=" ... "
        onClick={(e) => { ... }}
        onDragOver={(e) => { ... }}
        onDragLeave={(e) => { ... }}
        onDrop={(e) => { ... }}
    >
        ...
    </div>
```

### Handling Files (Input & Drop)

Both the file input and `onDrop` provide a file, which you pass to the OCR function:

```tsx
    // onDrop
    onDrop={(e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;

        if (files.length > 0) {
            const file = files[0];
            OCR(file)

            const fileURL = URL.createObjectURL(file); // For displaying the image
            setInputImage(fileURL)
            setPage("ShowImage")
        }
    }}

    // Input onChange
     onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            const file = files[0];
            OCR(file);

            const fileURL = URL.createObjectURL(file); // For displaying the image
            setInputImage(fileURL)
            setPage("ShowImage");
        }
    }}
```

Drag and drop components also have three different actions and for each one it shows a different page. We create every page and then in the page.tsx component show them with conditions.

```text
src/
├── components/
│ ├── input_components/
│   └── page/
│     ├── OnDragOver.tsx
│     ├── ShowImage.tsx
│     ├── Upload_section.tsx
│     └── page.tsx
```

### What is the OCR Function?

![recognized image](./screenshots/recognized%20image%20screenshot.png)

> [!NOTE]
> We use [Tesseract.js](https://github.com/naptha/tesseract.js), a powerful library that supports **100+ languages** and works with many programming languages.

```tsx
const OCR = async (Image: File) => {
  const worker = await createWorker("fas");
  const result = await worker.recognize(Image);
  setText(result.data.text);
  await worker.terminate();
};
```

It returns the recognized text, which you can use anywhere.

To display the uploaded image, use:
`URL.createObjectURL(file);`

### Summarize and Translate

![summerized text](./screenshots/summerized%20text.png)

> [!NOTE]
> We use Gemini api for Summarize and translate.
>
> Axios is the best api fetcher.

```tsx
const response = await axios.post(BACKEND_URL, {
  contents: [
    {
      parts: [
        {
          text: `Summarize the following text in persian: ${text}`,
          // For translation, use this prompt
          //  `Translate the following text in ${selectedLanguage}: ${text}`
        },
      ],
    },
  ],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 200,
  },
});
```

You need a Gemini API key so you have to defined it in the .env file. Then you can call it by this code:

```.env
GEMINI_API_KEY=your_api_key_here
```

```tsx
const BACKEND_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${
  import.meta.env.GEMINI_API_KEY
}`;
```

### Change Language

![change language button](./screenshots/change%20language%20button%20screenshot.png)

It uses zustand for make project multi-language. Therefore you can call the texts once and change it by zustand. In addition i use [this repositorie](https://github.com/HatScripts/circle-flags) for pretty circle flags.

To make site multi-language you have to consider text direction, i mean right to left or left to right of the direction. So use this feature of tailwindcss for this issue:

```tsx
<div className="flex-end rtl:flex-start ...">...</div>
```

At the end you can add lang and dir attributes of html tag with this code:

```tsx
useEffect(() => {
  const html = document.documentElement;
  const currentLanguage = languages.find((l) => l.code === language);

  if (currentLanguage) {
    html.lang = language;
    html.dir = currentLanguage.dir;
  }
}, [language]);
```

### Sharing & Copying Text

Finally you can use the navigator API to interact with the user's device:

![share button](./screenshots/share%20button%20screenshot.png)

```ts
navigator.share(...) // share text

navigator.clipboard.writeText(...) // copy text
```

## Conclusion

This Persian OCR tool makes it easy to extract, translate, and summarize text from images. With support for multiple languages and a user-friendly interface, it's ideal for preserving documents, researching historical texts, or processing foreign content.

Try it out and let us know what you think! Contributions and feedback are always welcome.

## References

- https://github.com/naptha/tesseract.js
