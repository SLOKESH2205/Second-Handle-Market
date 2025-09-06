import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl mb-6 text-primary-foreground">
              Buy & Sell Everything Locally
            </h1>
            <p className="text-xl mb-8 text-primary-foreground/90">
              Discover amazing deals on pre-loved items in your neighborhood. 
              From furniture to electronics, fashion to books - find it all here.
            </p>
            <p className="text-3xl mb-8 text-primary-foreground/90 font-playfair italic"
> "Where Second Hand Meets First Choice" </p>
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Start Shopping
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                List an Item
              </Button>
            </div> */}
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1689280730533-4fdacc46e6c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwZnVybml0dXJlJTIwY2hhaXJ8ZW58MXx8fHwxNzU3MDUyMTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Featured marketplace items"
                className="rounded-lg shadow-2xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}