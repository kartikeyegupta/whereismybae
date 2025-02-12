"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  // We'll keep only a SINGLE set of useStates for question flow and answers
  const [greekLifeAnswered, setGreekLifeAnswered] = useState(false); // Tracks if user answered the Greek life question
  const [isGreekLife, setIsGreekLife] = useState(false); // True if user says "Yes" to Greek life
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedOptionIndexValue, setSelectedOptionIndexValue] = useState<number | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Updated question arrays
  const questions = [
    {
      question: "What's your gender?",
      options: ["Male 🚹", "Female 🚺", "Non-binary 🚻", "Prefer not to say 🤐"]
    },
    {
      question: "1. How do you respond when someone you like takes too long to text back?",
      options: ["Ignore them back 🙄", "Triple text 🤳", "Assume they hate me 😰"]
    },
    {
      question: "2. Your best friend just got into a relationship. You…",
      options: [
        'Roast him for being "whipped" 😂',
        "Get low-key jealous 😒",
        "Keep hanging out like nothing changed 👍"
      ]
    },
    {
      question: '3. How often do you say "I\'m just chillin\'" instead of expressing real emotions?',
      options: ["Always 😶", "Only when I'm going through it 🤐", "Never, I over-explain everything 😭"]
    },
    {
      question: "4. How do you feel about posting your significant other on social media?",
      options: [
        'Hard no, I like to keep it "private" 🤫',
        "I'd do it if they posted me first 🤳",
        "Of course! I'd flex my partner 💑"
      ]
    },
    {
      question: "5. Your ideal relationship dynamic is…",
      options: [
        '"We see each other when we see each other" 🤷',
        '"I need 24/7 attention or I\'ll overthink" 😬',
        '"Healthy balance of independence and time together" 😊'
      ]
    },
    {
      question: "6. What's your go-to move when you start losing interest?",
      options: [
        "Slowly ghost and hope they get the hint 👻",
        "Overcompensate and fake excitement 😅",
        "Have an honest conversation 🤝"
      ]
    },
    {
      question:
        "7. What's your go-to coping strategy when you see your crush posting with someone else?",
      options: [
        "Like and comment something sarcastic to show I'm totally unbothered 🙃",
        "Ignore it, then quietly panic-text my group chat for advice 😅",
        "Ask them if that's their new boo because honesty is the best policy 🗣️"
      ]
    },
    {
      question: "8. You just found out your situationship is also talking to your friend. Your move?",
      options: [
        "Immediately draft a passive-aggressive text 💬",
        "Confront them with screenshots and receipts 🧾",
        "Give everyone the benefit of the doubt and see how it plays out 🤷"
      ]
    },
    {
      question: "9. You're invited to a party your ex is hosting. What do you do?",
      options: [
        "Show up in a killer outfit and 'accidentally' bump into them 💃",
        "Avoid it entirely—who needs that drama? 🚫",
        "Attend but act like you have no idea who the host is 🙄"
      ]
    },
    {
      question: "10. If you had to describe your situationship history in one word, it would be…",
      options: ['"Messy" 😵', '"Nonexistent" 💤', '"Healthy-ish" 🌱']
    }
  ];

  const femaleQuestions = [
    {
      question: "What's your gender?",
      options: ["Male 🚹", "Female 🚺", "Non-binary 🚻", "Prefer not to say 🤐"]
    },
    {
      question: "1. What's your toxic texting habit?",
      options: [
        "Replying in 0.2 seconds then getting mad when they don't 😡",
        "Leaving them on read for hours just to look cool 😎",
        "Accidentally forgetting to reply for 12 hours 🙈"
      ]
    },
    {
      question: "2. How do you handle conflict?",
      options: ["Silent treatment 🤐", "Typing out a huge paragraph then deleting it 📝", "The huge paragraph. 📝", "Talking it out 🗣️"]
    },
    {
      question: "3. What's your dating philosophy?",
      options: ['"If he wanted to, he would" 🙄', '"I\'m not looking but if it happens, it happens" 🤷', '"Communication is key" 🗝️']
    },
    {
      question: "4. How do you act when you really like someone?",
      options: ["Act uninterested to seem cool 😏", "Text them all the time and obsess 💕", "Just be myself and see where it goes 🙌"]
    },
    {
      question: "5. What's your worst dating habit?",
      options: [
        "Stalking my ex's Instagram at 2 AM 😳",
        "Testing them to see how they react 🕵️‍♀️",
        "Over-romanticizing before the first date 🥰"
      ]
    },
    {
      question: "6. You see a guy you're talking to liking another girl's post. Your first thought?",
      options: [
        '"Oh, he\'s done." 😠',
        '"Should I like his friend\'s post back?" 👀',
        '"He\'s allowed to like posts, I\'m secure." 😊'
      ]
    },
    {
      question:
        "7. What's your go-to coping strategy when you see your crush posting selfies with someone else?",
      options: [
        "Like and comment something sarcastic to show I'm totally unbothered 🙃",
        "Ignore it, then quietly panic-text my group chat for advice 😅",
        "Ask them if that's their new boo because honesty is the best policy 🗣️"
      ]
    },
    {
      question: "8. You just found out your situationship is also talking to your friend. Your move?",
      options: [
        "Immediately draft a passive-aggressive text 💬",
        "Confront them with screenshots and receipts 🧾",
        "Give everyone the benefit of the doubt and see how it plays out 🤷"
      ]
    },
    {
      question: "9. You're invited to a party your ex is hosting. What do you do?",
      options: [
        "Show up in a killer outfit and 'accidentally' bump into them 💃",
        "Avoid it entirely—who needs that drama? 🚫",
        "Attend but act like you have no idea who the host is 🙄"
      ]
    },
    {
      question: '10. Your ex texts "I miss you." What do you do?',
      options: [
        "Respond immediately 🥺",
        "Screenshot and send to the group chat 🤪",
        "Ignore and move on 🚶‍♀️"
      ]
    }
  ];

  const otherQuestions = [
    {
      question: "What's your gender?",
      options: ["Male 🚹", "Female 🚺", "Non-binary 🚻", "Prefer not to say 🤐"]
    },
    {
      question: "1. How do you handle texting someone you like?",
      options: [
        "I overthink every message and delete half of them 😰",
        "I leave them on read for hours just to look cool 😎",
        "I message normally like a functional human ✅"
      ]
    },
    {
      question: '2. What\'s your go-to move when you get the "we need to talk" text?',
      options: [
        "Panic and mentally rehearse every mistake I've ever made 😱",
        "Immediately assume I'm getting dumped 💔",
        'Ask them "What\'s up?" like an emotionally mature person 🗣️'
      ]
    },
    {
      question: "3. What's your worst toxic trait in relationships?",
      options: [
        "I vanish when I start catching feelings 🏃",
        "I get too attached and plan our future by date #2 💍",
        "I expect people to read my mind 🔮"
      ]
    },
    {
      question: "4. What do you do when a situationship is going nowhere?",
      options: [
        'Stay in it because "maybe it\'ll work out" 🤞',
        "Make myself less available and hope they get the hint 🙈",
        "Confront them and set boundaries 💪"
      ]
    },
    {
      question: "5. How do you respond to someone flirting with you?",
      options: [
        "Assume they're joking and play it off 🤔",
        "Flirt back but then disappear for three days 🕓",
        "Accept the compliment and keep it flowing 😉"
      ]
    },
    {
      question: "6. How do you handle crushes?",
      options: ["I simp HARD but never make a move ❤️", "I avoid them because vulnerability is scary 😨", "I just tell them straight up 🎉"]
    },
    {
      question:
        "7.What's your go-to coping strategy when you see your crush posting selfies with someone else?",
      options: [
        "Like and comment something sarcastic to show I'm totally unbothered 🙃",
        "Ignore it, then quietly panic-text my group chat for advice 😅",
        "Ask them if that's their new boo because honesty is the best policy 🗣️"
      ]
    },
    {
      question: "8. You just found out your situationship is also talking to your friend. Your move?",
      options: [
        "Immediately draft a passive-aggressive text 💬",
        "Confront them with screenshots and receipts 🧾",
        "Give everyone the benefit of the doubt and see how it plays out 🤷"
      ]
    },
    {
      question: "9. You're invited to a party your ex is hosting. What do you do?",
      options: [
        "Show up in a killer outfit and 'accidentally' bump into them 💃",
        "Avoid it entirely—who needs that drama? 🚫",
        "Attend but act like you have no idea who the host is 🙄"
      ]
    },
    {
      question: "10. What's your go-to way of rejecting someone?",
      options: [
        "I ghost them and pretend they never existed 👻",
        'I give them the classic "It\'s not you, it\'s me" line 😔',
        "I just say I'm not interested, no games 🙅"
      ]
    }
  ];

  // --- NEW ARRAYS FOR GREEK LIFE (Men & Women) ---
  const maleGreekQuestions = [
    {
      question: "What's your gender?",
      options: ["Male 🚹", "Female 🚺", "Non-binary 🚻", "Prefer not to say 🤐"]
    },
    {
      question: "1. During Rush, your top priority is…",
      options: [
        "Joining the top frat for clout 😎",
        "Finding a genuine brotherhood 🫂",
        "I'm just doing it for the parties 🍻"
      ]
    },
    {
      question: "2. Your typical approach to a Greek mixer is…",
      options: [
        "Flirt with everyone, then ghost them the next day 🙃",
        "Play pong in the corner with your bros 💪",
        "Mingle genuinely and make new connections 🤝"
      ]
    },
    {
      question: "3. When it is your turn to host a social, you…",
      options: [
        "Go all-out with decorations and hire a DJ 🎧",
        "Make the pledges set up while you chill 🏋️",
        "Plan responsibly with safety in mind 🚦"
      ]
    },
    {
      question: "5. What\'s your take on philanthropy events?",
      options: [
        "An excuse to look good on social media 🤳",
        "Attend reluctantly to avoid losing aura 😬",
        "Something you genuinely care about and support 💚"
      ]
    },
    {
      question: "6. When your boy is in a new relationship, you…",
      options: [
        "Tease him for being \'whipped\' 😂",
        "Get all the info 🍿",
        "Respect it and give them space 🤝"
      ]
    },
    {
      question: "7. Your go-to move at a frat party?",
      options: [
        "Challenge everyone to pong, no matter what 🍻",
        "Disappear when it's cleanup time 🏃",
        "Have fun but keep things under control 🧊"
      ]
    },
    {
      question: "8. Seeing your crush talk to another guy at a Greek function, you…",
      options: [
        "Make a scene and call them out 🎤",
        "Drop subtle rumors 🗣️",
        "Play it cool and talk privately later 🤝"
      ]
    },
    {
      question: "9. You find out a pledge is dating someone you used to like. You…",
      options: [
        "Make his tasks extra miserable 😏",
        "Throw sneaky shade but act innocent 🤭",
        "Congratulate him and move on 🤷"
      ]
    },
    {
      question: "10. Your Greek life dating history is best described as…",
      options: [
        '"One giant, messy frat party" 🍻',
        '"Nonexistent—brotherhood over everything" 🏛️',
        '"Some ups and downs, but mostly drama-free" 🌊'
      ]
    }
  ];

  const femaleGreekQuestions = [
    {
      question: "What's your gender?",
      options: ["Male 🚹", "Female 🚺", "Non-binary 🚻", "Prefer not to say 🤐"]
    },
    {
      question: "1. During recruitment, your biggest concern is…",
      options: [
        "Locking in the 'top tier' sorority for clout 📸",
        "Finding real sisterhood 🔠",
        "I'm just here for the socials 🍾"
      ]
    },
    {
      question: "2. Meeting your Big for the first time, you…",
      options: [
        "Hope she's Insta-famous for the aesthetic 🤳",
        "Are low-key nervous but excited to bond 😊",
        "Just see what happens—no big expectations 🤷"
      ]
    },
    {
      question: "3. At a mixer, you typically…",
      options: [
        "Flirt with multiple guys to explore your options 😉",
        "Stick to your sisters and judge from afar 🙈",
        "Make an effort to connect with new people 🤝"
      ]
    },
    {
      question: "4. During big-little reveal, you…",
      options: [
        "Expect the most extra, confetti-cannon reveal 🎉",
        "Go with a DIY approach—it's about bonding 🖌️",
        "Don't really care; I'm just here for shigs 🤷"
      ]
    },
    {
      question: "5. Your sorority group chat style is…",
      options: [
        "Spam it with selfies and event promos 🤳",
        "Rarely respond because you prefer 1-on-1 convos 🙊",
        "Keep it organized; it's about sisterhood 💕"
      ]
    },
    {
      question: "6. When you have a crush in a fraternity, you…",
      options: [
        "Slide into his DMs 😂",
        "Stalk his socials but never interact 👀",
        "Just approach him at the next mixer 🗣️"
      ]
    },
    {
      question: "7. Philanthropy events to you are…",
      options: [
        "Perfect photo ops for your insta 🤩",
        "Mandatory attendance, so I'll show face 🏅",
        "A cause I genuinely support 💗"
      ]
    },
    {
      question: "8. If you see your ex at a Greek function with a new fling, you…",
      options: [
        "Go out of your way to look flawless and \'accidentally\' cross paths 💁",
        "Text your group chat all night complaining 📱",
        "Keep it classy and do your own thing 🍸"
      ]
    },
    {
      question: "9. A new member starts dating someone you used to talk to, you…",
      options: [
        "Warn her about all his red flags 🚩",
        "Ignore the drama and stay civil 🤝",
        "Pretend to be supportive but follow every move on socials 😂"
      ]
    },
    {
      question: "10. Your Greek life dating record is basically…",
      options: [
        '"Heartbreaks and make-ups all over Greek Row" 💔',
        '"Nonexistent—my sisters come first" 💅',
        '"A few fun stories, some drama, but I survived" 🌸'
      ]
    }
  ];

  // --------------------------
  // STEP 1: Ask "Are you in Greek life?"
  // --------------------------
  if (!greekLifeAnswered) {
    return (
      <div className="relative min-h-screen p-4 md:p-8 flex justify-center items-center bg-black overflow-hidden">
        {/* Floating background flags */}
        <div className="pointer-events-none select-none opacity-30">
          <div className="absolute text-5xl animate-float1 top-[110%] left-[10%]">🚩</div>
          <div className="absolute text-6xl animate-float2 top-[110%] left=[50%]">🚩</div>
          <div className="absolute text-4xl animate-float3 top-[110%] left-[80%]">🚩</div>
          <div className="absolute text-5xl animate-float4 top-[110%] left-[30%]">🚩</div>
          <div className="absolute text-6xl animate-float5 top-[110%] left-[70%]">🚩</div>
        </div>

        <main className="max-w-2xl w-full p-6 md:p-8 rounded-2xl shadow-2xl bg-black border border-black relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white tracking-tight">
            Are you in Greek life?
          </h1>
          <div className="flex justify-center gap-8">
            <button
              onClick={() => {
                setIsGreekLife(true);
                setAnswers((prev) => [...prev, "Yes, I'm in Greek life"]);
                setGreekLifeAnswered(true);
              }}
              className="p-4 text-pink-500 hover:text-pink-400 active:bg-pink-500/10 transition-all duration-300 font-medium border border-pink-500/50 rounded-xl hover:border-pink-500"
            >
              Yes
            </button>
            <button
              onClick={() => {
                setIsGreekLife(false);
                setAnswers((prev) => [...prev, "No, I'm not in Greek life"]);
                setGreekLifeAnswered(true);
              }}
              className="p-4 text-white/70 hover:text-pink-500 active:bg-white/5 transition-all duration-300 font-medium border border-white/10 rounded-xl hover:border-pink-500/50"
            >
              No
            </button>
          </div>
        </main>

        {/* Floating flags animations */}
        <style jsx>{`
          @keyframes float1 {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-220vh);
            }
          }
          @keyframes float2 {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-220vh);
            }
          }
          @keyframes float3 {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-220vh);
            }
          }
          @keyframes float4 {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-220vh);
            }
          }
          @keyframes float5 {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-220vh);
            }
          }
          .animate-float1 {
            animation: float1 10s linear infinite;
          }
          .animate-float2 {
            animation: float2 12s linear infinite;
          }
          .animate-float3 {
            animation: float3 14s linear infinite;
          }
          .animate-float4 {
            animation: float4 16s linear infinite;
          }
          .animate-float5 {
            animation: float5 18s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  // --------------------------
  // STEP 2: Proceed with existing quiz logic
  // --------------------------

  const getQuestions = () => {
    if (isGreekLife) {
      if (selectedGender == "Male") return maleGreekQuestions;
      if (selectedGender == "Female") return femaleGreekQuestions;
      return otherQuestions;
    } else {
      if (selectedGender == "Male") return questions;
      if (selectedGender == "Female") return femaleQuestions;
      return otherQuestions;
    }
  };

  const relevantQuestions = getQuestions();

  function handleOptionSelect(index: number) {
    setSelectedOptionIndexValue(index);
  }

  function nextQuestion() {
    if (selectedOptionIndexValue === null) return;

    

    // Store the selected answer
    const selectedAnswer = relevantQuestions[currentQuestion].options[selectedOptionIndexValue];
    setAnswers((prev) => [...prev, selectedAnswer]);

    // If we're on the first question in the chosen array (which is "What's your gender?"),
    // parse the gender out from the selected option.
    if (currentQuestion === 0) {
      // Extract the first word from the option, which should be "Male", "Female", etc.
      const optionValue = relevantQuestions[0].options[selectedOptionIndexValue].split(" ")[0];
      setSelectedGender(optionValue);
      

      // If the array only has that one question, bail out (edge case)
      if (relevantQuestions.length === 1) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedOptionIndexValue(null);
      }
      
    }

    // Otherwise, move forward or submit
    if (currentQuestion < relevantQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOptionIndexValue(null);
    } else {
      handleSubmitResults();
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
      setSelectedOptionIndexValue(null);
    }
  }

  async function handleSubmitResults() {
    setIsLoading(true);
    const results = {
      isGreekLife,
      gender: selectedGender,
      answers
    };

    try {
      const response = await fetch("/api/redflags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(results)
      });

      if (!response.ok) throw new Error("Failed to submit results");

      const data = await response.json();
      
      // Determine theme based on gender
      let theme = 'neutral';
      if (selectedGender === 'Male') {
        theme = 'masculine';
      } else if (selectedGender === 'Female') {
        theme = 'cute';
      }

      window.location.href = `/results?analysis=${encodeURIComponent(data.analysis)}&theme=${theme}`;
    } catch (error) {
      console.error("Error submitting results:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen p-4 md:p-8 flex justify-center items-center bg-black overflow-hidden">
      {/* Floating background flags */}
      <div className="pointer-events-none select-none opacity-30">
        <div className="absolute text-5xl animate-float1 top-[110%] left-[10%]">🚩</div>
        <div className="absolute text-6xl animate-float2 top-[110%] left=[50%]">🚩</div>
        <div className="absolute text-4xl animate-float3 top-[110%] left-[80%]">🚩</div>
        <div className="absolute text-5xl animate-float4 top-[110%] left-[30%]">🚩</div>
        <div className="absolute text-6xl animate-float5 top-[110%] left-[70%]">🚩</div>
      </div>
      
      <main className="max-w-2xl w-full p-6 md:p-8 rounded-2xl shadow-2xl bg-black border border-black relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white tracking-tight">
          What are my red flags?
        </h1>

        <div className="relative min-h-[400px] flex flex-col justify-between">
          <div className="space-y-6">
            <p className="font-semibold mb-6 text-2xl md:text-3xl text-white">
              {relevantQuestions[currentQuestion].question}
            </p>
            <div className="space-y-3">
              {relevantQuestions[currentQuestion].options.map((option: string, idx: number) => {
                const isSelected = selectedOptionIndexValue === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-xl border transition-all duration-300 cursor-pointer
                      ${isSelected ? "bg-pink-500 border-pink-500" : "bg-black border-black hover:border-pink-500"}
                      p-4 flex items-center`}
                    onClick={() => handleOptionSelect(idx)}
                  >
                    <span
                      className={`text-lg transition-colors duration-300 ${
                        isSelected ? "text-white" : "text-white hover:text-pink-500"
                      }`}
                    >
                      {option}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Always show next/previous */}
          <div className="flex justify-between mt-12 pt-6 border-t border-white/10">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="p-3 text-white/70 hover:text-pink-500 active:bg-white/5 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed border border-white/10 rounded-xl hover:border-pink-500/50"
              aria-label="Previous question"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextQuestion}
              disabled={isLoading}
              className="p-3 text-pink-500 hover:text-pink-400 active:bg-pink-500/10 transition-all duration-300 font-medium flex items-center gap-2 border border-pink-500/50 rounded-xl hover:border-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next question"
            >
              {currentQuestion === 0 || currentQuestion !== relevantQuestions.length - 1 ? (
                <ChevronRight size={24} />
              ) : isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                  Analyzing...
                </div>
              ) : (
                "See Results"
              )}
            </button>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes float1 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-220vh);
          }
        }
        @keyframes float2 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-220vh);
          }
        }
        @keyframes float3 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-220vh);
          }
        }
        @keyframes float4 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-220vh);
          }
        }
        @keyframes float5 {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-220vh);
          }
        }
        .animate-float1 {
          animation: float1 10s linear infinite;
        }
        .animate-float2 {
          animation: float2 12s linear infinite;
        }
        .animate-float3 {
          animation: float3 14s linear infinite;
        }
        .animate-float4 {
          animation: float4 16s linear infinite;
        }
        .animate-float5 {
          animation: float5 18s linear infinite;
        }
      `}</style>
    </div>
  );
}
