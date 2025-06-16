import { z } from "zod/v4";

export const userSchema = z.object({
  name: z.string().min(4).max(16),
  password: z.string().length(64)
})
export type User = z.infer<typeof userSchema>

export const cardSchema = z.object({
  term: z.string(),
  definition: z.string(),
  weight: z.uint32().min(1)
})
export type Card = z.infer<typeof cardSchema>

export const deckSchema = z.object({
  name: z.string().min(1).max(32),
  user: userSchema.shape.name,
  cards: z.array(cardSchema)
})

export type Deck = z.infer<typeof deckSchema>

export type AddCardFormProps = {
  onAddCard: (card: { term: string; definition: string; weight: number}, deckIndex: number) => void;
  deckIndex: number;
  decks: Deck[];
}

export type LoginCompProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthentificated: React.Dispatch<React.SetStateAction<boolean>>;
}

export type DeckModalProps = {
  setLocalDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
  decks: Deck[];
  setDeckIndex: React.Dispatch<React.SetStateAction<number>>; 
  closeModal: () => void;
};

export type SetLogin = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export type SetShowNav = {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export type SetIsAuthentificated = {
  setIsAuthentificated: React.Dispatch<React.SetStateAction<boolean>>;
}

export type LoginProps = SetShowNav & SetIsAuthentificated


export {};
