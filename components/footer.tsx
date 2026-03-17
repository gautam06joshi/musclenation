"use client";

import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Dribbble,
  Globe,
} from "lucide-react";

import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from "@/components/ui/hover-footer";

function Footer() {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Team", href: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "FAQs", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Live Chat", href: "#" },
      ],
    },
  ];

  const contactInfo = [
    {
      icon: <Mail size={18} className="text-blue-400" />,
      text: "support@musclenation.com",
    },
    {
      icon: <Phone size={18} className="text-blue-400" />,
      text: "+91 99999 99999",
    },
    {
      icon: <MapPin size={18} className="text-blue-400" />,
      text: "Jaipur, India",
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
    { icon: <Twitter size={20} />, href: "#" },
    { icon: <Dribbble size={20} />, href: "#" },
    { icon: <Globe size={20} />, href: "#" },
  ];

  return (
    <footer className="bg-black relative rounded-3xl overflow-hidden mt-24">

      <div className="max-w-7xl mx-auto px-10 py-20 relative z-40">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>
            <h2 className="text-white text-3xl font-bold">
              MuscleNation
            </h2>

            <p className="text-gray-400 mt-4">
              Premium gym training experience and elite fitness coaching.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white text-lg font-semibold mb-5">
                {section.title}
              </h4>

              <ul className="space-y-3 text-gray-400">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-blue-400 transition"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-5">
              Contact
            </h4>

            <ul className="space-y-4 text-gray-400">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  {item.icon}
                  {item.text}
                </li>
              ))}
            </ul>
          </div>

        </div>

        <hr className="border-gray-800 my-12" />

        <div className="flex flex-col md:flex-row justify-between items-center">

          <div className="flex gap-6 text-gray-400">
            {socialLinks.map(({ icon }, i) => (
              <a key={i} href="#" className="hover:text-blue-400 transition">
                {icon}
              </a>
            ))}
          </div>

          <p className="text-gray-500 mt-6 md:mt-0">
            © {new Date().getFullYear()} MuscleNation. All rights reserved.
          </p>

        </div>

      </div>

      {/* Large hover text */}
      <div className="flex h-[18rem] md:h-[24rem] lg:h-[28rem] -mt-24 md:-mt-32 lg:-mt-40 -mb-24 md:-mb-28 lg:-mb-36">
        <TextHoverEffect text="MuscleNation" className="z-50" />
      </div>

      <FooterBackgroundGradient />

    </footer>
  );
}

export default Footer;