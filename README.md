# WhereIsMyBae: Discover Your Dating Red Flags

This Next.js application is a fun and engaging quiz designed to identify a user's dating red flags using a humorous approach tailored to a college audience. The quiz generates personalized insights using OpenAI's GPT-4 model.

## Features

*   Interactive quiz with multiple-choice questions.
*   Personalized red flag analysis based on user responses.
*   Humorous and relatable red flag descriptions using college slang.
*   Customizable themes for results presentation.
*   Downloadable results image for sharing.
*   Responsive design for various screen sizes.
*   Integration with OpenAI's GPT-4 API for advanced text generation.
*   Google Analytics integration for tracking usage.

## Usage

1.  Begin the quiz by answering the questions.
2.  Select options that best reflect your dating behaviors.
3.  Upon completion, you'll receive a personalized report detailing your top red flags.
4.  Download the report as an image to share with friends.


## Installation

1.  Clone the repository: `git clone <repository_url>`
2.  Navigate to the project directory: `cd whereismybae`
3.  Install dependencies: `npm install` or `yarn install` or `pnpm install` or `bun install`
4.  Set your OpenAI API key as the environment variable `NEXT_PUBLIC_SECRET`.
5.  Run the development server: `npm run dev`


## Technologies Used

*   **Next.js:** A React framework for building web applications, used for the frontend and API routes.
*   **React:** A JavaScript library for building user interfaces.
*   **OpenAI API:** Used for generating personalized red flag analysis using GPT-4.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Lucide React:** An icon library used to include icons in the UI.
*   **html2canvas:** A library used to convert the results page into an image for download.
*   **TypeScript:**  Provides static typing for improved code maintainability and error detection.
*   **Google Analytics:** Used to track usage.


## API Documentation

The API endpoint `/api/redflags` accepts POST requests with the following JSON payload:

```json
{
  "gender": "Male", // or "Female", "Non-binary", "Prefer not to say"
  "answers": ["Answer 1", "Answer 2", "Answer 3", "Answer 4", "Answer 5", "Answer 6", "Answer 7", "Answer 8", "Answer 9", "Answer 10"]
}
```

It returns a JSON response:

```json
{
  "analysis": "{ \"red_flags\": [ { \"title\": \"Short phrase\", \"description\": \"Short sentence\" }, ... ] }"
}
```

or an error message if something goes wrong.

## Dependencies

The project dependencies are listed in `package.json`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Testing

No formal testing framework is currently implemented.  Consider adding unit and integration tests for improved code quality and robustness.


*README.md was made with [Etchr](https://etchr.dev)*