"use client";

import { useEffect, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

type Message = {
  from: "bot" | "user";
  text: string;
};

type UserData = {
  goal: string;
  level: string;
  place: string;
  name: string;
  extraAnswer: string;
};

export default function GymChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  

  const [messages, setMessages] = useState<Message[]>([]);

  const [step, setStep] = useState(0);

  const [isTyping, setIsTyping] = useState(false);

  const [goalType, setGoalType] = useState("");

  const [showBubble, setShowBubble] = useState(true);

  const [userData, setUserData] = useState<UserData>({
    goal: "",
    level: "",
    place: "",
    name: "",
    extraAnswer: "",
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // =========================
  // SCROLL TO BOTTOM
  // =========================

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // =========================
  // LOCAL STORAGE LOAD
  // =========================

  useEffect(() => {
    const saved = localStorage.getItem("gym-chat-data");

    if (saved) {
      const parsed = JSON.parse(saved);

      setMessages(parsed.messages || []);

      setStep(parsed.step || 0);

      setUserData(
        parsed.userData || {
          goal: "",
          level: "",
          place: "",
          name: "",
          extraAnswer: "",
        }
      );

      setGoalType(parsed.goalType || "");
    }
  }, []);

  // =========================
  // LOCAL STORAGE SAVE
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "gym-chat-data",
      JSON.stringify({
        messages,
        step,
        userData,
        goalType,
      })
    );
  }, [messages, step, userData, goalType]);

  // =========================
  // AUTO HIDE BUBBLE
  // =========================

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  // =========================
  // AUTO OPEN CHAT
  // =========================

  useEffect(() => {
    const alreadyOpened = localStorage.getItem("chat-opened");

    if (!alreadyOpened) {
      const timer = setTimeout(() => {
        setIsOpen(true);

        localStorage.setItem("chat-opened", "true");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  // =========================
  // BOT REPLY
  // =========================

  const botReply = (text: string) => {
    setIsTyping(true);

    const delay = text.length * 35;

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text,
        },
      ]);

      setIsTyping(false);
    }, delay);
  };

  // =========================
  // USER MESSAGE
  // =========================

  const handleUser = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        from: "user",
        text,
      },
    ]);
  };

  // =========================
  // START FLOW
  // =========================

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      botReply("Hey 👋 Ready to transform your body?");

      setTimeout(() => {
        setStep(1);
      }, 1000);
    }
  }, [isOpen]);

  // =========================
  // HANDLE OPTIONS
  // =========================

  const handleOption = (answer: string) => {
    handleUser(answer);

    // STEP 1
    if (step === 1) {
      setGoalType(answer);

      setUserData((prev) => ({
        ...prev,
        goal: answer,
      }));

      // CONDITIONAL FLOW

      if (answer === "Lose Fat") {
        setStep(11);

        botReply("How much weight do you want to lose?");
      } else if (answer === "Build Muscle") {
        setStep(11);

        botReply("Are you struggling to gain size?");
      } else {
        setStep(2);

        botReply("Nice 🔥 What's your experience level?");
      }
    }

    // STEP 2
    else if (step === 2) {
      setUserData((prev) => ({
        ...prev,
        level: answer,
      }));

      setStep(3);

      botReply("Respect 💪 Where do you prefer to workout?");
    }

    // STEP 3
    else if (step === 3) {
      setUserData((prev) => ({
        ...prev,
        place: answer,
      }));

      setStep(4);

      botReply("Awesome 🔥 What's your name?");
    }
  };

  // =========================
  // CONDITIONAL INPUT
  // =========================

  const handleExtraAnswer = (value: string) => {
    handleUser(value);

    setUserData((prev) => ({
      ...prev,
      extraAnswer: value,
    }));

    setStep(2);

    botReply("Perfect 👌 What's your experience level?");
  };

  // =========================
  // NAME INPUT
  // =========================

  const handleName = (name: string) => {
    handleUser(name);

    setUserData((prev) => ({
      ...prev,
      name,
    }));

    setStep(5);

    botReply(
      `Perfect ${name}! We’ll help you crush your fitness goal 🚀`
    );
  };

  // =========================
  // WHATSAPP MESSAGE
  // =========================

  const openWhatsApp = () => {
    const message = `
Hi, my name is ${userData.name}

My goal is: ${userData.goal}

Experience level: ${userData.level}

Workout preference: ${userData.place}

Extra Info: ${userData.extraAnswer}
`;

    window.open(
      `https://wa.me/917014510894?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  return (
    <>
      {/* BACKDROP */}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[998]
          backdrop-blur-[2px]
          bg-black/20
          transition-all duration-300"
        />
      )}

      {/* NOTIFICATION BUBBLE */}

      {!isOpen && showBubble && (
        <div
          className="fixed bottom-24 right-6 z-[998]
          bg-white text-black
          shadow-xl rounded-2xl
          px-4 py-3 text-sm
          animate-bounce
          max-w-[220px]"
        >
          Need help choosing a workout plan? 🔥
        </div>
      )}

      {/* FLOATING BUTTON */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[999]
        bg-yellow-500 text-white
        p-4 rounded-full shadow-lg
        hover:scale-105
        transition-all duration-300
        flex items-center justify-center"
      >
        {isOpen ? (
          <IoClose size={24} />
        ) : (
          <FaWhatsapp size={24} />
        )}
      </button>

      {/* CHAT UI */}

      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[999]
          w-[360px] h-[560px]
          rounded-3xl overflow-hidden
          backdrop-blur-xl bg-white/70
          border border-white/40
          shadow-[0_20px_60px_rgba(0,0,0,0.15)]
          transition-all duration-300
          ease-out
          animate-in fade-in zoom-in-95
          flex flex-col"
        >
          {/* HEADER */}

          <div
            className="px-5 py-4
            border-b border-black/5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold">
                  Gym Coach
                </h2>

                <p className="text-xs text-gray-500">
                  Online now
                </p>
              </div>

              {/* PROGRESS */}

              <div className="text-xs text-gray-500">
                {step <= 5 && `Step ${step}/5`}
              </div>
            </div>

            {/* PROGRESS BAR */}

            <div className="w-full bg-gray-200 h-1 mt-3 rounded-full overflow-hidden">
              <div
                className="bg-yellow-500 h-1 transition-all duration-500"
                style={{
                  width: `${(step / 5) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* MESSAGES */}

          <div
  onWheel={(e) => e.stopPropagation()}
  className="
  flex-1
  overflow-y-auto
  overscroll-contain
  touch-pan-y
  no-scrollbar
  px-4
  py-3
  space-y-3
  "
> 
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[75%]
                  
                  ${
                    msg.from === "user"
                      ? "bg-black text-white"
                      : "bg-white/80 backdrop-blur-md border border-black/5 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* TYPING */}

            {isTyping && (
              <div className="flex items-center gap-1 px-3">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>

                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>

                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* INPUT AREA */}

          <div className="p-3 border-t border-black/5">
            {/* GOAL */}

            {step === 1 && (
              <div className="flex flex-wrap gap-2">
                {[
                  "Build Muscle",
                  "Lose Fat",
                  "Stay Fit",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOption(opt)}
                    className="px-3 py-2 rounded-full text-xs
                    bg-black/5 hover:bg-black/10
                    transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* CONDITIONAL QUESTION */}

            {step === 11 && (
              <input
                type="text"
                placeholder={
                  goalType === "Lose Fat"
                    ? "Example: 10kg"
                    : "Tell us your struggle..."
                }
                className="w-full px-3 py-2 rounded-xl text-sm
                bg-white/80 backdrop-blur-md
                border border-black/10
                focus:outline-none focus:ring-2
                focus:ring-black/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleExtraAnswer(
                      (e.target as HTMLInputElement).value
                    );
                  }
                }}
              />
            )}

            {/* EXPERIENCE */}

            {step === 2 && (
              <div className="flex gap-2">
                {[
                  "Beginner",
                  "Intermediate",
                  "Advanced",
                ].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOption(opt)}
                    className="px-3 py-2 rounded-full text-xs
                    bg-black/5 hover:bg-black/10
                    transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* PLACE */}

            {step === 3 && (
              <div className="flex gap-2">
                {["Gym", "Home", "Both"].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleOption(opt)}
                    className="px-3 py-2 rounded-full text-xs
                    bg-black/5 hover:bg-black/10
                    transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* NAME */}

            {step === 4 && (
              <input
                type="text"
                placeholder="Type your name..."
                className="w-full px-3 py-2 rounded-xl text-sm
                bg-white/80 backdrop-blur-md
                border border-black/10
                focus:outline-none focus:ring-2
                focus:ring-black/20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleName(
                      (e.target as HTMLInputElement).value
                    );
                  }
                }}
              />
            )}

            {/* FINAL BUTTON */}

            {step === 5 && (
              <button
                onClick={openWhatsApp}
                className="w-full py-3 rounded-xl text-sm font-medium
                bg-black text-white
                hover:opacity-90
                transition"
              >
                Chat with us
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}