export function mapFetchedMetricsToDashboard(metricsArr: any[]): any {
  if (!Array.isArray(metricsArr) || metricsArr.length === 0) return null;
  const sorted = [...metricsArr].sort((a, b) => {
    const da = new Date(a.date).getTime();
    const db = new Date(b.date).getTime();
    return da - db;
  });
  const monthlyViewDeltas = sorted.map((m, i, arr) => {
    if (i === 0) return m.views || 0;
    return (m.views || 0) - (arr[i - 1].views || 0);
  });
  const barChartData = sorted.map((m, i) => {
    let cpm = 0;
    const viewsDelta = monthlyViewDeltas[i];
    if (m.estimatedRevenueUsd && viewsDelta > 0) {
      cpm = m.estimatedRevenueUsd / (viewsDelta / 1000);
    }
    const dateObj = new Date(m.date);
    const monthLabel = dateObj.toLocaleString("default", { month: "short" }) +
      " " + dateObj.getFullYear();
    return {
      month: monthLabel,
      views: viewsDelta,
      cpm: cpm || 0,
    };
  });
  const totalViews = monthlyViewDeltas.reduce((sum, v) => sum + v, 0);
  const subscribersGained =
    (sorted[sorted.length - 1].audienceSize || 0) -
    (sorted[0].audienceSize || 0);
  const creditScore = {
    overallScore: 80,
    scoreFactors: {
      consistency: 75,
      engagement: 70,
    },
    trendData: sorted.map((m) => ({
      date: new Date(m.date).toLocaleString("default", { month: "short" }),
      score: 70 + Math.round((m.views || 0) / 1000),
    })),
  };
  const latest = sorted[sorted.length - 1];
  const ytIncome = {
    monthlyIncome: latest.estimatedRevenueUsd || 0,
  };
  const ytMetrics = {
    views: totalViews,
    audienceSize: latest.audienceSize || 0,
    postCount: latest.postCount || 0,
  };
  const topVideo = null;
  return {
    creditScore,
    ytIncome,
    ytMetrics,
    subscribersGained,
    barChartData,
    topVideo,
    totalViews,
  };
}
