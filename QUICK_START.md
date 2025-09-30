# Photo Upload Portal - Quick Start Guide

## 🚀 60-Second Setup

### Step 1: Configure Google Apps Script URL

Open `index.html`, find line ~1438:

```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE';
```

Replace with your Google Apps Script Web App URL.

**How to get this URL:**
1. Open your Google Apps Script
2. Click **Deploy** → **New deployment**
3. Type: **Web app**, Access: **Anyone**
4. Copy the URL

---

### Step 2: Deploy index.html

**Easiest option - GitHub Pages:**
1. Create new GitHub repo
2. Upload `index.html`
3. Settings → Pages → Enable
4. Your URL: `https://yourusername.github.io/reponame/index.html`

---

### Step 3: Configure Prefill Form

Open `photo-link-generator prefill application.html`, line ~699:

```javascript
const BASE_URL = 'https://yourdomain.com/index.html';
```

Replace with the URL from Step 2.

---

## ✅ You're Done!

Test it:
1. Open prefill form
2. Enter your name and phone
3. Check 2-3 photo boxes
4. Generate link
5. Open link in another tab
6. Take/upload photos
7. Submit

Check your email and Google Drive!

---

## 🎯 Daily Usage

### As Agent:

1. **Open** prefill form HTML file
2. **Fill** customer info
3. **Check** photos needed
4. **Generate** link
5. **Copy** text template
6. **Send** via text/email

### Customer Receives:

1. Opens link (name already filled in)
2. Clicks "Start Uploading"
3. Taps blue "Take Photo" buttons
4. Submits when done

### You Receive:

- ✉️ Email notification
- 📁 Photos in Google Drive folder
- 📊 Entry in spreadsheet

---

## 📋 Common Photo Sets

### Standard Home Quote
```
✓ Front of Home
✓ Back of Home
✓ Hot Water Heater
✓ HVAC Unit
```

### Full Home Inspection
```
✓ Front of Home
✓ Back of Home
✓ Sides of Home
✓ Hot Water Heater
✓ HVAC Unit
✓ Kitchen
✓ Primary Bathroom
✓ Electrical Panel
```

### Water Damage Claim
```
✓ Hot Water Heater
✓ Crawlspace from door opening
✓ Underneath kitchen and bathrooms
Other: "All visible water damage areas"
```

### Roof Inspection
```
✓ Front of Home
✓ Back of Home
Other: "Roof from attic entrance, Close-up of any damage"
```

---

## 🔧 Quick Fixes

**Photos not arriving?**
→ Check Google Script URL in index.html

**Link not working?**
→ Check BASE_URL in prefill form

**Customer can't upload?**
→ Tell them to use "Upload File" instead of "Take Photo"

**Photos too large?**
→ They're automatically compressed! No action needed.

---

## 💡 Pro Tips

1. **Bookmark the prefill form** for quick access
2. **Save common messages** in Agency Matrix
3. **Use QR code** for in-office customers
4. **Test first** with your own phone

---

## 📱 Send to Customer

**Text Message Template:**
```
Hi [Name],

Please upload photos of your home for your quote:

[LINK]

Your info is pre-filled. Just add photos & submit!

Photos needed:
• Front of Home
• Back of Home
• Water Heater
• HVAC Unit

Takes 2 minutes. Questions? Call 336-835-1993

Bill Layne Insurance
```

---

## ⚠️ Important Notes

- ✅ Photos automatically compressed
- ✅ Works on any phone/computer
- ✅ Customer data pre-filled from link
- ✅ Only shows photos YOU select
- ✅ Secure HTTPS transmission
- ❌ No app download needed
- ❌ No account creation needed

---

**Need detailed help?** See `SETUP_INSTRUCTIONS.md`

**Questions?** Test it yourself first - it's simple!
