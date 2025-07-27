'use client';
import { useState } from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { createUser } from '@/reducers/userSlice';
import { postLoginUserAPI } from '@/api/auth';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
});

const formSchema = z.object({
  email: z
    .string({
      required_error: 'Email is Required',
    })
    .email(),
  password: z
    .string({
      required_error: 'password is Required',
    })
    .min(6),
});

type formSchemaType = z.infer<typeof formSchema>;

const SignInPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postLoginUserAPI,
    onError: (error) => {
      toast.error(`${error.message}`);
    },
    onSuccess: (data) => {
      dispatch(
        createUser({
          accessToken: data?.accessToken,
          email: data?.user?.email,
          id: data?.user?.id,
          name: data?.user?.name,
          username: data?.user?.tenant?.name,
          loginStatus: true,
          roles: data?.user?.roles,
          tenant: data?.user?.tenant,
          createdAt: data?.user?.createdAt,
          updatedAt: data?.user?.updatedAt,
        })
      );
      router.push('/');
    },
  });

  const onSubmit = async (values: formSchemaType): Promise<void> => {
    mutate(values);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="h-screen w-full overflow-y-auto bg-[#F4F4F0] lg:col-span-3 dark:bg-black">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8 p-4 lg:p-16"
          >
            <div className="mb-8 flex items-center justify-between">
              <Link href={'/'}>
                <span
                  className={cn('text-2xl font-semibold', poppins.className)}
                >
                  funroad
                </span>
              </Link>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="border-none text-base underline"
              >
                <Link prefetch href="/sign-up">
                  Sign Up
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">Welcome back to Funroad.</h1>

            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center justify-between gap-2">
                      <Input
                        {...field}
                        type={showPassword ? 'text' : 'password'}
                      />
                      {showPassword ? (
                        <EyeOff
                          className="size-6 cursor-pointer"
                          onClick={() => setShowPassword(false)}
                        />
                      ) : (
                        <Eye
                          className="size-6 cursor-pointer"
                          onClick={() => setShowPassword(true)}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isPending}
              type="submit"
              size="lg"
              variant="elevated"
              className="hover:text-primary bg-black text-white hover:bg-pink-400"
            >
              Log In
            </Button>
          </form>
        </Form>
      </div>
      <div
        className="hidden h-screen w-full lg:col-span-2 lg:block"
        style={{
          background: 'url(/auth-bg.png)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      />
    </div>
  );
};

export default SignInPage;
