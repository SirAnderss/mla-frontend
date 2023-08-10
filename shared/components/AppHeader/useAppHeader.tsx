import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAppHeader() {
  const [query, setQuery] = useState('');
  const { push } = useRouter();

  const searchItems = (searchQuery: string) => {
    push(`/items?q=${searchQuery}`);
  };

  const handleClickQuery = () => {
    searchItems(query);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchItems(query);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    setQuery(params.get('q') ?? '');

    return () => {
      setQuery('');
    };
  }, []);

  return { query, setQuery, handleClickQuery, handleKeyPress };
}
