import React from "react";
import {
  Crown,
  Calendar,
  MapPin,
  Users,
  Palette,
  Building,
} from "lucide-react";
import { Era } from "../types";
import { ArrowLeft } from "lucide-react";

interface EraViewProps {
  era: Era;
  onBack: () => void;
}

const EraView: React.FC<EraViewProps> = ({ era, onBack }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center space-x-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Gallery</span>
      </button>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <img
              src={era.image}
              alt={era.name}
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="md:w-2/3">
            <div className="flex items-center space-x-3 mb-4">
              <Crown className="w-8 h-8 text-amber-600" />
              <h1 className="text-4xl font-bold text-gray-900">{era.name}</h1>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span className="text-xl font-medium text-gray-700">
                {era.period}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              {era.description}
            </p>
          </div>
        </div>
      </div>

      {/* Key Rulers */}
      <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
            <Crown className="w-6 h-6 mr-3 text-amber-600" />
            Key Rulers
          </h2>
        </div>
        <div className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {era.keyRulers.map((ruler, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={ruler.portrait}
                    alt={ruler.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-amber-200"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {ruler.name}
                    </h3>
                    <p className="text-amber-700 font-medium mb-2">
                      {ruler.title}
                    </p>
                    <p className="text-gray-600 mb-3">{ruler.reign}</p>
                    <div className="space-y-1">
                      {ruler.achievements
                        .slice(0, 3)
                        .map((achievement, idx) => (
                          <p
                            key={idx}
                            className="text-sm text-gray-700 flex items-start"
                          >
                            <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {achievement}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Era Details Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Major Achievements */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-3 text-green-600" />
              Major Achievements
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {era.majorAchievements.map((achievement, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cultural Highlights */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Palette className="w-5 h-5 mr-3 text-purple-600" />
              Cultural Highlights
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {era.culturalHighlights.map((highlight, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Architecture */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <Building className="w-5 h-5 mr-3 text-blue-600" />
              Architectural Style
            </h3>
          </div>
          <div className="p-6">
            <ul className="space-y-3">
              {era.architecture.map((style, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{style}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Locations */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-b border-orange-100">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-orange-600" />
              Related Locations
            </h3>
          </div>
          <div className="p-6">
            <div className="text-gray-600 text-center py-4">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p>Explore locations from this era in the main gallery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EraView;
