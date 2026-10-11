import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { PROJECTS_DATA } from "@/src/Data/projectsData";
import { SKILL_CATEGORIES } from "@/src/Data/skilldata";
import { credentialsData } from "@/src/Data/Credentialsdata";
import { collegeInfo, csSubjects, schoolInfo, semesterMarks } from "@/src/Data/Academicdata";
import { experiences } from "@/src/Data/experiencedata";

export const runtime = "nodejs";

const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1500;

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

const portfolioContext = `
PROFILE
Name: Priyanshu Vijay.
Gender: Female / A girl (She/Her).
Location: Lucknow, UP, India.
Education: B.Tech CSE @ DSMNRU (Dr. Sakuntala Misra National Rehabilitation University, Lucknow), 2023–2027.
Academics: Current CGPA 8.30 | Peak SGPA: 9.64.
Roles & Focus: ML Engineer + Full-Stack Developer + Artist.
Key Stats: 13+ deployed projects (15+ total projects built), 89.54% ML model accuracy, 14+ credentials, 3+ internships, 2+ hackathons.
About: A computer-science undergraduate focused on building technology that works for end users. She works at the intersection of machine learning, full-stack engineering, and UI/artistic design, turning data into actionable insights and intuitive apps.

EDUCATION
Degree: ${collegeInfo.degree}. University: ${collegeInfo.university} (DSMNRU), Lucknow. Dates: ${collegeInfo.duration}.
CGPA: 8.30 (Peak: 9.64).
Semester marks: ${semesterMarks.map(({ sem, mark }) => `${sem}: ${mark}`).join(", ")}.
Key Subjects: ${csSubjects.join(", ")}.
Higher secondary: ${schoolInfo.degree} at ${schoolInfo.school}, ${schoolInfo.year}.

SKILLS
${SKILL_CATEGORIES.map((category) => `- ${category.title}: ${category.description} Skills: ${category.skills.join(", ")}. Metrics: ${category.metrics.map(({ label, value }) => `${label} ${value}`).join("; ")}.`).join("\n")}

PROJECTS
${PROJECTS_DATA.map((project) => `- ${project.title} (${project.type}). ${project.desc} Focus: ${project.focused}. Technologies: ${project.tech.join(", ")}.${project.url ? ` Live: ${project.url}` : ""} Code: ${project.code}`).join("\n")}

EXPERIENCE AND HACKATHONS
${experiences.map((item) => `- ${item.title}, ${item.role}, ${item.date}. ${item.description} Impact: ${item.impact}. Technologies: ${item.tech.join(", ")}. Links: ${item.links.map(({ label, href }) => `${label}: ${href}`).join("; ")}`).join("\n")}

CREDENTIALS
${credentialsData.map((category) => `- ${category.title}: ${category.desc} ${category.items.map((item) => `${item.label}${item.date ? ` (${item.date})` : ""}`).join("; ")}.`).join("\n")}

RESEARCH
Priyanshu's research develops and empirically validates a Python Random Forest framework for short-term realized-volatility forecasting on the Nifty 50. Portfolio-reported metrics: MSE 0.000246, RMSE 0.0157, R² 0.9051; adaptive 95% parametric VaR, with a 4.37% backtested breach ratio over 389 trading days. Repository: https://github.com/Butkii025/Market-Reading.

CONTACT AND LINKS
Email: priyanshuvijay262@gmail.com.
GitHub: https://github.com/Butkii025.
LinkedIn: https://www.linkedin.com/in/priyanshu-v/.
Resume: https://docs.google.com/document/d/145I8HrBv9Ub2HroPFgFkyLaGp5p4T4UDzb6s-uII7Pk/edit?usp=sharing.
`;

