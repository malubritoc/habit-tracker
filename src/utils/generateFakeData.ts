export function generateFakeProgressData(
  type: "monthly" | "weekly" | "general"
) {
  const arrayLength = type === "monthly" ? 4 : type === "weekly" ? 7 : 12;
  const data = Array.from({ length: arrayLength }, (_, idx) => {
    const date = new Date();
    date.setDate(date.getDate() - idx);

    const defaultValue = Math.floor(Math.random() * 100);

    const label =
      type === "weekly"
        ? date.toLocaleDateString("pt-BR")
        : `Semana ${idx + 1}`;

    return {
      date: label,
      completed: defaultValue,
      remaining: 100 - defaultValue,
    };
  });

  return data;
}
