import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
  style?: React.CSSProperties;
}

export function Skeleton({ className = '', animate = true, style }: SkeletonProps) {
  const baseClasses = 'bg-white/5 rounded';
  
  if (animate) {
    return (
      <motion.div
        className={`${baseClasses} ${className}`}
        style={style}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    );
  }

  return <div className={`${baseClasses} ${className}`} style={style} />;
}

export function SkeletonCard() {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-24 w-full mb-3" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10">
          <Skeleton className="h-8 w-16 mx-auto mb-2" />
          <Skeleton className="h-4 w-20 mx-auto" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonList({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg p-3 sm:p-4">
          <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonBeltJourney() {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
      <Skeleton className="h-6 w-40 mb-6" />
      <div className="flex gap-2 sm:gap-3 items-center justify-between">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonProgressChart() {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
      <Skeleton className="h-6 w-48 mb-6" />
      <div className="flex items-end justify-between gap-2 h-48">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <Skeleton key={i} className="w-full" style={{ height: `${Math.random() * 60 + 40}%` }} />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <Skeleton key={day} className="h-3 w-8" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonAchievements() {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
      <Skeleton className="h-6 w-32 mb-6" />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="text-center">
            <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl mx-auto mb-2" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonNextUp() {
  return (
    <div className="bg-gradient-to-br from-gold-300/10 to-gold-300/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gold-300/20">
      <Skeleton className="h-6 w-24 mb-4" />
      <Skeleton className="h-8 w-3/4 mb-3" />
      <Skeleton className="h-4 w-1/2 mb-6" />
      <Skeleton className="h-12 w-full rounded-lg" />
    </div>
  );
}

export function SkeletonProfileHeader() {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-white/10">
      <div className="flex items-center gap-4 mb-6">
        <Skeleton className="w-20 h-20 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
      <Skeleton className="h-20 w-full rounded-lg" />
    </div>
  );
}

export function SkeletonLesson() {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 sm:p-6 border border-white/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <Skeleton className="w-8 h-8 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
        <Skeleton className="w-6 h-6" />
      </div>
    </div>
  );
}

