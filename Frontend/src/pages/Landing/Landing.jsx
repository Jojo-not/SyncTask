import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckSquare, ArrowRight, Clock, Users, Zap } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";

const Landing = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: CheckSquare,
      title: "Task Management",
      description:
        "Organize and track your tasks with powerful management tools",
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Monitor time spent on projects and improve productivity",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with your team members",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Built for speed and efficiency to keep you productive",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-secondary-600/10 dark:from-primary-400/5 dark:to-secondary-400/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                Sync Your
                <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  {" "}
                  Tasks
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                The ultimate task management solution that helps you stay
                organized, collaborate effectively, and achieve your goals
                faster than ever.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <Link
                to={isAuthenticated ? "/dashboard" : "/signup"}
                className="group inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span>Get Started</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/calendar"
                className="inline-flex items-center space-x-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-600 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
              >
                <span>View Demo</span>
              </Link>
            </motion.div>

            {/* Animated Illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <div className="w-full max-w-4xl mx-auto">
                <div className="bg-white/20 dark:bg-gray-800/20 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/30 dark:border-gray-700/30">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          duration: 2,
                          delay: i * 0.2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                        className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
                      >
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded mb-2"></div>
                        <div className="h-2 bg-gray-100 dark:bg-gray-600 rounded w-2/3"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to stay productive
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Powerful features designed to help you manage tasks, collaborate
              with teams, and achieve your goals more efficiently.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700/50 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to transform your productivity?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already streamlined their
              workflow with SyncTask.
            </p>
            <Link
              to={isAuthenticated ? "/dashboard" : "/signup"}
              className="inline-flex items-center space-x-2 bg-white text-primary-600 hover:text-primary-700 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
