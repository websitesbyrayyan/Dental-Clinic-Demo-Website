import { useState } from "react";

import { SampleBanner } from "./components/sections/SampleBanner";
import { Navbar } from "./components/sections/Navbar";
import { ScrollProgress } from "./components/sections/ScrollProgress";

import { Hero } from "./components/sections/Hero";
import { Intro } from "./components/sections/Intro";
import { Services } from "./components/sections/Services";
import { WhyChooseUs } from "./components/sections/WhyChooseUs";
import { Process } from "./components/sections/Process";
import { Team } from "./components/sections/Team";

import { VirtualTour } from "./components/sections/VirtualTour";
import { Testimonials } from "./components/sections/Testimonials";
import { Blog } from "./components/sections/Blog";
import { FAQ } from "./components/sections/FAQ";

import { Booking } from "./components/sections/Booking";
import { Footer } from "./components/sections/Footer";
import { StickyActions } from "./components/sections/StickyActions";
import { SchemaOrg } from "./components/sections/SchemaOrg";

export default function App() {
  const [selectedTreatment, setSelectedTreatment] =
    useState("");

  return (
    <>
      {/* First focusable element */}

      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      <SampleBanner />

      <Navbar />

      <ScrollProgress />

      <main
        id="main-content"
        tabIndex={-1}
      >
        <Hero />

        <Intro />

        <Services
          onSelectTreatment={setSelectedTreatment}
        />

        <WhyChooseUs />

        <Process />

        <Team />

        <VirtualTour />

        <Testimonials />

        <Blog />

        <FAQ />

        <Booking
          selectedTreatment={selectedTreatment}
          onTreatmentChange={setSelectedTreatment}
        />
      </main>

      <Footer />

      <StickyActions />

      <SchemaOrg />
    </>
  );
}