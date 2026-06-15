/**
 * useContent.js — all data hooks for the portfolio.
 *
 * Data is read from src/data/portfolio.js (static file, no backend).
 * The return shape { data, isLoading } is preserved so no component
 * changes are needed.
 *
 * useSendMessage posts directly to the Netlify serverless function.
 */
import { useState } from "react";
import { portfolioData } from "../data/portfolio.js";

export const useProfile = () => ({ data: portfolioData.profile });
export const useProjects = () => ({
    data: portfolioData.projects,
    isLoading: false,
});
export const useSkills = () => ({
    data: portfolioData.skills,
    isLoading: false,
});
export const useExperience = () => ({
    data: portfolioData.experience,
    isLoading: false,
});
export const useAchievements = () => ({
    data: portfolioData.achievements,
    isLoading: false,
});

export function useSendMessage() {
    const [isPending, setIsPending] = useState(false);

    const mutateAsync = async (data) => {
        setIsPending(true);
        try {
            const res = await fetch("/.netlify/functions/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data }),
            });
            const result = await res.json();
            if (!res.ok)
                throw new Error(result.error || "Failed to send email");
            return result;
        } finally {
            setIsPending(false);
        }
    };

    return { mutateAsync, isPending };
}
