export type ReputationSignal = 'successful_group' | 'no_show_report' | 'helpful_vote' | 'teaching_endorsement';

export class ReputationService {
  scoreFromSignals(signals: ReputationSignal[]) {
    return signals.reduce((score, signal) => {
      if (signal === 'successful_group') return score + 4;
      if (signal === 'helpful_vote' || signal === 'teaching_endorsement') return score + 2;
      if (signal === 'no_show_report') return score - 5;
      return score;
    }, 0);
  }
}