import classNames from "classnames";
import {
  ChangeEvent,
  FC,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import useClickOutSide from "../../hooks/useClickOutSide";
import { useDebounce } from "../../hooks/useDebounce";
import { Icon } from "../Icon/icon";
import Input, { InputProps } from "../Input/input";

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, renderOption, onSelect, value, ...restProps } =
    props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [hightlightIndex, setHeightlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(inputValue, 500);
  useClickOutSide(componentRef, () => {
    setSuggestions([]);
  });

  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
    setHeightlightIndex(-1);
  }, [debouncedValue]);

  const hightlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) index = suggestions.length - 1;
    setHeightlightIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        suggestions[hightlightIndex] &&
          handleSelect(suggestions[hightlightIndex]);
        break;
      case 38:
        hightlight(hightlightIndex - 1);
        break;
      case 40:
        hightlight(hightlightIndex + 1);
        break;
      case 27:
        setSuggestions([]);
        break;
      default:
        break;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
      triggerSearch.current = false;
    }
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const cnames = classNames("is-active", {
            "item-highted": index === hightlightIndex,
          });
          return (
            <li
              key={index}
              className={cnames}
              onClick={() => handleSelect(item)}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && <Icon icon="spinner" spin />}
      {suggestions.length > 0 && generateDropdown()}
    </div>
  );
};
