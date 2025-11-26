import { motion } from 'framer-motion';
import { Trophy, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface StripeCompleteCardProps {
  score: number;
  total: number;
  beltColor: string;
  stripeNumber: number;
  stripeName: string;
  onContinue: () => void;
}

export function StripeCompleteCard({
  score,
  total,
  beltColor,
  stripeNumber,
  stripeName,
  onContinue
}: StripeCompleteCardProps) {
  const percentage = Math.round((score / total) * 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500 p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
        >
          <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400" />
        </motion.div>
        
        <h2 className="text-3xl font-bold text-white mb-2">
          🎉 Stripe Complete!
        </h2>
        
        <p className="text-xl text-green-300 mb-4">
          {stripeName}
        </p>
        
        <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
          <div className="text-5xl font-bold text-green-400 mb-2">
            {score}/{total}
          </div>
          <div className="text-slate-300 mb-4">
            {percentage}% Correct
          </div>
          
          <div className="flex justify-center gap-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">+{score * 25}</div>
              <div className="text-slate-400">Checkpoint XP</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">+100</div>
              <div className="text-slate-400">Completion Bonus</div>
            </div>
          </div>
        </div>
        
        <Button
          onClick={onContinue}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-4 text-lg font-bold"
        >
          {stripeNumber < 4 ? (
            <>
              Continue to Stripe {stripeNumber + 1}
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          ) : (
            <>
              {beltColor.charAt(0).toUpperCase() + beltColor.slice(1)} Belt Complete! 
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
        
        <button
          onClick={() => window.history.back()}
          className="mt-4 text-slate-400 hover:text-white transition-colors"
        >
          ← Back to Belt System
        </button>
      </Card>
    </motion.div>
  );
}

