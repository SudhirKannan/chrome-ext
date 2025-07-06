import React from 'react';
import { AlertCircle, Shield, Clock } from "lucide-react";

const BlockedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-[500px] bg-white rounded-xl border-2 border-red-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Productivity Shield</h1>
          </div>
          <div className="flex items-center justify-center gap-2 text-red-100">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Site Blocked</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-full">
                <AlertCircle className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-lg text-gray-700">
              This site has been blocked to help you stay focused and productive.
            </p>
            <p className="text-sm text-gray-500">
              You can manage your blocked sites in the extension popup.
            </p>
          </div>

          <div className="pt-4">
            <button 
              onClick={() => window.history.back()}
              className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockedPage;
