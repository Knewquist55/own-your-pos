RestaurantSynk landing page package with assets

Files included
- index.html
- styles.css
- script.js
- thank-you.html
- README.txt
- assets/restaurantsynk-logo-horizontal.png
- assets/restaurantsynk-logo-stacked.png

Before publishing
1. Replace all placeholder tracking IDs:
   - G-XXXXXXXXXX
   - AW-XXXXXXXXXX
   - AW-XXXXXXXXXX/XXXXXXXXXXXXXXX
2. Update Calendly and email links if needed.
3. The header and footer now use your horizontal logo.
4. The thank-you page uses your stacked logo.
5. If you use a real backend form, change the form action in index.html.

Code already added

Header logo in index.html:
<a href="index.html" class="brand" aria-label="RestaurantSynk home">
  <img src="assets/restaurantsynk-logo-horizontal.png" alt="RestaurantSynk" class="brand-logo" />
</a>

Footer logo in index.html:
<img src="assets/restaurantsynk-logo-horizontal.png" alt="RestaurantSynk" class="footer-logo" />

Thank-you page logo in thank-you.html:
<img src="assets/restaurantsynk-logo-stacked.png" alt="RestaurantSynk" class="thankyou-logo" />

CSS already added in styles.css:
.brand-logo {
  height: 44px;
  width: auto;
  display: block;
}

.footer-logo {
  height: 42px;
  width: auto;
  display: block;
  margin-bottom: 10px;
}

.thankyou-logo {
  width: min(220px, 50vw);
  height: auto;
  display: block;
  margin: 0 auto 22px;
}


Cookie consent update
- Tracking scripts no longer load by default.
- Tracking starts only after a visitor clicks Accept.
- If a visitor clicks Decline, analytics and ad tracking stay off.
- This works through a localStorage consent choice stored under:
  rs_tracking_consent_v1

Files updated for this change
- index.html
- thank-you.html
- styles.css
- script.js
