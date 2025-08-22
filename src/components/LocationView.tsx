import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  ArrowLeft,
  Tag,
  Clock,
  Info,
  Crown,
  Building,
  Image as ImageIcon,
} from "lucide-react";
import { Location } from "../types";
import ImageComparison from "./ImageComparison";

interface LocationViewProps {
  location: Location;
  onBack: () => void;
}

const LocationView: React.FC<LocationViewProps> = ({ location, onBack }) => {
  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "historical"
    | "changes"
    | "significance"
    | "rulers"
    | "gallery"
  >("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "historical", label: "Historical", icon: Clock },
    { id: "changes", label: "Changes", icon: ArrowLeft },
    { id: "significance", label: "Significance", icon: Tag },
    ...(location.rulers
      ? [{ id: "rulers", label: "Rulers", icon: Crown }]
      : []),
    { id: "gallery", label: "Gallery", icon: ImageIcon },
  ] as const;

  const renderTabContent = () => {
    if (activeTab === "rulers" && location.rulers) {
      return (
        <div className="space-y-6">
          {location.rulers.map((ruler, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start space-x-6">
                <img
                  src={ruler.portrait}
                  alt={ruler.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-amber-200"
                />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {ruler.name}
                  </h3>
                  <p className="text-amber-700 font-medium text-lg mb-2">
                    {ruler.title}
                  </p>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {ruler.reign}
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">
                      Key Achievements:
                    </h4>
                    {ruler.achievements.map((achievement, idx) => (
                      <p key={idx} className="text-gray-700 flex items-start">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {achievement}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "gallery") {
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {location.gallery.map((image, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-xl"
            >
              <img
                src={image}
                alt={`${location.title} - Image ${index + 1}`}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 leading-relaxed text-lg">
          {location.story[activeTab as keyof typeof location.story]}
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-amber-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {location.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span className="font-medium">{location.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                <span className="font-medium">{location.year}</span>
              </div>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                {location.period}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {location.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center space-x-1 text-sm text-gray-700 bg-gray-100 px-3 py-2 rounded-lg"
              >
                <Tag className="w-4 h-4" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Image Comparison */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-amber-100">
        <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Then & Now Comparison
          </h2>
          <p className="text-gray-600">
            Drag the slider to explore the transformation over time
          </p>
        </div>
        <ImageComparison
          beforeImage={location.thenImage}
          afterImage={location.nowImage}
          beforeLabel={`Then (${location.year})`}
          afterLabel="Now"
        />
      </div>

      {/* Story Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">The Story</h2>
          <p className="text-gray-600">
            Discover the rich history and transformation of this landmark
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? "border-amber-500 text-amber-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-8">{renderTabContent()}</div>
      </div>

      {/* Architecture Details */}
      {location.architecture && (
        <div className="bg-white rounded-2xl shadow-lg border border-amber-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-blue-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
              <Building className="w-6 h-6 mr-3 text-blue-600" />
              Architectural Details
            </h2>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Style</h3>
                <p className="text-gray-700">{location.architecture.style}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Materials</h3>
                <ul className="text-gray-700 space-y-1">
                  {location.architecture.materials.map((material, index) => (
                    <li key={index} className="text-sm">
                      • {material}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Key Features
                </h3>
                <ul className="text-gray-700 space-y-1">
                  {location.architecture.features
                    .slice(0, 3)
                    .map((feature, index) => (
                      <li key={index} className="text-sm">
                        • {feature}
                      </li>
                    ))}
                </ul>
              </div>
              {location.architecture.dimensions && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Dimensions
                  </h3>
                  <p className="text-gray-700 text-sm">
                    {location.architecture.dimensions}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-amber-100">
          <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Era</h3>
          <p className="text-gray-600">{location.period}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-amber-100">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
          <p className="text-gray-600">{location.location}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-amber-100">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Age</h3>
          <p className="text-gray-600">
            {new Date().getFullYear() - parseInt(location.year)} years
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationView;
