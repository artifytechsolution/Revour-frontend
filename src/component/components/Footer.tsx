const Footer = () => {
  return (
    <footer className="desktop-header-footer desktop-header-footer1 bg-gray-900 border-t mt-10 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[70px] pb-[50px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 relative inline-block">
              <span className="relative z-10">Revour</span>
              <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-500 rounded-full transform translate-y-1 z-0"></span>
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Find your perfect stay with Revour. Book hotels, experiences, and
              services worldwide with our seamless platform.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-facebook-f text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                <i className="fab fa-linkedin-in text-lg"></i>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-5 relative inline-block">
              <span className="relative z-10">Explore</span>
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full transform translate-y-1 z-0"></span>
            </h4>
            <ul className="space-y-3">
              {["Hotels", "Experiences", "Services", "Hourly Stays"].map(
                (item, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white group transition-all duration-300 flex items-center"
                    >
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative">
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-5 relative inline-block">
              <span className="relative z-10">Company</span>
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full transform translate-y-1 z-0"></span>
            </h4>
            <ul className="space-y-3">
              {["About Us", "Careers", "Press", "Blog"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white group transition-all duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-5 relative inline-block">
              <span className="relative z-10">Support</span>
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-blue-500 rounded-full transform translate-y-1 z-0"></span>
            </h4>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Contact Us",
                "Privacy Policy",
                "Terms of Service",
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white group transition-all duration-300 flex items-center"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">
                      {item}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 <span className="font-semibold text-white">Revour</span>.
              All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-400"></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
