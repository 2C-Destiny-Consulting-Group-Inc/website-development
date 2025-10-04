#!/bin/bash
echo "=== Testing Website Structure ==="
echo ""

# Test 1: Check all HTML files exist
echo "Test 1: Checking HTML files..."
files=("index.html" "about.html" "contact.html" "donate.html" "meet-the-team.html" "pillars.html" "signature-programs.html" "fatherhood.html")
all_exist=true
for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "  ✓ $file exists"
  else
    echo "  ✗ $file missing"
    all_exist=false
  fi
done

# Test 2: Check styles.css exists
echo ""
echo "Test 2: Checking CSS file..."
if [ -f "styles.css" ]; then
  echo "  ✓ styles.css exists"
else
  echo "  ✗ styles.css missing"
  all_exist=false
fi

# Test 3: Check navigation links
echo ""
echo "Test 3: Checking navigation links in index.html..."
nav_pages=("about.html" "meet-the-team.html" "pillars.html" "signature-programs.html" "fatherhood.html" "contact.html" "donate.html")
for page in "${nav_pages[@]}"; do
  if grep -q "$page" index.html; then
    echo "  ✓ $page linked"
  else
    echo "  ✗ $page not linked"
  fi
done

# Test 4: Check for broken "with temporary pics" reference
echo ""
echo "Test 4: Checking for old filename references..."
if grep -r "meet-the-team with temporary pics" *.html 2>/dev/null; then
  echo "  ✗ Found old filename reference"
else
  echo "  ✓ No old filename references"
fi

# Test 5: Check CSS variables in styles.css
echo ""
echo "Test 5: Checking CSS variables..."
if grep -q "\-\-brand-700" styles.css && grep -q "\-\-primary" styles.css; then
  echo "  ✓ CSS variables defined"
else
  echo "  ✗ CSS variables missing"
fi

echo ""
if [ "$all_exist" = true ]; then
  echo "✅ All tests passed! Website structure is ready for development."
else
  echo "❌ Some tests failed. Please review."
fi
