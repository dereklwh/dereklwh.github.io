import {useState, useEffect} from 'react';
  
export default function useCurrentlyReading() {
    const [book, setBook] = useState(null);

    useEffect(() => {
        async function fetchCurrentlyReading() {
            try {
                const response = await fetch(
                    "https://api.allorigins.win/raw?url=" +
                      encodeURIComponent("https://www.goodreads.com/review/list_rss/182676242-derek?shelf=currently-reading")
                );
                const text = await response.text();
                const parser = new DOMParser();
                const xml = parser.parseFromString(text, "application/xml");
                const item = xml.querySelector("item");

                if (item) {
                    const title = item.querySelector("title").textContent;
                    const link = item.querySelector("link").textContent;
                    const image = item.querySelector("book_small_image_url").textContent;
                    const author = item.querySelector("author_name").textContent;
                    console.log({ title, link, image, author });

                    setBook({ title, link, image, author });
                }
                
            }
            catch (error) {
                console.error("Error fetching currently reading book:", error);
            }
        }
        fetchCurrentlyReading();
    }, []);

    return book || null;
}