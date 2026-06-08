import "./style.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

type SearchBarProps = {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

function SearchBar({ value, placeholder, onChange }: SearchBarProps) {
  return (
    <div className="searchbar">
      <SearchOutlinedIcon sx={{ fontSize: 18 }} />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
