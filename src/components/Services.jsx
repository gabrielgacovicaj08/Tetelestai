import { LuHouse } from "react-icons/lu";
import { motion } from "framer-motion";
import beforeAfter23 from "../assets/before-after23.jpg";
import beforeAfter24 from "../assets/before-after24.jpg"; 
import beforeAfter2 from "../assets/before-after2.jpg";
import houseExtension from "../assets/hero-placeholder.jpg";

function Services(){
    
    const services = [
        {
            title: "Total Renovation",
            subtitle: "Renovate your home from the ground up with purpose",
            description: "Delivering total home upgrades with care, precision, and skilled craftmanship",
            src: beforeAfter23
        },
        {
            title: "House Extension",
            subtitle: "Expand your living space with seamless, stylish extension",
            description: "Transform your home with thoughtful extensions that blend perfectly with your existing structure",
            src: houseExtension
        },
        {
            title: "Bathrooms",
            subtitle: "Enjoy tailored leisure that suits your preferences",
            description: "Elevate your bathroom experience with our expert renovation services, tailored specifically for you",
            src: beforeAfter2
        },
        {
            title: "Kitchen",
            subtitle: "Make the place you cook part of the food experience",
            description: "From initial design to final touches, we ensure your kitchen renovation exceeds expectations",
            src: beforeAfter24
        }
    ]

    const imgFromLeft = {
        hidden: { opacity: 0, x: -80 },
        show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } }
      };
    
      const imgFromRight = {
        hidden: { opacity: 0, x: 80 },
        show: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } }
      };
    
      const textFromRight = {
        hidden: { opacity: 0, x: 80 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.9, ease: "easeOut", delay: 0.15 }
        }
      };
    
      const textFromLeft = {
        hidden: { opacity: 0, x: -80 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.9, ease: "easeOut", delay: 0.15 }
        }
      };
    

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        show: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8
          }
        }
      };

    return (
        <section className="w-full bg-gray-100 py-16">
      {services.map((service, index) => {
        const reverse = index % 2 !== 0;

        return (
          <motion.div
            key={index}
            className="mx-auto w-full max-w-[1900px] bg-white mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
          >
            <div
              className={`flex flex-col md:flex-row ${
                reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* IMAGE half */}
              <motion.div
                className="md:w-1/2"
                variants={reverse ? imgFromRight : imgFromLeft}
              >
                <img
                  src={service.src}
                  alt={service.title}
                  className="h-[350px] w-full object-cover md:h-[300px] lg:h-[380px]"
                />
              </motion.div>

              {/* TEXT half */}
              <motion.div
                className="md:w-1/2 px-10 py-14 flex flex-col justify-center"
                variants={reverse ? textFromLeft : textFromRight}
              >
                <h2 className="text-2xl text-gray-900">{service.title}</h2>

                <p className="mt-4 text-gray-500">{service.subtitle}</p>

                <div className="mt-8 h-px w-full bg-gray-300" />

                <p className="mt-8 text-gray-700 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        );
      })}
    </section>
          )
}

export default Services;