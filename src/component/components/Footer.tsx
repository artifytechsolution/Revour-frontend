import Image from "next/image"; // if you're using Next.js, otherwise use <img>
import logo from "../../../public/logodata123.png";

const Footer = () => {
  return (
    <footer className="desktop-header-footer desktop-header-footer1 bg-gray-900 border-t border-green-600 mt-10 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[70px] pb-[50px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo + About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src={logo} // dummy logo file
                alt="Revour Logo"
                width={140}
                height={140}
                className=""
              />
              <h3 className="text-xl font-bold relative inline-block">
                <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 rounded-full transform translate-y-1 z-0"></span>
              </h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Find your perfect stay with Revour. Book hotels, experiences, and
              services worldwide with our seamless platform.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-colors duration-300 border border-transparent hover:border-green-500 rounded p-2"
              >
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-colors duration-300 border border-transparent hover:border-green-500 rounded p-2"
              >
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-colors duration-300 border border-transparent hover:border-green-500 rounded p-2"
              >
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-green-400 transition-colors duration-300 border border-transparent hover:border-green-500 rounded p-2"
              >
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-lg font-bold mb-5 relative inline-block">
              <span className="relative z-10">Explore</span>
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-500 rounded-full transform translate-y-1 z-0"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Hotels", link: "/home" },
                { name: "Experiences", link: "/experiences" },
                { name: "Profile", link: "/profile" },
                { name: "Hourly Stays", link: "/hourly" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-gray-300 hover:text-white group transition-all duration-300 flex items-center border-l-2 border-transparent hover:border-green-500 pl-2"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-5 relative inline-block">
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-500 rounded-full transform translate-y-1 z-0"></span>
            </h4>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-start space-x-2 border-l-2 border-green-600 pl-3">
                <i className="fas fa-map-marker-alt mt-1 text-green-400"></i>
                <span>Ahmedabad</span>
              </li>
              <li className="flex items-start space-x-2 border-l-2 border-green-600 pl-3">
                <i className="fas fa-phone-alt mt-1 text-green-400"></i>
                <a
                  href="tel:+91 7990216477"
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  +91 7990216477
                </a>
              </li>
              <li className="flex items-start space-x-2 border-l-2 border-green-600 pl-3">
                <i className="fas fa-envelope mt-1 text-green-400"></i>
                <a
                  href="mailto:info@revourhotels.com"
                  className="hover:text-green-400 transition-colors duration-300"
                >
                  info@revourhotels.com
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-5 relative inline-block">
              <span className="relative z-10">Support</span>
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-green-500 rounded-full transform translate-y-1 z-0"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Help Center", link: "/privacypolicy" },
                { name: "Contact Us", link: "/privacypolicy" },
                { name: "Privacy Policy", link: "/privacypolicy" },
                { name: "Terms of Service", link: "/privacypolicy" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-gray-300 hover:text-white group transition-all duration-300 flex items-center border-l-2 border-transparent hover:border-green-500 pl-2"
                  >
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-green-700 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025{" "}
              <span className="font-semibold text-green-400">Revour</span>. All
              rights reserved.
            </p>
            {/* <div className="mt-4 md:mt-0">
              <p className="text-gray-400">
                Designed with by{" "}
                <span className="text-green-400 border-b border-green-500">
                  Keval khetani & JBsoftTech Team
                </span>
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
