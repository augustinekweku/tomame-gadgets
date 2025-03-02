import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const QUALITIES = [
  {
    icon: "/images/authentic.svg",
    first_text: "Providing 100%",
    second_text: "Authentic",
    third_text: "Products",
  },
  {
    icon: "/images/convenient.svg",
    first_text: "Offering the most",
    second_text: "Convenient",
    third_text: "Service",
  },
  {
    icon: "/images/best-price.svg",
    first_text: "With the",
    second_text: "Best Price",
    third_text: "in Ghana",
  },
  {
    icon: "/images/best-service.svg",
    first_text: "Assisting you with the ",
    second_text: "Best Service",
    third_text: "in Ghana",
  },
];

export default function About() {
  return (
    <section className="">
      <div className="flex  container lg:py-10 items-center flex-col lg:flex-row">
        <div className="basis-1/2 w-full">
          <div className="relative w-full h-[400px]">
            <Image
              src={"/images/about-us.png"}
              className="absolute w-full h-full"
              fill={true}
              objectFit="contain"
              alt="Brox Gadgets"
            ></Image>{" "}
          </div>
        </div>
        <div className="basis-1/2">
          <div className="flex items-center gap-3">
            <Image
              src={"/images/orange-line.svg"}
              height={4}
              width={46}
              alt="orange line"
            />

            <h4 className="font-bold text-primary text-lg lg:text-2xl">
              About Us
            </h4>
          </div>
          <p className="font-semibold lg:w-2/3 text-sm">
            We sell the best gadgets in town at affordable prices. We are the
            best in the market.
          </p>
          <p className="mt-3 mb-5">
            Broxgadgets is a cutting-edge e-commerce platform dedicated to
            providing the latest and most innovative gadgets. From smartphones
            and laptops to gaming accessories and home automation devices, we
            offer high-quality products at competitive prices. Our user-friendly
            website ensures a seamless purchasing experience with secure payment
            options, fast delivery, and excellent customer support. Stay ahead
            of the tech curve with Broxgadgets – where innovation meets
            convenience!
          </p>
        </div>
      </div>
      <div className="bg-muted-background py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 justify-between my-6 container flex-col lg:flex-row">
          {QUALITIES.map((item) => (
            <div key={item.first_text} className="">
              <Image
                src={item.icon}
                height={130}
                width={130}
                alt="authentic"
                className="mx-auto mb-3 w-[100px] lg:w-[130px]"
              />
              <h4 className="font-bold  text-sm lg:text-lg text-center">
                {item.first_text} <br />
                <span className="text-primary">{item.second_text}</span> <br />
                {item.third_text}
              </h4>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-broxblue py-10">
        <div className="container">
          <div className="lg:w-2/5 mx-auto">
            <h4 className="text-white text-center font-bold text-lg lg:text-2xl">
              Subscribe To Our Newsletter
            </h4>
            <p className="text-white text-center text-sm  lg:text-lg ">
              Sign up to receive updates on new arrivals, special offers, and
              other discount information.
            </p>
            <div className="flex gap-3 mt-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg p-2 bg-white"
              />
              <Button variant={"default"}>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
