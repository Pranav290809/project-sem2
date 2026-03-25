import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ChatBot.css";

import {
  CHAT_BLOOD_GROUPS,
  DONATION_HISTORY_OPTIONS,
  FAQ_QUICK_OPTIONS,
  MAHARASHTRA_CITIES,
  NAV_QUICK_ACTIONS,
  CHATBOT_TEXT,
  DONORS_QUICK_FILTER_OPTIONS,
  URGENCY_OPTIONS,
} from "../data/chatResponses";

function createId() {
  // eslint-disable-next-line no-undef
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatMessageTimestamp(ts) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

function buildBotMessage(text, options = []) {
  return {
    id: createId(),
    sender: "bot",
    text,
    timestamp: Date.now(),
    options,
  };
}

function buildUserMessage(text) {
  return {
    id: createId(),
    sender: "user",
    text,
    timestamp: Date.now(),
    options: [],
  };
}

function parseDonorsQuickFilter(optionText) {
  const group = CHAT_BLOOD_GROUPS.find((g) => optionText.includes(g)) || "";
  const city =
    MAHARASHTRA_CITIES.find((c) => optionText.includes(c)) ||
    (optionText.toLowerCase().includes("mumbai") ? "Mumbai" : "") ||
    (optionText.toLowerCase().includes("pune") ? "Pune" : "");

  return { group, city };
}

function toQuery({ group, city }) {
  const params = new URLSearchParams();
  if (group) params.set("group", group);
  if (city) params.set("city", city);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export default function ChatBot() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [lastGreetingPath, setLastGreetingPath] = useState("");

  // Rule-based flow state (donate/request wizard).
  const [flowMode, setFlowMode] = useState(null); // 'donate' | 'request' | null
  const [flowStep, setFlowStep] = useState(null); // string step key
  const [flowContext, setFlowContext] = useState({
    bloodGroup: "",
    city: "",
    donationHistory: "",
    urgency: "",
  });

  const closeButtonRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const currentPath = location.pathname || "/";

  const quickNavButtons = useMemo(() => {
    return [
      { label: NAV_QUICK_ACTIONS.HOME, action: "navigate_home" },
      { label: NAV_QUICK_ACTIONS.FIND_DONORS, action: "navigate_donors" },
      { label: NAV_QUICK_ACTIONS.REQUEST_BLOOD, action: "navigate_requests" },
      { label: NAV_QUICK_ACTIONS.HOW_IT_WORKS, action: "how_it_works" },
    ];
  }, []);

  function resetFlow() {
    setFlowMode(null);
    setFlowStep(null);
    setFlowContext({
      bloodGroup: "",
      city: "",
      donationHistory: "",
      urgency: "",
    });
  }

  function replaceConversationWithBotGreeting({ pathname }) {
    resetFlow();

    if (pathname === "/Donors") {
      setMessages([buildBotMessage(CHATBOT_TEXT.DONORS_CONTEXT, DONORS_QUICK_FILTER_OPTIONS)]);
      setLastGreetingPath(pathname);
      return;
    }

    if (pathname === "/Requests") {
      setMessages([buildBotMessage(CHATBOT_TEXT.REQUEST_CONTEXT, [CHATBOT_TEXT.START_REQUEST_WIZARD])]);
      setLastGreetingPath(pathname);
      return;
    }

    // Default Home greeting
    setMessages([buildBotMessage(CHATBOT_TEXT.HOME_GREETING, ["🩸 Donate Blood", "💉 Request Blood"])]);
    setLastGreetingPath(pathname);
  }

  function ensureGreetingForCurrentPath() {
    if (lastGreetingPath === currentPath && messages.length > 0) return;
    replaceConversationWithBotGreeting({ pathname: currentPath });
  }

  function closeChat() {
    setIsOpen(false);
  }

  function openChat() {
    setIsOpen(true);
  }

  function queueTypingAndBotResponse(botMessageBuilder, { delayMs = 650 } = {}) {
    setIsTyping(true);
    window.setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, botMessageBuilder()]);
    }, delayMs);
  }

  function addUserBubble(text) {
    setMessages((prev) => [...prev, buildUserMessage(text)]);
  }

  function startDonateFlow() {
    resetFlow();
    setFlowMode("donate");
    setFlowStep("donate_bloodGroup");
    queueTypingAndBotResponse(
      () =>
        buildBotMessage(CHATBOT_TEXT.DONATE_BLOOD_GROUP_QUESTION, [...CHAT_BLOOD_GROUPS]),
      { delayMs: 450 }
    );
  }

  function startRequestFlow() {
    resetFlow();
    setFlowMode("request");
    setFlowStep("request_bloodGroup");
    queueTypingAndBotResponse(
      () =>
        buildBotMessage(CHATBOT_TEXT.REQUEST_BLOOD_GROUP_QUESTION, [...CHAT_BLOOD_GROUPS]),
      { delayMs: 450 }
    );
  }

  function handleFaqOption(optionText) {
    const faqReply = CHATBOT_TEXT.FAQ_RESPONSES[optionText];
    if (!faqReply) return;

    queueTypingAndBotResponse(
      () => buildBotMessage(faqReply, FAQ_QUICK_OPTIONS),
      { delayMs: 450 }
    );
    setFlowStep(null);
    setFlowMode(null);
  }

  function handleBotOption(optionText) {
    // FAQ clicks can happen during or after a wizard.
    if (FAQ_QUICK_OPTIONS.includes(optionText)) {
      addUserBubble(optionText);
      handleFaqOption(optionText);
      return;
    }

    // Donate/Request selection from Home greeting.
    if (!flowMode) {
      addUserBubble(optionText);

      if (optionText === "🩸 Donate Blood") {
        startDonateFlow();
        return;
      }
      if (optionText === "💉 Request Blood") {
        startRequestFlow();
        return;
      }

      // Contextual actions for page greetings.
      if (currentPath === "/Donors" && DONORS_QUICK_FILTER_OPTIONS.includes(optionText)) {
        const { group, city } = parseDonorsQuickFilter(optionText);
        navigate(`/Donors${toQuery({ group, city })}`);
        return;
      }

      if (currentPath === "/Requests" && optionText === CHATBOT_TEXT.START_REQUEST_WIZARD) {
        startRequestFlow();
        return;
      }

      if (optionText === "Yes, Register Me") {
        // If the user somehow hits this outside the donate flow.
        const qs = toQuery({ group: flowContext.bloodGroup, city: flowContext.city });
        navigate(`/Donors${qs}`);
        return;
      }

      return;
    }

    // Wizard flows: donate/request.
    addUserBubble(optionText);

    if (flowMode === "donate") {
      if (flowStep === "donate_bloodGroup") {
        setFlowContext((prev) => ({ ...prev, bloodGroup: optionText }));
        setFlowStep("donate_city");
        queueTypingAndBotResponse(
          () => buildBotMessage(CHATBOT_TEXT.DONATE_CITY_QUESTION, [...MAHARASHTRA_CITIES]),
          { delayMs: 450 }
        );
        return;
      }

      if (flowStep === "donate_city") {
        setFlowContext((prev) => ({ ...prev, city: optionText }));
        setFlowStep("donate_lastDonation");
        queueTypingAndBotResponse(
          () => buildBotMessage(CHATBOT_TEXT.DONATE_LAST_DONATION_QUESTION, [...DONATION_HISTORY_OPTIONS]),
          { delayMs: 450 }
        );
        return;
      }

      if (flowStep === "donate_lastDonation") {
        setFlowContext((prev) => ({ ...prev, donationHistory: optionText }));

        const eligible = optionText === "6+ months ago" || optionText === "Never Donated";
        if (eligible) {
          setFlowStep("donate_eligibility");
          queueTypingAndBotResponse(
            () =>
              buildBotMessage(CHATBOT_TEXT.DONATE_ELIGIBLE_QUESTION, [CHATBOT_TEXT.REGISTER_ME]),
            { delayMs: 520 }
          );
        } else {
          setFlowStep(null);
          setFlowMode(null);
          resetFlow(); // also clears context so we don't leak a stale wizard state
          queueTypingAndBotResponse(
            () => buildBotMessage(CHATBOT_TEXT.DONATE_NOT_ELIGIBLE_MESSAGE, FAQ_QUICK_OPTIONS),
            { delayMs: 520 }
          );
        }
        return;
      }

      if (flowStep === "donate_eligibility" && optionText === CHATBOT_TEXT.REGISTER_ME) {
        // Redirect to donor registration/area (current app uses Donors page as the CTA target).
        const qs = toQuery({ group: flowContext.bloodGroup, city: flowContext.city });
        setFlowStep(null);
        setFlowMode(null);
        navigate(`/Donors${qs}`);
        return;
      }
    }

    if (flowMode === "request") {
      if (flowStep === "request_bloodGroup") {
        setFlowContext((prev) => ({ ...prev, bloodGroup: optionText }));
        setFlowStep("request_city");
        queueTypingAndBotResponse(
          () => buildBotMessage(CHATBOT_TEXT.REQUEST_CITY_QUESTION, [...MAHARASHTRA_CITIES]),
          { delayMs: 450 }
        );
        return;
      }

      if (flowStep === "request_city") {
        setFlowContext((prev) => ({ ...prev, city: optionText }));
        setFlowStep("request_urgency");
        queueTypingAndBotResponse(
          () => buildBotMessage(CHATBOT_TEXT.REQUEST_URGENCY_QUESTION, [...URGENCY_OPTIONS]),
          { delayMs: 450 }
        );
        return;
      }

      if (flowStep === "request_urgency") {
        setFlowContext((prev) => ({ ...prev, urgency: optionText }));
        setFlowStep("request_search");
        queueTypingAndBotResponse(
          () =>
            buildBotMessage(
              CHATBOT_TEXT.REQUEST_SEARCHING_MESSAGE,
              [CHATBOT_TEXT.REQUEST_FIND_DONORS_NOW]
            ),
          { delayMs: 650 }
        );
        return;
      }

      if (flowStep === "request_search" && optionText === CHATBOT_TEXT.REQUEST_FIND_DONORS_NOW) {
        const qs = toQuery({ group: flowContext.bloodGroup, city: flowContext.city });
        setFlowStep(null);
        setFlowMode(null);
        navigate(`/Donors${qs}`);
        return;
      }
    }
  }

  function handleQuickNav(action) {
    if (action === "navigate_home") {
      navigate("/");
      return;
    }
    if (action === "navigate_donors") {
      navigate("/Donors");
      return;
    }
    if (action === "navigate_requests") {
      navigate("/Requests");
      return;
    }

    if (action === "how_it_works") {
      setMessages((prev) => [...prev, buildBotMessage(CHATBOT_TEXT.HOW_IT_WORKS_MESSAGE, FAQ_QUICK_OPTIONS)]);
      return;
    }
  }

  useEffect(() => {
    if (!isOpen) return;
    ensureGreetingForCurrentPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentPath]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus?.();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e) {
      if (e.key === "Escape") closeChat();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    // Keep the latest message visible.
    messagesEndRef.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [messages.length, isTyping, isOpen]);

  const canRenderPanel = isOpen;

  return (
    <div className="lifelink-chatbot-root">
      {/* Floating action button (FAB) */}
      {!canRenderPanel && (
        <button
          type="button"
          aria-label="Open LifeLink Assistant chat"
          aria-expanded={isOpen}
          className="lifelink-chatbot-fab fixed right-6 bottom-6 z-50 rounded-full px-4 py-4 bg-gradient-to-tr from-[#dc2626] via-red-600 to-red-500 text-white shadow-2xl hover:shadow-red-500/20 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
          onClick={openChat}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="mx-auto">
            <path
              d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <path
              d="M9.5 10.5h5M12 8v5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}

      {/* Chat panel */}
      <div
        className={`lifelink-chatbot-panel ${isOpen ? "lifelink-chatbot-panel--open" : ""}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-label="LifeLink Assistant chat"
        aria-modal={false}
      >
        <div className="lifelink-chatbot-panel-inner glass-dark">
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{
              background: "linear-gradient(90deg, rgba(220,38,38,1) 0%, rgba(220,38,38,0.85) 30%, rgba(239,68,68,0.95) 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-white font-extrabold truncate">
                {CHATBOT_TEXT.ASSISTANT_NAME} 🩸
              </span>
            </div>

            <button
              type="button"
              ref={closeButtonRef}
              aria-label="Close LifeLink Assistant chat"
              onClick={closeChat}
              className="text-white/95 hover:text-white rounded-lg p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 transition-all duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Quick nav bar */}
          <div className="px-3 py-2 border-b border-white/10">
            <div className="flex flex-wrap gap-2">
              {quickNavButtons.map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  aria-label={btn.label}
                  onClick={() => handleQuickNav(btn.action)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-300 ${
                    btn.label === NAV_QUICK_ACTIONS.HOW_IT_WORKS
                      ? "bg-white/10 border-white/20 text-white hover:bg-white/15"
                      : "bg-red-600/15 border-red-300/25 text-white hover:bg-red-600/25"
                  } focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="lifelink-chatbot-messages px-3 py-4" ref={messagesContainerRef}>
            <div className="space-y-3 pb-2">
              {messages.map((m) => {
                const isBot = m.sender === "bot";
                const bubbleCls = isBot
                  ? "bg-white/10 border-white/15 text-white"
                  : "bg-[#dc2626]/30 border-red-200/25 text-white";

                return (
                  <div
                    key={m.id}
                    className={`flex ${isBot ? "justify-start" : "justify-end"} `}
                  >
                    <div className={`max-w-[86%] ${bubbleCls} backdrop-blur-md border rounded-2xl px-3 py-2`}>
                      <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>

                      {m.options && m.options.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {m.options.map((opt) => (
                            <button
                              key={`${m.id}-${opt}`}
                              type="button"
                              aria-label={`Chat option: ${opt}`}
                              onClick={() => handleBotOption(opt)}
                              className="text-xs px-3 py-1.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/15 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Timestamp hidden visually but available for screen readers */}
                      <div className="sr-only">{formatMessageTimestamp(m.timestamp)}</div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="lifelink-chatbot-typing bg-white/10 border border-white/15 text-white/90 backdrop-blur-md rounded-2xl px-3 py-2">
                    <span className="sr-only">Assistant is typing</span>
                    <span className="lifelink-chatbot-dot" />
                    <span className="lifelink-chatbot-dot" />
                    <span className="lifelink-chatbot-dot" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Footer spacing for safe area */}
          <div className="h-2" />
        </div>
      </div>
    </div>
  );
}

