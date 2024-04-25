import "./App.css";
import { Autocomplete } from "./components/Autocomplete/Autocomplete";

interface Suggestion {
  word: string;
  score: number;
}

const App = () => {
  const getWords = async (term: string): Promise<Suggestion[]> => {
    const apiUrl = `https://api.datamuse.com/sug?k=demo&v=enwiki&s=${term}`;
    const response = await fetch(apiUrl);
    return await response.json();
  };

  return (
    <>
      <p>Start typing to see words</p>
      <Autocomplete
        getValue={(item) => item.word}
        fetchSuggestions={getWords}
        label="Autocomplete"
      />
    </>
  );
};

export default App;
