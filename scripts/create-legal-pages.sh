#!/bin/bash

# Extract templates from APP-STORE-DEPLOYMENT-GUIDE.md and create actual files

# Create privacy-policy.html
cat > privacy-policy.html << 'HTML_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Privacy Policy | Tap-In Leadership Academy</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1.6;
      background: #1a1d2e;
      color: white;
    }
    h1 { color: #4a7c9c; }
    h2 { color: #6fa8d8; margin-top: 2rem; }
  </style>
</head>
<body>
  <h1>Privacy Policy</h1>
  <p><strong>Last Updated:</strong> November 27, 2024</p>

  <h2>1. Introduction</h2>
  <p>
    Tap-In Leadership Academy ("we", "our", or "us") is committed to protecting your privacy. 
    This policy explains how we handle your information.
  </p>

  <h2>2. Data We Collect</h2>
  <p><strong>We collect ZERO personal data.</strong></p>
  <p>Tap-In is privacy-first by design:</p>
  <ul>
    <li>❌ NO emails collected</li>
    <li>❌ NO names stored</li>
    <li>❌ NO passwords required</li>
    <li>❌ NO tracking cookies</li>
    <li>❌ NO analytics that identify you</li>
  </ul>

  <h2>3. What IS Stored</h2>
  <p>Your progress is saved <strong>locally on your device only</strong> using localStorage:</p>
  <ul>
    <li>✅ Your XP and belt level</li>
    <li>✅ Completed lessons</li>
    <li>✅ Assessment results (stored on YOUR device)</li>
    <li>✅ Language preference</li>
  </ul>
  <p><strong>This data never leaves your device unless you explicitly export it.</strong></p>

  <h2>4. Third-Party Services</h2>
  <p>Tap-In uses:</p>
  <ul>
    <li><strong>Netlify</strong> (hosting) - No tracking, just hosting</li>
    <li><strong>Google Fonts</strong> (typography) - No tracking</li>
  </ul>
  <p>We do NOT use Google Analytics, Facebook Pixel, or any tracking scripts.</p>

  <h2>5. Your Rights</h2>
  <p>Since we don't collect your data, there's nothing to delete, export, or request!</p>
  <p>You control 100% of your data through your browser's localStorage.</p>

  <h2>6. Children's Privacy</h2>
  <p>Tap-In is designed for adults (18+). We do not knowingly collect data from children.</p>

  <h2>7. Changes to This Policy</h2>
  <p>We may update this policy. Check this page periodically. Last updated: November 27, 2024.</p>

  <h2>8. Contact Us</h2>
  <p>
    Questions about privacy?<br>
    Email: koeniger.marco@gmail.com<br>
    Website: https://tap-in-the-gym.netlify.app
  </p>

  <hr style="margin: 3rem 0; border-color: rgba(255,255,255,0.2);">
  
  <p style="text-align: center; color: rgba(255,255,255,0.6);">
    <a href="index-DUAL-ENTRY.html" style="color: #4a7c9c;">← Back to Tap-In</a>
  </p>
</body>
</html>
HTML_EOF

echo "✅ Created privacy-policy.html"

# Create terms-of-service.html
cat > terms-of-service.html << 'HTML_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Terms of Service | Tap-In Leadership Academy</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1.6;
      background: #1a1d2e;
      color: white;
    }
    h1 { color: #4a7c9c; }
    h2 { color: #6fa8d8; margin-top: 2rem; }
  </style>
</head>
<body>
  <h1>Terms of Service</h1>
  <p><strong>Last Updated:</strong> November 27, 2024</p>

  <h2>1. Acceptance of Terms</h2>
  <p>
    By accessing Tap-In Leadership Academy, you agree to these terms. 
    If you don't agree, please don't use our platform.
  </p>

  <h2>2. Description of Service</h2>
  <p>Tap-In provides:</p>
  <ul>
    <li>Leadership training content</li>
    <li>Professional assessments</li>
    <li>Progress tracking tools</li>
    <li>Team collaboration features</li>
  </ul>
  <p>All content is for educational purposes.</p>

  <h2>3. User Responsibilities</h2>
  <p>You agree to:</p>
  <ul>
    <li>Use the platform for its intended purpose</li>
    <li>Not share copyrighted content</li>
    <li>Not attempt to hack or disrupt the service</li>
    <li>Respect other users (in team features)</li>
  </ul>

  <h2>4. Intellectual Property</h2>
  <p>
    All content, assessments, and materials are © 2024 Marco Koeniger / Tap-In Leadership Academy.
  </p>
  <p>
    You may use the platform for personal or business use, but may not resell or redistribute our content.
  </p>

  <h2>5. Disclaimers</h2>
  <p><strong>Tap-In is provided "as is" without warranties.</strong></p>
  <p>
    We strive for accuracy but can't guarantee all information is perfect. 
    Use your judgment when applying leadership concepts.
  </p>

  <h2>6. Limitation of Liability</h2>
  <p>
    We're not liable for any damages arising from use of Tap-In. 
    This includes lost data, business losses, or other issues.
  </p>

  <h2>7. Changes to Service</h2>
  <p>
    We may update, modify, or discontinue features at any time. 
    We'll communicate major changes via the platform.
  </p>

  <h2>8. Termination</h2>
  <p>
    You can stop using Tap-In anytime by clearing your browser data.
    We may restrict access if terms are violated.
  </p>

  <h2>9. Governing Law</h2>
  <p>These terms are governed by German law (since Marco is based in Germany).</p>

  <h2>10. Contact</h2>
  <p>
    Questions about these terms?<br>
    Email: koeniger.marco@gmail.com
  </p>

  <hr style="margin: 3rem 0; border-color: rgba(255,255,255,0.2);">
  
  <p style="text-align: center; color: rgba(255,255,255,0.6);">
    <a href="index-DUAL-ENTRY.html" style="color: #4a7c9c;">← Back to Tap-In</a>
  </p>
</body>
</html>
HTML_EOF

echo "✅ Created terms-of-service.html"

# Create support.html
cat > support.html << 'HTML_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Support | Tap-In Leadership Academy</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
      line-height: 1.6;
      background: #1a1d2e;
      color: white;
    }
    h1 { color: #4a7c9c; }
    h2 { color: #6fa8d8; margin-top: 2rem; }
    .faq {
      background: rgba(255,255,255,0.05);
      padding: 1.5rem;
      border-radius: 12px;
      margin: 1rem 0;
      border-left: 3px solid #4a7c9c;
    }
  </style>
</head>
<body>
  <h1>🆘 Support & FAQ</h1>

  <h2>📧 Contact Us</h2>
  <p>
    <strong>Email:</strong> koeniger.marco@gmail.com<br>
    <strong>Response Time:</strong> Within 24 hours<br>
    <strong>Website:</strong> https://tap-in-the-gym.netlify.app
  </p>

  <h2>❓ Frequently Asked Questions</h2>

  <div class="faq">
    <h3>How do I start my training?</h3>
    <p>
      1. Take the Belt Assessment to find your starting level<br>
      2. Choose "The Gym" for personal development<br>
      3. Start with White Belt, Stripe 1<br>
      4. Complete lessons to earn XP and unlock new content
    </p>
  </div>

  <div class="faq">
    <h3>Is my progress saved?</h3>
    <p>
      Yes! Your progress is automatically saved to your device using localStorage. 
      You can also use the QR Code Backup feature (Profile → Backup) to save your progress 
      and restore it on other devices.
    </p>
  </div>

  <div class="faq">
    <h3>How do I switch to German?</h3>
    <p>
      Click the language switcher (🇩🇪 Deutsch) in the top-right corner of any page.
      Your language preference is saved automatically.
    </p>
  </div>

  <div class="faq">
    <h3>Can I use Tap-In offline?</h3>
    <p>
      Yes! Tap-In is a Progressive Web App (PWA) that works 100% offline after your 
      first visit. Install it to your home screen for the best experience.
    </p>
  </div>

  <div class="faq">
    <h3>How do I install as an app?</h3>
    <p>
      <strong>On iPhone:</strong> Safari → Share → Add to Home Screen<br>
      <strong>On Android:</strong> Chrome → Menu (⋮) → Install app<br>
      <strong>On Desktop:</strong> Look for install icon in browser address bar
    </p>
  </div>

  <div class="faq">
    <h3>What's the difference between The Gym and The Hub?</h3>
    <p>
      <strong>The Gym:</strong> Personal leadership development through belt progression<br>
      <strong>The Hub:</strong> Business-focused courses (Energy Management, Boundaries, etc.)<br>
      Both earn XP and contribute to your overall progress!
    </p>
  </div>

  <div class="faq">
    <h3>How does the Talent Finder work?</h3>
    <p>
      The Talent Finder identifies if you're a Sprinter (fast, intense), Jogger (steady, reliable), 
      or Ultrarunner (strategic, long-term). This helps you understand your working style and 
      build balanced teams.
    </p>
  </div>

  <div class="faq">
    <h3>Can I use this for my team?</h3>
    <p>
      Yes! Use the Business Portal to:
      - Invite team members
      - Analyze team composition
      - Get hiring recommendations
      - Track collective progress
    </p>
  </div>

  <div class="faq">
    <h3>Is Tap-In free?</h3>
    <p>
      Yes! All features are currently free while we're in beta. 
      We may introduce paid tiers for advanced business features in the future.
    </p>
  </div>

  <div class="faq">
    <h3>My progress disappeared! Help!</h3>
    <p>
      This happens if you cleared your browser data. To prevent this:
      1. Go to Profile → Backup
      2. Generate QR Code
      3. Save the QR code image
      4. Use it to restore progress anytime
    </p>
  </div>

  <div class="faq">
    <h3>I found a bug. How do I report it?</h3>
    <p>
      Email koeniger.marco@gmail.com with:
      - Description of the bug
      - What you were doing when it happened
      - Your browser and device info
      - Screenshot (if possible)
    </p>
  </div>

  <div class="faq">
    <h3>Can I suggest a feature?</h3>
    <p>
      Absolutely! Email your ideas to koeniger.marco@gmail.com. 
      We're actively developing based on user feedback.
    </p>
  </div>

  <hr style="margin: 3rem 0; border-color: rgba(255,255,255,0.2);">
  
  <p style="text-align: center; color: rgba(255,255,255,0.6);">
    <a href="index-DUAL-ENTRY.html" style="color: #4a7c9c;">← Back to Tap-In</a>
  </p>
</body>
</html>
HTML_EOF

echo "✅ Created support.html"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ ALL 3 LEGAL PAGES CREATED!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
ls -lh privacy-policy.html terms-of-service.html support.html

