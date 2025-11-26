import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { APP_VERSION } from '@/version';
import { clearAllCaches, checkVersionAndReload } from '@/utils/clearCache';

// Loading component for Suspense fallback
const PageLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-navy-900 to-purple-900 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold-300 mb-4"></div>
      <p className="text-white text-lg">Loading...</p>
    </div>
  </div>
);

// Eager-load critical pages (Home, Login, Dashboard)
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Signup } from '@/pages/Signup';
import { Dashboard } from '@/pages/Dashboard';

// Lazy-load everything else for code-splitting
const BeltSystem = lazy(() => import('@/pages/BeltSystem').then(m => ({ default: m.BeltSystem })));
const Assessments = lazy(() => import('@/pages/Assessments').then(m => ({ default: m.Assessments })));
const OpenMat = lazy(() => import('@/pages/OpenMat').then(m => ({ default: m.OpenMat })));
const Badges = lazy(() => import('@/pages/Badges').then(m => ({ default: m.Badges })));
const Leaderboard = lazy(() => import('@/pages/Leaderboard').then(m => ({ default: m.Leaderboard })));
const Profile = lazy(() => import('@/pages/Profile').then(m => ({ default: m.Profile })));
const Settings = lazy(() => import('@/pages/Settings').then(m => ({ default: m.Settings })));

// Lazy-load assessments
const WorkerTypeAssessment = lazy(() => import('@/pages/assessments/WorkerTypeAssessment').then(m => ({ default: m.WorkerTypeAssessment })));
const MentalWellnessAssessment = lazy(() => import('@/pages/assessments/MentalWellnessAssessment').then(m => ({ default: m.MentalWellnessAssessment })));
const WorkLifeBalanceAssessment = lazy(() => import('@/pages/assessments/WorkLifeBalanceAssessment').then(m => ({ default: m.WorkLifeBalanceAssessment })));
const LeadershipStyleAssessment = lazy(() => import('@/pages/assessments/LeadershipStyleAssessment').then(m => ({ default: m.LeadershipStyleAssessment })));
const CommunicationStyleAssessment = lazy(() => import('@/pages/assessments/CommunicationStyleAssessment').then(m => ({ default: m.CommunicationStyleAssessment })));
const DecisionMakingAssessment = lazy(() => import('@/pages/assessments/DecisionMakingAssessment').then(m => ({ default: m.DecisionMakingAssessment })));
const ValuesDiscoveryAssessment = lazy(() => import('@/pages/assessments/ValuesDiscoveryAssessment').then(m => ({ default: m.ValuesDiscoveryAssessment })));

// Lazy-load tools
const BoxBreathing = lazy(() => import('@/pages/tools/BoxBreathing').then(m => ({ default: m.BoxBreathing })));
const MorningRoutine = lazy(() => import('@/pages/tools/MorningRoutine').then(m => ({ default: m.MorningRoutine })));

// Lazy-load White Belt (quizzes embedded in stripe pages)
const WhiteBeltStripe1 = lazy(() => import('@/pages/belt-system/white/Stripe1').then(m => ({ default: m.Stripe1 })));
const WhiteBeltStripe2 = lazy(() => import('@/pages/belt-system/white/Stripe2').then(m => ({ default: m.WhiteBeltStripe2 })));
const WhiteBeltStripe3 = lazy(() => import('@/pages/belt-system/white/Stripe3').then(m => ({ default: m.WhiteBeltStripe3 })));
const WhiteBeltStripe4 = lazy(() => import('@/pages/belt-system/white/Stripe4').then(m => ({ default: m.WhiteBeltStripe4 })));

