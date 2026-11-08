// The prompt-free vocabulary (RAM++ tag set, 4,585 tags) includes scene,
// style, time-of-day, colour and verb tags as well as things. Those aren't
// separable objects — their masks are usually "most of the photo" — so skip
// them. Every entry here exists in the vocabulary (checked against
// public/models/yoloe-pf-labels.json).
export const IGNORE_TAGS: string[] = [
  // scene / setting
  "outdoor", "indoor", "nature", "scenery", "landscape", "countryside", "rural", "urban", "city", "scene",
  // light & time
  "night", "sunny", "daylight", "sunshine", "shadow", "morning", "evening", "sunrise", "sunset",
  "summer", "spring", "autumn", "winter",
  // colour & look
  "green", "white", "black", "red", "blue", "yellow", "brown", "color", "bright", "pattern", "texture", "wallpaper",
  // photo style
  "image", "photo", "picture", "close-up", "selfie", "portrait",
  // verbs
  "stand", "sit", "walk", "grow", "hang", "lay", "lie", "play", "pose", "smile", "remove",
];
