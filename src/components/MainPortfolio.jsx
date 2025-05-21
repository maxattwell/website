// MainPortfolio.jsx
import { useRef } from 'react';
import HeroSection from './HeroSection';
import ProjectSection from './ProjectSection';
import ProjectsSection from './ProjectsSection';
import LoadingScreen from './LoadingScreen'
import SlideMenu from './SlideMenu'


import VueIcon from './icons/VueIcon';
import TailwindIcon from './icons/TailwindIcon';
import TypeScriptIcon from './icons/TypeScriptIcon';
import ReactIcon from './icons/ReactIcon';

export default function MainPortfolio() {
  // Refs for HeroSection
  const heroRef = useRef(null);
  const subHeroRef = useRef(null);
  const svgRef = useRef(null);
  const backgroundRef = useRef(null);

  // Ref for ProjectsSection
  const projectsRef = useRef(null);
  const projectsMouseRef = useRef(null);


  // Refs for BexfitSection
  const bexfitRef = useRef(null);
  const bexfitTitleRef = useRef(null);
  const bexfitImageRef = useRef(null);
  const bexfitParagraphRef = useRef(null);
  // Refs for Bexfit2Section
  const bexfit2Ref = useRef(null);
  const bexfit2TitleRef = useRef(null);
  const bexfit2ImageRef = useRef(null);
  const bexfit2ParagraphRef = useRef(null);

  const heroRefs = {
    heroRef,
    subHeroRef,
    svgRef,
    backgroundRef
  };

  const projectsRefs = {
    projectsRef,
    projectsMouseRef
  }

  const bexfitRefs = {
    projectRef: bexfitRef,
    titleRef: bexfitTitleRef,
    imageRef: bexfitImageRef,
    paragraphRef: bexfitParagraphRef
  };

  const bexfit2Refs = {
    projectRef: bexfit2Ref,
    titleRef: bexfit2TitleRef,
    imageRef: bexfit2ImageRef,
    paragraphRef: bexfit2ParagraphRef
  };

  const bexfit2Data = {
      title: {
        icon: "/bexfit-icon.webp",
        alt: "BexFit App",
        link: "https://www.bexfit.co"
      },
      techBadges: [
        { icon: <ReactIcon />, name: "React", color: "#42b883" },
      ],
      projectImage: {
        src: "/iphones_image.webp",
        alt: "BexFit Mobile App"
      },
      description: "BEXFIT is a custom platform built to replace TrueCoach for an online personal training business. It includes a marketing website to showcase services, a web app for trainers to create programs and manage clients, and a progressive web app for clients to view and complete their personalized training sessions."
    };

  const bexfitData = {
      title: {
        icon: "/bexfit-icon.webp",
        alt: "BexFit App",
        link: "https://www.bexfit.co"
      },
      techBadges: [
        { icon: <VueIcon />, name: "Vue", color: "#42b883" },
        { icon: <TailwindIcon />, name: "Tailwind", color: "#38bdf8" },
        { icon: <TypeScriptIcon />, name: "TypeScript", color: "#007acc" },
      ],
      projectImage: {
        src: "/iphones_image.webp",
        alt: "BexFit Mobile App"
      },
      description: "BEXFIT is a custom platform built to replace TrueCoach for an online personal training business. It includes a marketing website to showcase services, a web app for trainers to create programs and manage clients, and a progressive web app for clients to view and complete their personalized training sessions."
    };

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleMenuItemClick = (item) => {
    // Handle navigation
    if (item.href) {
      // Smooth scroll to section
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="h-[9000px] overflow-x-hidden bg-[#282828]">
      <LoadingScreen />
      <HeroSection refs={heroRefs} />
      <ProjectsSection refs={projectsRefs} />
      <ProjectSection
        refs={bexfitRefs}
        slidesFromLeft={true}
        scrollStart={2200}
        {...bexfitData}
      />
      <ProjectSection
        refs={bexfit2Refs}
        slidesFromLeft={false}
        scrollStart={4300}
        {...bexfit2Data}
      />
      <SlideMenu
        menuItems={menuItems}
        onItemClick={handleMenuItemClick}
        progressBarColor="#fbf1c7"
        menuBgColor="#1d2021"
        buttonColor="#fbf1c7"
      />
    </div>
  );
}