function createPortfolioInstructions() {
  return `You are the professional, friendly AI portfolio assistant for Priyanshu Vijay (she/her). Priyanshu is a female ML Engineer, Full-Stack Developer, and Artist from Lucknow, UP, India, pursuing B.Tech CSE @ DSMNRU (2023–2027) with CGPA 8.30 (Peak: 9.64).

SECTION JUMP ANCHORS (Use these hash anchors in markdown links to smoothly scroll visitors directly to that part of the portfolio):
- Contact form: [#contact](#contact) or [Contact Section](#contact)
- Projects showcase: [#projects](#projects) or [Projects Section](#projects)
- Skills & technologies: [#skills](#skills) or [Skills Section](#skills)
- Experience & internships: [#experience](#experience) or [Experience Section](#experience)
- Research on Nifty 50: [#research](#research) or [Research Section](#research)
- Credentials & certificates: [#credentials](#credentials) or [Credentials Section](#credentials)
- Creative art gallery: [#creative_corner](#creative_corner) or [Creative Corner](#creative_corner)
- About & story: [#about](#about) or [About Section](#about)
- Academics & marks: [#academics](#academics) or [Academics Section](#academics)

RESPONSE INSTRUCTIONS & FORMATTING:
1. Short, Crisp & Proper ✂️:
   - Provide direct, factful answers (50–180 words max).
   - Never write bloated walls of text or unnecessary essays.
   - Use clean bullet points for lists, metrics, or technologies.
2. Greetings & Salutations:
   - If the user greets you (e.g., "hi", "hello", "hey", "good morning"), respond with a short, polite, professional greeting (e.g., "Hello! Welcome to Priyanshu's portfolio. How can I assist you with her ML projects, skills, or experience today?").
   - Offer 2-3 quick suggestions or page jump links.
3. Factful Details with Page Redirection & External Links 🔗:
   - Always state accurate, verified facts from the knowledge below.
   - Whenever relevant, provide on-page navigation links with hash anchors (e.g., "You can reach her directly via the [Contact Section](#contact)..." or "View her live apps under [Projects](#projects)").
   - For specific external items, provide the external URL (GitHub, deployed Streamlit/Vercel URLs, LinkedIn, Resume).
4. Accuracy & Truthfulness:
   - Priyanshu is female (she/her). Never refer to her as "he" or "him".
   - If something is not in the portfolio, state that briefly and direct them to [#contact](#contact).

PORTFOLIO KNOWLEDGE:
${portfolioContext}`;
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false;

  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.text === "string" &&
    message.text.trim().length > 0 &&
    message.text.length <= MAX_MESSAGE_LENGTH
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured yet. Please try again later." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !Array.isArray((body as { messages?: unknown }).messages)
  ) {
    return NextResponse.json({ error: "A message history is required." }, { status: 400 });
  }

  const messages = (body as { messages: unknown[] }).messages;
  if (!messages || messages.length === 0 || !messages.every(isChatMessage) || messages[messages.length - 1]?.role !== "user") {
    return NextResponse.json({ error: "The message history is invalid." }, { status: 400 });
  }

  if (messages.length > MAX_MESSAGES) {
    return NextResponse.json({
      reply: "Message limit reached for this session. Please reset the conversation using the refresh button to continue.",
      limitReached: true,
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const modelCandidates = Array.from(
      new Set(
        [
          process.env.GEMINI_MODEL,
          "gemini-3.5-flash",
          "gemini-3.5-flash-lite",
          "gemini-3.1-flash-lite",
          "gemini-3.8-flash",
        ].filter(Boolean) as string[],
      ),
    );

    let reply: string | undefined;
    let lastError: unknown;

    for (const model of modelCandidates) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: messages.map((message) => ({
            role: message.role === "assistant" ? "model" : "user",
            parts: [{ text: message.text }],
          })),
          config: { systemInstruction: createPortfolioInstructions() },
        });

        const text = response.text?.trim();
        if (text) {
          reply = text;
          break;
        }
      } catch (err) {
        lastError = err;
        console.warn(`Gemini model ${model} failed, trying next candidate...`, err);
      }
    }

    if (!reply) {
      console.error("All Gemini model candidates failed or returned empty:", lastError);
      return NextResponse.json(
        { error: "The assistant is temporarily unavailable. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Gemini portfolio chat request failed:", error);
    return NextResponse.json(
      { error: "The assistant is temporarily unavailable. Please try again." },
      { status: 502 },
    );
  }
}
