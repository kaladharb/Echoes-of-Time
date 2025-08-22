import React, { useState } from "react";
import { ArrowLeft, Clock, MapPin, Calendar } from "lucide-react";
import Gallery from "./components/Gallery";
import LocationView from "./components/LocationView";
import { locations } from "./data/locations";
import { Location } from "./types";

function App() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Echoes of Time
                </h1>
                <p className="text-sm text-gray-600">Through the Ages</p>
              </div>
            </div>

            {selectedLocation && (
              <button
                onClick={() => setSelectedLocation(null)}
                className="flex items-center space-x-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Gallery</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {selectedLocation ? (
          <LocationView
            location={selectedLocation}
            onBack={() => setSelectedLocation(null)}
          />
        ) : (
          <Gallery
            locations={locations}
            onLocationSelect={setSelectedLocation}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-700 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">Echoes of Time</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Discover the fascinating evolution of Telangana's landmarks
                through interactive historical photography comparisons, from the
                Kakatiya era to modern times.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Nizam Heritage
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Hyderabad Development
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cultural Monuments
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Modern Telangana
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">About</h4>
              <p className="text-gray-400 leading-relaxed">
                A digital preservation project showcasing the transformation of
                Telangana from the Deccan Sultanate through the Nizam era to the
                modern state, connecting our rich past with the present.
              </p>
              <p className="text-sm text-gray-600">
                Telangana Through the Ages
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Echoes of Time: Telangana. Preserving our heritage for
              future generations.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
