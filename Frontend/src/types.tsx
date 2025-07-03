export type User = {
  name: string;
  password: string
}

export type Card = {
  term: string,
  definition: string,
  weight: number
}

export type Deck = {
  name: string,
  user: string,
  cards: Card[]
}

export type AddCardFormProps = {
  onAddCard: (card: { term: string; definition: string; weight: number}, deckIndex: number) => void;
  deckIndex: number;
  decks: Deck[]
}

export type LoginCompProps = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthentificated: React.Dispatch<React.SetStateAction<boolean>>;
}

export type DeckModalProps = {
  setDeckIndex: React.Dispatch<React.SetStateAction<number>>; 
  closeModal: () => void;
  reloadDecks: () => Promise<void>;
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
