#!/bin/bash

# Quick German Translation for gym-dashboard-de.html

# Replaces common English strings with German equivalents

echo "🇩🇪 Translating gym-dashboard-de.html to German..."

# Backup first
cp gym-dashboard-de.html gym-dashboard-de-ENGLISH-BACKUP.html

echo "✓ Backup created: gym-dashboard-de-ENGLISH-BACKUP.html"

# Belt names
sed -i '' 's/White Belt/Weißgurt/g' gym-dashboard-de.html
sed -i '' 's/Blue Belt/Blaugurt/g' gym-dashboard-de.html
sed -i '' 's/Purple Belt/Lila Gurt/g' gym-dashboard-de.html
sed -i '' 's/Brown Belt/Braungurt/g' gym-dashboard-de.html
sed -i '' 's/Black Belt/Schwarzgurt/g' gym-dashboard-de.html

# Welcome section
sed -i '' 's/Welcome back/Willkommen zurück/g' gym-dashboard-de.html
sed -i '' 's/Training<\/p>/Training<\/p>/g' gym-dashboard-de.html  # Keep as "Training"

# Belt descriptions
sed -i '' 's/Foundation of Self-Awareness/Grundlage des Selbstbewusstseins/g' gym-dashboard-de.html
sed -i '' 's/Mastering Relationships/Beziehungen meistern/g' gym-dashboard-de.html
sed -i '' 's/Healthy Conflict/Gesunder Konflikt/g' gym-dashboard-de.html
sed -i '' 's/Accountability & Results/Verantwortlichkeit & Ergebnisse/g' gym-dashboard-de.html
sed -i '' 's/Vision & Strategy/Vision & Strategie/g' gym-dashboard-de.html

# Progress and stats
sed -i '' 's/Complete/Abgeschlossen/g' gym-dashboard-de.html
sed -i '' 's/ to / zum /g' gym-dashboard-de.html  # "XP to Blue Belt" → "XP zum Blaugurt"

# Daily Practice
sed -i '' 's/Today'\''s Practice/Heutige Praxis/g' gym-dashboard-de.html
sed -i '' 's/of 3 complete/von 3 abgeschlossen/g' gym-dashboard-de.html
sed -i '' 's/Morning Intention/Morgenintention/g' gym-dashboard-de.html
sed -i '' 's/Set your focus for the day/Setze deinen Fokus für den Tag/g' gym-dashboard-de.html
sed -i '' 's/Trust Module: Lesson/Vertrauens-Modul: Lektion/g' gym-dashboard-de.html
sed -i '' 's/Building Trust With Yourself/Selbstvertrauen aufbauen/g' gym-dashboard-de.html
sed -i '' 's/Evening Reflection/Abendreflexion/g' gym-dashboard-de.html
sed -i '' 's/Process your day/Verarbeite deinen Tag/g' gym-dashboard-de.html

# Buttons
sed -i '' 's/>Done</>Fertig</g' gym-dashboard-de.html
sed -i '' 's/>Start</>Starten</g' gym-dashboard-de.html

# Modules section
sed -i '' 's/Modules/Module/g' gym-dashboard-de.html
sed -i '' 's/View All/Alle ansehen/g' gym-dashboard-de.html
sed -i '' 's/Browse All/Alle durchsuchen/g' gym-dashboard-de.html

# Module names
sed -i '' 's/Self-Awareness/Selbstbewusstsein/g' gym-dashboard-de.html
sed -i '' 's/Vulnerability as Strength/Verletzlichkeit als Stärke/g' gym-dashboard-de.html
sed -i '' 's/Building Self-Trust/Selbstvertrauen aufbauen/g' gym-dashboard-de.html
sed -i '' 's/Journaling Practice/Tagebuch-Praxis/g' gym-dashboard-de.html
sed -i '' 's/Inner Critic vs Coach/Innerer Kritiker vs Coach/g' gym-dashboard-de.html
sed -i '' 's/Final/Finale/g' gym-dashboard-de.html

# Module progress
sed -i '' 's/Lessons Abgeschlossen/Lektionen abgeschlossen/g' gym-dashboard-de.html
sed -i '' 's/Locked/Gesperrt/g' gym-dashboard-de.html

# Open Mat section
sed -i '' 's/Open Mat/Offene Matte/g' gym-dashboard-de.html
sed -i '' 's/Extra training, deep dives, and discovery/Zusätzliches Training, Tiefgang und Entdeckung/g' gym-dashboard-de.html

# Stats card
sed -i '' 's/Training Streak/Trainingsserie/g' gym-dashboard-de.html
sed -i '' 's/Days in a row/Tage hintereinander/g' gym-dashboard-de.html
sed -i '' 's/Total XP/Gesamt XP/g' gym-dashboard-de.html
sed -i '' 's/Current Rank/Aktueller Rang/g' gym-dashboard-de.html

# Achievements
sed -i '' 's/Recent Achievements/Neueste Erfolge/g' gym-dashboard-de.html
sed -i '' 's/First Lesson/Erste Lektion/g' gym-dashboard-de.html
sed -i '' 's/Started your journey/Begann deine Reise/g' gym-dashboard-de.html
sed -i '' 's/Week Warrior/Wochen-Krieger/g' gym-dashboard-de.html
sed -i '' 's/7 day streak/7-Tage-Serie/g' gym-dashboard-de.html
sed -i '' 's/Trust Builder/Vertrauens-Aufbauer/g' gym-dashboard-de.html
sed -i '' 's/Abgeschlossend Trust modules/Abgeschlossene Vertrauens-Module/g' gym-dashboard-de.html

echo "✅ Translation complete!"
echo ""
echo "Changed:"
echo "  • All belt names (White→Weißgurt, Blue→Blaugurt, etc.)"
echo "  • Welcome message (Welcome back→Willkommen zurück)"
echo "  • All module names"
echo "  • All UI strings (Done→Fertig, Start→Starten, etc.)"
echo "  • Stats and progress labels"
echo ""
echo "⚠️  Note: JavaScript date strings need manual translation"
echo "    Edit line ~1890 for German day/month names"
echo ""
echo "Test: Open gym-dashboard-de.html in browser"

