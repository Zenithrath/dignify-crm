import { Search, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import type { Service } from '../types';

const mockServices: Service[] = [
  {
    id: 'SRV-001',
    category: 'Website Development',
    serviceName: 'Company Profile Website',
    level: 'Standard',
    minimumPrice: 25000000,
    maximumPrice: 75000000,
    estimatedDuration: '4-6 weeks',
    description: 'Professional company profile with 5-7 pages',
    active: true,
  },
  {
    id: 'SRV-002',
    category: 'Website Development',
    serviceName: 'E-commerce Website',
    level: 'Advanced',
    minimumPrice: 50000000,
    maximumPrice: 150000000,
    estimatedDuration: '8-12 weeks',
    description: 'Full-featured online store with payment integration',
    active: true,
  },
  {
    id: 'SRV-003',
    category: 'UI/UX Design',
    serviceName: 'Mobile App Design',
    level: 'Standard',
    minimumPrice: 20000000,
    maximumPrice: 50000000,
    estimatedDuration: '3-4 weeks',
    description: 'Complete mobile app UI/UX design with prototype',
    active: true,
  },
  {
    id: 'SRV-004',
    category: 'AI Solutions',
    serviceName: 'AI Chatbot Integration',
    level: 'Standard',
    minimumPrice: 15000000,
    maximumPrice: 40000000,
    estimatedDuration: '2-4 weeks',
    description: 'Custom AI chatbot for customer support',
    active: true,
  },
  {
    id: 'SRV-005',
    category: 'N8N Workflow Automation',
    serviceName: 'Business Process Automation',
    level: 'Standard',
    minimumPrice: 10000000,
    maximumPrice: 30000000,
    estimatedDuration: '1-3 weeks',
    description: 'Automate repetitive business tasks with N8N',
    active: true,
  },
  {
    id: 'SRV-006',
    category: 'API Integration',
    serviceName: 'Third-party API Integration',
    level: 'Advanced',
    minimumPrice: 20000000,
    maximumPrice: 60000000,
    estimatedDuration: '3-6 weeks',
    description: 'Integrate external APIs into your system',
    active: true,
  },
];

export function ServicesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Services</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Rate card and service catalog</p>
        </div>
        <Button className="bg-gradient-to-r from-accent-teal to-accent-green hover:from-accent-teal/90 hover:to-accent-green/90 text-white border-0">
          <Plus className="w-4 h-4 mr-1.5" />
          Add Service
        </Button>
      </div>

      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search services..."
            className="input pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockServices.map((service) => (
          <div
            key={service.id}
            className="card-hover p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <span className="text-xs bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                  {service.category}
                </span>
                <h3 className="font-medium text-gray-900 dark:text-white mt-2">{service.serviceName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{service.level}</p>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg text-gray-500 dark:text-gray-400">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg text-gray-500 dark:text-gray-400">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Price Range</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  Rp {(service.minimumPrice / 1000000).toFixed(0)}M - {(service.maximumPrice / 1000000).toFixed(0)}M
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Duration</span>
                <span className="text-gray-700 dark:text-gray-300">{service.estimatedDuration}</span>
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-100 dark:border-dark-700">
              <span className={`text-xs font-medium ${service.active ? 'text-accent-teal' : 'text-gray-400 dark:text-gray-500'}`}>
                {service.active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
