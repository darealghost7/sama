/* SHOP SETTINGS: this file replaces the old Admin > Settings screen. Edit it with any text editor, save, and upload it again.
   Leave a value as "" to show a yellow [Add ...] reminder on the site. */
window.SAMAROSE_CONFIG = {
  shop_name: "Sama-R Shop",
  phone: "0678859652",
  email: "samarose@samarose.co.za",
  whatsapp: "27678859652",              // digits only, international format with NO leading 0 (27 = South Africa)
  address: "12 old Nooiensfontein road \nkuilsriver \nWestern cape Cape",
  collection_address: "12 old Nooiensfontein road \nkuilsriver \nWestern cape Cape",
  hours: "Mon-Sat\nsun",
  facebook: "",                         // full link, e.g. https://facebook.com/yourpage
  instagram: "",
  tiktok: "",

  delivery_fee: "0.00",                 // rand
  free_delivery_over: "0.00",           // rand; 0.00 = never free

  bank_name: "Capitec",
  bank_account_holder: "Mr S Matanda",
  bank_account_number: "2236191630",
  bank_branch_code: "470010",
  bank_account_type: "Saving",
  eft_note: "",

  /* HOW ORDERS AND MESSAGES REACH YOU (a static site has no server, so it needs a mail service).
     Option A (recommended, free): create a form at https://formspree.io (paste its URL as "endpoint") or
     at https://web3forms.com (endpoint "https://api.web3forms.com/submit" plus your "accessKey").
     Orders and contact messages are then emailed to you automatically.
     Option B (leave both empty): the customer sends the order on WhatsApp / email from the order page. */
  forms: { endpoint: "", accessKey: "" }
};
