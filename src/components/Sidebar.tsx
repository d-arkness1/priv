import React from 'react';
import { FileText, Share2, BarChart2, Mail, Image } from 'lucide-react';

const sidebarItems = [
  { icon: FileText, label: 'Documents' },
  { icon: Share2, label: 'Share' },
  { icon: BarChart2, label: 'Analytics' },
  { icon: Mail, label: 'Email' },
  { icon: Image, label: 'Images' },
];

export function Sidebar() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 p-2 bg-white shadow-lg rounded-l-lg border border-gray-200">
      <div className="flex flex-col gap-4">
        {sidebarItems.map((item, index) => (
          <button
            key={index}
            className="p-2 text-gray-600 hover:text-[#00A3FF] hover:bg-blue-50 rounded-lg transition-colors group"
            title={item.label}
          >
            <item.icon className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
}