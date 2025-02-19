export default function Footer() {
  return (
    <footer className="bg-card py-12 px-4 sm:px-6 lg:px-8 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-muted-foreground">Email: info@techfest2024.com</p>
            <p className="text-muted-foreground">Phone: +1 234 567 890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-muted-foreground hover:text-primary">About</a></li>
              <li><a href="#events" className="text-muted-foreground hover:text-primary">Events</a></li>
              <li><a href="#speakers" className="text-muted-foreground hover:text-primary">Speakers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary">Facebook</a>
              <a href="#" className="text-muted-foreground hover:text-primary">Instagram</a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2024 TechFest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}