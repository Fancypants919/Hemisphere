# Hemisphere

A personal practice lab for **Hemi-Sync–style hemisphere synchronization**.

If you used to lie down with Monroe-style tapes — or you fell into the CIA *Gateway Process* memo online — this is a small, honest way to learn that craft and actually do it. The browser generates binaural beats. Short essays cover what the 1983 paper said, what the audio is doing, and what current evidence supports. Guided sessions are original writing, not Monroe Institute scripts.

This project is **not** affiliated with the Monroe Institute, **not** medical care, and **not** a claim that you will leave your body.

## What you can do here

- **Learn** — six essays: the short version, how binaural beats work, the CIA paper, the science, a keepable protocol, and the Gateway tools (box, balloon, focus labels) treated as attention techniques.
- **Practice** — six sessions: First Contact, Still Body (Focus 10 analogue), Wide Field (Focus 12), No Clock (Focus 15), Study Lock, Sleep Slope.
- **Lab** — mix carrier pitch, beat frequency, noise bed, and duration yourself.
- **Progress** — session history, attention ratings, streak and minute charts, kept on this device. Download a JSON backup to take it with you. No account.

Stereo **headphones are required**. Speakers mix left and right in the air and cancel the trick.

## Run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43217](http://127.0.0.1:43217).

```bash
npm run build
npm start
```

## How to use it (first week)

1. Put on stereo headphones and run the stereo check on the home page (left beep, then right).
2. Read *The short version*.
3. Do **First Contact** twice.
4. Repeat **Still Body** until the “mind awake, body asleep” split is familiar.
5. Use **Study Lock** at a desk on a real assignment; use **Sleep Slope** only when you can sleep after.

Write three lines after sessions: body, mind, one image. Unwritten states get rewritten by your usual personality.

## Safety

- Do not use while driving, cycling, or walking in traffic.
- Keep volume low. Sine tones are sharper than music.
- If you have a seizure disorder, ask a clinician before using rhythmic audio, or skip it.
- Stop if you feel panicked, persistently unreal, or like you are using sessions to avoid life. Lights on, stand up, name three objects in the room.
- This is not a treatment for anxiety, insomnia, ADHD, or anything else.

## Stack

Next.js, TypeScript, Tailwind CSS, shadcn/ui. Audio is Web Audio API only — no accounts and no server-side personal data. History lives in the browser; export a backup from Progress.
