"use client";

import { useEffect, useState } from 'react';
import { fetchLatestCreditScore, fetchCreditScoreHistory } from '@/services/api/metrics';
import CreditScoreSummary from './components/CreditScoreSummary';
import CreditScoreChart from './components/CreditScoreChart';
import FactorBreakdown from './components/FactorBreakdown';
import PlatformScores from './components/PlatformScores';
import { Spinner } from '@/components/ui/spinner';

export default function CreditScorePage() {
  const [latestCreditScore, setLatestCreditScore] = useState<any>(null);
  const [creditScoreHistory, setCreditScoreHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Get creatorId from localStorage
  const getCreatorId = () => {
    if (typeof window === 'undefined') return null;
    const localUser = localStorage.getItem("user");
    return localUser ? JSON.parse(localUser).creatorId : null;
  };

  useEffect(() => {
    const creatorId = getCreatorId();
    if (!creatorId) {
      setError('User information not found. Please log in again.');
      setLoading(false);
      return;
    }

    const fetchCreditScoreData = async () => {
      try {
        const [latest, history] = await Promise.all([
          fetchLatestCreditScore(creatorId),
          fetchCreditScoreHistory(creatorId)
        ]);
        setLatestCreditScore(latest);
        setCreditScoreHistory(history || []);
      } catch (err) {
        console.error("Error fetching credit score data:", err);
        setError('Failed to load credit score data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCreditScoreData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center bg-black min-h-screen">
        <Spinner size="lg" />
        <p className="text-[#D4D4D8] mt-4">Loading credit score data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center bg-black min-h-screen p-8">
        <div className="bg-[#18181b] rounded-xl p-6 max-w-md text-center">
          <h1 className="text-white text-2xl font-['Space_Grotesk'] font-bold mb-4">Error</h1>
          <p className="text-[#D4D4D8] mb-6">{error}</p>
          <button 
            className="px-6 py-2 bg-gradient-to-r from-[#6E21DB] to-[#9E00F9] rounded-lg text-white font-medium"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 bg-black min-h-screen p-4 md:p-8">
      <h1 className="text-white text-3xl md:text-4xl font-['Space_Grotesk'] font-bold mb-2">Credit Score</h1>
      
      {latestCreditScore ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-1">
            <CreditScoreSummary scoreData={latestCreditScore} />
            <FactorBreakdown scoreData={latestCreditScore} />
          </div>
          <div className="xl:col-span-2 flex flex-col gap-6">
            <CreditScoreChart 
              historyData={creditScoreHistory} 
              rawHistoryForClickHandler={creditScoreHistory} 
            />
            <PlatformScores scoreData={latestCreditScore} />
          </div>
        </div>
      ) : (
        <div className="bg-[#18181b] rounded-xl p-6 text-center">
          <p className="text-[#D4D4D8] text-lg">No credit score data available yet.</p>
          <p className="text-[#A1A1AA] mt-2">Connect your platforms to generate a creator credit score.</p>
        </div>
      )}
    </div>
  );
}
