# Navigate to your project directory
cd eden-website

# 1. BACKUP (optional but recommended)
cp -r . ../eden-website-backup

# 2. DELETE old files (keep .git and node_modules if they exist)
rm -rf app components public styles pages
rm -f package.json package-lock.json tsconfig.json tailwind.config.* postcss.config.* next.config.*

# 3. CREATE new package.json
cat > package.json << 'EOF'
{
  "name": "edenhub-website",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^15.1.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17",
    "typescript": "^5"
  }
}
EOF

# 4. INSTALL dependencies
npm install

# 5. CREATE config files
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
EOF

cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

cat > tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B4079",
        secondary: "#64748b",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
EOF

cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# 6. CREATE folder structure
mkdir -p app components public

# 7. CREATE app/globals.css
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply bg-white text-gray-900;
  }
}

/* Custom cursor animation for typing effect */
.typing-cursor::after {
  content: '|';
  animation: blink 1s infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
EOF

# 8. CREATE app/layout.tsx
cat > app/layout.tsx << 'EOF'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edenhub - Human-Centered Innovation",
  description: "Technology that serves people with ethics, scalability, and creativity.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
EOF

# 9. CREATE app/page.tsx
cat > app/page.tsx << 'EOF'
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Products />
      <Footer />
    </main>
  );
}
EOF

# 10. CREATE components/Hero.tsx
cat > components/Hero.tsx << 'EOF'
"use client";

import { useState, useEffect } from "react";

const phrases = [
  "Human-Centered Innovation: Technology exists to serve people.",
  "Ethics First: Privacy, transparency, and accountability in every solution.",
  "Scalability & Sustainability: Built for growth, designed for longevity.",
  "Creativity: We explore",
  "Trust & Integrity: We build with honesty and stand behind our work.",
  "Collaboration: We grow with our partners, clients, and users.",
];

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (displayText.length < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
          setTypingSpeed(50);
        } else {
          // Pause at end before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
          setTypingSpeed(30);
        } else {
          // Move to next phrase
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, typingSpeed]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-blue-800 to-blue-950 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fade-in">
        <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-tight">
          Welcome to Edenhub
        </h1>
        
        <div className="h-32 flex items-center justify-center">
          <p className="text-2xl md:text-3xl font-light typing-cursor min-h-[4rem]">
            {displayText}
          </p>
        </div>

        <div className="mt-12 animate-slide-up">
          <a
            href="#products"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-2xl"
          >
            Explore Our Products
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
EOF

# 11. CREATE components/Products.tsx
cat > components/Products.tsx << 'EOF'
export default function Products() {
  return (
    <section id="products" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-5xl font-bold text-center mb-16 text-primary">
          Our Products
        </h2>

        <div className="bg-white rounded-2xl shadow-xl p-12 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-4xl font-bold mb-4 text-primary">Eden AI</h3>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Your intelligent AI assistant featuring advanced chat capabilities, 
                image generation, and comprehensive AI functionalities. Experience 
                the future of human-AI interaction.
              </p>

              <div className="space-y-4">
                <h4 className="text-2xl font-semibold text-gray-800">
                  Available On:
                </h4>
                
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://edenhub.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-900 transition-colors duration-300 font-medium"
                  >
                    🌐 Web Version
                  </a>
                  
                  <a
                    href="#"
                    className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-medium"
                  >
                    📱 Google Play
                  </a>
                  
                  <a
                    href="#"
                    className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 font-medium"
                  >
                    🍎 App Store
                  </a>
                  
                  <a
                    href="#"
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 font-medium"
                  >
                    💜 LoveWorld App Store
                  </a>
                </div>
              </div>
            </div>

            <div className="flex-1 flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-primary to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-6xl font-bold">AI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
EOF

# 12. CREATE components/Footer.tsx
cat > components/Footer.tsx << 'EOF'
export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Edenhub</h3>
            <p className="text-gray-300">
              Human-centered innovation for a better tomorrow.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-300 hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@edenhub.io" className="text-gray-300 hover:text-white transition-colors">
                  info@edenhub.io
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Edenhub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
EOF

# 13. RUN the development server
echo "✅ All files created successfully!"
echo "🚀 Starting development server..."
npm run dev
