export type ArticleSection = {
  heading?: string
  paragraphs: string[]
}

export type Article = {
  slug: string
  title: string
  dek: string
  minutes: number
  order: number
}

export const ARTICLES: Article[] = [
  {
    slug: "the-short-version",
    title: "The short version",
    dek: "What Hemi-Sync is, why the CIA wrote a memo about it, and what is actually worth practicing.",
    minutes: 6,
    order: 1,
  },
  {
    slug: "how-the-sound-works",
    title: "How two tones become a beat",
    dek: "Binaural beats are a real auditory trick. Headphones are not optional. Here is the mechanism.",
    minutes: 7,
    order: 2,
  },
  {
    slug: "the-cia-paper",
    title: "What the CIA Gateway paper actually said",
    dek: "A 1983 Army analysis mixed solid EEG notes with holographic-universe speculation. Separate the two.",
    minutes: 8,
    order: 3,
  },
  {
    slug: "what-science-says",
    title: "What the evidence currently supports",
    dek: "The beat is processed in the brainstem. Reliable brainwave 'reprogramming' is much less proven than YouTube implies.",
    minutes: 7,
    order: 4,
  },
  {
    slug: "how-to-practice",
    title: "A protocol you can actually keep",
    dek: "Headphones, a still body, a watching mind, a three-line journal. Two weeks before you decide it is nothing.",
    minutes: 8,
    order: 5,
  },
  {
    slug: "gateway-tools",
    title: "The Gateway tools, without the trademark",
    dek: "Focus levels, the box, the balloon, the affirmation. They are attention techniques. Use them as such.",
    minutes: 7,
    order: 6,
  },
]

export function getArticle(slug: string) {
  return ARTICLES.find((article) => article.slug === slug)
}

