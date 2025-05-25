import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Container, Paper, Typography, TextField, Button, Avatar, 
  List, ListItem, ListItemAvatar, ListItemButton, ListItemText, 
  IconButton, Badge, Divider, InputAdornment, CircularProgress,
  Grid, Card, CardContent, useTheme, useMediaQuery
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';
import { LanguageContext } from './App.jsx';

interface Message {
  _id: string;
  sender: {
    _id: string;
    name: string;
    email: string;
  };
  recipient: string;
  text: string;
  read: boolean;
  createdAt: string;
}

interface Conversation {
  _id: string;
  name: string;
  email: string;
  lastMessage: Message;
  unreadCount: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

const MessagingPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { translations: t } = useContext(LanguageContext) as any;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  // State
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState({
    conversations: false,
    messages: false,
    send: false,
    users: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewMessage, setShowNewMessage] = useState(false);
  
  // Current user from JWT
  const token = localStorage.getItem('token');
  const currentUserId = token ? JSON.parse(atob(token.split('.')[1])).id : null;
  
  // API base URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';
  
  // Fetch conversations on component mount
  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    
    loadConversations();
  }, [token]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Fetch conversations
  const loadConversations = async () => {
    if (!token) return;
    
    setLoading(prev => ({ ...prev, conversations: true }));
    try {
      const res = await fetch(`${API_URL}/api/messages/conversations`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to fetch conversations');
      
      const data = await res.json();
      setConversations(data);
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setLoading(prev => ({ ...prev, conversations: false }));
    }
  };
  
  // Fetch messages for a conversation
  const loadMessages = async (userId: string) => {
    if (!token) return;
    
    setLoading(prev => ({ ...prev, messages: true }));
    try {
      const res = await fetch(`${API_URL}/api/messages/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to fetch messages');
      
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setLoading(prev => ({ ...prev, messages: false }));
    }
  };
  
  // Send a message
  const sendMessage = async () => {
    if (!token || !selectedUser || !newMessage.trim()) return;
    
    setLoading(prev => ({ ...prev, send: true }));
    try {
      const res = await fetch(`${API_URL}/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          recipientId: selectedUser._id,
          text: newMessage
        })
      });
      
      if (!res.ok) throw new Error('Failed to send message');
      
      const data = await res.json();
      
      // Add new message to the list
      setMessages(prev => [...prev, data]);
      setNewMessage('');
      
