export type BandName = "delta" | "theta" | "alpha" | "beta" | "gamma"

export type BrainwaveBand = {
  id: BandName
  label: string
  range: string
  min: number
  max: number
  felt: string
}

export const BANDS: BrainwaveBand[] = [
  {
    id: "delta",
    label: "Delta",
    range: "0.5–4 Hz",
    min: 0.5,
    max: 4,
    felt: "Deep sleep, repair, very little narrative thought",
  },
  {
    id: "theta",
    label: "Theta",
    range: "4–8 Hz",
    min: 4,
    max: 8,
    felt: "Drowsy imagery, hypnagogia, inner scenes, loose associations",
  },
  {
    id: "alpha",
    label: "Alpha",
    range: "8–13 Hz",
    min: 8,
    max: 13,
    felt: "Eyes-closed calm, idling attention, the classic meditation band",
  },
  {
    id: "beta",
    label: "Beta",
    range: "13–30 Hz",
    min: 13,
    max: 30,
    felt: "Ordinary waking focus, study, conversation, light tension",
  },
  {
    id: "gamma",
    label: "Gamma",
    range: "30+ Hz",
    min: 30,
    max: 80,
    felt: "Binding of details into a single moment of awareness",
  },
]

export function bandForHz(hz: number): BrainwaveBand {
  const match = BANDS.find((band) => hz >= band.min && hz < band.max)
  return match ?? BANDS[BANDS.length - 1]
}

export function formatHz(hz: number) {
  return hz < 10 ? hz.toFixed(1) : hz.toFixed(0)
}
