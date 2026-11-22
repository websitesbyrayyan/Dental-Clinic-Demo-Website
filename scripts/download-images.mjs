import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = resolve(projectRoot, "public/images");
const allowMissing = process.argv.includes("--allow-missing");

const images = [
  {
    file: "hero-main.jpg",
    photoId: "5355890",
    photographer: "Tima Miroshnichenko",
    page: "https://www.pexels.com/photo/patient-having-an-appointment-with-a-dentist-5355890/",
    width: 1800,
  },
  {
    file: "hero-secondary.jpg",
    photoId: "7422520",
    photographer: "Emeric Kalil",
    page: "https://www.pexels.com/photo/interior-of-a-dentist-office-7422520/",
    width: 1500,
  },
  {
    file: "about.jpg",
    photoId: "6809645",
    photographer: "Pavel Danilyuk",
    page: "https://www.pexels.com/photo/a-dental-clinic-reception-desk-6809645/",
    width: 1500,
  },
  {
    file: "team-1.jpg",
    photoId: "37458047",
    photographer: "Emily Gaibor",
    page: "https://www.pexels.com/photo/professional-dentist-in-modern-clinic-setting-37458047/",
    width: 1100,
  },
  {
    file: "team-2.jpg",
    photoId: "37458354",
    photographer: "Emily Gaibor",
    page: "https://www.pexels.com/photo/female-dentist-in-modern-dental-clinic-37458354/",
    width: 1100,
  },
  {
    file: "team-3.jpg",
    photoId: "31043310",
    photographer: "Manuel Toledo",
    page: "https://www.pexels.com/photo/confident-female-dentist-in-professional-attire-31043310/",
    width: 1100,
  },
  {
    file: "tour-reception.jpg",
    photoId: "6809664",
    photographer: "Pavel Danilyuk",
    page: "https://www.pexels.com/photo/patient-talking-to-a-receptionist-at-a-dental-clinic-6809664/",
    width: 1500,
  },
  {
    file: "tour-consultation.jpg",
    photoId: "5622234",
    photographer: "Gustavo Fring",
    page: "https://www.pexels.com/photo/dentist-and-patient-5622234/",
    width: 1500,
  },
  {
    file: "tour-treatment.jpg",
    photoId: "6812480",
    photographer: "Pavel Danilyuk",
    page: "https://www.pexels.com/photo/dental-chair-and-equipment-in-a-clinic-6812480/",
    width: 1500,
  },
  {
    file: "tour-sterilisation.jpg",
    photoId: "6812550",
    photographer: "Pavel Danilyuk",
    page: "https://www.pexels.com/photo/sterile-dental-equipment-wrapped-in-plastic-6812550/",
    width: 1500,
  },
];

await mkdir(outputDirectory, { recursive: true });

let downloaded = 0;
let skipped = 0;
const failures = [];

for (const image of images) {
  const destination = resolve(outputDirectory, image.file);

  try {
    const existing = await stat(destination);
    if (existing.size > 20_000) {
      const header = await readFile(destination).then((bytes) => bytes.subarray(0, 3));
      const isJpeg =
        header[0] === 0xff &&
        header[1] === 0xd8 &&
        header[2] === 0xff;

      if (isJpeg) {
        console.log(`Already present: ${image.file}`);
        skipped += 1;
        continue;
      }

      console.warn(`Replacing invalid image asset: ${image.file}`);
      await rm(destination, { force: true });
    }
  } catch {
    // The asset does not exist yet; download it below.
  }

  const url = new URL(
    `https://images.pexels.com/photos/${image.photoId}/pexels-photo-${image.photoId}.jpeg`,
  );
  url.searchParams.set("auto", "compress");
  url.searchParams.set("cs", "tinysrgb");
  url.searchParams.set("w", String(image.width));
  url.searchParams.set("q", "84");
  url.searchParams.set("fm", "jpg");

  try {
    console.log(`Downloading ${image.file} (${image.photographer})...`);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Sagewood-Dental-Website-Asset-Downloader/1.0",
        Accept: "image/jpeg,image/*;q=0.9,*/*;q=0.8",
      },
      signal: AbortSignal.timeout(45_000),
    });

    if (!response.ok) {
      throw new Error(`Pexels returned HTTP ${response.status}.`);
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("image/")) {
      throw new Error(`Expected an image, received ${contentType || "an unknown content type"}.`);
    }

    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length < 20_000 || bytes[0] !== 0xff || bytes[1] !== 0xd8 || bytes[2] !== 0xff) {
      throw new Error(`The downloaded file is not a valid JPEG image (${bytes.length} bytes).`);
    }

    await writeFile(destination, bytes);
    downloaded += 1;
    console.log(`Saved ${image.file} (${(bytes.length / 1024).toFixed(0)} KB)`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${image.file}: ${message}`);
    console.error(`Failed ${image.file}: ${message}`);
  }
}

console.log(`\nImage download summary: ${downloaded} downloaded, ${skipped} already present, ${failures.length} failed.`);

if (failures.length > 0) {
  console.error("\nSome images could not be downloaded. Check your internet connection and run npm.cmd run images:download again.");

  if (!allowMissing) {
    process.exitCode = 1;
  } else {
    console.warn("\nContinuing the development server. Missing images will use the built-in visual fallback.");
  }
}
