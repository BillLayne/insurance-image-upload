# Photo Upload Portal - Testing Checklist

## 🧪 Complete Testing Guide

Use this checklist to verify everything works before deploying to customers.

---

## ⚙️ Pre-Testing Setup

### [ ] Step 1: Configure URLs

- [ ] Google Apps Script URL added to `index.html` (line ~1438)
- [ ] index.html deployed to web (GitHub Pages, your website, etc.)
- [ ] index.html URL added to prefill form (line ~699)
- [ ] Can open both files without errors

### [ ] Step 2: Test Environment

- [ ] Have access to a smartphone (iOS or Android)
- [ ] Have access to test email account
- [ ] Google Drive folder accessible
- [ ] Google Sheets accessible
- [ ] Agency Matrix account ready (if using)

---

## 📝 Test 1: Prefill Form Basic Functions

### [ ] Open Prefill Form
- [ ] File opens in browser without errors
- [ ] All sections visible and readable
- [ ] Form looks professional

### [ ] Type Selection
- [ ] Can click Home button - turns blue
- [ ] Can click Vehicle button - turns blue
- [ ] Can click Forms button - turns blue
- [ ] Can click Claim button - turns blue
- [ ] Only one type selected at a time

### [ ] Purpose Selection
- [ ] Can select Quote
- [ ] Can select Add Coverage
- [ ] Can select Policy Review
- [ ] Can select Claim Docs
- [ ] Only one purpose selected at a time

### [ ] Form Fields
- [ ] Customer name field accepts text
- [ ] Phone field formats as: (336) 555-1234
- [ ] Email field accepts email
- [ ] Address field accepts text
- [ ] City field accepts text
- [ ] ZIP field only accepts 5 digits
- [ ] Vehicle info field appears when Vehicle selected
- [ ] Property fields appear when Home selected

### [ ] Photo Checkboxes (Home Type)
- [ ] Front of Home checkbox works
- [ ] Back of Home checkbox works
- [ ] All checkboxes can be checked/unchecked
- [ ] "Other" text field accepts custom text
- [ ] Checkboxes disabled when Vehicle selected

### [ ] Generate Link Button
- [ ] Button enabled when name and phone filled
- [ ] Button shows "Generate Link" text
- [ ] Clicking button generates output

---

## 🔗 Test 2: Generated Links & Templates

### [ ] Link Generated
- [ ] Direct link appears in output
- [ ] Link contains customer name
- [ ] Link contains phone number
- [ ] Link contains email (if provided)
- [ ] Link contains type parameter
- [ ] Link contains purpose parameter
- [ ] Link contains photos parameter (if Home type)
- [ ] Link is properly URL-encoded

**Example check:**
```
Should see: ?customerName=John+Smith&phone=(336)+555-1234&type=HOME&purpose=quote&photos=Front+of+Home,Back+of+Home
```

### [ ] Text Message Template
- [ ] Shows customer first name
- [ ] Shows correct link
- [ ] Shows list of photos needed
- [ ] Copy button works
- [ ] Template reads naturally

### [ ] Email Template
- [ ] Shows customer full name
- [ ] Shows correct link
- [ ] Shows photo list or instructions
- [ ] Copy button works
- [ ] Professional formatting

### [ ] Action Buttons
- [ ] "Copy Text & Open Matrix" copies to clipboard
- [ ] "Copy Text & Open Matrix" opens Agency Matrix
- [ ] "Send Email (Gmail)" opens Gmail with pre-filled email
- [ ] "Open Agency Matrix" opens correct customer search
- [ ] "Test Link" opens generated URL

### [ ] QR Code
- [ ] QR code image appears
- [ ] Scanning QR code opens correct URL
- [ ] QR code contains full parameter string

---

## 📱 Test 3: Customer Portal - Desktop

### [ ] Open Generated Link on Desktop
- [ ] Page loads without errors
- [ ] Logo displays correctly
- [ ] Header shows phone number
- [ ] Welcome screen appears

