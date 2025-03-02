import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

const ContactForm = () => {
  return (
    <div>
      <form action="https://submit-form.com/RFoQnC7ih">
        <label htmlFor="name">Name</label>
        <Input
          className="mb-3 mt-1 py-5"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          required
        />
        <div className="flex gap-3 flex-col lg:flex-row items-center w-full">
          <div className="w-full">
            <label htmlFor="email">Email</label>

            <Input
              className="mb-3 mt-1 py-5 w-full"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>
        </div>
        <label htmlFor="message">Message</label>
        <Textarea
          className="mb-3 mt-1"
          id="message"
          name="message"
          placeholder="Message"
          required
        ></Textarea>
        <Button className="w-full py-6 mt-4" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
