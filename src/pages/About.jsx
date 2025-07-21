import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Coffee, Users, Target, Award, Globe, Zap } from 'lucide-react';

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: "backOut" }
  };

  // Counter animation component
  const AnimatedCounter = ({ end, duration = 2 }) => {
    const [count, setCount] = React.useState(0);
    const counterRef = useRef(null);
    const isInView = useInView(counterRef, { once: true });

    useEffect(() => {
      if (isInView) {
        let startTime;
        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime;
          const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
          setCount(Math.floor(progress * end));
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        requestAnimationFrame(animate);
      }
    }, [isInView, end, duration]);

    return <span ref={counterRef}>{count}</span>;
  };

  const founders = [
    { name: "Ajai Thandi", role: "Co-Founder" },
    { name: "Arman Sood", role: "Co-Founder" },
    { name: "Ashwajeet Singh", role: "Co-Founder" }
  ];

  const stats = [
    { number: 60000, suffix: "+", label: "Happy Customers", icon: Users },
    { number: 1000, suffix: "+", label: "Retail Outlets", icon: Globe },
    { number: 8, suffix: "", label: "Years Journey", icon: Award },
    { number: 100, suffix: "%", label: "Arabica Coffee", icon: Coffee }
  ];

  const milestones = [
    { year: "2016", title: "The Beginning", desc: "Three friends founded Sleepy Owl, introducing Cold Brew to India" },
    { year: "2019", title: "Hot Brew Launch", desc: "Expanded product line with premium hot brew collections" },
    { year: "2021", title: "Series A Funding", desc: "Raised $6.5M to scale operations and expand reach" },
    { year: "2024", title: "Market Leader", desc: "Became India's most trusted coffee brand with premium quality" }
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 opacity-10"
      >
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute top-60 right-32 w-48 h-48 bg-amber-400 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-1/3 w-56 h-56 bg-yellow-400 rounded-full blur-3xl"></div>
      </motion.div>

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center px-4"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="text-center max-w-6xl mx-auto">
          <motion.div
            variants={scaleIn}
            className="inline-block mb-8"
          >
            <div className="relative">
              <Coffee className="w-24 h-24 text-orange-600 mx-auto mb-4" />
              <motion.div
                className="absolute -inset-4 bg-orange-200 rounded-full opacity-30"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent"
          >
            Sleepy Owl
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-2xl md:text-3xl text-gray-700 font-light mb-8 leading-relaxed"
          >
            Real Good Coffee. Real Good Story.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Started by three friends who recognized the gap in the market for good quality coffee at home, made with minimal effort, Sleepy Owl's vision is to disrupt the at-home coffee industry in India.
          </motion.div>
        </div>

        {/* Floating Coffee Beans */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-amber-800 rounded-full opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.section>

      {/* Story Section */}
      <motion.section 
        className="py-24 px-4 relative"
        style={{ y: parallaxY }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold mb-6 text-gray-800">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded in 2016, Sleepy Owl became the first to introduce India to the concept of Cold Brew Coffee, pioneering a new coffee culture.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl opacity-20 blur-lg"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-2xl">
                  <Target className="w-12 h-12 text-orange-600 mb-6" />
                  <h3 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    To give our customers easy access to the best quality coffee, constantly innovating and redefining the coffee drinking experience with premium instant coffee and cold brew solutions.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl opacity-20 blur-lg"></div>
                <div className="relative bg-white p-8 rounded-2xl shadow-2xl">
                  <Zap className="w-12 h-12 text-amber-600 mb-6" />
                  <h3 className="text-3xl font-bold mb-4 text-gray-800">Innovation</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Using state-of-the-art microground technology to create coffee powder that perfectly dissolves in hot or cold water, delivering delicious coffee in seconds.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section className="py-24 bg-gradient-to-r from-orange-600 to-amber-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">By The Numbers</h2>
            <p className="text-xl opacity-90">Our impact in the Indian coffee market</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <IconComponent className="w-12 h-12 mx-auto mb-4 opacity-80" />
                  <div className="text-4xl md:text-5xl font-bold mb-2">
                    <AnimatedCounter end={stat.number} />
                    {stat.suffix}
                  </div>
                  <p className="text-lg opacity-90">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Founders Section */}
      <motion.section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 text-gray-800">Meet The Founders</h2>
            <p className="text-xl text-gray-600">
              Three good friends with one ambitious vision - to bring real good coffee to everyone.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-amber-400"></div>
                <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{founder.name}</h3>
                <p className="text-orange-600 font-semibold">{founder.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section className="py-24 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-6 text-gray-800">Our Milestones</h2>
            <p className="text-xl text-gray-600">Key moments in our journey</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-orange-400"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 px-8">
                  <div className={`bg-white p-6 rounded-2xl shadow-lg ${
                    index % 2 === 0 ? 'text-right' : 'text-left'
                  }`}>
                    <div className="text-orange-600 text-2xl font-bold mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.desc}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-orange-400 rounded-full border-4 border-white shadow-lg z-10"></div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-400 to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">Join Our Coffee Revolution</h2>
            <p className="text-xl mb-8 opacity-90">
              Experience the perfect blend of convenience and quality with Sleepy Owl Coffee.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-orange-500/25 transition-all duration-300"
            >
              Explore Our Coffee
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default About;