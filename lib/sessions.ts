export type SessionPhase = {
  at: number
  duration: number
  title: string
  cue: string
  beatHz: number
  carrierHz: number
}

export type PracticeSession = {
  id: string
  title: string
  kicker: string
  summary: string
  durationSec: number
  difficulty: "start here" | "core" | "deeper" | "day" | "night"
  analog: string
  recommendedAfter?: string
  defaultNoise: number
  defaultVolume: number
  phases: SessionPhase[]
}

function withPhases(
  meta: Omit<PracticeSession, "phases" | "durationSec">,
  phases: Omit<SessionPhase, "at">[]
): PracticeSession {
  let cursor = 0
  const stamped: SessionPhase[] = phases.map((phase) => {
    const next = { ...phase, at: cursor }
    cursor += phase.duration
    return next
  })
  return { ...meta, phases: stamped, durationSec: cursor }
}

export const SESSIONS: PracticeSession[] = [
  withPhases(
    {
      id: "first-contact",
      title: "First contact",
      kicker: "Learn the sound",
      summary:
        "Eight minutes to confirm headphones, meet the beat, and practice doing almost nothing on purpose.",
      difficulty: "start here",
      analog: "Orientation / early Hemi-Sync",
      defaultNoise: 0.035,
      defaultVolume: 0.09,
    },
    [
      {
        duration: 50,
        title: "Headphones",
        cue: "Stereo headphones on. Lie down or sit so your neck is easy. Volume low enough that the tone is a presence, not a drill. You should hear a slightly different pitch in each ear.",
        beatHz: 10,
        carrierHz: 200,
      },
      {
        duration: 55,
        title: "The wobble",
        cue: "The shimmer between the two tones is the beat. You do not have to make it happen. Your brainstem is already comparing left and right. Rest attention in the middle of your head, as if the sound has a center line.",
        beatHz: 10,
        carrierHz: 200,
      },
      {
        duration: 70,
        title: "Set the day down",
        cue: "Picture a box, a drawer, a bag — any container that feels yours. Place the next few hours in it: messages, grades, the thing you should have said. Close it. You can pick it up when this is over.",
        beatHz: 10,
        carrierHz: 200,
      },
      {
        duration: 80,
        title: "Breath as a metronome",
        cue: "Inhale for four beats of the wobble, exhale for six. If you lose the count, start again without commentary. The point is not perfect counting. It is having somewhere to put your mind besides rumination.",
        beatHz: 10,
        carrierHz: 200,
      },
      {
        duration: 110,
        title: "Heavy and present",
        cue: "Let the body get heavier than it is. Jaw unhooked. Tongue resting. Hands unheld. Keep a thin thread of awareness: you are the one noticing the heaviness. Mind awake, body willing to sleep.",
        beatHz: 10,
        carrierHz: 200,
      },
      {
        duration: 70,
        title: "Return",
        cue: "Wiggle fingers and toes. Name one thing you can hear that is not the tone. Sit up slowly. One sentence in the journal later: what the beat felt like. That is enough for a first pass.",
        beatHz: 10,
        carrierHz: 200,
      },
    ]
  ),
  withPhases(
    {
      id: "still-body",
      title: "Still body",
      kicker: "Mind awake, body asleep",
      summary:
        "The core Gateway skill: drop the body into sleep-depth while keeping a clear, watching mind. Repeat this until it is familiar.",
      difficulty: "core",
      analog: "Focus 10",
      recommendedAfter: "first-contact",
      defaultNoise: 0.04,
      defaultVolume: 0.085,
    },
    [
      {
        duration: 70,
        title: "Arrive",
        cue: "Same setup every time: dark enough, warm enough, phones face down. Headphones on. You are training a state, not chasing a vision. If images come, let them pass like weather.",
        beatHz: 10,
        carrierHz: 196,
      },
      {
        duration: 80,
        title: "The box",
        cue: "Gateway called this the Energy Conversion Box. Invent yours in detail — latch, weight, smell of the wood or metal. Put in the unfinished loops. Put in the identity of being someone who should be productive right now.",
        beatHz: 10,
        carrierHz: 196,
      },
      {
        duration: 90,
        title: "Feet and legs",
        cue: "Move attention into the feet. Not stretching — noticing. Let calves, knees, thighs go off-duty. If a limb twitches, that is the body negotiating with stillness. Allow it.",
        beatHz: 10,
        carrierHz: 196,
      },
      {
        duration: 90,
        title: "Torso",
        cue: "Belly soft. Ribs not braced. The breath can be small. Heartbeat may get loud. That is not a problem. You are not trying to feel special. You are trying to stop managing the body.",
        beatHz: 10,
        carrierHz: 196,
      },
      {
        duration: 80,
        title: "Hands, jaw, eyes",
        cue: "Hands empty. Tiny space between the teeth. Eyes resting in their sockets, gaze not aimed at the inside of the lids. Forehead uninvolved. The face is often the last to clock out.",
        beatHz: 10,
        carrierHz: 196,
      },
      {
        duration: 130,
        title: "The line of awareness",
        cue: "Body like a coat on a chair. Keep a bright, quiet point of knowing: I am here. If you drift toward actual sleep, tighten that point — a silent count of the beat, or the feeling of air at the nostrils.",
        beatHz: 10,
        carrierHz: 196,
      },
      {
        duration: 100,
        title: "The field",
        cue: "Gateway's Resonant Energy Balloon is a simple picture: on the exhale, energy leaves the crown, wraps you, returns through the feet. Do it for a few breaths. You are marking the space you are practicing in, not building a force field.",
        beatHz: 10,
        carrierHz: 196,
      },
      {
        duration: 160,
        title: "Stay",
        cue: "No project now. No self-improvement speech. Sit inside the beat. If a plan appears, put it in the box. If boredom appears, that is the mind asking for a task. Decline.",
        beatHz: 10,
        carrierHz: 196,
      },
      {
        duration: 70,
        title: "Tag the state",
        cue: "Silently name this Still Body, or Focus 10 if that label helps you. You are leaving a breadcrumb so you can find it without the recording later — on a bus, in a library, at 1 a.m.",
        beatHz: 10,
        carrierHz: 196,
      },
      {
        duration: 70,
        title: "Come back",
        cue: "Count up. Breathe bigger. Move the mouth. Sit before you stand. Write what the body felt like in one physical word: dense, fizzy, far, warm, gone.",
        beatHz: 10,
        carrierHz: 196,
      },
    ]
  ),
  withPhases(
    {
      id: "wide-field",
      title: "Wide field",
      kicker: "Attention larger than the body",
      summary:
        "After Still Body is easy, let awareness get spacious. This is the Gateway idea of expanded awareness, trained without a cosmic sales pitch.",
      difficulty: "deeper",
      analog: "Focus 12",
      recommendedAfter: "still-body",
      defaultNoise: 0.03,
      defaultVolume: 0.08,
    },
    [
      {
        duration: 80,
        title: "Enter still body",
        cue: "Skip the essay. Box, heaviness, thin thread of mind. You already know this door. Walk through it.",
        beatHz: 10,
        carrierHz: 180,
      },
      {
        duration: 90,
        title: "Soften the edges",
        cue: "Without moving, notice the space an inch off the skin. Then a foot. Then the room. Attention can be wide without being sloppy. You are still here. The frame just got larger.",
        beatHz: 8,
        carrierHz: 180,
      },
      {
        duration: 100,
        title: "Questions, not answers",
        cue: "Hold one honest question in the wide space — not a wish, a question. What am I avoiding. What actually matters this month. What would I do if I were less afraid of looking foolish. Do not answer yet.",
        beatHz: 7,
        carrierHz: 176,
      },
      {
        duration: 140,
        title: "Receive",
        cue: "Let images, phrases, or nothing at all arrive. Nothing is a valid result. If something shows up, do not decorate it. Watch it the way you would watch a sentence appear on a page you did not write.",
        beatHz: 6,
        carrierHz: 172,
      },
      {
        duration: 120,
        title: "One clean takeaway",
        cue: "If a useful thought is here, shrink it to one line you could text yourself. If not, the takeaway is: I can sit in uncertainty without turning it into a story. That is a skill.",
        beatHz: 7,
        carrierHz: 176,
      },
      {
        duration: 90,
        title: "Narrow back",
        cue: "Return to the body outline. Hands. Mouth. Room. The beat. You are practicing the difference between wide and ordinary, so ordinary life does not swallow the whole day.",
        beatHz: 10,
        carrierHz: 180,
      },
      {
        duration: 70,
        title: "Close",
        cue: "Sit up. Write the one line, even if it feels small. Small and true beats large and theatrical.",
        beatHz: 10,
        carrierHz: 180,
      },
    ]
  ),
  withPhases(
    {
      id: "no-clock",
      title: "No clock",
      kicker: "Drop the story of time",
      summary:
        "A slower theta practice for when Still Body is stable. Useful against the student habit of living only in deadlines.",
      difficulty: "deeper",
      analog: "Focus 15",
      recommendedAfter: "wide-field",
      defaultNoise: 0.045,
      defaultVolume: 0.075,
    },
    [
      {
        duration: 90,
        title: "Still, then slower",
        cue: "Box. Heavy body. Clear mind. You already trained this. Let the beat get sleepier without you following it into unconsciousness.",
        beatHz: 8,
        carrierHz: 160,
      },
      {
        duration: 100,
        title: "Unhook the schedule",
        cue: "Picture the calendar as an object — a grid you can set on the floor beside you. You will pick it up later. For these minutes, nothing is due. Including becoming a better person.",
        beatHz: 6,
        carrierHz: 156,
      },
      {
        duration: 150,
        title: "Being without a plot",
        cue: "No future self. No origin story. Notice that experience is still happening: sound, warmth, breath. Time was a narrative you were running. You can pause it.",
        beatHz: 5,
        carrierHz: 152,
      },
      {
        duration: 140,
        title: "Stay empty on purpose",
        cue: "If you start planning your life from this quiet, smile at the reflex and return to the beat. Insight that needs to survive will still be there when you sit up.",
        beatHz: 5,
        carrierHz: 152,
      },
      {
        duration: 90,
        title: "Re-enter the clock",
        cue: "Name today's actual date in your mind. Feel the weight of the body in the room you are in. Pick the calendar back up. One next action, not ten.",
        beatHz: 8,
        carrierHz: 160,
      },
      {
        duration: 70,
        title: "Close",
        cue: "Move slowly. Drink water. If you feel spacey, look at a nearby object and describe three details out loud.",
        beatHz: 10,
        carrierHz: 168,
      },
    ]
  ),
  withPhases(
    {
      id: "study-lock",
      title: "Study lock",
      kicker: "Eyes-open coherence",
      summary:
        "A working-state session. Use it at a desk, not in bed. The beat is a fence around attention while you read or write.",
      difficulty: "day",
      analog: "Low beta / sensory-motor rhythm",
      recommendedAfter: "first-contact",
      defaultNoise: 0.02,
      defaultVolume: 0.07,
    },
    [
      {
        duration: 40,
        title: "Desk, not bed",
        cue: "Sit upright. One tab. One task written on paper in a single sentence. Headphones on. This is not for falling inward. This is for staying with a page.",
        beatHz: 14,
        carrierHz: 220,
      },
      {
        duration: 50,
        title: "Body as furniture",
        cue: "Feet on the floor. Shoulders not performing. Jaw easy. You want enough relaxation that fidgeting dies, and enough tone that you do not slump into a nap.",
        beatHz: 14,
        carrierHz: 220,
      },
      {
        duration: 70,
        title: "Name the task",
        cue: "Repeat the one sentence. Then begin. If you notice you are on a second tab, that noticing is the practice. Come back without a lecture.",
        beatHz: 16,
        carrierHz: 220,
      },
      {
        duration: 420,
        title: "Work inside the fence",
        cue: "Keep going. The beat is a perimeter. Thoughts can stand outside it. You do not have to finish the whole assignment in this block. You have to stay in contact with it.",
        beatHz: 18,
        carrierHz: 224,
      },
      {
        duration: 80,
        title: "Seal the block",
        cue: "Write the next starting line for later — a page number, a heading, a problem number. Close the laptop if you can. Stand. The session worked if you returned more than you wandered, not if you felt cinematic.",
        beatHz: 14,
        carrierHz: 220,
      },
    ]
  ),
  withPhases(
    {
      id: "sleep-slope",
      title: "Sleep slope",
      kicker: "Descend, don't study",
      summary:
        "A one-way session. Use it only when you can sleep afterward. The beat walks from alpha into delta. No journaling required.",
      difficulty: "night",
      analog: "Focus 10 into delta",
      recommendedAfter: "still-body",
      defaultNoise: 0.055,
      defaultVolume: 0.07,
    },
    [
      {
        duration: 80,
        title: "Lights down",
        cue: "This is not a lucid-work session. Phone on the other side of the room if you can. Cool, dark, same pillow as always. If you need to be sharp in twenty minutes, pick a different track.",
        beatHz: 10,
        carrierHz: 180,
      },
      {
        duration: 100,
        title: "Drop the day",
        cue: "Box, then forget the box. You are not solving anything. Unfinished work can exist without you holding it in your hands all night.",
        beatHz: 8,
        carrierHz: 170,
      },
      {
        duration: 140,
        title: "Heavier",
        cue: "Each exhale is permission to be less involved. If a thought replays, imagine it spoken from farther away. Do not analyze why it came.",
        beatHz: 6,
        carrierHz: 160,
      },
      {
        duration: 180,
        title: "Imagery allowed",
        cue: "Hypnagogic pictures are normal here — faces, places, nonsense geometry. You do not need to steer. If you surface, let the next exhale take you down again.",
        beatHz: 4,
        carrierHz: 150,
      },
      {
        duration: 220,
        title: "Let go of the practice",
        cue: "Stop being a student of this. Stop being someone trying to sleep. The tones can fade into the room. You are allowed to not finish the session.",
        beatHz: 2.5,
        carrierHz: 140,
      },
      {
        duration: 180,
        title: "Stay down",
        cue: "If you are still tracking these words, ignore them. There is nothing left to do.",
        beatHz: 2,
        carrierHz: 130,
      },
    ]
  ),
]

export function getSession(id: string) {
  return SESSIONS.find((session) => session.id === id)
}

export function getPhaseAt(session: PracticeSession, elapsed: number) {
  for (let i = session.phases.length - 1; i >= 0; i -= 1) {
    if (elapsed >= session.phases[i].at) return session.phases[i]
  }
  return session.phases[0]
}

export function formatDuration(totalSec: number) {
  const minutes = Math.round(totalSec / 60)
  return `${minutes} min`
}

export function formatClock(totalSec: number) {
  const clamped = Math.max(0, Math.floor(totalSec))
  const minutes = Math.floor(clamped / 60)
  const seconds = clamped % 60
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}
