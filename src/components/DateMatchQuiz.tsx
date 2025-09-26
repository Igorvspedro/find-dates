import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Sparkles, Coffee, MapPin } from 'lucide-react';

export interface Question {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    value: string;
  }[];
}

interface DateMatch {
  title: string;
  description: string;
  emoji: string;
  activities: string[];
}

const questions: Question[] = [
  {
    id: 'food',
    text: 'Que tipo de comida vocês preferem?',
    options: [
      { id: 'romantic', text: 'Jantar romântico', value: 'romantic' },
      { id: 'casual', text: 'Comida descontraída', value: 'casual' },
      { id: 'exotic', text: 'Culinária exótica', value: 'adventure' },
      { id: 'home', text: 'Cozinhar juntos em casa', value: 'cozy' }
    ]
  },
  {
    id: 'leisure',
    text: 'Qual estilo de lazer vocês preferem?',
    options: [
      { id: 'calm', text: 'Tranquilo e relaxante', value: 'cozy' },
      { id: 'adventure', text: 'Aventura e adrenalina', value: 'adventure' },
      { id: 'cultural', text: 'Cultural e intelectual', value: 'cultural' },
      { id: 'social', text: 'Social e animado', value: 'fun' }
    ]
  },
  {
    id: 'budget',
    text: 'Qual o orçamento disponível?',
    options: [
      { id: 'free', text: 'Gratuito ou muito barato', value: 'cozy' },
      { id: 'moderate', text: 'Moderado', value: 'casual' },
      { id: 'generous', text: 'Generoso', value: 'romantic' },
      { id: 'luxury', text: 'Sem limites!', value: 'romantic' }
    ]
  },
  {
    id: 'location',
    text: 'Preferem lugares abertos ou fechados?',
    options: [
      { id: 'outdoor', text: 'Ao ar livre', value: 'adventure' },
      { id: 'indoor', text: 'Ambiente fechado', value: 'cozy' },
      { id: 'mixed', text: 'Combinação dos dois', value: 'casual' },
      { id: 'unique', text: 'Lugares únicos', value: 'cultural' }
    ]
  },
  {
    id: 'time',
    text: 'Preferem encontros durante o dia ou à noite?',
    options: [
      { id: 'morning', text: 'Manhã', value: 'casual' },
      { id: 'afternoon', text: 'Tarde', value: 'adventure' },
      { id: 'evening', text: 'Noite', value: 'romantic' },
      { id: 'late', text: 'Madrugada', value: 'fun' }
    ]
  },
  {
    id: 'romance',
    text: 'Qual nível de romantismo desejam?',
    options: [
      { id: 'super', text: 'Super romântico', value: 'romantic' },
      { id: 'moderate', text: 'Moderadamente romântico', value: 'casual' },
      { id: 'fun', text: 'Divertido e descontraído', value: 'fun' },
      { id: 'friendship', text: 'Como bons amigos', value: 'cozy' }
    ]
  },
  {
    id: 'music',
    text: 'Que tipo de ambiente musical preferem?',
    options: [
      { id: 'classic', text: 'Música clássica/jazz', value: 'romantic' },
      { id: 'pop', text: 'Pop/Rock', value: 'fun' },
      { id: 'ambient', text: 'Música ambiente suave', value: 'cozy' },
      { id: 'live', text: 'Música ao vivo', value: 'cultural' }
    ]
  },
  {
    id: 'distance',
    text: 'Que distância estão dispostos a percorrer?',
    options: [
      { id: 'home', text: 'Ficar em casa', value: 'cozy' },
      { id: 'neighborhood', text: 'No bairro', value: 'casual' },
      { id: 'city', text: 'Pela cidade', value: 'cultural' },
      { id: 'travel', text: 'Viajar para outro lugar', value: 'adventure' }
    ]
  },
  {
    id: 'planning',
    text: 'Preferem surpresas ou atividades planejadas?',
    options: [
      { id: 'surprise', text: 'Adoramos surpresas!', value: 'adventure' },
      { id: 'planned', text: 'Tudo planejado', value: 'romantic' },
      { id: 'flexible', text: 'Um pouco dos dois', value: 'casual' },
      { id: 'spontaneous', text: 'Completamente espontâneo', value: 'fun' }
    ]
  },
  {
    id: 'activities',
    text: 'Que tipo de atividade favorita em casal?',
    options: [
      { id: 'conversation', text: 'Conversas profundas', value: 'romantic' },
      { id: 'games', text: 'Jogos e brincadeiras', value: 'fun' },
      { id: 'learning', text: 'Aprender algo novo', value: 'cultural' },
      { id: 'relaxing', text: 'Relaxar juntos', value: 'cozy' }
    ]
  }
];

