import {
  type ReactNode,
  type Ref,
  type InputHTMLAttributes,
  type ChangeEvent,
  forwardRef,
  useState,
  useRef,
  useEffect,
  RefAttributes,
} from "react";
import styles from "./autocomplete.module.css";
import { useDebounce } from "../../hooks/useDebounce";

function highlightMatch(text: string, query: string) {
  const parts = text.split(new RegExp(`(${query})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span style={{ color: "red" }} key={index}>
        {part}
      </span>
    ) : (
      part
    )
  );
}

function fixedForwardRef<T, P = object>(
  render: (props: P, ref: Ref<T>) => ReactNode
): (props: P & RefAttributes<T>) => ReactNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return forwardRef(render) as any;
}

export interface Props<T> extends InputHTMLAttributes<HTMLInputElement> {
  fetchSuggestions: (term: string) => Promise<T[]>;
  getValue: (item: T) => string;
  onItemSelect?: (value: T) => void;
  label?: string;
  minCharsToSearch?: number;
}

export const Autocomplete = fixedForwardRef(
  <T,>(
    {
      fetchSuggestions,
      label,
      getValue,
      onChange,
      onItemSelect,
      minCharsToSearch = 2,
      ...inputProps
    }: Props<T>,
    ref: Ref<HTMLInputElement>
  ) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState<T[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleDebounceSearch = useDebounce(async (term: string) => {
      if (term.trim().length > minCharsToSearch) {
        try {
          const data = await fetchSuggestions(term);
          setSuggestions(data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setSuggestions([]);
      }
    }, 500);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchTerm(value);
      onChange?.(event);

      // Debounce the search callback
      handleDebounceSearch(value);
    };
    const handleSelect = (suggestion: T) => {
      setSearchTerm(getValue(suggestion));
      setShowSuggestions(false);
      setSuggestions([]);
      onItemSelect?.(suggestion);
    };

    useEffect(() => {
      const clickHandler = (e: MouseEvent) => {
        if (e.target && !menuRef.current?.contains(e.target as Node)) {
          setShowSuggestions(false);
        }
      };
      window.addEventListener("click", clickHandler);
      return () => window.removeEventListener("click", clickHandler);
    }, []);

    return (
      <div className={styles.container} ref={menuRef}>
        <div className={styles.inputContainer}>
          <label htmlFor="#autocompleteInput">{label}</label>
          <input
            id="autocompleteInput"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            onFocus={() => {
              handleDebounceSearch(searchTerm);
              setShowSuggestions(true);
            }}
            {...inputProps}
            ref={ref}
          />
        </div>
        <div className={styles.options}>
          {showSuggestions &&
            suggestions.map((suggestion) => (
              <div
                className={styles.option}
                key={getValue(suggestion)}
                onClick={() => {
                  handleSelect(suggestion);
                }}
              >
                {highlightMatch(getValue(suggestion), `${searchTerm}`)}
              </div>
            ))}
        </div>
      </div>
    );
  }
);

//TODO add virtual scroll to prevent rendering of large list of suggestions
//TODO work on accesability
//TODO improve highlightMatch to find matches in nodes also
