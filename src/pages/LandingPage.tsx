import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Users, Clock, Twitter, Github, Linkedin } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CheckSquare, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export function LandingPage() {
  const [darkMode, setDarkMode] = useDarkMode();

  const features = [
    {
      icon: Zap,
      title: 'Real-time Sync',
      description: 'Your tasks sync instantly across all devices. Work seamlessly whether you\'re on desktop, tablet, or mobile.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Share projects with team members, assign tasks, and collaborate in real-time with comments and updates.',
    },
    {
      icon: Clock,
      title: 'Deadline Tracking',
      description: 'Never miss a deadline with smart notifications, calendar integration, and priority management.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Custom Landing Navbar */}
      <nav className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-8 h-8 text-primary-500" />
              <span className="text-xl font-bold text-neutral-900 dark:text-white">
                SyncTask
              </span>
            </div>

            <div className="hidden sm:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">Sign Up</Button>
              </Link>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setDarkMode(!darkMode)}
                className="p-2"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <div className="sm:hidden">
                <Link to="/signup">
                  <Button variant="primary" size="sm">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
              Organize your work,{' '}
              <span className="text-primary-500">sync your life</span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl mx-auto">
              The ultimate task management platform that keeps you productive and your team aligned. 
              Simple, powerful, and beautifully designed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/signup">
                <Button size="lg" className="group">
                  Get Started Free
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>
            
            {/* Hero Image Placeholder */}
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-700 p-8">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-3">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-12 bg-primary-100 dark:bg-primary-900 rounded-lg"></div>
                      <div className="h-12 bg-secondary-100 dark:bg-secondary-900 rounded-lg"></div>
                      <div className="h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-12 bg-blue-100 dark:bg-blue-900 rounded-lg"></div>
                      <div className="h-12 bg-purple-100 dark:bg-purple-900 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                    <div className="space-y-2">
                      <div className="h-12 bg-green-100 dark:bg-green-900 rounded-lg"></div>
                      <div className="h-12 bg-red-100 dark:bg-red-900 rounded-lg"></div>
                      <div className="h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
              Everything you need to stay organized
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Powerful features designed to help you and your team work more efficiently.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to transform your productivity?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams already using SyncTask to achieve more together.
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold">SyncTask</span>
              </div>
              <p className="text-neutral-400 max-w-md">
                The ultimate task management platform for modern teams. 
                Organize your work, sync your life.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; 2025 SyncTask. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}