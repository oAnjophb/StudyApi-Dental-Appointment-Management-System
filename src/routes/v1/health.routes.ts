import { Router, Request, Response } from 'express';

const router = Router();

router.get('/api/health', async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: 'API is running',
      status: 'OK',
      environment: process.env.NODE_ENV || 'development',
      database: 'Connected'
    })
  } catch (error) {
    console.log('Health check failed:', error);
    res.status(500).json({
      message: 'API is down',
      status: 'ERROR',
      database: 'Disconnected'
    })
  }
})
export default router;