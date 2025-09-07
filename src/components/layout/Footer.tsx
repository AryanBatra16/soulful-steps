import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-playfair font-semibold text-lg mb-3">
              <Heart className="h-5 w-5 text-primary" />
              <span>Mind2Care</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Your compassionate wellness companion. Supporting your mental health journey 
              with AI-powered insights, community support, and evidence-based tools.
            </p>
            <p className="text-xs text-muted-foreground">
              ⚠️ Mind2Care is not a substitute for professional mental health care. 
              If you're experiencing a crisis, please contact emergency services or a mental health professional.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-3">Support</h3>
            <div className="space-y-2 text-sm">
              <Link to="/help" className="block text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </Link>
              <Link to="/privacy" className="block text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <div className="space-y-2 text-sm">
              <a 
                href="https://www.mentalhealth.gov" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Mental Health Gov
              </a>
              <a 
                href="https://www.nami.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                NAMI
              </a>
              <a 
                href="tel:988" 
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Crisis Lifeline: 988
              </a>
              <a 
                href="https://www.crisistextline.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground transition-colors"
              >
                Crisis Text Line
              </a>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Mind2Care. Made with ❤️ for mental wellness.</p>
        </div>
      </div>
    </footer>
  );
}