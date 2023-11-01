import * as _ from "lodash";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import User from "../components/user";

export default function SearchBar() {
    const [searchResults, setSearchResults] = useState([]);
    // first value must be true, cause if we click, then the result showing up
    const [visible, setVisible] = useState(true);

    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (ev: MouseEvent) => {
            // @ts-ignore
            if(ref.current && !ref.current.contains(ev.target)) {
                setVisible(false);
            }
        }

        document.addEventListener("click", handleClickOutside);

        // here the clean up function
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }

    })

    const debouncedFetchSearchResults =_.debounce(fetchSearchResults, 500);

    async function fetchSearchResults(searchText: string) {
        const res = await fetch("/api/search?q=" + searchText);
        if(res.ok) {
            const json = await res.json();
            console.log(json);
            // here, we kembalikan visible nya ke true, seperti nilai awalnya
            setVisible(true);
            setSearchResults(json.data);
        } else {
            // iya after you click, then back value to false
            setSearchResults([]);
            setVisible(false);
        }
    }

    function handleUbah(eve: ChangeEvent<HTMLInputElement>) {
        console.log("berubah"), eve.target.value; //iki gawe nyoba
        debouncedFetchSearchResults(eve.target.value);
    }

    function handleTekan(eve: React.MouseEvent<HTMLInputElement>) {
        setVisible(true);
    }

    return (
        <div className="flex flex-row max-w-xl w-full justify-end relative" ref={ref}>
            <input 
                onChange={handleUbah}
                onClick={handleTekan}
                type="text" 
                className="p-2 rounded-lg bg-gray-700 my-2 max-w-xs"
                placeholder="Search"
            />
            {/* jadi apabila visible nya true dan searchresult nya ketemu jalan kan bawah ini */}
            {visible && searchResults.length > 0 && (
                <ul className="flex flex-col bg-gray-700 absolute p-2 rounded-lg top-14 w-full max-w-sm right-2">
                {searchResults.map((res: UInterface) => {
                    return (
                        
                        <li 
                            key={res.id} 
                            className="my-3"
                            onClick={() => setVisible(false)}
                        >
                            <User user={res} />
                        </li>
                    );
                })}
            </ul>
            )}
        </div>
    );
}