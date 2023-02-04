export type Message = {
  id: string;
  attackType: AttackType;
  attackScore: number;
  timestamp: string;
  from: string;
  to: string;
};

type AttackType = "SPAM" | "PHISHING_CREDENTIALS" | "GRAYMAIL";
