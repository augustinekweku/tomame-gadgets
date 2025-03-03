import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <div>
      <footer className="shadow-primary-default border-t-2 border-t-primary-weak">
        <footer className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">About Us</h3>
              <Link
                className="w-full flex-1 font-bold flex items-center gap-2 mb-3"
                href="/"
              >
                <Image
                  src={"/images/logo.png"}
                  height={64}
                  width={224}
                  alt="Brox Gadgets"
                ></Image>{" "}
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
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about-us">About</Link>
                </li>

                <li>
                  <Link href="/contact">Contact</Link>
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
              <Button
                variant="default"
                className="font-semibold  hidden lg:flex px-6 mt-4"
              >
                Contact Us
                <Image
                  src="/icons/button-arrow.svg"
                  height={20}
                  width={20}
                  alt="phone"
                ></Image>
              </Button>
            </div>
          </div>
        </footer>
      </footer>
    </div>
  );
};

export default Footer;
