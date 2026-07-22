import React from 'react';
import { Category } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section className="py-12 bg-amber-50/40 border-b border-amber-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Shop By Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif tracking-tight">
              Explore Our Product Categories
            </h2>
          </div>

          <button
            onClick={() => onSelectCategory('All')}
            className={`text-xs font-bold px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 self-start md:self-auto ${
              selectedCategory === 'All'
                ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                : 'bg-white text-stone-700 border-stone-200 hover:border-amber-400 hover:text-amber-800'
            }`}
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 12 Product Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 border ${
                  isSelected
                    ? 'ring-2 ring-amber-600 ring-offset-2 border-amber-600 shadow-lg scale-105'
                    : 'border-stone-200/80 hover:border-amber-400 hover:shadow-xl hover:-translate-y-1'
                } bg-white`}
              >
                {/* Image Container */}
                <div className="aspect-square relative overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                  
                  {/* Category Item Count Badge */}
                  <span className="absolute top-2 right-2 bg-stone-900/80 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-stone-700/50">
                    {cat.itemCount} items
                  </span>
                </div>

                {/* Category Title Overlay */}
                <div className="p-2.5 text-center bg-white">
                  <h3 className={`text-xs font-bold truncate transition-colors ${isSelected ? 'text-amber-800' : 'text-stone-900 group-hover:text-amber-700'}`}>
                    {cat.name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
