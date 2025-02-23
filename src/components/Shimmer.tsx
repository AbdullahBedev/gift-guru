import { cn } from '@/lib/utils';

export const Shimmer = ({ className }: { className?: string }) => {
  return (
    <div className={cn(
      'animate-shimmer bg-gradient-to-r from-black/5 via-black/10 to-black/5',
      'bg-[length:400%_100%]',
      className
    )} />
  );
}; 