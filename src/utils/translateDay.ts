export function translateDay(day: "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun") {
    switch (day) {
        case "mon":
            return "seg";
        case "tue":
            return "ter";
        case "wed":
            return "qua";
        case "thu":
            return "qui";
        case "fri":
            return "sex";
        case "sat":
            return "sab";
        case "sun":
            return "dom";
        default:
            return "";
    }
}