### [ ] Welcome Screen
- [ ] "Welcome to Our Photo Upload Portal" title visible
- [ ] Three benefit cards visible (Quick, Secure, Mobile)
- [ ] Info box shows "What You'll Need"
- [ ] Name field pre-filled from URL
- [ ] Policy number field exists
- [ ] "Start Uploading Photos" button enabled when both fields filled

### [ ] Start Upload Process
- [ ] Clicking "Start" moves to upload screen
- [ ] Customer first name appears in greeting
- [ ] Progress shows "0/X photos" (X = number you selected)
- [ ] Progress bar at 0%

### [ ] Photo Upload Screen
- [ ] Correct number of photo cards appear
- [ ] Only the photos YOU selected appear
- [ ] Each card shows:
  - [ ] Photo title
  - [ ] Description
  - [ ] "Take Photo" button
  - [ ] "Upload File" button
- [ ] Tips box shows helpful guidance

### [ ] Upload Photo (Desktop)
- [ ] Click "Upload File" button
- [ ] File picker opens
- [ ] Select an image file
- [ ] See "Processing photo..." message
- [ ] Image preview appears
- [ ] Compression savings shown (if compressed)
- [ ] Green checkmark appears on card
- [ ] Green border around card
- [ ] Success message shows
- [ ] Progress bar updates
- [ ] Progress counter updates (1/X)

### [ ] Upload All Photos
- [ ] Upload photos to all cards
- [ ] Progress reaches 100%
- [ ] Message changes to "Perfect! All photos uploaded ✓"
- [ ] Submit button turns green
- [ ] Submit button enabled
- [ ] Submit button text: "Submit All Photos"

### [ ] Delete Photo Test
- [ ] Hover over uploaded photo
- [ ] Trash icon appears
- [ ] Click trash icon
- [ ] Photo removed
- [ ] Card returns to empty state
- [ ] Progress decreases
- [ ] Submit button disabled

### [ ] Submit Photos
- [ ] Upload all photos again
- [ ] Click "Submit All Photos" button
- [ ] Button shows "Submitting..." with spinner
- [ ] Waits a few seconds
- [ ] Confirmation screen appears
- [ ] Customer first name in confirmation
- [ ] "All Done! 🎉" message
- [ ] "What Happens Next?" section visible
- [ ] Contact buttons work

---

## 📱 Test 4: Customer Portal - Mobile

### [ ] Open Link on iPhone/Android
- [ ] Page loads and scales correctly
- [ ] Text is large enough to read
- [ ] Header logo visible
- [ ] Phone button easy to tap
- [ ] All content fits screen width
- [ ] No horizontal scrolling

### [ ] Welcome Screen Mobile
- [ ] Title readable (not too small)
- [ ] Benefit cards stack vertically
- [ ] Form fields easy to tap
- [ ] Name field shows mobile keyboard
- [ ] Phone field shows number keyboard
- [ ] Button large enough to tap easily (56px min)

### [ ] Upload Screen Mobile
- [ ] Greeting text readable
- [ ] Progress bar visible and clear
- [ ] Tips box readable
- [ ] Photo cards stack nicely
- [ ] Buttons large and easy to tap

### [ ] Take Photo (Mobile Camera)
- [ ] Tap "Take Photo" button
- [ ] Camera permission request appears (first time)
- [ ] Grant camera permission
- [ ] Camera opens
- [ ] Take a photo
- [ ] Photo appears in preview
- [ ] "Processing photo..." shows briefly
- [ ] Compression happens
- [ ] Photo uploaded successfully

### [ ] Mobile Upload Flow
- [ ] Take photos for all required slots
- [ ] No issues with camera switching
- [ ] Progress bar updates smoothly
- [ ] Can delete and retake photos
- [ ] Submit button easy to tap
- [ ] Confirmation screen mobile-friendly

---

## 📧 Test 5: Backend Integration

