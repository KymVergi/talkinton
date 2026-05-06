'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Language {
  code: string;
  name: string;
  voice?: SpeechSynthesisVoice;
}

export default function ChatPage() {
  const [isListening, setIsListening] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [userText, setUserText] = useState('');
  const [tonText, setTonText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [recognition, setRecognition] = useState<any>(null);
  const [synth, setSynth] = useState<SpeechSynthesis | null>(null);
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Initialize audio on first user interaction
  const initializeAudio = useCallback(() => {
    if (!audioInitialized && synth) {
      const utterance = new SpeechSynthesisUtterance('');
      synth.speak(utterance);
      setAudioInitialized(true);
      console.log('Audio initialized');
    }
  }, [synth, audioInitialized]);

  // Speech synthesis function
  const speakText = useCallback((text: string) => {
    console.log('speakText called with:', text);
    
    if (!synth) {
      console.error('Synth not available');
      return;
    }

    if (!selectedLanguage?.voice) {
      console.error('No voice selected');
      return;
    }

    initializeAudio();
    synth.cancel();

    setTimeout(() => {
      setIsTalking(true);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedLanguage.voice!;
      utterance.pitch = 1.5;
      utterance.rate = 0.9;
      utterance.volume = 1.0;
      utterance.lang = selectedLanguage.code;

      utterance.onend = () => {
        setIsTalking(false);
      };

      utterance.onerror = () => {
        setIsTalking(false);
      };

      synth.speak(utterance);
    }, 50);
  }, [synth, selectedLanguage, initializeAudio]);

  // Crypto-focused response generator
  const generateCryptoResponse = useCallback((text: string): string => {
    const lowerText = text.toLowerCase();
    
    // TON Blockchain specific
    if (lowerText.includes('ton') || lowerText.includes('toncoin')) {
      const tonResponses = [
        'TON Blockchain is amazing! It was originally developed by Telegram and is super fast with low fees.',
        'TON uses a unique multi-blockchain architecture. It can process millions of transactions per second!',
        'The TON ecosystem is growing fast! There are tons of dApps, DeFi projects, and NFTs being built on it.',
        'TON has its own DNS system called TON DNS. You can have human-readable addresses instead of long crypto addresses!',
        'Toncoin is the native cryptocurrency of TON Blockchain. It\'s used for transaction fees and staking.',
        'TON Blockchain uses Proof of Stake consensus, which makes it super energy efficient compared to Bitcoin.',
        'Did you know TON can handle sharding? This means it can split into multiple chains for better scalability!',
      ];
      return tonResponses[Math.floor(Math.random() * tonResponses.length)];
    }
    
    // Bitcoin
    if (lowerText.includes('bitcoin') || lowerText.includes('btc')) {
      const btcResponses = [
        'Bitcoin is the first and most famous cryptocurrency! Created by the mysterious Satoshi Nakamoto in 2009.',
        'Bitcoin uses Proof of Work consensus. Miners solve complex puzzles to validate transactions.',
        'There will only ever be 21 million Bitcoin! That\'s what makes it scarce and valuable.',
        'Bitcoin is often called digital gold because people use it as a store of value.',
        'The Bitcoin halving happens every 4 years, reducing the mining reward by half. The next one is coming soon!',
      ];
      return btcResponses[Math.floor(Math.random() * btcResponses.length)];
    }
    
    // Ethereum
    if (lowerText.includes('ethereum') || lowerText.includes('eth')) {
      const ethResponses = [
        'Ethereum is the king of smart contracts! It allows developers to build decentralized applications.',
        'Ethereum switched to Proof of Stake in 2022 with The Merge. It\'s now much more energy efficient!',
        'Vitalik Buterin created Ethereum when he was just 19 years old. Talk about genius!',
        'Ethereum has the largest developer community in crypto. Most DeFi and NFT projects are built on it.',
        'Layer 2 solutions like Arbitrum and Optimism make Ethereum faster and cheaper to use!',
      ];
      return ethResponses[Math.floor(Math.random() * ethResponses.length)];
    }
    
    // DeFi
    if (lowerText.includes('defi') || lowerText.includes('decentralized finance')) {
      const defiResponses = [
        'DeFi stands for Decentralized Finance! It lets you borrow, lend, and trade without banks or middlemen.',
        'DeFi protocols use smart contracts to automate everything. No humans needed to approve your loan!',
        'You can earn yield by providing liquidity to DeFi protocols. Some APYs are crazy high!',
        'Popular DeFi platforms include Uniswap, Aave, and Compound. They handle billions of dollars!',
        'DeFi is revolutionizing finance! Anyone with internet can access these services, no permission needed.',
      ];
      return defiResponses[Math.floor(Math.random() * defiResponses.length)];
    }
    
    // NFTs
    if (lowerText.includes('nft') || lowerText.includes('non fungible')) {
      const nftResponses = [
        'NFTs are unique digital assets! Each one is different and can represent art, music, or even real estate.',
        'NFTs use blockchain technology to prove ownership. You can verify the entire history of who owned it!',
        'The most expensive NFT ever sold was Beeple\'s "Everydays" for 69 million dollars! Crazy, right?',
        'NFTs aren\'t just images! They can be game items, concert tickets, or membership passes.',
        'TON Blockchain has its own NFT marketplace too! You can mint and trade NFTs with super low fees.',
      ];
      return nftResponses[Math.floor(Math.random() * nftResponses.length)];
    }
    
    // Staking
    if (lowerText.includes('stak')) {
      const stakingResponses = [
        'Staking is like earning interest on your crypto! You lock up coins to help secure the network.',
        'With Proof of Stake, you can become a validator by staking your coins. You earn rewards for processing transactions!',
        'Staking rewards vary by blockchain. TON offers competitive staking rewards for Toncoin holders!',
        'You can stake directly or use staking pools. Pools let you stake even small amounts of crypto.',
        'Liquid staking is cool! You get a token representing your staked assets, so you can still use them in DeFi.',
      ];
      return stakingResponses[Math.floor(Math.random() * stakingResponses.length)];
    }
    
    // Web3
    if (lowerText.includes('web3') || lowerText.includes('web 3')) {
      const web3Responses = [
        'Web3 is the future of the internet! It\'s decentralized, owned by users, not corporations.',
        'In Web3, you control your own data. No more companies selling your information!',
        'Web3 uses blockchain technology to create trustless systems. No need to trust a central authority.',
        'MetaMask and other crypto wallets are your passport to Web3. One wallet, access to thousands of apps!',
        'TON is building amazing Web3 infrastructure with TON Sites and TON Storage. The decentralized web is coming!',
      ];
      return web3Responses[Math.floor(Math.random() * web3Responses.length)];
    }
    
    // Wallet
    if (lowerText.includes('wallet')) {
      const walletResponses = [
        'Crypto wallets store your private keys, not your actual crypto! Your coins live on the blockchain.',
        'Never share your seed phrase with anyone! It\'s like the master key to all your crypto.',
        'Hardware wallets like Ledger are the most secure. They keep your keys offline, safe from hackers!',
        'TON has the Tonkeeper wallet. It\'s super user-friendly and integrates with Telegram!',
        'Always write down your seed phrase on paper and store it somewhere safe. Don\'t take screenshots!',
      ];
      return walletResponses[Math.floor(Math.random() * walletResponses.length)];
    }
    
    // Mining
    if (lowerText.includes('min')) {
      const miningResponses = [
        'Mining is how new Bitcoin gets created! Miners use powerful computers to solve complex math problems.',
        'Bitcoin mining uses a LOT of energy. That\'s why many blockchains switched to Proof of Stake.',
        'You can mine some cryptocurrencies with regular computers, but Bitcoin requires specialized ASIC hardware.',
        'Mining rewards decrease over time. Bitcoin\'s halving cuts the reward in half every 4 years!',
        'TON doesn\'t use mining! It uses validators and Proof of Stake instead, which is much more eco-friendly.',
      ];
      return miningResponses[Math.floor(Math.random() * miningResponses.length)];
    }
    
    // Price/Investment
    if (lowerText.includes('price') || lowerText.includes('invest') || lowerText.includes('buy')) {
      const investmentResponses = [
        'I can\'t give financial advice, but I can tell you about the technology! Always do your own research before investing.',
        'Crypto markets are super volatile! Only invest what you can afford to lose.',
        'Dollar-cost averaging is a popular strategy. Buy a little bit regularly instead of timing the market!',
        'DYOR - Do Your Own Research! Read the whitepaper, check the team, understand the technology.',
        'Never invest based on hype or FOMO! Understand what you\'re buying and why it has value.',
      ];
      return investmentResponses[Math.floor(Math.random() * investmentResponses.length)];
    }
    
    // Smart Contracts
    if (lowerText.includes('smart contract')) {
      const contractResponses = [
        'Smart contracts are self-executing programs on the blockchain! The code is the law.',
        'Once deployed, smart contracts can\'t be changed. That\'s why audits are so important!',
        'Smart contracts power all of DeFi, NFTs, and DAOs. They\'re the building blocks of Web3!',
        'Ethereum pioneered smart contracts, but now many blockchains support them, including TON!',
        'Smart contracts eliminate the need for middlemen. The code automatically executes when conditions are met.',
      ];
      return contractResponses[Math.floor(Math.random() * contractResponses.length)];
    }
    
    // Gas fees
    if (lowerText.includes('gas') || lowerText.includes('fee')) {
      const gasResponses = [
        'Gas fees are transaction costs on the blockchain. They pay validators for processing your transaction.',
        'Ethereum gas fees can get super expensive during busy times! That\'s why Layer 2s are so important.',
        'TON has incredibly low fees! Usually just fractions of a cent per transaction.',
        'You can often adjust gas fees - pay more for faster confirmation, or less if you can wait.',
        'Gas fees vary by blockchain. Bitcoin fees, Ethereum fees, and TON fees work differently!',
      ];
      return gasResponses[Math.floor(Math.random() * gasResponses.length)];
    }
    
    // Blockchain in general
    if (lowerText.includes('blockchain') || lowerText.includes('crypto')) {
      const blockchainResponses = [
        'Blockchain is a distributed ledger technology! Everyone has a copy, so no single point of failure.',
        'Blockchain is immutable - once data is written, it can\'t be changed. Perfect for tracking ownership!',
        'Different blockchains have different purposes. Some focus on speed, others on security or decentralization.',
        'The blockchain trilemma: it\'s hard to achieve scalability, security, AND decentralization all at once!',
        'Public blockchains are transparent - anyone can verify transactions. Private ones restrict access.',
      ];
      return blockchainResponses[Math.floor(Math.random() * blockchainResponses.length)];
    }
    
    // Default responses with crypto flavor
    const generalResponses = [
      'That\'s interesting! Let me tell you about TON Blockchain - it\'s one of the fastest and most scalable blockchains out there!',
      'Cool! Did you know cryptocurrencies are revolutionizing how we think about money and ownership?',
      'Awesome! The future of finance is decentralized. Blockchain technology is making that possible!',
      'Nice! Have you heard about DeFi? It\'s bringing banking services to anyone with an internet connection.',
      'Great! Web3 is going to change the internet as we know it. Decentralization is the future!',
      'Interesting! TON Blockchain can process millions of transactions per second. That\'s incredible scalability!',
      'Tell me more! I love talking about cryptocurrency and blockchain technology.',
      'That\'s cool! By the way, TON has some amazing features like TON DNS and TON Storage. The ecosystem is growing fast!',
    ];
    
    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }, []);

  // Handle user speech
  const handleUserSpeech = useCallback((text: string) => {
    console.log('handleUserSpeech called with:', text);
    
    const response = generateCryptoResponse(text);
    console.log('Response generated:', response);
    
    setTonText(response);
    speakText(response);
  }, [speakText, generateCryptoResponse]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const speechSynth = window.speechSynthesis;
      setSynth(speechSynth);

      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.interimResults = false;
        recognitionInstance.maxAlternatives = 1;
        setRecognition(recognitionInstance);

        recognitionInstance.addEventListener('result', (e: any) => {
          const last = e.results.length - 1;
          const text = e.results[last][0].transcript;
          console.log('Recognition result:', text);
          setUserText(text);
        });

        recognitionInstance.addEventListener('speechend', () => {
          recognitionInstance.stop();
          setIsListening(false);
        });

        recognitionInstance.addEventListener('error', (e: any) => {
          console.error('Recognition error:', e.error);
          setIsListening(false);
        });
      }
    }
  }, []);

  useEffect(() => {
    if (userText && userText.length > 0) {
      handleUserSpeech(userText);
    }
  }, [userText, handleUserSpeech]);

  useEffect(() => {
    if (synth) {
      const loadVoices = () => {
        const voices = synth.getVoices();
        
        if (voices.length === 0) return;
        
        const languageMap: { [key: string]: Language } = {};

        voices.forEach(voice => {
          const langCode = voice.lang.split('-')[0];
          if (!languageMap[langCode]) {
            languageMap[langCode] = {
              code: voice.lang,
              name: voice.lang,
              voice: voice,
            };
          }
        });

        const langs = Object.values(languageMap);
        setLanguages(langs);

        if (!selectedLanguage && langs.length > 0) {
          const googleEnglish = voices.find(v => v.lang.startsWith('en') && v.name.includes('Google'));
          const anyEnglish = langs.find(l => l.code.startsWith('en'));
          const defaultLang = googleEnglish ? 
            { code: googleEnglish.lang, name: googleEnglish.lang, voice: googleEnglish } : 
            (anyEnglish || langs[0]);
          
          setSelectedLanguage(defaultLang);
          if (recognition) {
            recognition.lang = defaultLang.code;
          }
        }
      };

      loadVoices();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
      }
      
      setTimeout(loadVoices, 100);
      setTimeout(loadVoices, 500);
    }
  }, [synth, recognition, selectedLanguage]);

  const startListening = () => {
    initializeAudio();
    
    if (recognition) {
      setIsListening(true);
      setUserText('');
      setTonText('');
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setIsListening(false);
      }
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const langCode = e.target.value;
    const lang = languages.find(l => l.code === langCode);
    if (lang) {
      setSelectedLanguage(lang);
      if (recognition) {
        recognition.lang = lang.code;
      }
    }
  };

  const testSpeech = () => {
    initializeAudio();
    speakText('Hello! I\'m Ton, your crypto expert! Ask me anything about TON Blockchain, Bitcoin, Ethereum, DeFi, NFTs, or any cryptocurrency topic!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-tom-purple to-tom-pink">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 gradient-pink rounded-xl flex items-center justify-center">
              <span className="text-white font-display text-2xl font-bold">T</span>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-tom-navy leading-tight">
                TALKING TON
              </h1>
              <p className="text-xs text-tom-pink font-semibold">CRYPTO EXPERT</p>
            </div>
          </Link>
          <Link
            href="/"
            className="text-tom-navy font-semibold hover:text-tom-purple transition-colors"
          >
            ← Back
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-4">
              Talk with Ton 💎
            </h2>
            <p className="text-xl text-white/90 mb-2">
              Your friendly crypto expert!
            </p>
            <p className="text-lg text-white/80">
              Ask me about TON Blockchain, Bitcoin, Ethereum, DeFi, NFTs, or anything crypto!
            </p>
          </motion.div>

          {/* Test Button */}
          <div className="mb-4 text-center">
            <button
              onClick={testSpeech}
              className="bg-yellow-500 text-black font-bold px-8 py-3 rounded-full hover:bg-yellow-400 shadow-lg text-lg"
            >
              🔊 Test Ton&apos;s Voice
            </button>
          </div>

          {/* Language Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8 text-center"
          >
            <label htmlFor="language" className="text-white font-semibold text-lg block mb-2">
              Select Ton&apos;s Language
            </label>
            <select
              id="language"
              value={selectedLanguage?.code || ''}
              onChange={handleLanguageChange}
              className="px-6 py-3 rounded-full text-lg font-semibold bg-white text-tom-navy shadow-lg focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.voice?.name}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Ton Character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative mb-8"
          >
            <div className="bg-white rounded-3xl p-8 shadow-2xl">
              <div className="relative">
                <div className="relative max-w-md mx-auto">
                  <AnimatePresence mode="wait">
                    {isListening ? (
                      <motion.div
                        key="listening"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full rounded-2xl cursor-pointer"
                        onClick={startListening}
                      >
                        <Image
                          src="/images/tom_listening.jpg"
                          alt="Ton Listening"
                          width={500}
                          height={500}
                          className="w-full rounded-2xl"
                        />
                      </motion.div>
                    ) : isTalking ? (
                      <motion.div
                        key="talking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full rounded-2xl"
                      >
                        <Image
                          src="/images/tom_talking.gif"
                          alt="Ton Talking"
                          width={500}
                          height={500}
                          className="w-full rounded-2xl"
                          unoptimized
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="normal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full rounded-2xl cursor-pointer hover:scale-105 transition-transform"
                        onClick={startListening}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Image
                          src="/images/Tom.jpg"
                          alt="Ton"
                          width={500}
                          height={500}
                          className="w-full rounded-2xl"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isListening && !isTalking && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute top-4 right-4 bg-tom-pink text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                    >
                      👆 Ask me about crypto!
                    </motion.div>
                  )}

                  {isListening && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                    >
                      🎤 Listening...
                    </motion.div>
                  )}

                  {isTalking && (
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                      className="absolute top-4 left-4 bg-tom-purple text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                    >
                      🗣️ Talking...
                    </motion.div>
                  )}
                </div>

                {/* Conversation Display */}
                <div className="mt-8 space-y-4">
                  <AnimatePresence>
                    {userText && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-100 rounded-2xl p-4"
                      >
                        <p className="text-gray-500 text-sm font-semibold mb-1">You asked:</p>
                        <p className="text-gray-900 text-lg">{userText}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <AnimatePresence>
                    {tonText && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="gradient-purple text-white rounded-2xl p-4"
                      >
                        <p className="text-white/80 text-sm font-semibold mb-1">Ton explained:</p>
                        <p className="text-white text-lg font-semibold">{tonText}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6"
          >
            <h3 className="font-display text-2xl font-bold text-tom-navy mb-4 text-center">
              💡 Topics I Know About
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-xl">
                <div className="text-3xl mb-2">💎</div>
                <div className="font-bold">TON Blockchain</div>
                <div className="text-sm opacity-90">Speed, scalability, ecosystem</div>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-xl">
                <div className="text-3xl mb-2">₿</div>
                <div className="font-bold">Bitcoin & Ethereum</div>
                <div className="text-sm opacity-90">History, technology, mining</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-xl">
                <div className="text-3xl mb-2">🏦</div>
                <div className="font-bold">DeFi & NFTs</div>
                <div className="text-sm opacity-90">Protocols, staking, trading</div>
              </div>
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              Tap Ton and ask questions like: &quot;What is TON?&quot; &quot;How does DeFi work?&quot; &quot;Tell me about NFTs&quot;
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
