import React, { useEffect } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import LineAnimation from './LineAnimation';
import img from '../assets/FileCov.png';
import img1 from '../assets/FileCov2.png';
import img2 from '../assets/FileCov3.png';
import tooImg1 from '../assets/tool_img/img1.png';
import tooImg2 from '../assets/tool_img/img2.jpeg';
import tooImg3 from '../assets/tool_img/img3.png';
import tooImg4 from '../assets/tool_img/img4.jpeg';
import tooImg5 from '../assets/tool_img/unnamed.png';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Easy to Use",
    description: "Simply upload your VSDX files and click the convert button. You can also batch convert VSDX to PDF format.",
  },
  {
    title: "Best Quality",
    description: "We use both open source and custom software to make sure our conversions are of the highest quality.",
  },
  {
    title: "Free & Secure",
    description: "Our VSDX to PDF converter is free and works on any web browser. We guarantee file security and privacy.",
  },
];

const tools = [
  {
    img: tooImg1,
    title: "PDF TO EXCEL",
    description: "A PDF converter tool transforms various file formats into PDF, ensuring consistent formatting and compatibility across devices."
  },
  {
    img: tooImg2,
    title: "PDF CONVERTER",
    description: "Combine multiple PDF files into one document with a few clicks, preserving formatting and structure."
  },
  {
    img: tooImg3,
    title: "PDF TO IMG",
    description: "Reduce the file size of your PDFs without sacrificing quality, making them easier to share and store."
  },
  {
    img: tooImg4,
    title: "PDF TO WORD",
    description: "Add annotations, text, images, and more to your PDF files, giving you full control over the content."
  },
  {
    img: tooImg5,
    title: "Image To PDF",
    description: "Easily convert PDF files to high-quality image formats like PNG or JPG for sharing or presentations."
  }
];

const Home = () => {
  useEffect(() => {
    const isDesktop = window.innerWidth > 768;

    if (isDesktop) {
      const scroll = new LocomotiveScroll({
        el: document.querySelector('#main-container'),
        smooth: true,
      });

      ScrollTrigger.scrollerProxy('#main-container', {
        scrollTop(value) {
          return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : scroll.scrollTo.instance.scroll.y;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector('#main-container').style.transform
          ? 'transform'
          : 'fixed',
      });

      const sections = document.querySelectorAll('.color-section');
      const colors = ['#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da'];

      sections.forEach((section, index) => {
        gsap.to('body', {
          backgroundColor: colors[index % colors.length],
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
            scroller: '#main-container',
            onEnter: () => {
              gsap.to(section, { opacity: 1, duration: 1 });
            },
            onLeaveBack: () => {
              gsap.to(section, { opacity: 0.5, duration: 1 });
            },
          },
        });
      });

      // ScrollTrigger.addEventListener('refresh', () => scroll.update());
      // ScrollTrigger.refresh();

      return () => {
        if (scroll) scroll.destroy();
      };
    }
  }, []);

  return (
    <div id="main-container" data-scroll-container className="bg-white px-4 sm:px-6 lg:px-8 " >
      {/* Main Section */}
      <div className="color-section flex flex-col lg:flex-row justify-center items-center lg:space-x-8">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="hvr cursor-pointer text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 ">
            Convert All Your Files With
          </h2>
          <span className="hvr cursor-pointer text-2xl sm:text-3xl lg:text-4xl font-extrabold text-purple-600">
            One Click
          </span>
          <p className="mt-4 text-base sm:text-lg text-gray-500 ">
            Simply upload your files and click the convert button.
          </p>
          <a href="#" className="mt-8 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-red-900">
            Try it for free
          </a>
        </div>
        <div id="bimg" className="mt-8 lg:mt-0 lg:w-1/2 flex justify-center">
          <img className="w-full max-w-xs sm:max-w-sm lg:max-w-lg" src={img} alt="File conversion illustration" />
        </div>
      </div>

      {/* Line Animation */}
      <LineAnimation />

      {/* Tools Section */}
      <div className="color-section text-center my-16">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-black">Tools</h1>
      </div>

      <div className="flex justify-center items-center gap-14 flex-wrap mt-8">
        {tools.slice(0, 3).map((tool, index) => (
          <div 
            key={index} 
            className="card w-40 sm:w-48 lg:w-64 h-80 rounded-3xl bg-gray-300 shadow-lg shadow-gray-500/50 p-4 flex flex-col justify-center items-center"
          >
            <img 
              src={tool.img} 
              alt={tool.title} 
              className="h-40 w-full object-cover mb-4" 
            />
            <h2 className="text-center font-bold text-lg">{tool.title}</h2>
            <p className="mt-2 text-center text-sm sm:text-base">
              {tool.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-14 flex-wrap mt-8">
        {tools.slice(3).map((tool, index) => (
          <div 
            key={index} 
            className="card w-40 sm:w-48 lg:w-64 h-80 rounded-3xl bg-gray-300 shadow-lg shadow-gray-500/50 p-4 flex flex-col justify-center items-center"
          >
            <img 
              src={tool.img} 
              alt={tool.title} 
              className="h-40 w-full object-cover mb-4" 
            />
            <h2 className="text-center font-bold text-lg">{tool.title}</h2>
            <p className="mt-2 text-center text-sm sm:text-base">
              {tool.description}
            </p>
          </div>
        ))}
      </div>

      {/* Animations (Desktop Only) */}
      <div className="color-section flex flex-col lg:flex-row justify-center items-center lg:space-x-16 mt-24 lg:mt-36">
        <div id="anime" className="anim2 mb-8 lg:mb-0">
          <img src={img1} alt="Editing PDF" className="w-full max-w-xs sm:max-w-sm lg:max-w-lg" />
        </div>
        <div className="text-center lg:text-left">
          <h2 className="font-bold text-2xl sm:text-4xl lg:text-6xl">Merge Your PDF In A Second</h2>
          <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg">
            Do more than just view PDFs. Highlight and add text, images, shapes, and freehand annotations to your documents.
          </p>
        </div>
      </div>

      <div className="color-section flex flex-col lg:flex-row justify-center items-center lg:space-x-16 mt-24 lg:mt-36">
        <div className="text-center lg:text-left mb-8 lg:mb-0">
          <h2 className="font-bold text-2xl sm:text-4xl lg:text-6xl">Image to PDF In A Second</h2>
          <p className="mt-4 text-gray-500 text-sm sm:text-base lg:text-lg">
            Highlight, add text, and annotations to PDFs. You can also connect to 20 other tools to enhance your files further.
          </p>
        </div>
        <div id="anime" className="anim2">
          <img src={img2} alt="Editing PDF" className="w-full max-w-xs sm:max-w-sm lg:max-w-lg" />
        </div>
      </div>

      {/* Features Section */}
      <div className="color-section h-auto bg-gray-900 py-12 my-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              We come with some amazing features
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 justify-center">
            {features.map((feature, index) => (
              <div key={index} className="text-center max-w-xs">
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
