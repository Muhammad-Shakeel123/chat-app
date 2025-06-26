import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import img1 from '../assets/5.avif';
import img2 from '../assets/2.avif';
import img3 from '../assets/3.avif';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Chat with Random Strangers With Similar Interests",
    description:
      "Talk to online strangers who love what you love. Chat about hobbies and enjoy fun conversations — all from one place! Making new friends based on interests is made easy.",
    image: img1,
  },
  {
    title: "Simple and Fun Video Chats",
    description:
      "Enjoy video chats with strangers worldwide, our platform is designed to make it easy and safe to connect with people from all over the world. Meet new people, make friends, and allow fun!",
    image: img3,
  },
  {
    title: "From Strangers to Friends",
    description:
      "Discover new people, make real and genuine connections, learn new languages or just have casual text or video chats. Our platform is designed to help you experience the best of online chatting.",
    image: img2,
  },
];

const FeaturesSection = () => {
  const sectionRefs = useRef([]);

  useEffect(() => {
    sectionRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  return (
    <section className="bg-black py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`flex flex-col-reverse md:flex-row ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } items-center gap-10 bg-gray-900 p-6 md:p-10 rounded-xl shadow-lg text-white`}
          >
            {/* Image */}
            <div className="w-full md:w-[40%]">
              <img
                src={feature.image}
                alt="Feature"
                className="rounded-lg object-cover w-full h-auto max-h-[300px] md:max-h-[280px]"
              />
            </div>

            {/* Text */}
            <div className="w-full md:w-[60%] text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
