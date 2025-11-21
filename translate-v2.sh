#!/bin/bash
# Translation script for combined-leadership-profile-v2.html

sed -i '' \
  -e 's/Assessment Abgeschlossen!/Assessment Complete!/g' \
  -e 's/Deine Ergebnisse werden berechnet.../Your results are being calculated.../g' \
  -e 's/Zurück zur Standard-Version/Back to Standard Version/g' \
  -e 's/← Zurück/← Back/g' \
  -e 's/Weiter →/Next →/g' \
  -e 's/Abschnitt abschließen/Complete Section/g' \
  -e 's/Arbeitsstil/Work Style/g' \
  -e 's/Führung/Leadership/g' \
  -e 's/Team-Dynamik/Team Dynamics/g' \
  -e 's/Frage /Question /g' \
  -e 's/ von 46/ of 46/g' \
  -e 's/Wie gehst du am liebsten an deine Arbeit heran?/How do you prefer to approach your work?/g' \
  -e 's/In intensiven Schüben mit Pausen dazwischen/In intense bursts with breaks in between/g' \
  -e 's/In einem gleichmäßigen, konsistenten Tempo über den Tag/At a steady, consistent pace throughout the day/g' \
  -e 's/Langsam und methodisch, nachhaltig über lange Zeiträume/Slowly and methodically, sustainably over long periods/g' \
  -e 's/Wenn du einer Deadline gegenüberstehst:/When facing a deadline:/g' \
  -e 's/Blühst du unter Druck auf und arbeitest am besten in letzter Minute/You thrive under pressure and work best at the last minute/g' \
  -e 's/Behältst du stetigen Fortschritt bei, um pünktlich fertig zu werden/You maintain steady progress to finish on time/g' \
  -e 's/Fängst du früh an und teilst dir die Zeit ein, um Stress zu vermeiden/You start early and pace yourself to avoid stress/g' \
  -e 's/Deine Energielevel im Laufe des Tages sind:/Your energy levels throughout the day are:/g' \
  -e 's/Höhen und Tiefen - hohe Energie, dann Erholungsbedarf/Peaks and valleys - high energy, then need recovery/g' \
  -e 's/Relativ stabil und vorhersagbar/Relatively stable and predictable/g' \
  -e 's/Gleichbleibend und ausdauernd, schwanken selten/Consistently enduring, rarely fluctuate/g' \
  combined-leadership-profile-v2.html

echo "Translation complete!"
