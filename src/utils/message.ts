import { Message } from "../types/message";

const HIGH_SEVERITY_THRESHOLD = 0.7;

export const getHighSeverityCount = (messages: Message[]) => {
  return messages.filter((m) => m.attackScore > HIGH_SEVERITY_THRESHOLD).length;
};

export const getSpamCount = (messages: Message[]) => {
  return messages.filter((m) => m.attackType === "SPAM").length;
};

export const getTopDomains = (messages: Message[]) => {
  if (messages.length === 0) return;
  const domainCount = new Map<string, number>();

  messages.forEach(({ from }) => {
    const domain = from.split("@").pop();
    if (domain) {
      domainCount.set(domain, (domainCount.get(domain) ?? 0) + 1);
    }
  });

  const res: { domain: string; percentage: number; count: number }[] = [];
  for (const [key, value] of domainCount.entries()) {
    res.push({
      domain: key,
      count: value,
      percentage: Math.round(value / messages.length * 100),
    });
  }
  
  return res.sort((a, b) => b.count - a.count);
};
