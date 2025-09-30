# Photo Upload Portal - Setup Instructions

## 🎉 What's New

Your photo upload system has been completely redesigned with the following improvements:

### ✨ For Your Customers (Non-Technical Users)
- **Larger, easier-to-tap buttons** - All buttons are now 56px minimum height
- **Bigger, clearer text** - Font sizes increased 20-30% for better readability
- **Automatic image compression** - Photos are compressed automatically before upload (saves bandwidth)
- **Better visual feedback** - Clear progress bars, success messages, and color coding
- **Mobile-optimized** - Touch-friendly design works perfectly on phones
- **Simple, friendly language** - No technical jargon

### 🚀 For You (Agent Features)
- **Dynamic photo requirements** - Prefill form now sends checked photos to customer
- **Custom photo lists** - Each customer only sees the photos YOU specify
- **Fully integrated** - Connects to your existing Google Apps Script backend
- **Pre-filled customer data** - Name, phone, address all pre-filled from your link
- **Smart compression** - Large photos automatically compressed (4MB → 800KB typical)

---

## 📋 Setup Steps

### 1. Deploy Your Google Apps Script as a Web App

Your Google Apps Script code is already perfect! Just deploy it:

1. Open your Google Apps Script project
2. Click **Deploy** → **New deployment**
3. Select type: **Web app**
4. Settings:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone, even anonymous
5. Click **Deploy**
6. **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/ABC123.../exec`)

### 2. Configure the Upload Portal (index.html)

Open `index.html` and find line ~1438:

```javascript
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE';
```

Replace with your actual Google Apps Script URL:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ABC123.../exec';
```

### 3. Deploy index.html

You have several options:

#### Option A: GitHub Pages (Recommended - Free)
1. Create a new GitHub repository
2. Upload `index.html`
3. Go to **Settings** → **Pages**
4. Enable GitHub Pages from main branch
5. Your URL will be: `https://yourusername.github.io/reponame/index.html`

#### Option B: Your Website
1. Upload `index.html` to your website hosting
2. Access via: `https://yourwebsite.com/upload/index.html`

#### Option C: Google Sites (Alternative)
1. Create a Google Site
2. Embed index.html as an HTML block
3. Publish the site

### 4. Configure the Prefill Form

Open `photo-link-generator prefill application.html` and find line ~699:

```javascript
const BASE_URL = 'https://yourdomain.com/index.html';
```

Replace with your actual index.html URL:

```javascript
const BASE_URL = 'https://yourusername.github.io/reponame/index.html';
```

### 5. Deploy the Prefill Form

This is YOUR internal tool (not for customers):

- **Option 1**: Keep it local on your computer - just open the HTML file in your browser
- **Option 2**: Upload to your website in a password-protected folder
- **Option 3**: Put it on a GitHub private repository

---

## 🎯 How to Use

### For You (Agent):

1. **Open the prefill form** (`photo-link-generator prefill application.html`)

2. **Fill out customer information:**
   - Select type: Home, Vehicle, Forms, or Claim
   - Choose purpose: Quote, Add Coverage, etc.
   - Enter customer name and phone (required)
   - Enter email (optional but recommended)

3. **For Home Insurance - Select photos needed:**
   - Check the boxes for photos you need
   - The default selections are: Front of Home, Back of Home
   - Add others like: Hot Water Heater, HVAC, Kitchen, etc.
   - Type custom requests in "Other"

4. **Click "Generate Link"**

5. **Copy and send to customer:**
   - **Text message**: Copy the text template
   - **Email**: Copy email template or click "Send Email (Gmail)"
   - **Agency Matrix**: Click "Copy Text & Open Matrix"
   - **QR Code**: Show QR code for in-person

### For Your Customer:

1. **They open your link** (all their info is already filled in!)

2. **They see only the photos YOU requested**
   - For example, if you checked "Front of Home" and "Water Heater"
   - That's exactly what they'll see - nothing more, nothing less

3. **They tap the big blue "Take Photo" button** for each photo

4. **Photos are automatically compressed** (saves their data/time)

5. **When all photos uploaded, they tap "Submit All Photos"**

6. **Done! You get an email with all photos in Google Drive**

---

## 🔧 Advanced Configuration

### Change Default Photos

Edit `index.html` around line ~1444 to change the default photos shown when no URL parameters are provided:

```javascript
const DEFAULT_PHOTO_REQUIREMENTS = [
    {
        id: 'front-exterior',
        title: 'Front Exterior of Home',
        description: 'A clear view of the entire front of the house, including the roof.',
        category: 'exterior'
    },
    // Add more default photos here
];
```

### Adjust Image Compression

Edit `index.html` around line ~2013 to adjust compression settings:

```javascript
const options = {
    maxSizeMB: 1,          // Maximum size in MB (default: 1MB)
    maxWidthOrHeight: 1920, // Maximum dimension (default: 1920px)
    useWebWorker: true,
    fileType: file.type
};
```

- **Higher maxSizeMB** = Better quality, slower upload
- **Lower maxSizeMB** = Faster upload, lower quality
- **1MB is a good balance** for most insurance photos

---

## 📱 Example Use Cases

### Example 1: Home Quote - Standard Photos

**Agent prefills:**
- Type: Home
- Purpose: Quote
- Customer: John Smith
- Phone: (336) 555-1234
- Photos: ✓ Front, ✓ Back, ✓ Water Heater, ✓ HVAC

