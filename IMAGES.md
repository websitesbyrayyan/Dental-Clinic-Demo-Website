# Image assets and credits

The website is configured to use ten photographs selected from Pexels. Run the downloader once on a computer with internet access to place the photographs in `public/images/`; the application then references local files rather than hotlinked images.

## Download the local assets

From the project root, run:

```powershell
npm.cmd run images:download
```

The downloader uses Node's built-in `fetch` and writes these files:

- `public/images/hero-main.jpg`
- `public/images/hero-secondary.jpg`
- `public/images/about.jpg`
- `public/images/team-1.jpg`
- `public/images/team-2.jpg`
- `public/images/team-3.jpg`
- `public/images/tour-reception.jpg`
- `public/images/tour-consultation.jpg`
- `public/images/tour-treatment.jpg`
- `public/images/tour-sterilisation.jpg`

The development command attempts this automatically and continues with a visual fallback if the network is unavailable. The production build requires all ten assets to download successfully. No extra npm package is required.

## Pexels source photographs

| Local file | Photographer | Pexels source |
|---|---|---|
| `hero-main.jpg` | Tima Miroshnichenko | https://www.pexels.com/photo/patient-having-an-appointment-with-a-dentist-5355890/ |
| `hero-secondary.jpg` | Emeric Kalil | https://www.pexels.com/photo/interior-of-a-dentist-office-7422520/ |
| `about.jpg` | Pavel Danilyuk | https://www.pexels.com/photo/a-dental-clinic-reception-desk-6809645/ |
| `team-1.jpg` | Emily Gaibor | https://www.pexels.com/photo/professional-dentist-in-modern-clinic-setting-37458047/ |
| `team-2.jpg` | Emily Gaibor | https://www.pexels.com/photo/female-dentist-in-modern-dental-clinic-37458354/ |
| `team-3.jpg` | Manuel Toledo | https://www.pexels.com/photo/confident-female-dentist-in-professional-attire-31043310/ |
| `tour-reception.jpg` | Pavel Danilyuk | https://www.pexels.com/photo/patient-talking-to-a-receptionist-at-a-dental-clinic-6809664/ |
| `tour-consultation.jpg` | Gustavo Fring | https://www.pexels.com/photo/dentist-and-patient-5622234/ |
| `tour-treatment.jpg` | Pavel Danilyuk | https://www.pexels.com/photo/dental-chair-and-equipment-in-a-clinic-6812480/ |
| `tour-sterilisation.jpg` | Pavel Danilyuk | https://www.pexels.com/photo/sterile-dental-equipment-wrapped-in-plastic-6812550/ |

## Usage notes

Pexels states that its photos may be used for free in personal and commercial projects, including websites and templates. Attribution is not required, though photographer credit is appreciated. Do not imply that a depicted person endorses the clinic or its services, and do not redistribute the photographs as a standalone stock-photo collection. See the [Pexels licence](https://www.pexels.com/license/) and [commercial-use guidance](https://help.pexels.com/hc/en-us/articles/360042295214-Can-I-use-the-photos-and-videos-for-a-commercial-project).

The dentist portraits are illustrative stock photography, not confirmed Sagewood Dental Studio team members. Replace these portraits and the sample names/biographies with approved clinic material before presenting the site as a real practice. The photos are bundled as local site assets after download; they are not requested from Pexels by visitors to the live website.
