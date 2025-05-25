/** @jsxImportSource react */
import React, { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import {
  Container, Typography, TextField, Button, Box, List, ListItem,
  ListItemText, InputAdornment, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Paper, Card, CardContent, CardActions,
  Grid, Avatar, Divider, Chip, CircularProgress, Snackbar, Alert,
  Menu, MenuItem, AppBar, Toolbar, Tooltip, Switch, FormControlLabel,
  useTheme, useMediaQuery
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GifIcon from '@mui/icons-material/Gif';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageIcon from '@mui/icons-material/Language';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ColorModeContext, LanguageContext } from './App.jsx';

// Define the interfaces for our context types
interface ColorModeContextType {
  toggleColorMode: () => void;
}

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Record<string, string>;
}

interface Post {
  _id: string;
  title: string;
  body: string;
  imageUrl?: string;
  gifUrl?: string;
  videoUrl?: string;
  author: { name: string; email: string };
  createdAt: string;
}

interface JwtPayload { 
  id: string; 
  name: string; 
  email: string;
  exp?: number; // Add expiration claim
  iat?: number; // Issued at claim
}

const DashboardPage = () => {
  // Get theme from MUI
  const theme = useTheme();
  
  // Get theme and language contexts with proper typing
  const colorMode = useContext(ColorModeContext) as ColorModeContextType;
  const { language, setLanguage, translations: t } = useContext(LanguageContext) as LanguageContextType;
  
  // Navigation
  const navigate = useNavigate();
  
  // User menu state
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const userMenuOpen = Boolean(userMenuAnchorEl);
  
  // Language menu state
  const [langMenuAnchorEl, setLangMenuAnchorEl] = useState<null | HTMLElement>(null);
  const langMenuOpen = Boolean(langMenuAnchorEl);
  
  const [posts, setPosts]           = useState<Post[]>([]);
  const [title, setTitle]           = useState('');
  const [body,  setBody]            = useState('');
  const [imageUrl, setImageUrl]     = useState('');
  const [gifUrl,   setGifUrl]       = useState('');
  const [videoUrl, setVideoUrl]     = useState('');
  const [gifDlg,   setGifDlg]       = useState(false);
  const [gifTerm,  setGifTerm]      = useState('');
  const [gifList,  setGifList]      = useState<string[]>([]);
  const [loading, setLoading]       = useState(false);
  const [snackbar, setSnackbar]     = useState({ open: false, message: '', severity: 'success' });
  const [showMediaOptions, setShowMediaOptions] = useState(false);
  
  // Состояние для авторизации
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Состояние для поиска
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Состояние для поиска видео
  const [videoSearchTerm, setVideoSearchTerm] = useState('');
  const [videoSearchResults, setVideoSearchResults] = useState<any[]>([]);
  const [showVideoSearch, setShowVideoSearch] = useState(false);
  const [videoSearchLoading, setVideoSearchLoading] = useState(false);
  
  // Состояние для удаления
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  
  // Add responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  // --- Utils ---
  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    // Если уже embed-ссылка — вернём как есть
    if (url.includes('/embed/')) return url;

    // Формат youtu.be/VIDEO_ID
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1].split(/[\?\&]/)[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    // Формат youtube.com/watch?v=VIDEO_ID
    if (url.includes('watch?v=')) {
      const id = url.split('watch?v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  };

  // Базовый URL бэкенда (из .env или по умолчанию localhost:3333)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';
  const token = localStorage.getItem('token');
  
  // Проверка валидности токена
  const isValidToken = (tokenToCheck: string | null): boolean => {
    if (!tokenToCheck) return false;
    try {
      const decoded = jwtDecode<JwtPayload>(tokenToCheck);
      const currentTime = Date.now() / 1000;
      // Проверяем, что токен не истек
      return decoded.exp ? decoded.exp > currentTime : false;
    } catch (error) {
      console.error('Ошибка при декодировании токена:', error);
      return false;
    }
  };
  
  // Если токен невалидный, попытка получить новый
  useEffect(() => {
    if (!isValidToken(token)) {
      // Если пользователь не авторизован, перенаправляем на страницу авторизации
      // или можно отобразить форму авторизации на текущей странице
      // Здесь можно отправить запрос на обновление токена, если у вас есть refreshToken
      localStorage.removeItem('token'); // Удаляем невалидный токен
    }
  }, [token]);
  
  const currentUser = token && isValidToken(token) ? jwtDecode<JwtPayload>(token) : null;

  // ---------- API ----------
  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/posts`);
      if (!res.ok) {
        throw new Error('Ошибка при загрузке постов');
      }
      const data = await res.json();
      setPosts(data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setSnackbar({
        open: true,
        message: 'Ошибка загрузки постов: ' + errorMessage,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    if (!isValidToken(token)) {
      setSnackbar({
        open: true,
        message: 'Для публикации поста необходимо авторизоваться',
        severity: 'warning'
      });
      return;
    }
    
    if (!title || !body) {
      setSnackbar({
        open: true,
        message: 'Заполните заголовок и содержание поста',
        severity: 'warning'
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, body, imageUrl, gifUrl, videoUrl }),
      });

      if (!res.ok) {
        let msg = 'Ошибка публикации';
        try {
          const json = await res.json();
          msg = json?.message || msg;
        } catch (_) { /* ignore */ }
        
        setSnackbar({
          open: true,
          message: msg,
          severity: 'error'
        });
        return;
      }

      // Успешно — очищаем форму и обновляем список
      setTitle('');
      setBody('');
      setImageUrl('');
      setGifUrl('');
      setVideoUrl('');
      setShowMediaOptions(false);
      
      setSnackbar({
        open: true,
        message: 'Пост успешно опубликован',
        severity: 'success'
      });
      
      loadPosts();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Сетевой сбой: ' + err,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    if (!confirm('Вы уверены, что хотите удалить этот пост?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/posts/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (!res.ok) {
        setSnackbar({
          open: true,
          message: 'Ошибка при удалении поста',
          severity: 'error'
        });
        return;
      }
      
      setSnackbar({
        open: true,
        message: 'Пост удален',
        severity: 'success'
      });
      
      loadPosts();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Ошибка при удалении поста',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // ---------- GIF ----------
  const searchGif = async () => {
    if (!gifTerm.trim()) return;
    
    setLoading(true);
    try {
      const key   = 'dc6zaTOxFJmzC';
      const res   = await fetch(`https://api.giphy.com/v1/gifs/search?q=${gifTerm}&api_key=${key}&limit=9`);
      const data  = await res.json();
      setGifList(data.data.map((g: any) => g.images.fixed_height.url));
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Ошибка при поиске GIF',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  const pickGif = (url: string) => { 
    setGifUrl(url); 
    setGifDlg(false); 
  };

  useEffect(() => { loadPosts(); }, []);

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Логин функция
  const handleLogin = async () => {
    if (!email || !password) {
      setSnackbar({
        open: true,
        message: 'Введите email и пароль',
        severity: 'warning'
      });
      return;
    }

    setLoginLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        let errorMessage = 'Ошибка входа';
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Обработка ошибки JSON парсинга
        }
        
        throw new Error(errorMessage);
      }

      const data = await res.json();
      
      // Сохраняем токен
      localStorage.setItem('token', data.token);
      
      // Обновляем интерфейс
      setShowLoginDialog(false);
      setEmail('');
      setPassword('');
      
      setSnackbar({
        open: true,
        message: 'Вы успешно вошли в систему',
        severity: 'success'
      });
      
      // Перезагружаем страницу для применения авторизации
      window.location.reload();
      
    } catch (error) {
      setSnackbar({
        open: true,
        message: error instanceof Error ? error.message : 'Ошибка авторизации',
        severity: 'error'
      });
    } finally {
      setLoginLoading(false);
    }
  };

  // Функция поиска постов
  const searchPosts = () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      return;
    }
    
    setIsSearching(true);
    const term = searchTerm.toLowerCase();
    const filtered = posts.filter(post => 
      post.title.toLowerCase().includes(term) || 
      post.body.toLowerCase().includes(term)
    );
    
    setSearchResults(filtered);
  };
  
  // Очистка поиска
  const clearSearch = () => {
    setSearchTerm('');
    setIsSearching(false);
  };
  
  // Поиск видео на YouTube
  const searchYouTubeVideos = async () => {
    if (!videoSearchTerm.trim()) return;
    
    setVideoSearchLoading(true);
    try {
      // YouTube API ключ (для production нужно спрятать на backend)
      const API_KEY = 'AIzaSyDAyVdOHm4HWYjFIEK7Hdvr9wIgFbYYwIU'; // демо ключ, ограниченная квота
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${videoSearchTerm}&type=video&key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error('Не удалось выполнить поиск видео');
      }
      
      const data = await response.json();
      setVideoSearchResults(data.items || []);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Ошибка при поиске видео: ' + (error instanceof Error ? error.message : String(error)),
        severity: 'error'
      });
      setVideoSearchResults([]);
    } finally {
      setVideoSearchLoading(false);
    }
  };
  
  // Выбор видео из результатов поиска
  const selectVideo = (videoId: string) => {
    setVideoUrl(`https://www.youtube.com/watch?v=${videoId}`);
    setShowVideoSearch(false);
  };
  
  // Запрос на удаление поста
  const confirmDeletePost = (postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };
  
  // Удаление поста после подтверждения
  const handleDeletePost = async () => {
    if (!postToDelete) return;
    
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/posts/${postToDelete}`, {
        method: 'DELETE',
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Ошибка при удалении поста');
      }
      
      // Успешное удаление
      setSnackbar({
        open: true,
        message: 'Пост успешно удален',
        severity: 'success'
      });
      
      // Обновляем список постов
      loadPosts();
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'Не удалось удалить пост: ' + (err instanceof Error ? err.message : String(err)),
        severity: 'error'
      });
    } finally {
      setLoading(false);
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  // User menu handling
  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };
  
  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };
  
  // Language menu handling
  const handleLangMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setLangMenuAnchorEl(event.currentTarget);
  };
  
  const handleLangMenuClose = () => {
    setLangMenuAnchorEl(null);
  };
  
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    handleLangMenuClose();
  };
  
  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    handleUserMenuClose();
    setSnackbar({
      open: true,
      message: language === 'ru' ? 'Вы вышли из системы' : 'You have logged out',
      severity: 'success'
    });
    // Reload to update auth state
    window.location.reload();
  };
  
  // Switch user (open login dialog)
  const handleSwitchUser = () => {
    handleUserMenuClose();
    setShowLoginDialog(true);
  };

  // ---------- UI ----------
  return (
    <>
      {/* App bar with theme toggle and user controls - Fixed position on mobile for Instagram-like feel */}
      <AppBar 
        position="fixed" 
        color="default" 
        elevation={0}
        sx={{ 
          top: 0, 
          mb: 3, 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo/Title - More Instagram-like */}
          <Typography 
            variant="h6" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              fontFamily: 'cursive', 
              fontWeight: 'bold',
              fontSize: isMobile ? '1.25rem' : '1.5rem'
            }}
          >
            Social App
          </Typography>

          {/* Center Icons for Desktop - Instagram style */}
          {isDesktop && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Tooltip title={t.home || "Home"}>
                <IconButton color="inherit" onClick={() => navigate('/')}>
                  <HomeIcon />
                </IconButton>
              </Tooltip>
              
              {currentUser && (
                <Tooltip title={t.messages || "Messages"}>
                  <IconButton color="inherit" onClick={() => navigate('/messages')}>
                    <MessageIcon />
                  </IconButton>
                </Tooltip>
              )}
              
              <Tooltip title={t.explore || "Explore"}>
                <IconButton color="inherit">
                  <ExploreIcon />
                </IconButton>
              </Tooltip>
              
              <Tooltip title={t.activity || "Activity"}>
                <IconButton color="inherit">
                  <FavoriteBorderIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          
          {/* Right side controls */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Theme toggle - hide on mobile */}
            {!isMobile && (
              <Tooltip title={language === 'ru' ? 'Переключить тему' : 'Toggle theme'}>
                <IconButton 
                  onClick={colorMode.toggleColorMode} 
                  color="inherit" 
                  sx={{ mr: 1 }}
                >
                  {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
              </Tooltip>
            )}
            
            {/* Language selector - hide on mobile */}
            {!isMobile && (
              <Tooltip title={language === 'ru' ? 'Сменить язык' : 'Change language'}>
                <IconButton
                  onClick={handleLangMenuClick}
                  color="inherit"
                  sx={{ mr: 1 }}
                >
                  <LanguageIcon />
                </IconButton>
              </Tooltip>
            )}
            
            <Menu
              anchorEl={langMenuAnchorEl}
              open={langMenuOpen}
              onClose={handleLangMenuClose}
            >
              <MenuItem onClick={() => changeLanguage('ru')} selected={language === 'ru'}>
                Русский
              </MenuItem>
              <MenuItem onClick={() => changeLanguage('en')} selected={language === 'en'}>
                English
              </MenuItem>
            </Menu>
            
            {/* User menu */}
            {currentUser ? (
              <>
                <Button
                  onClick={handleUserMenuClick}
                  startIcon={
                    <Avatar 
                      sx={{ 
                        width: 28, 
                        height: 28, 
                        bgcolor: 'primary.main',
                        border: '2px solid white' // Instagram-like profile photo
                      }}
                    >
                      {currentUser.name.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  color="inherit"
                  sx={{ ml: isMobile ? 0 : 1 }}
                >
                  {!isMobile && currentUser.name}
                </Button>
                <Menu
                  anchorEl={userMenuAnchorEl}
                  open={userMenuOpen}
                  onClose={handleUserMenuClose}
                >
                  <MenuItem onClick={handleSwitchUser}>
                    <AccountCircleIcon fontSize="small" sx={{ mr: 1 }} />
                    {t.switchUser}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    {t.logout}
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button 
                color="primary"
                variant="contained"
                onClick={() => setShowLoginDialog(true)}
                size={isMobile ? "small" : "medium"}
              >
                {t.login}
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Mobile bottom navigation - Instagram style */}
      {isMobile && currentUser && (
        <Paper 
          sx={{ 
            position: 'fixed', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            zIndex: 100,
            borderTop: 1,
            borderColor: 'divider'
          }} 
          elevation={0}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-around', py: 1 }}>
            <IconButton color="inherit" onClick={() => navigate('/')}>
              <HomeIcon />
            </IconButton>
            <IconButton color="inherit">
              <ExploreIcon />
            </IconButton>
            <IconButton color="inherit" onClick={() => navigate('/messages')}>
              <MessageIcon />
            </IconButton>
            <IconButton 
              onClick={handleUserMenuClick}
            >
              <Avatar 
                sx={{ 
                  width: 24, 
                  height: 24, 
                  bgcolor: 'primary.main',
                  border: '1px solid white'
                }}
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Box>
        </Paper>
      )}
    
      {/* Add space at the top to account for fixed AppBar */}
      <Box sx={{ mb: 2, pt: 8 }} />
      
      <Container 
        maxWidth="md" 
        sx={{ 
          mb: isMobile ? 10 : 8, // Add bottom margin for mobile navigation
          px: isMobile ? 1 : 2, // Smaller padding on mobile
        }}
      >
        {/* User welcome card (can now remove since we have user in app bar) */}

        {/* Login prompt for non-authenticated users */}
        {!currentUser && (
          <Paper 
            elevation={1} 
            sx={{ 
              p: 3, 
              mb: 4, 
              borderRadius: 2,
              background: 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)', // Instagram gradient
              color: 'white'
            }}
          >
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" color="white">
                {t.loginRequired}
              </Typography>
              <Button 
                variant="contained" 
                color="inherit" 
                sx={{ color: 'primary.main' }}
                onClick={() => setShowLoginDialog(true)}
              >
                {t.login}
              </Button>
            </Box>
          </Paper>
        )}

        {/* Post creation form - Make it look like Instagram's post creation */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: isMobile ? 2 : 3, 
            mb: 4, 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            {currentUser && (
              <Avatar 
                sx={{ 
                  mr: 2, 
                  bgcolor: 'primary.main', 
                  width: 40, 
                  height: 40,
                  border: '2px solid white', // Instagram-like border
                  boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
                }}
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </Avatar>
            )}
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              {t.createPost}
            </Typography>
          </Box>
          
          <TextField 
            fullWidth 
            variant="outlined"
            label={t.title}
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            sx={{ mb: 2 }}
            size={isMobile ? "small" : "medium"}
          />
          
          <TextField 
            fullWidth 
            multiline 
            rows={isMobile ? 3 : 4} 
            variant="outlined"
            label={t.content}
            value={body} 
            onChange={e => setBody(e.target.value)} 
            sx={{ mb: 2 }} 
            size={isMobile ? "small" : "medium"}
          />
          
          {showMediaOptions && (
            <Box sx={{ mb: 2 }}>
              <TextField 
                fullWidth 
                variant="outlined"
                label={t.imageLink}
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)} 
                sx={{ mb: 2 }}
                size={isMobile ? "small" : "medium"}
                InputProps={{ 
                  startAdornment: <InputAdornment position="start"><ImageIcon color="primary" /></InputAdornment> 
                }} 
              />
              
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexDirection: isMobile ? 'column' : 'row' }}>
                <TextField 
                  fullWidth 
                  variant="outlined"
                  label={t.youtubeLink}
                  value={videoUrl}
                  onChange={e => setVideoUrl(e.target.value)} 
                  InputProps={{ 
                    startAdornment: <InputAdornment position="start"><YouTubeIcon color="primary" /></InputAdornment> 
                  }}
                  size={isMobile ? "small" : "medium"}
                />
                <Button 
                  variant="outlined"
                  color="secondary"
                  onClick={() => setShowVideoSearch(true)}
                  sx={{ whiteSpace: 'nowrap', minWidth: isMobile ? '100%' : 'auto' }}
                  size={isMobile ? "small" : "medium"}
                >
                  {t.findVideo}
                </Button>
              </Box>
              
              <Button 
                variant="outlined" 
                startIcon={<GifIcon />} 
                onClick={() => setGifDlg(true)} 
                sx={{ mb: 2 }}
                size={isMobile ? "small" : "medium"}
              >
                {t.addGif}
              </Button>
              
              {gifUrl && (
                <Box mt={1} display="flex" flexDirection="column" alignItems="center">
                  <img src={gifUrl} alt="gif" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                  <Button 
                    size="small" 
                    color="error" 
                    onClick={() => setGifUrl('')} 
                    sx={{ mt: 1 }}
                  >
                    {t.deleteGif}
                  </Button>
                </Box>
              )}
            </Box>
          )}
          
          <Box display="flex" gap={2} flexWrap="wrap">
            <Button 
              variant="contained" 
              color="primary" 
              size={isMobile ? "medium" : "large"}
              disabled={loading || !title || !body}
              endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              onClick={createPost}
              sx={{ 
                borderRadius: 30, // Rounded button like Instagram
                px: 3
              }}
            >
              {t.publish}
            </Button>
            
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<AddPhotoAlternateIcon />}
              onClick={() => setShowMediaOptions(!showMediaOptions)}
              size={isMobile ? "small" : "medium"}
              sx={{ borderRadius: 30 }}
            >
              {showMediaOptions ? t.hideMedia : t.addMedia}
            </Button>
          </Box>
        </Paper>

        {/* Search box - Instagram style */}
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2, 
            mb: 4, 
            borderRadius: isMobile ? 30 : 2, // More rounded on mobile like Instagram
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', gap: 1, flexDirection: isMobile ? 'column' : 'row' }}>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder={t.searchPosts}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={clearSearch}>
                      <Typography fontSize="small" color="primary">✕</Typography>
                    </IconButton>
                  </InputAdornment>
                ) : null,
                sx: { borderRadius: isMobile ? 30 : 4 } // More rounded on mobile
              }}
              onKeyPress={(e) => e.key === 'Enter' && searchPosts()}
            />
            {isMobile ? (
              <Button 
                fullWidth
                variant="contained" 
                onClick={searchPosts}
                disabled={!searchTerm.trim()}
                sx={{ borderRadius: 30 }}
              >
                {t.find}
              </Button>
            ) : (
              <Button 
                variant="contained" 
                onClick={searchPosts}
                disabled={!searchTerm.trim()}
                sx={{ borderRadius: 4, px: 3 }}
              >
                {t.find}
              </Button>
            )}
          </Box>
        </Paper>

        {/* Posts list heading */}
        <Box sx={{ mb: 3 }}>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 2, 
              fontWeight: 600, 
              color: 'primary.main', 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              fontSize: isMobile ? '1.25rem' : '1.5rem'
            }}
          >
            {isSearching 
              ? t.searchResults.replace('{searchTerm}', searchTerm)
              : t.feed
            }
            {loading && <CircularProgress size={20} sx={{ ml: 2 }} />}
            {isSearching && (
              <Chip 
                label={t.found.replace('{count}', searchResults.length.toString())}
                size="small" 
                color="primary" 
                variant="outlined"
                sx={{ borderRadius: 8 }}
              />
            )}
          </Typography>
        </Box>
          
        {/* Empty state */}
        {((isSearching && searchResults.length === 0) || (!isSearching && posts.length === 0)) && !loading && (
          <Paper 
            elevation={1} 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              borderRadius: 2,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {isSearching 
                ? t.noResults.replace('{searchTerm}', searchTerm)
                : t.noPosts
              }
            </Typography>
          </Paper>
        )}
        
        {/* Posts grid - Instagram-like cards */}
        <Box sx={{ mb: 4 }}>
          {(isSearching ? searchResults : posts).map(p => (
            <Card 
              key={p._id}
              elevation={1}
              sx={{ 
                borderRadius: 2,
                mb: 3,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {/* Post header - Instagram style */}
              <CardContent sx={{ p: 2, pb: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main', 
                      mr: 1.5,
                      width: 36,
                      height: 36,
                      border: '2px solid white', 
                      boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
                    }}
                  >
                    {p.author?.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                      {p.author?.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(p.createdAt).toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </Typography>
                  </Box>
                  
                  {/* Three dots menu for post actions - Instagram style */}
                  {currentUser?.email === p.author?.email && (
                    <IconButton 
                      size="small" 
                      onClick={() => confirmDeletePost(p._id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </CardContent>
              
              {/* Media content first - Like Instagram */}
              {(p.imageUrl || p.gifUrl || p.videoUrl) && (
                <Box sx={{ 
                  position: 'relative',
                  pb: p.videoUrl ? '56.25%' : 'auto', // 16:9 aspect ratio for videos
                  height: p.videoUrl ? 0 : 'auto'
                }}>
                  {p.imageUrl && (
                    <img 
                      src={p.imageUrl} 
                      alt="Post"
                      style={{ 
                        width: '100%', 
                        display: 'block',
                        maxHeight: '500px',
                        objectFit: 'contain'
                      }} 
                    />
                  )}
                  
                  {p.gifUrl && !p.imageUrl && (
                    <img 
                      src={p.gifUrl} 
                      alt="GIF"
                      style={{ 
                        width: '100%', 
                        display: 'block',
                        maxHeight: '500px',
                        objectFit: 'contain'
                      }} 
                    />
                  )}
                  
                  {p.videoUrl && !p.imageUrl && !p.gifUrl && (
                    <iframe
                      src={getEmbedUrl(p.videoUrl)}
                      title="YouTube"
                      frameBorder="0"
                      style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </Box>
              )}
              
              {/* Post content */}
              <CardContent sx={{ py: 2 }}>
                {/* Action buttons - Instagram style */}
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <IconButton color="inherit" sx={{ mr: 1 }}>
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton color="inherit" sx={{ mr: 1 }}>
                    <MessageIcon />
                  </IconButton>
                </Box>
                
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    {p.title}
                  </Typography>
                  
                  <Typography variant="body1">
                    {p.body}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
        
        {/* Login dialog */}
        <Dialog 
          open={showLoginDialog} 
          onClose={() => setShowLoginDialog(false)}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>{t.login}</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label={t.email}
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label={t.password}
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowLoginDialog(false)}>{t.cancel}</Button>
            <Button 
              onClick={handleLogin} 
              disabled={loginLoading}
              variant="contained"
              startIcon={loginLoading ? <CircularProgress size={20} /> : null}
            >
              {t.login}
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Delete confirmation dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>{t.confirmDelete}</DialogTitle>
          <DialogContent>
            <Typography>
              {t.confirmDeleteMessage}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>{t.cancel}</Button>
            <Button 
              onClick={handleDeletePost} 
              color="error" 
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {t.delete}
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Snackbar */}
        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={5000} 
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity as 'success' | 'error' | 'warning' | 'info'} 
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default DashboardPage;