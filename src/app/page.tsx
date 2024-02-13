"use client";
import { Button } from "@/components/ui/button";
import { Key, useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { useTransform, useScroll, motion } from "framer-motion";

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpeg",
  "6.jpeg",
  "7.jpg",
  "8.jpeg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

export default function LandingPage() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);
  const Column = ({ images, y }) => {
    return (
      <motion.div className={styles.column} style={{ y }}>
        {images.map((src: string, i: string | null | undefined) => {
          return (
            <div key={i} className={styles.imageContainer}>
              <Image src={`/images/${src}`} alt="image" fill />
            </div>
          );
        })}
      </motion.div>
    );
  };

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="h-content flex flex-col gap-3 max-w-[512px]">
      <div id="hello" className="bg-gray-950 w-screen h-[700px] relative">
        <img
          className="opacity-20 w-full h-full object-cover object-center "
          src="hero/test-bedroom-homepage.jpg"
          alt="header bedroom genereted with AI for a homepage"
        />
        <div className="gap-32 flex flex-row items-center justify-center absolute bottom-1/4 left-1 transform -translate-y-1/2 bg-opacity-50 px-4 py-2 w-screen">
          <div className="w-[512px] flex flex-col gap-3">
            <h1 className="text-5xl text-white font-bold text-pretty">
              Redesign your interior in seconds using AI
            </h1>
            <p className="text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
              fuga velit porro architecto accusamus molestias deserunt alias
              quas exercitationem vel in veniam. Eius, cupiditate sunt?
              Perferendis consequatur necessitatibus beatae iste?
            </p>
          </div>
          <div>
            <Button className="border w-[180px] hover:bg-white hover:text-black">
              Redesing your room now!
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center w-screen h-screen -z-10">
        <div className={styles.spacer}></div>
        <div ref={gallery} className={styles.gallery}>
          <Column images={[images[0], images[1], images[2]]} y={y} />
          <Column images={[images[3], images[4], images[5]]} y={y2} />
          <Column images={[images[6], images[7], images[8]]} y={y3} />
          <Column images={[images[9], images[10], images[11]]} y={y4} />
        </div>
        <div className={styles.spacer}></div>
      </div>
      <div
        id="jebus"
        className="h-[712px] -mt-[312px] w-screen bg-[#1c1b22] flex justify-center items-center flex-col gap-10"
      >
        <div>
          <h1 className="text-6xl">hola</h1>
        </div>
        <div className="flex flex-row justify-items-center items-center gap-10 rounded-xl">
          <img
            className="h-[512px] w-auto"
            src="room.png"
            alt="ACA TEDNIRA Q HABER UNA IMG"
          />
          <h1 className="text-7xl">→</h1>
          <img
            className="h-[512px] w-auto"
            src="output_0.png"
            alt="ACA TEDNIRA Q HABER UNA IMG"
          />
          <h1 className="text-7xl">→</h1>
          <img
            className="h-[512px] w-auto"
            src="output_1-1.png"
            alt="ACA TEDNIRA Q HABER UNA IMG"
          />
        </div>
      </div>
    </main>
  );
}
