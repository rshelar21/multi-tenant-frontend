'use client';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { postLogoutAPI } from '@/api/auth';
import { Button } from '@/components/ui/button';
import { removeUser } from '@/reducers/userSlice';
import { useAppDispatch } from '@/store/hooks';
import { cn } from '@/lib/utils';
import { LucideProps } from 'lucide-react';

interface LogtoutButtonProps {
  variant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'elevated';
  className?: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

export const LogtoutButton = ({
  className,
  variant,
  Icon,
}: LogtoutButtonProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ['logout'],
    mutationFn: postLogoutAPI,
    onSuccess: () => {
      dispatch(removeUser());
      queryClient.clear();
      toast.success('logout done');
      router.replace('/sign-in');
    },
  });

  const handleLogout = () => {
    mutate();
  };

  return (
    <Button
      disabled={isPending}
      variant={variant || 'secondary'}
      className={cn(
        `h-full rounded-none border-t-0 border-r-0 border-b-0 border-l bg-white px-12 text-lg transition-colors hover:bg-pink-400 dark:hover:bg-pink-400`,
        className
      )}
      onClick={() => handleLogout()}
    >
      {Icon && <Icon />}
      Log Out
    </Button>
  );
};
