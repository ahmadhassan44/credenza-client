// Multi-channel metrics aggregation for dashboard
// Group metrics by month and by channel
export function mapFetchedMetricsToDashboardMulti(metricsArr: any[]): any {
  if (!Array.isArray(metricsArr) || metricsArr.length === 0) return null;

  // Group by month and channel
  const grouped: Record<string, Record<string, any[]>> = {};

  for (const m of metricsArr) {
    const dateObj = new Date(m.date);
    const monthKey = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}`; // e.g. 2025-5
    const channelKey = m.platformId || m.channelName || "unknown";

    if (!grouped[monthKey]) grouped[monthKey] = {};
    if (!grouped[monthKey][channelKey]) grouped[monthKey][channelKey] = [];
    grouped[monthKey][channelKey].push(m);
  }

  // For each month, for each channel, pick the latest metric for that month
  const months = Object.keys(grouped).sort();
  const channels = Array.from(
    new Set(metricsArr.map((m) => m.platformId || m.channelName || "unknown")),
  );

  // Prepare data for charts and summary
  const channelMetrics: Record<string, any[]> = {};

  for (const channel of channels) {
    channelMetrics[channel] = [];
  }

  for (const month of months) {
    for (const channel of channels) {
      const metrics = grouped[month][channel];
      if (metrics && metrics.length > 0) {
        // Pick the latest metric for the channel in this month
        const latest = metrics.reduce((a, b) =>
          new Date(a.date) > new Date(b.date) ? a : b,
        );

        channelMetrics[channel].push({ ...latest, month });
      } else {
        // No data for this channel in this month
        channelMetrics[channel].push({ month });
      }
    }
  }

  // Calculate summary values for dashboard cards
  // 1. Find latest month label (for display)
  const latestMonth = months[months.length - 1];

  // 2. Total YouTube Views (Latest Month): sum views for latest month across all channels
  let totalViewsLatestMonth = 0;

  if (latestMonth) {
    for (const channel of channels) {
      const arr = channelMetrics[channel] || [];
      const latest = arr.find((m) => m.month === latestMonth);

      if (latest) totalViewsLatestMonth += latest.views || 0;
    }
  }

  // 3. Subscribers Gained (YTD): sum (latest - oldest) audienceSize for each channel (last 6 months)
  let totalSubscribersGained = 0;
  for (const channel of channels) {
    const arr = channelMetrics[channel] || [];
    if (arr.length > 0) {
      const oldest = arr[0];
      const latest = arr[arr.length - 1];
      if (
        oldest &&
        latest &&
        typeof oldest.audienceSize === "number" &&
        typeof latest.audienceSize === "number"
      ) {
        totalSubscribersGained += latest.audienceSize - oldest.audienceSize;
      }
    }
  }

  // 4. Total Income (Latest Month): sum estimatedRevenueUsd for latest month across all channels
  let totalIncomeLatestMonth = 0;

  if (latestMonth) {
    for (const channel of channels) {
      const arr = channelMetrics[channel] || [];
      const latest = arr.find((m) => m.month === latestMonth);

      if (latest) totalIncomeLatestMonth += latest.estimatedRevenueUsd || 0;
    }
  }

  // 5. Bar chart: aggregate views and CPM per month (across all channels)
  // Only keep the last 6 months
  const last6MonthsKeys = months.slice(-6); // These are "YYYY-M" formatted

  const barChartData = last6MonthsKeys.map((monthKey) => {
    const monthData: any = {
      month: monthKey, // Keep "YYYY-M" for now, can be formatted in component if needed
    };

    let totalViewsThisMonth = 0;
    let totalAdRevenueThisMonth = 0;

    for (const channel of channels) {
      const channelSpecificMetrics = channelMetrics[channel] || [];
      const metricForMonth = channelSpecificMetrics.find((m: any) => m.month === monthKey);

      let views = 0;
      let adRevenue = 0;

      if (metricForMonth) {
        views = metricForMonth.views || 0;
        adRevenue = metricForMonth.adRevenueUsd || 0;
      }

      const cpm = views > 0 ? (adRevenue / views) * 1000 : 0;

      monthData[`views_${channel}`] = views;
      monthData[`cpm_${channel}`] = Math.round(cpm * 100) / 100;

      totalViewsThisMonth += views;
      totalAdRevenueThisMonth += adRevenue;
    }

    // Add aggregated values for single channel display or overall summary
    monthData.views = totalViewsThisMonth;
    const aggregatedCpm = totalViewsThisMonth > 0 ? (totalAdRevenueThisMonth / totalViewsThisMonth) * 1000 : 0;
    monthData.cpm = Math.round(aggregatedCpm * 100) / 100;

    return monthData;
  });

  return {
    channelMetrics, // { [channelId]: [ { ...metric, month } ] }
    barChartData, // [{ month, views, cpm, views_channel1, cpm_channel1, ... }]
    months: last6MonthsKeys, // Pass only the last 6 months keys
    channels,
    totalViewsLatestMonth,
    totalSubscribersGained,
    totalIncomeLatestMonth,
  };
}
