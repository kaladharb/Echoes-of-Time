import React, { useState } from 'react';
import { Search, Calendar, MapPin, Tag, Crown, Clock } from 'lucide-react';
import { Location } from '../types';
import { eras } from '../data/eras';
import EraView from './EraView';

interface GalleryProps {
  locations: Location[];
  onLocationSelect: (location: Location) => void;
}

const Gallery: React.FC<GalleryProps> = ({ locations, onLocationSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'gallery' | 'eras'>('gallery');

  const periods = [...new Set(locations.map(loc => loc.period))];

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPeriod = !selectedPeriod || location.period === selectedPeriod;
    return matchesSearch && matchesPeriod;
  });

  if (selectedEra) {
    const era = eras.find(e => e.id === selectedEra);
    if (era) {
      return <EraView era={era} onBack={() => setSelectedEra(null)} />;
    }
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Journey Through Telangana's History
        </h2>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          Explore the fascinating transformation of Telangana's landmarks through interactive 
          historical photography comparisons. From the Kakatiya dynasty to modern times, 
          witness how centuries have shaped our beloved state.
        </p>
      </div>

      {/* View Toggle */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-100">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveView('gallery')}
              className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2 ${
                activeView === 'gallery'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Locations</span>
            </button>
            <button
              onClick={() => setActiveView('eras')}
              className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center space-x-2 ${
                activeView === 'eras'
                  ? 'bg-white text-amber-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>Historical Eras</span>
            </button>
          </div>
        </div>
      </div>
      {/* Search and Filters */}
      {activeView === 'gallery' && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white min-w-48 transition-colors"
            >
              <option value="">All Periods</option>
              {periods.map(period => (
                <option key={period} value={period}>{period}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      )}

      {/* Content based on active view */}
      {activeView === 'gallery' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLocations.map((location) => (
          <div
            key={location.id}
            onClick={() => onLocationSelect(location)}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-amber-50"
          >
            <div className="relative overflow-hidden">
              <img
                src={location.thumbnail}
                alt={location.title}
                className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold mb-1">{location.title}</h3>
                <div className="flex items-center space-x-2 text-sm opacity-90">
                  <MapPin className="w-4 h-4" />
                  <span>{location.location}</span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {location.year}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  {location.period}
                </span>
              </div>
              
              <p className="text-gray-600 leading-relaxed text-sm mb-4">
                {location.story.overview.slice(0, 120)}...
              </p>
              
              <div className="flex flex-wrap gap-2">
                {location.tags.slice(0, 2).map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-md"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {eras.map((era) => (
            <div
              key={era.id}
              onClick={() => setSelectedEra(era.id)}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border border-amber-50"
            >
              <div className="relative overflow-hidden">
                <img
                  src={era.image}
                  alt={era.name}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{era.name}</h3>
                  <div className="flex items-center space-x-2 text-sm opacity-90">
                    <Clock className="w-4 h-4" />
                    <span>{era.period}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <Crown className="w-8 h-8 text-amber-400" />
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  {era.description.slice(0, 150)}...
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    {era.keyRulers.length} Rulers
                  </span>
                  <span className="text-sm text-gray-500">
                    Click to explore
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeView === 'gallery' && filteredLocations.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No locations found</h3>
          <p className="text-gray-600">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};

export default Gallery;