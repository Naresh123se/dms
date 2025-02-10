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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('features');

  return (
    <div>
      {/* Header */}
      <div>
        <p>+977-1-4784678</p>
        <p>info@distro.com</p>
        <p>Track Shipment</p>
        <p>Contact</p>
      </div>

      {/* Navigation - Updated with mobile menu */}
      <div>
        <p>DISTRO</p>
        <p>Home</p>
        <p>Solutions</p>
        <p>Services</p>
        <p>Network</p>
        <p>Resources</p>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? 'Close' : 'Get Started'}
        </button>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div>
            <p>Home</p>
            <p>Solutions</p>
            <p>Services</p>
            <p>Network</p>
            <p>Resources</p>
            <button>Get Started</button>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div>
        <h1>Smart Distribution Management Solutions</h1>
        <p>Streamline your supply chain with our advanced distribution management system.</p>
        <p>Real-time tracking, inventory management, and logistics optimization.</p>
        <button>Our Solutions</button>
        <button>Schedule Demo</button>
      </div>

      {/* Interactive Features Section */}
      <div>
        <h2>Powerful Features</h2>
        <button onClick={() => setActiveTab('features')}>Core Features</button>
        <button onClick={() => setActiveTab('analytics')}>Analytics</button>
        <button onClick={() => setActiveTab('integration')}>Integration</button>
        {activeTab === 'features' && (
          <div>
            <FeatureCard icon={<Truck />} title="Real-time Tracking" description="Monitor your shipments in real-time with precise location tracking and status updates." />
            <FeatureCard icon={<Boxes />} title="Inventory Control" description="Manage stock levels, automate reordering, and optimize warehouse space." />
            <FeatureCard icon={<MapPin />} title="Route Planning" description="AI-powered route optimization for efficient delivery and reduced costs." />
          </div>
        )}
        {activeTab === 'analytics' && (
          <div>
            <FeatureCard icon={<BarChart />} title="Performance Metrics" description="Track KPIs and performance metrics with customizable dashboards." />
            <FeatureCard icon={<TrendingUp />} title="Demand Forecasting" description="Predict future demand patterns using advanced analytics." />
            <FeatureCard icon={<PieChart />} title="Cost Analysis" description="Detailed cost breakdowns and optimization recommendations." />
          </div>
        )}
        {activeTab === 'integration' && (
          <div>
            <FeatureCard icon={<Network />} title="API Integration" description="Seamless integration with your existing systems and third-party services." />
            <FeatureCard icon={<Smartphone />} title="Multi-platform Support" description="Works across desktop, mobile, and web platforms." />
            <FeatureCard icon={<Settings />} title="Custom Workflows" description="Create custom workflows tailored to your business needs." />
          </div>
        )}
      </div>

      {/* Live Tracking Demo Section */}
      <div>
        <h2>Live Tracking Demo</h2>
        <input placeholder="Enter Tracking Number" />
        <button>Track Shipment</button>
        <TrackingFeature icon={<Clock />} title="Real-time Updates" description="Get instant notifications about your shipment status" />
        <TrackingFeature icon={<MapPin />} title="Location Tracking" description="See exact location of your shipment on the map" />
        <TrackingFeature icon={<Timer />} title="ETA Prediction" description="Accurate delivery time predictions" />
        <p>Active Deliveries: 2,547</p>
      </div>

      {/* Stats Section */}
      <div>
        {/* Add stats here */}
      </div>

      {/* Services Section */}
      <div>
        <h2>Distribution Solutions</h2>
      </div>

      {/* Process Section */}
      <div>
        <h2>How It Works</h2>
        <p>Our distribution management system streamlines your entire supply chain process from warehouse to delivery</p>
        <ProcessCard number="1" icon={<ClipboardList />} title="Inventory Input" description="Seamless inventory tracking and management across all warehouses" />
        <ProcessCard number="2" icon={<MapPin />} title="Route Planning" description="AI-powered route optimization for efficient delivery" />
        <ProcessCard number="3" icon={<Truck />} title="Distribution" description="Real-time tracking and delivery management" />
        <ProcessCard number="4" icon={<CheckCircle2 />} title="Confirmation" description="Automated delivery confirmation and reporting" />
      </div>

      {/* Benefits Section */}
      <div>
        <h2>Why Choose Our System</h2>
        <BenefitCard icon={<Clock />} title="Time Efficiency" description="Reduce delivery times by up to 30% with our smart routing algorithms" />
        <BenefitCard icon={<Zap />} title="Cost Reduction" description="Lower operational costs by optimizing routes and resources" />
        <BenefitCard icon={<Shield />} title="Enhanced Security" description="Advanced tracking and security features for your shipments" />
        <BenefitCard icon={<Smartphone />} title="Mobile Access" description="Manage your distribution network from anywhere, anytime" />
      </div>

      {/* Integration Section */}
      <div>
        <h2>Seamless Integration</h2>
        <p>Our system integrates seamlessly with your existing infrastructure and popular business tools.</p>
        <IntegrationFeature icon={<Building2 />} text="ERP Systems" />
        <IntegrationFeature icon={<Globe />} text="E-commerce Platforms" />
        <IntegrationFeature icon={<Boxes />} text="Warehouse Systems" />
        <IntegrationFeature icon={<BarChart3 />} text="Analytics Tools" />
      </div>

      {/* Testimonial Section */}
      <div>
        <h2>What Our Clients Say</h2>
      </div>

      {/* CTA Section */}
      <div>
        <h2>Ready to Optimize Your Distribution?</h2>
        <p>Get started with our distribution management system and transform your supply chain operations.</p>
        <button>Request Demo</button>
      </div>

      {/* Footer */}
      <div>
        <p>DISTRO</p>
        <p>Leading provider of distribution management solutions and logistics optimization.</p>
        <p>Solutions</p>
        <p>Warehouse Management</p>
        <p>Route Optimization</p>
        <p>Inventory Control</p>
        <p>Analytics</p>
        <p>Resources</p>
        <p>Documentation</p>
        <p>API Reference</p>
        <p>Case Studies</p>
        <p>Support</p>
        <p>Contact Info</p>
        <p>123 Distribution Center, New York, NY 10001</p>
        <p>+1 (555) 123-4567</p>
        <p>info@distro.com</p>
        <p>© 2025 DISTRO. All rights reserved.</p>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function StatCard({ number, text }) {
  return (
    <div>
      <h3>{number}</h3>
      <p>{text}</p>
    </div>
  );
}

function ServiceCard({ image, title, description }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <button>Learn More</button>
    </div>
  );
}

function ProcessCard({ number, icon, title, description }) {
  return (
    <div>
      <p>{number}</p>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function BenefitCard({ icon, title, description }) {
  return (
    <div>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function IntegrationFeature({ icon, text }) {
  return (
    <div>
      {icon}
      <p>{text}</p>
    </div>
  );
}

function TestimonialCard({ quote, author, position }) {
  return (
    <div>
      <p>"{quote}"</p>
      <p>{author}</p>
      <p>{position}</p>
    </div>
  );
}

function TabButton({ active, onClick, text }) {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
}

function TrackingFeature({ icon, title, description }) {
  return (
    <div>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default App;