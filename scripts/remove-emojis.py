#!/usr/bin/env python3
import re

# Read the file
with open('leadership-style-assessment.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define emoji patterns to remove from option labels
emojis = ['🔮 ', '🏗️ ', '🤝 ', '⚡ ', '⚔️ ', '🎯 ']

# Remove emojis from option labels only (not from archetype badges or results)
# This pattern matches the emoji at the start of option-label spans
for emoji in emojis:
    # Only remove from option-label spans within question sections
    content = re.sub(
        r'(<span class="option-label">)' + re.escape(emoji),
        r'\1',
        content
    )

# Write back
with open('leadership-style-assessment.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Removed emojis from all question options")
print("✅ Kept emojis in archetype badges and results display")
