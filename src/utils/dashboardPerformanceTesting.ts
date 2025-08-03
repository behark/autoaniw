/**
 * Dashboard Performance Testing Utilities
 * 
 * This module extends the performance testing framework to cover other dashboard components
 * beyond just media, including vehicle listings, page content, and analytics visualizations.
 */

import { 
  StatMetrics, 
  generateSyntheticMediaLibrary, 
  calculateStats, 
  PerformanceMetrics 
} from './performanceTesting';

// Types for dashboard performance testing
export interface VehicleListingItem {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  features: string[];
  specifications: Record<string, string | number>;
  mediaIds: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardPerformanceReport {
  timestamp: Date;
  componentResults: Record<string, PerformanceMetrics>;
  routeResults: Record<string, RoutePerformanceMetrics>;
  serverApiResults: Record<string, ApiPerformanceMetrics>;
  recommendations: PerformanceRecommendation[];
}

export interface RoutePerformanceMetrics {
  route: string;
  loadTime: StatMetrics;
  timeToInteractive: StatMetrics;
  renderTime: StatMetrics;
  dataFetchTime: StatMetrics;
  componentCount: number;
  dataSize: number;
}

export interface ApiPerformanceMetrics {
  endpoint: string;
  responseTime: StatMetrics;
  throughput: number;
  errorRate: number;
  dataSize: number;
}

export interface PerformanceRecommendation {
  component: string;
  severity: 'low' | 'medium' | 'high';
  issue: string;
  recommendation: string;
  potentialImprovement: string;
}

/**
 * Generates synthetic vehicle listings for testing
 */
export function generateSyntheticVehicleListings(count: number): VehicleListingItem[] {
  const brands = [
    'Ferrari', 'Lamborghini', 'Porsche', 'Aston Martin', 'Mercedes-Benz', 
    'BMW', 'Audi', 'Bentley', 'Rolls-Royce', 'Maserati'
  ];
  
  const models = {
    'Ferrari': ['F8 Tributo', '812 Superfast', 'Roma', 'SF90 Stradale', 'Portofino'],
    'Lamborghini': ['Aventador', 'Huracán', 'Urus', 'Sián', 'Revuelto'],
    'Porsche': ['911', 'Cayenne', 'Taycan', 'Panamera', 'Macan'],
    'Aston Martin': ['DB11', 'Vantage', 'DBS Superleggera', 'DBX', 'Valkyrie'],
    'Mercedes-Benz': ['S-Class', 'G-Class', 'AMG GT', 'EQS', 'Maybach'],
    'BMW': ['7 Series', 'X7', '8 Series', 'i8', 'M8'],
    'Audi': ['R8', 'A8', 'RS e-tron GT', 'Q8', 'RS7'],
    'Bentley': ['Continental GT', 'Bentayga', 'Flying Spur', 'Bacalar', 'Mulliner'],
    'Rolls-Royce': ['Phantom', 'Ghost', 'Wraith', 'Dawn', 'Cullinan'],
    'Maserati': ['MC20', 'Levante', 'Quattroporte', 'Ghibli', 'GranTurismo']
  };
  
  const features = [
    'Leather Interior', 'Navigation System', 'Panoramic Roof', 'Premium Sound System',
    'Adaptive Cruise Control', 'Lane Keeping Assist', 'Blind Spot Monitoring',
    'Carbon Fiber Trim', 'Heated/Ventilated Seats', 'Heads-up Display',
    '360° Camera', 'Wireless Charging', 'Android Auto/Apple CarPlay',
    'Rear Entertainment', 'Ambient Lighting'
  ];
  
  const years = Array.from({ length: 5 }, (_, i) => 2020 + i);
  
  const listings: VehicleListingItem[] = [];
  
  for (let i = 0; i < count; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const model = models[brand][Math.floor(Math.random() * models[brand].length)];
    const year = years[Math.floor(Math.random() * years.length)];
    
    // Generate random specifications
    const engineTypes = ['V8', 'V10', 'V12', 'Inline-6', 'W12', 'Hybrid V8'];
    const transmissions = ['8-Speed Automatic', '7-Speed DCT', '6-Speed Manual', '9-Speed PDK'];
    const drivetrains = ['RWD', 'AWD', '4WD'];
    const fuelTypes = ['Gasoline', 'Hybrid', 'Electric'];
    
    const randomFeatureCount = Math.floor(Math.random() * 8) + 4;
    const selectedFeatures = new Set<string>();
    
    while (selectedFeatures.size < randomFeatureCount) {
      const feature = features[Math.floor(Math.random() * features.length)];
      selectedFeatures.add(feature);
    }
    
    // Create date between 1-90 days ago
    const daysAgo = Math.floor(Math.random() * 90) + 1;
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);
    
    // Updated date is between created date and now
    const updatedDaysAgo = Math.floor(Math.random() * daysAgo);
    const updatedAt = new Date();
    updatedAt.setDate(updatedAt.getDate() - updatedDaysAgo);
    
    listings.push({
      id: `vehicle-${i}`,
      name: `${year} ${brand} ${model}`,
      brand,
      model,
      year,
      price: Math.floor(Math.random() * 900000) + 100000,
      features: Array.from(selectedFeatures),
      specifications: {
        engine: engineTypes[Math.floor(Math.random() * engineTypes.length)],
        transmission: transmissions[Math.floor(Math.random() * transmissions.length)],
        drivetrain: drivetrains[Math.floor(Math.random() * drivetrains.length)],
        fuelType: fuelTypes[Math.floor(Math.random() * fuelTypes.length)],
        horsepower: Math.floor(Math.random() * 500) + 300,
        torque: Math.floor(Math.random() * 400) + 300,
        acceleration: (Math.random() * 3 + 1).toFixed(1),
        topSpeed: Math.floor(Math.random() * 120) + 180
      },
      mediaIds: Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, i) => `media-${i}-${Math.random().toString(36).substring(2, 9)}`),
      isPublished: Math.random() > 0.2,
      createdAt,
      updatedAt
    });
  }
  
  return listings;
}

