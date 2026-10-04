import { jwtDecode } from 'jwt-decode';

const GENRE_NAMES = [
  'Action',
  'Comedy',
  'Drama',
  'Horror',
  'Suspense',
  'Thriller',
  'Science Fiction',
  'Fantasy',
  'Romance',
  'Family',
  'Documentary',
];

const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

const normalize = (t = '') => t.toLocaleLowerCase().trim();

// "a nightmare on elm street part 2: freddy's revenge" -> "a nightmare on elm street"
const stripSequel = (t) =>
  t
    .replace(/\s*(?::|\s-\s|\s–\s).*$/, '') // drop subtitle after ":" or " - "
    .replace(
      /\s+(?:(?:part|chapter|vol\.?|volume)\s+)?(?:\d+|ii|iii|iv|v|vi|vii|viii|ix)$/,
      '',
    ) // trailing sequel number
    .replace(/[\s:\-–,]+$/, '');

// Works with a plain year (1984) or a full date string ("1984-11-09")
const dateValue = (v) =>
  /^\d{1,4}$/.test(String(v)) ? Number(v) : Date.parse(v);

export const shuffleArray = (arr) => {
  const safeArr = arr ?? [];
  const shuffled = [...safeArr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (e) {}
};

export const objectMatch = (obj1, obj2) => {
  const sortedKeys1 = Object.keys(obj1).sort();
  const sortedKeys2 = Object.keys(obj2).sort();

  if (sortedKeys1.length !== sortedKeys2.length) {
    return false;
  }

  for (let i = 0; i < sortedKeys1.length; i++) {
    const key1 = sortedKeys1[i];
    const key2 = sortedKeys2[i];

    if (key1 !== key2) {
      return false;
    }

    const val1 = obj1[key1];
    const val2 = obj2[key2];

    if (val1 && typeof val1 === 'object' && val2 && typeof val2 === 'object') {
      if (!objectMatch(val1, val2)) {
        return false;
      }
    } else if (val1 !== val2) {
      return false;
    }
  }

  return true;
};

export const getEmbedUrl = (youtubeUrl) => {
  const match = youtubeUrl?.match(/(?:v=|youtu\.be\/)([^&]+)/);
  const videoId = match ? match[1] : null;

  if (!videoId) return null;

  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1', // required by browsers for autoplay to work
    controls: '0', // hides YouTube's control bar
    modestbranding: '0',
    loop: '1',
    playlist: videoId, // required for loop to work on a single video
    playsinline: '1',
    rel: '0', // don't show related videos at the end
    cc_load_policy: '0', // don't auto-load captions/subtitles
    iv_load_policy: '3', // don't show video annotations
  });

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
};

export const buildGenreLists = (movies) => {
  const safeMovies = movies ?? [];
  const lists = [];
  GENRE_NAMES.forEach((genre) => {
    lists.push({
      name: genre,
      movies: shuffleArray(
        safeMovies.filter((movie) => movie.genre?.includes(genre)),
      ),
    });
  });
  return lists;
};

export const sortByTitle = (array) => {
  return [...array].sort((a, b) => a.title.localeCompare(b.title));
};

export const sortByTitleAndSeries = (
  items,
  { titleKey = 'title', dateKey = 'year' } = {},
) => {
  const existing = new Set(items.map((i) => normalize(i[titleKey])));

  // Group under the stripped title only if that base title is actually in the list
  const keyOf = (item) => {
    const full = normalize(item[titleKey]);
    const base = stripSequel(full);
    return base !== full && existing.has(base) ? base : full;
  };

  return items
    .map((item) => ({ item, key: keyOf(item) }))
    .sort(
      (a, b) =>
        collator.compare(a.key, b.key) ||
        dateValue(a.item[dateKey]) - dateValue(b.item[dateKey]) ||
        collator.compare(a.item[titleKey], b.item[titleKey]),
    )
    .map(({ item }) => item);
};
