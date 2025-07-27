'use client';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { selectedUser } from '@/reducers/userSlice';
import { useAppSelector } from '@/store/hooks';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { postPasswordUpdateAPI } from '@/api/auth';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
}

const formSchema = z
  .object({
    oldPassword: z
      .string({
        required_error: 'password is Required',
      })
      .min(6, 'password is Required'),

    newPassword: z
      .string({
        required_error: 'password is Required',
      })
      .min(6, 'password is Required'),

    confirmPassword: z
      .string({
        required_error: 'password is Required',
      })
      .min(6, 'password is Required'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'New password and confirm password must match',
    path: ['confirmPassword'], // attaches error to confirmPassword key
  });

type formSchemaType = z.infer<typeof formSchema>;

export const UpdateUserPasswordModal = ({ open, onClose }: Props) => {
  const user = useAppSelector(selectedUser);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: '',
      confirmPassword: '',
      newPassword: '',
    },
  });

  const handleClose = (): void => {
    form.reset();
    form.clearErrors();
    onClose();
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ['user-password'],
    mutationFn: postPasswordUpdateAPI,
    onSuccess: () => {
      toast.success('Password changed Successfully!');
      handleClose();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const onSubmit = async (values: formSchemaType): Promise<void> => {
    mutate({
      body: {
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
        id: user?.id,
      },
    });
  };

  const handleTooglePassword = (type: keyof typeof showPassword): void => {
    setShowPassword((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <Dialog open={open}>
      <DialogContent hideClose className="overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Update Password
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full grid-cols-1 gap-4 pb-4 md:grid-cols-2">
              <div className="col-span-2 space-y-2">
                <FormField
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Enter Old Password
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-between gap-2">
                          <Input
                            {...field}
                            type={
                              showPassword.oldPassword ? 'text' : 'password'
                            }
                          />
                          {showPassword?.oldPassword ? (
                            <EyeOff
                              className="size-6 cursor-pointer"
                              onClick={() =>
                                handleTooglePassword('oldPassword')
                              }
                            />
                          ) : (
                            <Eye
                              className="size-6 cursor-pointer"
                              onClick={() =>
                                handleTooglePassword('oldPassword')
                              }
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <FormField
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Enter New Password
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-between gap-2">
                          <Input
                            {...field}
                            type={
                              showPassword.newPassword ? 'text' : 'password'
                            }
                          />
                          {showPassword?.newPassword ? (
                            <EyeOff
                              className="size-6 cursor-pointer"
                              onClick={() =>
                                handleTooglePassword('newPassword')
                              }
                            />
                          ) : (
                            <Eye
                              className="size-6 cursor-pointer"
                              onClick={() =>
                                handleTooglePassword('newPassword')
                              }
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-2 space-y-2">
                <FormField
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-between gap-2">
                          <Input
                            {...field}
                            type={
                              showPassword.confirmPassword ? 'text' : 'password'
                            }
                          />
                          {showPassword?.confirmPassword ? (
                            <EyeOff
                              className="size-6 cursor-pointer"
                              onClick={() =>
                                handleTooglePassword('confirmPassword')
                              }
                            />
                          ) : (
                            <Eye
                              className="size-6 cursor-pointer"
                              onClick={() =>
                                handleTooglePassword('confirmPassword')
                              }
                            />
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={isPending}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                size="sm"
                disabled={isPending}
                className="transition-colors hover:border-pink-400 hover:bg-pink-400 hover:text-black"
              >
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