**Link generated:**
```
https://yourdomain.com/index.html?customerName=John+Smith&phone=(336)+555-1234&type=HOME&purpose=quote&photos=Front+of+Home,Back+of+Home,Hot+Water+Heater,HVAC+Unit
```

**Customer sees:**
- Welcome screen with name pre-filled
- 4 photo slots (only the ones agent requested)
- Clear instructions for each photo
- Progress bar showing "0/4 photos"

### Example 2: Home Inspection - Custom Photos

**Agent prefills:**
- Photos: ✓ Front, ✓ Back, ✓ All Sides, ✓ Roof, ✓ Electrical Panel, ✓ Kitchen, ✓ Bathrooms, ✓ Crawlspace
- Other: "Attic entrance, Pool area"

**Customer sees:**
- 10 specific photo slots with clear descriptions
- Progress shows "0/10 photos"

### Example 3: Vehicle Quote

**Agent prefills:**
- Type: Vehicle
- Vehicle Info: 2024 Toyota Camry
- Default vehicle photos shown (front, back, sides, VIN, odometer)

---

## 🐛 Troubleshooting

### Issue: "Upload failed" error

**Solution:**
1. Check that `GOOGLE_SCRIPT_URL` is correct in index.html
2. Make sure your Google Apps Script is deployed as a Web App
3. Verify access is set to "Anyone, even anonymous"

### Issue: Photos not showing up in Drive

**Solution:**
1. Check your Google Apps Script execution logs
2. Verify `SPREADSHEET_ID` and `DRIVE_FOLDER_ID` in your Apps Script
3. Make sure the script has permission to access Drive

### Issue: Link generator shows default URL

**Solution:**
1. Update `BASE_URL` in the prefill form (line ~699)
2. Make sure to save the file after editing

### Issue: Customer can't upload photos

**Solution:**
1. Make sure customer is using a modern browser (Chrome, Safari, Edge, Firefox)
2. Check if customer granted camera/file access permissions
3. Try "Upload File" instead of "Take Photo"

### Issue: Photos are too large

**Solution:**
1. Compression should happen automatically
2. If needed, lower `maxSizeMB` in index.html (line ~2013)
3. Customer can also try taking photos at lower resolution in camera settings

---

## 📊 What Happens Behind the Scenes

1. **Agent generates link** → Customer info + photo list encoded in URL
2. **Customer opens link** → Form auto-fills, photos display dynamically
3. **Customer takes photo** → Image compressed (4MB → ~800KB)
4. **Customer submits** → All photos converted to base64, sent to Google Script
5. **Google Script receives** → Creates Drive folder, saves photos, sends emails
6. **You get notified** → Email with link to photos + spreadsheet updated

---

## 🎨 Customization Tips

### Brand Colors

Edit the CSS variables in `index.html` (line ~18):

```css
:root {
    --primary-blue: #2563eb;        /* Change to your brand color */
    --primary-blue-dark: #1e40af;   /* Darker shade */
    --success-green: #10b981;       /* Success color */
}
```

### Logo

Replace the logo URL in both files:

```html
<img src="https://i.imgur.com/cBAgeX8.png" alt="Your Agency">
```

Upload your logo to Imgur or your website, then replace the URL.

### Contact Information

Update in `index.html`:
- Phone: Search for `336-835-1993` and replace
- Email: Search for `Save@BillLayneInsurance.com` and replace
- Address: Search for `1283 N Bridge St, Elkin NC 28621` and replace

---

## ✅ Testing Checklist

Before going live, test:

- [ ] Prefill form generates correct URLs
- [ ] Customer link opens and shows correct name
- [ ] Only requested photos appear
- [ ] "Take Photo" button opens camera on mobile
- [ ] "Upload File" button works
- [ ] Progress bar updates correctly
- [ ] Submit button enables when all photos uploaded
- [ ] Photos arrive in Google Drive
- [ ] Email notifications sent correctly
- [ ] Confirmation screen displays

---

## 💡 Pro Tips

1. **Create bookmarks** for common photo sets:
   - "Standard Home Quote" (Front, Back, Kitchen)
   - "Full Home Inspection" (All photos)
   - "Water Damage Claim" (Damage areas, Water Heater, Crawlspace)

2. **Use Agency Matrix integration** - One click copies text and opens customer record

3. **QR codes for in-person** - Show QR code on your tablet for customers in office

4. **Test with different phones** - iPhone, Android, etc.

5. **Save text templates** - Customize the message templates for your agency voice

---

## 📞 Support

If you need help:

1. Check the troubleshooting section above
2. Review the example use cases
3. Test with a personal phone first before sending to customers
4. Make sure all URLs are configured correctly

---

## 🔒 Security Notes

- All photos transmitted over HTTPS (secure)
- No photos stored in browser
- Photos automatically deleted from memory after upload
- Google Drive folder permissions set by your Apps Script
- No customer data stored on public servers

---

## 📈 Future Enhancements (Ideas)

- Add photo quality checker
- Allow customers to add notes to individual photos
- Support for video uploads
- Multi-language support
- Dark mode option
- Photo annotation tools

---

**Last Updated:** September 2025
**Version:** 2.0
**Support:** Bill Layne Insurance Agency Technical Team