/**
 * Tests the vehicle listing component performance
 */
export async function testVehicleListingPerformance(
  count: number,
  iterations: number = 5
): Promise<PerformanceMetrics> {
  console.log(`Testing vehicle listing performance with ${count} items...`);
  
  const vehicleListings = generateSyntheticVehicleListings(count);
  const renderTimes: number[] = [];
  const memoryUsages: number[] = [];
  const filterTimes: number[] = [];
  
  // Run multiple iterations for statistical significance
  for (let i = 0; i < iterations; i++) {
    // Simulate rendering time based on number of listings and their complexity
    const startRender = performance.now();
    await simulateVehicleListingRender(vehicleListings);
    const endRender = performance.now();
    renderTimes.push(endRender - startRender);
    
    // Simulate memory usage
    const memoryUsage = await simulateMemoryUsage(count, 'vehicleListing');
    memoryUsages.push(memoryUsage);
    
    // Simulate filtering/sorting operations
    const startFilter = performance.now();
    await simulateVehicleFiltering(vehicleListings);
    const endFilter = performance.now();
    filterTimes.push(endFilter - startFilter);
    
    // Clear memory between iterations
    if (i < iterations - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  
  // Calculate metrics
  return {
    component: 'VehicleListingsGrid',
    mediaCount: count,
    renderTime: calculateStats(renderTimes),
    memoryUsage: calculateStats(memoryUsages),
    filterTime: calculateStats(filterTimes),
    iterations
  };
}

/**
 * Tests dashboard page performance (route-level performance)
 */
export async function testDashboardRoutePerformance(
  route: string,
  dataSize: number
): Promise<RoutePerformanceMetrics> {
  console.log(`Testing dashboard route performance for ${route}...`);
  
  // Simulate data loading time based on route and data size
  const loadTimes: number[] = [];
  const renderTimes: number[] = [];
  const ttiTimes: number[] = [];
  const fetchTimes: number[] = [];
  
  const iterations = 5;
  
  for (let i = 0; i < iterations; i++) {
    // Simulate data fetch
    const startFetch = performance.now();
    await simulateDataFetch(route, dataSize);
    const endFetch = performance.now();
    fetchTimes.push(endFetch - startFetch);
    
    // Simulate initial render
    const startRender = performance.now();
    await simulateRouteRender(route);
    const endRender = performance.now();
    renderTimes.push(endRender - startRender);
    
    // Simulate total load time
    const totalLoad = fetchTimes[i] + renderTimes[i];
    loadTimes.push(totalLoad);
    
    // Simulate time to interactive (TTI) - typically longer than initial render
    const ttiDelay = Math.random() * 200 + 50;
    ttiTimes.push(totalLoad + ttiDelay);
  }
  
  const componentCount = getComponentCountForRoute(route);
  
  return {
    route,
    loadTime: calculateStats(loadTimes),
    timeToInteractive: calculateStats(ttiTimes),
    renderTime: calculateStats(renderTimes),
    dataFetchTime: calculateStats(fetchTimes),
    componentCount,
    dataSize
  };
}

/**
 * Tests API performance for server-side operations
 */
export async function testApiPerformance(
  endpoint: string,
  requestCount: number
): Promise<ApiPerformanceMetrics> {
  console.log(`Testing API performance for ${endpoint} with ${requestCount} requests...`);
  
  const responseTimes: number[] = [];
  let errorCount = 0;
  let dataSize = 0;
  
  for (let i = 0; i < requestCount; i++) {
    try {
      const startTime = performance.now();
      const result = await simulateApiRequest(endpoint);
      const endTime = performance.now();
      
      responseTimes.push(endTime - startTime);
      dataSize += result.dataSize;
    } catch (e) {
      errorCount++;
    }
  }
  
  const totalTime = responseTimes.reduce((sum, time) => sum + time, 0);
  const throughput = (requestCount - errorCount) / (totalTime / 1000);
  const errorRate = errorCount / requestCount;
  
  return {
    endpoint,
    responseTime: calculateStats(responseTimes),
    throughput,
    errorRate,
    dataSize: dataSize / (requestCount - errorCount) // Average data size per request
  };
}

/**
 * Generates a comprehensive performance report for the entire dashboard
 */
export async function generateDashboardPerformanceReport(): Promise<DashboardPerformanceReport> {
  console.log("Generating comprehensive dashboard performance report...");
  
  const componentResults: Record<string, PerformanceMetrics> = {};
  const routeResults: Record<string, RoutePerformanceMetrics> = {};
  const serverApiResults: Record<string, ApiPerformanceMetrics> = {};
  
  // Test key components
  componentResults['VehicleListingsGrid'] = await testVehicleListingPerformance(50);
  componentResults['MediaLibrary'] = await testVehicleListingPerformance(100); // Re-use the same test pattern
  componentResults['AnalyticsDashboard'] = await testVehicleListingPerformance(20); // Re-use with smaller count
  
  // Test key routes
  routeResults['/admin/vehicles'] = await testDashboardRoutePerformance('/admin/vehicles', 250000);
  routeResults['/admin/media'] = await testDashboardRoutePerformance('/admin/media', 500000);
  routeResults['/admin/pages'] = await testDashboardRoutePerformance('/admin/pages', 150000);
  routeResults['/admin/analytics'] = await testDashboardRoutePerformance('/admin/analytics', 350000);
  
  // Test key APIs
  serverApiResults['/api/vehicles'] = await testApiPerformance('/api/vehicles', 20);
  serverApiResults['/api/media'] = await testApiPerformance('/api/media', 20);
  serverApiResults['/api/pages'] = await testApiPerformance('/api/pages', 20);
  
  // Generate performance recommendations
  const recommendations = generatePerformanceRecommendations(
    componentResults,
    routeResults,
    serverApiResults
  );
  
  return {
    timestamp: new Date(),
    componentResults,
    routeResults,
    serverApiResults,
    recommendations
  };
}

// Helper functions

async function simulateVehicleListingRender(listings: VehicleListingItem[]): Promise<void> {
  // Simulate rendering time based on count and complexity
  const baseTime = 50; // base ms
  const perItemTime = 2; // ms per item
  const complexityFactor = listings.reduce((sum, item) => 
    sum + (item.features.length * 0.5) + 
    (Object.keys(item.specifications).length * 0.3) + 
    (item.mediaIds.length * 0.8), 0);
  
  const simulatedTime = baseTime + (listings.length * perItemTime) + complexityFactor;
  await new Promise(resolve => setTimeout(resolve, simulatedTime));
}

async function simulateVehicleFiltering(listings: VehicleListingItem[]): Promise<VehicleListingItem[]> {
  // Simulate filtering operation time
  const baseTime = 20; // base ms
  const perItemTime = 0.5; // ms per item
  const simulatedTime = baseTime + (listings.length * perItemTime);
  
  await new Promise(resolve => setTimeout(resolve, simulatedTime));
  
  // Return filtered results (simulated)
  return listings.filter(() => Math.random() > 0.3);
}

async function simulateMemoryUsage(count: number, componentType: string): Promise<number> {
  // Simulate memory usage based on component type and count
  let baseMem = 25 * 1024 * 1024; // 25MB base memory
  let perItemMem = 0;
  
  switch (componentType) {
    case 'vehicleListing':
      perItemMem = 50 * 1024; // 50KB per vehicle
      break;
    case 'media':
      perItemMem = 200 * 1024; // 200KB per media item
      break;
    case 'analytics':
      perItemMem = 100 * 1024; // 100KB per analytics widget
      break;
    default:
      perItemMem = 20 * 1024; // 20KB default
  }
  
  const randomVariation = Math.random() * 10 * 1024 * 1024; // Up to 10MB random variation
  return baseMem + (count * perItemMem) + randomVariation;
}

async function simulateDataFetch(route: string, dataSize: number): Promise<void> {
  // Simulate network fetch time based on data size and some randomness for network conditions
  const baseFetchTime = 200; // Base 200ms for server processing
  const dataFactor = dataSize / 10000; // Size factor
  const networkVariation = Math.random() * 300; // Network jitter
  
  const totalTime = baseFetchTime + dataFactor + networkVariation;
  await new Promise(resolve => setTimeout(resolve, totalTime));
}

async function simulateRouteRender(route: string): Promise<void> {
  // Different routes have different rendering complexity
  const renderTimes = {
    '/admin/vehicles': 150,
    '/admin/media': 200,
    '/admin/pages': 120,
    '/admin/analytics': 250,
    '/admin/settings': 80
  };
  
  const renderTime = renderTimes[route] || 100;
  const variation = Math.random() * 50;
  
  await new Promise(resolve => setTimeout(resolve, renderTime + variation));
}

async function simulateApiRequest(endpoint: string): Promise<{ dataSize: number }> {
  // Simulate API call with potential for error
  if (Math.random() < 0.05) {
    throw new Error("Simulated API error");
  }
  
  const responseSizes = {
    '/api/vehicles': 20000,
    '/api/media': 50000,
    '/api/pages': 15000,
    '/api/analytics': 30000,
    '/api/settings': 5000
  };
  
  const baseTime = 100;
  const endpointTime = {
    '/api/vehicles': 50,
    '/api/media': 80,
    '/api/pages': 40,
    '/api/analytics': 120,
    '/api/settings': 30
  };
  
  const responseTime = baseTime + (endpointTime[endpoint] || 50) + (Math.random() * 100);
  await new Promise(resolve => setTimeout(resolve, responseTime));
  
  return {
    dataSize: responseSizes[endpoint] || 10000
  };
}

function getComponentCountForRoute(route: string): number {
  // Estimate number of React components rendered for each route
  const componentCounts = {
    '/admin/vehicles': 25,
    '/admin/media': 35,
    '/admin/pages': 20,
    '/admin/analytics': 40,
    '/admin/settings': 15
  };
  
  return componentCounts[route] || 10;
}

function generatePerformanceRecommendations(
  componentResults: Record<string, PerformanceMetrics>,
  routeResults: Record<string, RoutePerformanceMetrics>,
  apiResults: Record<string, ApiPerformanceMetrics>
): PerformanceRecommendation[] {
  const recommendations: PerformanceRecommendation[] = [];
  
  // Check for slow component render times
  Object.entries(componentResults).forEach(([component, metrics]) => {
    if (metrics.renderTime.avg > 200) {
      recommendations.push({
        component,
        severity: metrics.renderTime.avg > 500 ? 'high' : 'medium',
        issue: `Slow render time (${Math.round(metrics.renderTime.avg)}ms)`,
        recommendation: "Consider virtualization for large lists or implement component memoization",
        potentialImprovement: "50-70% render time improvement"
      });
    }
    
    if (metrics.memoryUsage.avg > 100 * 1024 * 1024) { // 100MB
      recommendations.push({
        component,
        severity: 'medium',
        issue: `High memory usage (${Math.round(metrics.memoryUsage.avg / (1024 * 1024))}MB)`,
        recommendation: "Check for memory leaks or reduce state size",
        potentialImprovement: "30-50% memory reduction"
      });
    }
  });
  
  // Check for slow route loading times
  Object.entries(routeResults).forEach(([route, metrics]) => {
    if (metrics.loadTime.avg > 1000) { // 1 second
      recommendations.push({
        component: route,
        severity: metrics.loadTime.avg > 2000 ? 'high' : 'medium',
        issue: `Slow route loading (${Math.round(metrics.loadTime.avg)}ms)`,
        recommendation: "Implement code splitting, lazy loading, or optimize data fetching",
        potentialImprovement: "40-60% load time improvement"
      });
    }
    
    if (metrics.dataFetchTime.avg > 500) { // 500ms
      recommendations.push({
        component: route,
        severity: 'medium',
        issue: `Slow data fetching (${Math.round(metrics.dataFetchTime.avg)}ms)`,
        recommendation: "Add caching layer or optimize server query",
        potentialImprovement: "60-80% fetch time improvement"
      });
    }
  });
  
  // Check API performance
  Object.entries(apiResults).forEach(([endpoint, metrics]) => {
    if (metrics.responseTime.avg > 300) {
      recommendations.push({
        component: endpoint,
        severity: metrics.responseTime.avg > 1000 ? 'high' : 'medium',
        issue: `Slow API response (${Math.round(metrics.responseTime.avg)}ms)`,
        recommendation: "Add database indexing, caching, or optimize queries",
        potentialImprovement: "70-90% response time improvement"
      });
    }
    
    if (metrics.errorRate > 0.01) { // 1% error rate
      recommendations.push({
        component: endpoint,
        severity: metrics.errorRate > 0.05 ? 'high' : 'medium',
        issue: `High API error rate (${Math.round(metrics.errorRate * 100)}%)`,
        recommendation: "Implement better error handling and retry logic",
        potentialImprovement: "90% reduction in error rates"
      });
    }
  });
  
  return recommendations;
}
