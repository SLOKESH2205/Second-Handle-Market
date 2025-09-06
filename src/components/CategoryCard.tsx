import { ImageWithFallback } from './figma/ImageWithFallback';

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  itemCount: number;
}

export function CategoryCard({ title, imageUrl, itemCount }: CategoryCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow">
        <ImageWithFallback
          src={imageUrl}
          alt={title}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h3 className="text-lg mb-1">{title}</h3>
            <p className="text-sm text-white/80">{itemCount} items</p>
          </div>
        </div>
      </div>
    </div>
  );
}