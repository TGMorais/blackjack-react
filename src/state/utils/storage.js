const gameKey = "game-state";

export const saveGame = state => {
  localStorage.setItem(gameKey, JSON.stringify(state));
};

export const loadGame = () => {
  const v = localStorage.getItem(gameKey);
  if (!v) return null;
  try {
    return JSON.parse(v);
  } catch (e) {
    return null;
  }
};
