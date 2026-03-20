// ===== SKILL SIMULATOR DATA =====

const SIM_MODULES = [
    {
        id: 'soft-skills',
        title: 'Soft Skills Mastery',
        icon: '🤝',
        color: '#A855F7',
        bg: 'rgba(168,85,247,0.15)',
        desc: 'Develop essential interpersonal skills like teamwork, adaptability, problem-solving, and emotional intelligence for workplace success.',
        duration: '45 min',
        totalLessons: 5,
        lessons: [
            {
                id: 'ss-1', title: 'Teamwork & Collaboration',
                theory: 'Teamwork means working together toward a shared goal. In a workplace, effective teamwork involves:\n\n• **Active Listening** — Pay attention to others\' ideas without interrupting.\n• **Role Clarity** — Understand your responsibilities and how they fit the bigger picture.\n• **Conflict Resolution** — Address disagreements respectfully and find common ground.\n• **Accountability** — Own your tasks and deliver on commitments.\n• **Appreciation** — Acknowledge others\' contributions openly.',
                scenario: {
                    situation: 'You\'re working on a group project. One team member hasn\'t contributed for a week, and the deadline is in 3 days. Another member suggests removing them from the team. What do you do?',
                    options: [
                        { text: 'Agree to remove them immediately — deadline is priority', feedback: 'This may seem efficient but doesn\'t demonstrate empathy or leadership. It could create conflict and doesn\'t address the root cause.', score: 1 },
                        { text: 'Reach out privately to understand their situation and offer support', feedback: 'Excellent choice! Showing empathy and addressing issues directly is a key leadership trait. They may be facing personal challenges.', score: 3 },
                        { text: 'Ignore the problem and do their share of work yourself', feedback: 'While this gets the work done, it enables poor behavior and leads to burnout. It doesn\'t solve the underlying issue.', score: 1 },
                        { text: 'Raise the concern in a team meeting and collaboratively decide next steps', feedback: 'Good approach! Open communication is important, but first check privately — public calling out could embarrass them.', score: 2 }
                    ]
                },
                quiz: [
                    { q: 'Which of these is the MOST important aspect of teamwork?', options: ['Doing everything yourself to ensure quality', 'Clear communication and shared responsibility', 'Always agreeing with the team leader', 'Working independently without updating others'], correct: 1 },
                    { q: 'A team member disagrees with your approach. What\'s the best response?', options: ['Insist on your way since you started first', 'Listen to their perspective and discuss the pros and cons', 'Let them do it their way to avoid conflict', 'Escalate to the manager immediately'], correct: 1 },
                ]
            },
            {
                id: 'ss-2', title: 'Time Management',
                theory: 'Time management is about working smarter, not harder. Key techniques include:\n\n• **Eisenhower Matrix** — Categorize tasks as Urgent/Important, Important/Not Urgent, Urgent/Not Important, Neither.\n• **Pomodoro Technique** — Work in 25-min focused intervals with 5-min breaks.\n• **2-Minute Rule** — If a task takes less than 2 minutes, do it immediately.\n• **Time Blocking** — Schedule specific time slots for different tasks.\n• **Eat the Frog** — Tackle the hardest task first when your energy is highest.',
                scenario: {
                    situation: 'It\'s Monday morning. You have: a presentation due Wednesday, 50 unread emails, a team lunch at noon, a bug fix requested by your manager (due today), and a personal errand. How do you prioritize?',
                    options: [
                        { text: 'Start with emails since there are 50 of them', feedback: 'Emails feel productive but often aren\'t urgent. Starting here may consume hours without addressing critical tasks.', score: 1 },
                        { text: 'Fix the bug first (urgent + important), then plan the presentation, batch emails later', feedback: 'Perfect prioritization! The bug is urgent AND important. The presentation is important but not yet urgent. Emails can be batched.', score: 3 },
                        { text: 'Work on the presentation since it requires the most effort', feedback: 'The presentation is important but has 2 days. The bug fix is due today — missing today\'s deadline hurts more.', score: 2 },
                        { text: 'Do the personal errand first to get it off your mind', feedback: 'Personal tasks during work hours should be scheduled around work priorities, not before them.', score: 0 }
                    ]
                },
                quiz: [
                    { q: 'In the Eisenhower Matrix, which tasks should you do FIRST?', options: ['Important but not urgent', 'Urgent and important', 'Urgent but not important', 'Neither urgent nor important'], correct: 1 },
                    { q: 'What is the Pomodoro Technique?', options: ['Working non-stop for 4 hours', 'Working 25 minutes, then taking a 5-minute break', 'Delegating all tasks to others', 'Only working on one project per day'], correct: 1 },
                ]
            },
            {
                id: 'ss-3', title: 'Adaptability & Growth Mindset',
                theory: 'Adaptability is the ability to adjust to new conditions. In a rapidly changing workplace, it\'s one of the most valued skills.\n\n• **Growth Mindset** — Believe abilities can be developed through dedication and hard work.\n• **Embrace Change** — See change as an opportunity, not a threat.\n• **Learn from Failure** — Treat mistakes as learning experiences.\n• **Stay Curious** — Continuously seek new knowledge and skills.\n• **Be Open to Feedback** — View constructive criticism as a gift, not an attack.',
                scenario: {
                    situation: 'Your company just announced they\'re switching from a technology you\'re expert in to a completely new one you\'ve never used. Your colleagues are complaining. What\'s your approach?',
                    options: [
                        { text: 'Join the complaint — the old technology was perfectly fine', feedback: 'Resisting change doesn\'t stop it. This attitude can make you seem inflexible to leadership.', score: 0 },
                        { text: 'Start learning the new technology immediately and offer to help your team transition', feedback: 'Outstanding! Proactive learners who help others are exactly what companies value. This shows leadership and adaptability.', score: 3 },
                        { text: 'Wait and see — maybe they\'ll reverse the decision', feedback: 'Passive waiting wastes valuable learning time. Early adopters have an advantage.', score: 1 },
                        { text: 'Look for a new job that uses the old technology', feedback: 'No technology lasts forever. Running from change will repeat the same cycle elsewhere.', score: 0 }
                    ]
                },
                quiz: [
                    { q: 'What defines a "growth mindset"?', options: ['Believing intelligence is fixed at birth', 'Believing abilities can be developed through effort', 'Only focusing on things you\'re already good at', 'Avoiding challenges to prevent failure'], correct: 1 },
                    { q: 'How should you respond to constructive feedback?', options: ['Defend yourself immediately', 'Ignore it — you know best', 'Listen, reflect, and apply what\'s useful', 'Complain to HR about the person'], correct: 2 },
                ]
            },
            {
                id: 'ss-4', title: 'Problem-Solving & Critical Thinking',
                theory: 'Problem-solving is a structured approach to finding solutions:\n\n• **Define the Problem** — Clearly state what\'s wrong. Don\'t jump to solutions.\n• **Gather Information** — Collect relevant data and perspectives.\n• **Generate Options** — Brainstorm multiple solutions without judging.\n• **Evaluate & Decide** — Weigh pros/cons of each option.\n• **Implement & Review** — Execute the solution and monitor results.\n\n**Critical Thinking Tips:**\n- Question assumptions\n- Consider multiple perspectives\n- Look for evidence, not opinions\n- Avoid cognitive biases',
                scenario: {
                    situation: 'A client reports that your software crashes every afternoon. Your team checked the code and found no bugs. The testing environment works fine. What\'s your next step?',
                    options: [
                        { text: 'Tell the client it works fine on your end, so it must be their system', feedback: 'Dismissing the client\'s issue is unprofessional. "Works on my machine" isn\'t a solution.', score: 0 },
                        { text: 'Investigate the client\'s environment — check server load patterns, afternoon traffic spikes, and resource usage', feedback: 'Excellent! Systematic problem-solving considers differences between environments. Afternoon crashes suggest load-related issues.', score: 3 },
                        { text: 'Rewrite the entire application from scratch', feedback: 'Drastic and unnecessary. You haven\'t identified the root cause yet.', score: 0 },
                        { text: 'Add more server memory and hope it fixes it', feedback: 'Adding resources without understanding the root cause is guessing. It may waste money without fixing the issue.', score: 1 }
                    ]
                },
                quiz: [
                    { q: 'What\'s the FIRST step in problem-solving?', options: ['Implement a solution', 'Clearly define the problem', 'Blame someone', 'Ask the boss what to do'], correct: 1 },
                    { q: 'Critical thinking requires:', options: ['Going with your gut feeling', 'Accepting the first explanation given', 'Questioning assumptions and seeking evidence', 'Following the majority opinion always'], correct: 2 },
                ]
            },
            {
                id: 'ss-5', title: 'Emotional Intelligence',
                theory: 'Emotional Intelligence (EQ) is the ability to recognize, understand, and manage emotions — both yours and others\'.\n\n**5 Components of EQ:**\n• **Self-Awareness** — Recognize your own emotions and their impact.\n• **Self-Regulation** — Control impulsive reactions; think before acting.\n• **Motivation** — Stay driven even through setbacks.\n• **Empathy** — Understand and share others\' feelings.\n• **Social Skills** — Manage relationships and build networks.\n\n**High EQ in the workplace leads to:**\n- Better teamwork and leadership\n- Stronger conflict resolution\n- Higher job satisfaction\n- Faster career advancement',
                scenario: {
                    situation: 'In a meeting, your manager publicly criticizes your work harshly in front of the entire team. You feel embarrassed and angry. How do you respond?',
                    options: [
                        { text: 'Lash out and defend your work aggressively in front of everyone', feedback: 'Reacting emotionally escalates the situation. It can damage your professional reputation and relationship.', score: 0 },
                        { text: 'Stay quiet in the meeting, then calmly discuss the feedback privately with your manager', feedback: 'Perfect EQ! Staying composed shows self-regulation. A private follow-up demonstrates maturity and professionalism.', score: 3 },
                        { text: 'Stay silent and hold a grudge, doing bare minimum work going forward', feedback: 'Passive aggression hurts your career more than anyone else\'s. Unaddressed emotions build up.', score: 0 },
                        { text: 'Walk out of the meeting immediately', feedback: 'Walking out is dramatic and unprofessional. It shows inability to handle pressure.', score: 0 }
                    ]
                },
                quiz: [
                    { q: 'Which is NOT a component of Emotional Intelligence?', options: ['Self-awareness', 'Empathy', 'Technical expertise', 'Self-regulation'], correct: 2 },
                    { q: 'A colleague is visibly upset. What\'s the emotionally intelligent response?', options: ['Ignore them — it\'s not your problem', 'Tell them to stop being emotional at work', 'Approach them privately and ask if they\'d like to talk', 'Gossip about them with other colleagues'], correct: 2 },
                ]
            }
        ]
    },
    {
        id: 'communication',
        title: 'Communication Skills',
        icon: '🗣️',
        color: '#06B6D4',
        bg: 'rgba(6,182,212,0.15)',
        desc: 'Master verbal, written, and non-verbal communication for professional settings — emails, presentations, meetings, and more.',
        duration: '40 min',
        totalLessons: 5,
        lessons: [
            {
                id: 'cs-1', title: 'Professional Email Writing',
                theory: 'Email is the backbone of professional communication. A well-written email is:\n\n**Structure of a Professional Email:**\n• **Subject Line** — Clear, specific, and actionable (e.g., "Meeting Agenda for March 15 Review")\n• **Greeting** — "Dear Mr./Ms. [Name]" or "Hi [Name]" based on context\n• **Opening** — State your purpose in the first sentence\n• **Body** — Provide details concisely using bullet points\n• **Closing** — Clear call-to-action ("Please confirm by Friday")\n• **Sign-off** — "Best regards," / "Kind regards,"\n\n**Common Mistakes:**\n- Writing "URGENT!!!" in every subject line\n- Using slang or emojis in formal emails\n- Replying all unnecessarily\n- Forgetting attachments (mention them in the body first)',
                scenario: {
                    situation: 'You need to email your professor requesting a deadline extension for an assignment due tomorrow. You have a valid reason (health issue). Which email approach is best?',
                    options: [
                        { text: '"Hey prof, can u extend the deadline?? plz plz 🙏"', feedback: 'Too informal! No greeting, no explanation, uses text speak and emojis. Unprofessional for academic communication.', score: 0 },
                        { text: '"Dear Professor [Name], I hope this message finds you well. I\'m writing to request a 3-day extension on [assignment name] due to a health issue. I have a medical certificate and will submit it on [date]. Thank you for your understanding."', feedback: 'Excellent! Professional greeting, clear purpose, valid reason, specific request, and polite closing. This is textbook professional email writing.', score: 3 },
                        { text: 'A 5-paragraph email explaining your entire medical history in detail', feedback: 'Too much information. Keep it concise and relevant. The professor doesn\'t need your full medical history.', score: 1 },
                        { text: 'Send no email and just submit it late without explanation', feedback: 'Not communicating is the worst option. Most professors are understanding when asked respectfully.', score: 0 }
                    ]
                },
                quiz: [
                    { q: 'What should the FIRST sentence of a professional email contain?', options: ['A joke to break the ice', 'Your life story', 'The purpose of the email', 'A complaint about the recipient'], correct: 2 },
                    { q: 'Which subject line is MOST professional?', options: ['URGENT READ NOW!!!', 'hey', 'Project Update: Q1 Report Attached for Review', 'no subject'], correct: 2 },
                ]
            },
            {
                id: 'cs-2', title: 'Active Listening',
                theory: 'Active listening is fully concentrating on what someone is saying, not just hearing the words.\n\n**Techniques for Active Listening:**\n• **Give Full Attention** — Put away your phone, make eye contact.\n• **Don\'t Interrupt** — Let the speaker finish their thought.\n• **Paraphrase** — "So what you\'re saying is..." to confirm understanding.\n• **Ask Clarifying Questions** — "Could you elaborate on that?"\n• **Provide Feedback** — Nod, use verbal cues like "I see" or "That makes sense."\n• **Withhold Judgment** — Listen to understand, not to respond.\n\n**Why It Matters:**\n- Reduces misunderstandings by 40%\n- Builds trust and respect\n- Leads to better problem-solving\n- Critical for interviews and meetings',
                scenario: {
                    situation: 'During a team meeting, a colleague is explaining a complex problem they\'re facing. Halfway through, you think you already know the solution. What do you do?',
                    options: [
                        { text: 'Interrupt immediately to share your solution — time is precious', feedback: 'Interrupting shows you value your time over theirs. You might also miss important context that changes the solution.', score: 0 },
                        { text: 'Listen until they finish, paraphrase their concern, then share your suggestion', feedback: 'Perfect! Listening fully shows respect. Paraphrasing ensures you understand before offering solutions.', score: 3 },
                        { text: 'Zone out since you already know the answer', feedback: 'You might miss nuances that change the problem. Also, not paying attention is disrespectful.', score: 0 },
                        { text: 'Start typing your solution in the chat before they finish', feedback: 'Multitasking during someone\'s explanation sends a message that you\'re not valuing their input.', score: 1 }
                    ]
                },
                quiz: [
                    { q: 'What is the purpose of paraphrasing in active listening?', options: ['To show off your vocabulary', 'To confirm you understood correctly', 'To change the topic', 'To interrupt politely'], correct: 1 },
                    { q: 'Which behavior demonstrates active listening?', options: ['Checking your phone while nodding', 'Interrupting with "I know, I know"', 'Making eye contact and asking follow-up questions', 'Thinking about your response while they talk'], correct: 2 },
                ]
            },
            {
                id: 'cs-3', title: 'Presentation Skills',
                theory: 'Great presentations inform, engage, and persuade. Key principles:\n\n**Preparation:**\n• **Know Your Audience** — Tailor content to their knowledge level.\n• **Rule of 3** — Present 3 main points for retention.\n• **10-20-30 Rule** — Max 10 slides, 20 minutes, 30pt font minimum.\n\n**Delivery:**\n• **Open Strong** — Start with a question, statistic, or story.\n• **Eye Contact** — Look at different sections of the room.\n• **Voice Modulation** — Vary pace, volume, and tone.\n• **Body Language** — Stand tall, use open gestures, move with purpose.\n• **Pause Power** — Strategic pauses are more impactful than "um" and "uh."\n\n**Handle Nervousness:**\n- Practice out loud 3+ times\n- Arrive early to familiarize with the space\n- Deep breathing before you start\n- Remember: the audience wants you to succeed',
                scenario: {
                    situation: 'You\'re presenting your project to a panel of evaluators. During Q&A, someone asks a question you don\'t know the answer to. What do you do?',
                    options: [
                        { text: 'Make up an answer confidently — fake it till you make it', feedback: 'Fabricating answers is risky. If caught (and experts will catch you), your credibility is destroyed.', score: 0 },
                        { text: 'Honestly say "That\'s a great question. I don\'t have the exact answer right now, but I\'ll research it and follow up with you."', feedback: 'Excellent! Honesty + commitment to follow up shows intellectual honesty and professionalism. Evaluators respect this.', score: 3 },
                        { text: 'Deflect by changing the subject entirely', feedback: 'Obvious deflection makes you look evasive. The evaluator will notice.', score: 0 },
                        { text: 'Say "That\'s not relevant to my presentation" dismissively', feedback: 'Dismissing an evaluator\'s question is disrespectful and could cost you marks or the opportunity.', score: 0 }
                    ]
                },
                quiz: [
                    { q: 'What is the 10-20-30 rule for presentations?', options: ['10 people, 20 slides, 30 minutes', '10 slides, 20 minutes, 30pt font', '10 minutes, 20 slides, 30 questions', '10 fonts, 20 colors, 30 animations'], correct: 1 },
                    { q: 'What\'s the best way to start a presentation?', options: ['Read the first slide word by word', 'Apologize for being nervous', 'Open with a compelling question, story, or statistic', 'Jump straight into technical details'], correct: 2 },
                ]
            },
            {
                id: 'cs-4', title: 'Body Language & Non-Verbal Cues',
                theory: 'Research shows 55% of communication is body language, 38% is tone, and only 7% is words.\n\n**Positive Body Language:**\n• **Eye Contact** — Shows confidence and engagement (not staring).\n• **Firm Handshake** — Confident, not crushing.\n• **Open Posture** — Uncrossed arms, facing the speaker.\n• **Genuine Smile** — Builds rapport and approachability.\n• **Nodding** — Shows agreement and active listening.\n\n**Negative Signals to Avoid:**\n• Crossed arms — appears defensive\n• Avoiding eye contact — seems dishonest or insecure\n• Fidgeting — shows nervousness\n• Slouching — signals disinterest\n• Looking at phone — disrespectful\n\n**In Interviews:**\n- Sit upright, lean slightly forward\n- Mirror the interviewer\'s posture subtly\n- Use hand gestures naturally when explaining',
                scenario: {
                    situation: 'During an interview, you notice the interviewer has leaned back and crossed their arms after your answer about a project failure. What does this likely mean, and how should you respond?',
                    options: [
                        { text: 'They\'re cold — offer to adjust the AC', feedback: 'While possible, in an interview context, crossed arms usually signal skepticism or disagreement.', score: 0 },
                        { text: 'They seem unconvinced. Lean forward slightly and add what you learned from the failure, showing growth', feedback: 'Excellent reading of body language! Leaning forward shows confidence, and pivoting to lessons learned addresses their skepticism.', score: 3 },
                        { text: 'Ignore it and move to the next point quickly', feedback: 'Ignoring non-verbal cues means missing important feedback. You\'re losing the interviewer.', score: 1 },
                        { text: 'Cross your arms too — mirror them to build rapport', feedback: 'Mirroring negative body language reinforces negativity. Mirror positive cues, not negative ones.', score: 0 }
                    ]
                },
                quiz: [
                    { q: 'What percentage of communication is body language?', options: ['7%', '38%', '55%', '90%'], correct: 2 },
                    { q: 'Which body language is appropriate in an interview?', options: ['Slouching in the chair', 'Sitting upright with slight forward lean', 'Crossing arms and legs tightly', 'Avoiding all eye contact'], correct: 1 },
                ]
            },
            {
                id: 'cs-5', title: 'Group Discussion Techniques',
                theory: 'Group Discussions (GDs) test communication, leadership, and teamwork simultaneously.\n\n**How to Stand Out:**\n• **Initiate** — Starting the discussion shows leadership (but only if you have a strong opening point).\n• **Structure** — Define the topic, present your stance, give examples.\n• **Include Others** — "I\'d like to hear [Name]\'s perspective on this."\n• **Use Data** — "According to recent studies..." carries more weight than opinions.\n• **Summarize** — If possible, conclude by summarizing key points discussed.\n\n**GD Don\'ts:**\n- Don\'t shout or dominate aggressively\n- Don\'t attack people; challenge ideas instead\n- Don\'t sit silently for the entire discussion\n- Don\'t deviate from the topic\n- Don\'t use filler words excessively ("like," "basically," "you know")',
                scenario: {
                    situation: 'In a GD, two members are having a heated argument and nobody else is speaking. The moderator is watching. What\'s your move?',
                    options: [
                        { text: 'Stay quiet — let them sort it out', feedback: 'Silence in a GD is never helpful. Evaluators notice who doesn\'t contribute.', score: 0 },
                        { text: 'Take sides with the louder person', feedback: 'Siding with volume over logic shows poor judgment. Evaluate the argument, not the volume.', score: 0 },
                        { text: 'Calmly intervene: "Both points are valid. Let me add a different perspective..." and redirect the discussion', feedback: 'Outstanding! Mediating conflict and adding value shows leadership, composure, and communication skills — exactly what GDs test.', score: 3 },
                        { text: 'Start a separate conversation with the person next to you', feedback: 'Side conversations in a GD are seen as disengaged and rude.', score: 0 }
                    ]
                },
                quiz: [
                    { q: 'What\'s the BEST way to start a Group Discussion?', options: ['Shout your opinion loudly', 'Quote a relevant statistic or define the scope of the topic', 'Say "I don\'t know much about this but..."', 'Wait until everyone else has spoken'], correct: 1 },
                    { q: 'In a GD, you disagree with someone. How should you respond?', options: ['"You\'re wrong and here\'s why"', '"I disagree" and stop talking', '"That\'s an interesting point, however I think..."', '"Whatever, let\'s move on"'], correct: 2 },
                ]
            }
        ]
    },
    {
        id: 'interview-prep',
        title: 'Interview Preparation',
        icon: '💼',
        color: '#10B981',
        bg: 'rgba(16,185,129,0.15)',
        desc: 'Ace your placement interviews with practice on HR questions, STAR method, salary negotiation, and common interview scenarios.',
        duration: '50 min',
        totalLessons: 5,
        lessons: [
            {
                id: 'ip-1', title: '"Tell Me About Yourself" — The Perfect Answer',
                theory: 'This is usually the first question in any interview. Your answer sets the tone.\n\n**The Formula (Present-Past-Future):**\n1. **Present** — "I\'m currently [your current role/education]..."\n2. **Past** — "I\'ve previously [relevant experience/projects]..."\n3. **Future** — "I\'m excited about [this role/company] because..."\n\n**Keep it:**\n- 60-90 seconds long\n- Professional (not your life story)\n- Relevant to the job/role\n- Ending with why you want THIS job\n\n**Example:** "I\'m a final-year Computer Science student at XYZ University, specializing in full-stack development. I\'ve built 3 projects including an e-commerce platform that handles 1000+ users. I also interned at ABC Corp where I improved their API response time by 40%. I\'m excited about this role at your company because of your focus on scalable cloud solutions, which aligns perfectly with my skills and career goals."',
                scenario: {
                    situation: 'An interviewer asks "Tell me about yourself." Choose the best response approach:',
                    options: [
                        { text: '"I was born in Delhi, have 2 siblings, love cricket, and my favorite movie is..."', feedback: 'Too personal! The interviewer wants professional background, not a biography.', score: 0 },
                        { text: 'Use Present-Past-Future: current status → relevant experience → why this company', feedback: 'Perfect framework! Concise, structured, and ends with your motivation for the specific role. This shows preparation.', score: 3 },
                        { text: '"I\'m a good person who works hard. You should hire me."', feedback: 'Too vague and generic. No specifics, no evidence, and "you should hire me" is presumptuous.', score: 0 },
                        { text: 'Read your resume out loud word by word', feedback: 'They already have your resume. Add value by highlighting key achievements and connecting them to the role.', score: 1 }
                    ]
                },
                quiz: [
                    { q: 'How long should your "Tell me about yourself" answer be?', options: ['5 seconds', '60-90 seconds', '10 minutes', 'As long as possible to show knowledge'], correct: 1 },
                    { q: 'What\'s the recommended structure?', options: ['Future-Past-Present', 'Present-Past-Future', 'Random facts about yourself', 'Only talk about hobbies'], correct: 1 },
                ]
            },
            {
                id: 'ip-2', title: 'STAR Method for Behavioral Questions',
                theory: 'Behavioral questions ("Tell me about a time when...") are best answered using the STAR method:\n\n• **S — Situation** — Set the scene. Where? When? What was the context?\n• **T — Task** — What was your specific responsibility or challenge?\n• **A — Action** — What steps did YOU take? (Use "I," not "we")\n• **R — Result** — What was the outcome? Use numbers when possible.\n\n**Example Question:** "Tell me about a time you resolved a conflict."\n\n**STAR Answer:** "In my third year project (S), two team members disagreed on the tech stack, causing a week of delays (T). I organized a meeting where each person presented their case with pros/cons, then we voted based on project requirements (A). We resolved the conflict in one session, chose React, and delivered the project 2 days early (R)."',
                scenario: {
                    situation: 'Interviewer asks: "Tell me about a time you failed." How do you structure your response?',
                    options: [
                        { text: '"I\'ve never really failed at anything"', feedback: 'Unbelievable and arrogant. Everyone fails. This answer shows lack of self-awareness.', score: 0 },
                        { text: 'Use STAR: describe the situation, your role, what went wrong, and most importantly what you LEARNED', feedback: 'Excellent! Interviewers ask about failure to see self-awareness and growth. STAR method + lessons learned = winning answer.', score: 3 },
                        { text: 'Blame your team members for the failure', feedback: 'Blaming others shows no accountability. Interviewers want to see ownership and maturity.', score: 0 },
                        { text: 'Share a minor, inconsequential failure to play it safe', feedback: 'A trivial answer seems evasive. Choose a genuine failure — the learning matters more than the failure itself.', score: 2 }
                    ]
                },
                quiz: [
                    { q: 'What does STAR stand for?', options: ['Skills, Training, Ability, Results', 'Situation, Task, Action, Result', 'Start, Think, Act, Reflect', 'Story, Theme, Analysis, Review'], correct: 1 },
                    { q: 'In the "Action" part of STAR, you should:', options: ['Talk about what the team did', 'Focus on what YOU specifically did', 'Skip to the result', 'Blame others for problems'], correct: 1 },
                ]
            },
            {
                id: 'ip-3', title: 'Common HR Interview Questions',
                theory: 'Be prepared for these frequently asked questions:\n\n**1. "Why should we hire you?"**\nMatch your skills to the job description. Example: "My skills in X, Y, Z directly align with what you\'re looking for, and my experience in [specific project] shows I can deliver results."\n\n**2. "What\'s your greatest weakness?"**\nBe honest but strategic. Show self-awareness + improvement:\n"I used to struggle with delegation, wanting to do everything myself. I\'ve been actively working on it by assigning tasks in my project team and trusting their abilities."\n\n**3. "Where do you see yourself in 5 years?"**\nShow ambition aligned with the company:\n"I see myself growing into a senior role here, having mastered [relevant area] and contributing to [company goal]."\n\n**4. "Why do you want to work here?"**\nResearch the company. Mention specific projects, values, or products:\n"Your work on [specific product/initiative] resonates with my passion for [field]. I admire your culture of [value]."',
                scenario: {
                    situation: 'Interviewer asks: "What\'s your greatest weakness?" What\'s the best approach?',
                    options: [
                        { text: '"I\'m a perfectionist" (with a smile)', feedback: 'This cliché answer is seen through instantly. It\'s a disguised strength, not a genuine weakness. Interviewers dislike it.', score: 0 },
                        { text: '"I have no weaknesses"', feedback: 'No one is perfect. This shows lack of self-awareness — a major red flag.', score: 0 },
                        { text: 'Name a genuine weakness + specific steps you\'re taking to improve it', feedback: 'Perfect! Shows self-awareness, honesty, and proactive improvement. E.g., "I struggle with public speaking, so I joined a Toastmasters club."', score: 3 },
                        { text: '"I\'m always late to work"', feedback: 'Too damaging! Choose a weakness that\'s real but not a dealbreaker for the role.', score: 0 }
                    ]
                },
                quiz: [
                    { q: 'When asked "Why do you want to work here?", you should:', options: ['Say "I need the money"', 'Mention specific things about the company you admire', 'Say "It was the first company that called me"', 'Talk about the salary and benefits'], correct: 1 },
                    { q: 'The best "Where do you see yourself in 5 years?" answer:', options: ['In your chair (pointing at the interviewer)', 'Shows growth within the company aligned with your skills', 'At a different, bigger company', 'I haven\'t thought about it'], correct: 1 },
                ]
            },
            {
                id: 'ip-4', title: 'Resume Best Practices',
                theory: 'Your resume is your marketing document. Make every line count.\n\n**Format:**\n• **1 page** for freshers/students (2 pages only for 10+ years experience)\n• **Clear sections**: Education, Skills, Projects, Experience, Achievements\n• **Reverse chronological** — most recent first\n• **Consistent formatting** — same font, alignment, date format\n\n**Content Tips:**\n• **Use Action Verbs** — "Developed," "Led," "Optimized," "Reduced," "Implemented"\n• **Quantify Results** — "Improved load time by 40%" > "Made website faster"\n• **Tailor for Each Job** — Match keywords from the job description\n• **Skills Section** — List relevant technical AND soft skills\n\n**Avoid:**\n- Objective statements (use a Professional Summary instead)\n- "References available upon request" (it\'s assumed)\n- Irrelevant hobbies (unless they show relevant skills)\n- Typos and grammatical errors (instant rejection)',
                scenario: {
                    situation: 'You\'re writing a resume bullet point for a project where you built a website. Which version is best?',
                    options: [
                        { text: '"Made a website"', feedback: 'Too vague. No details about technology, impact, or your specific contribution.', score: 0 },
                        { text: '"Developed a full-stack e-commerce platform using React and Node.js, handling 500+ products and serving 1000+ monthly active users"', feedback: 'Excellent! Starts with an action verb, specifies technologies, and quantifies impact. This stands out to recruiters.', score: 3 },
                        { text: '"Responsible for website things"', feedback: '"Responsible for" is passive and vague. What did you actually DO?', score: 0 },
                        { text: '"Built the best website ever made in the history of websites"', feedback: 'Subjective claims without evidence. Recruiters want facts and numbers, not hyperbole.', score: 1 }
                    ]
                },
                quiz: [
                    { q: 'How long should a fresher\'s resume be?', options: ['3-4 pages', '1 page', 'As long as possible', 'Half a page'], correct: 1 },
                    { q: 'Which is a better resume bullet point?', options: ['"Did some coding"', '"Developed a REST API reducing response time by 35%"', '"Was part of the team"', '"Worked on stuff"'], correct: 1 },
                ]
            },
            {
                id: 'ip-5', title: 'Questions to Ask the Interviewer',
                theory: 'Always have 2-3 thoughtful questions ready. This shows genuine interest.\n\n**Great Questions:**\n• "What does a typical day look like for this role?"\n• "What are the biggest challenges the team is currently facing?"\n• "How do you measure success for this position?"\n• "What learning and development opportunities does the company offer?"\n• "Can you tell me about the team I\'d be working with?"\n• "What\'s the company culture like?"\n\n**Never Ask:**\n• "What does your company do?" (shows you didn\'t research)\n• "How soon can I get promoted?" (seems like you don\'t value the current role)\n• "What\'s the salary?" as your first question (wait for them to bring it up)\n• "Do you monitor social media usage?" (raises red flags)\n• "Did I get the job?" (puts them on the spot)',
                scenario: {
                    situation: 'The interviewer says "Do you have any questions for us?" Which response is best?',
                    options: [
                        { text: '"No, I\'m good. You covered everything."', feedback: 'Missed opportunity! Not asking questions suggests lack of curiosity or interest in the role.', score: 0 },
                        { text: '"How much is the salary and how many holidays do I get?"', feedback: 'Leading with compensation questions suggests you care more about benefits than the work itself. Wait for the right moment.', score: 0 },
                        { text: '"What does success look like for this role in the first 6 months, and what are the team\'s current priorities?"', feedback: 'Perfect! Shows you\'re already thinking about contributing. It demonstrates genuine interest and forward thinking.', score: 3 },
                        { text: '"Can you repeat everything you said? I wasn\'t paying attention."', feedback: 'This is career suicide. It shows complete disrespect for the interviewer\'s time.', score: 0 }
                    ]
                },
                quiz: [
                    { q: 'Why should you ask questions at the end of an interview?', options: ['To waste time', 'To show genuine interest and learn about the role', 'To test the interviewer', 'You shouldn\'t — just say thanks and leave'], correct: 1 },
                    { q: 'Which question should you AVOID asking?', options: ['"What challenges does the team face?"', '"What does your company do?"', '"How is success measured here?"', '"What\'s the team culture like?"'], correct: 1 },
                ]
            }
        ]
    },
    {
        id: 'workplace-etiquette',
        title: 'Workplace Etiquette',
        icon: '🏢',
        color: '#F59E0B',
        bg: 'rgba(245,158,11,0.15)',
        desc: 'Learn professional workplace manners — from meeting etiquette and dress code to networking and digital communication norms.',
        duration: '30 min',
        totalLessons: 4,
        lessons: [
            {
                id: 'we-1', title: 'Meeting Etiquette',
                theory: 'Meetings are where first impressions are reinforced.\n\n**Before the Meeting:**\n• Review the agenda and prepare your points\n• Be on time (5 minutes early = on time)\n• Bring necessary materials\n\n**During the Meeting:**\n• Put phone on silent and face-down\n• Take notes actively\n• Contribute meaningfully — quality over quantity\n• Don\'t interrupt; raise your hand or wait for a pause\n• Stay on topic\n\n**After the Meeting:**\n• Send a summary email with action items\n• Complete assigned tasks by the deadline\n• Follow up on open items\n\n**Virtual Meeting Tips:**\n- Camera ON (unless bandwidth issues)\n- Mute when not speaking\n- Professional background\n- Don\'t multitask (it shows on camera)',
                scenario: {
                    situation: 'You join a virtual team meeting 5 minutes late. Your camera is off, and you\'re eating lunch. The manager asks for your input on a topic discussed before you joined. What do you do?',
                    options: [
                        { text: 'Pretend you heard everything and make a generic comment', feedback: 'Getting caught faking it is worse than admitting you missed it. Be honest.', score: 0 },
                        { text: 'Turn on your camera, apologize briefly for being late, and ask for a quick summary before sharing your thoughts', feedback: 'Great! Showing your face demonstrates engagement, a brief apology shows professionalism, and asking for context shows honesty.', score: 3 },
                        { text: 'Stay muted and type "Sorry, audio issues" in the chat', feedback: 'Dishonesty erodes trust. If this becomes a pattern, colleagues will notice.', score: 0 },
                        { text: 'Leave the meeting and say you\'ll watch the recording later', feedback: 'Leaving shows disengagement. Most discussions benefit from real-time participation.', score: 1 }
                    ]
                },
                quiz: [
                    { q: 'What should you do immediately after a meeting?', options: ['Forget about it until the next one', 'Send summary with action items', 'Complain about how long it was', 'Delete the meeting notes'], correct: 1 },
                    { q: 'In virtual meetings, you should:', options: ['Keep camera off and multitask', 'Camera on, mute when not speaking', 'Leave early without notice', 'Use fun virtual backgrounds always'], correct: 1 },
                ]
            },
            {
                id: 'we-2', title: 'Professional Networking',
                theory: 'Networking is building genuine professional relationships, not collecting contacts.\n\n**Effective Networking:**\n• **LinkedIn** — Keep your profile updated, engage with posts, connect with purpose\n• **Events** — Attend industry meetups, webinars, hackathons\n• **Elevator Pitch** — 30-second intro: who you are, what you do, what you\'re looking for\n• **Follow Up** — Send a message within 24 hours of meeting someone\n• **Give First** — Share useful resources, make introductions, offer help before asking for favors\n\n**Building Your Brand:**\n- Share your projects and learnings publicly\n- Write about your experiences (blogs, LinkedIn posts)\n- Contribute to open-source projects\n- Join communities in your field of interest',
                scenario: {
                    situation: 'You attend a tech meetup and meet a senior engineer from your dream company. You have 2 minutes. What do you do?',
                    options: [
                        { text: '"Can you refer me for a job? Here\'s my resume."', feedback: 'Too transactional too fast! You haven\'t built any rapport. This feels pushy and desperate.', score: 0 },
                        { text: 'Introduce yourself, ask about their work genuinely, mention a shared interest, and ask to connect on LinkedIn', feedback: 'Perfect! Building genuine rapport first, showing interest in THEM, and leaving the door open for future conversation. Natural networking.', score: 3 },
                        { text: 'Stand in the corner and hope they come to you', feedback: 'Networking requires initiative. Opportunities don\'t come to wallflowers.', score: 0 },
                        { text: 'Talk only about yourself for the entire 2 minutes', feedback: 'One-sided conversations are forgettable. The best networkers listen more than they talk.', score: 1 }
                    ]
                },
                quiz: [
                    { q: 'When is the best time to follow up after meeting someone?', options: ['Never — if it\'s meant to be, they\'ll reach out', 'Within 24 hours', 'After 3 weeks', '6 months later'], correct: 1 },
                    { q: 'The most effective networking approach is:', options: ['Immediately asking for favors', 'Building genuine relationships by offering value first', 'Collecting as many business cards as possible', 'Only talking to senior people'], correct: 1 },
                ]
            },
            {
                id: 'we-3', title: 'Professional Dress Code & Grooming',
                theory: 'Dressing appropriately shows respect for the workplace and boosts confidence.\n\n**Common Dress Codes:**\n• **Formal/Business** — Suit, tie, formal shoes (interviews, client meetings)\n• **Business Casual** — Collared shirt, chinos/trousers, closed shoes (most offices)\n• **Smart Casual** — Neat jeans, polo/casual button-up (creative/tech companies)\n• **Casual** — Clean t-shirt, jeans, sneakers (startups)\n\n**Universal Rules:**\n• Clothes should be clean, ironed, and well-fitted\n• Shoes should be clean and appropriate for the setting\n• Minimal, professional accessories\n• Good hygiene is non-negotiable\n• When in doubt, slightly overdress rather than underdress\n\n**For Interviews:**\n- Research the company\'s dress code\n- When unsure, go business casual or one level above the company norm',
                scenario: {
                    situation: 'You have an interview at a tech startup known for its casual culture. Everyone wears t-shirts and jeans. How should you dress?',
                    options: [
                        { text: 'Full three-piece suit with a tie', feedback: 'Overdressing this much can make you seem out of touch with the company culture.', score: 1 },
                        { text: 'Business casual — collared shirt/smart top, clean trousers, neat shoes', feedback: 'Smart choice! One level above the daily norm shows you take the interview seriously while being culturally aware.', score: 3 },
                        { text: 'Your oldest jeans and a wrinkled t-shirt', feedback: 'Matching their casual doesn\'t apply to interviews. You want to show you put in effort.', score: 0 },
                        { text: 'Whatever you wore to bed', feedback: 'This would be career-ending levels of unprofessional.', score: 0 }
                    ]
                },
                quiz: [
                    { q: 'When you\'re unsure about the dress code, you should:', options: ['Wear whatever is comfortable', 'Slightly overdress rather than underdress', 'Ask all colleagues what they\'re wearing', 'Don\'t go to the event'], correct: 1 },
                    { q: 'What\'s the most important grooming rule for any workplace?', options: ['Wear expensive brands', 'Good hygiene is non-negotiable', 'Always wear a suit', 'Wear the latest fashion trends'], correct: 1 },
                ]
            },
            {
                id: 'we-4', title: 'Professional Digital Presence',
                theory: 'Your online presence IS your professional brand. Recruiters WILL check.\n\n**LinkedIn Optimization:**\n• Professional headshot (not a selfie or group photo)\n• Compelling headline: "CS Student | Full-Stack Developer | Open to Opportunities"\n• Detailed About section with achievements\n• List ALL projects, certifications, and relevant skills\n• Get endorsements and recommendations\n\n**Social Media Cleanup:**\n• Google yourself — check what appears\n• Make personal accounts private or clean them up\n• Remove controversial, offensive, or unprofessional content\n• Your future employer will check Twitter, Instagram, Facebook\n\n**Building Your Brand:**\n• Share industry articles and add your insights\n• Write about your learning journey\n• Engage constructively in discussions\n• Showcase projects on GitHub/portfolio',
                scenario: {
                    situation: 'A recruiter finds your LinkedIn profile. Your photo is a beach selfie, your headline says "Looking for any job", and your About section is empty. They also find your Twitter full of angry political rants. Will they move forward?',
                    options: [
                        { text: 'Yes — they only care about technical skills', feedback: 'Wrong! Recruiters evaluate professionalism, communication, and cultural fit. A sloppy online presence raises red flags.', score: 0 },
                        { text: 'Probably not — an unprofessional digital presence suggests lack of attention to detail and self-awareness', feedback: 'Correct. Studies show 70% of recruiters have rejected candidates based on social media profiles. First impressions matter — even digitally.', score: 3 },
                        { text: 'They won\'t check social media — it\'s private', feedback: 'If it\'s public, it\'s fair game. And even private accounts can sometimes be found. Always assume recruiters will look.', score: 0 },
                        { text: 'LinkedIn doesn\'t matter for tech jobs', feedback: 'LinkedIn is the #1 professional networking platform. 87% of recruiters use it to find candidates.', score: 0 }
                    ]
                },
                quiz: [
                    { q: 'What percentage of recruiters check social media profiles?', options: ['Less than 10%', 'About 30%', 'Over 70%', 'None — it\'s illegal'], correct: 2 },
                    { q: 'A good LinkedIn headline should include:', options: ['Just your name', 'Your role, key skills, and availability', '"Looking for any job"', 'Nothing — leave it blank'], correct: 1 },
                ]
            }
        ]
    }
];
