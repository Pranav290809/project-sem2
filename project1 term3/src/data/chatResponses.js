// Centralized, rule-based chatbot content + flow configuration.
// Edit strings/options here to tweak the chatbot without touching UI logic.

export const CHAT_BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const MAHARASHTRA_CITIES = [
  "Mumbai",
  "Pune",
  "Nagpur",
  "Nashik",
  "Aurangabad",
  "Dhule",
  "Kolhapur",
  "Solapur",
  "Amravati",
  "Thane",
];

export const DONATION_HISTORY_OPTIONS = [
  "Never Donated",
  "3-6 months ago",
  "6+ months ago",
];

export const URGENCY_OPTIONS = ["Within 24 hours", "Within 3 days", "Within a week"];

export const NAV_QUICK_ACTIONS = {
  HOME: "🏠 Home",
  FIND_DONORS: "Find Donors",
  REQUEST_BLOOD: "Request Blood",
  HOW_IT_WORKS: "How it works?",
};

export const CHATBOT_TEXT = {
  ASSISTANT_NAME: "LifeLink Assistant",

  HOME_GREETING: [
    "Hi there! 👋 Welcome to LifeLink. I'm here to help you save lives.",
    "Are you looking to:",
  ].join("\n"),

  DONORS_CONTEXT: "Looking for donors? Let me help you filter by blood group and city!",

  REQUEST_CONTEXT: "Need blood urgently? I can guide you through making a request step by step.",

  DONATE_BLOOD_GROUP_QUESTION: "Great! What is your blood group?",
  DONATE_CITY_QUESTION: "Which city are you located in?",
  DONATE_LAST_DONATION_QUESTION: "When was your last donation?",
  DONATE_ELIGIBLE_QUESTION: "Awesome! Would you like to register as a donor?",
  DONATE_NOT_ELIGIBLE_MESSAGE:
    "You need to wait a bit more! You can donate again after 3 months. Can I help you with anything else?",

  REQUEST_BLOOD_GROUP_QUESTION: "What blood group do you need urgently?",
  REQUEST_CITY_QUESTION: "Which city do you need it in?",
  REQUEST_URGENCY_QUESTION: "How urgent is the need?",

  REQUEST_SEARCHING_MESSAGE: "Searching for donors near you... 🔍",
  REQUEST_FIND_DONORS_NOW: "Find Donors Now",

  START_REQUEST_WIZARD: "Start Request Wizard",

  REGISTER_ME: "Yes, Register Me",

  FAQ_INTRO: "Can I help you with anything else?",

  FAQ: {
    WHO_CAN_DONATE:
      "Who can donate?",
    HOW_OFTEN_DONATE:
      "How often can I donate?",
    IS_IT_SAFE:
      "Is it safe?",
    CONTACT_US:
      "Contact us",
  },

  FAQ_RESPONSES: {
    "Who can donate?":
      "Typically, healthy individuals who meet eligibility criteria (age, weight, and medical readiness) can donate. If you have any doubts, consult a healthcare professional.",
    "How often can I donate?":
      "In general, you can donate blood every 3 months (or follow your local guidelines).",
    "Is it safe?":
      "Yes. Blood donation procedures are designed to be safe, using sterile equipment and careful screening. You’re also supported throughout the process.",
    "Contact us":
      "Reach us at support@lifelink.in or call 1800-XXX-XXXX. We’ll help you connect donors with patients in urgent need.",
  },

  HOW_IT_WORKS_MESSAGE: [
    "Here’s how LifeLink helps:",
    "1) Choose Donate Blood or Request Blood.",
    "2) Tell us your blood group + city (and urgency if requesting).",
    "3) We guide you to donors that can help you save lives.",
  ].join("\n"),

  AFTER_ACTION_TIP: "If you’d like, tell me what you need next.",
};

export const FAQ_QUICK_OPTIONS = [
  CHATBOT_TEXT.FAQ.WHO_CAN_DONATE,
  CHATBOT_TEXT.FAQ.HOW_OFTEN_DONATE,
  CHATBOT_TEXT.FAQ.IS_IT_SAFE,
  CHATBOT_TEXT.FAQ.CONTACT_US,
];

// Quick filter buttons for the Donors page.
// These are intentionally limited for a clean UI; you can expand them later.
export const DONORS_QUICK_FILTER_OPTIONS = [
  "🩸 A+ in Mumbai",
  "🩸 O+ in Pune",
  "🩸 B+ in Nagpur",
  "🏙️ Mumbai Donors",
  "🏙️ Pune Donors",
];

