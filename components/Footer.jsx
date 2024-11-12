import React, { useEffect, useState } from "react";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import { SiMyanimelist } from "react-icons/si";

const Footer = () => {
  const [serviceDate, setServiceDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.toLocaleString("default", {
      month: "long",
    })}, ${date.getFullYear()}`;
    setServiceDate(formattedDate);
  }, []);

  return (
    <footer className="footer">
      <div className="contact-me">
        <p className="contact-text">Contact me:</p>
        <div className="contact-links">
          <a
            className="footer-links"
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=joeimportant1020@gmail.com`}
            target="_blank"
            rel="noopener noreferrer"
            title="joeimportant1020@gmail.com"
          >
            <FaEnvelope className="footer-icon email" />
          </a>
          <a
            className="footer-links"
            href="https://github.com/JewelShahi"
            target="_blank"
            rel="noopener noreferrer"
            title="Github"
          >
            <FaGithub className="footer-icon github"/>
          </a>

          <a
            className="footer-links"
            href="https://myanimelist.net/profile/JoeAnimeLover"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiMyanimelist className="footer-icon mal" title="MAL"/>
          </a>
        </div>
        <p style={{paddingLeft: 10, paddingRight: 10, fontSize: 14}}>
          Service<sup>©</sup> August, 2023 - {serviceDate} AniSearch. All rights reserved.
        </p>
      </div>
    </footer>

  );
};

export default Footer;
