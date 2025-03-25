import Image from "next/image";
import LogoSpinner from "../components/LogoSpinner";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-48 h-48 mx-auto mb-8">
            <LogoSpinner />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            3D Logo Creator
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Transform your brand with stunning 3D logos
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
            Create Your Logo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
            <p className="text-gray-400">Create professional 3D logos in minutes with our intuitive interface</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">High Quality</h3>
            <p className="text-gray-400">Export your logos in multiple formats with the highest quality</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Customizable</h3>
            <p className="text-gray-400">Fully customize every aspect of your 3D logo design</p>
          </div>
        </div>
      </main>
    </div>
  );
}
