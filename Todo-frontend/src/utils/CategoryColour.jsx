const pastelPalette = [
  { bg: "bg-purple-100", text: "text-purple-700", border: "border-purple-200" },
  { bg: "bg-pink-100", text: "text-pink-700", border: "border-pink-200" },
  { bg: "bg-blue-100", text: "text-blue-700", border: "border-blue-200" },
  { bg: "bg-green-100", text: "text-green-700", border: "border-green-200" },
  { bg: "bg-yellow-100", text: "text-yellow-700", border: "border-yellow-200" },
  { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" },
  { bg: "bg-teal-100", text: "text-teal-700", border: "border-teal-200" },
  { bg: "bg-rose-100", text: "text-rose-700", border: "border-rose-200" },
];

export const getCategoryColor = (categoryId) => {
  if (!categoryId) return pastelPalette[0];

  // simple string hash so same category always maps to same color
  let hash = 0;
  for (let i = 0; i < categoryId.length; i++) {
    hash = categoryId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % pastelPalette.length;
  return pastelPalette[index];
};