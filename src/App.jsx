import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import {motion} from "framer-motion";
import Services from "./components/Services";
import MotionButton from "./components/MotionButton";

function App() {
  const [count, setCount] = useState(0);

  const links = [
    {
      label: "About",
      href: "/about"
    },
    {
      label: "Projects",
      href: "/projects"
    }
  ]

  const slideLeft = {
    hidden: { opacity: 0, x: -80 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: "easeOut" }
    }
  };
  
  const slideRight = {
    hidden: { opacity: 0, x: 80 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.9, ease: "easeOut", delay: 0.2 }
    }
  };


  
  return (
    <div className="mx-auto h-screen overflow-x-hidden" style={{maxWidth:"1920px"}}>
    
      <Navbar title="Tetelestai" links={links}></Navbar>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <Hero></Hero>
        </div>
        <Services/>
        <div className="mx-auto p-8">
          <MotionButton label="OUR SERVICES"/>
        </div>
        <div className="bg-[#fffaf0] text-center" >
        <motion.div
  className="mt-20 mx-auto tracking-widest text-[#b8860b] text-center"
  variants={slideLeft}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.4 }}
>
          <strong>OUR SERVICES IN DALLAS</strong>
        </motion.div>
        <motion.div
  className="mt-15 text-4xl text-center mx-15"
  variants={slideRight}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.4 }}
>
        Tetelestai Construction excels in providing renovation services, rebuilding, and new construction projects
        </motion.div>
        </div>
      </div>


    </div>
  );
}

export default App;
