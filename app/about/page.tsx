import { Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';

const developers = [
  {
    name: "Laiba Ayub",
    role: "Full Stack Developer",
    image: "laiba.jpeg",
    bio: "Laiba is a skilled full-stack developer with a passion for building innovative solutions. She focuses on both frontend and backend technologies to create seamless user experiences.",
    social: {
      github: "https://github.com/laibaayub",
      linkedin: "https://linkedin.com/in/laibaayub",
      email: "laiba@vocalsense.ai"
    }
  },
  {
    name: "Iqra Amin",
    role: "AI & Backend Developer",
    image: "iqra.png",
    bio: "Iqra is an AI enthusiast with expertise in backend development. She works on improving our transcription engine, leveraging machine learning models to enhance accuracy and efficiency.",
    social: {
      github: "https://github.com/iqraamin",
      linkedin: "https://linkedin.com/in/iqraamin",
      email: "iqra@vocalsense.ai"
    }
  }
];

export default function About() {
  return (
    <main className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Meet Our Team</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
          We're a passionate team of developers dedicated to making voice transcription accessible and accurate for everyone.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {developers.map((dev) => (
            <div key={dev.name} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
              <div className="flex flex-col items-center text-center">
                <Image
                  src={dev.image}
                  alt={dev.name}
                  width={100}
                  height={100}
                  className="w-32 h-32 rounded-full mb-6 object-cover"
                />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{dev.name}</h2>
                <p className="text-purple-500 font-medium mb-4">{dev.role}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-6">{dev.bio}</p>
                
                <div className="flex space-x-4">
                  <a
                    href={dev.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href={dev.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href={`mailto:${dev.social.email}`}
                    className="text-gray-600 dark:text-gray-400 hover:text-purple-500 dark:hover:text-purple-400"
                  >
                    <Mail className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* About the Website Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About the Website</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            VocalsenseAI is an advanced AI-powered platform designed to convert audio files into accurate, editable text. Whether you're a student, journalist, or professional, our platform offers fast and reliable transcription services, saving you time and effort.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We use cutting-edge machine learning models and state-of-the-art algorithms to provide high-quality transcriptions, while maintaining the utmost security and privacy for your data.
          </p>
        </section>

        {/* Contact Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Have any questions or need support? Feel free to reach out to us!
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Email: <a href="mailto:contact@vocalsense.ai" className="text-purple-500">contact@vocalsense.ai</a><br />
            Support Hours: Monday to Friday, 9 AM - 6 PM EST
          </p>
        </section>
      </div>
    </main>
  );
}
