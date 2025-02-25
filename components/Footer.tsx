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
              <span className="font-medium">Faculty Coordinator</span> - Mr. SACHIN PRABHU :{" "}
              <a
                href="tel:9964027565"
                className="transition-colors duration-300 hover:text-gray-400"
              >
                9964027565
              </a>
            </p>
            <p className="text-sm mb-1 text-gray-300">
              <span className="font-medium">Student Coordinators</span>:
            </p>
            <p className="text-sm ml-4 mb-1 text-gray-300">
              Mr. Ramachandra Udupa:{" "}
              <a
                href="tel:8722739363"
                className="transition-colors duration-300 hover:text-gray-400"
              >
                8867004280
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
            <h3 className="text-xl font-serif font-semibold mb-4">Design &amp; Developer</h3>
            <p className="text-sm text-gray-300">
              Ramachandra Udupa
              <br />
              Email:{" "}
              <a
                href="mailto:ramachandra2004@gmail.com"
                className="transition-colors duration-300 hover:text-gray-400"
              >
                ramachandra2004@gmail.com
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