// Lazy-load Blue Belt
const BlueBeltStripe1 = lazy(() => import('@/pages/belt-system/blue/Stripe1').then(m => ({ default: m.BlueBeltStripe1 })));
const BlueBeltStripe2 = lazy(() => import('@/pages/belt-system/blue/Stripe2').then(m => ({ default: m.BlueBeltStripe2 })));
const BlueBeltStripe3 = lazy(() => import('@/pages/belt-system/blue/Stripe3').then(m => ({ default: m.BlueBeltStripe3 })));
const BlueBeltStripe4 = lazy(() => import('@/pages/belt-system/blue/Stripe4').then(m => ({ default: m.BlueBeltStripe4 })));
const BlueBeltAssessment = lazy(() => import('@/pages/belt-system/blue/Assessment').then(m => ({ default: m.BlueBeltAssessment })));

// Lazy-load Purple Belt
const PurpleBeltStripe1 = lazy(() => import('@/pages/belt-system/purple/Stripe1').then(m => ({ default: m.PurpleBeltStripe1 })));
const PurpleBeltStripe2 = lazy(() => import('@/pages/belt-system/purple/Stripe2').then(m => ({ default: m.PurpleBeltStripe2 })));
const PurpleBeltStripe3 = lazy(() => import('@/pages/belt-system/purple/Stripe3').then(m => ({ default: m.PurpleBeltStripe3 })));
const PurpleBeltStripe4 = lazy(() => import('@/pages/belt-system/purple/Stripe4').then(m => ({ default: m.PurpleBeltStripe4 })));
const PurpleBeltAssessment = lazy(() => import('@/pages/belt-system/purple/Assessment').then(m => ({ default: m.PurpleBeltAssessment })));

// Lazy-load Brown Belt
const BrownBeltStripe1 = lazy(() => import('@/pages/belt-system/brown/Stripe1').then(m => ({ default: m.BrownBeltStripe1 })));
const BrownBeltStripe2 = lazy(() => import('@/pages/belt-system/brown/Stripe2').then(m => ({ default: m.BrownBeltStripe2 })));
const BrownBeltStripe3 = lazy(() => import('@/pages/belt-system/brown/Stripe3').then(m => ({ default: m.BrownBeltStripe3 })));
const BrownBeltStripe4 = lazy(() => import('@/pages/belt-system/brown/Stripe4').then(m => ({ default: m.BrownBeltStripe4 })));
const BrownBeltAssessment = lazy(() => import('@/pages/belt-system/brown/Assessment').then(m => ({ default: m.BrownBeltAssessment })));

