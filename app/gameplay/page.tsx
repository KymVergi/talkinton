'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function GameplayPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 gradient-pink rounded-xl flex items-center justify-center">
              <span className="text-white font-display text-2xl font-bold">T</span>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-tom-navy leading-tight">
                TALKING TON
              </h1>
              <p className="text-xs text-tom-pink font-semibold">& FRIENDS</p>
            </div>
          </Link>
          <Link
            href="/"
            className="text-tom-navy font-semibold hover:text-tom-purple transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="pt-24">
        {/* Hero */}
        <section className="py-20 px-6 bg-gradient-to-br from-white to-gray-100">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-6xl md:text-8xl font-bold text-tom-navy mb-6"
            >
              Gameplay
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
            >
              Discover all the amazing features of My Talking Ton
            </motion.p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="gradient-purple text-white rounded-3xl p-8 md:p-12"
              >
                <h3 className="font-display text-4xl font-bold mb-6">
                  Feeding and Care
                </h3>
                <p className="text-lg leading-relaxed mb-6">
                  Feed Ton with delicious food, take him to the bathroom and make sure he sleeps well. Ton needs your care to grow happy and healthy!
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">🍔</span>
                    <span>Variety of nutritious foods</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">🛁</span>
                    <span>Keep Ton clean and fresh</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">😴</span>
                    <span>Adequate rest to recover energy</span>
                  </li>
                </ul>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="gradient-blue text-white rounded-3xl p-8 md:p-12"
              >
                <h3 className="font-display text-4xl font-bold mb-6">
                  Customization
                </h3>
                <p className="text-lg leading-relaxed mb-6">
                  Dress Ton in amazing outfits and decorate his house to your liking. Make Ton unique!
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">👕</span>
                    <span>Hundreds of outfits and accessories</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">🏠</span>
                    <span>Furniture and decorations for his house</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">✨</span>
                    <span>Special effects and hidden surprises</span>
                  </li>
                </ul>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="gradient-pink text-white rounded-3xl p-8 md:p-12"
              >
                <h3 className="font-display text-4xl font-bold mb-6">
                  Mini-Games
                </h3>
                <p className="text-lg leading-relaxed mb-6">
                  Play fun mini-games to earn coins and diamonds. The fun never ends!
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">🎮</span>
                    <span>Flappy Ton, Cake Tower and more</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">💎</span>
                    <span>Earn valuable rewards</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">🏆</span>
                    <span>Unlock special achievements</span>
                  </li>
                </ul>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="gradient-navy text-white rounded-3xl p-8 md:p-12"
              >
                <h3 className="font-display text-4xl font-bold mb-6">
                  Interaction and Voice
                </h3>
                <p className="text-lg leading-relaxed mb-6">
                  Talk to Ton and he will repeat everything you say with his signature voice. Tap different parts of his body for funny reactions!
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">🎤</span>
                    <span>Voice repeat function</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">👆</span>
                    <span>Fun touch interactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-2xl">😂</span>
                    <span>Hilarious reactions and animations</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-6 gradient-purple text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Try Chatting with Ton!
            </h3>
            <p className="text-xl mb-8">
              Experience the magic of talking to Ton directly in your browser
            </p>
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-tom-purple font-display text-2xl font-bold px-12 py-6 rounded-full shadow-2xl"
              >
                Talk to Ton 🎤
              </motion.button>
            </Link>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-tom-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
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
      </footer>
    </div>
  );
}