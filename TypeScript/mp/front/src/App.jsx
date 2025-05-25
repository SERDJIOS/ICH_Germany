import { useState, createContext, useMemo } from 'react';
import DashboardPage from './dashBoard.tsx';
import MessagingPage from './MessagingPage.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Button, Box, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageIcon from '@mui/icons-material/Language';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Create contexts for theme and language
export const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const LanguageContext = createContext({ 
  language: 'ru', 
  setLanguage: () => {},
  translations: {}
});

// Translations
const translations = {
  ru: {
    welcome: 'Добро пожаловать',
    createPost: 'Создать новый пост',
    title: 'Заголовок',
    content: 'О чем вы думаете?',
    publish: 'Опубликовать',
    addMedia: 'Добавить медиа',
    hideMedia: 'Скрыть медиа',
    imageLink: 'Ссылка на изображение',
    youtubeLink: 'Ссылка на YouTube',
    findVideo: 'Найти видео',
    addGif: 'Добавить GIF',
    deleteGif: 'Удалить GIF',
    searchPosts: 'Поиск по постам...',
    find: 'Найти',
    search: 'Поиск',
    videoSearch: 'Поиск видео на YouTube',
    searchVideo: 'Введите запрос для поиска видео...',
    close: 'Закрыть',
    searchGif: 'Поиск GIF',
    gifSearch: 'Поиск GIF',
    cancel: 'Отмена',
    feed: 'Лента постов',
    noPosts: 'Пока нет ни одного поста. Создайте первый!',
    noResults: 'По запросу "{searchTerm}" ничего не найдено',
    delete: 'Удалить',
    login: 'Войти',
    logout: 'Выйти',
    loginRequired: 'Войдите, чтобы создавать посты',
    email: 'Email',
    password: 'Пароль',
    confirmDelete: 'Подтверждение удаления',
    confirmDeleteMessage: 'Вы уверены, что хотите удалить этот пост? Это действие нельзя отменить.',
    searchResults: 'Результаты поиска "{searchTerm}"',
    found: 'Найдено: {count}',
    switchUser: 'Сменить пользователя'
  },
  en: {
    welcome: 'Welcome',
    createPost: 'Create new post',
    title: 'Title',
    content: 'What are you thinking about?',
    publish: 'Publish',
    addMedia: 'Add media',
    hideMedia: 'Hide media',
    imageLink: 'Image URL',
    youtubeLink: 'YouTube URL',
    findVideo: 'Find video',
    addGif: 'Add GIF',
    deleteGif: 'Delete GIF',
    searchPosts: 'Search posts...',
    find: 'Find',
    search: 'Search',
    videoSearch: 'Search videos on YouTube',
    searchVideo: 'Enter search query for videos...',
    close: 'Close',
    searchGif: 'Search GIF',
    gifSearch: 'Search GIF',
    cancel: 'Cancel',
    feed: 'Posts feed',
    noPosts: 'No posts yet. Create the first one!',
    noResults: 'No results found for "{searchTerm}"',
    delete: 'Delete',
    login: 'Login',
    logout: 'Logout',
    loginRequired: 'Login to create posts',
    email: 'Email',
    password: 'Password',
    confirmDelete: 'Confirm deletion',
    confirmDeleteMessage: 'Are you sure you want to delete this post? This action cannot be undone.',
    searchResults: 'Search results for "{searchTerm}"',
    found: 'Found: {count}',
    switchUser: 'Switch user'
  }
};

function App() {
  // Theme state
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');
  
  // Language state
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ru');
  
  // Theme toggling
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme', newMode);
      },
    }),
    [mode],
  );

  // Language handling
  const languageContext = useMemo(
    () => ({
      language,
      setLanguage: (newLang) => {
        setLanguage(newLang);
        localStorage.setItem('language', newLang);
      },
      translations: translations[language] || translations.ru
    }),
    [language],
  );

  // Create dynamic theme based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            // Instagram-like colors
            main: mode === 'light' ? '#405DE6' : '#90caf9',
            light: mode === 'light' ? '#5851DB' : '#a6d4fa',
            dark: mode === 'light' ? '#833AB4' : '#648dae',
          },
          secondary: {
            // Instagram gradient colors
            main: mode === 'light' ? '#C13584' : '#ce93d8',
            light: mode === 'light' ? '#E1306C' : '#d8a6e6',
            dark: mode === 'light' ? '#FD1D1D' : '#a46fc0',
          },
          background: {
            default: mode === 'light' ? '#fafafa' : '#121212', // Instagram light bg is very light gray
            paper: mode === 'light' ? '#fff' : '#1e1e1e',
          },
        },
        typography: {
          fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif', // Instagram uses Segoe UI or similar
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 500,
          },
          h6: {
            fontWeight: 500,
          },
        },
        shape: {
          borderRadius: 8,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600, // Instagram buttons are a bit bolder
                borderRadius: 8,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                overflow: 'hidden',
                borderRadius: 8,
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                boxShadow: mode === 'light' ? '0 1px 2px rgba(0, 0, 0, 0.1)' : 'none', // Subtle shadow like Instagram
                backgroundColor: mode === 'light' ? '#ffffff' : '#121212',
                borderBottom: `1px solid ${mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}`,
              }
            }
          },
          MuiContainer: {
            styleOverrides: {
              root: {
                '@media (min-width: 600px)': {
                  paddingLeft: 16,
                  paddingRight: 16,
                },
              }
            }
          }
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <LanguageContext.Provider value={languageContext}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/messages" element={<MessagingPage />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </LanguageContext.Provider>
    </ColorModeContext.Provider>
  );
}

export default App;