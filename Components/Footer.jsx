import React from "react";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    {
      name: "Github",
      href: "https://github.com/tanmayym16",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M208.31,75.68A59.78,59.78,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58.14,58.14,0,0,0,208.31,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.72,41.72,0,0,1,200,104Z"></path>
        </svg>
      ),
    },
    {
      name: "Discord",
      href: "#",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
          <path d="M104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm60-12a12,12,0,1,0,12,12A12,12,0,0,0,164,128Zm74.45,64.9-67,29.71a16.17,16.17,0,0,1-21.71-9.1l-8.11-22q-6.72.45-13.63.46t-13.63-.46l-8.11,22a16.18,16.18,0,0,1-21.71,9.1l-67-29.71a15.93,15.93,0,0,1-9.06-18.51L38,58A16.07,16.07,0,0,1,51,46.14l36.06-5.93a16.22,16.22,0,0,1,18.26,11.88l3.26,12.84Q118.11,64,128,64t19.4.93l3.26-12.84a16.21,16.21,0,0,1,18.26-11.88L205,46.14A16.07,16.07,0,0,1,218,58l29.53,116.38A15.93,15.93,0,0,1,238.45,192.9ZM232,178.28,202.47,62s0,0-.08,0L166.33,56a.17.17,0,0,0-.17,0l-2.83,11.14c5,.94,10,2.06,14.83,3.42A8,8,0,0,1,176,86.31a8.09,8.09,0,0,1-2.16-.3A172.25,172.25,0,0,0,128,80a172.25,172.25,0,0,0-45.84,6,8,8,0,1,1-4.32-15.4c4.82-1.36,9.78-2.48,14.82-3.42L89.83,56s0,0-.12,0h0L53.61,61.93a.17.17,0,0,0-.09,0L24,178.33,91,208a.23.23,0,0,0,.22,0L98,189.72a173.2,173.2,0,0,1-20.14-4.32A8,8,0,0,1,82.16,170,171.85,171.85,0,0,0,128,176a171.85,171.85,0,0,0,45.84-6,8,8,0,0,1,4.32,15.41A173.2,173.2,0,0,1,158,189.72L164.75,208a.22.22,0,0,0,.21,0Z"></path>
        </svg>
      ),
    },
  ];

  const footerLinks = [
    { title: "Follow Us", links: [{ name: "Github", href: "https://github.com/tanmayym16" }, { name: "Discord", href: "#" }] },
    { title: "Legal", links: [{ name: "Privacy Policy", href: "#" }, { name: "Terms & Conditions", href: "#" }] },
    { title: "Quick Links", links: [{ name: "White Paper", href: "/white-paper" }, { name: "Project", href: "/project" }, { name: "Donation", href: "/donation" }, { name: "Members", href: "/members" }] },
  ];

  return (
    <footer className="flex justify-center border-t border-solid border-t-[#2f273a]" role="contentinfo" aria-label="Footer">
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div className="flex flex-wrap items-start justify-center gap-6 @[480px]:flex-row @[480px]:justify-around">
            {footerLinks.map((section, i) => (
              <div key={i} className="flex flex-col gap-2 items-center min-w-40">
                <p className="text-[#a99abc] text-base font-bold leading-normal">{section.title}</p>
                {section.links.map((link, j) => (
                  <Link href={link.href} key={j}>
                    <span className="text-[#a99abc] text-sm font-normal leading-normal cursor-pointer" tabIndex={0} role="link" aria-label={link.name}>{link.name}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, i) => (
              <a key={i} href={social.href} className="text-[#a99abc] hover:text-white" aria-label={social.name} target="_blank" rel="noopener noreferrer">
                {social.icon}
              </a>
            ))}
          </div>
          <p className="text-[#a99abc] text-base font-normal leading-normal">
            © 2025 CauseFi™. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
