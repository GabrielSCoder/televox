export const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const formatted = date.toLocaleString("pt-BR", { month: "long", year: "numeric" });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};