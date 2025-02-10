import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Truck,
  BarChart3,
  Package,
  Network,
  ArrowRight,
  BoxesIcon,
  ClipboardList,
  Timer,
  Search,
  Menu,
  X,
  Shield,
  Settings,
  Users,
  Smartphone,
  Globe,
  CheckCircle2,
  Clock,
  TrendingUp,
  Zap,
  BarChart,
  PieChart,
  Layers,
  Boxes
} from 'lucide-react';
import Nav from './Nav';
import { Interactive } from './Interactive';
import { StatsSection } from './Stats';
import { ServicesSection } from './Services';

function App() {

  const [activeTab, setActiveTab] = useState('features');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>+977-1-4784678</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>info@distro.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-blue-200">Track Shipment</a>
            <a href="#" className="hover:text-blue-200">Contact</a>
          </div>
        </div>
      </div>

      {/* Navigation - Updated with mobile menu */}
 
<Nav/>
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[600px]" 
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto px-4 relative h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">Smart Distribution Management Solutions</h1>
            <p className="text-xl mb-8">
              Streamline your supply chain with our advanced distribution management system. 
              Real-time tracking, inventory management, and logistics optimization.
            </p>
            <div className="flex space-x-4">
              <button className="bg-blue-900 text-white px-8 py-3 rounded flex items-center hover:bg-blue-800 transition-colors">
                Our Solutions <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded hover:bg-white hover:text-blue-900 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Features Section */}

<Interactive/>




      {/* Stats Section */}
<StatsSection/>

      {/* Services Section */}
<ServicesSection/>
      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-blue-900 mx-auto mb-8"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our distribution management system streamlines your entire supply chain process
              from warehouse to delivery
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <ProcessCard 
              number="01"
              icon={<BoxesIcon className="w-8 h-8" />}
              title="Inventory Input"
              description="Seamless inventory tracking and management across all warehouses"
            />
            <ProcessCard 
              number="02"
              icon={<Network className="w-8 h-8" />}
              title="Route Planning"
              description="AI-powered route optimization for efficient delivery"
            />
            <ProcessCard 
              number="03"
              icon={<Truck className="w-8 h-8" />}
              title="Distribution"
              description="Real-time tracking and delivery management"
            />
            <ProcessCard 
              number="04"
              icon={<CheckCircle2 className="w-8 h-8" />}
              title="Confirmation"
              description="Automated delivery confirmation and reporting"
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our System</h2>
            <div className="w-20 h-1 bg-blue-900 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <BenefitCard
              icon={<Clock className="w-6 h-6 text-blue-900" />}
              title="Time Efficiency"
              description="Reduce delivery times by up to 30% with our smart routing algorithms"
            />
            <BenefitCard
              icon={<TrendingUp className="w-6 h-6 text-blue-900" />}
              title="Cost Reduction"
              description="Lower operational costs by optimizing routes and resources"
            />
            <BenefitCard
              icon={<Shield className="w-6 h-6 text-blue-900" />}
              title="Enhanced Security"
              description="Advanced tracking and security features for your shipments"
            />
            <BenefitCard
              icon={<Smartphone className="w-6 h-6 text-blue-900" />}
              title="Mobile Access"
              description="Manage your distribution network from anywhere, anytime"
            />
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Seamless Integration</h2>
              <div className="w-20 h-1 bg-blue-900 mb-8"></div>
              <p className="text-gray-600 mb-8">
                Our system integrates seamlessly with your existing infrastructure and popular business tools.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <IntegrationFeature icon={<Settings />} text="ERP Systems" />
                <IntegrationFeature icon={<Globe />} text="E-commerce Platforms" />
                <IntegrationFeature icon={<Package />} text="Warehouse Systems" />
                <IntegrationFeature icon={<BarChart3 />} text="Analytics Tools" />
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Integration Dashboard" 
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <div className="w-20 h-1 bg-white mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The system has revolutionized our distribution process, reducing delivery times by 40%."
              author="John Smith"
              position="Logistics Manager, ABC Corp"
            />
            <TestimonialCard
              quote="Real-time tracking and analytics have given us unprecedented visibility into our operations."
              author="Sarah Johnson"
              position="Operations Director, XYZ Ltd"
            />
            <TestimonialCard
              quote="Customer satisfaction has improved significantly since implementing this system."
              author="Michael Brown"
              position="CEO, Global Logistics"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Optimize Your Distribution?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get started with our distribution management system and transform your supply chain operations.
          </p>
          <button className="bg-white text-blue-900 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-colors">
            Request Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-6">
                <Truck className="w-8 h-8" />
                <span className="ml-2 text-xl font-bold">DISTRO</span>
              </div>
              <p className="text-gray-400">
                Leading provider of distribution management solutions and logistics optimization.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Warehouse Management</a></li>
                <li><a href="#" className="hover:text-white">Route Optimization</a></li>
                <li><a href="#" className="hover:text-white">Inventory Control</a></li>
                <li><a href="#" className="hover:text-white">Analytics</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
                <li><a href="#" className="hover:text-white">Case Studies</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  123 Distribution Center, New York, NY 10001
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  info@distro.com
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DISTRO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
      <div className="flex justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StatCard({ number, text }) {
  return (
    <div>
      <div className="text-4xl font-bold mb-2">{number}</div>
      <div className="text-blue-200">{text}</div>
    </div>
  );
}

function ServiceCard({ image, title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a href="#" className="text-blue-900 font-semibold flex items-center hover:text-blue-700">
          Learn More <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
}

function ProcessCard({ number, icon, title, description }) {
  return (
    <div className="relative p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-sm font-bold">
        {number}
      </div>
      <div className="text-blue-900 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function BenefitCard({ icon, title, description }) {
  return (
    <div className="flex items-start p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex-shrink-0 mr-4">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

function IntegrationFeature({ icon, text }) {
  return (
    <div className="flex items-center space-x-2 text-gray-700">
      <div className="text-blue-900">{icon}</div>
      <span>{text}</span>
    </div>
  );
}

function TestimonialCard({ quote, author, position }) {
  return (
    <div className="p-6 bg-white bg-opacity-10 rounded-lg">
      <p className="text-lg mb-6 italic">"{quote}"</p>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-blue-200">{position}</p>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, text }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full transition-colors ${
        active 
          ? 'bg-blue-900 text-white' 
          : 'bg-white text-gray-600 hover:bg-gray-100'
      }`}
    >
      {text}
    </button>
  );
}

function TrackingFeature({ icon, title, description }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

export default App;