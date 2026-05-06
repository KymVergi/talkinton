'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-12 h-12 gradient-pink rounded-xl flex items-center justify-center">
              <span className="text-white font-display text-2xl font-bold">T</span>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-tom-navy leading-tight">
                TALKING TON
              </h1>
              <p className="text-xs text-tom-pink font-semibold">& FRIENDS</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-tom-pink font-bold text-base hover:text-tom-purple transition-colors">
              HOME
            </Link>
            <Link href="/gameplay" className="text-tom-navy font-semibold text-base hover:text-tom-purple transition-colors">
              GAMEPLAY
            </Link>
            <Link href="/chat" className="text-tom-navy font-semibold text-base hover:text-tom-purple transition-colors">
              CHAT WITH TON
            </Link>
            <Link href="https://x.com/Ton_C0in" target="_blank" className="text-tom-navy font-semibold text-base hover:text-tom-purple transition-colors">
              TWITTER
            </Link>
            <Link href="https://t.me/talkingt0n" target="_blank" className="text-tom-navy font-semibold text-base hover:text-tom-purple transition-colors">
              TELEGRAM
            </Link>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-12 h-12 gradient-navy rounded-xl flex items-center justify-center"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <nav className="flex flex-col px-6 py-4 gap-3">
              <Link href="/" className="text-tom-pink font-bold text-base py-2">
                HOME
              </Link>
              <Link href="/gameplay" className="text-tom-navy font-semibold text-base py-2">
                GAMEPLAY
              </Link>
              <Link href="/chat" className="text-tom-navy font-semibold text-base py-2">
                CHAT WITH TON
              </Link>
              <Link href="#support" className="text-tom-navy font-semibold text-base py-2">
                SUPPORT
              </Link>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-6xl md:text-8xl font-bold text-tom-navy mb-6">
              Gameplay
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              <span className="font-semibold italic">My Talking Ton</span> is an interactive virtual pet game that defined its genre by allowing players to adopt and nurture a baby kitten into a full-grown cat. The gameplay centers on building an emotional connection with{' '}
              <span className="font-semibold text-tom-purple">Talking Ton</span> through daily care, creative customization, and skill-based entertainment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature Boxes - My Talking Tom Style */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="py-0"
      >
        {/* Core Nurturing Mechanics */}
        <motion.div variants={itemVariants} className="gradient-purple text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-display text-5xl md:text-6xl font-bold mb-8">
                  Core Nurturing Mechanics
                </h3>
                <p className="text-xl mb-8 leading-relaxed">
                  The foundation of the game involves managing Talking Ton&apos;s physical needs across several interactive environments.
                </p>
                <ul className="space-y-6">
                  <li>
                    <strong className="text-2xl font-display block mb-2">Feeding and Nutrition:</strong>
                    <p className="text-lg opacity-90">
                      Players must feed Talking Ton a variety of foods when his hunger meter is low to help him grow.
                    </p>
                  </li>
                  <li>
                    <strong className="text-2xl font-display block mb-2">Hygiene and Wellness:</strong>
                    <p className="text-lg opacity-90">
                      Players take Talking Ton to the bathroom and wash him to maintain his health.
                    </p>
                  </li>
                  <li>
                    <strong className="text-2xl font-display block mb-2">Rest and Recovery:</strong>
                    <p className="text-lg opacity-90">
                      When Talking Ton becomes tired, players must tuck him into bed and turn out the lights so he can sleep and regain energy.
                    </p>
                  </li>
                  <li>
                    <strong className="text-2xl font-display block mb-2">Growth Progression:</strong>
                    <p className="text-lg opacity-90">
                      As players complete these care tasks, Talking Ton progresses from a baby kitten through various life stages until he is a mature adult.
                    </p>
                  </li>
                </ul>
              </div>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/20">
                  <Image
                    src="/images/Tom.jpg"
                    alt="Talking Ton"
                    width={500}
                    height={500}
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Features */}
        <motion.div variants={itemVariants} className="gradient-navy text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="order-2 md:order-1 relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/20">
                  <Image
                    src="/images/tom_listening.jpg"
                    alt="Ton Listening"
                    width={500}
                    height={500}
                    className="w-full rounded-2xl shadow-2xl"
                  />
                </div>
              </motion.div>
              <div className="order-1 md:order-2">
                <h3 className="font-display text-5xl md:text-6xl font-bold mb-8">
                  Interactive Features and Personalization
                </h3>
                <p className="text-xl mb-8 leading-relaxed">
                  <span className="italic">My Talking Ton</span> is widely known for its &ldquo;talkback&rdquo; functionality and high level of interactivity.
                </p>
                <ul className="space-y-6">
                  <li>
                    <strong className="text-2xl font-display block mb-2">The Talkback Function:</strong>
                    <p className="text-lg opacity-90">
                      Talking Ton repeats everything the player says into the device&apos;s microphone in a signature, high-pitched funny voice.
                    </p>
                  </li>
                  <li>
                    <strong className="text-2xl font-display block mb-2">Physical Interaction:</strong>
                    <p className="text-lg opacity-90">
                      Players can poke Talking Ton&apos;s head, belly, or feet to trigger various hilarious reactions, or pet him to make him purr.
                    </p>
                  </li>
                  <li>
                    <strong className="text-2xl font-display block mb-2">Deep Customization:</strong>
                    <p className="text-lg opacity-90">
                      Using in-game currency, players can dress Talking Ton in fun outfits - such as a superhero or astronaut - and redecorate his house with unique furniture and accessories.
                    </p>
                  </li>
                  <li>
                    <strong className="text-2xl font-display block mb-2">Easter Eggs:</strong>
                    <p className="text-lg opacity-90">
                      Specific costumes can trigger hidden interactions; for example, wearing the &ldquo;Soccer Player&rdquo; outfit allows players to see soccer balls appear when Talking Ton is poked.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mini Games */}
        <motion.div variants={itemVariants} className="gradient-blue text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-display text-5xl md:text-6xl font-bold mb-8">
                  Mini-Games and Rewards
                </h3>
                <p className="text-xl mb-8 leading-relaxed">
                  To provide action and adventure beyond pet care, the game includes a diverse collection of mini-games designed to test skill, reflexes, and puzzle-solving abilities.
                </p>
                <ul className="space-y-6">
                  <li>
                    <strong className="text-2xl font-display block mb-2">Variety of Genres:</strong>
                    <p className="text-lg opacity-90">
                      Players can engage in games like <span className="italic">Flappy Ton</span> (inspired by Flappy Bird), <span className="italic">Cake Tower</span>, <span className="italic">Space Piano</span>, and <span className="italic">Brick Blast</span>.
                    </p>
                  </li>
                  <li>
                    <strong className="text-2xl font-display block mb-2">Earning Currency:</strong>
                    <p className="text-lg opacity-90">
                      Success in these mini-games rewards players with gold coins or diamonds, which are necessary for purchasing food, new outfits, and house decorations.
                    </p>
                  </li>
                  <li>
                    <strong className="text-2xl font-display block mb-2">Seasonal Events:</strong>
                    <p className="text-lg opacity-90">
                      The game frequently receives updates that introduce time-limited seasonal events, offering unique rewards and keeping the gameplay experience fresh and relatable.
                    </p>
                  </li>
                </ul>
              </div>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border-4 border-white/20">
                  <Image
                    src="/images/tom_talking.png"
                    alt="Ton Talking"
                    width={500}
                    height={500}
                    className="w-full rounded-2xl shadow-2xl"
                    unoptimized
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action - Chat */}
        <motion.div variants={itemVariants} className="gradient-pink text-white">
          <div className="max-w-7xl mx-auto px-6 py-20 md:py-32 text-center">
            <h3 className="font-display text-5xl md:text-7xl font-bold mb-8">
              Talk to Ton Now!
            </h3>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto">
              Experience the magic of Talking Ton with our multilingual AI chatbot. Talk to Ton in your language and hear his signature voice!
            </p>
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-tom-pink font-display text-2xl font-bold px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all"
              >
                Chat with Ton 🎤
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-tom-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-12 h-12 gradient-pink rounded-xl flex items-center justify-center">
                <span className="text-white font-display text-2xl font-bold">T</span>
              </div>
              <div className="text-left">
                <h2 className="font-display text-xl font-bold leading-tight">TALKING TON</h2>
                <p className="text-xs text-tom-pink font-semibold">& FRIENDS</p>
              </div>
            </div>
            <p className="text-gray-400">© 2026 Talking Ton AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