      // Refresh conversations
      loadConversations();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(prev => ({ ...prev, send: false }));
    }
  };
  
  // Load users for new message
  const loadUsers = async () => {
    if (!token) return;
    
    setLoading(prev => ({ ...prev, users: true }));
    try {
      const res = await fetch(`${API_URL}/api/messages/users/all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      if (!res.ok) throw new Error('Failed to fetch users');
      
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };
  
  // Handle conversation selection
  const selectConversation = (conversation: Conversation) => {
    setSelectedUser({
      _id: conversation._id,
      name: conversation.name,
      email: conversation.email
    });
    loadMessages(conversation._id);
    setShowNewMessage(false);
  };
  
  // Start new conversation
  const startNewConversation = () => {
    setShowNewMessage(true);
    setSelectedUser(null);
    loadUsers();
  };
  
  // Select user for new conversation
  const selectUser = (user: User) => {
    setSelectedUser(user);
    setMessages([]);
    setShowNewMessage(false);
  };
  
  // Handle key press in message input
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };
  
  // Format time for display
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date for message groups
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return t.today || 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return t.yesterday || 'Yesterday';
    }
    
    return date.toLocaleDateString();
  };
  
  // Filter conversations by search term
  const filteredConversations = conversations.filter(
    conv => conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter users by search term
  const filteredUsers = users.filter(
    user => user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      {/* Instagram-like fixed top bar for mobile */}
      {isMobile && (
        <Box 
          sx={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            zIndex: 1100,
            backgroundColor: theme.palette.background.paper,
            borderBottom: `1px solid ${theme.palette.divider}`,
            py: 1.5,
            px: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <IconButton edge="start" color="inherit" onClick={() => navigate('/')}>
            <HomeIcon />
          </IconButton>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1, 
              textAlign: 'center', 
              fontWeight: 'bold',
              fontFamily: 'cursive'
            }}
          >
            {t.messages || 'Messages'}
          </Typography>
          <IconButton edge="end" color="inherit" sx={{ visibility: 'hidden' }}>
            <HomeIcon />
          </IconButton>
        </Box>
      )}
      
      <Container 
        maxWidth="md" 
        sx={{ 
          mt: isMobile ? 7 : 4, 
          mb: 4, 
          px: isMobile ? 0 : 2 
        }}
      >
        <Paper 
          elevation={1} 
          sx={{ 
            height: isMobile ? 'calc(100vh - 120px)' : 'calc(100vh - 160px)', 
            overflow: 'hidden', 
            borderRadius: isMobile ? 0 : 2,
            border: !isMobile ? `1px solid ${theme.palette.divider}` : 'none'
          }}
        >
          <Box sx={{ height: '100%', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
            {/* Conversations List - Hidden on mobile when a conversation is selected */}
            <Box 
              sx={{ 
                width: { xs: '100%', sm: '40%', md: '35%' },
                borderRight: { sm: `1px solid ${theme.palette.divider}` },
                height: '100%', 
                display: isMobile && selectedUser ? 'none' : 'flex',
                flexDirection: 'column'
              }}
            >
              {!isMobile && (
                <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {t.messages || 'Messages'}
                  </Typography>
                  
                  <TextField
                    fullWidth
                    placeholder={t.searchPeople || 'Search people'}
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 30 }
                    }}
                    sx={{ mb: 1 }}
                  />
                  
                  <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary" 
                    onClick={startNewConversation}
                    sx={{ mt: 1, borderRadius: 30 }}
                  >
                    {t.newMessage || 'New Message'}
                  </Button>
                </Box>
              )}
              
              {isMobile && (
                <Box 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    borderBottom: `1px solid ${theme.palette.divider}`
                  }}
                >
                  <TextField
                    fullWidth
                    placeholder={t.searchPeople || 'Search people'}
                    variant="outlined"
                    size="small"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      sx: { borderRadius: 30 }
                    }}
                    sx={{ mr: 1 }}
                  />
                  <IconButton 
                    color="primary" 
                    onClick={startNewConversation}
                    sx={{ 
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      '&:hover': {
                        backgroundColor: theme.palette.primary.dark,
                      }
                    }}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              )}
              
              <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
                {loading.conversations ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    {showNewMessage ? (
                      <List>
                        <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
                          {t.selectPerson || 'Select a person to message'}
                        </Typography>
                        {loading.users ? (
                          <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                            <CircularProgress size={24} />
                          </Box>
                        ) : (
                          filteredUsers.map(user => (
                            <ListItemButton 
                              key={user._id}
                              onClick={() => selectUser(user)}
                              sx={{ px: 2 }}
                            >
                              <ListItemAvatar>
                                <Avatar 
                                  sx={{ 
                                    bgcolor: 'primary.main',
                                    border: '2px solid white', 
                                    boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
                                  }}
                                >
                                  {user.name[0].toUpperCase()}
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText 
                                primary={user.name}
                                secondary={user.email}
                                primaryTypographyProps={{ fontWeight: 'bold' }}
                              />
                            </ListItemButton>
                          ))
                        )}
                      </List>
                    ) : (
                      <List>
                        {filteredConversations.length > 0 ? (
                          filteredConversations.map(conversation => (
                            <ListItemButton 
                              key={conversation._id}
                              selected={selectedUser?._id === conversation._id}
                              onClick={() => selectConversation(conversation)}
                              sx={{ 
                                px: 2,
                                backgroundColor: selectedUser?._id === conversation._id 
                                  ? theme.palette.mode === 'dark' 
                                    ? 'rgba(255, 255, 255, 0.08)' 
                                    : 'rgba(0, 0, 0, 0.04)'
                                  : 'transparent'
                              }}
                            >
                              <ListItemAvatar>
                                <Badge
                                  color="primary"
                                  badgeContent={conversation.unreadCount}
                                  invisible={conversation.unreadCount === 0}
                                >
                                  <Avatar 
                                    sx={{ 
                                      bgcolor: 'primary.main',
                                      border: '2px solid white', 
                                      boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
                                    }}
                                  >
                                    {conversation.name[0].toUpperCase()}
                                  </Avatar>
                                </Badge>
                              </ListItemAvatar>
                              <ListItemText 
                                primary={conversation.name}
                                secondary={
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    noWrap
                                    sx={{
                                      fontWeight: !conversation.lastMessage.read && 
                                                conversation.lastMessage.sender._id !== currentUserId
                                                ? 'bold' : 'normal',
                                      maxWidth: '160px'
                                    }}
                                  >
                                    {conversation.lastMessage.text}
                                  </Typography>
                                }
                                primaryTypographyProps={{ fontWeight: 'bold' }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {formatTime(conversation.lastMessage.createdAt)}
                              </Typography>
                            </ListItemButton>
                          ))
                        ) : (
                          <Typography sx={{ p: 2, color: 'text.secondary', textAlign: 'center' }}>
                            {t.noConversations || 'No conversations yet'}
                          </Typography>
                        )}
                      </List>
                    )}
                  </>
                )}
              </Box>
            </Box>
            
            {/* Messages Area */}
            <Box
              sx={{ 
                width: { xs: '100%', sm: '60%', md: '65%' },
                height: '100%', 
                flexDirection: 'column', 
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.02)',
                // Only display if not mobile or if a user is selected
                display: isMobile && !selectedUser ? 'none' : 'flex'
              }}
            >
              {selectedUser ? (
                <>
                  {/* Header */}
                  <Box sx={{ 
                    p: 2, 
                    borderBottom: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {isMobile && (
                      <IconButton 
                        sx={{ mr: 1 }}
                        onClick={() => setSelectedUser(null)}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    )}
                    <Avatar 
                      sx={{ 
                        mr: 2,
                        bgcolor: 'primary.main',
                        border: '2px solid white', 
                        boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
                      }}
                    >
                      {selectedUser.name[0].toUpperCase()}
                    </Avatar>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {selectedUser.name}
                    </Typography>
                  </Box>
                  
                  {/* Messages */}
                  <Box sx={{ 
                    p: 2, 
                    overflowY: 'auto', 
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundImage: theme.palette.mode === 'dark' 
                      ? 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))' 
                      : 'linear-gradient(rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.01))',
                    backgroundSize: '100% 100%',
                  }}>
                    {loading.messages ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                      </Box>
                    ) : (
                      <>
                        {messages.length === 0 ? (
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            height: '100%',
                            flexDirection: 'column',
                            opacity: 0.6
                          }}>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                              {t.noMessages || 'No messages yet'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {t.sayHello || 'Say hello to start the conversation!'}
                            </Typography>
                          </Box>
                        ) : (
                          <>
                            {/* Group messages by date */}
                            {messages.reduce((groups: any, message, index) => {
                              const date = formatDate(message.createdAt);
                              
                              if (index === 0 || formatDate(messages[index - 1].createdAt) !== date) {
                                groups.push(
                                  <Box 
                                    key={`date-${date}`} 
                                    sx={{ 
                                      display: 'flex', 
                                      justifyContent: 'center',
                                      my: 2 
                                    }}
                                  >
                                    <Typography 
                                      variant="caption" 
                                      sx={{ 
                                        bgcolor: 'rgba(0, 0, 0, 0.1)', 
                                        px: 2, 
                                        py: 0.5, 
                                        borderRadius: 16 
                                      }}
                                    >
                                      {date}
                                    </Typography>
                                  </Box>
                                );
                              }
                              
                              const isCurrentUser = message.sender._id === currentUserId;
                              
                              groups.push(
                                <Box 
                                  key={message._id}
                                  sx={{ 
                                    display: 'flex',
                                    justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                    mb: 1.5
                                  }}
                                >
                                  {!isCurrentUser && (
                                    <Avatar
                                      sx={{ 
                                        mr: 1, 
                                        width: 32, 
                                        height: 32, 
                                        mt: 0.5,
                                        bgcolor: 'primary.main',
                                        border: '1px solid white', 
                                        boxShadow: '0 0 0 1px rgba(0,0,0,0.1)'
                                      }}
                                    >
                                      {message.sender.name[0].toUpperCase()}
                                    </Avatar>
                                  )}
                                  <Box
                                    sx={{
                                      maxWidth: '70%',
                                      bgcolor: isCurrentUser 
                                        ? 'primary.main' 
                                        : theme.palette.mode === 'dark' 
                                          ? 'grey.800' 
                                          : 'grey.200',
                                      color: isCurrentUser ? 'white' : 'text.primary',
                                      p: 1.5,
                                      borderRadius: 3,
                                      position: 'relative',
                                      borderTopRightRadius: isCurrentUser ? 4 : 16,
                                      borderTopLeftRadius: isCurrentUser ? 16 : 4,
                                      borderBottomLeftRadius: 16,
                                      borderBottomRightRadius: 16,
                                    }}
                                  >
                                    <Typography variant="body1">
                                      {message.text}
                                    </Typography>
                                    <Typography 
                                      variant="caption" 
                                      sx={{ 
                                        opacity: 0.8,
                                        display: 'block',
                                        textAlign: 'right',
                                        mt: 0.5
                                      }}
                                    >
                                      {formatTime(message.createdAt)}
                                    </Typography>
                                  </Box>
                                </Box>
                              );
                              
                              return groups;
                            }, [])}
                          </>
                        )}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </Box>
                  
                  {/* Message Input */}
                  <Box sx={{ 
                    p: 2, 
                    borderTop: `1px solid ${theme.palette.divider}`,
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <TextField
                      fullWidth
                      placeholder={t.typeMessage || 'Type a message...'}
                      variant="outlined"
                      size="small"
                      multiline
                      maxRows={4}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={loading.send}
                      sx={{ mr: 1 }}
                      InputProps={{
                        sx: { 
                          borderRadius: 30,
                          backgroundColor: theme.palette.background.paper
                        }
                      }}
                    />
                    <IconButton 
                      color="primary" 
                      onClick={sendMessage}
                      disabled={!newMessage.trim() || loading.send}
                      sx={{ 
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': {
                          backgroundColor: theme.palette.primary.dark,
                        },
                        '&.Mui-disabled': {
                          backgroundColor: theme.palette.action.disabledBackground,
                        }
                      }}
                    >
                      {loading.send ? <CircularProgress size={24} /> : <SendIcon />}
                    </IconButton>
                  </Box>
                </>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  height: '100%',
                  flexDirection: 'column',
                  p: 3
                }}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                    {t.directMessages || 'Direct Messages'}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" textAlign="center">
                    {t.selectConversation || 'Select a conversation or start a new one to begin messaging'}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default MessagingPage; 