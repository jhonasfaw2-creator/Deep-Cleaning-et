// app/page.tsx
import AnimatedSection from "../components/AnimatedSection";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import Testimonials from "../components/sections/Testimonials";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20">
        <Hero />
      </section>

      {/* Trust / Stats Section */}
      <section className="py-12 md:py-16 border-y border-gray-100">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {/* Stat 1 */}
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                500+
              </div>
              <div className="text-gray-600 font-medium">Happy Clients</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">
                Trusted across Ethiopia
              </div>
            </div>

            {/* Stat 2 */}
            <div className="text-center group">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                1200+
              </div>
              <div className="text-gray-600 font-medium">
                Cleanings Completed
              </div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">
                Professional service delivered
              </div>
            </div>

            {/* Stat 3 */}
            <div className="text-center group sm:col-span-2 md:col-span-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                4.9
              </div>
              <div className="text-gray-600 font-medium">Star Rating</div>
              <div className="text-xs sm:text-sm text-gray-400 mt-1">
                Based on 200+ reviews
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20">
        <Services />
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              Why Choose Us
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Experience the difference with Ethiopia's most trusted cleaning
              service
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-6 md:p-7 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                Trusted Professionals
              </h3>
              <p className="text-sm text-gray-600">
                Vetted, trained, and insured cleaning experts
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-6 md:p-7 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                Fast Response Time
              </h3>
              <p className="text-sm text-gray-600">
                Same-day bookings & 30-min response
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-6 md:p-7 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                Affordable Premium
              </h3>
              <p className="text-sm text-gray-600">
                Luxury service at competitive rates
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-2xl p-6 md:p-7 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                Quality Guarantee
              </h3>
              <p className="text-sm text-gray-600">
                100% satisfaction or free reclean
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-20">
        <Testimonials />
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-gray-900 rounded-2xl md:rounded-3xl p-8 sm:p-10 md:p-12 text-center transition-all duration-300 hover:shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
              Ready for a cleaner space?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
              Join thousands of satisfied customers who trust us for their
              cleaning needs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 sm:px-0">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                className="bg-white text-gray-900 hover:bg-gray-100 w-full sm:w-auto"
              >
                Book Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                fullWidth
                className="border-white text-white hover:bg-white hover:text-gray-900 w-full sm:w-auto"
              >
                Get a Quote
              </Button>
            </div>
            <p className="text-gray-400 text-xs sm:text-sm mt-6">
              Free consultation • No hidden fees • 24/7 support
            </p>
          </div>
        </div>
      </section>
      
    </main>
  );
}
