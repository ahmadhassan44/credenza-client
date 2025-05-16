export function getPerformanceSummary(channel: any): string {
  if (!channel.metrics || channel.metrics.length < 2) {
    return "Not enough data.";
  }
  const metrics = channel.metrics;
  const last = metrics[metrics.length - 1];
  const prev = metrics[metrics.length - 2];
  if (last.subscribers > prev.subscribers) {
    return "Your channel is growing! 📈";
  } else if (last.subscribers < prev.subscribers) {
    return "Your channel is declining. 📉";
  } else {
    return "Stable performance.";
  }
}
