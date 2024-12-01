"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";

const WhatsappChat = () => {
  return (
    <div>
      <FloatingWhatsApp
        phoneNumber="233241801505"
        accountName="Brox Gadgets"
        avatar="/icon.png"
      />
    </div>
  );
};

export default WhatsappChat;
