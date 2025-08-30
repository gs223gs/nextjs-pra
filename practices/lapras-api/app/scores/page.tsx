import { fetchLaprasProfile } from "../actions";
import type { LaprasScore, LaprasBasicInfo } from "../types/lapras";
import { ScoreCard } from "../components/ScoreCard";



export default async function ScoresPage() {
  const profile = await fetchLaprasProfile();

  const scoreData: LaprasScore = {
    e_score: profile.e_score,
    b_score: profile.b_score,
    i_score: profile.i_score,
  };

  return (
    <div className="grid gap-6 md: grid-cols-1 lg:grid-cols-3 w-full max-w-lg ">
      <ScoreCard type="engineer" value={scoreData.e_score} />
      <ScoreCard type="business" value={scoreData.b_score} />
      <ScoreCard type="influence" value={scoreData.i_score} />
    </div>
  );
}
