/* ==========================================================================
   WEBSITE CONTENT
   --------------------------------------------------------------------------
   This is the only file you need to edit to change what the website shows.

   - Text marked "TBD" is placeholder content. Replace it with real details.
   - File and image paths are relative to index.html,
     e.g. "assets/docs/Research_Paper.pdf".
   - Leave a "file" empty ("") to show "Coming soon" instead of buttons.
   - Remove an item from a list to remove it from the page. An empty list
     hides its whole section (e.g. screenshots: []).
   ========================================================================== */

// Technology logos come from Devicon: https://devicon.dev (copy the icon path).
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

window.SITE = {
  /* ---------- Project basics (navbar, hero, footer, browser tab) ---------- */
  project: {
    groupId: "R26-IT-059",
    name: "BurnoutGuard",
    title: "Explainable Multi-Modal AI System for Early Academic Burnout and Dropout Prediction",
    highlight: "Early Academic Burnout and Dropout Prediction", // part of the title shown in gradient colour
    badge: "Explainable AI · NLP · Learning Analytics",
    tagline:
      "BurnoutGuard warns academic advisors early when a student may be heading toward burnout or dropout. It combines how students perform, what they write and how they use the LMS, and shows the reasons behind every alert.",
    university: "Sri Lanka Institute of Information Technology",
    faculty: "Faculty of Computing · CoEAI Research Group",
    academicYear: "IT4010 Research Project · 2026",
    stats: [
      { value: "4", label: "Integrated AI components" },
      { value: "82.32%", label: "Emotion classifier accuracy" },
      { value: "0.88", label: "Academic risk AUC (Week 17)" },
      { value: "16+ weeks", label: "Left to intervene" }
    ]
  },

  /* ---------- Project Scope: Literature Survey ---------- */
  literature: {
    paragraphs: [
      "Academic burnout builds up gradually. Studies report that 40 to 65 percent of university students experience burnout symptoms at some point in their studies, and the first signs are emotional and behavioural: stress, worry, low mood and slipping engagement. These appear weeks before a drop in grades or attendance. Two of the richest early signals a university already has are what students write and how they use the Learning Management System (LMS), but no advisor can monitor these by hand for every student.",
      "Research on detecting these signals has moved from classical machine learning on surveys and administrative records to transformer models such as BERT and RoBERTa, which read emotion in text far more accurately. On the behavioural side, LMS logs have been used to predict dropout with supervised models such as LSTMs, and autoencoders have shown that the reconstruction error of a model trained on normal behaviour can reveal disengagement without labelled data.",
      "However, most high-accuracy text models give only a binary depressed / not-depressed label and work as black boxes. Behavioural studies depend on costly clinical questionnaires such as PHQ-9 and BDI-II, or on outcome labels that only arrive late in the semester. Almost no system combines emotional, behavioural and academic signals, or tests how many weeks ahead a warning stays reliable."
    ],
    keyPoints: [
      "Emotional distress appears in student writing four to six weeks before a measurable decline in GPA (Khan et al., 2025).",
      "Fine-tuned transformers outperform classical models on mental-health text, but the highest reported results (97–99%) come from binary tasks that say little about severity.",
      "Explainability is now seen as essential for systems used in educational decisions, yet model attention is rarely shown in a form a non-technical advisor can read.",
      "Supervised early-warning systems usually become reliable only after 8 to 12 weeks of assessments, missing the early weeks when disengagement first appears."
    ]
  },

  /* ---------- Project Scope: Research Gap ----------
     icon options: layers, target, link, users, cpu, chart, search, bulb,
     shield, clock, globe, book, flow, alert, check, image */
  researchGaps: [
    {
      icon: "layers",
      title: "Binary, black-box text models",
      text: "The most accurate emotion detectors sort students into just two groups (distressed or not) and give no reason for their decision, so an advisor cannot judge how serious a case is or why it was flagged."
    },
    {
      icon: "shield",
      title: "Costly, label-dependent behaviour monitoring",
      text: "Behavioural approaches rely on clinical questionnaires (PHQ-9, BDI-II), sensors or past dropout labels. These are costly, raise privacy concerns, are resisted by students and become reliable only late in the semester."
    },
    {
      icon: "link",
      title: "No fusion of multiple signals",
      text: "Academic, emotional and behavioural signals are studied separately, and no reviewed system fuses them into one explainable risk score for advisors."
    },
    {
      icon: "clock",
      title: "No tested early-warning horizon",
      text: "Most systems predict risk at one fixed point in the semester. Few track signals week by week or measure how early a warning can be raised while it stays reliable."
    }
  ],

  // Comparison table: existing research vs. your proposed system.
  // true = has the feature, false = does not. Set rows: [] to hide the table.
  gapComparison: {
    columns: ["Beegam & Baalaji (2025)", "Khan et al. (2025)", "Jalali et al. (2020)", "Proposed System"],
    rows: [
      { feature: "Multi-class emotional states (not just binary)", values: [false, true, false, true] },
      { feature: "Phrase-level explanation an advisor can read", values: [false, false, false, true] },
      { feature: "Unsupervised behavioural anomaly detection", values: [false, false, true, true] },
      { feature: "Applied to student LMS activity", values: [false, false, false, true] },
      { feature: "Risk predicted at several weeks in one model", values: [false, false, false, true] },
      { feature: "Fuses multiple risk signals into one score", values: [false, false, false, true] },
      { feature: "Early-warning lead-time analysis", values: [false, false, false, true] }
    ]
  },

  /* ---------- Project Scope: Problem & Solution ---------- */
  problem: {
    question:
      "How can a university spot a student sliding toward burnout or dropout early enough to help, and explain each warning clearly enough for an advisor to trust it?",
    text: "Dropout rates in computing range from 20 to 40 percent globally, and burnout builds up quietly long before a student leaves. By the time it shows in grades or attendance, the best time to help has often passed. The early signs are spread across how students perform, what they write and how they use the LMS, but no advisor can review all of this by hand.",
    points: [
      "Existing systems predict risk at one fixed point in the semester, with no analysis of the best time to intervene.",
      "Advisors receive a risk score but no actionable reason why a student was flagged.",
      "Text detectors reduce emotional states to a yes/no label, and sensor-based monitoring is costly and resisted by students.",
      "No existing system fuses academic, emotional and behavioural signals with explainable AI."
    ]
  },
  solution: {
    summary:
      "An explainable multi-modal system that fuses academic, emotional and behavioural risk signals into one HIGH / MEDIUM / LOW burnout and dropout alert for advisors.",
    text: "Each signal comes from its own specialist model and is explained on its own. A unified multi-horizon GRU tracks academic trends across 17 weeks, a BERT + RoBERTa ensemble reads student text, and a Variational Autoencoder flags unusual LMS behaviour. A Meta-Integration network fuses them into one risk score, delivered through an API to an advisor dashboard that shows the reasons behind every alert. It runs on data universities already collect, with no new sensors.",
    points: [
      "Risk predicted at Weeks 4, 8, 12 and 17 in one pass, with an accuracy-vs-lead-time curve that finds the best week to intervene",
      "Seven emotional states, each with a phrase-level attention heatmap, a distress score and a risk level",
      "Unsupervised LMS anomaly detection that needs no grade labels, explained with SHAP",
      "Human-in-the-loop by design: alerts support advisors and never trigger automatic action"
    ]
  },

  /* ---------- Project Scope: Research Objectives ---------- */
  mainObjective:
    "To develop an explainable, multi-modal AI system that predicts academic burnout and dropout risk in university students early, by fusing academic, emotional and behavioural signals, and presents every alert with a clear explanation an advisor can act on.",
  objectives: [
    {
      icon: "target",
      title: "Component 1: Academic Burnout and Dropout Risk Detection Using Unified Multi-Horizon GRU with XAI",
      text: "Read 17 weeks of LMS engagement and assessment data as one sequence with an attention-based GRU, predict risk at Weeks 4, 8, 12 and 17 in a single pass, and use an accuracy-vs-lead-time curve to find the best week to warn advisors.",
      owner: "Mahavithana S.M."
    },
    {
      icon: "book",
      title: "Component 2: Emotional Burnout Detection from Student Text with Phrase-Level Interpretability",
      text: "Classify student-generated text into seven emotional states with a fine-tuned BERT + RoBERTa ensemble, and explain every prediction with a phrase-level attention heatmap, a 0–100 distress score and a risk level.",
      owner: "Induwara K.P.Y."
    },
    {
      icon: "chart",
      title: "Component 3: Unsupervised Behavioral Anomaly Detection for Academic Burnout Prediction Using Variational Autoencoder on LMS Interaction Data",
      text: "Learn normal engagement from LMS logs with an unsupervised Variational Autoencoder and a curriculum compliance score, flag students whose weekly behaviour departs from it, and explain each flag with SHAP.",
      owner: "Karunarathne D.C."
    },
    {
      icon: "flow",
      title: "Component 4: Multi-Modal Engagement Analytics and Hierarchical Explainable Meta-Integration Framework for Early Academic Burnout Prediction",
      text: "Fuse the component signals with a Meta-Integration feed-forward network into one HIGH / MEDIUM / LOW risk score, explain it at model and system level, and deliver it through an API and an advisor dashboard with filtering and export.",
      owner: "Jayawickrama G.T."
    }
  ],

  /* ---------- Project Scope: Methodology ---------- */
  methodology: {
    paragraphs: [
      "The system is built from four components: three specialist models that each produce an explained risk signal, and a Meta-Integration layer that fuses them. Because the models use different data, labels and training methods, keeping them separate lets each one be trained, validated and explained on its own, and keeps the whole system modular and interpretable.",
      "The academic trend model is trained on 16,950 students from the Open University Learning Analytics Dataset (OULAD), each described by 17 weeks of 13 engagement and assessment features. The emotional classifier is trained on 51,068 labelled passages from the public Sentiment Analysis for Mental Health dataset, where ten models were compared under one protocol. The behavioural detector learns normal engagement from OULAD LMS logs (32,593 students, 10.6 million interactions) and is checked on a SLIIT synthetic dataset of 500 students. Results are measured with F1, accuracy, ROC-AUC, significance tests, cross-year validation and lead-time analysis.",
      "The Meta-Integration FNN takes 11 inputs (the emotional distress score, five behavioural signals and five academic-risk signals) and outputs one risk score between 0 and 1, mapped to HIGH (above 0.70), MEDIUM (0.40–0.70) or LOW (below 0.40). A transparent weighted sum (0.4 academic, 0.3 behavioural, 0.3 emotional) is also provided for stakeholders who need an auditable formula. In the preliminary fusion run reported in our ICAC 2026 paper, where the behavioural inputs were still simulated, the fused model reached a ROC-AUC of 0.8576."
    ],
    steps: [
      { title: "Literature Review", text: "Reviewed research on student burnout and dropout, mental-health NLP, LMS learning analytics and explainable AI to identify the research gaps." },
      { title: "Data Collection & Preparation", text: "Built 17-week sequences of 13 engagement and assessment features per student from OULAD, cleaned the 7-class mental-health text corpus, and engineered ten weekly behavioural features from LMS logs." },
      { title: "Model Development", text: "Trained a unified multi-horizon GRU with attention, compared ten text models and selected a BERT + RoBERTa ensemble, and trained a VAE only on normally engaged students." },
      { title: "Explainability & Integration", text: "Added three-level XAI for academic risk, attention heatmaps cross-checked with LIME and SHAP for text, and SHAP for behaviour, then fused all signals with a Meta-Integration FNN behind an API and advisor dashboard." },
      { title: "Testing & Evaluation", text: "Compared every model against baselines on held-out test sets, ran significance tests and cross-year validation, and measured how early each signal stays reliable." }
    ],
    diagram: "assets/images/architecture.svg",
    diagramCaption: "High-level system architecture: academic, emotional and behavioural risk signals are fused into one explained alert for the advisor."
  },

  /* ---------- Project Scope: Technologies ----------
     Leave icon "" to show the name's initials instead of a logo. */
  technologies: [
    { name: "Python", icon: DEVICON + "python/python-original.svg" },
    { name: "PyTorch", icon: DEVICON + "pytorch/pytorch-original.svg" },
    { name: "Hugging Face Transformers", icon: "" },
    { name: "scikit-learn", icon: DEVICON + "scikitlearn/scikitlearn-original.svg" },
    { name: "SHAP", icon: "" },
    { name: "LIME", icon: "" },
    { name: "Pandas", icon: DEVICON + "pandas/pandas-original.svg" },
    { name: "NumPy", icon: DEVICON + "numpy/numpy-original.svg" },
    { name: "Matplotlib", icon: DEVICON + "matplotlib/matplotlib-original.svg" },
    { name: "FastAPI", icon: DEVICON + "fastapi/fastapi-original.svg" },
    { name: "Flask", icon: "" },
    { name: "React", icon: DEVICON + "react/react-original.svg" },
    { name: "Jupyter", icon: DEVICON + "jupyter/jupyter-original.svg" },
    { name: "Git", icon: DEVICON + "git/git-original.svg" }
  ],

  /* ---------- Screenshots (put images in assets/images/screenshots/) ----------
     With an odd number of screenshots, the first one is shown full width. */
  screenshots: [
    {
      src: "assets/images/screenshots/meta-fnn-risk.webp",
      caption: "Meta-Integration dashboard: academic, behavioural and emotional signals fused into one burnout risk and alert level"
    },
    {
      src: "assets/images/screenshots/academic-concurrent-modules.webp",
      caption: "Academic trend: concurrent-module validation against the actual outcome"
    },
    {
      src: "assets/images/screenshots/emotional-analysis.webp",
      caption: "Emotional signal analysis: risk level, summary and advisor recommendation (demo student)"
    },
    {
      src: "assets/images/screenshots/emotional-progression.webp",
      caption: "Emotional burnout risk progression across the semester"
    },
    {
      src: "assets/images/screenshots/behavioural-anomaly.webp",
      caption: "Behavioural anomaly and curriculum compliance detection from LMS activity"
    }
  ],

  /* ---------- Milestones (2026 Regular Batch RP timeline) ----------
     date:     "YYYY-MM-DD" (leave "" if not known yet). For a date range,
               use the last day here and put the range in dateText.
     dateText: optional text shown instead of the date, e.g. "16 – 18 Mar 2026"
     marks:    e.g. "12%" (leave "" to hide)
     status:   optional. "completed" | "upcoming" | "planned".
               If left out, it is worked out from the date automatically. */
  milestones: [
    {
      title: "Topic Assessment",
      date: "",
      marks: "",
      status: "completed",
      text: "Topic, scope and novelty approved by the supervisor and co-supervisor."
    },
    {
      title: "Project Proposal",
      date: "2026-03-18",
      dateText: "16 – 18 Mar 2026",
      marks: "",
      text: "Proposal report submitted on 15 March, followed by the proposal presentation covering the problem, existing solutions, the four components and the work plan."
    },
    {
      title: "Progress Presentation I",
      date: "2026-05-13",
      dateText: "11 – 13 May 2026",
      marks: "",
      text: "Initial implementation progress of each research component, with proposal feedback addressed. Check list submitted on 13 May."
    },
    {
      title: "Progress Presentation II",
      date: "2026-09-02",
      dateText: "31 Aug – 2 Sep 2026",
      marks: "",
      text: "Near-complete components with evaluation results, explainability and dashboard demos."
    },
    {
      title: "Draft Thesis & Website Submission",
      date: "2026-10-11",
      marks: "",
      text: "Draft thesis and project website submitted."
    },
    {
      title: "Final Check List Submission",
      date: "2026-10-14",
      marks: "",
      text: "Final check list submitted to the RP team."
    },
    {
      title: "Final Presentation & Viva",
      date: "2026-10-21",
      dateText: "19 – 21 Oct 2026",
      marks: "",
      text: "Final demonstration of the complete system and viva voce examination."
    },
    {
      title: "Website Evaluation & Logbook",
      date: "2026-10-21",
      dateText: "19 – 21 Oct 2026",
      marks: "",
      text: "Project website evaluated and logbook submitted."
    },
    {
      title: "Research Paper Submission",
      date: "2026-10-23",
      marks: "",
      text: "Final research paper submitted. Our group paper has already been submitted to ICAC 2026."
    },
    {
      title: "Final Thesis Submission",
      date: "2026-10-28",
      marks: "",
      text: "Final group and individual theses submitted."
    },
    {
      title: "Publication Evidence",
      date: "2026-12-01",
      marks: "",
      text: "Evidence of research paper publication submitted."
    }
  ],

  /* ---------- Panel feedback (shown under the timeline, one tab per assessment) ----------
     who: component or group, comment: what the panel said, response: what we changed.
     Set stages: [] to hide this part. */
  feedback: {
    note: "Summarised comments from assessment panel IT-P05 at each milestone, and what we changed in response.",
    stages: [
      {
        stage: "Proposal Presentation",
        date: "16 – 18 Mar 2026",
        items: [
          {
            who: "Component 1 · Academic Trend",
            comment: "How will academic performance be measured, and how will its trend be predicted?",
            response: "We defined 13 weekly features (7 VLE engagement and 6 assessment features). A GRU reads all 17 weeks as one sequence and learns declining trajectories instead of single-point thresholds."
          },
          {
            who: "Component 2 · Emotional Signal",
            comment: "Detecting emotion in student forum text with BERT is fine, but past research has already done this, so the component needs to go further.",
            response: "We ran a systematic comparison of ten models, built a BERT + RoBERTa ensemble (82.32% accuracy) with phrase-level explanations, and added a lead-time analysis of how early distress can be detected."
          },
          {
            who: "Component 3 · Behavioural Pattern",
            comment: "It is not clear how anomalies in sleeping patterns and phone-app usage link to student burnout and dropout.",
            response: "We changed the data source to academic behaviour only: LMS interaction logs such as clicks, active days, resource views and quiz attempts."
          },
          {
            who: "Component 4 · Meta-Integration",
            comment: "The logic for capturing engagement levels was not convincing.",
            response: "We refocused the component on the meta-integration layer, which fuses the other components' risk signals into one explained alert."
          }
        ]
      },
      {
        stage: "Progress Presentation I",
        date: "11 – 13 May 2026",
        items: [
          {
            who: "Component 1 · Academic Trend",
            comment: "Very good progress. In PP2, address the real-world case where one student takes many modules in a semester.",
            response: "We found 1,071 students taking 2–3 modules at once, fixed a bug that blended assessment scores across modules, recalibrated the alert threshold and added per-student max-pooling (F1 0.7464). We also validated across academic years (Week 17 AUC 0.8286)."
          },
          {
            who: "Component 2 · Emotional Signal",
            comment: "Very good progress. In PP2, provide a simple UI to predict burnout from student feedback, with a white background, as dark backgrounds are hard to see in demos.",
            response: "We redesigned the interface with a clean light theme, a hoverable attention heatmap, a weekly risk progression chart and an advisor recommendation box (React + FastAPI)."
          },
          {
            who: "Component 3 · Behavioural Pattern",
            comment: "In PP2, show how the burnout probability or score is derived from LMS activity data.",
            response: "We built a student behavioural profile dashboard with a weekly risk-score timeline and LMS feature trends, and added a curriculum compliance score and academic-calendar awareness (OULAD AUC 0.6039, SLIIT synthetic AUC 0.7649)."
          },
          {
            who: "Component 4 · Meta-Integration",
            comment: "Explain more clearly how the meta-integration model and its explanations use the other components' risk and burnout scores.",
            response: "We documented the Meta-Integration FNN (component risk scores in, one 0–1 burnout risk out, with HIGH / MEDIUM / LOW alerts), its explanations at model and system level, and a dashboard with student filtering and export."
          }
        ]
      },
      {
        stage: "Progress Presentation II",
        date: "31 Aug – 2 Sep 2026",
        items: [
          {
            who: "Components 1–3",
            comment: "Good to very good progress for the PP2 milestone. Work on the research paper.",
            response: "We wrote the group research paper and submitted it to ICAC 2026."
          }
        ]
      }
    ]
  },

  /* ---------- Downloads ----------
     file:     path to the file, e.g. "assets/docs/Research_Paper.pdf"
     viewFile: optional PDF copy used by the "View" button
               (useful for .pptx/.docx, which browsers cannot preview) */
  documents: [
    { title: "Topic Assessment Form", subtitle: "Group document", file: "assets/docs/TAF_R26-IT-059.pdf" },
    { title: "Project Proposal Report", subtitle: "Group document", file: "" },
    { title: "Research Paper", subtitle: "Submitted to ICAC 2026", file: "assets/docs/Research_Paper_ICAC2026_R26-IT-059.pdf" },
    { title: "Final Group Report", subtitle: "Group document", file: "" },
    { title: "Individual Final Report", subtitle: "Mahavithana S.M. · IT22916426", file: "" },
    { title: "Individual Final Report", subtitle: "Induwara K.P.Y. · IT22196392", file: "" },
    { title: "Individual Final Report", subtitle: "Karunarathne D.C. · IT22215710", file: "" },
    { title: "Individual Final Report", subtitle: "Jayawickrama G.T. · IT22253194", file: "" }
  ],
  presentations: [
    { title: "Proposal Presentation", subtitle: "Group slides", file: "assets/presentations/Proposal_R26-IT-059.pdf", viewFile: "" },
    { title: "Progress Presentation I", subtitle: "Group slides", file: "assets/presentations/PP1_R26-IT-059.pdf", viewFile: "" },
    { title: "Progress Presentation II", subtitle: "Group slides", file: "assets/presentations/PP2_R26-IT-059.pdf", viewFile: "" },
    { title: "Final Presentation", subtitle: "Slides", file: "", viewFile: "" }
  ],

  /* ---------- About Us (photos go in assets/images/team/) ----------
     Leave email / linkedin / github empty ("") to hide that icon. */
  team: [
    {
      name: "Mahavithana S.M.",
      itNumber: "IT22916426",
      role: "Group Leader",
      component: "Academic Trend (Multi-Horizon GRU)",
      photo: "assets/images/team/mahavithana.jpg",
      email: "",
      linkedin: "",
      github: ""
    },
    {
      name: "Induwara K.P.Y.",
      itNumber: "IT22196392",
      role: "Member",
      component: "Emotional Signal (BERT + RoBERTa)",
      photo: "assets/images/team/induwara.jpg",
      email: "yasiruinduwara56@gmail.com",
      linkedin: "https://www.linkedin.com/in/yasiru-induwara-942337337",
      github: "https://github.com/yasiru56"
    },
    {
      name: "Karunarathne D.C.",
      itNumber: "IT22215710",
      role: "Member",
      component: "Behavioural Pattern (VAE)",
      photo: "",
      email: "",
      linkedin: "",
      github: ""
    },
    {
      name: "Jayawickrama G.T.",
      itNumber: "IT22253194",
      role: "Member",
      component: "Meta-Integration (FNN + Dashboard)",
      photo: "",
      email: "",
      linkedin: "",
      github: ""
    }
  ],

  /* ---------- Supervisors (photos go in assets/images/supervisors/) ---------- */
  supervisors: [
    {
      name: "Prof. Anuradha Karunasena",
      role: "Supervisor",
      title: "", // job title, e.g. "Professor" (leave "" to hide)
      department: "Department of Information Technology, SLIIT",
      photo: "assets/images/supervisors/anuradha-karunasena.jpg",
      email: "anuradha.k@sliit.lk",
      linkedin: ""
    },
    {
      name: "Ms. Malithi Nawarathne",
      role: "Co-Supervisor",
      title: "Lecturer",
      department: "Department of Information Technology, SLIIT",
      photo: "assets/images/supervisors/malithi-nawarathne.jpg",
      email: "malithi.n@sliit.lk",
      linkedin: ""
    }
  ],

  /* ---------- Website credit (small line at the bottom of the footer) ---------- */
  credit: {
    name: "Yasiru Induwara",
    url: "https://github.com/yasiru56"
  },

  /* ---------- Contact ---------- */
  contact: {
    email: "", // group email, e.g. "team.projectname@gmail.com" (also receives the contact form)
    phone: "",
    address: "SLIIT Malabe Campus, New Kandy Road, Malabe, Sri Lanka",
    note: "Have a question about our research? Send us a message and we'll get back to you."
  }
};
