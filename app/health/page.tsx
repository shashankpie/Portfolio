"use client";

interface HealthMetric {
  value: number;
  unit: string;
  progress: number; // 0-100
  trend: 'up' | 'down' | 'neutral';
  trendValue: number;
}

interface DayData {
  date: string;
  sleep: HealthMetric;
  calories: HealthMetric;
  steps: HealthMetric;
}

export default function HealthPage() {
  // Today's health data
  const todayData: DayData = {
    date: "2025-06-15",
    sleep: { value: 6.5, unit: "hrs", progress: 81, trend: 'down', trendValue: -1.2 },
    calories: { value: 2840, unit: "kcal", progress: 94, trend: 'up', trendValue: 340 },
    steps: { value: 8450, unit: "steps", progress: 85, trend: 'up', trendValue: 1200 }
  };


  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return '▲';
      case 'down': return '▼';
      case 'neutral': return '●';
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'neutral', metricType: 'sleep' | 'calories' | 'steps') => {
    if (trend === 'neutral') return 'text-gray-500';
    
    // For sleep and steps, up is good. For calories, it depends on context
    if (metricType === 'sleep' || metricType === 'steps') {
      return trend === 'up' ? 'text-green-600' : 'text-red-500';
    } else {
      // For calories, we'll keep it neutral colored
      return trend === 'up' ? 'text-orange-600' : 'text-orange-400';
    }
  };

  const MetricCard = ({ emoji, label, metric, metricType, color }: {
    emoji: string;
    label: string;
    metric: HealthMetric;
    metricType: 'sleep' | 'calories' | 'steps';
    color: string;
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
        </div>
        <div className={`flex items-center gap-1 text-sm ${getTrendColor(metric.trend, metricType)}`}>
          <span>{getTrendIcon(metric.trend)}</span>
          <span>{Math.abs(metric.trendValue)}{metricType === 'sleep' ? 'h' : metricType === 'steps' ? '' : ''}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 dark:text-white">
          {metricType === 'sleep' ? metric.value.toFixed(1) : metric.value.toLocaleString()}
          <span className="text-lg font-normal text-gray-500 ml-1">{metric.unit}</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${color}`}
          style={{ width: `${Math.min(metric.progress, 100)}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Health Dashboard</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Today
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MetricCard
              emoji="🌙"
              label="Sleep"
              metric={todayData.sleep}
              metricType="sleep"
              color="bg-blue-500"
            />
            <MetricCard
              emoji="🔥"
              label="Calories"
              metric={todayData.calories}
              metricType="calories"
              color="bg-orange-500"
            />
            <MetricCard
              emoji="🏃‍♂️"
              label="Steps"
              metric={todayData.steps}
              metricType="steps"
              color="bg-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}