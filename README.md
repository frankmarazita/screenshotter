# Screenshotter

A simple web service for taking screenshots of web pages.

## API

### POST /screenshot

Takes a screenshot of a given URL.

**Request Body:**

```json
{
  "url": "https://example.com",
  "dimensions": {
    "width": 1920,
    "height": 1080
  },
  "color": true
}
```

**Parameters:**

*   `url` (string, required): The URL to take a screenshot of.
*   `dimensions` (object, required): The dimensions of the screenshot.
    *   `width` (number, required): The width of the screenshot in pixels.
    *   `height` (number, required): The height of the screenshot in pixels.
*   `color` (boolean, optional, default: `true`): Whether to include color in the screenshot.

**Headers:**

Any headers starting with `x-` will be passed through to the page being screenshotted. This is useful for passing authentication tokens or other custom headers.

**Example:**

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "x-my-custom-header: my-secret-token" \
  -d '{
    "url": "https://example.com",
    "dimensions": {
      "width": 1920,
      "height": 1080
    }
  }' \
  http://localhost:3000/screenshot > screenshot.png
```

## Local Development

1.  Install dependencies:

    ```bash
    bun install
    ```

2.  Start the development server:

    ```bash
    bun dev
    ```

The server will be running at `http://localhost:3000`.