const dateMatches: Record<string, DateMatch> = {
  romantic: {
    title: 'Jantar Romântico Premium',
    emoji: '🌹',
    description: 'Vocês são um casal que valoriza romance e intimidade! Recomendo um jantar à luz de velas em um restaurante elegante, seguido de uma caminhada sob as estrelas. Criem um ambiente mágico com música suave, vinho e muito carinho.',
    activities: ['Jantar em restaurante requintado', 'Caminhada noturna', 'Música ao vivo', 'Sobremesa especial']
  },
  adventure: {
    title: 'Aventura a Dois',
    emoji: '🏔️',
    description: 'Vocês são aventureiros por natureza! Que tal uma trilha em um lugar bonito, seguida de um piquenique com vista incrível? A adrenalina e a natureza vão criar memórias inesquecíveis para vocês dois.',
    activities: ['Trilha ou caminhada', 'Piquenique ao ar livre', 'Esportes radicais', 'Explorar lugares novos']
  },
  cultural: {
    title: 'Experiência Cultural',
    emoji: '🎭',
    description: 'Vocês apreciam arte e cultura! Visitem um museu interessante, assistam a uma peça de teatro ou façam um tour histórico pela cidade. Depois, conversem sobre as descobertas em um café charmoso.',
    activities: ['Museu ou galeria', 'Teatro ou cinema', 'Tour histórico', 'Café para conversar']
  },
  cozy: {
    title: 'Encontro Aconchegante',
    emoji: '🏠',
    description: 'Vocês preferem a intimidade do lar! Cozinhem uma refeição deliciosa juntos, assistam a um filme aconchegantes no sofá e criem um ambiente super relaxante. Às vezes, os melhores encontros são os mais simples.',
    activities: ['Cozinhar juntos', 'Filme em casa', 'Jogos de tabuleiro', 'Conversa no sofá']
  },
  casual: {
    title: 'Encontro Descontraído',
    emoji: '☕',
    description: 'Vocês gostam de simplicidade e diversão! Um brunch em um lugar novo, uma volta no parque ou um festival local seria perfeito. Mantenham tudo leve e aproveitem a companhia um do outro.',
    activities: ['Brunch ou almoço', 'Parque ou praça', 'Feira ou festival', 'Atividade esportiva leve']
  },
  fun: {
    title: 'Diversão Garantida',
    emoji: '🎉',
    description: 'Vocês são pura energia e diversão! Uma noite de karaokê, boliche, ou uma balada são ideais para vocês. Divirtam-se, riam muito e dancem até cansar. A diversão é garantida!',
    activities: ['Karaokê ou boliche', 'Dança ou balada', 'Parque de diversões', 'Eventos sociais']
  }
};

export const DateMatchQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = (): DateMatch => {
    const values = Object.values(answers);
    const counts: Record<string, number> = {};
    
    values.forEach(value => {
      counts[value] = (counts[value] || 0) + 1;
    });
    
    const winner = Object.entries(counts).reduce((a, b) => 
      counts[a[0]] > counts[b[0]] ? a : b
    )[0];
    
    return dateMatches[winner] || dateMatches.casual;
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  if (showResult) {
    const result = getResult();
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-romantic border-romantic-pink/20">
          <CardHeader className="text-center space-y-4">
            <div className="text-6xl">{result.emoji}</div>
            <CardTitle className="text-3xl text-romantic-pink flex items-center justify-center gap-2">
              <Heart className="w-8 h-8" />
              {result.title}
              <Heart className="w-8 h-8" />
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-center text-foreground leading-relaxed">
              {result.description}
            </p>
            
            <div className="bg-secondary/50 rounded-lg p-4">
              <h3 className="font-semibold text-romantic-purple mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Sugestões de Atividades:
              </h3>
              <ul className="space-y-2">
                {result.activities.map((activity, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-romantic-rose rounded-full"></div>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-muted-foreground italic">
                Que tal tornar esse encontro realidade? ❤️
              </p>
              <Button 
                onClick={resetQuiz} 
                variant="romantic"
              >
                Fazer Novo Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-soft border-romantic-pink/20">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-romantic-pink flex items-center gap-2">
              <Heart className="w-6 h-6" />
              Match de Encontros
            </CardTitle>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} de {questions.length}
            </span>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <h2 className="text-xl font-semibold text-center">
            {question.text}
          </h2>
          
          <div className="grid gap-3">
            {question.options.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="h-auto p-4 text-left justify-start hover:bg-romantic-lavender/50 hover:border-romantic-pink transition-all duration-300"
                onClick={() => handleAnswer(question.id, option.value)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border-2 border-romantic-pink/50"></div>
                  <span>{option.text}</span>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};