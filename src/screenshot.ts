import puppeteer from "puppeteer";
import { PNG } from "pngjs";
import z from "zod";

const zParams = z.strictObject({
  url: z.url(),
  dimensions: z.object({
    width: z.number().min(0).max(5000),
    height: z.number().min(0).max(5000),
  }),
  color: z.boolean().default(true),
});

type Params = z.infer<typeof zParams>;

export async function screenshot(
  params: Params,
  headers?: Record<string, string | string[] | undefined>
): Promise<Buffer> {
  const { url, dimensions, color } = zParams.parse(params);

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  // page.on("console", (msg) => {
  //   console.log("PAGE LOG:", msg.type(), msg.text());
  // });

  await page.setExtraHTTPHeaders(passHeaders(headers));

  await page.setViewport({
    width: dimensions.width,
    height: dimensions.height,
  });

  await page.goto(url, { waitUntil: "networkidle0" });

  const screenshotBuffer: Buffer = PNG.sync.write(
    PNG.sync.read((await page.screenshot()) as Buffer),
    color ? {} : { colorType: 0 }
  );

  await browser.close();

  return screenshotBuffer;
}

// Pass only headers that start with "x-"
function passHeaders(
  headers?: Record<string, string | string[] | undefined>
): Record<string, string> {
  const normalized: Record<string, string> = {};

  for (const [key, value] of Object.entries(headers || {})) {
    if (typeof value === "string" && key.toLowerCase().startsWith("x-")) {
      normalized[key] = value;
    }
  }

  return normalized;
}
