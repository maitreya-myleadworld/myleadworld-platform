const extractProfileData = () => {
  const selectors = {
    name: 'h1.text-heading-xlarge',
    title: 'div.text-body-medium.break-words',
    location: 'span.text-body-small.inline.t-black--light.break-words',
    company: '[data-field="experience_company_logo"] img, .pv-entity__secondary-title',
    profilePic: '.pv-top-card-profile-picture__image--show'
  };

  const data = {
    name: document.querySelector(selectors.name)?.innerText?.trim() || "Unknown",
    headline: document.querySelector(selectors.title)?.innerText?.trim() || "",
    location: document.querySelector(selectors.location)?.innerText?.trim() || "",
    linkedinUrl: window.location.href,
    timestamp: new Date().toISOString(),
    source: 'LinkedIn Profile'
  };

  console.log("MyLeadWorld: Data Extracted", data); [cite: 5]
  return data;
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_PROFILE") {
    const profile = extractProfileData();
    sendResponse(profile);
  }
});