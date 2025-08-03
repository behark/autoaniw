import React from 'react';

export default function TestPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">AutoAni Test Page</h1>
        <p className="text-gray-600 mb-6">
          This is a minimal test page to verify that our GitHub Pages deployment pipeline is working correctly.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold mb-2">Deployment Info</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Next.js Static Export: <span className="font-mono bg-gray-100 px-1 rounded">✅</span></li>
            <li>GitHub Pages: <span className="font-mono bg-gray-100 px-1 rounded">✅</span></li>
            <li>Build Time: <span className="font-mono bg-gray-100 px-1 rounded">{new Date().toISOString()}</span></li>
          </ul>
        </div>
        <div className="mt-8 text-center">
          <a href="/" className="text-blue-600 hover:underline">Return to Home</a>
        </div>
      </div>
    </div>
  );
}
