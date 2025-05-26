export type User = {
  uName: string;
  pw: string
}

export type Card = {
  ausdruck: string,
  definition: string,
  weight: number
}

export type Deck = {
  name: string,
  user: string,
  cards: Card[]
}

export type AddCardFormProps = {
  onAddCard: (card: { ausdruck: string; definition: string; weight: number}, deckIndex: number) => void;
  deckIndex: number;
  decks: Deck[]
}

export type AnmeldungCompProps = {
  setAnmeldung: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthentificated: React.Dispatch<React.SetStateAction<boolean>>;
}

export type DeckModalProps = {
  setLocalDecks: React.Dispatch<React.SetStateAction<Deck[]>>;
  decks: Deck[];
  setDeckIndex: React.Dispatch<React.SetStateAction<number>>; 
  closeModal: () => void;
};

export type SetAnmeldung = {
  setAnmeldung: React.Dispatch<React.SetStateAction<boolean>>;
}

export type SetShowNav = {
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}

export type SetIsAuthentificated = {
  setIsAuthentificated: React.Dispatch<React.SetStateAction<boolean>>;
}

export type AnmeldungProps = SetShowNav & SetIsAuthentificated


export {};
