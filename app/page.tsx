
import { Mic, Waves, FileAudio, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';



export default async function Home() {
 
  return (
    <main className="container mx-auto px-6 md:pt-10">
      <div className="py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
          Transform Your Voice
          <span className="text-purple-500"> Into Text</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Experience state-of-the-art audio transcription powered by advanced AI. 
          Convert speeches, meetings, and interviews into accurate text in seconds.
        </p>
        <div className="flex justify-center space-x-4">
        <Link href="/transcribe">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all flex items-center">
            Start Transcribing <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          </Link>
          <Link href="/about">
  
    <button className="border border-purple-500 text-purple-500 hover:bg-purple-500/10 px-8 py-4 rounded-full font-medium transition-all">
      About Us
    </button>

</Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 py-20">
        <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
          <div className="bg-purple-500/20 p-3 rounded-lg w-fit mb-4">
            <Mic className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Real-time Transcription</h3>
          <p className="text-gray-600 dark:text-gray-400">Convert speech to text instantly with our powerful real-time processing engine.</p>
        </div>
        <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
          <div className="bg-purple-500/20 p-3 rounded-lg w-fit mb-4">
            <FileAudio className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Multiple Formats</h3>
          <p className="text-gray-600 dark:text-gray-400">Support for various audio formats including MP3, WAV, and M4A files.</p>
        </div>
        <div className="bg-white dark:bg-slate-800/50 p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all">
          <div className="bg-purple-500/20 p-3 rounded-lg w-fit mb-4">
            <Sparkles className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">99% Accuracy</h3>
          <p className="text-gray-600 dark:text-gray-400">Industry-leading accuracy powered by advanced machine learning models.</p>
        </div>
      </div>

      {/* Social Proof */}
      <div className="py-20 text-center">
        <div className="bg-gradient-to-r from-purple-500/20 via-purple-500/10 to-transparent p-12 rounded-3xl">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Trusted by Industry Leaders</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {['Microsoft', 'Google', 'Amazon', 'Meta'].map((company) => (
              <div key={company} className="text-gray-600 dark:text-gray-400 text-xl font-semibold">{company}</div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 text-center">
        <div className="bg-purple-600/20 p-12 rounded-3xl border border-purple-500/30">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Transform your audio into text with unmatched accuracy.</p>
          <Link href="/transcribe">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all">
            Start Free
          </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