// Lazy-load Black Belt
const BlackBeltStripe1 = lazy(() => import('@/pages/belt-system/black/Stripe1').then(m => ({ default: m.BlackBeltStripe1 })));
const BlackBeltStripe2 = lazy(() => import('@/pages/belt-system/black/Stripe2').then(m => ({ default: m.BlackBeltStripe2 })));
const BlackBeltStripe3 = lazy(() => import('@/pages/belt-system/black/Stripe3').then(m => ({ default: m.BlackBeltStripe3 })));
const BlackBeltStripe4 = lazy(() => import('@/pages/belt-system/black/Stripe4').then(m => ({ default: m.BlackBeltStripe4 })));
const BlackBeltAssessment = lazy(() => import('@/pages/belt-system/black/Assessment').then(m => ({ default: m.BlackBeltAssessment })));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  useEffect(() => {
    // Clear old caches on startup
    clearAllCaches();

    // Check version and force reload if changed
    checkVersionAndReload(APP_VERSION);

    // Log current version
    console.log(`🥋 THE GYM v${APP_VERSION}`);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
            {/* Public routes without navigation */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Routes with navigation layout */}
            <Route element={<Layout />}>
              {/* Public routes */}
              <Route path="/" element={<Home />} />

              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system"
                element={
                  <ProtectedRoute>
                    <BeltSystem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/:belt"
                element={
                  <ProtectedRoute>
                    <BeltSystem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/white/stripe-1"
                element={
                  <ProtectedRoute>
                    <WhiteBeltStripe1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/white/stripe-2"
                element={
                  <ProtectedRoute>
                    <WhiteBeltStripe2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/white/stripe-3"
                element={
                  <ProtectedRoute>
                    <WhiteBeltStripe3 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/white/stripe-4"
                element={
                  <ProtectedRoute>
                    <WhiteBeltStripe4 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/blue/stripe-1"
                element={
                  <ProtectedRoute>
                    <BlueBeltStripe1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/blue/stripe-2"
                element={
                  <ProtectedRoute>
                    <BlueBeltStripe2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/blue/stripe-3"
                element={
                  <ProtectedRoute>
                    <BlueBeltStripe3 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/blue/stripe-4"
                element={
                  <ProtectedRoute>
                    <BlueBeltStripe4 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/blue/assessment"
                element={
                  <ProtectedRoute>
                    <BlueBeltAssessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/purple/stripe-1"
                element={
                  <ProtectedRoute>
                    <PurpleBeltStripe1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/purple/stripe-2"
                element={
                  <ProtectedRoute>
                    <PurpleBeltStripe2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/purple/stripe-3"
                element={
                  <ProtectedRoute>
                    <PurpleBeltStripe3 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/purple/stripe-4"
                element={
                  <ProtectedRoute>
                    <PurpleBeltStripe4 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/purple/assessment"
                element={
                  <ProtectedRoute>
                    <PurpleBeltAssessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/brown/stripe-1"
                element={
                  <ProtectedRoute>
                    <BrownBeltStripe1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/brown/stripe-2"
                element={
                  <ProtectedRoute>
                    <BrownBeltStripe2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/brown/stripe-3"
                element={
                  <ProtectedRoute>
                    <BrownBeltStripe3 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/brown/stripe-4"
                element={
                  <ProtectedRoute>
                    <BrownBeltStripe4 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/brown/assessment"
                element={
                  <ProtectedRoute>
                    <BrownBeltAssessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/black/stripe-1"
                element={
                  <ProtectedRoute>
                    <BlackBeltStripe1 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/black/stripe-2"
                element={
                  <ProtectedRoute>
                    <BlackBeltStripe2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/black/stripe-3"
                element={
                  <ProtectedRoute>
                    <BlackBeltStripe3 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/black/stripe-4"
                element={
                  <ProtectedRoute>
                    <BlackBeltStripe4 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/belt-system/black/assessment"
                element={
                  <ProtectedRoute>
                    <BlackBeltAssessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessments"
                element={
                  <ProtectedRoute>
                    <Assessments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessments/worker-type"
                element={
                  <ProtectedRoute>
                    <WorkerTypeAssessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessments/mental-health"
                element={
                  <ProtectedRoute>
                    <MentalWellnessAssessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessments/work-life-balance"
                element={
                  <ProtectedRoute>
                    <WorkLifeBalanceAssessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessments/leadership-style"
                element={
                  <ProtectedRoute>
                    <LeadershipStyleAssessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessments/communication-style"
                element={
                  <ProtectedRoute>
                    <CommunicationStyleAssessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessments/decision-making"
                element={
                  <ProtectedRoute>
                    <DecisionMakingAssessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessments/values-discovery"
                element={
                  <ProtectedRoute>
                    <ValuesDiscoveryAssessment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/badges"
                element={
                  <ProtectedRoute>
                    <Badges />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <ProtectedRoute>
                    <Leaderboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assessments/:type"
                element={
                  <ProtectedRoute>
                    <Assessments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/open-mat"
                element={
                  <ProtectedRoute>
                    <OpenMat />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/open-mat/box-breathing"
                element={
                  <ProtectedRoute>
                    <BoxBreathing />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/open-mat/morning-routine"
                element={
                  <ProtectedRoute>
                    <MorningRoutine />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/open-mat/:tool"
                element={
                  <ProtectedRoute>
                    <OpenMat />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-6xl mb-4 block">🥋</span>
                      <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
                      <p className="text-white/60 mb-6">The page you're looking for doesn't exist.</p>
                      <a href="/" className="btn btn-primary">
                        Go Home
        </a>
      </div>
      </div>
                }
              />
            </Route>
          </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
