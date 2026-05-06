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
  const [debugInfo, setDebugInfo] = useState('');

  // Speech synthesis function
  const speakText = useCallback((text: string) => {
    console.log('speakText called with:', text);
    
    if (!synth) {
      console.error('Synth not available');
      setDebugInfo('Speech synthesis not available');
      return;
    }

    if (!selectedLanguage?.voice) {
      console.error('No voice selected');
      setDebugInfo('No voice selected');
      return;
    }

    // Cancel any ongoing speech
    synth.cancel();

    setIsTalking(true);
    setDebugInfo('Speaking: ' + text);
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedLanguage.voice;
    utterance.pitch = 1.5;
    utterance.rate = 0.9;
    utterance.volume = 1;

    utterance.onstart = () => {
      console.log('Speech started');
      setDebugInfo('Speech started');
    };

    utterance.onend = () => {
      console.log('Speech ended');
      setIsTalking(false);
      setDebugInfo('Speech ended');
    };

    utterance.onerror = (event) => {
      console.error('Speech error:', event);
      setIsTalking(false);
      setDebugInfo('Speech error: ' + event.error);
    };

    console.log('Speaking with voice:', utterance.voice?.name);
    synth.speak(utterance);
  }, [synth, selectedLanguage]);

  // Handle user speech
  const handleUserSpeech = useCallback((text: string) => {
    console.log('handleUserSpeech called with:', text);
    
    const responses = [
      'Hello! How are you doing?',
      'That sounds awesome!',
      'How interesting!',
      'Tell me more!',
      'I love talking with you!',
      'You are so funny!',
      'Wow, that is amazing!',
      'Really? That\'s cool!',
      'I like that!',
      'You make me happy!',
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    console.log('Response generated:', randomResponse);
    
    setTonText(randomResponse);
    
    // Small delay to ensure state updates
    setTimeout(() => {
      speakText(randomResponse);
    }, 100);
  }, [speakText]);

  useEffect(() => {
    // Initialize speech synthesis
    if (typeof window !== 'undefined') {
      const speechSynth = window.speechSynthesis;
      setSynth(speechSynth);
      console.log('Speech synthesis initialized:', speechSynth);

      // Initialize speech recognition
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

        recognitionInstance.addEventListener('speechstart', () => {
          console.log('Speech detected');
        });

        recognitionInstance.addEventListener('speechend', () => {
          recognitionInstance.stop();
          setIsListening(false);
        });

        recognitionInstance.addEventListener('error', (e: any) => {
          console.error('Recognition error:', e.error);
          setIsListening(false);
          setDebugInfo('Recognition error: ' + e.error);
        });
      } else {
        console.error('Speech recognition not supported');
        setDebugInfo('Speech recognition not supported in this browser');
      }
    }
  }, []);

  // Call handleUserSpeech when userText changes
  useEffect(() => {
    if (userText && userText.length > 0) {
      console.log('userText changed, calling handleUserSpeech');
      handleUserSpeech(userText);
    }
  }, [userText, handleUserSpeech]);

  useEffect(() => {
    // Load available voices
    if (synth) {
      const loadVoices = () => {
        const voices = synth.getVoices();
        console.log('Available voices:', voices.length);
        
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
        console.log('Languages loaded:', langs.length);

        // Set English as default if not already set
        if (!selectedLanguage && langs.length > 0) {
          const englishLang = langs.find(l => l.code.startsWith('en')) || langs[0];
          console.log('Setting default language:', englishLang.code);
          setSelectedLanguage(englishLang);
          if (recognition) {
            recognition.lang = englishLang.code;
          }
        }
      };

      loadVoices();
      if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = loadVoices;
      }
    }
  }, [synth, recognition, selectedLanguage]);

  const startListening = () => {
    if (recognition) {
      console.log('Starting recognition');
      setIsListening(true);
      setUserText('');
      setTonText('');
      setDebugInfo('Listening...');
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        setDebugInfo('Error starting recognition');
        setIsListening(false);
      }
    } else {
      console.error('Recognition not initialized');
      setDebugInfo('Recognition not initialized');
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const langCode = e.target.value;
    const lang = languages.find(l => l.code === langCode);
    if (lang) {
      console.log('Language changed to:', lang.code);
      setSelectedLanguage(lang);
      if (recognition) {
        recognition.lang = lang.code;
      }
    }
  };

  // Test speech function
  const testSpeech = () => {
    console.log('Testing speech...');
    speakText('Hello! This is a test.');
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
              <p className="text-xs text-tom-pink font-semibold">& FRIENDS</p>
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
              Talk with Ton
            </h2>
            <p className="text-xl text-white/90">
              Tap Ton on the head to start talking
            </p>
          </motion.div>

          {/* Debug Info */}
          {debugInfo && (
            <div className="mb-4 bg-black/50 text-white p-4 rounded-lg text-sm font-mono">
              Debug: {debugInfo}
            </div>
          )}

          {/* Test Button */}
          <div className="mb-4 text-center">
            <button
              onClick={testSpeech}
              className="bg-yellow-500 text-black font-bold px-6 py-2 rounded-full hover:bg-yellow-400"
            >
              🔊 Test Speech
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
              Select Ton&apos;s Language ({languages.length} available)
            </label>
            <select
              id="language"
              value={selectedLanguage?.code || ''}
              onChange={handleLanguageChange}
              className="px-6 py-3 rounded-full text-lg font-semibold bg-white text-tom-navy shadow-lg focus:outline-none focus:ring-4 focus:ring-white/50"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.voice?.name} ({lang.code})
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
                {/* Ton Image */}
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

                  {/* Click indicator */}
                  {!isListening && !isTalking && (
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute top-4 right-4 bg-tom-pink text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                    >
                      👆 Tap me!
                    </motion.div>
                  )}

                  {/* Listening indicator */}
                  {isListening && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="absolute top-4 left-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg"
                    >
                      🎤 Listening...
                    </motion.div>
                  )}

                  {/* Talking indicator */}
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
                        <p className="text-gray-500 text-sm font-semibold mb-1">You said:</p>
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
                        <p className="text-white/80 text-sm font-semibold mb-1">Ton replied:</p>
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
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 text-center"
          >
            <h3 className="font-display text-2xl font-bold text-tom-navy mb-4">
              How to Use
            </h3>
            <ol className="text-left space-y-2 text-gray-700 max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <span className="font-bold text-tom-pink">1.</span>
                <span>Click the &quot;Test Speech&quot; button to verify audio works</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-tom-pink">2.</span>
                <span>Select Ton&apos;s language above</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-tom-pink">3.</span>
                <span>Tap Ton&apos;s image to activate the microphone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-tom-pink">4.</span>
                <span>Speak clearly into the microphone</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-tom-pink">5.</span>
                <span>Listen to Ton&apos;s response with his signature voice!</span>
              </li>
            </ol>
          </motion.div>
        </div>
      </div>
    </div>
  );
}