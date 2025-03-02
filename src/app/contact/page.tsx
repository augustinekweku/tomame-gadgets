import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const ACCORDION_ITEMS = [
  {
    question: "How do i place an order?",
    answer:
      "You can place an order by calling the number on the website or by sending us a message on whatsapp. ",
  },
  {
    question: "How do i pay for my order?",
    answer:
      "You can pay for your order by mobile money or by bank transfer after you have received your order.",
  },
  {
    question: "Are the products original and authentic?",
    answer:
      "Yes. All products are original and authentic. We do not sell fake products.",
  },
  {
    question: "How do i get my order?",
    answer:
      "You can pick up your order at our office or we can deliver it to you at a fee.",
  },
];

export default function Contact() {
  return (
    <section>
      <h1 className="bg-primary text-center py-5 text-white font-bold lg:text-2xl ">
        NEED HELP?
      </h1>
      <div className="bg-muted-background pt-5">
        <div className="flex  container lg:py-10 items-center flex-col lg:flex-row">
          <div className="basis-1/2 w-full">
            <div className="relative w-full h-[400px]">
              <Image
                src={"/images/contact-us.png"}
                className="absolute w-full h-full"
                fill={true}
                objectFit="contain"
                alt="Brox Gadgets"
              ></Image>{" "}
            </div>
          </div>
          <div className="basis-1/2 w-full mb-5">
            <div className="flex items-center gap-3">
              <h4 className="font-bold text-primary text-lg lg:text-2xl">
                Contact Us
              </h4>
            </div>

            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
      <div className="flex  container lg:py-10 items-center flex-col lg:flex-row my-5">
        <div className="basis-1/2 w-full">
          <div className="lg:w-3/4">
            <h1 className="text-primary-default font-semibold text-2xl  lg:text-3xl mb-2">
              Frequently Asked Questions{" "}
            </h1>
            <p>
              Find answers to the most common questions about our services.
              purchasing, and payment processes. If you need further assistance,
              don&apos;t hesitate to{" "}
              <Link className="text-primary" href="/contact">
                Contact us
              </Link>{" "}
              .
            </p>
          </div>
        </div>
        <div className="basis-1/2 w-full mb-5">
          <div>
            <Accordion type="single" collapsible>
              {ACCORDION_ITEMS.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-base font-bold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
