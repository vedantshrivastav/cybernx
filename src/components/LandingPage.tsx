"use client"
import React, { useEffect } from "react";
import { Building2, BarChart, PlusCircle, PieChart } from "lucide-react";
import { useDarkMode } from "@/components/darkModeContext";
import { useRouter } from "next/navigation"; // ✅ Use `next/navigation` in App Router

const LandingPage: React.FC = () => {
  const { darkMode } = useDarkMode();

  // const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // useEffect(() => {
  //   if (typeof window !== "undefined" && isSignedIn) {
  //     router.push('/dashboard');
  //   }
  // }, [isSignedIn, router]);


  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
      {/* <Header /> */}
      {/* Hero Section */}
      <div className="relative overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
              Effortless <span className="text-blue-600">Vendor Management </span> at Your Fingertips
            </h1>
            <p className={`text-lg mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Vendor&apos;s Hub simplifies vendor onboarding, tracks performance, and provides a centralized dashboard to add and view vendors—helping you optimize your supply chain efficiently, all in one place
            </p>
            <div className="space-x-4">
              <button onClick={() => router.push('./dashboard')} className="bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                Get Started
              </button>
            </div>
          </div>
          <div>
            {/* <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
              alt="Vendor Management"
              className="rounded-lg shadow-2xl w-full"
              loading="lazy"
            /> */}
            <video
              src="/video/Managment_video.mp4"
              className="rounded-lg shadow-2xl w-full"
              autoPlay
              loop
              muted
              playsInline
            ></video>

          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">
        <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Everything you need to manage vendors effectively
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard icon={<Building2 className="w-8 h-8 text-blue-600" />} title="Vendor Onboarding" description="Streamline the process of adding and qualifying new vendors" />
          <FeatureCard icon={<BarChart className="w-8 h-8 text-blue-600" />} title="Performance Tracking" description="Monitor and evaluate vendor performance metrics" />
          <FeatureCard icon={<PieChart className="w-8 h-8 text-blue-600" />} title="Vendor Analytics" description="Track vendor performance with insightful metrics" />

          <FeatureCard icon={<PlusCircle className="w-8 h-8 text-blue-600" />} title="Easy Onboarding" description="Seamlessly add and manage vendors in one place" />

        </div>
      </div>

      {/* CTA Section */}
      <div className={`${darkMode ? "bg-blue-900" : "bg-blue-600"} text-white py-16 text-center`}>
        <h2 className="text-3xl font-bold mb-4">Ready to transform your vendor management?</h2>
        <p className="text-lg mb-8 text-blue-100">Join thousands of companies already using Vendor&apos;s Hub</p>
        <button onClick={() => router.push('/dashboard')} className={`cursor-pointer ${darkMode ? "bg-white text-blue-900" : "bg-white text-blue-600"} px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300`}>
          Get Started
        </button>
      </div>
    </div>
  );
};

// FeatureCard Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  const { darkMode } = useDarkMode();

  return (
    <div className={`p-6 rounded-lg shadow-lg transition duration-300 ${darkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-white hover:shadow-xl"}`}>
      <div className="mb-4">{icon}</div>
      <h3 className={`text-xl font-semibold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>{title}</h3>
      <p className={darkMode ? "text-gray-300" : "text-gray-600"}>{description}</p>
    </div>
  );
};

export default LandingPage;
