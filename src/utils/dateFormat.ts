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

export const formatDateTime = (dataString: string) => {
    const now = new Date();
    const postDate = new Date(dataString);
    const diffMs = now.getTime() - postDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffMinutes < 60) {
        return `${diffMinutes}min atrás`;
    }

    if (diffHours < 24) {
        return `${diffHours}h atrás`;
    }

    return postDate.toLocaleDateString("pt-BR", { day: "numeric", month: "short" });
};