'use client';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { postUserAPI } from '@/api/users';
import { useAppDispatch } from '@/store/hooks';
import { createUser } from '@/reducers/userSlice';

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
  name: z.string({
    required_error: 'Full Name is Required',
  }),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(63, 'Username must be lesss than 63 characters')
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      'Username can only contain lowercase letters, numbers and hyphens. It must start and end with letter or number'
    )
    .refine(
      (val) => !val.includes('--'),
      'Username can not contain consecutive hyphens'
    )
    .transform((val) => val.toLowerCase()),
});

type formSchemaType = z.infer<typeof formSchema>;

const SignUpPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      name: '',
    },
    mode: 'all',
  });

  const { mutate, isPending } = useMutation({
    mutationFn: postUserAPI,
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
          username: data?.user?.username,
          loginStatus: true,
        })
      );
      router.push('/');
    },
  });

  const onSubmit = async (values: formSchemaType): Promise<void> => {
    mutate(values);
  };

  const username = form.watch('username');
  const usernameErrors = form.formState.errors.username;

  const showPreview = username && !usernameErrors;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5">
      <div className="h-screen w-full overflow-y-auto bg-[#F4F4F0] lg:col-span-3">
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
                <Link prefetch href="/sign-in">
                  Sign In
                </Link>
              </Button>
            </div>
            <h1 className="text-4xl font-medium">
              Join over 1,500 creators earning money on Funroad.
            </h1>
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription
                    className={cn(`hidden`, showPreview && `block`)}
                  >
                    Your store will be available at&nbsp;
                    <strong>{username}</strong>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Input {...field} type="password" />
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
              Create Account
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

export default SignUpPage;
