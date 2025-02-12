import { Box, Typography } from '@mui/material';
import { FC, memo, useEffect, useState } from 'react';
import { QuizCard } from '../../../../components/QuizCard';

import { styles } from './styles';
import { useQuizzesData } from '../../hooks/useQuizzesData';
import { socketUrl } from 'src/utils';

export interface QuizzesSectionProps {}

export const QuizzesSection: FC<QuizzesSectionProps> = memo(() => {
  const { quizzes, fetchQuizzes, getStatus } = useQuizzesData();

  const [logs, setLogs] = useState<string[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://${socketUrl}/ws`);

    ws.onopen = () => console.log('Connected to WebSocket logs');
    
    ws.onmessage = (event) => {
      const logMessage = event.data;
      setLogs((prevLogs) => [...prevLogs, logMessage]);

      if (logMessage.includes('Updated')) {
        void fetchQuizzes();
        socket?.send('Clear');
      }
    };

    ws.onerror = (error) => console.error('WebSocket error:', error);
    ws.onclose = () => console.log('WebSocket closed');

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        const response = await getStatus();
        if (response === 'Updated') {
          void fetchQuizzes();
          socket.send('Clear');
        }
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [socket]);

  useEffect(() => {
    void fetchQuizzes();
  }, []);

  if (quizzes.length === 0) {
    return (
      <Box sx={styles.root}>
        <Typography variant="h1" textAlign="center">No quizzes here yet</Typography>
      </Box>
    )
  }

  return (
    <Box sx={styles.root}>
      {quizzes.map((quiz, index) => (
        <QuizCard key={index} quiz={quiz} />
      ))}
    </Box>
  );
});
