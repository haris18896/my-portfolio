# My Portfolio

## Installation

To install the application, follow these steps:

1. **Fork the repository:**

   - Go to [my-portfolio](https://github.com/haris18896/my-portfolio) and click on the "Fork" button in the top right corner of the page.
   - Clone your forked repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/my-portfolio.git
   cd my-portfolio
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

## Running the App

To run the application in development mode, use the following command:

```bash
npm run dev
```

This will start the development server at `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the root of your project and add the following environment variables:

```plaintext
NEXT_PUBLIC_SANITY_PROJECT_ID=""
NEXT_PUBLIC_SANITY_DATASET=""
NEXT_PUBLIC_GITHUB_TOKEN=""
NEXT_PUBLIC_EMAILJS_SERVICE_ID=""
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=""
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=""
```

Make sure to replace the empty strings with your actual values.