### [ ] Check Google Drive
- [ ] Open your Google Drive
- [ ] Navigate to configured folder
- [ ] Find folder structure: Year → Month → Customer
- [ ] Customer folder created with format: `BLI-YYMMDD-XXXX_[TYPE]_[Name]`
- [ ] All uploaded photos present
- [ ] `submission_info.txt` file present
- [ ] File names formatted: `BLI-YYMMDD-XXXX_01_[category].jpg`
- [ ] Photos viewable and correct

### [ ] Check Spreadsheet
- [ ] Open your Google Sheets
- [ ] Find "Submissions" tab
- [ ] New row added with:
  - [ ] Timestamp
  - [ ] Reference number
  - [ ] Type
  - [ ] Purpose
  - [ ] Customer name
  - [ ] Phone
  - [ ] Email
  - [ ] Address details
  - [ ] Images count
  - [ ] Folder URL (clickable)
  - [ ] Status: "New"

### [ ] Check Email Notifications

**Agency Email (to you):**
- [ ] Email received at Docs@BillLayneInsurance.com
- [ ] CC to Save@BillLayneInsurance.com
- [ ] Subject line correct
- [ ] Customer info displayed
- [ ] Submission details shown
- [ ] Photo count accurate
- [ ] Link to Drive folder works
- [ ] Professional formatting

**Customer Email (if provided):**
- [ ] Email sent to customer
- [ ] Subject line appropriate
- [ ] Reference number shown
- [ ] Friendly confirmation message
- [ ] "What happens next" steps
- [ ] Contact information included
- [ ] Professional appearance

---

## 🔧 Test 6: Edge Cases

### [ ] No Photos Parameter
- [ ] Open link WITHOUT `&photos=` parameter
- [ ] Should show default 5 photos
- [ ] Can still upload successfully

### [ ] Special Characters in Name
- [ ] Try name: "O'Brien-Smith"
- [ ] Name displays correctly
- [ ] Folder created successfully
- [ ] No encoding errors

### [ ] Very Long Photo List
- [ ] Select 10+ photo checkboxes
- [ ] Generate link
- [ ] Customer sees all 10+ photos
- [ ] Can scroll through all
- [ ] Can upload to all

### [ ] Large Image Files
- [ ] Upload a 5MB+ image
- [ ] Compression activates
- [ ] "Reduced from X to Y" message shows
- [ ] Upload completes successfully
- [ ] File in Drive is compressed version

### [ ] Poor Connection Simulation
- [ ] Open DevTools (F12)
- [ ] Network tab → Throttle to "Slow 3G"
- [ ] Try uploading a photo
- [ ] Should still work (just slower)
- [ ] Progress indicator shows

### [ ] Browser Back Button
- [ ] Start upload process
- [ ] Click browser back button
- [ ] Confirm you want to leave
- [ ] Data cleared properly
- [ ] Can restart process

### [ ] Return to Home
- [ ] Complete full submission
- [ ] Click "Return to Home" button
- [ ] Welcome screen appears
- [ ] All data cleared
- [ ] Can start new submission

---

## 🌐 Test 7: Cross-Browser Testing

### [ ] Chrome
- [ ] Desktop version works
- [ ] Mobile version works
- [ ] Camera access works
- [ ] File upload works

### [ ] Safari (iPhone)
- [ ] Page loads correctly
- [ ] Camera opens properly
- [ ] Photos upload successfully
- [ ] No iOS-specific errors

### [ ] Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Compression works

### [ ] Edge
- [ ] Forms work correctly
- [ ] Upload successful
- [ ] Email notifications sent

### [ ] Samsung Internet (Android)
- [ ] Camera access works
- [ ] Upload successful
- [ ] Mobile UI responsive

---

## 💼 Test 8: Agency Matrix Integration

### [ ] Copy & Open Matrix
- [ ] Click "Copy Text & Open Matrix"
- [ ] Text copied to clipboard
- [ ] Agency Matrix opens in new tab
- [ ] Customer search pre-filled with phone number
- [ ] Can paste text into message field

### [ ] Direct Matrix Open
- [ ] Click "Open Agency Matrix"
- [ ] Opens to customer search
- [ ] Phone number in search field
- [ ] Can find customer record

---