export function articleBody(slug: string): ArticleSection[] {
  switch (slug) {
    case "the-short-version":
      return [
        {
          paragraphs: [
            "If you used to put on a tape, lie down, and listen to a low wobbling tone until the room got far away — you were probably using Hemi-Sync, or something in that family. The commercial name belongs to the Monroe Institute. The underlying trick is older and simpler: play a slightly different pitch in each ear, and the brain hears a third pulse at the difference between them.",
            "Robert Monroe was a radio producer who, in the 1950s and 60s, started reporting out-of-body experiences and then spent the rest of his life building a training system around them. The Gateway Experience was the packaged course: progressive audio exercises labeled Focus 10, Focus 12, Focus 15, and so on. In 1983 an Army lieutenant colonel named Wayne M. McDonnell wrote an internal analysis of that system for U.S. intelligence. The memo was later released through FOIA, sat quietly in a reading room, and then exploded on TikTok in 2021 as 'the CIA taught people to leave their bodies.'",
            "That is not a useful way to start. A more useful way: the program is a structured method for changing how you inhabit attention. The audio is a sensory scaffold. The instructions are mostly body-stillness, metaphor, and staying lucid at the edge of sleep. Some people report strange imagery. Many people just get very relaxed and a bit more honest with themselves. Both outcomes can be worth the time.",
          ],
        },
        {
          heading: "What is actually going on",
          paragraphs: [
            "Each ear gets a sine wave a few hertz apart — say 200 Hz on the left and 210 Hz on the right. You cannot hear a 10 Hz tone as a pitch; 10 Hz is too slow. You hear a beating, a wah-wah, a presence that seems to sit between the ears. That difference frequency is the binaural beat. Monroe's claim was that holding the two hemispheres in a shared rhythm made it easier to enter unusual states, the way a drum can organize a room.",
            "Whether the hemispheres truly lock, and whether that lock is the cause of the experiences people report, is a scientific argument. You do not need to win that argument to use the method. You need headphones, a low volume, and a willingness to be bored without picking up your phone.",
          ],
        },
        {
          heading: "What this is good for, if you are trying to get better at being a person",
          paragraphs: [
            "Self-improvement usually fails because it is all speech and no state. You decide, in ordinary beta-brained daytime consciousness, that you will be more focused, less reactive, better at sleeping. Then the old state returns and the decision feels like a poster on a wall.",
            "A hemisphere-sync session is a way to change state on purpose. Still Body trains the split that Gateway called 'mind awake, body asleep' — useful against anxiety that lives in the muscles. Wide Field trains asking a real question without immediately answering it. Study Lock is a fence around a work block. Sleep Slope is permission to stop rehearsing the day.",
            "None of that requires you to believe you will float out of your skull. If you do have a vivid episode, treat it like a dream: write it down, do not build a religion on the first night.",
          ],
        },
        {
          heading: "What this app is",
          paragraphs: [
            "Hemisphere is a small lab. It generates the two tones in your browser. It teaches the public ideas behind Gateway and Hemi-Sync. The spoken-style cues are original; this is not the Monroe Institute, not their tapes, and not medical care.",
            "Read the science article before you decide the CIA memo is a manual for enlightenment. Then do First Contact tonight with actual stereo headphones. The sound is the teacher. The rest is commentary.",
          ],
        },
      ]
    case "how-the-sound-works":
      return [
        {
          paragraphs: [
            "A binaural beat is not a sound in the air. If you play 200 Hz and 210 Hz through a speaker in a room, they mix before they reach you, and you get ordinary acoustic beating — a monaural beat. If you put 200 Hz only in the left headphone cup and 210 Hz only in the right, the mixing happens inside the nervous system. The first place both ears meet is a structure in the brainstem called the superior olivary complex. That is where the phantom pulse is born.",
            "Gerald Oster popularized the phenomenon in a 1973 Scientific American piece. Musicians had noticed related effects long before. Monroe's contribution was not discovering the beat. It was treating it as a training wheel for attention, then layering spoken guidance, progressive 'Focus' labels, and a lot of institutional theater.",
          ],
        },
        {
          heading: "Carrier and beat",
          paragraphs: [
            "Two numbers matter. The carrier is the pitch you actually hear — usually somewhere between 100 and 250 Hz, a low hum. The beat is the difference: 4 Hz, 10 Hz, 18 Hz. People map those differences onto EEG bands because the numbers line up. Delta, theta, alpha, beta. It is a tidy story. The tidy story is the marketing. The honest version is: those bands describe typical scalp EEG rhythms, and a binaural beat is a rhythmic stimulus in the same neighborhood. Whether your cortex politely follows along is a different claim, and the literature is messy.",
            "You will feel the beat more clearly at some carriers than others. If the hum is harsh, lower the volume before you change the frequency. Sine waves have no warmth; a little filtered noise under them (this lab includes a noise layer) makes the session less surgical.",
          ],
        },
        {
          heading: "Why headphones are the whole method",
          paragraphs: [
            "Laptop speakers collapse left and right into one pressure wave. Earbuds that leak, or one dead side of a headset, also collapse the trick. If you cannot tell that a tone is only on the left, you are not doing binaural anything. Use the stereo check on the home page. It plays a left beep, then a right beep. If those are not obviously different places, stop and fix the hardware.",
            "Isochronic tones — a single tone pulsed on and off — do not need headphones. They are a different tool. Hemi-Sync, in the public description, is specifically the binaural (and later more complex) stereo approach. This lab stays with binaural so you can learn the thing you asked about, not a cousin.",
          ],
        },
        {
          heading: "What you should expect to feel",
          paragraphs: [
            "Early on: a wah in the middle of the head, pressure or warmth, time getting slightly stupid, limbs feeling farther away than they are. Sometimes a hypnagogic clip of a face or a hallway. Sometimes nothing but 'I am lying here with a hum.' Nothing is not failure. The skill is remaining present for nothing without turning it into a problem.",
            "If you get nauseous, drop the volume or the beat frequency. If you feel panicked, sit up, lights on, name three objects. The edge of sleep can unmask anxiety. That is information, not a portal.",
          ],
        },
      ]
    case "the-cia-paper":
      return [
        {
          paragraphs: [
            "The document people mean is usually titled Analysis and Assessment of Gateway Process, dated 9 June 1983, authored by U.S. Army Lieutenant Colonel Wayne M. McDonnell. It is about twenty-nine pages. It is not a lab notebook of CIA experiments on thousands of subjects. It is one officer's attempt to explain, in the language available to him, why Monroe's audio system seemed to produce unusual reports, and whether any of that belonged in a military conversation about human performance.",
            "It was later released through the U.S. Freedom of Information Act and lives in the CIA's FOIA reading room. In 2021 a wave of short videos treated it as a forbidden enlightenment manual. That wave skipped the genre of the thing. It is a staff paper. It mixes textbook EEG, then-fashionable physics metaphors, and frank speculation. McDonnell is often careful to mark when he is inferring. Readers who wanted magic did not mark those sentences.",
          ],
        },
        {
          heading: "The part that is ordinary",
          paragraphs: [
            "The memo reviews brainwave bands, the idea that attention can be trained, and the claim that binaural audio can encourage a frequency-following response — the nervous system echoing a rhythmic stimulus. It describes hemispheric synchronization as left and right EEG patterns becoming more alike. It notes that dedicated meditators can produce unusual coherence without tapes, and that audio might shorten the road. That cluster of ideas was already in circulation among biofeedback researchers in the 1960s and 70s. It is not classified wisdom. It is a period snapshot of how intelligent people talked about EEG.",
            "It also describes Gateway's practical ladder: relax the body, keep the mind lucid, use imagery as a control surface, progress through labeled states. If you strip the nouns, you have a meditation curriculum with better production values than most.",
          ],
        },
        {
          heading: "The part that is not ordinary, and not proven",
          paragraphs: [
            "McDonnell then reaches for holographic theories of brain and universe associated with names like Pribram and Bohm, and for the idea that a sufficiently coherent consciousness could operate less constrained by spacetime. This is where the memo becomes a cultural object. It is also where it stops being something you should treat as established science. Those sections are a mind trying to find a physics that would make out-of-body reports not ridiculous. Wanting a physics is not the same as having one.",
            "Remote viewing, leaving the body, contacting non-physical identities — these show up in Monroe's world and in adjacent intelligence-community folklore (Grill Flame, Stargate). Decades of attempted validation did not produce a method you can take to a methods section and expect applause. You can still find the reports interesting. You should not reorganize your life around them after two tracks.",
          ],
        },
        {
          heading: "The missing page",
          paragraphs: [
            "Internet lore insists page 25 was withheld because it contained the secret. A page was missing from some circulated PDFs; later releases and reconstructions reduced the mystery. Even if a page had been omitted, a bureaucratic omission is not evidence of a working teleport. Read the memo if you like primary sources. Read it as a historical document. Then come back and practice the part you can test tonight: can you keep a clear mind while the body sleeps.",
          ],
        },
      ]
    case "what-science-says":
      return [
        {
          paragraphs: [
            "Two different questions get glued together. One: does the brain detect binaural beats? Two: do those beats retune your EEG, mood, memory, or soul in the way the track title promised?",
            "Question one is in decent shape. The beat is generated subcortically. You can measure responses related to it. People reliably perceive it when the two tones are isolated to the two ears and the difference is in a plausible range, roughly 1–30 Hz.",
            "Question two is the one the product pages answer in advance. A 2023 systematic review in PLOS ONE looked at whether binaural-beat stimulation actually entrains cortical oscillations at the target frequency. Fourteen EEG studies made the cut. Five looked compatible with entrainment, eight did not, one was mixed. Methods were all over the place — different frequencies, durations, masking, and analyses — so the field is not even failing in a coordinated way. It is under-standardized.",
          ],
        },
        {
          heading: "Effects you might still get",
          paragraphs: [
            "There are smaller literatures on anxiety, sleep onset, and attention. Results often lean in a hopeful direction and just as often fail to replicate cleanly. Expectation is a huge ingredient: if you lie down, dim the lights, put on a ritual, and believe you are doing classified consciousness work, your arousal system will change. That is not fake. Placebo is a real psychophysiology. It is just not the same as '10 Hz audio reprogrammed my cortex.'",
            "A fair working model for this lab: the tones are an attention object with a body. They give the mind a less verbal toy than a mantra, and they make a session feel like an instrument, which helps you repeat it. The repetition is probably doing more than the Hertz.",
          ],
        },
        {
          heading: "What to stop expecting",
          paragraphs: [
            "Do not expect a diagnostic EEG to show a textbook sine wave at your chosen beat after one track. Do not expect to download languages, heal a disease, or confirm the afterlife. Do not mix this with driving, cycling, or anything that needs your ordinary reflexes. If you have a seizure disorder, talk to a clinician before using rhythmic audio or skip it; this app is not going to pretend it can assess that risk for you.",
            "If a claim cannot survive the sentence 'what would I observe if this were false,' it is not a practice claim. It is a story. Stories can be beautiful. Keep them in the journal, not in your medical chart.",
          ],
        },
        {
          heading: "Cousins with more data",
          paragraphs: [
            "Sleep regularity, daylight in the morning, moving your body, talking to people you respect, and any reasonably standard mindfulness or CBT protocol have heavier evidence than binaural beats. Use Hemisphere beside those, not instead of them. The point of learning Gateway-style work in 2026 is not to find a shortcut around being a mammal. It is to have a repeatable way to change state when the mammal is stuck.",
          ],
        },
      ]
    case "how-to-practice":
      return [
        {
          paragraphs: [
            "Treat this like learning an instrument for a week, not like watching a documentary. The first three sessions are hardware tests: can you hear left and right, can you stay down for eight minutes, can you write one sentence after. If you skip the sentence, the experience leaks. Gateway was obsessive about debriefing for a reason. Unwritten states get rewritten by your usual personality by dinner.",
          ],
        },
        {
          heading: "Setup that removes decisions",
          paragraphs: [
            "Same headphones. Same dimness. Phone in another room or in airplane mode. Volume low — if you cannot imagine listening for twenty minutes, it is too loud. Lie down for Still Body, Wide Field, No Clock, and Sleep Slope. Sit at a desk for Study Lock. Do not do Sleep Slope unless you can sleep; it is designed to dissolve the part of you that keeps a schedule.",
            "Two weeks, four to six sessions a week, is a real trial. One session tells you about novelty. Twelve sessions tell you whether you can find Still Body faster, whether sleep onset gets less of a fight, whether you notice rumination earlier. Those are the metrics. Lightning in the visual field is optional.",
          ],
        },
        {
          heading: "The actual skill",
          paragraphs: [
            "You are learning to split. Body goes toward sleep. Mind stays in the room. Most people can do one or the other: knocked out, or tense and clever. The split is the Gateway specialty, and it is also just good nervous-system literacy. Athletes call a version of it rest with intent. Meditators call a version of it lucid dullness. Students need it because the default is body buzzing and mind elsewhere.",
            "When you drift into a dream, come back once. If you drift again, maybe you needed sleep. End. Do not heroically fight REM. When you get bored, that is the curriculum, not a bug. Boredom is the mind offering you a job. Decline, return to the beat.",
          ],
        },
        {
          heading: "A week you can copy",
          paragraphs: [
            "Night 1: read The short version, run the stereo check, do First Contact. Night 2: First Contact again. Night 3–4: Still Body. Night 5: Still Body, then write five sentences. Night 6: Study Lock before a real assignment. Night 7: Sleep Slope or another Still Body. Week two, add Wide Field once you can stay lucid in Still Body. Save No Clock until Wide Field does not rattle you.",
            "If you used to run Monroe tapes, do not jump to the deepest label to prove you still have it. The bravado is the opposite of the state. Start at the bottom of the ladder on purpose.",
          ],
        },
        {
          heading: "When to stop",
          paragraphs: [
            "Stop if you feel persistent derealization, if ordinary life starts to feel fake, if you are using sessions to avoid people or work, or if imagery turns hostile and sticky. Sit up, lights, body, food, a walk, a human voice. This is a concentration practice with a weird reputation, not an obligation to 'go deeper.' Deeper is not better. Repeatable and honest is better.",
          ],
        },
      ]
    case "gateway-tools":
      return [
        {
          paragraphs: [
            "Monroe's system is full of named objects. They look occult until you notice they are all handles for attention. You do not need to believe in energy. You need a picture that your mind will actually pick up when you are half-asleep. Pictures beat abstractions at the edge of sleep. That is why hypnotherapy and sports psychology use them too.",
            "The original Gateway scripts are copyrighted. The ideas below are the public bones, with original instructions you can run in this lab.",
          ],
        },
        {
          heading: "Focus levels, as labels not destinations",
          paragraphs: [
            "Focus 1 is ordinary waking. Focus 10 is mind awake, body asleep — the workhorse. Focus 12 is expanded awareness: more space, more associative material, questions that are not immediately answered. Focus 15 is 'no time,' a way of talking about dropping the narrative of past and future. Later numbers in the Monroe catalog point at more speculative territory. This lab trains the first cluster because you can verify it: is the body heavy, is the mind here, is attention wide, did the calendar lose its grip for a few minutes.",
            "Use the labels if they help you re-enter a state without audio. 'Pop into 10' is just a bookmark. If the numbers feel like a video game, drop them and use the session titles.",
          ],
        },
        {
          heading: "The box",
          paragraphs: [
            "Officially the Energy Conversion Box. You invent a container and park everything that would hijack the session: deadlines, a conversation, the performance of being spiritual. The box is external working memory. You are telling the planning brain it will get the files back. Paradoxically, that makes it more willing to stand down. Make the container specific. Vague 'letting go' is how the to-do list crawls back in through a side door.",
          ],
        },
        {
          heading: "The balloon",
          paragraphs: [
            "Officially the Resonant Energy Balloon, REBAL. Breath out the top of the head, wrap the body, in through the feet, sometimes spiraled. Then imagine that envelope staying. In secular language: you mark a boundary. Distraction has to cross something. In anxious language: you give the threat-detection system a job other than scanning the dark. If 'energy' makes you roll your eyes, call it a perimeter and do the breath anyway. The breath is doing real autonomic work even if the sphere is imaginary.",
          ],
        },
        {
          heading: "An affirmation that is yours",
          paragraphs: [
            "Monroe's program uses a specific three-part affirmation (what you are, what you want, whose help you accept). Do not copy it from a bootleg PDF. Write three short lines you can stand behind. Example: I am more than the mood I walked in with. I want to see one true thing about how I spend attention. I will take help from the quietest honest voice I can find. Say it once after the box, once before you stand up. Saying it is a steering wheel. It is not a spell that exempts you from doing the reading.",
          ],
        },
        {
          heading: "Afterward",
          paragraphs: [
            "Debrief while the state is still drying. Three lines are enough: body, mind, one image or phrase. If you wait an hour you will write a theory. Theories are cheap. Sensory notes compound. That is the whole Gateway attitude worth stealing: treat inner work like flight hours, not like content you consumed.",
          ],
        },
      ]
    default:
      return []
  }
}
