export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-6 lg:px-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Address Section */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Address</h3>
            <p className="text-sm leading-relaxed text-gray-300">
              Vishwothama Nagar, Bantakal,
              <br />
              Shankarpura, Karnataka, 574115
              <br />
              16km from Udupi.
            </p>
            <p className="mt-4 text-sm text-gray-300">
              Email:{" "}
              <a
                href="mailto:varnothsava@sode-edu.in"
                className="transition-colors duration-300 hover:text-gray-400"
              >
                varnothsava@sode-edu.in
              </a>
            </p>
          </div>
          {/* Contact Us Section */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">Contact Us</h3>
            <p className="text-sm mb-2 text-gray-300">
              <span className="font-medium">Faculty Coordinator</span> - Mr. Ananthesh Rao K :{" "}
              <a
                href="tel:9164828762"
                className="transition-colors duration-300 hover:text-gray-400"
              >
                9164828762
              </a>
            </p>
            <p className="text-sm mb-1 text-gray-300">
              <span className="font-medium">Student Coordinators</span>:
            </p>
            <p className="text-sm ml-4 mb-1 text-gray-300">
              Ms. Vasundhara :{" "}
              <a
                href="tel:8722739363"
                className="transition-colors duration-300 hover:text-gray-400"
              >
                8722739363
              </a>
            </p>
            <p className="text-sm ml-4 text-gray-300">
              Mr. Shankar Shenoy :{" "}
              <a
                href="tel:9945176697"
                className="transition-colors duration-300 hover:text-gray-400"
              >
                9945176697
              </a>
            </p>
          </div>
          {/* FAQ & Design/Developers Section */}
          <div>
            <h3 className="text-xl font-serif font-semibold mb-4">FAQ</h3>
            <ul className="space-y-2 text-sm leading-relaxed text-gray-300 mb-6">
              <li>• If I register once can I participate in all the competitions?</li>
              <li>• When will the registrations open?</li>
              <li>• When will the results be announced?</li>
              <li>• Is there any mobile application for this fest?</li>
            </ul>
            <h3 className="text-xl font-serif font-semibold mb-4">Design &amp; Developers</h3>
            <p className="text-sm text-gray-300">
              Team X to Infinity
              <br />
              Email:{" "}
              <a
                href="mailto:xtoinfinity18@gmail.com"
                className="transition-colors duration-300 hover:text-gray-400"
              >
                xtoinfinity18@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Your Fest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
