const getQueriesKey = (email) => {
  if (!email) return "user_guest";
  return `user_${email.toLowerCase().trim()}`;
};

export const loadSavedQueries = (email) => {
  try {
    const key = getQueriesKey(email);
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Ошибка загрузки запросов LS:", error);
    return [];
  }
};

export const saveSavedQueries = (email, queries) => {
  try {
    const key = getQueriesKey(email);
    localStorage.setItem(key, JSON.stringify(queries));
  } catch (error) {
    console.error("Ошибка сохранения запросов LS:", error);
  }
};

export const getCurrentUserEmail = () => {
  return localStorage.getItem("userEmail");
};

export const setCurrentUserEmail = (email) => {
  if (email) localStorage.setItem("userEmail", email.toLowerCase().trim());
};
