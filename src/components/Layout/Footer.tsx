import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="">
        <footer className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">About Us</h3>
              <Link
                className="w-full flex-1 font-bold flex items-center gap-2 mb-2"
                href="/"
              >
                <Image
                  src={"/icon.png"}
                  height={60}
                  width={60}
                  alt="Tomame Gadgets"
                ></Image>{" "}
                Tomame Gadgets
              </Link>
              <p>
                We sell the best gadgets in town at affordable prices. We are
                the best in the market.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
              <ul>
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
              <p>
                Whatsapp us
                <a href="https://wa.me/233209015751"> +233 209015751</a>
                <br />
                We reply in seconds 😉!
              </p>
            </div>
          </div>
        </footer>
      </footer>
    </div>
  );
};

export default Footer;