## ⚡ Test 9: Performance

### [ ] Load Time
- [ ] Page loads in < 3 seconds
- [ ] Images load quickly
- [ ] No lag when typing

### [ ] Compression Speed
- [ ] 4MB photo compresses in < 2 seconds
- [ ] 8MB photo compresses in < 4 seconds
- [ ] No browser freeze during compression

### [ ] Upload Speed
- [ ] Single photo uploads in < 10 seconds (normal connection)
- [ ] 5 photos upload in < 45 seconds
- [ ] Progress indicator updates smoothly

---

## 🎨 Test 10: Visual & UX

### [ ] Responsive Design
- [ ] Test on phone (< 768px width)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] All elements scale properly
- [ ] No overlapping content

### [ ] Touch Targets
- [ ] All buttons > 44px (Apple guideline)
- [ ] Easy to tap on phone
- [ ] No accidental taps on nearby buttons

### [ ] Readability
- [ ] Text large enough on mobile
- [ ] Good contrast (can read in sunlight)
- [ ] Fonts load correctly
- [ ] No text cutoff

### [ ] Animations
- [ ] Progress bar animates smoothly
- [ ] Screen transitions smooth
- [ ] Button hover effects work
- [ ] No jarring movements

---

## ✅ Final Checklist

### [ ] Documentation
- [ ] Read QUICK_START.md
- [ ] Read SETUP_INSTRUCTIONS.md
- [ ] Understand IMPROVEMENTS_SUMMARY.md
- [ ] Completed this testing checklist

### [ ] Configuration
- [ ] Google Apps Script URL configured
- [ ] index.html deployed and accessible
- [ ] Prefill form URL configured
- [ ] Contact information updated in both files

### [ ] Testing Complete
- [ ] All tests above passed
- [ ] Tested on at least 2 devices
- [ ] Tested on at least 2 browsers
- [ ] Received test email successfully
- [ ] Found test folder in Drive

### [ ] Ready to Deploy
- [ ] Bookmark prefill form for easy access
- [ ] Save test customer link for demos
- [ ] Train other agents (if applicable)
- [ ] Customer instructions prepared
- [ ] Support plan ready (if issues arise)

---

## 🐛 Common Issues & Solutions

### Issue: "Upload failed" on submit
**Check:**
- [ ] GOOGLE_SCRIPT_URL in index.html is correct
- [ ] Google Apps Script deployed as Web App
- [ ] Access set to "Anyone, even anonymous"
- [ ] Script has Drive permissions

### Issue: Photos don't show in Drive
**Check:**
- [ ] DRIVE_FOLDER_ID in Google Script is correct
- [ ] Drive folder exists and is accessible
- [ ] Script execution logs for errors
- [ ] Check "Error Log" tab in spreadsheet

### Issue: Wrong photos showing
**Check:**
- [ ] Prefill form passing correct `photos` parameter
- [ ] URL parameters properly encoded
- [ ] Index.html parsing parameters correctly
- [ ] Console logs for debugging

### Issue: Compression not working
**Check:**
- [ ] browser-image-compression library loads
- [ ] Check browser console for errors
- [ ] Try with smaller image first
- [ ] File is actually an image (not PDF/other)

### Issue: Mobile camera not opening
**Check:**
- [ ] Browser has camera permission
- [ ] Using HTTPS (not HTTP)
- [ ] `capture="environment"` attribute present
- [ ] Try "Upload File" as alternative

---

## 📊 Testing Results Template

**Date Tested:** _______________
**Tested By:** _______________
**Devices Used:** _______________
**Browsers Used:** _______________

**Overall Result:**
- [ ] ✅ All tests passed
- [ ] ⚠️ Some issues found (documented below)
- [ ] ❌ Major issues - needs fixes

**Issues Found:**
1. _______________
2. _______________
3. _______________

**Notes:**
_______________
_______________
_______________

**Ready for Production?** [ ] Yes [ ] No

---

**Last Updated:** September 2025
**Version:** 2.0
**Next Review:** After 10 successful customer submissions
