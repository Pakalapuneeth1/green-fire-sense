import { Flame, TreePine, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <TreePine className="w-6 h-6" />
                <Flame className="w-6 h-6 text-secondary" />
              </div>
              <span className="font-bold text-lg">FireWatch ML</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Advanced machine learning for forest fire detection and prevention.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#predict-section" className="hover:text-secondary transition-colors">
                  Predict Risk
                </a>
              </li>
              <li>
                <a href="#learn-section" className="hover:text-secondary transition-colors">
                  Learn More
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <a href="mailto:info@firewatch.ml" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Mail className="w-4 h-4" />
                info@firewatch.ml
              </a>
              <a href="#" className="flex items-center gap-2 hover:text-secondary transition-colors">
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© 2024 FireWatch ML. Built for environmental researchers and forest departments.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
