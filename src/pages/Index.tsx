import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const categories = ['Главная', 'Политика', 'Экономика', 'Технологии'];

  const news = [
    {
      id: 1,
      category: 'Экономика',
      title: 'Россия запустила новую программу поддержки малого бизнеса в 2025 году',
      summary: 'Правительство выделило 500 миллиардов рублей на развитие предпринимательства в регионах. Ожидается создание 2 миллионов новых рабочих мест.',
      time: '3 часа назад',
      author: 'Екатерина Волкова',
      image: '/placeholder.svg',
      urgent: true
    },
    {
      id: 2,
      category: 'Технологии',
      title: 'В России создан первый квантовый компьютер промышленного класса',
      summary: 'Российские учёные в Сколково представили квантовую систему нового поколения. Производительность превышает зарубежные аналоги в 10 раз.',
      time: '5 часов назад',
      author: 'Дмитрий Орлов',
      image: '/placeholder.svg',
      urgent: false
    },
    {
      id: 3,
      category: 'Политика',
      title: 'Подписано соглашение о сотрудничестве с 15 странами БРИКС+',
      summary: 'Новые партнёрства охватывают торговлю, энергетику и космические технологии. Общий объём инвестиций составит 2 триллиона рублей.',
      time: '8 часов назад',
      author: 'Анна Петрова',
      image: '/placeholder.svg',
      urgent: false
    },
    {
      id: 4,
      category: 'Технологии',
      title: 'Запуск российского аналога ChatGPT для государственных нужд',
      summary: 'ИИ-система "Гигачат Про" будет использоваться в образовании, медицине и госуправлении. Полная локализация данных гарантирована.',
      time: '12 часов назад',
      author: 'Сергей Козлов',
      image: '/placeholder.svg',
      urgent: false
    },
    {
      id: 5,
      category: 'Экономика',
      title: 'Рубль достиг исторического максимума к основным валютам',
      summary: 'Укрепление национальной валюты связано с ростом экспорта высокотехнологичной продукции и стабилизацией экономики.',
      time: '1 день назад',
      author: 'Михаил Соколов',
      image: '/placeholder.svg',
      urgent: false
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('Главная');
  const [filteredNews, setFilteredNews] = useState(news);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [comments, setComments] = useState<{[key: number]: Array<{id: number, author: string, text: string, time: string}>}>({
    1: [
      { id: 1, author: 'Алексей К.', text: 'Очень важная новость для российской экономики!', time: '2 часа назад' },
      { id: 2, author: 'Мария С.', text: 'Надеюсь, эти меры действительно помогут', time: '1 час назад' }
    ],
    2: [
      { id: 1, author: 'Владимир П.', text: 'Наконец-то! Это решение давно назревало', time: '3 часа назад' }
    ]
  });
  const [newComment, setNewComment] = useState('');
  const [activeCommentSection, setActiveCommentSection] = useState<number | null>(null);
  const [reactions, setReactions] = useState<{[key: number]: {likes: number, hearts: number, rockets: number, userReaction: string | null}}>({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [onlineUsers] = useState(Math.floor(Math.random() * 15000) + 10000);

  // Обновляем отфильтрованные новости с анимацией
  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      const filtered = selectedCategory === 'Главная' 
        ? news 
        : news.filter(item => item.category === selectedCategory);
      setFilteredNews(filtered);
      setIsTransitioning(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const getCategoryStats = () => {
    const stats = {
      'Главная': news.length,
      'Политика': news.filter(n => n.category === 'Политика').length,
      'Экономика': news.filter(n => n.category === 'Экономика').length,
      'Технологии': news.filter(n => n.category === 'Технологии').length
    };
    return stats;
  };

  const categoryStats = getCategoryStats();

  const addReaction = (newsId: number, reactionType: string) => {
    setReactions(prev => {
      const current = prev[newsId] || { likes: 0, hearts: 0, rockets: 0, userReaction: null };
      const newReactions = { ...current };
      
      if (current.userReaction === reactionType) {
        // Удаляем реакцию
        newReactions[reactionType as keyof typeof newReactions]--;
        newReactions.userReaction = null;
      } else {
        // Удаляем старую реакцию
        if (current.userReaction) {
          newReactions[current.userReaction as keyof typeof newReactions]--;
        }
        // Добавляем новую
        newReactions[reactionType as keyof typeof newReactions]++;
        newReactions.userReaction = reactionType;
      }
      
      return { ...prev, [newsId]: newReactions };
    });
  };

  const getReactionCount = (newsId: number, type: string) => {
    return reactions[newsId]?.[type as keyof typeof reactions[number]] || Math.floor(Math.random() * 50) + 5;
  };

  const isUserReacted = (newsId: number, type: string) => {
    return reactions[newsId]?.userReaction === type;
  };

  // Имитация новых новостей
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
      }
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const addComment = (newsId: number) => {
    if (!newComment.trim()) {
      alert('Комментарий не может быть пустым!');
      return;
    }
    
    if (newComment.length > 500) {
      alert('Комментарий слишком длинный! Максимум 500 символов.');
      return;
    }
    
    const comment = {
      id: Date.now(),
      author: 'Вы',
      text: newComment.trim(),
      time: 'только что'
    };
    
    setComments(prev => ({
      ...prev,
      [newsId]: [...(prev[newsId] || []), comment]
    }));
    setNewComment('');
    
    // Показываем уведомление об успешном добавлении
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.textContent = 'Комментарий добавлен!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Заголовок и навигация */}
      {/* Уведомление о новых новостях */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-red-500 text-white p-4 rounded-lg shadow-xl z-50 animate-fade-in max-w-sm">
          <div className="flex items-center gap-2">
            <Icon name="Bell" size={20} className="animate-pulse" />
            <div>
              <div className="font-semibold">Новая новость!</div>
              <div className="text-sm opacity-90">Появились свежие обновления</div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowNotification(false)}
              className="text-white hover:bg-red-600 p-1 h-auto"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>
      )}

      <header className={`border-b-2 border-red-500 sticky top-0 z-50 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className={`text-3xl font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}>РОССИЯ НОВОСТИ</h1>
            
            <div className="flex items-center gap-4">
              {/* Переключатель темы */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`transition-colors duration-300 ${
                  isDarkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon name={isDarkMode ? 'Sun' : 'Moon'} size={20} />
              </Button>
              
              {/* Онлайн счетчик */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className={`text-sm transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {onlineUsers.toLocaleString()} онлайн
                </span>
              </div>
              
              <div className={`flex items-center gap-2 text-sm transition-colors duration-300 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <Icon name="Calendar" size={16} />
                7 сентября 2025
              </div>
            </div>
          </div>
          
          <nav className="flex gap-1">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`transition-all duration-200 ${selectedCategory === category 
                  ? "bg-red-500 hover:bg-red-600 text-white font-semibold scale-105 shadow-md" 
                  : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-red-200"
                }`}
              >
                {category}
                {categoryStats[category as keyof typeof categoryStats] > 0 && (
                  <Badge 
                    variant="secondary" 
                    className={`ml-2 text-xs ${selectedCategory === category 
                      ? "bg-red-600 text-white" 
                      : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {categoryStats[category as keyof typeof categoryStats]}
                  </Badge>
                )}
              </Button>
            ))}
          </nav>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Колонка новостей */}
          <div className="lg:col-span-2 space-y-6">
            {selectedCategory !== 'Главная' && (
              <div className={`border rounded-lg p-4 animate-fade-in transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800 border-red-400' : 'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center gap-2 text-red-700">
                  <Icon name="Filter" size={20} />
                  <span className="font-semibold">
                    Показано новостей в разделе "{selectedCategory}": {filteredNews.length}
                  </span>
                </div>
              </div>
            )}
            <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
              {filteredNews.map((item, index) => (
              <Card key={item.id} className={`overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in hover:scale-[1.01] ${
                isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
              }`}>
                {index === 0 && item.urgent && (
                  <div className="bg-red-500 text-white px-4 py-2 flex items-center gap-2">
                    <Icon name="AlertTriangle" size={16} />
                    <span className="font-semibold text-sm">СРОЧНАЯ НОВОСТЬ</span>
                  </div>
                )}
                
                <div className="flex">
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-red-600 border-red-200">
                        {item.category}
                      </Badge>
                      <span className="text-sm text-gray-500">{item.time}</span>
                    </div>
                    
                    <h2 className={`text-xl font-bold mb-3 leading-tight transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>
                      {item.title}
                    </h2>
                    
                    <p className={`mb-4 leading-relaxed transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {item.summary}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className={`text-xs transition-colors duration-300 ${
                            isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200'
                          }`}>
                            {item.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className={`text-sm transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}>{item.author}</span>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setActiveCommentSection(
                          activeCommentSection === item.id ? null : item.id
                        )}
                        className={`transition-colors duration-300 ${
                          isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-600'
                        }`}
                      >
                        <Icon name="MessageCircle" size={16} />
                        <span className="ml-1">
                          {comments[item.id]?.length || 0} комм.
                        </span>
                      </Button>
                    </div>
                    
                    {/* Система реакций */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addReaction(item.id, 'likes')}
                        className={`px-2 py-1 h-auto transition-all duration-200 hover:scale-110 ${
                          isUserReacted(item.id, 'likes') 
                            ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' 
                            : isDarkMode ? 'text-gray-400 hover:text-blue-400' : 'text-gray-500 hover:text-blue-600'
                        }`}
                      >
                        👍 {getReactionCount(item.id, 'likes')}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addReaction(item.id, 'hearts')}
                        className={`px-2 py-1 h-auto transition-all duration-200 hover:scale-110 ${
                          isUserReacted(item.id, 'hearts') 
                            ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' 
                            : isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-600'
                        }`}
                      >
                        ❤️ {getReactionCount(item.id, 'hearts')}
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addReaction(item.id, 'rockets')}
                        className={`px-2 py-1 h-auto transition-all duration-200 hover:scale-110 ${
                          isUserReacted(item.id, 'rockets') 
                            ? 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400' 
                            : isDarkMode ? 'text-gray-400 hover:text-orange-400' : 'text-gray-500 hover:text-orange-600'
                        }`}
                      >
                        🚀 {getReactionCount(item.id, 'rockets')}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="w-32">
                    <img 
                      src={index === 0 ? '/img/e6341203-8b5a-46c5-af91-e70589998a2b.jpg' : 
                           index === 1 ? '/img/ecf8243b-d64b-4790-bb59-5237deab0f68.jpg' : 
                           index === 2 ? '/img/310d6bbb-ed57-482b-979e-506b8c844e65.jpg' : 
                           '/placeholder.svg'}
                      alt={item.title}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                </div>
                
                {/* Секция комментариев */}
                {activeCommentSection === item.id && (
                  <div className={`border-t p-4 animate-accordion-down transition-colors duration-300 ${
                    isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50'
                  }`}>
                    <h3 className={`font-semibold mb-4 transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-black'
                    }`}>Комментарии</h3>
                    
                    {/* Существующие комментарии */}
                    <div className="space-y-3 mb-4">
                      {comments[item.id]?.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs bg-gray-300">
                              {comment.author[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`font-semibold text-sm transition-colors duration-300 ${
                                isDarkMode ? 'text-white' : 'text-black'
                              }`}>
                                {comment.author}
                              </span>
                              <span className="text-xs text-gray-500">
                                {comment.time}
                              </span>
                            </div>
                            <p className={`text-sm transition-colors duration-300 ${
                              isDarkMode ? 'text-gray-300' : 'text-gray-700'
                            }`}>{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Форма нового комментария */}
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-red-100 text-red-700">
                          Вы
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div className="relative">
                          <Textarea
                            placeholder="Написать комментарий..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className={`min-h-[60px] resize-none transition-colors ${
                              newComment.length > 500 ? 'border-red-500 focus:border-red-500' : ''
                            }`}
                            maxLength={500}
                          />
                          <div className={`absolute bottom-2 right-2 text-xs ${
                            newComment.length > 450 ? 'text-red-500' : 
                            newComment.length > 400 ? 'text-orange-500' : 'text-gray-400'
                          }`}>
                            {newComment.length}/500
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-gray-700"
                              onClick={() => setNewComment('')}
                            >
                              <Icon name="RotateCcw" size={14} />
                              <span className="ml-1">Очистить</span>
                            </Button>
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => addComment(item.id)}
                            disabled={!newComment.trim() || newComment.length > 500}
                            className="bg-red-500 hover:bg-red-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
                          >
                            <Icon name="Send" size={14} />
                            <span className="ml-1">Отправить</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
              ))}
            </div>
            
            {filteredNews.length === 0 && !isTransitioning && (
              <div className="text-center py-12 animate-fade-in">
                <Icon name="Search" size={48} className="text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Новостей не найдено
                </h3>
                <p className="text-gray-500">
                  В разделе "{selectedCategory}" пока нет новостей
                </p>
              </div>
            )}
          </div>

          {/* Боковая панель */}
          <div className="space-y-6">
            {/* Топ новости */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Icon name="TrendingUp" size={20} />
                  Топ новости
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {news.slice(0, 3).map((item, index) => (
                  <div key={item.id}>
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-black text-sm leading-tight mb-1">
                          {item.title.length > 60 ? item.title.substring(0, 60) + '...' : item.title}
                        </h4>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                    </div>
                    {index < 2 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Статистика */}
            <Card>
              <CardHeader>
                <CardTitle className="text-black flex items-center gap-2">
                  <Icon name="BarChart3" size={20} />
                  Статистика дня
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Всего новостей</span>
                  <span className="font-bold text-red-600">247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Комментариев</span>
                  <span className="font-bold text-red-600">1,853</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Читателей онлайн</span>
                  <span className="font-bold text-red-600">12,496</span>
                </div>
              </CardContent>
            </Card>

            {/* Реклама/Баннер */}
            <Card className="bg-gradient-to-br from-red-50 to-red-100">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-black mb-2">Будьте в курсе!</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Подписывайтесь на наш телеграм канал для получения срочных новостей
                </p>
                <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                  <Icon name="Send" size={16} />
                  <span className="ml-1">Подписаться</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Подвал */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">РОССИЯ НОВОСТИ</h3>
              <p className="text-sm text-gray-400">
                Самые актуальные новости России и мира. Оперативно и достоверно.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">Политика</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Экономика</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Технологии</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>info@russia-news.ru</li>
                <li>+7 (495) 123-45-67</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Соцсети</h4>
              <div className="flex gap-4">
                <Icon name="Send" size={20} className="text-gray-400 hover:text-white cursor-pointer" />
                <Icon name="Globe" size={20} className="text-gray-400 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-gray-800" />
          <div className="text-center text-sm text-gray-400">
            © 2025 РОССИЯ НОВОСТИ. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;