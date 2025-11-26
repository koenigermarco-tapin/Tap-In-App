#!/usr/bin/env python3
"""
Script to integrate StripeQuiz component into all stripe pages
Applies the same pattern used in White Belt Stripe 1
"""

import re
import sys

def integrate_quiz_into_stripe(file_path, belt_name, stripe_number, content_import, stripe_name):
    """
    Integrates quiz component into a stripe page
    """
    try:
        with open(file_path, 'r') as f:
            content = f.read()
        
        # Step 1: Add imports if not present
        if 'StripeQuiz' not in content:
            # Find the imports section and add StripeQuiz and content imports
            import_pattern = r"(import confetti from 'canvas-confetti';)"
            if re.search(import_pattern, content):
                content = re.sub(
                    import_pattern,
                    r"import { StripeQuiz } from '@/components/quiz/StripeQuiz';\n" + 
                    f"import {{ {content_import} }} from '@/content/{belt_name}BeltContent';\n" +
                    r"\1",
                    content
                )
        
        # Step 2: Add state variables if not present
        if 'quizPassed' not in content:
            # Find the function definition and add quiz state
            func_pattern = rf"(export function {belt_name.capitalize()}BeltStripe{stripe_number}\(\) {{\s*const navigate = useNavigate\(\);\s*const {{ completeModule, addXP }} = useGamification\(\);\s*const \[completedLessons, setCompletedLessons\] = useState<number\[\]>\(\[\]\);\s*const \[expandedLesson, setExpandedLesson\] = useState<number \| null>\(null\);\s*const \[showCelebration, setShowCelebration\] = useState\(false\);)"
            
            quiz_state = f"""
  const [quizPassed, setQuizPassed] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  
  const stripeQuiz = {content_import}[{stripe_number - 1}].quiz; // Stripe {stripe_number}"""
            
            content = re.sub(func_pattern, r"\1" + quiz_state, content, flags=re.MULTILINE)
        
        # Step 3: Update useEffect to show quiz
        useeffect_pattern = r"// Auto-expand first incomplete lesson on load\s*useEffect\(\(\) => \{\s*const firstIncomplete = lessons\.find\(l => !completedLessons\.includes\(l\.id\)\);\s*if \(firstIncomplete && expandedLesson === null\) \{\s*setExpandedLesson\(firstIncomplete\.id\);\s*\}\s*\}, \[completedLessons, expandedLesson\]\);"
        
        useeffect_replacement = """// Auto-expand first incomplete lesson on load, show quiz when all lessons done
  useEffect(() => {
    const firstIncomplete = lessons.find(l => !completedLessons.includes(l.id));
    if (firstIncomplete && expandedLesson === null) {
      setExpandedLesson(firstIncomplete.id);
    } else if (completedLessons.length === lessons.length && !quizPassed) {
      setShowQuiz(true);
    }
  }, [completedLessons, expandedLesson, quizPassed]);"""
        
        if re.search(useeffect_pattern, content, flags=re.MULTILINE):
            content = re.sub(useeffect_pattern, useeffect_replacement, content, flags=re.MULTILINE)
        
        # Step 4: Update completeLesson function
        # This is complex, so I'll look for the end of completeLesson and add handleQuizComplete
        if 'handleQuizComplete' not in content:
            # Find where completeLesson ends and add handleQuizComplete after it
            complete_lesson_pattern = r"(const completeLesson = async \(lessonId: number\) => \{[^}]+\}\);)"
            
            # Replace the completeLesson logic to show quiz instead of celebration
            # This is tricky - let me just add the handler after the function
            handler = f"""
  
  const handleQuizComplete = async (_score: number, _total: number, passed: boolean) => {{
    if (passed && !quizPassed) {{
      setQuizPassed(true);
      await addXP(50, '{belt_name.capitalize()} Belt Stripe {stripe_number} Quiz Passed');
      await completeModule('{belt_name}-stripe-{stripe_number}');
      setShowCelebration(true);
      
      confetti({{
        particleCount: 100,
        spread: 70,
        origin: {{ y: 0.6 }}
      }});
    }}
  }};"""
            
            toggle_pattern = r"(const toggleLesson = \(lessonId: number\) => \{[^}]+\};)"
            content = re.sub(toggle_pattern, r"\1" + handler, content)
        
        # Step 5: Add quiz JSX before AnimatePresence celebration
        if 'Quiz Section - Show after all lessons complete' not in content:
            quiz_jsx = f"""
        {{/* Quiz Section - Show after all lessons complete */}}
        {{showQuiz && completedLessons.length === lessons.length && (
          <div className="mb-8">
            <Card className="mb-6 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  📝 Knowledge Check
                </h2>
                <p className="text-slate-300 mb-4">
                  Test your understanding of {stripe_name}. You need 70% to pass and complete this stripe.
                </p>
              </div>
            </Card>
            
            <StripeQuiz
              questions={{stripeQuiz}}
              onComplete={{handleQuizComplete}}
              stripeName="{stripe_name}"
              beltColor="{belt_name}"
              stripeNumber={{{stripe_number}}}
            />
          </div>
        )}}

        """
            
            # Insert before AnimatePresence celebration
            celebration_pattern = r"(\s+<AnimatePresence>\s+\{showCelebration && \()"
            content = re.sub(celebration_pattern, quiz_jsx + r"\1", content)
        
        # Write back
        with open(file_path, 'w') as f:
            f.write(content)
        
        print(f"✓ {file_path} updated with quiz integration")
        return True
        
    except Exception as e:
        print(f"✗ Error updating {file_path}: {e}")
        return False

# This is a more surgical approach - let me just manually update the files
# The regex approach is getting too complex
print("Quiz integration script ready - but manual updates are safer")
print("Proceeding with manual file updates...")

