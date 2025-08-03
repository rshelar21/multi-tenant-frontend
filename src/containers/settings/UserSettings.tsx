'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import * as dateFns from 'date-fns';
import {
  Mail,
  Package,
  ShoppingCart,
  TrendingUp,
  User,
  Moon,
  Sun,
  Pencil,
  Trash,
  Check,
} from 'lucide-react';
import { selectedUser, updateStoreImg } from '@/reducers/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { capitalize } from '@/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CopyToClipboard, PageHeading } from '@/components/common';
import { UpdateUserPasswordModal } from './UpdateUserPasswordModal';
import { MAX_FILE_SIZE_LIMIT } from '@/constants';
import { patchUserAPI } from '@/api/users';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ImageUpload } from '@/services';

export const UserSettings = () => {
  const { setTheme } = useTheme();
  const user = useAppSelector(selectedUser);
  const [isOpen, setIsOpen] = useState(false);
  const [userImg, setUserImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationKey: ['user'],
    mutationFn: patchUserAPI,
    onSuccess: (data) => {
      dispatch(
        updateStoreImg({
          storeImg: data?.tenant.storeImg,
        })
      );
      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
      toast.success('Profile Updated!');
      setImage(null);
      setUserImg(null);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size >= MAX_FILE_SIZE_LIMIT) {
        toast.error('File size should not exceed 3MB');
        return;
      }
      setImage(file);
      setUserImg(URL.createObjectURL(file));
    }
  };

  const handleUploadImg = async () => {
    const res = await ImageUpload(image as File);
    mutate({
      id: user.id,
      storeImg: res.secure_url,
    });
  };

  const handleButtonClick = (): void => {
    if (userImg) {
      handleUploadImg();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveImage = (): void => {
    if (userImg) {
      setUserImg(null);
      setImage(null);
    } else {
      mutate({
        id: user.id,
        storeImg: null,
      });
    }
  };

  return (
    <div className="">
      <PageHeading
        title="User Settings"
        subTitle="Manage your account settings and preferences"
        className="px-4 md:px-0"
      />
      <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-7 md:px-0">
        <Card className="col-span-7 w-full rounded-lg border-gray-400 shadow md:col-span-5">
          <CardHeader>
            <PageHeading
              title={
                <div className="flex items-center gap-1">
                  <User className="size-5" />
                  <h1 className="text-xl font-semibold">Profile Information</h1>
                </div>
              }
              subTitle={
                <p className="text-base text-gray-500">
                  Your personal information and account details
                </p>
              }
              className="pt-0"
            />
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-5">
              <div className="relative h-36 w-36 rounded-[999px] border border-gray-400">
                <Image
                  alt={user?.username}
                  fill
                  src={userImg || user.tenant?.storeImg || '/placeholder.png'}
                  className="rounded-[999px] object-cover"
                />
                {(userImg || user.tenant?.storeImg) && (
                  <div className="absolute inset-0 z-[999] flex cursor-pointer items-center justify-center rounded-[999px] bg-[rgba(0,0,0,0.4)] opacity-0 transition-all hover:opacity-100">
                    <Button
                      onClick={handleRemoveImage}
                      className="rounded-full border-red-400 bg-red-100 hover:bg-red-200"
                      variant="ghost"
                    >
                      <Trash className="size-6 text-red-700" />
                    </Button>
                  </div>
                )}

                <div className="absolute top-3/12 -right-3 z-[9999]">
                  <label htmlFor="user-profile">
                    <Input
                      type="file"
                      id="user-profile"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                    <Button
                      disabled={isPending}
                      onClick={handleButtonClick}
                      size="icon"
                      variant="outline"
                      className="cursor-pointer rounded-[999px] border-gray-300 bg-white p-5 text-xs transition-all hover:scale-105 dark:border-gray-500 dark:bg-black hover:dark:bg-black"
                    >
                      {userImg ? (
                        <>
                          <Check className="size-3.5" />
                        </>
                      ) : (
                        <>
                          <Pencil className="size-3.5" />
                        </>
                      )}
                    </Button>
                  </label>
                </div>
              </div>

              <div className="">
                <h6 className="text-3xl font-semibold">
                  {capitalize(user.name)}
                </h6>
                <p className="text-base font-medium text-gray-600">
                  @{user.username}
                </p>
              </div>
            </div>

            <Separator className="my-4 bg-gray-300" />

            <div className="grid gap-4 pt-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    readOnly
                    className="flex-1 border border-gray-300"
                  />
                  <CopyToClipboard
                    text={user.email}
                    className="border border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={user.username}
                  readOnly
                  className="flex-1 border border-gray-300"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="col-span-7 flex w-full flex-col gap-4 md:col-span-2">
          <Card className="w-full rounded-lg border-gray-400 shadow">
            <CardHeader>
              <p className="text-base text-gray-500">Account Overview</p>

              <div className="flex items-center justify-between">
                <p className="black font-medium">Member since</p>
                <p className="black font-medium">
                  {user.createdAt &&
                    dateFns.format(user.createdAt, 'MMMM yyyy')}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="black font-medium">Theme</p>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme('light')}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme('dark')}>
                      Dark
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem onClick={() => setTheme('system')}>
                      System
                    </DropdownMenuItem> */}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
          </Card>

          <Card className="w-full rounded-lg border-gray-400 shadow">
            <CardHeader>
              <p className="text-base text-gray-500">Security</p>

              <Button
                variant="elevated"
                className="m-2"
                onClick={() => setIsOpen(true)}
              >
                Change Password
              </Button>
            </CardHeader>
          </Card>
        </div>

        <Card className="col-span-7 hidden w-full rounded-lg border-gray-400 shadow">
          <CardHeader>
            <PageHeading
              title={
                <div className="flex items-center gap-1">
                  <User className="size-5" />
                  <h1 className="text-xl font-semibold">Order Statistics</h1>
                </div>
              }
              subTitle={
                <p className="text-base text-gray-500">
                  Overview of your order history and activity
                </p>
              }
              className="pt-0"
            />
          </CardHeader>
          <CardContent className="mt-0 pt-0">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <ShoppingCart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Total Orders
                  </p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Products
                  </p>
                  <p className="text-2xl font-bold">8</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm font-medium">
                    Pending
                  </p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Recent Activity</h4>
                <p className="text-muted-foreground text-sm">
                  View all orders list
                </p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/library" prefetch>
                  View All Orders
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <UpdateUserPasswordModal open={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};
