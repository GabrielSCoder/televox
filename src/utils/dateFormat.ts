import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    const formatted = date.toLocaleString("pt-BR", { month: "long", year: "numeric" });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const formatPostDate = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, "h:mm a · MMM d, yyyy", { locale: enUS });
};